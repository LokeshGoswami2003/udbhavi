import { AuthForm } from "@/features/auth/components/auth-form";
import { AuthPageShell } from "@/features/auth/components/auth-page-shell";

export default function SignupPage() {
  return (
    <AuthPageShell
      badge="This first step stays intentionally light. Udbhavi collects the rest of your resume context progressively, not all at once."
      description="Create your account and move into a guided setup flow built for software candidates who want reusable, job-targeted resumes."
      eyebrow="Get started"
      title="Start building better resumes with a calmer first-run experience"
    >
      <AuthForm mode="signup" />
    </AuthPageShell>
  );
}
