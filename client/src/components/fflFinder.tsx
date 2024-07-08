"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import Image from "next/image";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const FormSchema = z.object({
  searchTerm: z.string(),
});

export default function FFLFinder({
  selectedFFL,
  setFFL,
}: {
  selectedFFL: ffl | null;
  setFFL: Function;
}) {
  const [ffls, setFFLs] = useState<null | Array<ffl>>(null);
  const [loading, setLoading] = useState(false);
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      searchTerm: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof FormSchema>) => {
    setFFL(null);
    setLoading(true);
    if (!values.searchTerm || values.searchTerm.trim().length < 1) {
      setLoading(false);
      return;
    }
    await axios
      .get(process.env.NEXT_PUBLIC_API_URL + "/ffls/find/" + values.searchTerm)
      .then((response) => {
        if (response.data.length < 1) {
          setFFLs(null);
        } else {
          setFFLs(response.data);
        }
      })
      .catch((error) => console.log(error));
    setLoading(false);
  };

  return (
    <div>
      <h1 className="font-semibold">FFL Finder</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="flex gap-2">
            <FormField
              control={form.control}
              name="searchTerm"
              render={({ field }) => (
                <FormItem className="flex-grow">
                  <FormControl>
                    <Input
                      placeholder="ZIP Code, City, or FFL Name"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button className="bg-blue-800 hover:text-white w-32" type="submit">
              {loading ? <Spinner size={20} /> : "Search FFLs"}
            </Button>
          </div>
        </form>
      </Form>
      <div className="flex flex-col gap-2 mt-5 rounded p-4 bg-gray-100 max-h-72 overflow-y-auto overflow-hidden border">
        {ffls ? (
          ffls.map((ffl, index) => {
            let selectedClass = "";
            if (selectedFFL?.id === ffl.id) {
              selectedClass = " border-2 border-blue-700";
            }
            return (
              <div
                onClick={() => setFFL(ffl)}
                className={
                  "border rounded p-3 cursor-pointer bg-white" + selectedClass
                }
                key={index}
              >
                <h1 className="font-semibold line-clamp-1">
                  {ffl.BUSINESS_NAME ? ffl.BUSINESS_NAME : ffl.LICENSE_NAME}
                </h1>
                <p className="text-sm">{ffl.PREMISE_STREET}</p>
                <p className="text-sm">
                  {ffl.PREMISE_CITY + ", " + ffl.PREMISE_STATE}
                </p>
                {ffl.VOICE_PHONE && (
                  <div className="flex items-center gap-1 grayscale hover:grayscale-0 w-fit">
                    <Image
                      src="/assets/icons/phone.png"
                      width={15}
                      height={15}
                      alt=""
                    />
                    <a
                      className="text-sm underline text-blue-700"
                      href={"tel:" + ffl.VOICE_PHONE}
                    >
                      {ffl.VOICE_PHONE}
                    </a>
                  </div>
                )}
              </div>
            );
          })
        ) : (
          <p className="text-sm text-center p-5">
            <span className="font-semibold">No FFLs Found.</span>
            <br />
            Enter a zip code or FFL name above to seach FFLs near you.
          </p>
        )}
      </div>
    </div>
  );
}
