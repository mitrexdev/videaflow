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
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-surface-strong text-ink">
                    <point.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-ink">{point.title}</h3>
                    <p className="mt-1 text-sm text-body">{point.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </MotionReveal>

          {/* Editor mockup */}
          <MotionReveal delay={0.15}>
            <div className="overflow-hidden rounded-xl border border-hairline bg-card shadow-[0_8px_40px_rgba(12,10,9,0.08)]">
              <div className="flex items-center justify-between border-b border-hairline px-5 py-3">
                <div className="flex gap-1.5">
                  {["Scenes", "Voice", "Captions"].map((tab) => (
                    <span
                      key={tab}
                      className={`rounded-full px-3 py-1 text-xs font-medium ${
                        tab === "Voice"
                          ? "bg-primary text-primary-foreground"
                          : "text-body"
                      }`}
                    >
                      {tab}
                    </span>
                  ))}
                </div>
                <span className="flex items-center gap-1.5 text-xs text-body">
                  <Wand2 className="h-3.5 w-3.5" />
                  Scene 3 / 6
                </span>
              </div>

              <div className="space-y-4 p-5">
                {/* Scene narration */}
                <div className="rounded-lg border border-hairline bg-surface-strong/50 p-4">
                  <p className="text-xs text-body">Scene 3 · narration</p>
                  <p className="mt-1 text-sm text-ink">
                    “In 1956, a summer workshop at Dartmouth changed computing forever…”
                  </p>
                </div>

                {/* Visual + voice row */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="rounded-lg border border-hairline bg-surface-strong/50 p-4">
                    <p className="text-xs text-body">Visual</p>
                    <p className="mt-1 text-xs text-ink">Retro computer room, warm light</p>
                    <span className="mt-3 flex w-fit items-center gap-1.5 rounded-full bg-primary px-2.5 py-1.5 text-xs font-medium text-primary-foreground">
                      <RefreshCw className="h-3 w-3" />
                      Regenerate
                    </span>
                  </div>
                  <div className="rounded-lg border border-hairline bg-surface-strong/50 p-4">
                    <p className="text-xs text-body">Voiceover</p>
                    <div className="mt-2 flex h-8 items-center gap-[3px]">
                      {[5, 10, 7, 14, 9, 12, 6, 15, 8, 11, 5, 9, 13, 7, 10, 6, 12, 8, 14, 5].map(
                        (h, i) => (
                          <span
                            key={i}
                            className={`w-1 rounded-full ${i % 3 === 0 ? "bg-primary" : "bg-hairline-strong"}`}
                            style={{ height: `${h * 3}px` }}
                          />
                        ),
                      )}
                    </div>
                    <p className="mt-2 text-[10px] text-body">5.8s · matches audio exactly</p>
                  </div>
                </div>

                {/* Caption style */}
                <div className="rounded-lg border border-hairline bg-surface-strong/50 p-4">
                  <div className="flex items-center justify-between">
                    <p className="text-xs text-body">Caption style</p>
                    <span className="text-[10px] text-body">from Brand Kit</span>
                  </div>
                  <span className="mt-2 inline-block rounded-lg bg-primary px-3 py-1.5 text-sm font-medium text-primary-foreground">
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
