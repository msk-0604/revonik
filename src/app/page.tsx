import { Engineering } from "@/components/home/Engineering";
import { Hero } from "@/components/home/Hero";
import { Instagram } from "@/components/home/Instagram";
import { NewReleases } from "@/components/home/NewReleases";
import { Philosophy } from "@/components/home/Philosophy";
import { ProductExperience } from "@/components/home/ProductExperience";

/** HOME：HERO → FEATURED PRODUCTS → BRAND PHILOSOPHY → TECHNOLOGY → NEW RELEASES → INSTAGRAM */
export default function HomePage() {
  return (
    <>
      <Hero />
      <ProductExperience />
      <Philosophy />
      <Engineering />
      <NewReleases />
      <Instagram />
    </>
  );
}
