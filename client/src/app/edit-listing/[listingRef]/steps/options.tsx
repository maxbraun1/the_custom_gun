"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { listing } from "@/lib/types/listing";

const FixedFormSchema = z.object({
  price: z.coerce
    .number({
      required_error: "Please enter a price.",
      invalid_type_error: "Price must contain only numbers and decimals.",
    })
    .min(1, "Price must be at least $1.")
    .max(1000000, "Maximum price is $1,000,000.")
    .multipleOf(0.01, {
      message: "Price must have no more than 2 decimal places.",
    }),
  duration: z.coerce.number().min(1).max(90),
  quantity: z.coerce
    .number({
      required_error: "Please enter a quantity",
      invalid_type_error: "Quantity must be a number.",
    })
    .int({ message: "Quantity must be an whole number." })
    .min(1, "Quantity must be at least 1.")
    .max(100, "Maximum 100 quantity allowed."),
  offers: z.boolean(),
});

const AuctionFormSchema = z
  .object({
    starting_bid: z.coerce
      .number({
        required_error: "Please enter a price.",
        invalid_type_error: "Price must contain only numbers and decimals.",
      })
      .min(0.01, "Minimum starting bid is $0.01.")
      .max(1000000, "Maximum starting bid is $1,000,000.")
      .multipleOf(0.01, {
        message: "Price must have no more than 2 decimal places.",
      }),
    duration: z.coerce.number().min(1).max(90),
    reserve: z.coerce
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
  })
  .superRefine(({ starting_bid, reserve, buy_now_price }, ctx) => {
    if (
      typeof reserve === "number" &&
      typeof starting_bid === "number" &&
      starting_bid > reserve
    ) {
      ctx.addIssue({
        path: ["reserve"],
        code: "custom",
        message: "Reserve price must be greater than starting bid.",
      });
    }
    if (
      typeof buy_now_price === "number" &&
      typeof reserve === "number" &&
      reserve > buy_now_price
    ) {
      ctx.addIssue({
        path: ["buy_now_price"],
        code: "custom",
        message: "Buy now price must be greater than reserve price.",
      });
    }
  });

export default function OptionsStep({
  listing,
  updateListing,
  setOptionsStepReady,
}: {
  listing: listing;
  updateListing: Function;
  setOptionsStepReady: Function;
}) {
  const [saleType, setSaleType] = useState("fixed");
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (saleType === "fixed") {
      auctionForm.reset();
    } else if (saleType === "auction") {
      fixedForm.reset();
    }
  }, [saleType]);

  useEffect(() => {
    setOptionsStepReady(saved);
  }, [saved]);

  const fixedForm = useForm<z.infer<typeof FixedFormSchema>>({
    resolver: zodResolver(FixedFormSchema),
    defaultValues: {
      duration: listing.listing_duration || 3,
      price: listing.price || 0,
      quantity: listing.quantity || 1,
      offers: listing.accept_offers || false,
    },
  });

  const auctionForm = useForm<z.infer<typeof AuctionFormSchema>>({
    resolver: zodResolver(AuctionFormSchema),
    defaultValues: {
      duration: listing.listing_duration || 3,
      reserve: listing.reserve_price || "",
      buy_now_price: listing.buy_now_price || "",
      starting_bid: listing.starting_bid || 0,
    },
  });

  fixedForm.watch(() => {
    setSaved(false);
  });

  auctionForm.watch(() => {
    setSaved(false);
  });

  // On fixed form submit
  const onFixedSubmit = async (values: z.infer<typeof FixedFormSchema>) => {
    updateListing({
      listing_type: "fixed",
      price: values.price,
      quantity: values.quantity,
      duration: values.duration,
      accept_offers: values.offers,
    });
    setSaved(true);
  };

  // On auction form submit
  const onAuctionSubmit = async (values: z.infer<typeof AuctionFormSchema>) => {
    updateListing({
      listing_type: "auction",
      starting_bid: values.starting_bid,
      reserve_price: values.reserve,
      buy_now_price: values.buy_now_price,
      duration: values.duration,
    });
    setSaved(true);
  };

  return (
    <Card className={saved ? "border-green-700" : ""}>
      <CardHeader>
        <CardTitle>Options</CardTitle>
        <CardDescription>Configure your listing.</CardDescription>
      </CardHeader>
      <CardContent>
        {listing.listing_type === "fixed" && (
          <Form {...fixedForm}>
            <form
              onSubmit={fixedForm.handleSubmit(onFixedSubmit)}
              className="space-y-4"
            >
              <div className="flex flex-col sm:flex-row sm:gap-5">
                <div className="w-full space-y-4 sm:w-1/2">
                  <FormField
                    control={fixedForm.control}
                    name="price"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Price</FormLabel>
                        <FormControl>
                          <Input placeholder="Price" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={fixedForm.control}
                    name="duration"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Listing Duration</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value.toString()}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Duration" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="1">1 Day</SelectItem>
                            <SelectItem value="3">3 Days</SelectItem>
                            <SelectItem value="5">5 Days</SelectItem>
                            <SelectItem value="7">7 Days</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="w-full space-y-4 sm:w-1/2">
                  <FormField
                    control={fixedForm.control}
                    name="quantity"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Quantity</FormLabel>
                        <FormControl>
                          <Input
                            min={1}
                            max={100}
                            step={1}
                            type="number"
                            placeholder="Quantity"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <FormField
                control={fixedForm.control}
                name="offers"
                render={({ field }) => (
                  <FormItem className="flex items-center space-x-2">
                    <Label htmlFor="airplane-mode">Accept Offers?</Label>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                className="bg-blue-800 hover:bg-blue-900 w-fit"
                type="submit"
                disabled={saved}
              >
                {saved ? "Saved" : "Save"}
              </Button>
            </form>
          </Form>
        )}

        {listing.listing_type === "auction" && (
          <Form {...auctionForm}>
            <form
              onSubmit={auctionForm.handleSubmit(onAuctionSubmit)}
              className="space-y-4"
            >
              <div className="flex flex-col sm:flex-row sm:gap-5">
                <div className="w-full space-y-4 sm:w-1/2">
                  <FormField
                    control={auctionForm.control}
                    name="starting_bid"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Starting Bid</FormLabel>
                        <FormControl>
                          <Input placeholder="Starting Bid" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={auctionForm.control}
                    name="duration"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Listing Duration</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value.toString()}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Duration" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="1">1 Day</SelectItem>
                            <SelectItem value="3">3 Days</SelectItem>
                            <SelectItem value="5">5 Days</SelectItem>
                            <SelectItem value="7">7 Days</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="w-full space-y-4 sm:w-1/2">
                  <FormField
                    control={auctionForm.control}
                    name="reserve"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Reserve Price (Optional)</FormLabel>
                        <FormControl>
                          <Input placeholder="Reserve Price" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={auctionForm.control}
                    name="buy_now_price"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Buy Now Price (Optional)</FormLabel>
                        <FormControl>
                          <Input placeholder="Buy Now Price" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <Button
                className="bg-blue-800 hover:bg-blue-900 w-fit"
                type="submit"
                disabled={saved}
              >
                {saved ? "Saved" : "Save"}
              </Button>
            </form>
          </Form>
        )}
      </CardContent>
    </Card>
  );
}
