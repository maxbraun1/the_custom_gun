"use client";

import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Spinner } from "@/components/ui/spinner";
import { states } from "@/lib/util/states";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import axios, { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";
import { useSession } from "@/app/(auth)/useSession";

const FormSchema = z.object({
  billing_name: z
    .string()
    .min(3, "Name must be at least 3 characters.")
    .max(100, "Name cannot be more than 100 characters."),
  billing_address_1: z
    .string()
    .min(3, "Address must be at least 3 characters.")
    .max(100, "Address cannot be more than 100 characters."),
  billing_address_2: z.string(),
  billing_city: z
    .string()
    .min(2, "City must be at least 2 characters.")
    .max(100, "City cannot be more than 100 characters."),
  billing_state: z.string(),
  billing_zip: z
    .string()
    .min(5, "Zip code must be at least 5 characters.")
    .max(10, "Zip code cannot be more than 10 characters."),
});

interface defaultBillingInfo {
  billing_name: string;
  billing_address_1: string;
  billing_address_2: string;
  billing_city: string;
  billing_state: string;
  billing_zip: string;
}

export default function DefaultBillingForm() {
  const [loading, setLoading] = useState<Boolean>(false);
  const [defaultBillingInfo, setDefaultBillingInfo] =
    useState<null | defaultBillingInfo>(null);

  useEffect(() => {
    axios
      .get(process.env.NEXT_PUBLIC_API_URL + "/users/default-billing", {
        withCredentials: true,
      })
      .then((response) => {
        setDefaultBillingInfo(response.data);
      })
      .catch((error: AxiosError) => {
        console.log(error);
      });
  }, []);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      billing_name: "",
      billing_address_1: "",
      billing_address_2: "",
      billing_city: "",
      billing_state: "",
      billing_zip: "",
    },
  });

  // On form submit
  const onSubmit = async (values: z.infer<typeof FormSchema>) => {
    setLoading(true);

    const billing_name = values.billing_name;
    const billing_address_1 = values.billing_address_1;
    const billing_address_2 = values.billing_address_2;
    const billing_city = values.billing_city;
    const billing_state = values.billing_state;
    const billing_zip = values.billing_zip;

    await axios
      .put(
        process.env.NEXT_PUBLIC_API_URL + "/users/default-billing",
        {
          billing_name,
          billing_address_1,
          billing_address_2,
          billing_city,
          billing_state,
          billing_zip,
        },
        { withCredentials: true }
      )
      .then((response) => {
        // Update Session
        useSession.setState({ user: response.data });

        // Update Default Billing Info
        setDefaultBillingInfo({
          billing_name: response.data.billing_name,
          billing_address_1: response.data.billing_address_1,
          billing_address_2: response.data.billing_address_2,
          billing_city: response.data.billing_city,
          billing_state: response.data.billing_state,
          billing_zip: response.data.billing_zip,
        });
      })
      .catch((error: AxiosError) => {
        console.log(error);
      });
    setLoading(false);
  };

  function currentBillingInfo() {
    if (defaultBillingInfo) {
      return (
        <div className="text-sm px-3 py-2 mt-5 bg-gray-100 rounded w-full">
          <p className="font-bold">Your Info</p>
          <p>{defaultBillingInfo.billing_name}</p>
          <p>{defaultBillingInfo.billing_address_1}</p>
          <p>{defaultBillingInfo.billing_address_2}</p>
          <p>
            {defaultBillingInfo.billing_city},{" "}
            {defaultBillingInfo.billing_state}
          </p>
          <p>{defaultBillingInfo.billing_zip}</p>
        </div>
      );
    } else {
      return (
        <div className="text-sm px-3 py-2 mt-5 bg-gray-100 rounded w-full">
          <p className="text-gray-800 text-center">
            You don&apos;t have any saved billing information.
          </p>
        </div>
      );
    }
  }

  return (
    <div className="flex flex-col gap-5 md:flex-row">
      <div className="basis-1/2">
        <h1 className="font-bold">Default Billing Information</h1>
        <p className="text-xs text-gray-500 leading-5">
          You can save your billing information to your account, so it will be
          auto filled when you checkout.
        </p>
        {currentBillingInfo()}
      </div>

      <div className="basis-1/2">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
            <FormField
              control={form.control}
              name="billing_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Your Full Name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="billing_address_1"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Address 1</FormLabel>
                  <FormControl>
                    <Input placeholder="Street Address" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="billing_address_2"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Address 2</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Apartment, suite, unit, etc."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="billing_city"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>City</FormLabel>
                  <FormControl>
                    <Input placeholder="City" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="billing_state"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Seller State</FormLabel>
                  <br />
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          role="combobox"
                          className={cn(
                            "w-full justify-between",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value
                            ? states.find(
                                (state) => state.value === field.value
                              )?.name
                            : "Select state"}
                          <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-full p-0">
                      <Command>
                        <CommandInput
                          placeholder="Search State..."
                          className="h-9"
                        />
                        <CommandEmpty>No state found.</CommandEmpty>
                        <CommandGroup>
                          <ScrollArea className="h-72 w-full rounded-md border">
                            {states.map((state) => (
                              <CommandItem
                                value={state.name}
                                key={state.value}
                                onSelect={() => {
                                  form.setValue("billing_state", state.value);
                                }}
                              >
                                {state.name}
                                <CheckIcon
                                  className={cn(
                                    "ml-auto h-4 w-4",
                                    state.value === field.value
                                      ? "opacity-100"
                                      : "opacity-0"
                                  )}
                                />
                              </CommandItem>
                            ))}
                          </ScrollArea>
                        </CommandGroup>
                      </Command>
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="billing_zip"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Zip Code</FormLabel>
                  <FormControl>
                    <Input placeholder="12345" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              className="mt-4 w-48 bg-blue-800 hover:bg-blue-900"
            >
              {loading ? <Spinner size={25} /> : "Update Billing Info"}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
