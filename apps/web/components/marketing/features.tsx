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
              <div className="group relative h-full overflow-hidden rounded-2xl border border-hairline bg-card/40 p-8 shadow-lg backdrop-blur-md transition-all hover:-translate-y-1 hover:border-primary/50 hover:shadow-[0_8px_30px_rgba(168,85,247,0.15)]">
                {/* Subtle gradient reveal on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                
                <div className="relative">
                  <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-primary/60 text-white shadow-inner">
                    <feature.icon className="h-7 w-7" />
                  </div>
                  <h3 className="mt-6 text-xl font-semibold text-ink transition-colors group-hover:text-primary">
                    {feature.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-body">
                    {feature.description}
                  </p>
                </div>
              </div>
            </MotionReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
