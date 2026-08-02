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
          <span className={`text-sm ${yearly ? "text-slate-400" : "text-white"}`}>Monthly</span>
          <button
            type="button"
            role="switch"
            aria-checked={yearly}
            onClick={() => setYearly((v) => !v)}
            className={`relative h-7 w-12 rounded-full transition ${yearly ? "bg-indigo-500" : "bg-slate-700"}`}
          >
            <span
              className={`absolute top-1 h-5 w-5 rounded-full bg-white transition-all ${yearly ? "left-6" : "left-1"}`}
            />
          </button>
          <span className={`text-sm ${yearly ? "text-white" : "text-slate-400"}`}>
            Yearly <span className="text-indigo-400">−20%</span>
          </span>
        </MotionReveal>

        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {plans.map((plan, i) => {
            const price = yearly ? plan.yearly : plan.monthly;
            return (
              <MotionReveal key={plan.name} delay={i * 0.08}>
                <div
                  className={`relative flex h-full flex-col rounded-3xl border p-7 ${
                    plan.highlighted
                      ? "border-indigo-400/40 bg-gradient-to-b from-indigo-500/10 to-slate-900/40 shadow-xl shadow-indigo-900/20"
                      : "border-white/5 bg-slate-900/40"
                  }`}
                >
                  {plan.highlighted ? (
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-indigo-500 to-fuchsia-500 px-4 py-1 text-xs font-semibold text-white">
                      Most popular
                    </span>
                  ) : null}

                  <h3 className="text-lg font-semibold text-white">{plan.name}</h3>
                  <p className="mt-1 text-sm text-slate-400">{plan.description}</p>

                  <div className="mt-5 flex items-baseline gap-1">
                    <span className="text-4xl font-bold text-white">${price}</span>
                    <span className="text-sm text-slate-500">/ month</span>
                  </div>
                  {yearly && price > 0 ? (
                    <p className="mt-1 text-xs text-slate-500">billed yearly</p>
                  ) : (
                    <p className="mt-1 text-xs text-slate-500">free forever</p>
                  )}

                  <p className="mt-4 inline-flex w-fit rounded-lg bg-slate-800/60 px-3 py-1 text-xs font-medium text-indigo-300">
                    {plan.credits}
                  </p>

                  <ul className="mt-6 flex-1 space-y-3">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2 text-sm text-slate-300">
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-indigo-400" />
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <Link
                    href="/signup"
                    className={`mt-8 rounded-xl px-5 py-3 text-center text-sm font-semibold transition ${
                      plan.highlighted
                        ? "bg-gradient-to-r from-indigo-500 to-fuchsia-500 text-white hover:opacity-90"
                        : "border border-slate-700 text-slate-200 hover:bg-slate-800"
                    }`}
                  >
                    {plan.cta}
                  </Link>
                </div>
              </MotionReveal>
            );
          })}
        </div>

        <MotionReveal delay={0.2}>
          <p className="mt-8 text-center text-sm text-slate-500">
            Need more? Our <span className="text-slate-300">Business</span> plan adds team seats,
            SSO and dedicated rendering.{" "}
            <Link href="/signup" className="text-indigo-400 hover:text-indigo-300">
              Talk to us →
            </Link>
          </p>
        </MotionReveal>
      </div>
    </section>
  );
}
