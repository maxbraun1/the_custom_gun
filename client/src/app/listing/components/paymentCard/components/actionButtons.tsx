"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CardFooter } from "@/components/ui/card";
import { listing } from "@/lib/types/listing";
import { user } from "@/lib/types/user";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Spinner } from "../../../../../components/ui/spinner";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { formatter } from "@/lib/util/currencyFormatter";
import axios, { AxiosResponse } from "axios";
import { toast } from "@/components/ui/use-toast";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import getUserClientSide from "@/lib/util/getUser";

export function ActionButtons({ listing }: { listing: listing }) {
  const [bidDialogOpen, setBidDialogOpen] = useState(false);
  const [offerDialogOpen, setOfferDialogOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [bidSuccess, setBidSuccess] = useState(false);
  const [offerSuccess, setOfferSuccess] = useState(false);
  const [successBidAmount, setSuccessBidAmount] = useState<number | null>(null);
  const [offerPrice, setOfferPrice] = useState<null | number>(null);
  const [offerQTY, setOfferQTY] = useState<null | number>(null);
  const [offerAlreadyMade, setOfferAlreadyMade] = useState(true);
  const [user, setUser] = useState<null | user>(null);

  useEffect(() => {
    setUser(getUserClientSide());
    axios
      .get(process.env.NEXT_PUBLIC_API_URL + "/offers/check/" + listing.id, {
        withCredentials: true,
      })
      .then((response: AxiosResponse) => {
        setOfferAlreadyMade(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const BidFormSchema = z.object({
    bid: z.coerce
      .number()
      .min(
        listing.current_bid + 5,
        "Bid must be at least " +
          formatter.format(listing.current_bid + 5) +
          "."
      )
      .max(
        listing.current_bid + 10000,
        "Maximum bid is " + formatter.format(listing.current_bid + 10000) + "."
      )
      .multipleOf(0.01, {
        message: "Bid must have no more than 2 decimal places.",
      }),
  });

  const OfferFormSchema = z.object({
    offer: z.coerce
      .number()
      .min(1, "Offer must be at least $1.00.")
      .max(
        listing.price - 1,
        "Maximum offer is " + formatter.format(listing.price - 1) + "."
      )
      .multipleOf(0.01, {
        message: "Offer must have no more than 2 decimal places.",
      }),
    quantity: z.coerce
      .number()
      .int()
      .max(listing.quantity, "Maximum quantity is " + listing.quantity + ".")
      .min(1, "Minimum quantity is 1."),
  });

  const placeBid = async (values: z.infer<typeof BidFormSchema>) => {
    setLoading(true);
    const bid = values.bid;

    await axios
      .post(
        process.env.NEXT_PUBLIC_API_URL + "/bids",
        { amount: bid, listing_id: listing.id },
        { withCredentials: true }
      )
      .then((response: AxiosResponse) => {
        console.log(response);
        if (response.data.error) {
          toast({
            variant: "destructive",
            title: response.data.message,
          });
        } else {
          setSuccessBidAmount(bid);
          setBidSuccess(true);
        }
      })
      .catch((err) => {
        console.log(err);
        toast({
          variant: "destructive",
          title:
            "There was an error while placing your bid. Please try again later.",
        });
      });

    setLoading(false);
  };

  const submitOffer = async (values: z.infer<typeof OfferFormSchema>) => {
    setLoading(true);
    const amount = values.offer;
    const quantity = values.quantity;

    await axios
      .post(
        process.env.NEXT_PUBLIC_API_URL + "/offers",
        { amount, quantity, listing_id: listing.id },
        { withCredentials: true }
      )
      .then((response: AxiosResponse) => {
        console.log(response);
        if (response.data.error) {
          toast({
            variant: "destructive",
            title: response.data.message,
          });
        } else {
          setOfferSuccess(true);
        }
      })
      .catch((err) => {
        console.log(err);
        toast({
          variant: "destructive",
          title:
            "There was an error while submitting your offer. Please try again later.",
        });
      });

    setLoading(false);
  };

  const bidForm = useForm<z.infer<typeof BidFormSchema>>({
    resolver: zodResolver(BidFormSchema),
    defaultValues: {
      bid: 0,
    },
  });

  const offerForm = useForm<z.infer<typeof OfferFormSchema>>({
    resolver: zodResolver(OfferFormSchema),
    defaultValues: {
      offer: 0,
      quantity: 1,
    },
  });

  offerForm.watch((values) => {
    setOfferPrice(Number(values.offer));
    setOfferQTY(Number(values.quantity));
  });

  function isBuyNowButton() {
    if (listing.listing_type === "fixed") {
      return true;
    }
    if (listing.listing_type === "auction" && listing.buy_now_price > 0) {
      return true;
    } else {
      return false;
    }
  }

  function offerDialog() {
    if (listing.accept_offers) {
      return (
        <AlertDialog open={offerDialogOpen}>
          <AlertDialogContent>
            {offerSuccess ? (
              <div className="flex flex-col gap-8 items-center">
                <Image
                  src="/assets/icons/check.png"
                  width={50}
                  height={50}
                  alt=""
                />
                <div className="text-center">
                  <p className="font-display text-3xl">Offer Sent!</p>
                  <p className="text-center text-gray-500">
                    You&apos;re offer has been sent successfully!
                  </p>
                </div>
                <Button
                  className="w-24"
                  onClick={() => {
                    window.location.reload();
                  }}
                >
                  Close
                </Button>
              </div>
            ) : (
              <>
                <AlertDialogHeader>
                  <AlertDialogTitle>Make an Offer</AlertDialogTitle>
                  <AlertDialogDescription>
                    By submitting an offer, you agree to buy this item if the
                    seller accepts your offer.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <Form {...offerForm}>
                  <form onSubmit={offerForm.handleSubmit(submitOffer)}>
                    <FormField
                      control={offerForm.control}
                      name="offer"
                      render={({ field }) => (
                        <FormItem className="mb-2">
                          <FormLabel htmlFor="offer">
                            Your offer (Per Unit USD)
                          </FormLabel>
                          <FormControl>
                            <Input
                              id="offer"
                              placeholder="Offer Amount"
                              type="text"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={offerForm.control}
                      name="quantity"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel htmlFor="quantity">Quantity</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              id="quantity"
                              min={1}
                              max={listing.quantity}
                              placeholder="Offer Quantity"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    {offerQTY && offerPrice ? (
                      <div className="bg-blue-100 rounded my-3 p-3 text-sm">
                        <p className="font-semibold">Your Offer:</p>
                        <p>
                          {formatter.format(offerForm.getValues().offer)} x{" "}
                          {offerForm.getValues().quantity} ={" "}
                          <span className="font-semibold">
                            {formatter.format(
                              offerForm.getValues().offer *
                                offerForm.getValues().quantity
                            )}
                          </span>
                        </p>
                      </div>
                    ) : null}

                    <AlertDialogFooter className="mt-3">
                      <AlertDialogCancel
                        onClick={() => {
                          setOfferDialogOpen(false);
                          offerForm.reset();
                        }}
                      >
                        Cancel
                      </AlertDialogCancel>
                      <AlertDialogAction asChild>
                        <Button
                          type="submit"
                          className="bg-blue-800 w-32 hover:bg-blue-900"
                        >
                          {loading ? <Spinner size={20} /> : "Submit Offer"}
                        </Button>
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </form>
                </Form>
              </>
            )}
          </AlertDialogContent>
        </AlertDialog>
      );
    }
  }

  function newBidDialog() {
    if (listing.listing_type === "auction") {
      return (
        <AlertDialog open={bidDialogOpen}>
          <AlertDialogContent>
            {bidSuccess ? (
              <div className="flex flex-col gap-8 items-center">
                <Image
                  src="/assets/icons/check.png"
                  width={50}
                  height={50}
                  alt=""
                />
                <div className="text-center">
                  <p className="font-display text-3xl">Bid placed!</p>
                  {successBidAmount !== null && (
                    <p className="text-center text-gray-500">
                      You&apos;ve placed a bid for{" "}
                      {formatter.format(successBidAmount)} on &ldquo;
                      {listing.title}&ldquo;.
                    </p>
                  )}
                </div>
                <Button
                  className="w-24"
                  onClick={() => window.location.reload()}
                >
                  Close
                </Button>
              </div>
            ) : (
              <>
                <AlertDialogHeader>
                  <AlertDialogTitle>Place new bid</AlertDialogTitle>
                  <AlertDialogDescription>
                    By submitting this bid, you agree to buy this item if you
                    are the winning bidder.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <Form {...bidForm}>
                  <form onSubmit={bidForm.handleSubmit(placeBid)}>
                    <FormField
                      control={bidForm.control}
                      name="bid"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel htmlFor="bid">Your bid</FormLabel>
                          <FormControl>
                            <Input
                              id="bid"
                              placeholder="Bid Amount"
                              type="number"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <span className="text-sm text-gray-500">
                      Minimum Bid: {formatter.format(listing.current_bid + 5)}
                    </span>
                    <AlertDialogFooter className="mt-3">
                      <AlertDialogCancel
                        onClick={() => {
                          setBidDialogOpen(false);
                          bidForm.reset();
                        }}
                      >
                        Cancel
                      </AlertDialogCancel>
                      <AlertDialogAction asChild>
                        <Button
                          type="submit"
                          className="bg-blue-800 w-24 hover:bg-blue-900"
                        >
                          {loading ? <Spinner size={20} /> : "Place Bid"}
                        </Button>
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </form>
                </Form>
              </>
            )}
          </AlertDialogContent>
        </AlertDialog>
      );
    }
  }

  if (listing.user.ref === user?.ref) return null;

  if (!user) {
    // User not logged in
    return (
      <>
        <Separator />
        <p className="text-center p-3">
          <Link className="text-blue-800 font-semibold" href="/login">
            Log In
          </Link>{" "}
          or{" "}
          <Link className="text-blue-800 font-semibold" href="/signup">
            Sign Up
          </Link>{" "}
          to interact with this listing.
        </p>
      </>
    );
  }
  if (!user.verified) {
    // user email not verified
    return (
      <>
        <Separator />
        <p className="text-center p-3">
          Please{" "}
          <Link className="text-blue-800 font-semibold" href="/verify-email">
            verify your email address
          </Link>{" "}
          to interact with this listing.
        </p>
      </>
    );
  } else if (user.account_status !== "active") {
    return (
      <>
        <Separator />
        <p className="text-center p-3">
          Please{" "}
          <Link className="text-blue-800 font-semibold" href="/complete-info">
            complete your profile information
          </Link>{" "}
          to interact with this listing.
        </p>
      </>
    );
  } else {
    return (
      <>
        <Separator />
        <CardFooter className="flex p-3 gap-3">
          {isBuyNowButton() && (
            <Button
              onClick={() =>
                window.location.replace("/checkout/" + listing.ref)
              }
              className="bg-blue-900 hover:bg-blue-950 w-full"
            >
              Buy Now
            </Button>
          )}

          {listing.listing_type === "auction" && (
            <>
              {newBidDialog()}
              <Button
                onClick={() => setBidDialogOpen(true)}
                className="bg-gray-800 hover:bg-gray-900 w-full"
              >
                Place Bid
              </Button>
            </>
          )}

          {listing.accept_offers && (
            <>
              {offerDialog()}
              <Button
                onClick={() => setOfferDialogOpen(true)}
                variant="outline"
                className="w-full flex items-center gap-1"
                disabled={offerAlreadyMade}
              >
                <Image
                  className="invert"
                  src="/assets/icons/dollar.png"
                  width={20}
                  height={20}
                  alt=""
                />
                {offerAlreadyMade ? "Offer Sent" : "Make an Offer"}
              </Button>
            </>
          )}
        </CardFooter>
      </>
    );
  }
}
