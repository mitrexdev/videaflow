"use client";

import { useState } from "react";
import Link from "next/link";
import { Check } from "lucide-react";
import { plans } from "../../lib/marketing";
import { MotionReveal } from "./motion-reveal";
import { SectionHeading } from "./section-heading";

export function Pricing() {
  const [yearly, setYearly] = useState(true);

  return (
    <section id="pricing" className="scroll-mt-24 py-24">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          eyebrow="Pricing"
          title="Start free. Scale when you're ready."
          description="Every plan includes the full AI pipeline. Credits meter actual generation — you only pay for what you use."
        />

        <MotionReveal delay={0.1} className="mt-8 flex items-center justify-center gap-3">
          <span className={`text-sm ${yearly ? "text-body" : "text-ink"}`}>Monthly</span>
          <button
            type="button"
            role="switch"
            aria-checked={yearly}
            onClick={() => setYearly((v) => !v)}
            className={`relative h-7 w-12 rounded-full transition ${yearly ? "bg-primary" : "bg-input"}`}
          >
            <span
              className={`absolute top-1 h-5 w-5 rounded-full bg-primary-foreground shadow-sm transition-all ${yearly ? "left-6" : "left-1"}`}
            />
          </button>
          <span className={`text-sm ${yearly ? "text-ink" : "text-body"}`}>
            Yearly <span className="text-ink">−20%</span>
          </span>
        </MotionReveal>

        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {plans.map((plan, i) => {
            const price = yearly ? plan.yearly : plan.monthly;
            return (
              <MotionReveal key={plan.name} delay={i * 0.08}>
                <div
                  className={`relative flex h-full flex-col rounded-2xl transition-all duration-300 hover:-translate-y-2 ${
                    plan.highlighted
                      ? "p-[2px] bg-gradient-to-b from-primary via-gradient-sky to-primary shadow-[0_0_40px_rgba(168,85,247,0.25)] hover:shadow-[0_0_60px_rgba(168,85,247,0.4)]"
                      : "p-[1px] bg-hairline hover:bg-hairline-strong shadow-lg"
                  }`}
                >
                  {plan.highlighted ? (
                    <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 z-10 rounded-full bg-primary px-4 py-1 text-xs font-medium text-primary-foreground shadow-md whitespace-nowrap">
                      Most popular
                    </span>
                  ) : null}
                  <div className={`flex h-full flex-col rounded-[14px] p-8 relative ${plan.highlighted ? "bg-background" : "bg-card backdrop-blur-xl"}`}>
                    {/* Subtle inner glow for highlighted plan */}
                    {plan.highlighted && (
                      <div className="absolute inset-0 rounded-[14px] bg-gradient-to-b from-primary/10 to-transparent pointer-events-none" />
                    )}

                  <h3 className="text-lg font-semibold text-ink">{plan.name}</h3>
                  <p className="mt-1 text-sm text-body">{plan.description}</p>

                  <div className="mt-5 flex items-baseline gap-1">
                    <span className="font-heading text-4xl font-normal text-ink">${price}</span>
                    <span className="text-sm text-body">/ month</span>
                  </div>
                  <p className="mt-1 text-xs text-body">
                    {price === 0
                      ? "free forever"
                      : yearly
                        ? "billed yearly"
                        : "billed monthly"}
                  </p>

                  <p className="mt-4 inline-flex w-fit rounded-full bg-surface-strong px-3 py-1 text-xs font-medium text-ink">
                    {plan.credits}
                  </p>

                  <ul className="mt-6 flex-1 space-y-3">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2 text-sm text-body">
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-ink" />
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <Link
                    href="/signup"
                    className={`mt-8 rounded-full px-6 py-3.5 text-center text-sm font-medium transition-all ${
                      plan.highlighted
                        ? "bg-primary text-primary-foreground hover:bg-primary/90 hover:scale-105 shadow-[0_0_20px_rgba(168,85,247,0.3)]"
                        : "border border-hairline bg-surface-strong/30 text-ink hover:bg-surface-strong/80"
                    }`}
                  >
                    {plan.cta}
                  </Link>
                </div>
              </div>
              </MotionReveal>
            );
          })}
        </div>

        <MotionReveal delay={0.2}>
          <p className="mt-8 text-center text-sm text-body">
            Need more? Our <span className="text-ink">Business</span> plan adds team seats,
            SSO and dedicated rendering.{" "}
            <Link href="/signup" className="text-ink hover:opacity-80">
              Talk to us →
            </Link>
          </p>
        </MotionReveal>
      </div>
    </section>
  );
}
