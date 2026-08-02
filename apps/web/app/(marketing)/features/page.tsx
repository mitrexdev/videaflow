import { Clapperboard, Languages, Video } from "lucide-react";
import { Features } from "../../../components/marketing/features";
import { Cta } from "../../../components/marketing/cta";
import { SectionHeading } from "../../../components/marketing/section-heading";
import { MotionReveal } from "../../../components/marketing/motion-reveal";

const details = [
  {
    icon: Languages,
    title: "Every stage speaks your language",
    description:
      "Scripts, scene prompts and captions are generated in your language, tuned to sound like they were written by a human editor — not a model.",
  },
  {
    icon: Clapperboard,
    title: "Scenes you can touch",
    description:
      "Each scene is a real, addressable object. Reorder, trim, swap the visual, change the voice — regenerate one scene in seconds, never the whole video.",
  },
  {
    icon: Video,
    title: "Formats without the work",
    description:
      "Master 16:9 project, then one click to reframe for Shorts, Reels and TikTok — captions reflow, safe zones respected.",
  },
];

export default function FeaturesPage() {
  return (
    <>
      <section className="pt-32 pb-16 sm:pt-40">
        <div className="mx-auto max-w-6xl px-6">
          <SectionHeading
            eyebrow="Features"
            title="Everything you need to ship video"
            description="The full pipeline is modular — every AI stage is a building block you control, edit and replace."
          />
        </div>
      </section>

      <Features />

      <section className="py-24">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid gap-6 md:grid-cols-3">
            {details.map((detail, i) => (
              <MotionReveal key={detail.title} delay={i * 0.08}>
                <div className="h-full rounded-2xl border border-white/5 bg-slate-900/40 p-6">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-500/15">
                    <detail.icon className="h-5 w-5 text-indigo-400" />
                  </div>
                  <h3 className="mt-5 text-lg font-semibold text-white">{detail.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-400">{detail.description}</p>
                </div>
              </MotionReveal>
            ))}
          </div>
        </div>
      </section>

      <Cta />
    </>
  );
}
