import Link from "next/link";
import { Check, Play } from "lucide-react";
import type { ReactNode } from "react";

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
    <div className="grid w-full max-w-4xl overflow-hidden rounded-3xl border border-white/10 bg-slate-900/70 shadow-2xl shadow-black/50 backdrop-blur lg:grid-cols-2">
      {/* Brand panel */}
      <div className="hidden flex-col justify-between bg-gradient-to-br from-indigo-600/25 via-slate-900 to-fuchsia-600/20 p-10 lg:flex">
        <Link href="/" className="flex items-center gap-2.5">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500 to-fuchsia-500">
            <Play className="h-4 w-4 fill-white text-white" />
          </span>
          <span className="text-lg font-bold tracking-tight text-white">Videaflow</span>
        </Link>

        <div>
          <h2 className="text-2xl font-bold leading-snug text-white">
            From idea to publish-ready video.
          </h2>
          <ul className="mt-6 space-y-3">
            {perks.map((perk) => (
              <li key={perk} className="flex items-start gap-2.5 text-sm text-slate-300">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-indigo-400" />
                {perk}
              </li>
            ))}
          </ul>
        </div>

        <p className="text-xs text-slate-500">Join 1.2M+ creators shipping content on Videaflow.</p>
      </div>

      {/* Form panel */}
      <div className="p-8 sm:p-10">
        <Link href="/" className="mb-8 flex items-center gap-2.5 lg:hidden">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500 to-fuchsia-500">
            <Play className="h-4 w-4 fill-white text-white" />
          </span>
          <span className="text-lg font-bold tracking-tight text-white">Videaflow</span>
        </Link>

        {showIntro ? (
          <>
            <h1 className="text-2xl font-bold text-white">{title}</h1>
            <p className="mt-2 text-sm text-slate-400">{subtitle}</p>
          </>
        ) : null}

        <div className={showIntro ? "mt-8" : "mt-2"}>{children}</div>

        {showFooter ? (
          <p className="mt-8 text-center text-sm text-slate-500">
            {footer.text}{" "}
            <Link href={footer.href} className="font-medium text-indigo-400 hover:text-indigo-300">
              {footer.label}
            </Link>
          </p>
        ) : null}
      </div>
    </div>
  );
}
