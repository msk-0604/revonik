import { Reveal } from "./Reveal";

export function PageHeader({ eyebrow, title, lead }: { eyebrow?: string; title: string; lead?: React.ReactNode }) {
  return (
    <section className="container-x pt-36 pb-12 text-center md:pt-44 md:pb-16">
      <Reveal>
        {eyebrow && <p className="eyebrow">{eyebrow}</p>}
        <h1 className="headline mt-2 text-[2.75rem] sm:text-6xl lg:text-7xl">{title}</h1>
        {lead && <p className="prose-jp mx-auto mt-6 max-w-2xl text-[0.9375rem] text-muted sm:text-[1.0625rem]">{lead}</p>}
      </Reveal>
    </section>
  );
}
