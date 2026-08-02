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
      <p className="text-sm font-medium uppercase tracking-widest text-indigo-400">{eyebrow}</p>
      <h2 className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl">{title}</h2>
      {description ? (
        <p className={`mt-4 text-lg text-slate-400 ${centered ? "" : "text-left"}`}>
          {description}
        </p>
      ) : null}
    </MotionReveal>
  );
}
