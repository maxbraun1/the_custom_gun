"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
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
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { states } from "@/lib/util/states";
import { cn } from "@/lib/utils";
import { useEffect } from "react";
import { UseFormReturn } from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import valid from "card-validator";
import axios from "axios";

interface DefaultBillingData {
  billing_address_1: string;
  billing_address_2: string;
  billing_city: string;
  billing_name: string;
  billing_state: string;
  billing_zip: string;
}

export default function Billing({ form }: { form: UseFormReturn<any> }) {
  useEffect(() => {
    axios
      .get(process.env.NEXT_PUBLIC_API_URL + "/users/default-billing", {
        withCredentials: true,
      })
      .then((response) => {
        console.log(response.data);
        const billingInfo: DefaultBillingData = response.data;
        if (response.data) {
          form.setValue("fullName", billingInfo.billing_name || "");
          form.setValue("address1", billingInfo.billing_address_1 || "");
          form.setValue("address2", billingInfo.billing_address_2 || "");
          form.setValue("city", billingInfo.billing_city || "");
          form.setValue("zip", billingInfo.billing_zip || "");
          form.setValue("state", billingInfo.billing_state);
        }
      })
      .catch((error) => {
        console.log(error.message);
      });
  }, []);

  return (
    <>
      <Card>
        <CardHeader className="p-3">
          <h2 className="font-display text-2xl">Billing Information</h2>
        </CardHeader>
        <Separator />
        <CardContent className="py-3">
          <Form {...form}>
            <form className="space-y-4">
              <FormField
                control={form.control}
                name="fullName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name on Card</FormLabel>
                    <FormControl>
                      <Input
                        maxLength={100}
                        placeholder="John Doe"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="cardNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Card Number</FormLabel>
                    <FormControl>
                      <>
                        {process.env.NEXT_PUBLIC_DEV && (
                          <p className="text-red-600 text-sm">
                            DEV: Use test credit card number 4012888888881881
                          </p>
                        )}
                        <Input
                          maxLength={19}
                          minLength={13}
                          placeholder="&#x2022;&#x2022;&#x2022;&#x2022; &#x2022;&#x2022;&#x2022;&#x2022; &#x2022;&#x2022;&#x2022;&#x2022; &#x2022;&#x2022;&#x2022;&#x2022;"
                          {...field}
                        />
                      </>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex justify-between gap-2">
                <FormField
                  control={form.control}
                  name="expDateMonth"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Exp. Month</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="w-48">
                            <SelectValue placeholder="Exp Month" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="01">1 - January</SelectItem>
                          <SelectItem value="02">2 - February</SelectItem>
                          <SelectItem value="03">3 - March</SelectItem>
                          <SelectItem value="04">4 - April</SelectItem>
                          <SelectItem value="05">5 - May</SelectItem>
                          <SelectItem value="06">6 - June</SelectItem>
                          <SelectItem value="07">7 - July</SelectItem>
                          <SelectItem value="08">8 - August</SelectItem>
                          <SelectItem value="09">9 - September</SelectItem>
                          <SelectItem value="10">10 - October</SelectItem>
                          <SelectItem value="11">11 - November</SelectItem>
                          <SelectItem value="12">12 - December</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="expDateYear"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Exp Year</FormLabel>
                      <FormControl>
                        <Input
                          minLength={4}
                          maxLength={4}
                          placeholder="0000"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="cvv"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>CVV</FormLabel>
                      <FormControl>
                        <Input
                          minLength={3}
                          maxLength={5}
                          placeholder="CVV"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <Separator />

              <div className="flex flex-col gap-5 md:flex-row">
                <div className="basis-full md:basis-1/2">
                  <FormField
                    control={form.control}
                    name="address1"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Address 1</FormLabel>
                        <FormControl>
                          <Input
                            maxLength={120}
                            placeholder="123 E Custom St."
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="basis-full md:basis-1/2">
                  <FormField
                    control={form.control}
                    name="address2"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Address 2 (Optional)</FormLabel>
                        <FormControl>
                          <Input
                            maxLength={120}
                            placeholder="123 E Custom St."
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
              <div className="flex flex-col gap-5 md:flex-row">
                <div className="basis-full md:basis-1/2">
                  <FormField
                    control={form.control}
                    name="city"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>City</FormLabel>
                        <FormControl>
                          <Input
                            maxLength={50}
                            placeholder="Cityville"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="basis-full md:basis-1/2">
                  <FormField
                    control={form.control}
                    name="state"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Billing State</FormLabel>
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
                                        form.setValue("state", state.value);
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
                </div>
              </div>
              <div className="flex flex-col gap-5 items-center md:flex-row md:items-center">
                <div className="basis-full md:basis-1/2">
                  <FormField
                    control={form.control}
                    name="zip"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Zip Code</FormLabel>
                        <FormControl>
                          <Input maxLength={5} placeholder="12345" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </>
  );
}
