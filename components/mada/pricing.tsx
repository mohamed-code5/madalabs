'use client'

import { useState } from 'react'
import { Check } from 'lucide-react'
import { cn } from '@/lib/utils'
import { ArabesquePattern } from './arabesque'
import { useI18n } from './i18n'
import { SectionHeading } from './section-heading'

const MONTHLY_PRICES = [0, 25, 49]

export function Pricing({ onSelect }: { onSelect: () => void }) {
  const { t } = useI18n()
  const [annual, setAnnual] = useState(false)

  return (
    <section id="pricing" className="relative scroll-mt-20 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading eyebrow={t.pricing.eyebrow} title={t.pricing.title} subtitle={t.pricing.subtitle} />

        <div className="mt-10 flex justify-center">
          <div role="radiogroup" aria-label="Billing period" className="flex items-center rounded-full border border-white/10 bg-white/[0.03] p-1">
            {[
              { value: false, label: t.pricing.monthly },
              { value: true, label: t.pricing.annual },
            ].map((o) => (
              <button
                key={String(o.value)}
                type="button"
                role="radio"
                aria-checked={annual === o.value}
                onClick={() => setAnnual(o.value)}
                className={cn(
                  'inline-flex h-9 items-center gap-2 rounded-full px-5 text-sm font-medium transition-colors',
                  annual === o.value ? 'bg-white/10 text-foreground' : 'text-muted-foreground hover:text-foreground',
                )}
              >
                {o.label}
                {o.value && (
                  <span className="rounded-full bg-gold/15 px-2 py-0.5 text-[11px] font-semibold text-gold">{t.pricing.save}</span>
                )}
              </button>
            ))}
          </div>
        </div>

        <ul className="mx-auto mt-12 grid max-w-6xl items-stretch gap-6 lg:grid-cols-3">
          {t.pricing.plans.map((plan, i) => {
            const highlighted = i === 1
            const monthly = MONTHLY_PRICES[i]
            const price = annual ? Math.round(monthly * 0.8) : monthly
            return (
              <li
                key={i}
                className={cn(
                  'relative rounded-2xl p-px',
                  highlighted
                    ? 'bg-gradient-to-b from-gold via-primary/70 to-primary/10 shadow-[0_0_80px_-20px_rgb(16_185_129/0.6)]'
                    : 'bg-white/[0.08]',
                )}
              >
                <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(1rem-1px)] bg-onyx p-7 sm:p-8">
                  {highlighted && (
                    <>
                      <ArabesquePattern className="text-gold opacity-[0.06] [mask-image:linear-gradient(to_bottom,black,transparent_60%)]" size={36} />
                      <span className="absolute end-6 top-6 rounded-full border border-gold/40 bg-gold/10 px-2.5 py-1 text-[11px] font-semibold text-gold">
                        {t.pricing.popular}
                      </span>
                    </>
                  )}
                  <h3 className="relative text-lg font-semibold text-foreground">{plan.name}</h3>
                  <p className="relative mt-1.5 text-sm text-muted-foreground">{plan.desc}</p>
                  <p className="relative mt-6 flex items-baseline gap-1">
                    <span className="text-5xl font-semibold tracking-tight text-foreground" dir="ltr">
                      ${price}
                    </span>
                    <span className="text-sm text-muted-foreground">{t.pricing.perMonth}</span>
                  </p>
                  <p className="relative mt-1 h-5 text-xs text-muted-foreground">
                    {monthly > 0 && (annual ? t.pricing.billedAnnually : t.pricing.billedMonthly)}
                  </p>
                  <button
                    type="button"
                    onClick={onSelect}
                    className={cn(
                      'relative mt-6 h-11 rounded-xl text-sm font-semibold transition-all',
                      highlighted
                        ? 'bg-primary text-primary-foreground shadow-[0_0_32px_-6px_rgb(16_185_129/0.8)] hover:bg-mint'
                        : 'border border-white/10 bg-white/[0.04] text-foreground hover:bg-white/[0.08]',
                    )}
                  >
                    {plan.cta}
                  </button>
                  <ul className="relative mt-8 space-y-3 border-t border-white/[0.06] pt-6">
                    {plan.features.map((f) => (
                      <li key={f} className="flex items-start gap-3 text-sm text-zinc-300">
                        <Check className={cn('mt-0.5 size-4 shrink-0', highlighted ? 'text-gold' : 'text-mint')} aria-hidden="true" />
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
