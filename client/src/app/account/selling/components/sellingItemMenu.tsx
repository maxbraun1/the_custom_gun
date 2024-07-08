"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
import { Button } from "@/components/ui/button";
import Image from "next/image";
import axios, { AxiosError, AxiosResponse } from "axios";
import { toast } from "@/components/ui/use-toast";
import { listing } from "@/lib/types/listing";
import Link from "next/link";
import { useState } from "react";

export default function SellingItemMenu({
  editDisabled,
  listing,
}: {
  editDisabled: boolean;
  listing: listing;
}) {
  const [confirmEndOpen, setConfirmEndOpen] = useState(false);

  async function endListing() {
    await axios
      .get(
        process.env.NEXT_PUBLIC_API_URL + "/listings/endlisting/" + listing.ref,
        { withCredentials: true }
      )
      .then((response: AxiosResponse) => {
        if (response.data) {
          window.location.replace(window.location.href);
        }
      })
      .catch((err: AxiosError) => {
        console.log(err);
        toast({
          variant: "destructive",
          title:
            "An error occured while ending listing. Please try again later.",
        });
      });
  }

  if (listing.status === "active") {
    return (
      <>
        <AlertDialog open={confirmEndOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>
                Are you sure you want to end this listing?
              </AlertDialogTitle>
              <AlertDialogDescription>
                This will permanently end your listing.{" "}
                <b>This cannot be undone.</b>
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel onClick={() => setConfirmEndOpen(false)}>
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction onClick={endListing}>
                End Listing
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button className="p-1 h-auto" variant="outline">
              <Image
                src="/assets/icons/elipses.png"
                alt=""
                width={20}
                height={20}
              />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuLabel>Listing Options</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="cursor-pointer"
              disabled={editDisabled}
              asChild
            >
              <Link href={"/edit-listing/" + listing.ref}>Edit Listing</Link>
            </DropdownMenuItem>
            <DropdownMenuItem
              className="cursor-pointer"
              onClick={() => setConfirmEndOpen(true)}
            >
              <span className="text-red-500">End Listing</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </>
    );
  }
}
