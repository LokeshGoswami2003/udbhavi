import Link from "next/link";
import { ArrowRight, Clock3, FileUp, LayoutTemplate } from "lucide-react";

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
    <Card className="overflow-hidden">
      <CardHeader className="border-b border-border/70 bg-card/60">
        <Badge variant="accent">Your first session</Badge>
        <CardTitle className="mt-4">
          Account creation should feel like momentum, not setup overhead
        </CardTitle>
        <CardDescription>
          The first-run flow should help users get into their workspace fast, understand
          what happens next, and feel confident about the product path.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-5 pt-6">
        {journeySteps.map((step, index) => (
          <div key={step.title}>
            <div className="flex gap-3">
              <div className="mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-full bg-primary/12">
                {step.icon}
              </div>
              <div>
                <p className="font-semibold">{step.title}</p>
                <p className="mt-1 text-sm leading-7 text-muted-foreground">
                  {step.description}
                </p>
              </div>
            </div>
            {index < journeySteps.length - 1 ? <Separator className="mt-5" /> : null}
          </div>
        ))}
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
