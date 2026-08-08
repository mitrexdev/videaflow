import { Star } from "lucide-react";
import { testimonials } from "../../lib/marketing";
import { MotionReveal } from "./motion-reveal";
import { SectionHeading } from "./section-heading";

export function Testimonials() {
  return (
    <section className="border-y border-hairline py-24">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          eyebrow="Loved by creators"
          title="They shipped more content in a week"
        />

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <MotionReveal key={t.name} delay={i * 0.08}>
              <figure className="flex h-full flex-col rounded-xl border border-hairline bg-card p-6 shadow-[0_4px_16px_rgba(0,0,0,0.04)]">
                <div className="flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, s) => (
                    <Star key={s} className="h-4 w-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-body">
                  “{t.quote}”
                </blockquote>
                <figcaption className="mt-6 flex items-center gap-3">
                  <span
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-surface-strong text-sm font-semibold text-ink"
                  >
                    {t.initials}
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-ink">{t.name}</p>
                    <p className="text-xs text-body">{t.role}</p>
                  </div>
                </figcaption>
              </figure>
            </MotionReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
