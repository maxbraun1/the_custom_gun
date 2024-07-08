import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import DetailItem from "./detailItem";
import { listing } from "@/lib/types/listing";

export default async function Details({ listing }: { listing: listing }) {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle>Details</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="divide-y">
          <DetailItem ItemKey="Item Type" ItemValue={listing.item_type} />
          <DetailItem
            ItemKey="Manufacturer"
            ItemValue={listing.brand.display}
          />
          <DetailItem ItemKey="Caliber" ItemValue={listing.caliber.display} />
          <DetailItem ItemKey="condition" ItemValue={listing.condition} />
          <DetailItem
            ItemKey="Primary Finish"
            ItemValue={listing.frame_finish.display}
          />
          <DetailItem
            ItemKey="Engraved"
            ItemValue={listing.is_engraved ? "Yes" : "No"}
          />
          <DetailItem ItemKey="UPC" ItemValue={listing.upc} />
          <DetailItem ItemKey="SKU" ItemValue={listing.sku} />
          <DetailItem
            ItemKey="Customized By"
            ItemValue={listing.customized_by}
          />
        </div>
      </CardContent>
    </Card>
  );
}
