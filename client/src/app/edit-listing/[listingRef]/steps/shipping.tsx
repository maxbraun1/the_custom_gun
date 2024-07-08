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
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { states } from "@/lib/util/states";
import { ScrollArea } from "@/components/ui/scroll-area";
import { listing } from "@/lib/types/listing";

const FormSchema = z
  .object({
    freeShipping: z.boolean(),
    fromState: z.string(),
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
  .superRefine(({ shipping_charge, freeShipping }, ctx) => {
    if (!freeShipping) {
      const sp = shipping_charge;
      if (!sp) {
        ctx.addIssue({
          path: ["shipping_charge"],
          code: "custom",
          message: "Shipping charge is required if free shipping is disabled.",
        });
      }
    }
  });

export default function ShippingStep({
  listing,
  updateListing,
  setShippingStepReady,
}: {
  listing: listing;
  updateListing: Function;
  setShippingStepReady: Function;
}) {
  const [saved, setSaved] = useState(false);
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      fromState: listing.seller_state,
      shipping_charge: listing.shipping_charge,
      freeShipping: listing.is_free_shipping,
    },
  });

  form.watch((x) => {
    setSaved(false);
  });

  useEffect(() => {
    setShippingStepReady(saved);
  }, [saved]);

  // On form submit
  const onSubmit = async (values: z.infer<typeof FormSchema>) => {
    updateListing({
      is_free_shipping: values.freeShipping,
      shipping_charge: values.shipping_charge,
      seller_state: values.fromState,
    });
    setSaved(true);
  };

  return (
    <Card className={saved ? "border-green-700" : ""}>
      <CardHeader>
        <CardTitle>Payment & Shipping</CardTitle>
        <CardDescription>
          Configure payment and shipping options.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="freeShipping"
              render={({ field }) => (
                <FormItem className="flex items-center space-x-2">
                  <Label htmlFor="airplane-mode">Free Shipping</Label>
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

            {!form.getValues("freeShipping") && (
              <FormField
                control={form.control}
                name="shipping_charge"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Shipping Charge</FormLabel>
                    <FormControl>
                      <Input
                        className="w-full max-w-xs"
                        placeholder="Shipping charge"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            <FormField
              control={form.control}
              name="fromState"
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
                            "w-[200px] justify-between",
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
                    <PopoverContent className="w-[200px] p-0">
                      <Command>
                        <CommandInput
                          placeholder="Search State..."
                          className="h-9"
                        />
                        <CommandEmpty>No state found.</CommandEmpty>
                        <CommandGroup>
                          <ScrollArea className="h-72 w-48 rounded-md border">
                            {states.map((state) => (
                              <CommandItem
                                value={state.name}
                                key={state.value}
                                onSelect={() => {
                                  form.setValue("fromState", state.value);
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

            <Button
              className="bg-blue-800 hover:bg-blue-900 w-fit"
              type="submit"
              disabled={saved}
            >
              {saved ? "Saved" : "Save"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
