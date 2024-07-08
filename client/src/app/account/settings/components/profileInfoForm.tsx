"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { user } from "@/lib/types/user";
import getUserClientSide from "@/lib/util/getUser";
import { zodResolver } from "@hookform/resolvers/zod";
import axios, { AxiosError } from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

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

export default function ProfileInfoForm() {
  const [loading, setLoading] = useState<Boolean>(false);
  const [user, setUser] = useState<user | null>(getUserClientSide());

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      first_name: user?.first_name || "",
      last_name: user?.last_name || "",
      company: user?.company || "",
    },
  });

  // On form submit
  const onSubmit = async (values: z.infer<typeof FormSchema>) => {
    setLoading(true);

    const first_name = values.first_name;
    const last_name = values.last_name;
    const company = values.company;
    await axios
      .post(
        process.env.NEXT_PUBLIC_API_URL + "/users/update-profile",
        {
          first_name,
          last_name,
          company,
        },
        { withCredentials: true }
      )
      .catch((error: AxiosError) => {
        console.log(error);
      });
    setLoading(false);
  };

  return (
    <div className="flex flex-col gap-5 md:flex-row">
      <div className="basis-1/2">
        <h1 className="font-bold">Profile Information</h1>
        <p className="text-xs text-gray-500 leading-5">
          Your basic profile information.
        </p>
      </div>

      <div className="basis-1/2">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="mt-2 space-y-4"
          >
            <div className="flex gap-3">
              <div className="basis-full md:basis-1/2">
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
              <div className="basis-full md:basis-1/2">
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
            <Button
              type="submit"
              className="w-20 bg-blue-800 hover:bg-blue-900"
            >
              {loading ? <Spinner size={25} /> : "Update"}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
