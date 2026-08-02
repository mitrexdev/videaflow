import { dark } from "@clerk/themes";
import type { Appearance } from "@clerk/types";

/**
 * Theme so Clerk's prebuilt components blend into Videaflow's dark, premium
 * look. The card itself is transparent so it sits inside AuthShell's panel.
 *
 * Note: @clerk/themes and @clerk/types ship slightly different `BaseTheme`
 * tags (optional-prop typing only), so the config is cast — the runtime
 * object is compatible.
 */
export const clerkAppearance = {
  baseTheme: dark,
  variables: {
    colorPrimary: "#6366f1",
    colorBackground: "#0b0f19",
    colorText: "#f8fafc",
    colorTextSecondary: "#94a3b8",
    colorInputBackground: "#111827",
    colorInputText: "#f8fafc",
    borderRadius: "0.75rem",
  },
  elements: {
    rootBox: { width: "100%" },
    card: { background: "transparent", boxShadow: "none", border: "none" },
    formButtonPrimary: {
      background: "linear-gradient(to right, #6366f1, #d946ef)",
      textTransform: "none",
      fontWeight: 600,
    },
    socialButtonsBlockButton: {
      background: "#111827",
      border: "1px solid #334155",
      color: "#f8fafc",
      textTransform: "none",
      fontWeight: 500,
    },
    headerTitle: { color: "#f8fafc", fontSize: "1.5rem" },
    headerSubtitle: { color: "#94a3b8" },
    dividerLine: { background: "#1e293b" },
    dividerText: { color: "#64748b" },
    footerAction: { color: "#94a3b8" },
    footerActionLink: { color: "#818cf8" },
    footerActionLinkText: { color: "#818cf8" },
    input: { color: "#f8fafc" },
    label: { color: "#cbd5e1" },
    formFieldLabel: { color: "#cbd5e1" },
  },
} as unknown as Appearance;
