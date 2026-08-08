"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { faqs } from "../../lib/marketing";
import { MotionReveal } from "./motion-reveal";
import { SectionHeading } from "./section-heading";

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="scroll-mt-24 py-24">
      <div className="mx-auto max-w-3xl px-6">
        <SectionHeading eyebrow="FAQ" title="Questions, answered" />

        <div className="mt-12 space-y-3">
          {faqs.map((faq, i) => {
            const isOpen = open === i;
            return (
              <MotionReveal key={faq.question} delay={i * 0.04}>
                <div className="overflow-hidden rounded-xl border border-hairline bg-card">
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                  >
                    <span className="font-medium text-ink">{faq.question}</span>
                    <ChevronDown
                      className={`h-5 w-5 shrink-0 text-body transition-transform ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  {isOpen ? (
                    <p className="px-6 pb-5 text-sm leading-relaxed text-body">
                      {faq.answer}
                    </p>
                  ) : null}
                </div>
              </MotionReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
