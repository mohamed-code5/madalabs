'use client'

import { useState } from 'react'
import { ExternalLink, Monitor, RefreshCw, Smartphone, Sparkles } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useI18n } from '../i18n'

type Device = 'desktop' | 'mobile'

export function PreviewPanel({ project, revision }: { project: string; revision: number }) {
  const { t } = useI18n()
  const [device, setDevice] = useState<Device>('desktop')

  return (
    <section aria-label={t.workspace.preview} className="flex min-h-[520px] flex-col border-t border-white/[0.06] bg-black/20 lg:min-h-0 lg:w-[420px] lg:shrink-0 lg:border-s lg:border-t-0 xl:w-[480px]">
      <div className="flex h-10 shrink-0 items-center gap-2 border-b border-white/[0.06] px-3">
        <span className="flex items-center gap-1.5 text-xs text-mint">
          <span className="size-1.5 animate-pulse rounded-full bg-mint" />
          {t.workspace.preview}
        </span>
        <div role="radiogroup" aria-label="Device" className="mx-auto flex rounded-md border border-white/10 bg-white/[0.03] p-0.5">
          {[
            { value: 'desktop' as const, icon: Monitor, label: t.workspace.desktop },
            { value: 'mobile' as const, icon: Smartphone, label: t.workspace.mobile },
          ].map(({ value, icon: Icon, label }) => (
            <button
              key={value}
              type="button"
              role="radio"
              aria-checked={device === value}
              aria-label={label}
              onClick={() => setDevice(value)}
              className={cn(
                'flex h-6 w-8 items-center justify-center rounded transition-colors',
                device === value ? 'bg-white/10 text-foreground' : 'text-muted-foreground hover:text-foreground',
              )}
            >
              <Icon className="size-3.5" aria-hidden="true" />
            </button>
          ))}
        </div>
        <RefreshCw className="size-3.5 text-muted-foreground" aria-hidden="true" />
        <ExternalLink className="size-3.5 text-muted-foreground" aria-hidden="true" />
      </div>

      <div className="flex min-h-0 flex-1 items-start justify-center overflow-auto bg-[radial-gradient(circle_at_50%_0%,rgb(16_185_129/0.08),transparent_60%)] p-4 pb-32">
        <div
          className={cn(
            'w-full overflow-hidden border border-white/10 bg-zinc-950 shadow-2xl transition-all duration-500',
            device === 'mobile' ? 'max-w-[300px] rounded-[2rem] border-4 border-zinc-800' : 'max-w-full rounded-xl',
          )}
        >
          <MiniSite project={project} revision={revision} compact={device === 'mobile'} />
        </div>
      </div>
    </section>
  )
}

function MiniSite({ project, revision, compact }: { project: string; revision: number; compact: boolean }) {
  const isSharara = project === 'Sharara Agency'
  const titleAr = isSharara ? 'شرارة للإبداع الرقمي' : project === 'FinTech SaaS' ? 'مالية ذكية للجميع' : 'مركز الطلاب الذكي'
  const subtitle = isSharara ? 'We design brands that ignite.' : project === 'FinTech SaaS' ? 'Banking-grade tools for SMEs.' : 'Courses, notes, and study groups.'

  return (
    <div dir="rtl" lang="ar" className="font-arabic">
      <div className="flex items-center justify-between border-b border-white/[0.06] px-4 py-3">
        <span className="flex items-center gap-1.5 text-sm font-bold text-white">
          <span className="size-2.5 rounded-sm bg-gradient-to-br from-amber-400 to-emerald-400" />
          {project}
        </span>
        {!compact && (
          <span className="flex gap-3 text-[11px] text-zinc-400">
            <span>الخدمات</span>
            <span>الأعمال</span>
            <span>تواصل</span>
          </span>
        )}
      </div>
      <div className="relative overflow-hidden px-5 py-8">
        <div aria-hidden="true" className="absolute -top-10 start-0 h-32 w-32 rounded-full bg-amber-500/20 blur-2xl" />
        {revision > 0 && (
          <span className="relative mb-3 inline-flex items-center gap-1 rounded-full bg-emerald-500/15 px-2 py-0.5 text-[10px] text-emerald-300" dir="ltr">
            <Sparkles className="size-3" aria-hidden="true" />v{revision + 1}
          </span>
        )}
        <h3 className={cn('relative font-extrabold leading-tight text-white', compact ? 'text-2xl' : 'text-3xl')}>{titleAr}</h3>
        <p className="relative mt-2 font-sans text-sm text-zinc-400" dir="ltr" lang="en">
          {subtitle}
        </p>
        <div className="relative mt-5 flex gap-2">
          <span className="rounded-lg bg-amber-400 px-3.5 py-2 text-xs font-bold text-amber-950">ابدأ مشروعك</span>
          <span className="rounded-lg border border-white/15 px-3.5 py-2 text-xs text-zinc-200">أعمالنا</span>
        </div>
      </div>
      <div className={cn('grid gap-2 px-4 pb-5', compact ? 'grid-cols-1' : 'grid-cols-3')}>
        {['هوية بصرية', 'تطوير ويب', 'تسويق رقمي'].map((s, i) => (
          <div key={s} className="rounded-lg border border-white/[0.06] bg-white/[0.03] p-3">
            <span className={cn('block size-5 rounded-md', ['bg-amber-400/80', 'bg-emerald-400/80', 'bg-sky-400/80'][i])} />
            <span className="mt-2 block text-xs font-bold text-zinc-100">{s}</span>
            <span className="mt-1 block h-1.5 w-3/4 rounded bg-white/10" />
            <span className="mt-1 block h-1.5 w-1/2 rounded bg-white/10" />
          </div>
        ))}
      </div>
    </div>
  )
}
