import { FeaturedProducts } from "@/components/home/FeaturedProducts";
import { Hero } from "@/components/home/Hero";
import { MediaSection } from "@/components/home/MediaSection";
import { NewsSection } from "@/components/home/NewsSection";
import { Philosophy } from "@/components/home/Philosophy";
import { StoreCta } from "@/components/StoreCta";

export default function HomePage() {
  return (
    <>
      <Hero />
      <FeaturedProducts />
      <Philosophy />
      <NewsSection />
      <MediaSection />
      <StoreCta />
    </>
  );
}
