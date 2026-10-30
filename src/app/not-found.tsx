import { Button } from "@/components/Button";

export default function NotFound() {
  return (
    <section className="container-x flex min-h-[80svh] flex-col items-center justify-center pt-32 pb-20 text-center">
      <p className="eyebrow">404</p>
      <h1 className="headline mt-2 text-[2.75rem] sm:text-6xl">ページが見つかりません。</h1>
      <p className="prose-jp mt-5 text-muted">お探しのページは移動または削除された可能性があります。</p>
      <div className="mt-8">
        <Button href="/">ホームへ戻る</Button>
      </div>
    </section>
  );
}
