"use client";

import useEmblaCarousel from "embla-carousel-react";
import EmblaCarousel from "../../../components/embla/emblaCarousel";

interface image {
  id: string;
  isThumbnail: boolean;
  listing_id: string;
  uploaded_date: Date;
  url: string;
}

export default function Images({ images }: { images: Array<image> }) {
  const OPTIONS = {};
  const SLIDES = images;
  const [emblaRef] = useEmblaCarousel({ loop: false }, []);
  return <EmblaCarousel slides={SLIDES} options={OPTIONS} />;
}
