"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  type ChangeEvent,
  type FormEvent,
  startTransition,
  useEffect,
  useState,
} from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { login, signup, toStoredAuthSession } from "@/features/auth/api";
import {
  loadStoredAuthSession,
  persistAuthSession,
} from "@/features/auth/storage";

type AuthFormMode = "login" | "signup";

type AuthFormState = {
  email: string;
  password: string;
};

const FORM_COPY = {
  login: {
    alternateCta: "Create an account",
    alternateHref: "/signup",
    alternateLabel: "New to Udbhavi?",
    description:
      "Pick up where you left off and continue building resume versions tailored to the roles you want.",
    submitLabel: "Sign in",
    title: "Welcome back",
  },
  signup: {
    alternateCta: "Sign in instead",
    alternateHref: "/login",
    alternateLabel: "Already have an account?",
    description:
      "Create your account first. We will ask for the rest of your career context progressively inside the product.",
    submitLabel: "Create account",
    title: "Start your workspace",
  },
} satisfies Record<AuthFormMode, Record<string, string>>;

export function AuthForm({ mode }: { mode: AuthFormMode }) {
  const router = useRouter();
  const [formState, setFormState] = useState<AuthFormState>({
    email: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const copy = FORM_COPY[mode];

  useEffect(() => {
    if (!loadStoredAuthSession()) {
      return;
    }

    startTransition(() => {
      router.replace("/workspace");
    });
  }, [router]);

  const handleChange =
    (field: keyof AuthFormState) => (event: ChangeEvent<HTMLInputElement>) => {
      setErrorMessage("");
      setFormState((currentState) => ({
        ...currentState,
        [field]: event.target.value,
      }));
    };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setErrorMessage("");

    try {
      const response =
        mode === "login" ? await login(formState) : await signup(formState);

      persistAuthSession(toStoredAuthSession(response));
      toast.success(
        mode === "login"
          ? "Signed in successfully."
          : "Account created. Let’s build your first resume version.",
      );
      startTransition(() => {
        router.replace("/workspace");
      });
    } catch (error) {
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="w-full max-w-lg">
      <CardHeader>
        <CardTitle>{copy.title}</CardTitle>
        <CardDescription>{copy.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <form className="space-y-5" onSubmit={handleSubmit}>
          <div className="space-y-2">
            <Label htmlFor={`${mode}-email`}>Email</Label>
            <Input
              autoComplete="email"
              id={`${mode}-email`}
              onChange={handleChange("email")}
              placeholder="you@example.com"
              required
              type="email"
              value={formState.email}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor={`${mode}-password`}>Password</Label>
            <Input
              autoComplete={mode === "login" ? "current-password" : "new-password"}
              id={`${mode}-password`}
              minLength={8}
              onChange={handleChange("password")}
              placeholder="At least 8 characters"
              required
              type="password"
              value={formState.password}
            />
            <p className="text-xs leading-6 text-muted-foreground">
              Use at least 8 characters.
            </p>
          </div>

          {errorMessage ? (
            <p className="rounded-2xl border border-red-500/30 bg-red-500/8 px-4 py-3 text-sm text-red-600 dark:text-red-300">
              {errorMessage}
            </p>
          ) : null}

          <Button className="w-full" disabled={isSubmitting} size="lg" type="submit">
            {isSubmitting ? "Please wait..." : copy.submitLabel}
          </Button>
        </form>

        <p className="mt-5 text-sm text-muted-foreground">
          {copy.alternateLabel}{" "}
          <Link className="font-semibold text-foreground hover:text-primary" href={copy.alternateHref}>
            {copy.alternateCta}
          </Link>
        </p>
      </CardContent>
    </Card>
  );
}
