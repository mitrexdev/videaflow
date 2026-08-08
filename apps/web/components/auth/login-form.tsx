"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSignIn } from "@clerk/nextjs";
import {
  errorText,
  FormAlert,
  FormField,
  SubmitButton,
  TextInput,
} from "./form-field";

type View =
  | { name: "credentials" }
  | { name: "verify" } // second factor (MFA)
  | { name: "reset"; step: "send" | "verify" | "new-password" };

type FactorMethod = "totp" | "phone_code" | "backup_code";

/**
 * Fully custom sign-in card built on useSignIn() — no Clerk prebuilt UI.
 * Covers email + password, second-factor verification, and a
 * forgot-password reset flow.
 */
export function LoginForm() {
  const { signIn, errors, fetchStatus } = useSignIn();
  const router = useRouter();

  const [view, setView] = useState<View>({ name: "credentials" });
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);

  // Credentials
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Second factor
  const [factorMethod, setFactorMethod] = useState<FactorMethod>("totp");
  const [code, setCode] = useState("");

  // Forgot password
  const [resetEmail, setResetEmail] = useState("");
  const [resetCode, setResetCode] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const busy = fetchStatus === "fetching";

  async function finalize() {
    await signIn.finalize({
      navigate: () => {
        router.push("/dashboard");
        router.refresh();
      },
    });
  }

  async function handleSignIn(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setNotice(null);

    const { error: signInError } = await signIn.password({
      identifier: email,
      password,
    });
    if (signInError) {
      setError(errorText(signInError) ?? "Couldn't sign you in. Please try again.");
      return;
    }

    if (signIn.status === "complete") {
      await finalize();
      return;
    }

    if (signIn.status === "needs_second_factor") {
      const factors = signIn.supportedSecondFactors ?? [];
      const method: FactorMethod = factors.some((f) => f.strategy === "totp")
        ? "totp"
        : factors.some((f) => f.strategy === "phone_code")
          ? "phone_code"
          : "totp";
      setFactorMethod(method);
      setCode("");
      // SMS codes are delivered on demand — trigger the send.
      if (method === "phone_code") await signIn.mfa.sendPhoneCode();
      setView({ name: "verify" });
      return;
    }

    setError(
      errorText(errors.global?.[0]) ??
        "Something else is required to sign you in. Try again.",
    );
  }

  async function handleVerify(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setNotice(null);

    const result =
      factorMethod === "backup_code"
        ? await signIn.mfa.verifyBackupCode({ code })
        : factorMethod === "phone_code"
          ? await signIn.mfa.verifyPhoneCode({ code })
          : await signIn.mfa.verifyTOTP({ code });

    if (result.error) {
      setError(errorText(result.error) ?? "That code didn't work. Try again.");
      return;
    }

    if (signIn.status === "complete") {
      await finalize();
    }
  }

  // --- Forgot-password flow -------------------------------------------------

  async function startReset(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setNotice(null);

    const { error: createError } = await signIn.create({ identifier: resetEmail });
    if (createError) {
      setError(errorText(createError) ?? "We couldn't find that account.");
      return;
    }
    const { error: sendError } = await signIn.resetPasswordEmailCode.sendCode();
    if (sendError) {
      setError(errorText(sendError) ?? "We couldn't send a reset code.");
      return;
    }
    setView({ name: "reset", step: "verify" });
    setNotice(`We sent a 6-digit reset code to ${resetEmail}.`);
  }

  async function verifyResetCode(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setNotice(null);

    const { error } = await signIn.resetPasswordEmailCode.verifyCode({
      code: resetCode,
    });
    if (error) {
      setError(errorText(error) ?? "That code didn't work. Try again.");
      return;
    }
    setView({ name: "reset", step: "new-password" });
  }

  async function submitNewPassword(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setNotice(null);

    const { error } = await signIn.resetPasswordEmailCode.submitPassword({
      password: newPassword,
    });
    if (error) {
      setError(errorText(error) ?? "We couldn't update your password.");
      return;
    }
    if (signIn.status === "complete") {
      setNotice("Password updated — signing you in…");
      await finalize();
    }
  }

  // --- Views ----------------------------------------------------------------

  if (view.name === "verify") {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-xl font-semibold text-ink">Verify it&apos;s you</h1>
          <p className="mt-1.5 text-sm text-body">
            {factorMethod === "backup_code"
              ? "Enter one of your backup codes."
              : factorMethod === "phone_code"
                ? "Enter the code we sent to your phone."
                : "Enter the 6-digit code from your authenticator app."}
          </p>
        </div>

        <form className="space-y-4" onSubmit={handleVerify}>
          {error ? <FormAlert>{error}</FormAlert> : null}
          <FormField
            label="Verification code"
            htmlFor="login-code"
            error={errorText(errors.fields?.code)}
          >
            <TextInput
              id="login-code"
              name="code"
              type="text"
              inputMode="numeric"
              autoComplete="one-time-code"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="••••••"
              required
            />
          </FormField>
          <SubmitButton loading={busy} loadingText="Verifying…">
            Verify
          </SubmitButton>
        </form>

        <div className="flex flex-wrap items-center justify-between gap-2 text-sm">
          <button
            type="button"
            onClick={() =>
              setFactorMethod(factorMethod === "backup_code" ? "totp" : "backup_code")
            }
            className="font-medium text-ink hover:opacity-80"
          >
            {factorMethod === "backup_code"
              ? "Use authenticator instead"
              : "Use a backup code"}
          </button>
          <button
            type="button"
            onClick={() => {
              setView({ name: "credentials" });
              setCode("");
              setError(null);
            }}
            className="text-body hover:text-ink"
          >
            Back to sign in
          </button>
        </div>
      </div>
    );
  }

  if (view.name === "reset") {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-xl font-semibold text-ink">Reset your password</h1>
          <p className="mt-1.5 text-sm text-body">
            {view.step === "send"
              ? "Enter your email and we&apos;ll send you a reset code."
              : view.step === "verify"
                ? "Enter the code we emailed you."
                : "Choose a new password for your account."}
          </p>
        </div>

        {view.step === "send" && (
          <form className="space-y-4" onSubmit={startReset}>
            {error ? <FormAlert>{error}</FormAlert> : null}
            <FormField
              label="Email address"
              htmlFor="reset-email"
              error={errorText(errors.fields?.identifier)}
            >
              <TextInput
                id="reset-email"
                name="email"
                type="email"
                autoComplete="email"
                value={resetEmail}
                onChange={(e) => setResetEmail(e.target.value)}
                placeholder="you@example.com"
                required
              />
            </FormField>
            <SubmitButton loading={busy} loadingText="Sending code…">
              Send reset code
            </SubmitButton>
          </form>
        )}

        {view.step === "verify" && (
          <form className="space-y-4" onSubmit={verifyResetCode}>
            {error ? <FormAlert>{error}</FormAlert> : null}
            {notice ? (
              <p className="rounded-xl border border-semantic-success/30 bg-semantic-success/10 px-3.5 py-3 text-sm text-semantic-success">
                {notice}
              </p>
            ) : null}
            <FormField
              label="Reset code"
              htmlFor="reset-code"
              error={errorText(errors.fields?.code)}
            >
              <TextInput
                id="reset-code"
                name="code"
                type="text"
                inputMode="numeric"
                autoComplete="one-time-code"
                value={resetCode}
                onChange={(e) => setResetCode(e.target.value)}
                placeholder="••••••"
                required
              />
            </FormField>
            <SubmitButton loading={busy} loadingText="Verifying…">
              Verify code
            </SubmitButton>
          </form>
        )}

        {view.step === "new-password" && (
          <form className="space-y-4" onSubmit={submitNewPassword}>
            {error ? <FormAlert>{error}</FormAlert> : null}
            {notice ? (
              <p className="rounded-xl border border-semantic-success/30 bg-semantic-success/10 px-3.5 py-3 text-sm text-semantic-success">
                {notice}
              </p>
            ) : null}
            <FormField
              label="New password"
              htmlFor="new-password"
              error={errorText(errors.fields?.password)}
            >
              <TextInput
                id="new-password"
                name="password"
                type="password"
                autoComplete="new-password"
                minLength={8}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="At least 8 characters"
                required
              />
            </FormField>
            <SubmitButton loading={busy} loadingText="Updating…">
              Update password
            </SubmitButton>
          </form>
        )}

        <button
          type="button"
          onClick={() => {
            setView({ name: "credentials" });
            setError(null);
            setNotice(null);
          }}
          className="text-sm text-body hover:text-ink"
        >
          ← Back to sign in
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-semibold text-ink">Welcome back</h1>
        <p className="mt-1.5 text-sm text-body">
          Sign in to Videaflow and pick up where you left off.
        </p>
      </div>

      <form className="space-y-4" onSubmit={handleSignIn}>
        {error ? <FormAlert>{error}</FormAlert> : null}
        {notice ? (
          <p className="rounded-xl border border-semantic-success/30 bg-semantic-success/10 px-3.5 py-3 text-sm text-semantic-success">
            {notice}
          </p>
        ) : null}

        <FormField
          label="Email address"
          htmlFor="login-email"
          error={errorText(errors.fields?.identifier)}
        >
          <TextInput
            id="login-email"
            name="email"
            type="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            required
          />
        </FormField>

        <FormField
          label="Password"
          htmlFor="login-password"
          error={errorText(errors.fields?.password)}
          action={
            <button
              type="button"
              onClick={() => {
                setResetEmail(email);
                setView({ name: "reset", step: "send" });
                setError(null);
                setNotice(null);
              }}
              className="text-xs font-medium text-ink hover:opacity-80"
            >
              Forgot password?
            </button>
          }
        >
          <TextInput
            id="login-password"
            name="password"
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            required
          />
        </FormField>

        <SubmitButton loading={busy} loadingText="Signing in…">
          Sign in
        </SubmitButton>
      </form>

      <p className="text-center text-sm text-body">
        Don&apos;t have an account?{" "}
        <Link
          href="/signup"
          className="font-medium text-ink hover:opacity-80"
        >
          Create one free
        </Link>
      </p>

      {/* Clerk renders its bot-protection widget here when needed. */}
      <div id="clerk-captcha" />
    </div>
  );
}
