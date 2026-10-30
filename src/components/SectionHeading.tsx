import { Reveal } from "./Reveal";

type Props = {
  eyebrow: string;
  title: React.ReactNode;
  lead?: React.ReactNode;
  align?: "left" | "center";
  as?: "h1" | "h2";
};

export function SectionHeading({ eyebrow, title, lead, align = "left", as: Tag = "h2" }: Props) {
  const center = align === "center";
  return (
    <Reveal className={center ? "mx-auto max-w-3xl text-center" : "max-w-4xl"}>
      <p className={`eyebrow flex items-center gap-4 ${center ? "justify-center" : ""}`}>
        <span aria-hidden className="h-px w-10 bg-line-strong" />
        {eyebrow}
      </p>
      <Tag className="display mt-6 text-[2.6rem] sm:text-6xl lg:text-7xl">{title}</Tag>
      {lead && <p className="prose-jp mt-6 max-w-2xl text-[0.95rem] sm:text-base">{lead}</p>}
    </Reveal>
  );
}
