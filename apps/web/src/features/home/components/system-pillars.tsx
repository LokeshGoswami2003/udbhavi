import { DatabaseZap, Palette, PanelsTopLeft } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { phaseTwoBacklog, systemPillars } from "@/features/home/content";

const icons = [Palette, PanelsTopLeft, DatabaseZap];

export function SystemPillars() {
  return (
    <section className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]" id="product">
      <Card id="templates">
        <CardHeader>
          <Badge variant="muted">Product principles</Badge>
          <CardTitle className="mt-4">The product should help users move from blankness to clarity</CardTitle>
          <CardDescription>
            These are the experience rules that matter more than decorative polish as the
            product grows.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-3">
          {systemPillars.map((pillar, index) => {
            const Icon = icons[index];

            return (
              <div
                className="rounded-[1.35rem] border border-border/70 bg-background/70 p-5"
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
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <Badge variant="accent">User journey</Badge>
          <CardTitle className="mt-4">The first four moments should feel obvious</CardTitle>
          <CardDescription>
            A SaaS flow becomes easier to trust when each step answers “what should I do next?”
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {phaseTwoBacklog.map((item, index) => (
            <div key={item}>
              <div className="flex items-center gap-3">
                <span className="flex size-8 items-center justify-center rounded-full bg-primary/12 text-sm font-semibold text-primary">
                  {index + 1}
                </span>
                <p className="text-sm font-medium">{item}</p>
              </div>
              {index < phaseTwoBacklog.length - 1 ? <Separator className="mt-4" /> : null}
            </div>
          ))}
        </CardContent>
      </Card>
    </section>
  );
}
