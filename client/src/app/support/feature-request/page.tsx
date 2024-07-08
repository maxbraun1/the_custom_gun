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
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import axios, { AxiosResponse } from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "@/components/ui/use-toast";
import Image from "next/image";

const FormSchema = z.object({
  email: z.string().email("Please enter a valid email address."),
  subject: z
    .string()
    .min(3, "Subject must be 3 or more characters.")
    .max(200, "Subject cannot be more than 200 characters"),
  message: z
    .string()
    .min(3, "Message must be 3 or more characters.")
    .max(2000, "Message cannot be more than 2000 characters"),
});

export default function Support() {
  const [loading, setLoading] = useState(false);
  const [submitAlertOpen, setSubmitAlertOpen] = useState(false);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      subject: "",
      message: "",
    },
  });

  // On form submit
  const onSubmit = async (values: z.infer<typeof FormSchema>) => {
    setLoading(true);
    const email = values.email;
    const subject = values.subject;
    const message = values.message;

    await axios
      .post(
        process.env.NEXT_PUBLIC_API_URL + "/support/feature",
        { email, subject, message },
        { withCredentials: true }
      )
      .then((response: AxiosResponse) => {
        setSubmitAlertOpen(true);
        setLoading(false);
        form.reset();
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
        toast({
          variant: "destructive",
          title:
            "An error occured while submitting your request. Please try again later.",
        });
      });
  };

  function supportSubmitAlert() {
    return (
      <AlertDialog open={submitAlertOpen}>
        <AlertDialogContent>
          <AlertDialogHeader className="items-center">
            <Image
              src="/assets/icons/check.png"
              width={50}
              height={50}
              alt=""
            />
            <AlertDialogTitle>
              Your Feature Request Has Been Submitted!
            </AlertDialogTitle>
            <AlertDialogDescription className="text-center">
              Thank you for submitting a feature request. We are always looking
              for ways to improve The Custom Gun, and we appreciate your input.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="sm:justify-center">
            <AlertDialogAction
              onClick={() => setSubmitAlertOpen(false)}
              className="bg-blue-800 hover:bg-blue-900"
            >
              Close
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    );
  }

  return (
    <>
      {supportSubmitAlert()}
      <div className="flex flex-col gap-5 md:flex-row md:gap-0 md:divide-x">
        <div className="basis-3/4 px-5">
          <h1 className="font-display text-3xl mb-3">Request a Feature</h1>
          <p className="text-sm mb-5">
            Your insights matter! The Custom Gun is a rapidly evolving platform,
            and your input helps us prioritize what our users really want.
          </p>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
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
                name="subject"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Subject</FormLabel>
                    <FormControl>
                      <Input
                        minLength={3}
                        maxLength={200}
                        placeholder="Subject"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Describe the Feature</FormLabel>
                    <FormControl>
                      <Textarea
                        minLength={3}
                        maxLength={2000}
                        placeholder='Ex. "Ability to sort listings by user rating..."'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                className="w-full bg-blue-800 hover:bg-blue-900"
                type="submit"
              >
                {loading ? <Spinner size={25} /> : "Request"}
              </Button>
            </form>
          </Form>
        </div>

        <div className="basis-1/4 px-5">
          <p>
            Need help? Email{" "}
            <a
              className="text-blue-700 underline"
              href="mailto:support@thecustomgun.com"
            >
              support@thecustomgun.com
            </a>
          </p>
        </div>
      </div>
    </>
  );
}
