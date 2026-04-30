import Link from "next/link";
import { ArrowRight, ShieldCheck } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { heroStats, trustPoints } from "@/features/home/content";

export function HeroPanel() {
  return (
    <section className="space-y-10">
      <div className="space-y-5">
        <Badge variant="accent">AI resume workspace for software talent</Badge>
        <div className="space-y-4">
          <h1 className="max-w-3xl text-5xl font-semibold leading-[1.05] tracking-tight text-balance sm:text-6xl">
            Build job-ready resumes with a workflow that feels calm, modern, and reusable.
          </h1>
          <p className="max-w-2xl text-lg leading-8 text-muted-foreground">
            Udbhavi helps software candidates upload existing resumes or start from focused
            templates, improve content with AI guidance, tailor for roles, and keep clean
            resume versions over time.
          </p>
        </div>
      </div>

      <div className="flex flex-wrap gap-3">
        <Button asChild size="lg">
          <Link href="/signup">
            Get started free
            <ArrowRight className="size-4" />
          </Link>
        </Button>
        <Button asChild size="lg" variant="outline">
          <Link href="/login">
            Sign in
          </Link>
        </Button>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        {heroStats.map((item) => (
          <div
            className="rounded-[1.5rem] border border-border/70 bg-card/70 p-5 backdrop-blur"
            key={item.label}
          >
            <p className="text-sm text-muted-foreground">{item.label}</p>
            <p className="mt-2 text-xl font-semibold">{item.value}</p>
          </div>
        ))}
      </div>

      <div className="rounded-[1.75rem] border border-border/70 bg-card/70 p-6 backdrop-blur">
        <div className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.18em] text-muted-foreground">
          <ShieldCheck className="size-4 text-primary" />
          Why this matters
        </div>
        <ul className="mt-4 space-y-3 text-sm leading-7 text-muted-foreground">
          {trustPoints.map((point) => (
            <li className="flex gap-3" key={point}>
              <span className="mt-2 size-2 rounded-full bg-primary" />
              <span>{point}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
