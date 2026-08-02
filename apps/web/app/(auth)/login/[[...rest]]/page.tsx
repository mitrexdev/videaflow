import { clerkConfigured } from "../../../../lib/auth";
import { AuthShell } from "../../../../components/auth/auth-shell";
import { LoginForm } from "../../../../components/auth/login-form";
import { DevAuthCard } from "../../../../components/auth/dev-auth-card";

export default function LoginPage() {
  if (!clerkConfigured) {
    return <DevAuthCard mode="login" />;
  }
  return (
    <AuthShell
      title="Welcome back"
      subtitle="Sign in to Videaflow and pick up where you left off."
      footer={{ text: "Don't have an account?", href: "/signup", label: "Create one free" }}
      showIntro={false}
      showFooter={false}
    >
      <LoginForm />
    </AuthShell>
  );
}
