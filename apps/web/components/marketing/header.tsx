"use client";

import { useState } from "react";
import Link from "next/link";
import { LayoutDashboard, Menu, X } from "lucide-react";
import { Show, UserButton } from "@clerk/nextjs";
import { clerkConfigured } from "../../lib/auth";
import { Logo } from "@/components/logo";
import { navLinks } from "../../lib/marketing";

/**
 * Auth-aware actions in the nav:
 *  - signed out (or dev mode) → "Sign in" + "Start creating"
 *  - signed in                → "Dashboard" + Clerk account menu
 */
function HeaderAuth({
  mobile = false,
  onNavigate,
}: {
  mobile?: boolean;
  onNavigate?: () => void;
}) {
  const linkClass = mobile
    ? "text-body"
    : "rounded-full px-4 py-2 text-sm font-medium text-body transition hover:text-ink";

  const primaryClass = mobile
    ? "rounded-full bg-primary px-4 py-2.5 text-center font-semibold text-primary-foreground"
    : "rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90";

  const dashboardClass = `${primaryClass} inline-flex items-center justify-center gap-2`;

  if (!clerkConfigured) {
    return (
      <>
        <Link href="/login" {...(onNavigate ? { onClick: onNavigate } : {})} className={linkClass}>
          Sign in
        </Link>
        <Link href="/signup" {...(onNavigate ? { onClick: onNavigate } : {})} className={primaryClass}>
          Start creating
        </Link>
      </>
    );
  }

  return (
    <>
      <Show when="signed-out" fallback={null}>
        <Link href="/login" {...(onNavigate ? { onClick: onNavigate } : {})} className={linkClass}>
          Sign in
        </Link>
        <Link href="/signup" {...(onNavigate ? { onClick: onNavigate } : {})} className={primaryClass}>
          Start creating
        </Link>
      </Show>
      <Show when="signed-in" fallback={null}>
        <Link href="/dashboard" {...(onNavigate ? { onClick: onNavigate } : {})} className={dashboardClass}>
          <LayoutDashboard className="h-4 w-4" />
          Dashboard
        </Link>
        <UserButton />
      </Show>
    </>
  );
}

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-6 z-50 px-6 transition-all">
      <div className="mx-auto flex h-16 max-w-5xl items-center justify-between rounded-full border border-hairline bg-card/40 px-6 backdrop-blur-xl shadow-[0_8px_30px_rgba(0,0,0,0.4)]">
        <Link href="/" className="flex items-center">
          <Logo className="h-7 w-auto" />
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-body transition hover:text-ink"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <HeaderAuth />
        </div>

        <button
          type="button"
          className="md:hidden"
          aria-label="Toggle menu"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-6 w-6 text-ink" /> : <Menu className="h-6 w-6 text-ink" />}
        </button>
      </div>

      {open ? (
        <div className="border-t border-hairline px-6 py-4 md:hidden">
          <nav className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="text-body"
              >
                {link.label}
              </Link>
            ))}
            <HeaderAuth mobile onNavigate={() => setOpen(false)} />
          </nav>
        </div>
      ) : null}
    </header>
  );
}
