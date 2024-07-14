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
import axios, { AxiosError } from "axios";
import { Spinner } from "../../../../components/ui/spinner";
import { deleteCookie, setCookie } from "cookies-next";
import useQueryParams from "@/lib/util/useQueryParams";
import { useSession } from "../../useSession";

const FormSchema = z.object({
  email: z.string().email("Please enter a valid email address."),
  password: z.string().min(2, {
    message: "Password must be at least 2 characters.",
  }),
});

export function LogInForm() {
  const { queryParams } = useQueryParams();
  const [error, setError] = useState<String | null>(null);
  const [loading, setLoading] = useState<Boolean>(false);
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  useEffect(() => {
    // Set user and redirect after Google login
    const next = queryParams.get("next");
    if (next) {
      setLoading(true);
      // Set user
      axios
        .get(process.env.NEXT_PUBLIC_API_URL + "/auth/getUser", {
          withCredentials: true,
        })
        .then((response) => {
          const user = response.data;
          useSession.setState({ user: user });

          // Handle Redirect
          if (next === "complete-info")
            window.location.replace("/complete-info");
          if (next === "none") window.location.replace("/account");
        })
        .catch((error: AxiosError) => {
          console.log(error);
          deleteCookie("user");
          setLoading(false);
        });
    }
  }, []);

  // On form submit
  const onSubmit = async (values: z.infer<typeof FormSchema>) => {
    setLoading(true);
    // Clear error
    setError(null);
    const email = values.email;
    const password = values.password;
    await axios
      .post(
        process.env.NEXT_PUBLIC_API_URL + "/auth/login",
        { email: email, password },
        { withCredentials: true }
      )
      .then((response) => {
        const user = response.data;
        useSession.setState({ user: user });
        if (!user.verified) {
          window.location.replace("/verify-email");
        } else {
          window.location.replace("/account");
        }
      })
      .catch((error: Error | AxiosError) => {
        setLoading(false);
        console.log(error);
        setError("Incorrect login credentials.");
      });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="my-4 space-y-4">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="Email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" placeholder="Password" {...field} />
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
        <Button className="w-full bg-blue-800 hover:bg-blue-900" type="submit">
          {loading ? <Spinner size={25} /> : "Log In"}
        </Button>
      </form>
    </Form>
  );
}
