"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSignUp } from "@clerk/nextjs";
import {
  errorText,
  FormAlert,
  FormField,
  SubmitButton,
  TextInput,
} from "./form-field";

type View = { name: "form" } | { name: "verify-email" };

/**
 * Fully custom sign-up card built on useSignUp() — no Clerk prebuilt UI.
 * Collects name (optional), email + password, then verifies the email
 * address with a code when the Clerk instance requires it.
 */
export function SignupForm() {
  const { signUp, errors, fetchStatus } = useSignUp();
  const router = useRouter();

  const [view, setView] = useState<View>({ name: "form" });
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [code, setCode] = useState("");

  const busy = fetchStatus === "fetching";

  async function finalize() {
    await signUp.finalize({
      navigate: () => {
        router.push("/dashboard");
        router.refresh();
      },
    });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setNotice(null);

    const { error: signUpError } = await signUp.password({
      emailAddress: email,
      password,
      // Only send name fields when present — exactOptionalPropertyTypes forbids explicit undefined.
      ...(firstName.trim() ? { firstName: firstName.trim() } : {}),
      ...(lastName.trim() ? { lastName: lastName.trim() } : {}),
    });
    if (signUpError) {
      setError(
        errorText(signUpError) ?? "We couldn't create your account. Please try again.",
      );
      return;
    }

    if (signUp.status === "complete") {
      await finalize();
      return;
    }

    if (signUp.status === "missing_requirements") {
      // Email needs verification — send a code and show the verify step.
      if (
        signUp.unverifiedFields.includes("email_address") &&
        signUp.missingFields.length === 0
      ) {
        const { error: sendError } = await signUp.verifications.sendEmailCode();
        if (sendError) {
          setError(errorText(sendError) ?? "We couldn't send a verification code.");
          return;
        }
        setView({ name: "verify-email" });
        setNotice(`We sent a 6-digit code to ${email}.`);
        return;
      }
      // The identifier already belongs to an account — nudge to sign in.
      if (signUp.isTransferable) {
        setNotice("An account with this email already exists. Sign in instead.");
        return;
      }
      setError(
        errorText(errors.global?.[0]) ??
          "We still need a few more details to create your account.",
      );
    }
  }

  async function handleVerify(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setNotice(null);

    const { error: verifyError } = await signUp.verifications.verifyEmailCode({
      code,
    });
    if (verifyError) {
      setError(errorText(verifyError) ?? "That code didn't work. Try again.");
      return;
    }

    if (signUp.status === "complete") {
      await finalize();
    }
  }

  async function resendCode() {
    setError(null);
    const { error } = await signUp.verifications.sendEmailCode();
    if (error) setError(errorText(error) ?? "We couldn't resend the code.");
  }

  if (view.name === "verify-email") {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-xl font-semibold text-ink">Verify your email</h1>
          <p className="mt-1.5 text-sm text-body">
            Enter the 6-digit code we sent to {email}.
          </p>
        </div>

        <form className="space-y-4" onSubmit={handleVerify}>
          {error ? <FormAlert>{error}</FormAlert> : null}
          {notice ? (
            <p className="rounded-xl border border-semantic-success/30 bg-semantic-success/10 px-3.5 py-3 text-sm text-semantic-success">
              {notice}
            </p>
          ) : null}
          <FormField
            label="Verification code"
            htmlFor="signup-code"
            error={errorText(errors.fields?.code)}
          >
            <TextInput
              id="signup-code"
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
            Verify email
          </SubmitButton>
        </form>

        <div className="flex flex-wrap items-center justify-between gap-2 text-sm">
          <button
            type="button"
            onClick={resendCode}
            className="font-medium text-ink hover:opacity-80"
          >
            Resend code
          </button>
          <button
            type="button"
            onClick={() => {
              setView({ name: "form" });
              setCode("");
              setError(null);
            }}
            className="text-body hover:text-ink"
          >
            Back to sign up
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-semibold text-ink">Create your account</h1>
        <p className="mt-1.5 text-sm text-body">
          Start turning ideas into publish-ready videos in minutes.
        </p>
      </div>

      <form className="space-y-4" onSubmit={handleSubmit}>
        {error ? <FormAlert>{error}</FormAlert> : null}
        {notice ? (
          <p className="rounded-xl border border-semantic-success/30 bg-semantic-success/10 px-3.5 py-3 text-sm text-semantic-success">
            {notice}
          </p>
        ) : null}

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <FormField
            label="First name"
            htmlFor="signup-first-name"
            error={errorText(errors.fields?.firstName)}
          >
            <TextInput
              id="signup-first-name"
              name="firstName"
              type="text"
              autoComplete="given-name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="Ada"
            />
          </FormField>
          <FormField
            label="Last name"
            htmlFor="signup-last-name"
            error={errorText(errors.fields?.lastName)}
          >
            <TextInput
              id="signup-last-name"
              name="lastName"
              type="text"
              autoComplete="family-name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder="Lovelace"
            />
          </FormField>
        </div>

        <FormField
          label="Email address"
          htmlFor="signup-email"
          error={errorText(errors.fields?.emailAddress)}
        >
          <TextInput
            id="signup-email"
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
          htmlFor="signup-password"
          error={errorText(errors.fields?.password)}
        >
          <TextInput
            id="signup-password"
            name="password"
            type="password"
            autoComplete="new-password"
            minLength={8}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="At least 8 characters"
            required
          />
        </FormField>

        <SubmitButton loading={busy} loadingText="Creating account…">
          Create account
        </SubmitButton>
      </form>

      <p className="text-center text-sm text-body">
        Already have an account?{" "}
        <Link
          href="/login"
          className="font-medium text-ink hover:opacity-80"
        >
          Sign in
        </Link>
      </p>

      {/* Clerk renders its bot-protection widget here when needed. */}
      <div id="clerk-captcha" />
    </div>
  );
}
