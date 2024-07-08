"use client";

import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import useQueryParams from "@/lib/util/useQueryParams";
import { useEffect, useState } from "react";
import axios from "axios";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";
import { cn } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Caliber } from "@/lib/types/caliber";
import { Brand } from "@/lib/types/brand";
import FilterItem from "./filterItem";

export default function SearchSidebar({ className }: { className?: string }) {
  const { queryParams, setQueryParams } = useQueryParams();
  const [finishes, setFinishes] = useState<Array<Finish> | null>(null);
  const [calibers, setCalibers] = useState<Array<Caliber> | null>(null);
  const [brands, setBrands] = useState<Array<Brand> | null>(null);

  function listingTypeChange(value: string) {
    setQueryParams({ ltype: value });
  }

  function itemConditionChange(value: string) {
    setQueryParams({ condition: value });
  }

  function ItemTypeChange(value: string) {
    setQueryParams({ itype: value });
  }

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
    <div
      className={cn("flex-grow py-5 px-4 space-y-2", className)}
      style={{ borderRight: "1px solid gainsboro" }}
    >
      <h1 className="font-semibold mb-5">Filters</h1>

      <FilterItem defaultOpen={true} name="Listing Type">
        <RadioGroup
          onValueChange={(value) => listingTypeChange(value)}
          defaultValue={queryParams.get("ltype") || undefined}
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="any" id="any-type" />
            <Label htmlFor="any-type">Any</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="fixed" id="fixed-type" />
            <Label htmlFor="fixed-type">Fixed</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="auction" id="auction-type" />
            <Label htmlFor="auction-type">Auction</Label>
          </div>
        </RadioGroup>
      </FilterItem>

      <FilterItem name="Item Condition">
        <RadioGroup
          onValueChange={(value) => itemConditionChange(value)}
          defaultValue={queryParams.get("condition") || undefined}
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="any" id="any-condition" />
            <Label htmlFor="any-condition">Any</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="new" id="new-condition" />
            <Label htmlFor="new-condition">New</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="used" id="used-condition" />
            <Label htmlFor="used-condition">Used</Label>
          </div>
        </RadioGroup>
      </FilterItem>

      <FilterItem name="Item Type">
        <Select
          onValueChange={(value) => ItemTypeChange(value)}
          value={queryParams.get("itype") || "any"}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Item Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="any">Any</SelectItem>
            <SelectItem value="pistol">Pistol</SelectItem>
            <SelectItem value="revolver">Revolver</SelectItem>
            <SelectItem value="rifle">Rifle</SelectItem>
            <SelectItem value="shotgun">Shotgun</SelectItem>
          </SelectContent>
        </Select>
        <p
          className="text-blue-700 underline text-xs cursor-pointer mt-1"
          onClick={() => setQueryParams({ itype: undefined })}
        >
          Clear
        </p>
      </FilterItem>

      <FilterItem name="Primary Finish">
        {finishes && (
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                className={cn(
                  "w-full justify-between",
                  !queryParams.get("ffinish") && "text-muted-foreground"
                )}
              >
                {queryParams.get("ffinish")
                  ? finishes.find(
                      (finish) => finish.value === queryParams.get("ffinish")
                    )?.display
                  : "Select finish"}
                <CaretSortIcon className="ml-2 h-3 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-full p-0 max-h-64 overflow-y-scroll">
              <Command defaultValue={queryParams.get("ffinish") || undefined}>
                <CommandInput placeholder="Search Finish..." className="h-9" />
                <CommandEmpty>No finishes found.</CommandEmpty>
                <CommandGroup>
                  {finishes.map((finish) => (
                    <CommandItem
                      value={finish.value}
                      key={finish.display}
                      onSelect={() => {
                        setQueryParams({ ffinish: finish.value });
                      }}
                    >
                      {finish.display}
                      <CheckIcon
                        className={cn(
                          "ml-auto h-4 w-4",
                          finish.value === queryParams.get("ffinish")
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
        )}
        <p
          className="text-blue-700 underline text-xs cursor-pointer mt-1"
          onClick={() => setQueryParams({ ffinish: undefined })}
        >
          Clear
        </p>
      </FilterItem>

      <FilterItem name="Manufacturer">
        {brands && (
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                className={cn(
                  "w-full justify-between",
                  !queryParams.get("brand") && "text-muted-foreground"
                )}
              >
                {queryParams.get("brand")
                  ? brands.find(
                      (brand) => brand.value === queryParams.get("brand")
                    )?.display
                  : "Select brand"}
                <CaretSortIcon className="ml-2 h-3 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-full p-0 max-h-64 overflow-y-scroll">
              <Command defaultValue={queryParams.get("brand") || undefined}>
                <CommandInput placeholder="Search Brand..." className="h-9" />
                <CommandEmpty>No brands found.</CommandEmpty>
                <CommandGroup>
                  {brands.map((brand) => (
                    <CommandItem
                      value={brand.value}
                      key={brand.display}
                      onSelect={() => {
                        setQueryParams({ brand: brand.value });
                      }}
                    >
                      {brand.display}
                      <CheckIcon
                        className={cn(
                          "ml-auto h-4 w-4",
                          brand.value === queryParams.get("brand")
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
        )}
        <p
          className="text-blue-700 underline text-xs cursor-pointer mt-1"
          onClick={() => setQueryParams({ brand: undefined })}
        >
          Clear
        </p>
      </FilterItem>

      <FilterItem name="Caliber">
        {calibers && (
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                className={cn(
                  "w-full justify-between",
                  !queryParams.get("caliber") && "text-muted-foreground"
                )}
              >
                {queryParams.get("caliber")
                  ? calibers.find(
                      (caliber) => caliber.value === queryParams.get("caliber")
                    )?.display
                  : "Select caliber"}
                <CaretSortIcon className="ml-2 h-3 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-full p-0 max-h-64 overflow-y-scroll">
              <Command defaultValue={queryParams.get("caliber") || undefined}>
                <CommandInput placeholder="Search Finish..." className="h-9" />
                <CommandEmpty>No calibers found.</CommandEmpty>
                <CommandGroup>
                  {calibers.map((caliber) => (
                    <CommandItem
                      value={caliber.value}
                      key={caliber.display}
                      onSelect={() => {
                        setQueryParams({ caliber: caliber.value });
                      }}
                    >
                      {caliber.display}
                      <CheckIcon
                        className={cn(
                          "ml-auto h-4 w-4",
                          caliber.value === queryParams.get("caliber")
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
        )}
        <p
          className="text-blue-700 underline text-xs cursor-pointer mt-1"
          onClick={() => setQueryParams({ caliber: undefined })}
        >
          Clear
        </p>
      </FilterItem>
    </div>
  );
}
