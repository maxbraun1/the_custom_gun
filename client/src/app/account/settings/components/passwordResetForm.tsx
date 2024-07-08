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
import { toast } from "@/components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import axios, { AxiosError } from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const FormSchema = z
  .object({
    currentPassword: z.string(),
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

export default function PasswordResetForm() {
  const [loading, setLoading] = useState<Boolean>(false);
  const [formHidden, setFormHidden] = useState(false);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      repeatPassword: "",
    },
  });

  // On form submit
  const onSubmit = async (values: z.infer<typeof FormSchema>) => {
    setLoading(true);

    const currentPassword = values.currentPassword;
    const newPassword = values.newPassword;

    // Check current password
    const currentPasswordValid = await axios
      .post(
        process.env.NEXT_PUBLIC_API_URL + "/auth/check-password",
        {
          password: currentPassword,
        },
        { withCredentials: true }
      )
      .then((response) => {
        return response.data || false;
      })
      .catch((error: AxiosError) => {
        console.log(error);
      });

    if (!currentPasswordValid) {
      form.setError("currentPassword", { message: "Incorrect password" });
      setLoading(false);
      return;
    }

    await axios
      .post(
        process.env.NEXT_PUBLIC_API_URL + "/auth/reset-password",
        {
          currentPassword,
          newPassword,
        },
        { withCredentials: true }
      )
      .then((response) => {
        if (response.data === true) {
          toast({
            title: "Your password was successfully reset.",
          });
          setFormHidden(true);
        } else {
          toast({
            variant: "destructive",
            title:
              "An error occured while resetting your password. Please try again later.",
          });
        }
      })
      .catch((error: AxiosError) => {
        toast({
          variant: "destructive",
          title:
            "An error occured while resetting your password. Please try again later.",
        });
        console.log(error);
      });
    setLoading(false);
  };

  if (formHidden) {
    return null;
  }

  return (
    <div className="flex flex-col gap-5 md:flex-row">
      <div className="basis-1/2">
        <h1 className="font-bold">Reset Password</h1>
        <p className="text-xs text-gray-500 leading-5">
          Enter your current password and your new desired password. For your
          security, choose a strong and unique password.
        </p>
      </div>

      <div className="basis-1/2">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
            <FormField
              control={form.control}
              name="currentPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Current Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Current Password"
                      className="max-w-xs"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="newPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>New Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="New Password"
                      className="max-w-xs"
                      {...field}
                    />
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
                    <Input
                      type="password"
                      placeholder="Confirm Password"
                      className="max-w-xs"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              className="w-36 bg-blue-800 hover:bg-blue-900"
            >
              {loading ? <Spinner size={25} /> : "Reset Password"}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
