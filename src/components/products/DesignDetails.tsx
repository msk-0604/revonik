import type { Experience } from "@/data/experience";

/** 設計の見どころ（番号付き）。製品画像の上に注記を重ねる図解は、正確な製品写真の受領後に追加する */
export function DesignDetails({ details }: { details: Experience["details"] }) {
  return (
    <ol className="grid gap-px overflow-hidden rounded-[1.5rem] bg-line sm:grid-cols-2 lg:grid-cols-3">
      {details.map((d, i) => (
        <li key={d.label} className="bg-panel p-7 md:p-9">
          <span className="text-[0.75rem] font-semibold tracking-[0.2em] text-accent tabular-nums">{String(i + 1).padStart(2, "0")}</span>
          <p className="mt-4 text-[1.375rem] font-semibold tracking-tight md:text-[1.5rem]">{d.label}</p>
          <p className="mt-2 font-jp text-[0.9375rem] leading-[1.8] text-fg/75">{d.text}</p>
        </li>
      ))}
    </ol>
  );
}
