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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { Label } from "@/components/ui/label";
import axios from "axios";
import { cn } from "@/lib/utils";
import TextEditor from "../components/textEditor";
import { Caliber } from "@/lib/types/caliber";
import { Brand } from "@/lib/types/brand";
import { UseFormReturn, useForm } from "react-hook-form";

export default function DescribeStep({ form }: { form: UseFormReturn<any> }) {
  const [finishes, setFinishes] = useState<Array<Finish> | null>(null);
  const [calibers, setCalibers] = useState<Array<Caliber> | null>(null);
  const [brands, setBrands] = useState<Array<Brand> | null>(null);

  useEffect(() => {
    axios
      .get(process.env.NEXT_PUBLIC_API_URL + "/finishes")
      .then((response) => {
        setFinishes(response.data);
      })
      .catch((error) => console.log(error));

    axios
      .get(process.env.NEXT_PUBLIC_API_URL + "/brands")
      .then((response) => {
        setBrands(response.data);
      })
      .catch((error) => console.log(error));

    axios
      .get(process.env.NEXT_PUBLIC_API_URL + "/calibers")
      .then((response) => {
        setCalibers(response.data);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Describe Your Item</CardTitle>
        <CardDescription>
          Give specific details about your item.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form className="space-y-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Listing Title</FormLabel>
                  <FormControl>
                    <Input maxLength={100} placeholder="Title" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div>
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <TextEditor set={field.onChange} />
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:gap-5">
              <div className="w-full space-y-4 sm:w-1/2">
                <FormField
                  control={form.control}
                  name="condition"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Condition</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Item condition" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="new">New</SelectItem>
                          <SelectItem value="used">Used</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="upc"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>UPC</FormLabel>
                      <FormControl>
                        <Input placeholder="UPC" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="w-full space-y-4 sm:w-1/2">
                <FormField
                  control={form.control}
                  name="sku"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>SKU (Optional)</FormLabel>
                      <FormControl>
                        <Input placeholder="SKU" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="serial_no"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Serial Number (Optional)</FormLabel>
                      <FormControl>
                        <Input placeholder="Serial Number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <div className="flex gap-4 flex-col md:flex-row">
              <FormField
                control={form.control}
                name="item_type"
                render={({ field }) => (
                  <FormItem className="w-48">
                    <FormLabel>Item Type</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Item Type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pistol">Pistol</SelectItem>
                        <SelectItem value="revolver">Revolver</SelectItem>
                        <SelectItem value="rifle">Rifle</SelectItem>
                        <SelectItem value="shotgun">Shotgun</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {brands && (
                <FormField
                  control={form.control}
                  name="brand"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Manufacturer</FormLabel>
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
                                ? brands.find(
                                    (brand) => brand.id === field.value
                                  )?.display
                                : "Select brand"}
                              <CaretSortIcon className="ml-2 h-3 w-4 shrink-0 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-[200px] p-0 max-h-64 overflow-y-scroll">
                          <Command>
                            <CommandInput
                              placeholder="Search Brands..."
                              className="h-9"
                              onValueChange={field.onChange}
                            />
                            <CommandEmpty>No brands found.</CommandEmpty>
                            <CommandGroup onChange={(x) => console.log(x)}>
                              {brands.map((brand) => (
                                <CommandItem
                                  value={brand.value}
                                  key={brand.display}
                                  onSelect={() => {
                                    form.setValue("brand", brand.id);
                                  }}
                                >
                                  {brand.display}
                                  <CheckIcon
                                    className={cn(
                                      "ml-auto h-4 w-4",
                                      brand.id === field.value
                                        ? "opacity-100"
                                        : "opacity-0"
                                    )}
                                  />
                                </CommandItem>
                              ))}
                            </CommandGroup>
                          </Command>
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}

              {calibers && (
                <FormField
                  control={form.control}
                  name="caliber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Caliber</FormLabel>
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
                                ? calibers.find(
                                    (caliber) => caliber.id === field.value
                                  )?.display
                                : "Select Caliber"}
                              <CaretSortIcon className="ml-2 h-3 w-4 shrink-0 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-[200px] p-0 max-h-64 overflow-y-scroll">
                          <Command>
                            <CommandInput
                              placeholder="Search Calibers..."
                              className="h-9"
                            />
                            <CommandEmpty>No calibers found.</CommandEmpty>
                            <CommandGroup>
                              {calibers.map((caliber) => (
                                <CommandItem
                                  value={caliber.value}
                                  key={caliber.display}
                                  onSelect={() => {
                                    form.setValue("caliber", caliber.id);
                                    field.onChange;
                                  }}
                                >
                                  {caliber.display}
                                  <CheckIcon
                                    className={cn(
                                      "ml-auto h-4 w-4",
                                      caliber.id === field.value
                                        ? "opacity-100"
                                        : "opacity-0"
                                    )}
                                  />
                                </CommandItem>
                              ))}
                            </CommandGroup>
                          </Command>
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
            </div>

            <hr />
            <CardTitle className="mt-5">Customization Details</CardTitle>

            <FormField
              control={form.control}
              name="customized_by"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Customized By (Optional)</FormLabel>
                  <FormControl>
                    <Input
                      className="max-w-sm"
                      placeholder="Company Name"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="is_engraved"
              render={({ field }) => (
                <FormItem className="flex items-center space-x-2">
                  <Label htmlFor="airplane-mode">Engraved</Label>
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

            {finishes && (
              <>
                <FormField
                  control={form.control}
                  name="frame_finish"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Primary Item Finish</FormLabel>
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
                                ? finishes.find(
                                    (finish) => finish.id === field.value
                                  )?.display
                                : "Select finish"}
                              <CaretSortIcon className="ml-2 h-3 w-4 shrink-0 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-[200px] p-0 max-h-64 overflow-y-scroll">
                          <Command>
                            <CommandInput
                              placeholder="Search Finish..."
                              className="h-9"
                            />
                            <CommandEmpty>No finishes found.</CommandEmpty>
                            <CommandGroup>
                              {finishes.map((finish) => (
                                <CommandItem
                                  value={finish.value}
                                  key={finish.display}
                                  onSelect={() => {
                                    form.setValue("frame_finish", finish.id);
                                  }}
                                >
                                  {finish.display}
                                  <CheckIcon
                                    className={cn(
                                      "ml-auto h-4 w-4",
                                      finish.id === field.value
                                        ? "opacity-100"
                                        : "opacity-0"
                                    )}
                                  />
                                </CommandItem>
                              ))}
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
                  name="secondary_finish"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Secondary Item Finish</FormLabel>
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
                                ? finishes.find(
                                    (finish) => finish.id === field.value
                                  )?.display
                                : "Select finish"}
                              <CaretSortIcon className="ml-2 h-3 w-4 shrink-0 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-[200px] p-0 max-h-64 overflow-y-scroll">
                          <Command>
                            <CommandInput
                              placeholder="Search Finish..."
                              className="h-9"
                            />
                            <CommandEmpty>No finishes found.</CommandEmpty>
                            <CommandGroup>
                              {finishes.map((finish) => (
                                <CommandItem
                                  value={finish.value}
                                  key={finish.display}
                                  onSelect={() => {
                                    form.setValue(
                                      "secondary_finish",
                                      finish.id
                                    );
                                  }}
                                >
                                  {finish.display}
                                  <CheckIcon
                                    className={cn(
                                      "ml-auto h-4 w-4",
                                      finish.id === field.value
                                        ? "opacity-100"
                                        : "opacity-0"
                                    )}
                                  />
                                </CommandItem>
                              ))}
                            </CommandGroup>
                          </Command>
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </>
            )}
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
