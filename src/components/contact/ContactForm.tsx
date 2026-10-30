"use client";

import { useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Check, Info } from "lucide-react";

/**
 * お問い合わせフォーム（UI のみ）
 * 営業デモのため送信機能は無効。入力値はどこにも送信・保存されない
 * （各入力に name 属性を付けず、送信時は preventDefault して入力をクリアする）。
 * 正式運用時は Server Action + メール送信（Resend 等）を実装する。README 参照。
 */

const topics = ["製品について", "取扱店・購入について", "取材・メディア掲載", "その他"];

type Errors = Partial<Record<"topic" | "name" | "email" | "message" | "agree", string>>;

const field =
  "mt-2 block w-full border border-line-strong bg-panel px-4 py-3.5 font-jp text-base text-fg placeholder:text-muted/70 transition-colors focus:border-fg focus:outline-none aria-[invalid=true]:border-red-300/70";
const labelCls = "flex items-center gap-2 font-jp text-[0.85rem]";
const req = <span className="font-display text-[0.6rem] font-semibold tracking-[0.18em] text-muted">REQUIRED</span>;

export function ContactForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [errors, setErrors] = useState<Errors>({});
  const [done, setDone] = useState(false);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = e.currentTarget;
    const get = (id: string) => (f.querySelector<HTMLInputElement>(`#${id}`)?.value ?? "").trim();
    const next: Errors = {};
    if (!get("c-topic")) next.topic = "お問い合わせ種別を選択してください。";
    if (!get("c-name")) next.name = "お名前を入力してください。";
    const email = get("c-email");
    if (!email) next.email = "メールアドレスを入力してください。";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) next.email = "メールアドレスの形式をご確認ください。";
    if (!get("c-message")) next.message = "お問い合わせ内容を入力してください。";
    if (!f.querySelector<HTMLInputElement>("#c-agree")?.checked) next.agree = "内容をご確認のうえチェックしてください。";
    setErrors(next);
    if (Object.keys(next).length > 0) {
      const first = Object.keys(next)[0];
      f.querySelector<HTMLElement>(`#c-${first}`)?.focus();
      return;
    }
    // 送信しない：入力内容を破棄して完了表示（デモ）
    f.reset();
    setDone(true);
  };

  const err = (k: keyof Errors) =>
    errors[k] ? (
      <p id={`c-${k}-error`} className="mt-2 font-jp text-[0.75rem] text-red-200/90">
        {errors[k]}
      </p>
    ) : null;
  const a11y = (k: keyof Errors) => ({
    "aria-invalid": errors[k] ? true : undefined,
    "aria-describedby": errors[k] ? `c-${k}-error` : undefined,
  });

  return (
    <div>
      <div role="note" className="flex gap-3 border border-amber-200/25 bg-amber-100/[0.04] p-4 md:p-5">
        <Info aria-hidden className="mt-0.5 size-5 shrink-0 text-amber-100/80" />
        <p className="font-jp text-[0.82rem] leading-relaxed text-fg/85">
          営業提案用デモのため、<strong className="font-bold">送信機能は無効</strong>
          です。入力内容は送信・保存されません。実際の個人情報は入力しないでください。
        </p>
      </div>

      <form ref={formRef} onSubmit={onSubmit} noValidate autoComplete="off" className="mt-10 grid gap-7" aria-label="お問い合わせフォーム（デモ）">
        <div>
          <label htmlFor="c-topic" className={labelCls}>お問い合わせ種別 {req}</label>
          <select id="c-topic" defaultValue="" className={`${field} appearance-none`} {...a11y("topic")}>
            <option value="" disabled>選択してください</option>
            {topics.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
          {err("topic")}
        </div>
        <div className="grid gap-7 md:grid-cols-2">
          <div>
            <label htmlFor="c-name" className={labelCls}>お名前 {req}</label>
            <input id="c-name" type="text" placeholder="山田 太郎（デモ）" className={field} {...a11y("name")} />
            {err("name")}
          </div>
          <div>
            <label htmlFor="c-email" className={labelCls}>メールアドレス {req}</label>
            <input id="c-email" type="email" inputMode="email" placeholder="demo@example.com" className={field} {...a11y("email")} />
            {err("email")}
          </div>
        </div>
        <div>
          <label htmlFor="c-product" className={labelCls}>対象の製品（任意）</label>
          <input id="c-product" type="text" placeholder="例：SaraMoa" className={field} />
        </div>
        <div>
          <label htmlFor="c-message" className={labelCls}>お問い合わせ内容 {req}</label>
          <textarea id="c-message" rows={6} placeholder="お問い合わせ内容をご記入ください（デモのため送信されません）" className={`${field} resize-y`} {...a11y("message")} />
          {err("message")}
        </div>
        <div>
          <label htmlFor="c-agree" className="flex cursor-pointer items-start gap-3 font-jp text-[0.85rem] leading-relaxed">
            <input id="c-agree" type="checkbox" className="mt-1 size-4 shrink-0 accent-[#DCE1E5]" {...a11y("agree")} />
            デモであり送信されないことを理解しました
          </label>
          {err("agree")}
        </div>
        <div>
          <button
            type="submit"
            className="group inline-flex min-h-14 w-full items-center justify-center gap-3 bg-fg px-10 font-display text-[0.8rem] font-semibold tracking-[0.24em] text-ink transition-colors duration-500 hover:bg-accent sm:w-auto"
          >
            SEND（DEMO）
          </button>
        </div>
      </form>

      <AnimatePresence>
        {done && (
          <motion.div
            role="status"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="mt-8 flex gap-3 border border-line-strong bg-panel p-5"
          >
            <Check aria-hidden className="mt-0.5 size-5 shrink-0" />
            <div>
              <p className="font-jp text-[0.9rem] font-bold">送信完了画面のイメージです（実際には送信されていません）</p>
              <p className="mt-1 font-jp text-[0.8rem] leading-relaxed text-muted">
                入力内容は破棄しました。正式運用時は、ここでメール送信と自動返信を行います。
              </p>
              <button type="button" onClick={() => setDone(false)} className="mt-3 font-display text-[0.7rem] font-semibold tracking-[0.2em] underline underline-offset-4">
                CLOSE
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
