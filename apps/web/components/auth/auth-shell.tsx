import Link from "next/link";
import { Check } from "lucide-react";
import type { ReactNode } from "react";
import { Logo } from "@/components/logo";

const perks = [
  "Script, storyboard, visuals and voice in one flow",
  "Auto captions, music and one-click export",
  "Start free — no credit card required",
];

export function AuthShell({
  title,
  subtitle,
  footer,
  children,
  showIntro = true,
  showFooter = true,
}: {
  title: string;
  subtitle: string;
  footer: { text: string; href: string; label: string };
  children: ReactNode;
  showIntro?: boolean;
  showFooter?: boolean;
}) {
  return (
    <div className="grid w-full max-w-4xl overflow-hidden rounded-xl border border-hairline bg-card shadow-[0_8px_40px_rgba(12,10,9,0.08)] lg:grid-cols-2">
      {/* Brand panel */}
      <div className="relative hidden flex-col justify-between overflow-hidden bg-canvas-soft p-10 lg:flex">
        <div
          aria-hidden
          className="pointer-events-none absolute -top-24 right-[-80px] h-64 w-64 rounded-full bg-gradient-lavender/40 blur-[80px]"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute bottom-[-80px] left-[-60px] h-56 w-56 rounded-full bg-gradient-mint/40 blur-[80px]"
        />

        <Link href="/" className="relative flex items-center">
          <Logo className="h-7 w-auto" />
        </Link>

        <div className="relative">
          <h2 className="font-heading text-3xl font-normal leading-snug text-ink">
            From idea to publish-ready video.
          </h2>
          <ul className="mt-6 space-y-3">
            {perks.map((perk) => (
              <li key={perk} className="flex items-start gap-2.5 text-sm text-body">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-ink" />
                {perk}
              </li>
            ))}
          </ul>
        </div>

        <p className="relative text-xs text-body">Join 1.2M+ creators shipping content on Videaflow.</p>
      </div>

      {/* Form panel */}
      <div className="p-8 sm:p-10">
        <Link href="/" className="mb-8 flex items-center lg:hidden">
          <Logo className="h-7 w-auto" />
        </Link>

        {showIntro ? (
          <>
            <h1 className="text-2xl font-semibold text-ink">{title}</h1>
            <p className="mt-2 text-sm text-body">{subtitle}</p>
          </>
        ) : null}

        <div className={showIntro ? "mt-8" : "mt-2"}>{children}</div>

        {showFooter ? (
          <p className="mt-8 text-center text-sm text-body">
            {footer.text}{" "}
            <Link href={footer.href} className="font-medium text-ink hover:opacity-80">
              {footer.label}
            </Link>
          </p>
        ) : null}
      </div>
    </div>
  );
}
