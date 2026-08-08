"use client";

import type {
  ButtonHTMLAttributes,
  InputHTMLAttributes,
  ReactNode,
} from "react";
import { Loader2 } from "lucide-react";

/**
 * Shared form primitives for the custom Clerk sign-in / sign-up cards.
 * Styled to match the Videaflow light editorial brand (ink CTAs, hairline inputs).
 */

type ClerkFieldError = { message?: string; longMessage?: string | undefined };

/** A labelled field: optional label-row action, control, inline error. */
export function FormField({
  label,
  htmlFor,
  error,
  action,
  children,
}: {
  label: string;
  htmlFor: string;
  error?: string | null;
  action?: ReactNode;
  children: ReactNode;
}) {
  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between gap-2">
        <label
          htmlFor={htmlFor}
          className="block text-sm font-medium text-ink"
        >
          {label}
        </label>
        {action}
      </div>
      {children}
      {error ? <p className="text-xs font-medium text-destructive">{error}</p> : null}
    </div>
  );
}

/** Branded text / password input. */
export function TextInput({
  invalid,
  className = "",
  ...props
}: InputHTMLAttributes<HTMLInputElement> & { invalid?: boolean }) {
  return (
    <input
      {...props}
      className={`w-full rounded-xl border bg-card px-3.5 py-2.5 text-sm text-ink placeholder:text-muted-foreground outline-none transition focus:border-ink focus:ring-2 focus:ring-ink/20 ${
        invalid ? "border-destructive/60" : "border-hairline-strong"
      } ${className}`}
    />
  );
}

/** Full-width ink submit button with a busy spinner state. */
export function SubmitButton({
  loading,
  loadingText = "Please wait…",
  className = "",
  children,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & {
  loading?: boolean;
  loadingText?: string;
}) {
  return (
    <button
      {...props}
      disabled={loading || props.disabled}
      className={`flex w-full items-center justify-center gap-2 rounded-full bg-primary px-4 py-3 text-sm font-medium text-primary-foreground transition hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 disabled:cursor-not-allowed disabled:opacity-60 ${className}`}
    >
      {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
      {loading ? loadingText : children}
    </button>
  );
}

/** Banner for global (non-field) errors. */
export function FormAlert({ children }: { children: ReactNode }) {
  return (
    <div
      role="alert"
      className="rounded-xl border border-destructive/30 bg-destructive/10 px-3.5 py-3 text-sm text-destructive"
    >
      {children}
    </div>
  );
}

/* ---------- Clerk error helper ---------- */

/**
 * Prefer Clerk's friendly long message over the short code message.
 * Accepts either a field error (errors.fields.x) or a global error
 * (errors.global[0]) — both expose `message` / `longMessage`.
 */
export function errorText(
  err?: ClerkFieldError | null,
): string | null {
  return err?.longMessage || err?.message || null;
}
