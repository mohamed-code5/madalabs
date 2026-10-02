'use client'

import { Bot, Cpu, Database, GitBranch, Languages, MousePointerClick } from 'lucide-react'
import { ArabesquePattern, StarAccent } from './arabesque'
import { useI18n } from './i18n'
import { SectionHeading } from './section-heading'

const ICONS = [Cpu, Bot, Languages, Database, GitBranch, MousePointerClick]

export function Features() {
  const { t } = useI18n()

  return (
    <section id="features" className="relative scroll-mt-20 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading eyebrow={t.features.eyebrow} title={t.features.title} subtitle={t.features.subtitle} />

        <ul className="mt-16 grid gap-px overflow-hidden rounded-2xl border border-white/[0.07] bg-white/[0.07] sm:grid-cols-2 lg:grid-cols-3">
          {t.features.items.map((item, i) => {
            const Icon = ICONS[i]
            const isGold = i === 2
            return (
              <li key={i} className="group relative overflow-hidden bg-background p-7 transition-colors hover:bg-onyx sm:p-8">
                <ArabesquePattern
                  className="text-white opacity-0 transition-opacity duration-500 [mask-image:radial-gradient(circle_at_100%_0%,black,transparent_70%)] group-hover:opacity-[0.07] rtl:[mask-image:radial-gradient(circle_at_0%_0%,black,transparent_70%)]"
                  size={40}
                />
                <StarAccent className="absolute end-5 top-5 size-10 text-white/[0.06] transition-all duration-500 group-hover:rotate-45 group-hover:text-primary/30" />
                <div
                  className={`relative flex size-11 items-center justify-center rounded-xl border ${
                    isGold ? 'border-gold/30 bg-gold/10 text-gold' : 'border-primary/25 bg-primary/10 text-mint'
                  }`}
                >
                  <Icon className="size-5" aria-hidden="true" />
                </div>
                <h3 className="relative mt-6 text-lg font-semibold tracking-tight text-foreground">{item.title}</h3>
                <p className="relative mt-2 text-sm leading-relaxed text-muted-foreground">{item.desc}</p>
                <span
                  aria-hidden="true"
                  className="absolute inset-x-0 bottom-0 h-px scale-x-0 bg-gradient-to-r from-transparent via-primary to-transparent transition-transform duration-500 group-hover:scale-x-100"
                />
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
