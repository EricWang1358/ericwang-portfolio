import Link from "next/link";

export default function AboutThisSitePage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="font-[family-name:var(--font-heading)] text-3xl font-bold text-foreground">
        About this site
      </h1>

      <div className="mt-6 space-y-4 text-sm sm:text-base text-muted-foreground">
        <p>
          This website is a lightweight personal portfolio built to demonstrate engineering
          capability: clean UI, responsive layout, theme support, and automated deployment.
        </p>

        <div className="rounded-lg border border-border bg-card p-4">
          <h2 className="font-[family-name:var(--font-heading)] text-base font-semibold text-foreground">
            Tech
          </h2>
          <ul className="mt-2 list-disc pl-5">
            <li>Next.js (App Router) + TypeScript</li>
            <li>Tailwind CSS + shadcn/ui</li>
            <li>Dark / Light / System theme via next-themes</li>
            <li>Netlify hosting + GitHub auto-deploy</li>
          </ul>
        </div>

        <div className="rounded-lg border border-border bg-card p-4">
          <h2 className="font-[family-name:var(--font-heading)] text-base font-semibold text-foreground">
            Privacy
          </h2>
          <ul className="mt-2 list-disc pl-5">
            <li>No sensitive personal documents are published (IDs, addresses, transcripts).</li>
            <li>No secrets are stored in the repository (.env, tokens, API keys).</li>
            <li>Only public contact links are provided for networking.</li>
          </ul>
        </div>

        <div className="rounded-lg border border-border bg-card p-4">
          <h2 className="font-[family-name:var(--font-heading)] text-base font-semibold text-foreground">
            Project logs
          </h2>
          <div className="mt-3 flex flex-wrap gap-3">
            <Link href="/updates" className="underline underline-offset-4 text-foreground">
              Updates
            </Link>
            <Link href="/todo" className="underline underline-offset-4 text-foreground">
              Todo
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
