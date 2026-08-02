import { clerkConfigured } from "../../../../lib/auth";
import { AuthShell } from "../../../../components/auth/auth-shell";
import { SignupForm } from "../../../../components/auth/signup-form";
import { DevAuthCard } from "../../../../components/auth/dev-auth-card";

export default function SignupPage() {
  if (!clerkConfigured) {
    return <DevAuthCard mode="signup" />;
  }
  return (
    <AuthShell
      title="Create your account"
      subtitle="Start turning ideas into publish-ready videos in minutes."
      footer={{ text: "Already have an account?", href: "/login", label: "Sign in" }}
      showIntro={false}
      showFooter={false}
    >
      <SignupForm />
    </AuthShell>
  );
}
