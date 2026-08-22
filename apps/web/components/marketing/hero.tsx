import Link from "next/link";
import { ArrowRight, Heart, MessageCircle, Play, Repeat2, Share2 } from "lucide-react";
import { MotionReveal } from "./motion-reveal";
import { stats } from "../../lib/marketing";

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-32 pb-20 sm:pt-40">
      {/* Ambient pastel gradient orbs */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute -top-40 left-1/2 h-[500px] w-[800px] -translate-x-1/2 rounded-full bg-primary/20 blur-[120px] animate-pulse-glow" />
        <div className="absolute top-24 right-[-160px] h-[400px] w-[400px] rounded-full bg-gradient-sky/20 blur-[100px]" />
        <div className="absolute bottom-[-120px] left-[-120px] h-[360px] w-[360px] rounded-full bg-gradient-lavender/20 blur-[100px]" />
      </div>

      <div className="relative mx-auto max-w-6xl px-6">
        <MotionReveal className="text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-hairline bg-card px-4 py-1.5 text-sm text-ink">
            <span className="h-1.5 w-1.5 rounded-full bg-primary" />
            AI-powered video creation, now in your browser
          </span>
        </MotionReveal>

        <MotionReveal delay={0.08}>
          <h1 className="mx-auto mt-8 max-w-5xl text-balance text-center font-heading text-5xl font-medium leading-[1.1] tracking-tight sm:text-7xl lg:text-8xl">
            <span className="bg-gradient-to-br from-white via-white to-white/40 bg-clip-text text-transparent">
              From a single idea to a{" "}
            </span>
            <span className="bg-gradient-to-r from-primary via-primary/80 to-gradient-sky bg-clip-text text-transparent">
              publish-ready video
            </span>
          </h1>
        </MotionReveal>

        <MotionReveal delay={0.16}>
          <p className="mx-auto mt-6 max-w-2xl text-balance text-center text-lg text-body sm:text-xl">
            Videaflow writes your script, storyboards every scene, generates visuals and
            voiceover, adds captions and music — then exports for YouTube, Shorts, Reels
            and TikTok. You stay in control at every step.
          </p>
        </MotionReveal>

        <MotionReveal delay={0.24}>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/signup"
              className="group flex w-full items-center justify-center gap-2 rounded-full bg-primary px-8 py-4 text-base font-medium text-primary-foreground shadow-[0_0_40px_rgba(168,85,247,0.4)] transition-all hover:scale-105 hover:bg-primary/90 hover:shadow-[0_0_60px_rgba(168,85,247,0.6)] sm:w-auto"
            >
              Start creating free
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              href="/#how-it-works"
              className="flex w-full items-center justify-center gap-2 rounded-full border border-hairline bg-card/50 px-8 py-4 text-base font-medium text-ink backdrop-blur-md transition-all hover:bg-surface-strong/80 sm:w-auto"
            >
              <Play className="h-4 w-4" />
              See how it works
            </Link>
          </div>
        </MotionReveal>

        {/* Product mockup */}
        <MotionReveal delay={0.32} className="relative mt-24">
          <div className="grid gap-6 lg:grid-cols-[1fr_280px]">
            {/* Main 16:9 editor preview */}
            <div className="animate-float overflow-hidden rounded-2xl border border-hairline bg-card/40 shadow-[0_8px_40px_rgba(0,0,0,0.4)] backdrop-blur-xl">
              <div className="flex items-center gap-2 border-b border-hairline px-5 py-3">
                <span className="h-3 w-3 rounded-full bg-rose-500/80" />
                <span className="h-3 w-3 rounded-full bg-amber-400/80" />
                <span className="h-3 w-3 rounded-full bg-emerald-400/80" />
                <span className="ml-3 text-xs text-muted-foreground">AI History Short · Scene 3 of 6</span>
              </div>
              <div className="relative aspect-video overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_60%_35%,#4c3a8f_0%,#0b0f19_70%)]" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                <div className="absolute inset-x-0 bottom-24 px-8 text-center">
                  <p className="text-2xl font-semibold text-white drop-shadow-lg sm:text-3xl">
                    “In 1956, a summer workshop changed computing forever…”
                  </p>
                </div>
                {/* Caption pill */}
                <div className="absolute inset-x-0 bottom-8 flex justify-center">
                  <span className="rounded-lg bg-black/60 px-4 py-1.5 text-lg font-medium text-white">
                    changed computing forever
                  </span>
                </div>
                {/* Play button */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="flex h-16 w-16 items-center justify-center rounded-full bg-white/10 backdrop-blur">
                    <Play className="h-7 w-7 fill-white text-white" />
                  </span>
                </div>
              </div>
              {/* Timeline strip */}
              <div className="flex items-center gap-2 border-t border-hairline px-5 py-3">
                {[
                  { label: "Hook", w: "w-24" },
                  { label: "Setup", w: "w-16" },
                  { label: "Story", w: "w-32" },
                  { label: "Payoff", w: "w-24" },
                  { label: "CTA", w: "w-14" },
                ].map((s, i) => (
                  <div
                    key={s.label}
                    className={`${s.w} h-8 rounded-md ${
                      i === 2 ? "bg-primary/80" : "bg-surface-strong"
                    } flex items-center justify-center text-[10px] ${
                      i === 2 ? "text-primary-foreground" : "text-body"
                    }`}
                  >
                    {s.label}
                  </div>
                ))}
              </div>
            </div>

            {/* Vertical 9:16 phone card */}
            <div className="animate-float mx-auto w-[260px] shrink-0 overflow-hidden rounded-[2.5rem] border-[4px] border-surface-dark bg-card shadow-[0_8px_40px_rgba(0,0,0,0.6)] lg:mx-0" style={{ animationDelay: "1s" }}>
              <div className="relative aspect-[9/16] overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,#312e81_0%,#0b0f19_75%)]" />
                <div className="absolute inset-x-0 bottom-24 px-4 text-center">
                  <p className="text-sm font-medium text-white drop-shadow">“1956. Dartmouth.”</p>
                </div>
                <div className="absolute inset-x-0 bottom-16 flex justify-center">
                  <span className="rounded-md bg-black/60 px-2 py-0.5 text-xs font-medium text-white">
                    Dartmouth.
                  </span>
                </div>
                {/* Right rail */}
                <div className="absolute right-3 bottom-24 flex flex-col items-center gap-4 text-white/70">
                  <Heart className="h-5 w-5 fill-rose-500 text-rose-500" />
                  <MessageCircle className="h-5 w-5" />
                  <Repeat2 className="h-5 w-5" />
                  <Share2 className="h-5 w-5" />
                </div>
                <div className="absolute bottom-0 inset-x-0 h-8 bg-gradient-to-t from-black/60 to-transparent" />
              </div>
            </div>
          </div>
        </MotionReveal>

        {/* Stats */}
        <MotionReveal delay={0.4}>
          <dl className="mx-auto mt-16 grid max-w-4xl grid-cols-2 gap-6 sm:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <dd className="font-heading text-3xl font-normal text-ink">{stat.value}</dd>
                <dt className="mt-1 text-sm text-body">{stat.label}</dt>
              </div>
            ))}
          </dl>
        </MotionReveal>
      </div>
    </section>
  );
}
