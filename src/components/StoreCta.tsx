import { Button } from "@/components/Button";
import { Reveal } from "@/components/Reveal";
import { site } from "@/data/site";

export function StoreCta({ tone = "white" }: { tone?: "white" | "gray" }) {
  return (
    <section aria-labelledby="store-cta-title" className={`section-y ${tone === "gray" ? "bg-bg-alt" : "bg-bg"}`}>
      <Reveal className="container-x text-center">
        <p className="eyebrow">Online Store</p>
        <h2 id="store-cta-title" className="headline mt-2 text-[2.25rem] sm:text-5xl lg:text-[3.5rem]">
          次の一投を、選ぶ。
        </h2>
        <p className="prose-jp mx-auto mt-4 max-w-xl text-[0.9375rem] text-muted md:text-[1.0625rem]">
          REVONIK の製品は公式オンラインストアでご購入いただけます。
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 min-[400px]:flex-row min-[400px]:gap-5">
          <Button href={site.links.store} external>
            オンラインストア
          </Button>
          <Button href="/products" variant="link">
            製品一覧
          </Button>
        </div>
      </Reveal>
    </section>
  );
}
