"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import useQueryParams from "@/lib/util/useQueryParams";

export default function OfferControls() {
  const { setQueryParams } = useQueryParams();

  return (
    <div className="flex flex-col gap-2 w-full my-5 sm:flex-row sm:gap-5">
      <Select onValueChange={(value) => setQueryParams({ status: value })}>
        <SelectTrigger className="w-full sm:w-64">
          <SelectValue placeholder="Offer Status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="any">Any</SelectItem>
          <SelectItem value="pending">Pending</SelectItem>
          <SelectItem value="accepted">Accepted</SelectItem>
          <SelectItem value="rejected">Rejected</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
