import type { ComponentProps } from "react";

import { cn } from "@/lib/utils";

export function Input({
  className,
  ...props
}: ComponentProps<"input">) {
  return (
    <input
      className={cn(
        "flex h-12 w-full rounded-2xl border border-border bg-background/80 px-4 text-sm outline-none transition placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring",
        className,
      )}
      {...props}
    />
  );
}
