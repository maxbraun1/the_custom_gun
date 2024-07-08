"use client";

import { useEffect, useState } from "react";
import DescribeStep from "./steps/describe";
import ImagesStep from "./steps/images";
import OptionsStep from "./steps/options";
import { Button } from "@/components/ui/button";
import ShippingStep from "./steps/shipping";
import axios, { AxiosResponse } from "axios";
import { Spinner } from "@/components/ui/spinner";
import { toast } from "@/components/ui/use-toast";
import Link from "next/link";
import { user } from "@/lib/types/user";
import { useSession } from "../(auth)/useSession";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

interface listing {
  title: string;
  description: string;
  condition: string;
  upc: string;
  serial_no?: string;
  sku?: string;
  is_engraved: boolean;
  frame_finish: string;
  secondary_finish: string;
  item_type: string;
  brand: string;
  caliber: string;
  images: Array<{
    id: string;
    url: string;
  }>;
  listing_type: string;
  price?: number;
  duration: number;
  quantity?: number;
  accept_offers: boolean;
  starting_bid?: number;
  reserve_price?: number | "";
  buy_now_price?: number | "";
  is_free_shipping: boolean;
  seller_state: string;
  shipping_charge?: number | undefined;
}

const FormSchema = z
  .object({
    title: z
      .string()
      .min(10, {
        message: "Item title must be at least 10 characters.",
      })
      .max(100, {
        message: "Item title cannot be more than 100 characters.",
      }),
    description: z
      .string()
      .min(10, {
        message: "Description must be at least 10 characters.",
      })
      .max(10000, {
        message: "Item title cannot be more than 10000 characters.",
      }),
    condition: z.string(),
    upc: z.string().length(12, { message: "Invalid UPC" }),
    serial_no: z.string(),
    sku: z.string().optional(),
    is_engraved: z.boolean(),
    frame_finish: z.string(),
    secondary_finish: z.string(),
    item_type: z.string(),
    brand: z.string(),
    caliber: z.string(),
    customized_by: z.string().optional(),
    images: z
      .array(
        z.object({
          id: z.string(),
          url: z.string(),
        }),
        { required_error: "Listings must have atleast one image." }
      )
      .nonempty({ message: "Listings must have atleast one image." }),
    thumbnail: z.string(),
    listing_type: z.literal("fixed").or(z.literal("auction")),
    price: z.coerce
      .number({
        required_error: "Please enter a price.",
        invalid_type_error: "Price must contain only numbers and decimals.",
      })
      .min(1, "Price must be at least $1.")
      .max(1000000, "Maximum price is $1,000,000.")
      .multipleOf(0.01, {
        message: "Price must have no more than 2 decimal places.",
      })
      .optional(),
    duration: z.coerce.number().min(1).max(90),
    quantity: z.coerce
      .number({
        required_error: "Please enter a quantity",
        invalid_type_error: "Quantity must be a number.",
      })
      .int({ message: "Quantity must be an whole number." })
      .min(1, "Quantity must be at least 1.")
      .max(100, "Maximum 100 quantity allowed.")
      .optional(),
    accept_offers: z.boolean(),
    starting_bid: z.coerce
      .number({
        required_error: "Please enter a price.",
        invalid_type_error: "Price must contain only numbers and decimals.",
      })
      .min(0.01, "Minimum starting bid is $0.01.")
      .max(1000000, "Maximum starting bid is $1,000,000.")
      .multipleOf(0.01, {
        message: "Price must have no more than 2 decimal places.",
      })
      .optional(),
    reserve_price: z.coerce
      .number({
        required_error: "Please enter a price.",
        invalid_type_error: "Price must contain only numbers and decimals.",
      })
      .min(0.01, "Minimum reserve is $0.01.")
      .max(1000000, "Maximum reserve is $1,000,000.")
      .multipleOf(0.01, {
        message: "Price must have no more than 2 decimal places.",
      })
      .optional()
      .or(z.literal("")),
    buy_now_price: z.coerce
      .number({
        required_error: "Please enter a buy now price.",
        invalid_type_error:
          "buy now price must contain only numbers and decimals.",
      })
      .min(0.01, "Minimum buy now price is $0.01.")
      .max(1000000, "Maximum buy now price is $1,000,000.")
      .multipleOf(0.01, {
        message: "Buy now price must have no more than 2 decimal places.",
      })
      .optional()
      .or(z.literal("")),
    is_free_shipping: z.boolean(),
    seller_state: z.string(),
    shipping_charge: z.union([
      z.coerce
        .number({
          invalid_type_error:
            "Shipping price must contain only numbers and decimals.",
        })
        .min(1, "Minimum shipping charge is $1.")
        .max(1000, "Maximum shipping charge is $1,000.")
        .multipleOf(0.01, {
          message: "Shipping charge must have no more than 2 decimal places.",
        }),
      z.coerce.number().optional(),
    ]),
  })
  .superRefine(
    (
      {
        listing_type,
        starting_bid,
        reserve_price,
        buy_now_price,
        price,
        quantity,
      },
      ctx
    ) => {
      if (
        typeof reserve_price === "number" &&
        typeof starting_bid === "number" &&
        starting_bid > reserve_price
      ) {
        ctx.addIssue({
          path: ["reserve_price"],
          code: "custom",
          message: "Reserve price must be greater than starting bid.",
        });
      }
      if (
        typeof buy_now_price === "number" &&
        typeof reserve_price === "number" &&
        reserve_price > buy_now_price
      ) {
        ctx.addIssue({
          path: ["buy_now_price"],
          code: "custom",
          message: "Buy now price must be greater than reserve price.",
        });
      }

      if (listing_type === "fixed") {
        if (price === undefined)
          ctx.addIssue({
            path: ["price"],
            code: "custom",
            message: "Price is required.",
          });
        if (quantity === undefined)
          ctx.addIssue({
            path: ["quantity"],
            code: "custom",
            message: "Quantity is required.",
          });
      }
      if (listing_type === "auction") {
        if (starting_bid === undefined)
          ctx.addIssue({
            path: ["starting_bid"],
            code: "custom",
            message: "Starting Bid is required.",
          });
      }
    }
  );

export default function NewListing() {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<null | user>(null);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      title: "",
      upc: "",
      serial_no: "",
      sku: "",
      is_engraved: false,
      listing_type: "fixed",
      duration: 3,
      quantity: 1,
      accept_offers: false,
      reserve_price: "",
      buy_now_price: "",
      shipping_charge: 0,
      is_free_shipping: false,
    },
  });

  const onSubmit = async (values: z.infer<typeof FormSchema>) => {
    console.log(values);
    createListing(values);
  };

  useEffect(() => {
    setUser(useSession.getState().user);
  }, []);

  async function createListing(values: listing) {
    let listing: any = values;
    const listing_images = values.images.map((image) => image.id);
    listing.images = listing_images;
    console.log(listing);
    // send new listing request
    setLoading(true);

    if (listing.reserve_price === "") listing.reserve_price = 0;
    if (listing.buy_now_price === "") listing.buy_now_price = 0;
    await axios
      .post(
        process.env.NEXT_PUBLIC_API_URL + "/listings",
        { ...values },
        {
          withCredentials: true,
        }
      )
      .then((response: AxiosResponse) => {
        console.log(response);
        window.location.replace("/listing/" + response.data.ref);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
        toast({
          variant: "destructive",
          description:
            "There was an error while creating your listing, please try again later.",
        });
      });
  }

  if (user && !user.verified) {
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
  } else if (user && user.account_status !== "active") {
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

  return (
    <div className="flex flex-col gap-5">
      <DescribeStep form={form} />
      <ImagesStep form={form} />
      <OptionsStep form={form} />
      <ShippingStep form={form} />
      <Button
        className="bg-blue-800 hover:bg-blue-900 w-40"
        onClick={form.handleSubmit(onSubmit)}
      >
        {loading ? <Spinner size={25} /> : "Create Listing"}
      </Button>
    </div>
  );
}
