import { marked } from "marked";

export async function renderMarkdownToHtml(markdown: string): Promise<string> {
  return marked.parse(markdown) as string;
}
