"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useEffect, useState } from "react";
import axios, { AxiosError, AxiosResponse } from "axios";
import { Spinner } from "@/components/ui/spinner";
import getUser from "@/lib/util/getUser";
import { useSession } from "../useSession";

const FormSchema = z.object({
  first_name: z
    .string()
    .trim()
    .min(2, "First name must be at least 2 characters.")
    .max(15, "First name must be at most 15 characters.")
    .regex(new RegExp("^[A-Za-z]*$"), "First name can only contain letters."),
  last_name: z
    .string()
    .trim()
    .min(2, "Last name must be at least 2 characters.")
    .max(15, "Last name must be at most 15 characters.")
    .regex(new RegExp("^[A-Za-z]*$"), "Last name can only contain letters."),
  username: z
    .string()
    .trim()
    .min(6, "Username must be at least 6 characters.")
    .max(20, "Username must be at most 20 characters.")
    .regex(
      new RegExp("^(?=[a-zA-Z0-9._]{6,20}$)(?!.*[_.]{2})[^_.].*[^_.]$"),
      "Usernames can only contain letters, numbers, underscores(_), and periods(.), and cannot begin or end with a period or underscore."
    ),
  company: z
    .string()
    .min(3, "Company must be at least 3 characters.")
    .max(25, "Company must be at most 25 characters.")
    .regex(
      new RegExp("^[A-Za-z0-9 ]+$"),
      "Company can only contain letters, numbers, and spaces."
    )
    .optional()
    .or(z.literal("")),
});

export default function CompleteAccountInfo() {
  const [error, setError] = useState<String | null>(null);
  const [loading, setLoading] = useState<Boolean>(false);

  useEffect(() => {
    const user = getUser();
    if (user) {
      if (user.account_status === "active") window.location.replace("/");
    } else {
      window.location.replace("/login");
    }
  }, []);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      first_name: "",
      last_name: "",
      username: "",
      company: "",
    },
  });

  // On form submit
  const onSubmit = async (values: z.infer<typeof FormSchema>) => {
    setLoading(true);

    let usernameResponse = await axios
      .post(
        process.env.NEXT_PUBLIC_API_URL + "/users/checkUsername",
        {
          username: values.username,
        },
        { withCredentials: true }
      )
      .then((result: AxiosResponse) => {
        return result.data;
      })
      .catch((error) => {
        console.log(error);
      });
    if (usernameResponse !== true) {
      // Username taken
      form.setError("username", { message: "This username is not available." });
      setLoading(false);
      return;
    }

    // Clear error
    setError(null);
    const first_name = values.first_name;
    const last_name = values.last_name;
    const username = values.username;
    const company = values.company;
    await axios
      .post(
        process.env.NEXT_PUBLIC_API_URL + "/users/update",
        {
          first_name,
          last_name,
          username,
          company,
        },
        { withCredentials: true }
      )
      .then((response) => {
        useSession.setState({ user: response.data.user });
        window.location.replace("/account");
      })
      .catch((error: AxiosError) => {
        console.log(error);
        setError(error.message);
      });
    setLoading(false);
  };

  return (
    <>
      <h1 className="text-3xl text-left font-display">
        Complete your profile.
      </h1>
      <p className="text-gray-500 text-sm">
        You must complete your profile information before you interact with or
        create any listings.
      </p>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="mt-7 space-y-4">
          <div className="flex flex-col sm:flex-row sm:gap-5">
            <div className="w-full space-y-4 sm:w-1/2">
              <FormField
                control={form.control}
                name="first_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>First Name</FormLabel>
                    <FormControl>
                      <Input placeholder="John" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="w-full space-y-4 sm:w-1/2">
              <FormField
                control={form.control}
                name="last_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Last Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Doe" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder="username123" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="company"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Company Name (Optional)</FormLabel>
                <FormControl>
                  <Input placeholder="Your Company" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {error && (
            <div className="bg-rose-100 border border-solid border-red-700 p-2 text-red-700 rounded-md text-sm">
              {error}
            </div>
          )}
          <Button
            className="w-full bg-blue-800 hover:bg-blue-900"
            type="submit"
          >
            {loading ? <Spinner size={25} /> : "Save"}
          </Button>
        </form>
      </Form>
    </>
  );
}
