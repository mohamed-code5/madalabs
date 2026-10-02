// Models occasionally wrap output in markdown fences or add prose despite instructions.
export function extractHtml(raw: string) {
  let text = raw.replace(/^\s*```(?:html)?\s*/i, '').replace(/\s*```\s*$/, '')
  const start = text.search(/<!doctype html|<html/i)
  if (start > 0) text = text.slice(start)
  const end = text.toLowerCase().lastIndexOf('</html>')
  if (end !== -1) text = text.slice(0, end + '</html>'.length)
  return text.trim()
}
