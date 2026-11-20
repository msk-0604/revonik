import { Engineering } from "@/components/home/Engineering";
import { Hero } from "@/components/home/Hero";
import { Instagram } from "@/components/home/Instagram";
import { LineupFilms } from "@/components/home/LineupFilms";
import { NewReleases } from "@/components/home/NewReleases";
import { Philosophy } from "@/components/home/Philosophy";
import { ProductExperience } from "@/components/home/ProductExperience";

/** HOME：HERO（SHINDY）→ 代表製品（SHINDY・VOLBEAT・Dot SIX）→ 公式動画 → BRAND PHILOSOPHY → TECHNOLOGY → NEW RELEASES → INSTAGRAM */
export default function HomePage() {
  return (
    <>
      <Hero />
      <ProductExperience />
      <LineupFilms />
      <Philosophy />
      <Engineering />
      <NewReleases />
      <Instagram />
    </>
  );
}
