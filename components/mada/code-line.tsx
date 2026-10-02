import { TOKEN_CLASS, tokenize } from '@/lib/highlight'

export function CodeLine({ line }: { line: string }) {
  if (!line) return <span>{' '}</span>
  return (
    <span className="whitespace-pre">
      {tokenize(line).map((token, i) => (
        <span key={i} className={TOKEN_CLASS[token.kind]}>
          {token.text}
        </span>
      ))}
    </span>
  )
}
