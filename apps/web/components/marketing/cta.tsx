import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { MotionReveal } from "./motion-reveal";

export function Cta() {
  return (
    <section className="py-24">
      <div className="mx-auto max-w-6xl px-6">
        <MotionReveal>
          <div className="relative overflow-hidden rounded-3xl border border-indigo-400/20 bg-gradient-to-br from-indigo-600/20 via-slate-900 to-fuchsia-600/20 px-8 py-16 text-center sm:px-16">
            <div
              aria-hidden
              className="pointer-events-none absolute -top-24 left-1/2 h-64 w-[480px] -translate-x-1/2 rounded-full bg-indigo-500/30 blur-[100px]"
            />
            <h2 className="relative mx-auto max-w-2xl text-3xl font-bold tracking-tight text-white sm:text-5xl">
              Give Videaflow an idea. Get a publish-ready content package.
            </h2>
            <p className="relative mx-auto mt-4 max-w-xl text-lg text-slate-300">
              Script, storyboard, visuals, voice, captions, music — and exports for every platform.
              Start free, no credit card.
            </p>
            <div className="relative mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link
                href="/signup"
                className="group flex items-center gap-2 rounded-2xl bg-white px-7 py-3.5 font-semibold text-slate-900 transition hover:bg-slate-100"
              >
                Start creating free
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
              <Link
                href="/features"
                className="rounded-2xl border border-white/20 px-7 py-3.5 font-semibold text-white transition hover:bg-white/10"
              >
                Explore features
              </Link>
            </div>
          </div>
        </MotionReveal>
      </div>
    </section>
  );
}
