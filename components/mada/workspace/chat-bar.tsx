'use client'

import { useState, type FormEvent, type KeyboardEvent } from 'react'
import { Check, Database, Loader2, Paperclip, WandSparkles } from 'lucide-react'
import { useI18n } from '../i18n'

type Props = { credits: number; onGenerate: (prompt: string) => Promise<void> }

export function ChatBar({ credits, onGenerate }: Props) {
  const { t } = useI18n()
  const [value, setValue] = useState('')
  const [pending, setPending] = useState(false)
  const [lastPrompt, setLastPrompt] = useState<string | null>(null)

  const disabled = pending || credits === 0 || !value.trim()

  const submit = async (e?: FormEvent) => {
    e?.preventDefault()
    if (disabled) return
    const prompt = value.trim()
    setPending(true)
    await onGenerate(prompt)
    setPending(false)
    setLastPrompt(prompt)
    setValue('')
  }

  const onKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey && !e.nativeEvent.isComposing && e.keyCode !== 229) {
      e.preventDefault()
      submit()
    }
  }

  return (
    <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 flex flex-col items-center gap-2 p-4">
      {lastPrompt && !pending && (
        <p role="status" className="pointer-events-auto flex max-w-xl items-center gap-2 truncate rounded-full border border-primary/20 bg-onyx/90 px-3 py-1 text-xs text-zinc-300 backdrop-blur">
          <Check className="size-3.5 shrink-0 text-mint" aria-hidden="true" />
          <span className="truncate">{lastPrompt}</span>
        </p>
      )}
      <form
        onSubmit={submit}
        className="glass pointer-events-auto w-full max-w-3xl rounded-2xl border border-white/10 p-2 shadow-[0_20px_60px_-20px_rgb(0_0_0/0.9),0_0_40px_-20px_rgb(16_185_129/0.6)]"
      >
        <label htmlFor="workspace-prompt" className="sr-only">
          {t.workspace.placeholder}
        </label>
        <textarea
          id="workspace-prompt"
          rows={2}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={onKeyDown}
          placeholder={t.workspace.placeholder}
          className="w-full resize-none bg-transparent px-2.5 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
        />
        <div className="flex flex-wrap items-center gap-1.5">
          <button type="button" className="inline-flex h-8 items-center gap-1.5 rounded-lg border border-white/10 px-2.5 text-xs text-muted-foreground transition-colors hover:bg-white/5 hover:text-foreground">
            <Paperclip className="size-3.5" aria-hidden="true" />
            {t.workspace.attach}
          </button>
          <button type="button" className="inline-flex h-8 items-center gap-1.5 rounded-lg border border-white/10 px-2.5 text-xs text-muted-foreground transition-colors hover:bg-white/5 hover:text-foreground">
            <Database className="size-3.5" aria-hidden="true" />
            {t.workspace.database}
          </button>
          <button
            type="submit"
            disabled={disabled}
            className="ms-auto inline-flex h-8 items-center gap-1.5 rounded-lg bg-primary px-3.5 text-xs font-semibold text-primary-foreground shadow-[0_0_20px_-4px_rgb(16_185_129/0.7)] transition-all hover:bg-mint disabled:cursor-not-allowed disabled:opacity-50 disabled:shadow-none"
          >
            {pending ? <Loader2 className="size-3.5 animate-spin" aria-hidden="true" /> : <WandSparkles className="size-3.5" aria-hidden="true" />}
            {pending ? t.workspace.generating : credits === 0 ? t.workspace.noCredits : t.workspace.generate}
          </button>
        </div>
      </form>
    </div>
  )
}
