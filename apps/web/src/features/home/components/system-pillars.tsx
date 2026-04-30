import { DatabaseZap, Palette, PanelsTopLeft } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { phaseTwoBacklog, systemPillars } from "@/features/home/content";

const icons = [Palette, PanelsTopLeft, DatabaseZap];

export function SystemPillars() {
  return (
    <section className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]" id="product">
      <div id="templates">
        <div className="max-w-3xl">
          <Badge variant="muted">Product principles</Badge>
          <h2 className="mt-4 text-2xl font-semibold text-balance">
            The product should help users move from blankness to clarity
          </h2>
          <p className="mt-3 text-base leading-7 text-muted-foreground">
            These are the experience rules that matter more than decorative polish as the
            product grows.
          </p>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {systemPillars.map((pillar, index) => {
            const Icon = icons[index];

            return (
              <div
                className="rounded-xl border border-border/70 bg-card/72 p-5"
                key={pillar.title}
              >
                <Icon className="size-5 text-primary" />
                <h3 className="mt-4 font-semibold">{pillar.title}</h3>
                <p className="mt-2 text-sm leading-7 text-muted-foreground">
                  {pillar.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      <div className="rounded-xl border border-border/70 bg-card/72 p-5 sm:p-6">
        <Badge variant="accent">Progress so far</Badge>
        <h2 className="mt-4 text-xl font-semibold">The foundation is ready for Phase 3</h2>
        <p className="mt-3 text-sm leading-7 text-muted-foreground">
          Phase 1 and Phase 2 now cover setup, auth, local Neon configuration, and the
          first workspace handoff.
        </p>

        <div className="mt-5 space-y-4">
          {phaseTwoBacklog.map((item, index) => (
            <div key={item}>
              <div className="flex items-center gap-3">
                <span className="flex size-8 items-center justify-center rounded-lg bg-primary/12 text-sm font-semibold text-primary">
                  {index + 1}
                </span>
                <p className="text-sm font-medium">{item}</p>
              </div>
              {index < phaseTwoBacklog.length - 1 ? <Separator className="mt-4" /> : null}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
