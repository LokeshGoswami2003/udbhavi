import { AuthPreview } from "@/features/home/components/auth-preview";
import { HeroPanel } from "@/features/home/components/hero-panel";
import { SiteHeader } from "@/features/home/components/site-header";
import { SystemPillars } from "@/features/home/components/system-pillars";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main className="relative overflow-hidden bg-background/40">
        <div className="mx-auto flex w-full max-w-7xl flex-col px-5 sm:px-6">
          <section className="grid min-h-[calc(100svh-4.5rem)] gap-8 py-8 sm:py-10 lg:grid-cols-[minmax(0,1fr)_minmax(380px,0.78fr)] lg:items-center">
            <HeroPanel />
            <AuthPreview />
          </section>
        </div>
        <div className="border-t border-border/70 bg-background/72">
          <div className="mx-auto w-full max-w-7xl px-5 py-10 sm:px-6 sm:py-12">
            <SystemPillars />
          </div>
        </div>
      </main>
    </>
  );
}
