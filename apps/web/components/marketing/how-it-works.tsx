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
                  className={`rounded-xl px-4 py-2 text-sm font-semibold ${
                    i === 0 || i === flow.length - 1
                      ? "bg-gradient-to-r from-indigo-500 to-fuchsia-500 text-white"
                      : "border border-slate-800 bg-slate-900 text-slate-300"
                  }`}
                >
                  {step}
                </span>
                {i < flow.length - 1 ? (
                  <ArrowRight className="h-4 w-4 text-slate-600" />
                ) : null}
              </div>
            ))}
          </div>
        </MotionReveal>

        {/* 5 steps */}
        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
          {pipelineSteps.map((step, i) => (
            <MotionReveal key={step.title} delay={i * 0.08}>
              <div className="h-full rounded-2xl border border-white/5 bg-slate-900/40 p-6 transition hover:border-slate-700">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-500/15">
                  <step.icon className="h-5 w-5 text-indigo-400" />
                </div>
                <p className="mt-4 text-xs font-medium uppercase tracking-wider text-slate-500">
                  Step {i + 1}
                </p>
                <h3 className="mt-1 font-semibold text-white">{step.title}</h3>
                <p className="mt-2 text-sm text-slate-400">{step.description}</p>
              </div>
            </MotionReveal>
          ))}
        </div>

        {/* Checkpoints */}
        <MotionReveal delay={0.15} className="mt-12">
          <div className="flex flex-col items-center justify-center gap-3 rounded-2xl border border-indigo-400/20 bg-indigo-500/5 p-6 sm:flex-row sm:gap-8">
            {[
              "Review your scenes before any visuals are generated",
              "Regenerate a single scene — never the whole video",
              "Every export is yours to edit",
            ].map((point) => (
              <span key={point} className="flex items-center gap-2 text-sm text-slate-300">
                <Check className="h-4 w-4 text-indigo-400" />
                {point}
              </span>
            ))}
          </div>
        </MotionReveal>
      </div>
    </section>
  );
}
