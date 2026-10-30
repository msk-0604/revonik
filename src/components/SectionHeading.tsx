import { Reveal } from "./Reveal";

type Props = {
  eyebrow?: string;
  title: React.ReactNode;
  lead?: React.ReactNode;
  align?: "left" | "center";
  id?: string;
};

export function SectionHeading({ eyebrow, title, lead, align = "center", id }: Props) {
  const center = align === "center";
  return (
    <Reveal className={center ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}>
      {eyebrow && <p className="eyebrow">{eyebrow}</p>}
      <h2 id={id} className="headline mt-2 text-[2.25rem] sm:text-5xl lg:text-[3.5rem]">
        {title}
      </h2>
      {lead && <p className={`prose-jp mt-5 text-[0.9375rem] text-muted sm:text-[1.0625rem] ${center ? "mx-auto max-w-2xl" : "max-w-2xl"}`}>{lead}</p>}
    </Reveal>
  );
}
