"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function SellingControls({
  setSellingSettings,
}: {
  setSellingSettings: Function;
}) {
  function handleStatusSelect(value: string) {
    setSellingSettings("status", value);
  }
  function handleTypeSelect(value: string) {
    setSellingSettings("type", value);
  }
  function handleSortSelect(value: string) {
    setSellingSettings("sort", value);
  }
  return (
    <div className="flex flex-col gap-2 w-full my-5 sm:flex-row sm:gap-5">
      <Select onValueChange={(value) => handleStatusSelect(value)}>
        <SelectTrigger>
          <SelectValue placeholder="Listing Status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="active">Active</SelectItem>
          <SelectItem value="ended">Ended</SelectItem>
          <SelectItem value="any">Any</SelectItem>
        </SelectContent>
      </Select>

      <Select onValueChange={(value) => handleTypeSelect(value)}>
        <SelectTrigger>
          <SelectValue placeholder="Listing Type" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="any">Any</SelectItem>
          <SelectItem value="auction">Auction</SelectItem>
          <SelectItem value="fixed">Fixed</SelectItem>
        </SelectContent>
      </Select>

      <Select onValueChange={(value) => handleSortSelect(value)}>
        <SelectTrigger>
          <SelectValue placeholder="Order By" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="newest">Newest</SelectItem>
          <SelectItem value="endingsoonest">Ending Soonest</SelectItem>
          <SelectItem value="bidcount">Bid Count</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
