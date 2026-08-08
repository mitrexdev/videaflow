import { MotionReveal } from "./motion-reveal";

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
}: {
  eyebrow: string;
  title: string;
  description?: string;
  align?: "center" | "left";
}) {
  const centered = align === "center";
  return (
    <MotionReveal
      className={
        centered
          ? "mx-auto max-w-2xl text-center"
          : "max-w-2xl"
      }
    >
      <p className="text-xs font-semibold uppercase tracking-widest text-ink">{eyebrow}</p>
      <h2 className="mt-3 font-heading text-3xl font-normal tracking-tight text-ink sm:text-4xl">{title}</h2>
      {description ? (
        <p className={`mt-4 text-lg text-body ${centered ? "" : "text-left"}`}>
          {description}
        </p>
      ) : null}
    </MotionReveal>
  );
}
