import { streamText } from 'ai'
import { z } from 'zod'

export const maxDuration = 120

const MAX_CURRENT_HTML = 60_000

const requestSchema = z.object({
  prompt: z.string().trim().min(1).max(4000),
  project: z.string().trim().max(120).optional(),
  currentHtml: z.string().max(MAX_CURRENT_HTML).optional(),
})

const SYSTEM = `You are Mada, an expert front-end engineer that turns prompts into polished, production-quality single-page websites.

Output rules (strict):
- Respond with ONE complete HTML document and nothing else. Start with <!doctype html> and end with </html>.
- No markdown, no code fences, no explanations before or after the document.
- Load Tailwind via <script src="https://cdn.tailwindcss.com"></script> and use Tailwind utility classes for all styling.
- Load fonts from Google Fonts: "Tajawal" for Arabic text and "Inter" for Latin text.
- If the prompt is in Arabic or asks for Arabic/bilingual content, set <html lang="ar" dir="rtl"> and write natural Modern Standard Arabic copy. Use logical properties (ms-/me-/ps-/pe-/start-/end-) so the layout mirrors correctly.
- Otherwise use <html lang="en" dir="ltr">.
- Use semantic HTML (header, nav, main, section, footer), accessible contrast, alt text, and a responsive mobile-first layout.
- Write realistic, specific copy. Never use lorem ipsum.
- For images, use https://picsum.photos/seed/<word>/<w>/<h> URLs with descriptive alt text.
- Small vanilla JS in a <script> tag is allowed for interactivity (menus, tabs, counters). No external JS libraries other than Tailwind.
- Keep the document under ~400 lines.

When CURRENT HTML is provided, treat the prompt as an edit request: return the full updated document, preserving everything the user did not ask to change.`

export async function POST(req: Request) {
  const parsed = requestSchema.safeParse(await req.json().catch(() => null))
  if (!parsed.success) {
    return Response.json({ error: 'Invalid request' }, { status: 400 })
  }

  const { prompt, project, currentHtml } = parsed.data

  const userPrompt = [
    project ? `PROJECT NAME: ${project}` : null,
    currentHtml ? `CURRENT HTML:\n${currentHtml}` : null,
    `REQUEST:\n${prompt}`,
  ]
    .filter(Boolean)
    .join('\n\n')

  const result = streamText({
    model: 'anthropic/claude-sonnet-5.5',
    system: SYSTEM,
    prompt: userPrompt,
    maxOutputTokens: 16_000,
    abortSignal: req.signal,
  })

  return result.toTextStreamResponse()
}
