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
import { useState } from "react";
import axios, { AxiosError } from "axios";
import { Spinner } from "../../../../components/ui/spinner";
import Image from "next/image";
import useQueryParams from "@/lib/util/useQueryParams";
import Link from "next/link";

const FormSchema = z
  .object({
    newPassword: z
      .string()
      .min(5, {
        message: "Password must be at least 6 characters.",
      })
      .regex(new RegExp("^(?=.*[A-Za-z])(?=.*\\d).+"), {
        message:
          "Password must have at least one letter and at least one number.",
      }),
    repeatPassword: z.string(),
  })
  .superRefine(({ newPassword, repeatPassword }, ctx) => {
    if (repeatPassword !== newPassword) {
      ctx.addIssue({
        path: ["repeatPassword"],
        code: "custom",
        message: "Passwords do not match.",
      });
    }
  });

export function ExternalNewPasswordForm() {
  const [error, setError] = useState<String | null>(null);
  const [loading, setLoading] = useState<Boolean>(false);
  const [success, setSuccess] = useState(false);
  const { queryParams } = useQueryParams();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      newPassword: "",
      repeatPassword: "",
    },
  });

  // On form submit
  const onSubmit = async (values: z.infer<typeof FormSchema>) => {
    setLoading(true);
    // Clear error
    setError(null);

    const code = queryParams.get("code");
    const password = values.newPassword;

    await axios
      .post(process.env.NEXT_PUBLIC_API_URL + "/auth/reset-password-external", {
        password,
        code,
      })
      .then((response) => {
        if (response.data.error) {
          setError(response.data.message);
          setLoading(false);
        } else {
          setSuccess(true);
        }
      })
      .catch((error: AxiosError) => {
        setLoading(false);
        console.log(error);
        setError(error.message);
      });
  };

  if (success) {
    return (
      <div className="min-h-fit h-36 flex flex-col justify-center items-center p-3 space-y-2">
        <Image src="/assets/icons/check.png" width={30} height={30} alt="" />
        <p className="text-center">Password successfully reset!</p>
        <Link href="/login">
          <Button className="bg-blue-700">Go To Login</Button>
        </Link>
      </div>
    );
  } else {
    return (
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="my-4 space-y-4">
          <FormField
            control={form.control}
            name="newPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>New Password</FormLabel>
                <FormControl>
                  <Input type="password" className="max-w-xs" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="repeatPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Repeat New Password</FormLabel>
                <FormControl>
                  <Input type="password" className="max-w-xs" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {error && (
            <div className="text-red-700 rounded-md text-sm">{error}</div>
          )}
          <Button
            className="w-full bg-blue-800 hover:bg-blue-900"
            type="submit"
          >
            {loading ? <Spinner size={25} /> : "Continue"}
          </Button>
        </form>
      </Form>
    );
  }
}
