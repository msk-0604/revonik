import { Button } from "@/components/Button";

export default function NotFound() {
  return (
    <section className="container-x flex min-h-[80svh] flex-col items-start justify-center pt-32 pb-20">
      <p className="eyebrow">404</p>
      <h1 className="display mt-5 text-6xl md:text-8xl">Not found.</h1>
      <p className="prose-jp mt-6">お探しのページは見つかりませんでした。</p>
      <div className="mt-10">
        <Button href="/">Back to home</Button>
      </div>
    </section>
  );
}
