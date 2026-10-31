import { CategoryTiles } from "@/components/home/CategoryTiles";
import { DesignerSection } from "@/components/home/DesignerSection";
import { FeaturedProducts } from "@/components/home/FeaturedProducts";
import { Hero } from "@/components/home/Hero";
import { MovieSection } from "@/components/home/MovieSection";
import { NewReleases } from "@/components/home/NewReleases";
import { NewsSection } from "@/components/home/NewsSection";
import { Technology } from "@/components/home/Technology";

export default function HomePage() {
  return (
    <>
      <Hero />
      <NewReleases />
      <FeaturedProducts />
      <CategoryTiles />
      <Technology />
      <DesignerSection />
      <MovieSection />
      <NewsSection tone="gray" />
    </>
  );
}
