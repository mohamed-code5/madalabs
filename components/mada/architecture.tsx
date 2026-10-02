'use client'

import { Boxes, MessageSquareText, Rocket, Workflow } from 'lucide-react'
import { useI18n } from './i18n'
import { SectionHeading } from './section-heading'

const ICONS = [MessageSquareText, Workflow, Boxes, Rocket]

export function Architecture() {
  const { t } = useI18n()
  return (
    <section id="architecture" className="relative scroll-mt-20 border-y border-white/[0.06] bg-onyx/50 py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading eyebrow={t.architecture.eyebrow} title={t.architecture.title} />
        <ol className="relative mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <span
            aria-hidden="true"
            className="absolute inset-x-[12%] top-6 hidden h-px bg-gradient-to-r from-primary/0 via-primary/50 to-gold/50 lg:block"
          />
          {t.architecture.steps.map((step, i) => {
            const Icon = ICONS[i]
            return (
              <li key={i} className="relative flex flex-col items-center text-center">
                <span className="relative flex size-12 items-center justify-center rounded-full border border-primary/30 bg-background text-mint shadow-[0_0_24px_-6px_rgb(16_185_129/0.6)]">
                  <Icon className="size-5" aria-hidden="true" />
                </span>
                <span className="mt-5 font-mono text-xs text-gold">0{i + 1}</span>
                <h3 className="mt-1 text-base font-semibold text-foreground">{step.title}</h3>
                <p className="mt-1.5 max-w-[16rem] text-sm text-muted-foreground">{step.desc}</p>
              </li>
            )
          })}
        </ol>
      </div>
    </section>
  )
}
