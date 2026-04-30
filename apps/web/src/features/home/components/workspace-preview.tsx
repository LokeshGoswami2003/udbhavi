import { CircleCheckBig, Sparkles } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { workspaceSignals } from "@/features/home/content";

export function WorkspacePreview() {
  return (
    <Card className="overflow-hidden" id="journey">
      <CardHeader className="border-b border-border/70 bg-card/60">
        <Badge variant="muted">After signup</Badge>
        <CardTitle className="mt-4">A resume workspace that guides the next decision</CardTitle>
        <CardDescription>
          Instead of landing users in a noisy product shell, the workspace should show
          the next high-value action immediately.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-5 pt-6">
        {workspaceSignals.map((signal, index) => (
          <div key={signal.title}>
            <div className="flex items-start gap-3">
              <div className="mt-0.5 rounded-full bg-primary/12 p-2 text-primary">
                {index === 0 ? (
                  <Sparkles className="size-4" />
                ) : (
                  <CircleCheckBig className="size-4" />
                )}
              </div>
              <div>
                <p className="font-semibold">{signal.title}</p>
                <p className="mt-1 text-sm leading-7 text-muted-foreground">
                  {signal.description}
                </p>
              </div>
            </div>
            {index < workspaceSignals.length - 1 ? <Separator className="mt-5" /> : null}
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
