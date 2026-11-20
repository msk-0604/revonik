"use client";

import { useEffect, useState } from "react";

type Theme = "light" | "dark";
const KEY = "revonik-theme";

/** 描画前・初期化後の両方で使う、テーマの適用 */
function applyTheme(t: Theme) {
  const root = document.documentElement;
  if (t === "dark") root.setAttribute("data-theme", "dark");
  else root.removeAttribute("data-theme");
  document.querySelector('meta[name="theme-color"]')?.setAttribute("content", t === "dark" ? "#0A0A0B" : "#FFFFFF");
}

/**
 * 表示テーマの切り替え（ホワイト：標準／ブラック：第二案）。選択はこのブラウザに保存。
 * ?theme=dark / ?theme=light でも切り替えられる（提案時に URL で共有するため）。
 */
export function ThemeSwitch({ className = "" }: { className?: string }) {
  const [theme, setTheme] = useState<Theme>("light");

  // 描画前スクリプトで付けた属性は、React の初期化で <html> から外れることがあるため、ここで付け直す
  useEffect(() => {
    let t: Theme = "light";
    try {
      const q = new URLSearchParams(window.location.search).get("theme");
      t = (q ?? window.localStorage.getItem(KEY)) === "dark" ? "dark" : "light";
    } catch {
      // 読み取れない場合はホワイト
    }
    applyTheme(t);
    // eslint-disable-next-line react-hooks/set-state-in-effect -- URL・保存値からの復元
    setTheme(t);
  }, []);

  const choose = (t: Theme) => {
    setTheme(t);
    applyTheme(t);
    try {
      localStorage.setItem(KEY, t);
    } catch {
      // 保存できなくても切り替えは有効
    }
  };

  return (
    <div role="group" aria-label="表示テーマ" className={`inline-flex gap-1 rounded-full border border-line p-1 ${className}`}>
      {(["light", "dark"] as const).map((t) => (
        <button
          key={t}
          type="button"
          aria-pressed={theme === t}
          onClick={() => choose(t)}
          className={`min-h-9 rounded-full px-4 text-[0.75rem] font-semibold tracking-[0.08em] transition-colors ${
            theme === t ? "bg-fg text-on-fg" : "text-muted hover:text-fg"
          }`}
        >
          {t === "light" ? "White" : "Black"}
        </button>
      ))}
    </div>
  );
}
