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

const FormSchema = z.object({
  email: z.string().email("Please enter a valid email address."),
});

export function ExternalPasswordResetForm() {
  const [error, setError] = useState<String | null>(null);
  const [loading, setLoading] = useState<Boolean>(false);
  const [success, setSuccess] = useState(false);
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
    },
  });

  // On form submit
  const onSubmit = async (values: z.infer<typeof FormSchema>) => {
    setLoading(true);
    // Clear error
    setError(null);
    const email = values.email;
    await axios
      .post(process.env.NEXT_PUBLIC_API_URL + "/auth/request-password-reset", {
        email,
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
        <p className="text-center">Password reset email successfully sent!</p>
      </div>
    );
  } else {
    return (
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="my-4 space-y-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Enter Your Email</FormLabel>
                <FormControl>
                  <Input placeholder="Email" {...field} />
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
