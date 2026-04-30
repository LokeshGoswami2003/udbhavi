import { AuthPreview } from "@/features/home/components/auth-preview";
import { HeroPanel } from "@/features/home/components/hero-panel";
import { SiteHeader } from "@/features/home/components/site-header";
import { SystemPillars } from "@/features/home/components/system-pillars";
import { WorkspacePreview } from "@/features/home/components/workspace-preview";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main className="relative overflow-hidden">
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-16 px-6 py-12 sm:py-20">
          <section className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
            <HeroPanel />
            <div className="space-y-6">
              <AuthPreview />
              <WorkspacePreview />
            </div>
          </section>
          <SystemPillars />
        </div>
      </main>
    </>
  );
}
