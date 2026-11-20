import Link from "next/link";
import { OfficialFilm } from "@/components/OfficialFilm";
import { Reveal } from "@/components/Reveal";
import { getVideo } from "@/data/videos";
import { getProduct } from "@/lib/products";

/** 代表製品に続く、ラインナップの公式動画（3本）。各製品ページへの導線つき */
const lineup = [
  { slug: "zenda", film: "SJ-ducb5dUU" },
  { slug: "saramoa", film: "1Vn6hePO4Wg" },
  { slug: "shekiller-78", film: "VJombF6wmw8" },
] as const;

export function LineupFilms() {
  return (
    <section aria-labelledby="lineup-title" className="section-y bg-bg">
      <div className="container-x">
        <Reveal className="text-center">
          <p className="eyebrow">Official films</p>
          <h2 id="lineup-title" className="headline mt-2 text-[2.25rem] sm:text-5xl">
            設計者が、自ら語る。
          </h2>
          <p className="mx-auto mt-4 max-w-xl font-jp text-[0.9375rem] leading-relaxed text-muted">
            REVONIK 公式 YouTube の製品解説から。動きと設計の意図を、映像で。
          </p>
        </Reveal>
        <ul className="mx-auto mt-12 grid max-w-6xl gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {lineup.map((l, i) => {
            const p = getProduct(l.slug)!;
            return (
              <Reveal as="li" key={l.slug} delay={i * 0.06}>
                <OfficialFilm video={getVideo(l.film)!} size="card" placement="home_lineup" />
                <Link
                  href={`/products/${p.slug}`}
                  data-track="select_item"
                  data-track-item={p.slug}
                  data-track-list="home_lineup"
                  className="mt-2 inline-flex min-h-11 items-center text-[0.9375rem] text-link hover:underline underline-offset-4"
                >
                  {p.name} を見る ›
                </Link>
              </Reveal>
            );
          })}
        </ul>
        <p className="mt-12 text-center">
          <Link href="/media" className="text-[1rem] text-link hover:underline underline-offset-4">
            公式動画をすべて見る ›
          </Link>
        </p>
      </div>
    </section>
  );
}
