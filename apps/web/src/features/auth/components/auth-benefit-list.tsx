import { authBenefits } from "@/features/auth/content";

export function AuthBenefitList() {
  return (
    <div className="space-y-4">
      {authBenefits.map((benefit) => (
        <div
          className="rounded-[1.4rem] border border-border/70 bg-background/70 p-5"
          key={benefit.title}
        >
          <p className="font-semibold">{benefit.title}</p>
          <p className="mt-2 text-sm leading-7 text-muted-foreground">
            {benefit.description}
          </p>
        </div>
      ))}
    </div>
  );
}
