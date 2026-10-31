import { DesignerSection } from "@/components/home/DesignerSection";
import { FeaturedProducts } from "@/components/home/FeaturedProducts";
import { Hero } from "@/components/home/Hero";
import { LineupStrip } from "@/components/home/LineupStrip";
import { MediaSection } from "@/components/home/MediaSection";
import { NewsSection } from "@/components/home/NewsSection";

export default function HomePage() {
  return (
    <>
      <Hero />
      <FeaturedProducts />
      <DesignerSection />
      <LineupStrip />
      <NewsSection tone="gray" />
      <MediaSection tone="white" />
    </>
  );
}
