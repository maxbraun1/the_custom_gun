"use client";

import { listing } from "@/lib/types/listing";
import { isEnded } from "@/lib/util/timeLeft";
import axios, { AxiosError, AxiosResponse } from "axios";
import Summary from "../components/summary";
import Shipping from "../components/shipping";
import Billing from "../components/billing";
import { useEffect, useState } from "react";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import Link from "next/link";
import getUser from "@/lib/util/getUser";
import { user } from "@/lib/types/user";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import valid from "card-validator";
import { Spinner } from "@/components/ui/spinner";
import { AlertDialog, AlertDialogContent } from "@/components/ui/alert-dialog";
import Image from "next/image";
import { toast } from "@/components/ui/use-toast";

interface newOrder {
  quantity?: number;
  shipping?: number;
  amount?: number;
  listing_id?: string;
  ffl?: string;
  fullName?: string;
  address1?: string;
  address2?: string;
  state?: string;
  zip?: string;
}

const FormSchema = z
  .object({
    quantity: z.number(),
    ffl: z.string(),
    fullName: z
      .string()
      .min(4, {
        message: "Full Name must be at least 4 characters.",
      })
      .max(100, {
        message: "Full Name cannot be more than 100 characters.",
      })
      .regex(new RegExp("^[a-zA-Z ]+$"), {
        message: "Full Name can only contain letters and spaces.",
      }),
    address1: z
      .string()
      .min(8, {
        message: "Address 1 must be at least 8 characters.",
      })
      .max(120, {
        message: "Address 1 cannot be more than 120 characters.",
      }),
    address2: z
      .string()
      .optional()
      .transform((e) => (e === "" ? undefined : e)),
    city: z
      .string()
      .min(2, {
        message: "City must be at least 2 characters.",
      })
      .max(50, {
        message: "City cannot be more than 50 characters.",
      }),
    state: z.string(),
    zip: z.string().length(5, { message: "Invalid Zip Code" }),
    cardNumber: z
      .string()
      .max(19, "Card number can be no more than 19 digits")
      .min(13, "Card number must be at least 13 digits.")
      .regex(new RegExp("^[0-9]*$"), "Card number can contain only numbers."),
    expDateMonth: z
      .string()
      .length(2, "Expiration month should be 2 numbers (01-12).")
      .regex(
        new RegExp("^[0-9]*$"),
        "Expiration date can contain only numbers."
      ),
    expDateYear: z
      .string()
      .length(4, "Expiration year should be 4 numbers.")
      .regex(
        new RegExp("^[0-9]*$"),
        "Expiration date can contain only numbers."
      ),
    cvv: z
      .string()
      .min(3, "CVV should be at least 3 numbers.")
      .max(4, "CVV should be at most 4 numbers.")
      .regex(new RegExp("^[0-9]*$"), "CVV can contain only numbers."),
  })
  .superRefine(({ cardNumber }, ctx) => {
    if (!valid.number(cardNumber).isValid) {
      ctx.addIssue({
        path: ["cardNumber"],
        code: "custom",
        message: "Invalid Card Number",
      });
    }
  });

export default function Checkout({
  params,
}: {
  params: { listingRef: string };
}) {
  const [listing, setListing] = useState<null | listing>(null);
  const [user, setUser] = useState<null | user>(null);
  const [loading, setLoading] = useState(false);
  const [successDialogOpen, setSuccessDialogOpen] = useState(false);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      quantity: 1,
      ffl: "",
      fullName: "",
      address1: "",
      address2: "",
      city: "",
      zip: "",
      cardNumber: "",
      expDateYear: "",
      cvv: "",
    },
  });

  // On form submit
  const onSubmit = async (values: z.infer<typeof FormSchema>) => {
    console.log(values);
    setLoading(true);
    let data: any = values;
    data.listingRef = params.listingRef;

    axios
      .post(process.env.NEXT_PUBLIC_API_URL + "/checkout/listing", data, {
        withCredentials: true,
      })
      .then((response: AxiosResponse) => {
        console.log(response.data);
        setSuccessDialogOpen(true);
      })
      .catch((err) => {
        setLoading(false);
        toast({
          variant: "destructive",
          title: "There was an error processing your checkout.",
          description: err.response.data.message,
        });
        console.log(err);
      });
  };

  useEffect(() => {
    setUser(getUser());
  }, []);

  useEffect(() => {
    axios
      .get(
        process.env.NEXT_PUBLIC_API_URL +
          "/listings/listing/" +
          params.listingRef,
        {
          withCredentials: true,
        }
      )
      .then((response: AxiosResponse) => {
        const listing = response.data;

        if (listing) {
          // checks
          if (listing.listing_type === "auction" && !listing.buy_now_price) {
            // If listing is an auction with no Buy Now Price
            window.location.replace(process.env.NEXT_PUBLIC_BASE_URL + "/");
          }
          if (isEnded(listing.end_date)) {
            // If listing has ended
            window.location.replace(process.env.NEXT_PUBLIC_BASE_URL + "/");
          }
          setListing(listing);
        } else {
          setListing(null);
        }
      })
      .catch((err: AxiosError) => {
        console.log(err);
        setListing(null);
      });
  }, []);

  if (!user?.verified) {
    // user email not verified
    return (
      <p className="p-3 border rounded">
        Please{" "}
        <Link className="text-blue-800 font-semibold" href="/verify-email">
          verify your email address
        </Link>{" "}
        to create a listing.
      </p>
    );
  } else if (user.account_status !== "active") {
    return (
      <p className="p-3 border rounded">
        Please{" "}
        <Link className="text-blue-800 font-semibold" href="/complete-info">
          complete your profile information
        </Link>{" "}
        to create a listing.
      </p>
    );
  }

  return listing ? (
    <>
      <div className="flex flex-col gap-3">
        <div className="flex gap-8 flex-col md:flex-row">
          <div className="md:basis-3/5 basis-full flex flex-col gap-5">
            <Shipping form={form} />
            <Billing form={form} />
          </div>
          <div className="md:basis-2/5 md:block">
            <Summary listing={listing} form={form}>
              <Button
                onClick={form.handleSubmit(onSubmit)}
                className="w-full bg-blue-800 hover:bg-blue-900"
              >
                {loading ? <Spinner size={25} /> : "Purchase"}
              </Button>
            </Summary>
          </div>
        </div>
      </div>
      <AlertDialog open={successDialogOpen}>
        <AlertDialogContent>
          <div className="flex flex-col gap-8 items-center">
            <Image
              src="/assets/icons/check.png"
              width={50}
              height={50}
              alt=""
            />
            <div className="text-center">
              <p className="font-display text-3xl">Checkout Successful!</p>
              <p className="text-center text-gray-500">
                You&apos;re checkout has been processed successfully!
              </p>
            </div>
            <Link href="/account/orders">
              <Button className="w-36">Your Orders</Button>
            </Link>
          </div>
        </AlertDialogContent>
      </AlertDialog>
    </>
  ) : (
    <div className="h-96 flex items-center">
      <LoadingSpinner />
    </div>
  );
}
