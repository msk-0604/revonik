import { Reveal } from "./Reveal";

export function PageHeader({ eyebrow, title, lead }: { eyebrow: string; title: string; lead?: React.ReactNode }) {
  return (
    <section className="relative overflow-hidden border-b border-line pt-36 pb-14 md:pt-48 md:pb-20">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-60 [background:radial-gradient(60%_80%_at_80%_0%,#1c1f23_0%,transparent_70%)]"
      />
      <div className="container-x relative">
        <Reveal>
          <p className="eyebrow">{eyebrow}</p>
          <h1 className="display mt-5 text-[3rem] sm:text-7xl lg:text-[7.5rem]">{title}</h1>
          {lead && <p className="prose-jp mt-6 max-w-2xl text-[0.95rem] sm:text-base">{lead}</p>}
        </Reveal>
      </div>
    </section>
  );
}
