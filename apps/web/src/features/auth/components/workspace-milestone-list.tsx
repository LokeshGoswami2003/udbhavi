import { Badge } from "@/components/ui/badge";
import { workspaceMilestones } from "@/features/auth/content";

export function WorkspaceMilestoneList() {
  return (
    <div className="space-y-4">
      {workspaceMilestones.map((milestone, index) => (
        <div
          className="rounded-[1.4rem] border border-border/70 bg-background/70 p-5"
          key={milestone.title}
        >
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex size-8 items-center justify-center rounded-full bg-primary/12 text-sm font-semibold text-primary">
              {index + 1}
            </div>
            <p className="font-semibold">{milestone.title}</p>
            <Badge variant="muted">{milestone.status}</Badge>
          </div>
          <p className="mt-3 text-sm leading-7 text-muted-foreground">
            {milestone.description}
          </p>
        </div>
      ))}
    </div>
  );
}
