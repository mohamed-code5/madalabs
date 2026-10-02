'use client'

import { Coins, Plus } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useI18n } from '../i18n'
import { PROJECTS } from './files'

export const MAX_CREDITS = 5

type Props = { activeProject: string; onSelect: (name: string) => void; credits: number }

export function WorkspaceSidebar({ activeProject, onSelect, credits }: Props) {
  const { t, lang } = useI18n()
  const pct = (credits / MAX_CREDITS) * 100

  return (
    <aside className="hidden w-60 shrink-0 flex-col border-e border-white/[0.06] bg-sidebar lg:flex">
      <div className="p-3">
        <button
          type="button"
          className="flex h-9 w-full items-center justify-center gap-2 rounded-lg border border-white/10 bg-white/[0.03] text-sm font-medium text-foreground transition-colors hover:bg-white/[0.07]"
        >
          <Plus className="size-4" aria-hidden="true" />
          {t.workspace.newProject}
        </button>
      </div>

      <nav aria-label={t.workspace.recent} className="flex-1 overflow-y-auto px-3">
        <h2 className="px-2 pb-2 pt-3 text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
          {t.workspace.recent}
        </h2>
        <ul className="space-y-0.5">
          {PROJECTS.map((p) => {
            const active = p.name === activeProject
            return (
              <li key={p.name}>
                <button
                  type="button"
                  onClick={() => onSelect(p.name)}
                  aria-current={active ? 'page' : undefined}
                  className={cn(
                    'flex w-full items-center gap-2.5 rounded-lg px-2 py-2 text-start transition-colors',
                    active ? 'bg-white/[0.07] text-foreground' : 'text-muted-foreground hover:bg-white/[0.04] hover:text-foreground',
                  )}
                >
                  <span className={cn('size-2 shrink-0 rounded-full', p.color)} aria-hidden="true" />
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-sm">{lang === 'ar' ? p.nameAr : p.name}</span>
                    <span className="block text-[11px] text-muted-foreground">{p.updated}</span>
                  </span>
                </button>
              </li>
            )
          })}
        </ul>
      </nav>

      <div className="m-3 rounded-xl border border-white/[0.07] bg-white/[0.02] p-3.5">
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-2 text-xs font-medium text-foreground">
            <Coins className="size-3.5 text-gold" aria-hidden="true" />
            {t.workspace.credits}
          </span>
          <span className="font-mono text-xs text-mint" dir="ltr">
            {credits}/{MAX_CREDITS}
          </span>
        </div>
        <div
          role="meter"
          aria-valuemin={0}
          aria-valuemax={MAX_CREDITS}
          aria-valuenow={credits}
          aria-label={t.workspace.credits}
          className="mt-2.5 flex gap-1"
        >
          {Array.from({ length: MAX_CREDITS }, (_, i) => (
            <span
              key={i}
              className={cn('h-1.5 flex-1 rounded-full transition-colors', i < credits ? 'bg-gradient-to-r from-emerald-500 to-emerald-300' : 'bg-white/10')}
            />
          ))}
        </div>
        <p className="mt-2 text-[11px] text-muted-foreground">
          {credits} {t.workspace.remaining}
          <span className="sr-only"> ({pct}%)</span>
        </p>
        <button
          type="button"
          className="mt-3 h-8 w-full rounded-lg bg-gradient-to-r from-amber-500/90 to-amber-400 text-xs font-semibold text-amber-950 transition-opacity hover:opacity-90"
        >
          {t.workspace.upgrade}
        </button>
      </div>
    </aside>
  )
}
