"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  type ReactNode,
  startTransition,
  useEffect,
  useState,
} from "react";
import { ArrowRight, FileUp, LayoutTemplate, LogOut, UserRoundSearch } from "lucide-react";
import { toast } from "sonner";

import { ThemeToggle } from "@/components/theme-toggle";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getCurrentSession, logout, refresh, toStoredAuthSession } from "@/features/auth/api";
import { authBenefits } from "@/features/auth/content";
import {
  clearStoredAuthSession,
  loadStoredAuthSession,
  persistAuthSession,
} from "@/features/auth/storage";
import type { StoredAuthSession } from "@/features/auth/types";

type ViewState =
  | { kind: "loading" }
  | { kind: "ready"; session: StoredAuthSession; onboardingStatus: string }
  | { kind: "error"; message: string };

const workspaceCards: Array<{
  description: string;
  href: string;
  icon: ReactNode;
  title: string;
}> = [
  {
    title: "Upload a resume",
    description: "Bring in your current PDF or DOCX and turn it into editable resume data.",
    href: "/workspace",
    icon: <FileUp className="size-5 text-primary" />,
  },
  {
    title: "Start from a template",
    description: "Use a software-focused starting point for internship, backend, or ATS-ready roles.",
    href: "/workspace",
    icon: <LayoutTemplate className="size-5 text-primary" />,
  },
  {
    title: "Finish your quick profile",
    description: "Set target role, experience level, market, and skills for better suggestions.",
    href: "/workspace",
    icon: <UserRoundSearch className="size-5 text-primary" />,
  },
];

export function WorkspaceHome() {
  const router = useRouter();
  const [viewState, setViewState] = useState<ViewState>({ kind: "loading" });

  useEffect(() => {
    let isMounted = true;

    async function loadSession() {
      const storedSession = loadStoredAuthSession();
      if (!storedSession) {
        startTransition(() => {
          router.replace("/login");
        });
        return;
      }

      try {
        const authSession = await getCurrentSession(storedSession.accessToken);
        if (!isMounted) {
          return;
        }

        setViewState({
          kind: "ready",
          session: {
            ...storedSession,
            user: authSession.user,
          },
          onboardingStatus: authSession.profile_onboarding_status,
        });
      } catch {
        try {
          const refreshedTokens = await refresh(storedSession.refreshToken);
          const nextSession = toStoredAuthSession(refreshedTokens);
          persistAuthSession(nextSession);
          const authSession = await getCurrentSession(nextSession.accessToken);
          if (!isMounted) {
            return;
          }

          setViewState({
            kind: "ready",
            session: {
              ...nextSession,
              user: authSession.user,
            },
            onboardingStatus: authSession.profile_onboarding_status,
          });
        } catch (error) {
          clearStoredAuthSession();
          if (!isMounted) {
            return;
          }

          setViewState({
            kind: "error",
            message:
              error instanceof Error
                ? error.message
                : "Your session expired. Please sign in again.",
          });
          startTransition(() => {
            router.replace("/login");
          });
        }
      }
    }

    void loadSession();

    return () => {
      isMounted = false;
    };
  }, [router]);

  const handleLogout = async () => {
    const storedSession = loadStoredAuthSession();
    if (storedSession) {
      await logout(storedSession.refreshToken).catch(() => undefined);
    }

    clearStoredAuthSession();
    toast.success("Signed out.");
    startTransition(() => {
      router.replace("/");
    });
  };

  if (viewState.kind === "loading") {
    return (
      <main className="mx-auto flex min-h-screen w-full max-w-7xl items-center justify-center px-6 py-12">
        <Card className="w-full max-w-xl">
          <CardContent className="py-12 text-center">
            <p className="text-lg font-semibold">Opening your workspace...</p>
            <p className="mt-3 text-sm text-muted-foreground">
              We are checking your session and getting your next steps ready.
            </p>
          </CardContent>
        </Card>
      </main>
    );
  }

  if (viewState.kind === "error") {
    return null;
  }

  return (
    <main className="min-h-screen bg-background">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-10 px-6 py-6 sm:py-8">
        <header className="flex items-center justify-between gap-4">
          <div>
            <p className="text-sm font-semibold tracking-[0.22em] text-muted-foreground">
              UDBHAVI WORKSPACE
            </p>
            <h1 className="mt-2 text-3xl font-semibold">
              Welcome back, {viewState.session.user.email}
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <ThemeToggle />
            <Button onClick={handleLogout} variant="outline">
              <LogOut className="size-4" />
              Sign out
            </Button>
          </div>
        </header>

        <section className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
          <Card>
            <CardHeader className="space-y-4">
              <Badge variant="accent">Next step</Badge>
              <CardTitle className="text-3xl leading-tight text-balance">
                Your account is ready. Let&apos;s turn your experience into an interview-ready resume.
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-5">
              <p className="text-base leading-8 text-muted-foreground">
                We keep the first session focused: get your profile context in, choose how
                you want to start, and move into a workspace that can support multiple resume
                versions over time.
              </p>
              <div className="rounded-[1.5rem] border border-border/70 bg-background/70 p-5">
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                  Onboarding status
                </p>
                <p className="mt-3 text-xl font-semibold capitalize">
                  {viewState.onboardingStatus.replaceAll("_", " ")}
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <Button asChild size="lg">
                  <Link href="/workspace">
                    Continue setup
                    <ArrowRight className="size-4" />
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline">
                  <Link href="/">Back to home</Link>
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Why the flow works this way</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {authBenefits.map((benefit) => (
                <div
                  className="rounded-[1.35rem] border border-border/70 bg-background/70 p-4 text-sm leading-7 text-muted-foreground"
                  key={benefit}
                >
                  {benefit}
                </div>
              ))}
            </CardContent>
          </Card>
        </section>

        <section className="grid gap-5 md:grid-cols-3">
          {workspaceCards.map((card) => (
            <Card key={card.title}>
              <CardHeader className="space-y-4">
                <div className="flex size-11 items-center justify-center rounded-2xl bg-primary/12">
                  {card.icon}
                </div>
                <CardTitle>{card.title}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm leading-7 text-muted-foreground">{card.description}</p>
                <Button asChild variant="ghost">
                  <Link href={card.href}>
                    Coming next
                    <ArrowRight className="size-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </section>
      </div>
    </main>
  );
}
