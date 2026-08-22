import { ArrowRight, Check } from "lucide-react";
import { pipelineSteps } from "../../lib/marketing";
import { MotionReveal } from "./motion-reveal";
import { SectionHeading } from "./section-heading";

const flow = [
  "Idea",
  "Script",
  "Scenes",
  "Visuals",
  "Voice",
  "Captions",
  "Music",
  "Video",
  "Export",
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="scroll-mt-24 py-24">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          eyebrow="How it works"
          title="From idea to finished video in minutes"
          description="A guided pipeline with a human check at every cost-heavy step. You approve scenes before we generate visuals."
        />

        {/* Pipeline flow chain */}
        <MotionReveal delay={0.1} className="mt-12">
          <div className="flex flex-wrap items-center justify-center gap-2">
            {flow.map((step, i) => (
              <div key={step} className="flex items-center gap-2">
                <span
                  className={`rounded-full px-4 py-2 text-sm font-medium ${
                    i === 0 || i === flow.length - 1
                      ? "bg-primary text-primary-foreground shadow-[0_0_15px_rgba(168,85,247,0.5)]"
                      : "border border-hairline bg-card/50 backdrop-blur-sm text-body"
                  }`}
                >
                  {step}
                </span>
                {i < flow.length - 1 ? (
                  <ArrowRight className="h-4 w-4 text-body" />
                ) : null}
              </div>
            ))}
          </div>
        </MotionReveal>

        {/* 5 steps */}
        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
          {pipelineSteps.map((step, i) => (
            <MotionReveal key={step.title} delay={i * 0.08}>
              <div className="group relative h-full overflow-hidden rounded-2xl border border-hairline bg-card/40 p-6 shadow-lg backdrop-blur-md transition-all hover:-translate-y-1 hover:border-primary/50 hover:shadow-[0_8px_30px_rgba(168,85,247,0.15)]">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                <div className="relative">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-primary/60 text-white shadow-inner">
                    <step.icon className="h-6 w-6" />
                  </div>
                  <p className="mt-5 text-xs font-semibold uppercase tracking-wider text-primary">
                    Step {i + 1}
                  </p>
                  <h3 className="mt-2 text-lg font-semibold text-ink group-hover:text-primary transition-colors">{step.title}</h3>
                  <p className="mt-2 text-sm text-body">{step.description}</p>
                </div>
              </div>
            </MotionReveal>
          ))}
        </div>

        {/* Checkpoints */}
        <MotionReveal delay={0.15} className="mt-12">
          <div className="flex flex-col items-center justify-center gap-3 rounded-2xl border border-hairline bg-card/30 backdrop-blur-md p-6 sm:flex-row sm:gap-8 shadow-lg">
            {[
              "Review your scenes before any visuals are generated",
              "Regenerate a single scene — never the whole video",
              "Every export is yours to edit",
            ].map((point) => (
              <span key={point} className="flex items-center gap-2 text-sm text-body">
                <Check className="h-4 w-4 text-ink" />
                {point}
              </span>
            ))}
          </div>
        </MotionReveal>
      </div>
    </section>
  );
}
