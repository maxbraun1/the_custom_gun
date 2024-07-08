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
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function OptionsStep({ form }: { form: any }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Options</CardTitle>
        <CardDescription>Card Description</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs
          defaultValue="fixed"
          className="w-full"
          onValueChange={(tab) => {
            form.setValue("listing_type", tab);
            form.setValue("duration", 3);
            if (tab === "auction") {
              form.setValue("price", undefined);
              form.setValue("quantity", 1);
              form.setValue("accept_offers", false);
            } else if (tab === "fixed") {
              form.setValue("starting_bid", undefined);
              form.setValue("reserve_price", undefined);
              form.setValue("buy_now_price", undefined);
            }
            console.log(tab);
          }}
        >
          <TabsList className="w-full">
            <TabsTrigger className="w-full" value="fixed">
              Fixed Price
            </TabsTrigger>
            <TabsTrigger className="w-full" value="auction">
              Auction
            </TabsTrigger>
          </TabsList>
          <TabsContent value="fixed">
            <Form {...form}>
              <form className="space-y-4">
                <div className="flex flex-col sm:flex-row sm:gap-5">
                  <div className="w-full space-y-4 sm:w-1/2">
                    <FormField
                      control={form.control}
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
                      control={form.control}
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
                      control={form.control}
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
                  control={form.control}
                  name="accept_offers"
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
              </form>
            </Form>
          </TabsContent>
          <TabsContent value="auction">
            <Form {...form}>
              <form className="space-y-4">
                <div className="flex flex-col sm:flex-row sm:gap-5">
                  <div className="w-full space-y-4 sm:w-1/2">
                    <FormField
                      control={form.control}
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
                      control={form.control}
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
                      control={form.control}
                      name="reserve_price"
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
                      control={form.control}
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
              </form>
            </Form>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
