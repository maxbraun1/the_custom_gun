"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useEffect, useState } from "react";
import FFLFinder from "../../../components/fflFinder";
import axios from "axios";
import { UseFormReturn } from "react-hook-form";

export default function Shipping({ form }: { form: UseFormReturn<any> }) {
  const [ffl, setFFL] = useState<null | ffl>(null);
  useEffect(() => {
    if (ffl) {
      form.setValue("ffl", ffl.id);
    } else {
      form.setValue("ffl", null);
    }
  }, [ffl]);

  useEffect(() => {
    axios
      .get(process.env.NEXT_PUBLIC_API_URL + "/users/default-ffl", {
        withCredentials: true,
      })
      .then((response) => {
        setFFL(response.data);
      })
      .catch((error) => {
        console.log(error.message);
      });
  }, []);

  return (
    <>
      <Card>
        <CardHeader className="p-3">
          <h2 className="font-display text-2xl">Shipping Information</h2>
        </CardHeader>
        <Separator />
        <CardContent className="p-3">
          <FFLFinder selectedFFL={ffl} setFFL={setFFL} />
          {ffl && (
            <div className="p-3 border rounded mt-3 text-sm">
              <p className="text-lg font-semibold">Ship To:</p>
              <p>{ffl.BUSINESS_NAME}</p>
              <p>{ffl.PREMISE_STREET}</p>
              <p>
                {ffl.PREMISE_CITY +
                  ", " +
                  ffl.PREMISE_STATE +
                  ", " +
                  ffl.PREMISE_ZIP_CODE}
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </>
  );
}
