import "./description.css";
import { sanitize } from "isomorphic-dompurify";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { listing } from "@/lib/types/listing";

export default function Description({ listing }: { listing: listing }) {
  const description = sanitize(listing.description);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Description</CardTitle>
      </CardHeader>
      <CardContent>
        <div
          id="description"
          dangerouslySetInnerHTML={{ __html: description }}
        />
      </CardContent>
    </Card>
  );
}
