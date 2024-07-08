"use client";

import { Button } from "@/components/ui/button";
import axios, { AxiosError } from "axios";
import { useEffect, useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import FFLFinder from "@/components/fflFinder";
import { Spinner } from "@/components/ui/spinner";
import Link from "next/link";

export default function DefaultFFL() {
  const [loading, setLoading] = useState(false);
  const [selectedFFL, setSelectedFFL] = useState<null | ffl>(null);
  const [fflSelectorOpen, setFFLSelectorOpen] = useState(false);
  const [defaultFFL, setDefaultFFL] = useState<null | ffl>(null);

  useEffect(() => {
    axios
      .get(process.env.NEXT_PUBLIC_API_URL + "/users/default-ffl", {
        withCredentials: true,
      })
      .then((response) => {
        setDefaultFFL(response.data);
      })
      .catch((error: AxiosError) => {
        console.log(error);
      });
  }, []);

  function submitFFL() {
    if (selectedFFL) {
      setLoading(true);
      setFFLSelectorOpen(false);
      axios
        .put(
          process.env.NEXT_PUBLIC_API_URL + "/users/default-ffl",
          { ffl_id: selectedFFL.id },
          {
            withCredentials: true,
          }
        )
        .then((response) => {
          setDefaultFFL(response.data);
          setLoading(false);
        })
        .catch((error: AxiosError) => {
          console.log(error);
          setLoading(false);
        });
    }
  }

  return (
    <div className="flex flex-col gap-5 md:flex-row">
      <AlertDialog open={fflSelectorOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Select a Default FFL?</AlertDialogTitle>
          </AlertDialogHeader>
          <div className="border rounded p-4">
            <FFLFinder selectedFFL={selectedFFL} setFFL={setSelectedFFL} />
          </div>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setFFLSelectorOpen(false)}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              disabled={selectedFFL === null}
              onClick={() => submitFFL()}
            >
              Select FFL
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <div className="basis-1/2">
        <h1 className="font-bold">Default FFL</h1>
        <p className="text-xs text-gray-500 leading-5">
          Every firearm purchased online must be shipped to a business with a
          valid Federal Firearms License (FFL). Select an FFL here to set a
          default that will be automatically selected when you check out.
        </p>
      </div>

      <div className="basis-1/2">
        {defaultFFL ? (
          <div>
            <div className="text-sm px-3 py-2 mb-5 bg-gray-100 rounded w-full">
              <p className="font-bold">Your Default FFL</p>
              <p>{defaultFFL.BUSINESS_NAME}</p>
              <p>{defaultFFL.PREMISE_STREET}</p>
              <p>
                {defaultFFL.PREMISE_CITY}, {defaultFFL.PREMISE_STATE}
              </p>
              <p>{defaultFFL.PREMISE_ZIP_CODE}</p>
              {defaultFFL.VOICE_PHONE && (
                <Link href={"tel:" + defaultFFL.VOICE_PHONE}>
                  {defaultFFL.VOICE_PHONE}
                </Link>
              )}
            </div>
            <Button
              onClick={() => setFFLSelectorOpen(true)}
              className="bg-blue-800 hover:bg-blue-900"
            >
              Update Default FFL
            </Button>
          </div>
        ) : (
          <div className="w-full flex justify-center">
            <Button
              onClick={() => setFFLSelectorOpen(true)}
              className="bg-blue-800 hover:bg-blue-900 w-42"
            >
              {loading ? <Spinner /> : "Select a Default FFL"}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
