"use client";

import { useRef, useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import Zoom from "yet-another-react-lightbox/plugins/zoom";

interface image {
  id: string;
  listing_id: string;
  uploaded_date: string;
  thumbnailForID: string;
  url: string;
}

export default function ProductLightbox({
  open,
  setOpen,
  images,
}: {
  open: boolean;
  setOpen: Function;
  images: Array<image>;
}) {
  const zoomRef = useRef(null);
  const slides = images.map((image) => {
    return { src: image.url };
  });

  return (
    <>
      <Lightbox
        plugins={[Zoom]}
        zoom={{ ref: zoomRef }}
        open={open}
        close={() => setOpen(false)}
        slides={slides}
      />
    </>
  );
}
