import type { Metadata } from "next";

import Gallery from "@/features/Gallery";

export const metadata: Metadata = {
  title: {
    absolute:
      "Event Gallery - Lakshmi Ganapathi Events | Premium Event Gallery",
  },
  description:
    "Browse our stunning event gallery featuring weddings, haldi, half saree, housewarmings, naming ceremonies, and charity events in Rajahmundry.",
  keywords: [
    "event gallery",
    "wedding photos",
    "haldi ceremony",
    "half saree function",
    "housewarming",
    "naming ceremony",
  ],
  alternates: {
    canonical: "/gallery",
  },
};

export default function GalleryPage() {
  return <Gallery />;
}
