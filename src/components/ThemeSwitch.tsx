"use client";

import { useEffect, useState } from "react";

type Theme = "dark" | "minimal";

/** デザイン比較用の切り替え（ダーク案／ミニマル案）。選択はこのブラウザに保存 */
export function ThemeSwitch({ className = "" }: { className?: string }) {
  const [theme, setTheme] = useState<Theme>("dark");

  // 描画前スクリプトで付けたテーマ属性は、React の初期化で <html> から外れることがあるため、ここで付け直す
  useEffect(() => {
    let t: Theme = "dark";
    try {
      const q = new URLSearchParams(window.location.search).get("theme");
      const saved = window.localStorage.getItem("revonik-theme");
      t = (q ?? saved) === "minimal" ? "minimal" : "dark";
    } catch {
      // 読み取れない場合はダーク
    }
    if (t === "minimal") document.documentElement.setAttribute("data-theme", "minimal");
    // eslint-disable-next-line react-hooks/set-state-in-effect -- URL・保存値からの復元
    setTheme(t);
  }, []);

  const apply = (t: Theme) => {
    setTheme(t);
    const root = document.documentElement;
    if (t === "minimal") root.setAttribute("data-theme", "minimal");
    else root.removeAttribute("data-theme");
    try {
      localStorage.setItem("revonik-theme", t);
    } catch {
      // 保存できなくても切り替えは有効
    }
  };

  return (
    <div role="group" aria-label="デザイン案の切り替え（比較用）" className={`inline-flex gap-1 rounded-full border border-line p-1 ${className}`}>
      {(["dark", "minimal"] as const).map((t) => (
        <button
          key={t}
          type="button"
          aria-pressed={theme === t}
          onClick={() => apply(t)}
          className={`min-h-9 rounded-full px-4 text-[0.75rem] font-semibold tracking-[0.08em] transition-colors ${
            theme === t ? "bg-fg text-on-fg" : "text-muted hover:text-fg"
          }`}
        >
          {t === "dark" ? "Dark" : "Minimal"}
        </button>
      ))}
    </div>
  );
}
