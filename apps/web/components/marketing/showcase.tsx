import { AudioLines, Captions, RefreshCw, Wand2 } from "lucide-react";
import { MotionReveal } from "./motion-reveal";
import { SectionHeading } from "./section-heading";

const points = [
  {
    icon: RefreshCw,
    title: "Regenerate one scene, not the whole video",
    description: "Hate a visual? Swap the prompt and re-generate just that scene. The rest stays untouched.",
  },
  {
    icon: Captions,
    title: "Captions that feel native",
    description: "Word-level subtitles styled to your brand — burned in or exported as a sidecar file.",
  },
  {
    icon: AudioLines,
    title: "Voice & music that mix themselves",
    description: "Scene lengths snap to the real voiceover audio, and music ducks under your voice automatically.",
  },
];

export function Showcase() {
  return (
    <section className="py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <MotionReveal>
            <SectionHeading
              eyebrow="The editor"
              title="Powerful where it matters, simple everywhere else"
              description="A scene-based timeline made for the AI workflow — you review, tweak and regenerate, never fight a bloated UI."
              align="left"
            />
            <div className="mt-8 space-y-6">
              {points.map((point) => (
                <div key={point.title} className="flex gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-indigo-500/15">
                    <point.icon className="h-5 w-5 text-indigo-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white">{point.title}</h3>
                    <p className="mt-1 text-sm text-slate-400">{point.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </MotionReveal>

          {/* Editor mockup */}
          <MotionReveal delay={0.15}>
            <div className="overflow-hidden rounded-3xl border border-white/10 bg-slate-900/60 shadow-2xl shadow-black/50">
              <div className="flex items-center justify-between border-b border-white/5 px-5 py-3">
                <div className="flex gap-1.5">
                  {["Scenes", "Voice", "Captions"].map((tab) => (
                    <span
                      key={tab}
                      className={`rounded-lg px-3 py-1 text-xs font-medium ${
                        tab === "Voice"
                          ? "bg-indigo-500/20 text-indigo-300"
                          : "text-slate-400"
                      }`}
                    >
                      {tab}
                    </span>
                  ))}
                </div>
                <span className="flex items-center gap-1.5 text-xs text-slate-400">
                  <Wand2 className="h-3.5 w-3.5" />
                  Scene 3 / 6
                </span>
              </div>

              <div className="space-y-4 p-5">
                {/* Scene narration */}
                <div className="rounded-2xl border border-white/5 bg-slate-800/40 p-4">
                  <p className="text-xs text-slate-500">Scene 3 · narration</p>
                  <p className="mt-1 text-sm text-slate-200">
                    “In 1956, a summer workshop at Dartmouth changed computing forever…”
                  </p>
                </div>

                {/* Visual + voice row */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="rounded-2xl border border-white/5 bg-slate-800/40 p-4">
                    <p className="text-xs text-slate-500">Visual</p>
                    <p className="mt-1 text-xs text-slate-300">Retro computer room, warm light</p>
                    <span className="mt-3 flex items-center gap-1.5 rounded-lg bg-indigo-500/15 px-2.5 py-1.5 text-xs font-medium text-indigo-300">
                      <RefreshCw className="h-3 w-3" />
                      Regenerate
                    </span>
                  </div>
                  <div className="rounded-2xl border border-white/5 bg-slate-800/40 p-4">
                    <p className="text-xs text-slate-500">Voiceover</p>
                    <div className="mt-2 flex h-8 items-center gap-[3px]">
                      {[5, 10, 7, 14, 9, 12, 6, 15, 8, 11, 5, 9, 13, 7, 10, 6, 12, 8, 14, 5].map(
                        (h, i) => (
                          <span
                            key={i}
                            className={`w-1 rounded-full ${i % 3 === 0 ? "bg-indigo-400" : "bg-slate-500/70"}`}
                            style={{ height: `${h * 3}px` }}
                          />
                        ),
                      )}
                    </div>
                    <p className="mt-2 text-[10px] text-slate-500">5.8s · matches audio exactly</p>
                  </div>
                </div>

                {/* Caption style */}
                <div className="rounded-2xl border border-white/5 bg-slate-800/40 p-4">
                  <div className="flex items-center justify-between">
                    <p className="text-xs text-slate-500">Caption style</p>
                    <span className="text-[10px] text-slate-500">from Brand Kit</span>
                  </div>
                  <span className="mt-2 inline-block rounded-lg bg-black/70 px-3 py-1.5 text-sm font-medium text-white">
                    changed computing forever
                  </span>
                </div>
              </div>
            </div>
          </MotionReveal>
        </div>
      </div>
    </section>
  );
}
