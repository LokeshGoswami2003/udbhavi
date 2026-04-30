import { AuthForm } from "@/features/auth/components/auth-form";
import { AuthPageShell } from "@/features/auth/components/auth-page-shell";

export default function LoginPage() {
  return (
    <AuthPageShell
      badge="Email and password are enough to get in. The rest of your resume context is collected inside the guided setup, not dumped on you here."
      description="Sign in to continue your structured resume workspace and move straight into the next meaningful setup step."
      eyebrow="Sign in"
      title="Return to your resume workspace"
    >
      <AuthForm mode="login" />
    </AuthPageShell>
  );
}
