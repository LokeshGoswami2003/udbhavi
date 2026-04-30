import Link from "next/link";
import type { ReactNode } from "react";

import { ThemeToggle } from "@/components/theme-toggle";
import { Badge } from "@/components/ui/badge";
import { AuthBenefitList } from "@/features/auth/components/auth-benefit-list";

type AuthPageShellProps = {
  badge: string;
  children: ReactNode;
  description: string;
  eyebrow: string;
  title: string;
};

export function AuthPageShell({
  badge,
  children,
  description,
  eyebrow,
  title,
}: AuthPageShellProps) {
  return (
    <main className="min-h-screen bg-background">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-6 py-6 sm:py-8">
        <header className="flex items-center justify-between">
          <Link className="flex items-center gap-3 text-sm font-semibold tracking-[0.22em]" href="/">
            <span className="flex size-10 items-center justify-center rounded-2xl bg-primary text-primary-foreground">
              U
            </span>
            UDBHAVI
          </Link>
          <ThemeToggle />
        </header>

        <section className="grid gap-8 lg:min-h-[calc(100vh-9rem)] lg:grid-cols-[1.04fr_0.96fr] lg:items-center">
          <div className="relative overflow-hidden rounded-[2rem] border border-border/70 bg-card/85 p-8 shadow-[0_30px_80px_-40px_rgba(15,23,42,0.45)] sm:p-10">
            <div className="absolute inset-x-0 top-0 h-40 bg-[radial-gradient(circle_at_top_left,_rgba(56,189,248,0.22),_transparent_62%)]" />
            <div className="relative space-y-7">
              <Badge variant="accent">{eyebrow}</Badge>
              <div className="space-y-4">
                <h1 className="max-w-xl text-4xl font-semibold leading-tight text-balance sm:text-5xl">
                  {title}
                </h1>
                <p className="max-w-xl text-base leading-8 text-muted-foreground">
                  {description}
                </p>
              </div>

              <div className="space-y-3">
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                  Why this flow exists
                </p>
                <AuthBenefitList />
              </div>

              <p className="max-w-xl text-sm leading-7 text-muted-foreground">{badge}</p>
            </div>
          </div>

          <div className="flex items-center justify-center lg:justify-end">{children}</div>
        </section>
      </div>
    </main>
  );
}
