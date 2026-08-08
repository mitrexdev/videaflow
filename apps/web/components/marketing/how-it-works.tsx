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
                      ? "bg-primary text-primary-foreground"
                      : "border border-hairline bg-card text-body"
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
              <div className="h-full rounded-xl border border-hairline bg-card p-6 shadow-[0_4px_16px_rgba(0,0,0,0.04)] transition hover:border-hairline-strong">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-surface-strong">
                  <step.icon className="h-5 w-5 text-ink" />
                </div>
                <p className="mt-4 text-xs font-medium uppercase tracking-wider text-body">
                  Step {i + 1}
                </p>
                <h3 className="mt-1 font-semibold text-ink">{step.title}</h3>
                <p className="mt-2 text-sm text-body">{step.description}</p>
              </div>
            </MotionReveal>
          ))}
        </div>

        {/* Checkpoints */}
        <MotionReveal delay={0.15} className="mt-12">
          <div className="flex flex-col items-center justify-center gap-3 rounded-xl border border-hairline bg-surface-strong/50 p-6 sm:flex-row sm:gap-8">
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
