import { AuthForm } from "@/features/auth/components/auth-form";
import { AuthPageShell } from "@/features/auth/components/auth-page-shell";

export default function SignupPage() {
  return (
    <AuthPageShell
      badge="This first step stays intentionally light so the product can guide the right questions in the right order."
      description="Create your account and move into a calmer setup flow built for software candidates who want reusable, job-targeted resumes."
      eyebrow="Get started"
      title="Create your account and start with a focused first-run flow"
    >
      <AuthForm mode="signup" />
    </AuthPageShell>
  );
}
