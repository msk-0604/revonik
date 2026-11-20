import { Engineering } from "@/components/home/Engineering";
import { Hero } from "@/components/home/Hero";
import { InstagramDealers } from "@/components/home/InstagramDealers";
import { NewReleases } from "@/components/home/NewReleases";
import { OnTheWater } from "@/components/home/OnTheWater";
import { Philosophy } from "@/components/home/Philosophy";
import { ProductExperience } from "@/components/home/ProductExperience";

/**
 * HOME
 * HERO → BRAND PHILOSOPHY → FEATURED PRODUCTS → TECHNOLOGY → NEW RELEASES
 * → FIELD EXPERIENCE → INSTAGRAM / DEALERS
 */
export default function HomePage() {
  return (
    <>
      <Hero />
      <Philosophy />
      <ProductExperience />
      <Engineering />
      <NewReleases />
      <OnTheWater />
      <InstagramDealers />
    </>
  );
}
