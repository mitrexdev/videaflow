import { features } from "../../lib/marketing";
import { MotionReveal } from "./motion-reveal";
import { SectionHeading } from "./section-heading";

export function Features() {
  return (
    <section id="features" className="scroll-mt-24 py-24">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          eyebrow="Features"
          title="A complete creator operating system"
          description="Not just another AI video generator — every stage of the pipeline is yours to control and edit."
        />

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, i) => (
            <MotionReveal key={feature.title} delay={(i % 3) * 0.08}>
              <div className="group h-full rounded-xl border border-hairline bg-card p-6 shadow-[0_4px_16px_rgba(0,0,0,0.04)] transition hover:border-hairline-strong">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-surface-strong text-ink">
                  <feature.icon className="h-5 w-5" />
                </div>
                <h3 className="mt-5 text-lg font-semibold text-ink">{feature.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-body">{feature.description}</p>
              </div>
            </MotionReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
