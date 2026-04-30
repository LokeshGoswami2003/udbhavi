"use client";

import Link from "next/link";
import { ArrowRight, LogOut } from "lucide-react";

import { ThemeToggle } from "@/components/theme-toggle";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { WorkspaceMilestoneList } from "@/features/auth/components/workspace-milestone-list";
import { useWorkspaceSession } from "@/features/auth/hooks/use-workspace-session";

export function WorkspaceHome() {
  const { handleLogout, viewState } = useWorkspaceSession();

  if (viewState.kind === "loading") {
    return (
      <main className="mx-auto flex min-h-screen w-full max-w-7xl items-center justify-center px-6 py-10">
        <Card className="w-full max-w-xl rounded-[1.8rem]">
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
    return (
      <main className="mx-auto flex min-h-screen w-full max-w-7xl items-center justify-center px-6 py-10">
        <Card className="w-full max-w-xl rounded-[1.8rem]">
          <CardContent className="py-12 text-center">
            <p className="text-lg font-semibold">Redirecting to sign in...</p>
            <p className="mt-3 text-sm text-muted-foreground">{viewState.message}</p>
          </CardContent>
        </Card>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-6 py-6 sm:py-8">
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

        <section className="grid gap-6 lg:min-h-[calc(100vh-11rem)] lg:grid-cols-[1.08fr_0.92fr] lg:items-start">
          <Card className="rounded-[2rem] border-border/70 bg-card/85">
            <CardHeader className="space-y-4">
              <Badge variant="accent">Workspace ready</Badge>
              <CardTitle className="text-3xl leading-tight text-balance sm:text-4xl">
                You&apos;re signed in. Next we capture the profile context that makes every resume decision smarter.
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-5">
              <p className="text-base leading-8 text-muted-foreground">
                The goal of this first pass is simple: collect the minimum career context,
                then move you toward either upload or template-based resume creation without
                a long filler dashboard in between.
              </p>
              <div className="grid gap-4 rounded-[1.5rem] border border-border/70 bg-background/70 p-5 sm:grid-cols-2">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                    Account
                  </p>
                  <p className="mt-3 text-base font-semibold break-all">
                    {viewState.session.user.email}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                    Onboarding status
                  </p>
                  <p className="mt-3 text-base font-semibold capitalize">
                    {viewState.onboardingStatus.replaceAll("_", " ")}
                  </p>
                </div>
              </div>
              <p className="text-sm leading-7 text-muted-foreground">
                No long form upfront. We only ask for the details that improve the next meaningful action.
              </p>
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

          <Card className="rounded-[2rem] border-border/70 bg-card/85">
            <CardHeader>
              <CardTitle>What the first guided session should accomplish</CardTitle>
            </CardHeader>
            <CardContent className="space-y-5">
              <WorkspaceMilestoneList />
              <p className="text-sm leading-7 text-muted-foreground">
                This keeps the flow aligned with the product contract: structured resume data first, then AI help, targeting, and export on top of that foundation.
              </p>
            </CardContent>
          </Card>
        </section>
      </div>
    </main>
  );
}
