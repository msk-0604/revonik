import { BrandStory } from "@/components/home/BrandStory";
import { Collection } from "@/components/home/Collection";
import { Engineering } from "@/components/home/Engineering";
import { Hero } from "@/components/home/Hero";
import { OnTheWater } from "@/components/home/OnTheWater";
import { ProductExperience } from "@/components/home/ProductExperience";
import { Shop } from "@/components/home/Shop";

/**
 * TOP の構成（認知 → 興味 → 比較 → 信頼 → 購入）
 * 01 Hero → 02 Product Experience → 03 Engineering → 04 On the Water
 * → 05 Brand Story → 06 Collection → 07 Shop
 */
export default function HomePage() {
  return (
    <>
      <Hero />
      <ProductExperience />
      <Engineering />
      <OnTheWater />
      <BrandStory />
      <Collection />
      <Shop />
    </>
  );
}
