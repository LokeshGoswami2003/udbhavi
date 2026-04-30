import Link from "next/link";
import { ArrowRight, Clock3, FileUp, LayoutTemplate, Sparkles } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { workspaceSignals } from "@/features/home/content";

const journeySteps = [
  {
    description: "Create an account with just email and password.",
    icon: <Clock3 className="size-4 text-primary" />,
    title: "Start quickly",
  },
  {
    description: "Upload your current PDF or DOCX, or begin from a template.",
    icon: <FileUp className="size-4 text-primary" />,
    title: "Choose your path",
  },
  {
    description: "Land inside a workspace designed for iteration, targeting, and exports.",
    icon: <LayoutTemplate className="size-4 text-primary" />,
    title: "Keep building",
  },
];

export function AuthPreview() {
  return (
    <Card className="overflow-hidden lg:mx-0 lg:max-h-[calc(100svh-8rem)]" id="journey">
      <CardHeader className="border-b border-border/70 bg-card/70">
        <Badge variant="accent">Your first session</Badge>
        <CardTitle className="mt-3 text-2xl leading-tight">
          Start with a clear path, then move into the workspace
        </CardTitle>
        <CardDescription className="text-base leading-7">
          The first screen should answer what to do now, what happens next, and why the
          product is worth trusting.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4 pt-5">
        {journeySteps.map((step, index) => (
          <div key={step.title}>
            <div className="flex gap-3">
              <div className="mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary/12">
                {step.icon}
              </div>
              <div>
                <p className="font-semibold">{step.title}</p>
                <p className="mt-1 text-sm leading-7 text-muted-foreground">
                  {step.description}
                </p>
              </div>
            </div>
            {index < journeySteps.length - 1 ? <Separator className="mt-4" /> : null}
          </div>
        ))}
        <div className="rounded-xl border border-border/70 bg-background/70 p-4">
          <div className="flex items-center gap-2 text-sm font-semibold">
            <Sparkles className="size-4 text-primary" />
            Workspace focus
          </div>
          <div className="mt-3 grid gap-3 text-sm leading-6 text-muted-foreground">
            {workspaceSignals.map((signal) => (
              <p key={signal.title}>
                <span className="font-semibold text-foreground">{signal.title}:</span>{" "}
                {signal.description}
              </p>
            ))}
          </div>
        </div>
        <Button asChild className="w-full" size="lg">
          <Link href="/signup">
            Create your account
            <ArrowRight className="size-4" />
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
}
