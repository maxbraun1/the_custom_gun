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
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { states } from "@/lib/util/states";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function ShippingStep({ form }: { form: any }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Payment & Shipping</CardTitle>
        <CardDescription>
          Configure payment and shipping options.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form className="space-y-4">
            <FormField
              control={form.control}
              name="is_free_shipping"
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

            {!form.getValues("is_free_shipping") && (
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
              name="seller_state"
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
                                  form.setValue("seller_state", state.value);
                                  field.onChange;
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
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
