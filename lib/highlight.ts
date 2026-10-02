export type TokenKind = 'comment' | 'string' | 'keyword' | 'tag' | 'number' | 'fn' | 'plain' | 'punct'

export type Token = { text: string; kind: TokenKind }

const KEYWORDS =
  'import|from|export|default|function|return|const|let|async|await|if|else|new|type|interface|CREATE|TABLE|PRIMARY|KEY|REFERENCES|NOT|NULL|DEFAULT|ENABLE|ROW|LEVEL|SECURITY|ALTER|POLICY|ON|FOR|USING|SELECT|INSERT|WITH|CHECK|uuid|text|numeric|integer|timestamptz|boolean'

const RULES: [RegExp, TokenKind][] = [
  [/^(\/\/.*|--.*)/, 'comment'],
  [/^(['"`])(?:(?!\1).)*\1/, 'string'],
  [new RegExp(`^\\b(?:${KEYWORDS})\\b`), 'keyword'],
  [/^<\/?[A-Za-z][\w.]*|^\/?>/, 'tag'],
  [/^\b\d+(?:\.\d+)?\b/, 'number'],
  [/^[A-Za-z_$][\w$]*(?=\()/, 'fn'],
  [/^[A-Za-z_$][\w$]*/, 'plain'],
  [/^\s+/, 'plain'],
  [/^./, 'punct'],
]

export function tokenize(line: string): Token[] {
  const tokens: Token[] = []
  let rest = line
  while (rest.length) {
    for (const [re, kind] of RULES) {
      const match = rest.match(re)
      if (match) {
        tokens.push({ text: match[0], kind })
        rest = rest.slice(match[0].length)
        break
      }
    }
  }
  return tokens
}

export const TOKEN_CLASS: Record<TokenKind, string> = {
  comment: 'text-zinc-500 italic',
  string: 'text-amber-300',
  keyword: 'text-emerald-400',
  tag: 'text-sky-300',
  number: 'text-orange-300',
  fn: 'text-violet-300',
  plain: 'text-zinc-200',
  punct: 'text-zinc-500',
}
