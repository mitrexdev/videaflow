import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { MotionReveal } from "./motion-reveal";

export function Cta() {
  return (
    <section className="py-24">
      <div className="mx-auto max-w-6xl px-6">
        <MotionReveal>
          <div className="relative overflow-hidden rounded-xl border border-hairline bg-card px-8 py-16 text-center shadow-[0_8px_40px_rgba(12,10,9,0.06)] sm:px-16">
            <div
              aria-hidden
              className="pointer-events-none absolute -top-24 left-1/2 h-64 w-[480px] -translate-x-1/2 rounded-full bg-gradient-mint/40 blur-[100px]"
            />
            <div
              aria-hidden
              className="pointer-events-none absolute -bottom-24 right-[-80px] h-56 w-56 rounded-full bg-gradient-lavender/40 blur-[100px]"
            />
            <h2 className="relative mx-auto max-w-2xl font-heading text-3xl font-normal tracking-tight text-ink sm:text-5xl">
              Give Videaflow an idea. Get a publish-ready content package.
            </h2>
            <p className="relative mx-auto mt-4 max-w-xl text-lg text-body">
              Script, storyboard, visuals, voice, captions, music — and exports for every platform.
              Start free, no credit card.
            </p>
            <div className="relative mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link
                href="/signup"
                className="group flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 font-medium text-primary-foreground transition hover:bg-primary/90"
              >
                Start creating free
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
              <Link
                href="/features"
                className="rounded-full border border-hairline-strong bg-card px-7 py-3.5 font-medium text-ink transition hover:bg-surface-strong"
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
