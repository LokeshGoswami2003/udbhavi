import Link from "next/link";

const navItems = ["Home", "Dashboard", "Templates", "Sign in"];

const foundationItems = [
  "Custom FastAPI backend",
  "AWS-first storage and AI path",
  "Structured resume JSON as source of truth",
  "PDF and DOCX export pipeline later",
];

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <header className="border-b border-black/10 bg-white/90 dark:border-white/10 dark:bg-black/80">
        <nav className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-5">
          <Link className="text-lg font-semibold" href="/">
            Udbhavi
          </Link>
          <div className="flex items-center gap-2 text-sm text-black/70 dark:text-white/70">
            {navItems.map((item) => (
              <Link
                className="rounded-md px-3 py-2 transition hover:bg-black/5 hover:text-black dark:hover:bg-white/10 dark:hover:text-white"
                href="/"
                key={item}
              >
                {item}
              </Link>
            ))}
          </div>
        </nav>
      </header>

      <section className="mx-auto grid w-full max-w-6xl gap-10 px-6 py-20 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <div className="space-y-8">
          <div className="space-y-5">
            <p className="text-sm font-medium uppercase tracking-wide text-emerald-700 dark:text-emerald-300">
              Phase 1 foundation
            </p>
            <h1 className="max-w-3xl text-5xl font-semibold leading-tight text-black dark:text-white">
              AI resume workspace for software professionals.
            </h1>
            <p className="max-w-2xl text-lg leading-8 text-black/70 dark:text-white/70">
              Udbhavi will help users upload or build resumes, improve them with AI,
              target job descriptions, and export polished PDF and DOCX versions.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link
              className="rounded-md bg-black px-5 py-3 text-sm font-medium text-white transition hover:bg-black/80 dark:bg-white dark:text-black dark:hover:bg-white/80"
              href="/"
            >
              Open dashboard
            </Link>
            <Link
              className="rounded-md border border-black/15 px-5 py-3 text-sm font-medium transition hover:bg-black/5 dark:border-white/20 dark:hover:bg-white/10"
              href="/"
            >
              View templates
            </Link>
          </div>
        </div>

        <div className="rounded-lg border border-black/10 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-white/5">
          <h2 className="text-base font-semibold">Foundation checklist</h2>
          <ul className="mt-5 space-y-4">
            {foundationItems.map((item) => (
              <li className="flex gap-3 text-sm text-black/70 dark:text-white/70" key={item}>
                <span className="mt-1 h-2 w-2 rounded-full bg-emerald-500" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </main>
  );
}
