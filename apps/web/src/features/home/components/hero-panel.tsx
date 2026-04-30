import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { heroStats, trustPoints } from "@/features/home/content";

export function HeroPanel() {
  return (
    <section className="space-y-8">
      <div className="space-y-5">
        <Badge variant="accent">AI resume workspace for software talent</Badge>
        <div className="space-y-4">
          <h1 className="max-w-3xl text-4xl font-semibold leading-[1.08] text-balance sm:text-5xl lg:text-[3.45rem]">
            Build job-ready resumes without fighting the workflow.
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

      <div className="grid gap-3 sm:grid-cols-3">
        {heroStats.map((item) => (
          <div
            className="rounded-xl border border-border/70 bg-card/75 p-4 backdrop-blur"
            key={item.label}
          >
            <p className="text-sm text-muted-foreground">{item.label}</p>
            <p className="mt-2 text-xl font-semibold">{item.value}</p>
          </div>
        ))}
      </div>

      <div className="max-w-2xl border-l border-border/80 pl-4">
        <ul className="space-y-3 text-sm leading-7 text-muted-foreground">
          {trustPoints.map((point) => (
            <li className="flex gap-3" key={point}>
              <CheckCircle2 className="mt-1 size-4 shrink-0 text-primary" />
              <span>{point}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
