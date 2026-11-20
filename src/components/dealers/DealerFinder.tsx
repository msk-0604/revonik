"use client";

import { useState } from "react";
import { ArrowUpRight, MapPin, Search } from "lucide-react";
import { dealers, prefectures, type DealerChannel } from "@/data/dealers";

const channelLabel: Record<DealerChannel, string> = { online: "オンライン", store: "店頭" };

/** 都道府県・販売形態・店名で取扱店を絞り込む */
export function DealerFinder() {
  const [pref, setPref] = useState("");
  const [channel, setChannel] = useState<DealerChannel | "all">("all");
  const [q, setQ] = useState("");

  const list = dealers.filter(
    (d) =>
      (!pref || d.prefecture === pref) &&
      (channel === "all" || d.channel.includes(channel)) &&
      (!q.trim() || d.name.toLowerCase().includes(q.trim().toLowerCase())),
  );

  return (
    <div>
      <div className="grid gap-3 rounded-[1.25rem] bg-panel p-4 md:grid-cols-[1fr_1fr_1.2fr] md:p-5">
        <div>
          <label htmlFor="dealer-pref" className="text-[0.75rem] font-semibold text-muted">
            都道府県
          </label>
          <select
            id="dealer-pref"
            value={pref}
            onChange={(e) => setPref(e.target.value)}
            data-track="dealer_search"
            className="mt-1.5 h-11 w-full rounded-xl border border-line bg-bg px-3 text-base text-fg focus:border-link focus:outline-none"
          >
            <option value="">すべての地域</option>
            {prefectures.map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </select>
        </div>
        <div>
          <p className="text-[0.75rem] font-semibold text-muted" id="dealer-channel-label">
            販売形態
          </p>
          <div role="group" aria-labelledby="dealer-channel-label" className="mt-1.5 flex gap-2">
            {(["all", "online", "store"] as const).map((c) => (
              <button
                key={c}
                type="button"
                aria-pressed={channel === c}
                onClick={() => setChannel(c)}
                className={`h-11 flex-1 rounded-xl border text-[0.875rem] transition-colors ${
                  channel === c ? "border-fg bg-fg text-on-fg" : "border-line text-fg/80 hover:border-fg/40"
                }`}
              >
                {c === "all" ? "すべて" : channelLabel[c]}
              </button>
            ))}
          </div>
        </div>
        <div>
          <label htmlFor="dealer-q" className="text-[0.75rem] font-semibold text-muted">
            店名
          </label>
          <div className="relative mt-1.5">
            <Search aria-hidden className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted" />
            <input
              id="dealer-q"
              type="search"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="店名で検索"
              className="h-11 w-full rounded-xl border border-line bg-bg pr-3 pl-9 text-base text-fg placeholder:text-muted focus:border-link focus:outline-none"
            />
          </div>
        </div>
      </div>

      <p role="status" aria-live="polite" className="mt-6 text-[0.8125rem] text-muted">
        {list.length} 件
      </p>

      {list.length > 0 ? (
        <ul className="mt-4 divide-y divide-line border-y border-line">
          {list.map((d) => (
            <li key={d.id} className="grid gap-2 py-5 sm:grid-cols-[1fr_auto] sm:items-center">
              <div>
                <p className="text-[1.125rem] font-semibold tracking-tight">{d.name}</p>
                <p className="mt-1 flex flex-wrap items-center gap-2 font-jp text-[0.8125rem] text-muted">
                  <MapPin aria-hidden className="size-3.5" />
                  {d.prefecture ?? "所在地は公式の取扱店情報で確認予定"}
                  {d.channel.map((c) => (
                    <span key={c} className="rounded-full border border-line px-2 py-0.5 text-[0.6875rem]">
                      {channelLabel[c]}
                    </span>
                  ))}
                </p>
              </div>
              <div className="flex flex-wrap gap-x-5 gap-y-1 text-[0.875rem]">
                <a
                  href={d.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-track="store_click"
                  data-track-placement="dealers"
                  data-track-dealer={d.id}
                  className="inline-flex min-h-11 items-center gap-0.5 text-link hover:underline underline-offset-4"
                >
                  ショップを見る <ArrowUpRight aria-hidden className="size-4" />
                  <span className="sr-only">（外部サイト）</span>
                </a>
                <a href={d.evidenceUrl} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center gap-0.5 text-muted hover:text-fg hover:underline">
                  掲載ページ <ArrowUpRight aria-hidden className="size-3.5" />
                  <span className="sr-only">（外部サイト）</span>
                </a>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <div className="mt-4 rounded-[1.25rem] bg-panel px-6 py-14 text-center">
          <p className="font-jp text-[1rem] font-bold">この条件の取扱店情報はまだありません。</p>
          <p className="mt-2 font-jp text-[0.875rem] text-muted">公式の取扱店リストを受領後、店頭販売店を含めて掲載します。</p>
        </div>
      )}
    </div>
  );
}
