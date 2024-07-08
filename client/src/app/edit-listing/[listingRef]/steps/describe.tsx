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
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import axios from "axios";
import { cn } from "@/lib/utils";
import { listing } from "@/lib/types/listing";
import TextEditor from "@/app/new-listing/components/textEditor";
import { sanitize } from "isomorphic-dompurify";
import striptags from "striptags";

const FormSchema = z.object({
  title: z
    .string()
    .min(10, {
      message: "Item title must be at least 10 characters.",
    })
    .max(100, {
      message: "Item title cannot be more than 100 characters.",
    }),
  condition: z.string(),
  upc: z.string().length(12, { message: "Invalid UPC" }),
  serial_no: z.string(),
  sku: z.string().optional(),
  engraved: z.boolean(),
  finish: z.string(),
  item_type: z.string(),
});

interface Finish {
  id: string;
  value: string;
  display: string;
}

export default function DescribeStep({
  listing,
  updateListing,
  setDescribeStepReady,
}: {
  listing: listing;
  updateListing: Function;
  setDescribeStepReady: Function;
}) {
  const [saved, setSaved] = useState(false);
  const [finishes, setFinishes] = useState<Array<Finish> | null>(null);
  const [description, setDescription] = useState<null | string>(null);
  const [descriptionError, setDescriptionError] = useState<null | string>(null);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      title: listing.title || "",
      upc: listing.upc || "",
      serial_no: listing.serial_no || "",
      sku: listing.sku || "",
      engraved: listing.is_engraved || false,
      finish: listing.frame_finish_id,
      condition: listing.condition,
      item_type: listing.item_type,
    },
  });

  useEffect(() => {
    axios
      .get(process.env.NEXT_PUBLIC_API_URL + "/finishes")
      .then((response) => {
        setFinishes(response.data);
      })
      .catch((error) => console.log(error));
  }, []);

  form.watch(() => {
    setSaved(false);
  });

  useEffect(() => {
    setSaved(false);
  }, [description]);

  useEffect(() => {
    setDescribeStepReady(saved);
  }, [saved]);

  function checkDescription(description: string) {
    if (!description || description === "")
      return { error: true, message: "Description cannot be empty." };
    return { error: false, message: null };
  }

  // On form submit
  const onSubmit = async (values: z.infer<typeof FormSchema>) => {
    const sanitizedDescription = sanitize(description || "");
    const strippedDescription = striptags(sanitizedDescription);

    // Check Description
    const descriptionCheck = checkDescription(strippedDescription);
    if (descriptionCheck.error) {
      setDescriptionError(descriptionCheck.message);
      return;
    } else {
      setDescriptionError(null);
    }

    updateListing({
      title: values.title,
      description: sanitizedDescription,
      condition: values.condition,
      upc: values.upc,
      sku: values.sku,
      serial_no: values.serial_no,
      is_engraved: values.engraved,
      frame_finish_id: values.finish,
      item_type: values.item_type,
    });
    setSaved(true);
  };

  return (
    <Card className={saved ? "border-green-700" : ""}>
      <CardHeader>
        <CardTitle>Description</CardTitle>
        <CardDescription>
          Give specific details about your item.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Item Title</FormLabel>
                  <FormControl>
                    <Input maxLength={100} placeholder="Title" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div>
              <Label>Description</Label>
              <TextEditor
                set={setDescription}
                defaultValue={listing.description}
              />
              {descriptionError && (
                <p
                  id=":r2v:-form-item-message"
                  className="text-sm font-medium text-destructive"
                >
                  {descriptionError}
                </p>
              )}
            </div>

            <div className="flex flex-col sm:flex-row sm:gap-5">
              <div className="w-full space-y-4 sm:w-1/2">
                <FormField
                  control={form.control}
                  name="condition"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Item Condition</FormLabel>
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
                      <FormLabel>Item UPC</FormLabel>
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
                      <FormLabel>Item SKU (Optional)</FormLabel>
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
                      <FormLabel>Item Serial Number (Optional)</FormLabel>
                      <FormControl>
                        <Input placeholder="Serial Number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

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

            <hr />
            <CardTitle className="mt-5">Customization Details</CardTitle>

            <FormField
              control={form.control}
              name="engraved"
              render={({ field }) => (
                <FormItem className="flex items-center space-x-2">
                  <Label htmlFor="airplane-mode">Engraved</Label>
                  <FormControl>
                    <Switch
                      className="bg-blue-800"
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {finishes && (
              <FormField
                control={form.control}
                name="finish"
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
                      <PopoverContent className="w-[200px] p-0">
                        <Command>
                          <CommandInput
                            placeholder="Search Finish..."
                            className="h-9"
                          />
                          <CommandEmpty>No framework found.</CommandEmpty>
                          <CommandGroup>
                            {finishes.map((finish) => (
                              <CommandItem
                                value={finish.value}
                                key={finish.value}
                                onSelect={() => {
                                  form.setValue("finish", finish.id);
                                }}
                              >
                                {finish.display}
                                <CheckIcon
                                  className={cn(
                                    "ml-auto h-4 w-4",
                                    finish.value === field.value
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
