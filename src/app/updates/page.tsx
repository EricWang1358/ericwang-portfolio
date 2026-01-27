import { readFile } from "node:fs/promises";
import { renderMarkdownToHtml } from "@/lib/markdown";

export default async function UpdatesPage() {
  const md = await readFile(process.cwd() + "/docs/已办更新.md", "utf-8");
  const html = await renderMarkdownToHtml(md);

  return (
    <main className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="font-[family-name:var(--font-heading)] text-3xl font-bold text-foreground">
        Updates
      </h1>
      <article
        className="markdown mt-6"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </main>
  );
}
