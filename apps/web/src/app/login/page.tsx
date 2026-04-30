import { AuthForm } from "@/features/auth/components/auth-form";
import { AuthPageShell } from "@/features/auth/components/auth-page-shell";

export default function LoginPage() {
  return (
    <AuthPageShell
      badge="You only need email and password to enter. We will collect role, market, and skill context inside the workspace."
      description="Sign in to continue building resume versions, refining content with AI help, and tailoring for the roles you are applying to."
      eyebrow="Sign in"
      title="Return to your resume workspace"
    >
      <AuthForm mode="login" />
    </AuthPageShell>
  );
}
