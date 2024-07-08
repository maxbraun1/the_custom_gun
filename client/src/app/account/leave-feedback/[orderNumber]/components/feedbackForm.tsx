"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import axios, { AxiosResponse } from "axios";
import FeedbackStar from "../../../../../components/feedback/feedbackStar";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import Image from "next/image";
import Link from "next/link";
import { Spinner } from "@/components/ui/spinner";

const FormSchema = z.object({
  message: z.string().max(2000, {
    message: "Feedback message cannot be more than 2000 characters.",
  }),
});

export default function FeedbackForm({ orderNumber }: { orderNumber: number }) {
  const [stars, setStars] = useState(1);
  const [loading, setLoading] = useState(false);
  const [feedbackSuccess, setFeedbackSuccess] = useState(true);
  const [feedbackDialogOpen, setFeedbackDialogOpen] = useState(false);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      message: "",
    },
  });

  // On form submit
  const onSubmit = async (values: z.infer<typeof FormSchema>) => {
    setLoading(true);
    const data = {
      orderNumber: orderNumber.toString(),
      score: stars,
      message: values.message,
    };

    await axios
      .post(process.env.NEXT_PUBLIC_API_URL + "/feedback/buyer", data, {
        withCredentials: true,
      })
      .then((response: AxiosResponse) => {
        setFeedbackSuccess(response.data);
        setFeedbackDialogOpen(true);
        console.log(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
    setLoading(false);
  };

  function feedbackSuccessDialog() {
    return (
      <AlertDialog open={feedbackDialogOpen}>
        <AlertDialogContent className="text-center flex flex-col items-center gap-7">
          {feedbackSuccess && (
            <Image
              src="/assets/icons/check.png"
              width={50}
              height={50}
              alt=""
            />
          )}
          <div>
            <AlertDialogTitle>
              {feedbackSuccess
                ? "Feedback Submitted!"
                : "There was a problem..."}
            </AlertDialogTitle>
            <AlertDialogDescription>
              {feedbackSuccess ? (
                "Your feedback has been sucessfully submitted."
              ) : (
                <>
                  <p>There was an problem submitting your feedback.</p>
                  <p>Please try again later.</p>
                </>
              )}
            </AlertDialogDescription>
          </div>
          <Link href="/account/orders">
            <Button className="bg-blue-800">Back to Orders</Button>
          </Link>
        </AlertDialogContent>
      </AlertDialog>
    );
  }

  return (
    <>
      {feedbackSuccessDialog()}
      <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
        Rating
      </label>
      <div className="flex gap-1 mb-5">
        <div className="cursor-pointer" onClick={() => setStars(1)}>
          <FeedbackStar active={stars - 1 >= 0} />
        </div>
        <div className="cursor-pointer" onClick={() => setStars(2)}>
          <FeedbackStar active={stars - 2 >= 0} />
        </div>
        <div className="cursor-pointer" onClick={() => setStars(3)}>
          <FeedbackStar active={stars - 3 >= 0} />
        </div>
        <div className="cursor-pointer" onClick={() => setStars(4)}>
          <FeedbackStar active={stars - 4 >= 0} />
        </div>
        <div className="cursor-pointer" onClick={() => setStars(5)}>
          <FeedbackStar active={stars - 5 >= 0} />
        </div>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Feedback Comment</FormLabel>
                <FormControl>
                  <Textarea
                    maxLength={2000}
                    placeholder="Add a comment..."
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex gap-3">
            <Button
              className="bg-blue-800 hover:bg-blue-900 w-42"
              type="submit"
            >
              {loading ? <Spinner size={15} /> : "Submit Feedback"}
            </Button>
            <Button variant="secondary" onClick={() => window.history.back()}>
              Cancel
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
}
