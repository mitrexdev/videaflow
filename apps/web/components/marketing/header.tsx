"use client";

import { useState } from "react";
import Link from "next/link";
import { LayoutDashboard, Menu, Play, X } from "lucide-react";
import { Show, UserButton } from "@clerk/nextjs";
import { clerkConfigured } from "../../lib/auth";
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
    ? "text-slate-200"
    : "rounded-xl px-4 py-2 text-sm font-medium text-slate-200 transition hover:text-white";

  const primaryClass = mobile
    ? "rounded-xl bg-indigo-500 px-4 py-2.5 text-center font-semibold text-white"
    : "rounded-xl bg-indigo-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-indigo-400";

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
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/5 bg-[#0b0f19]/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <Link href="/" className="flex items-center gap-2.5">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500 to-fuchsia-500">
            <Play className="h-4 w-4 fill-white text-white" />
          </span>
          <span className="text-lg font-bold tracking-tight text-white">Videaflow</span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-slate-300 transition hover:text-white"
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
          {open ? <X className="h-6 w-6 text-white" /> : <Menu className="h-6 w-6 text-white" />}
        </button>
      </div>

      {open ? (
        <div className="border-t border-white/5 px-6 py-4 md:hidden">
          <nav className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="text-slate-200"
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
