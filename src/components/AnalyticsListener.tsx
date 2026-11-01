"use client";

import { useEffect } from "react";
import { track, type TrackEvent } from "@/lib/analytics";

/** data-track 属性を持つ要素のクリックを計測イベントに変換する（タグ未導入時は何もしない） */
export function AnalyticsListener() {
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const el = (e.target as HTMLElement | null)?.closest<HTMLElement>("[data-track]");
      if (!el) return;
      const params: Record<string, string> = {};
      for (const [k, v] of Object.entries(el.dataset)) {
        if (k.startsWith("track") && k !== "track" && v) params[k.slice(5).toLowerCase()] = v;
      }
      track(el.dataset.track as TrackEvent, params);
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);
  return null;
}
