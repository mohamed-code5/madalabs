'use client'

import { Play, Sparkles } from 'lucide-react'
import { useI18n } from './i18n'
import { HeroPreview } from './hero-preview'

export function Hero({ onStart }: { onStart: () => void }) {
  const { t, lang } = useI18n()

  return (
    <section id="top" className="relative overflow-hidden pt-16 sm:pt-24">
      <div aria-hidden="true" className="bg-grid absolute inset-0 [mask-image:radial-gradient(ellipse_70%_60%_at_50%_0%,black,transparent)]" />
      <div
        aria-hidden="true"
        className="animate-pulse-glow absolute start-1/2 top-[-12rem] h-[34rem] w-[60rem] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgb(16_185_129/0.28),transparent)] blur-2xl rtl:translate-x-1/2"
      />
      <div
        aria-hidden="true"
        className="absolute end-[-10rem] top-40 h-80 w-80 rounded-full bg-[radial-gradient(closest-side,rgb(245_158_11/0.14),transparent)] blur-2xl"
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3.5 py-1.5 text-xs font-medium text-mint shadow-[0_0_30px_-6px_rgb(16_185_129/0.6)]">
            <Sparkles className="size-3.5" aria-hidden="true" />
            {t.hero.badge}
          </span>

          <h1 className="mt-7 text-balance text-4xl font-semibold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">
            <span className="block text-foreground">{t.hero.title1}</span>
            <span className="text-gradient block pb-2">{t.hero.title2}</span>
          </h1>

          <p
            lang={lang === 'en' ? 'ar' : 'en'}
            dir={lang === 'en' ? 'rtl' : 'ltr'}
            className={
              lang === 'en'
                ? 'font-arabic mt-4 text-xl font-medium text-gold/90 sm:text-2xl'
                : 'mt-4 text-lg font-medium text-gold/90 sm:text-xl'
            }
          >
            {t.hero.sub}
          </p>

          <p className="mt-6 max-w-2xl text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
            {t.hero.paragraph}
          </p>

          <div className="mt-9 flex w-full flex-col items-center justify-center gap-3 sm:w-auto sm:flex-row">
            <button
              type="button"
              onClick={onStart}
              className="relative inline-flex h-12 w-full items-center justify-center rounded-xl bg-primary px-7 text-sm font-semibold text-primary-foreground shadow-[0_0_0_1px_rgb(52_211_153/0.5),0_0_40px_-4px_rgb(16_185_129/0.75)] transition-all hover:bg-mint hover:shadow-[0_0_0_1px_rgb(52_211_153/0.7),0_0_56px_-2px_rgb(16_185_129/0.9)] sm:w-auto"
            >
              {t.hero.primary}
            </button>
            <a
              href="#showcase"
              className="inline-flex h-12 w-full items-center justify-center gap-2.5 rounded-xl border border-white/10 bg-white/[0.03] px-6 text-sm font-medium text-foreground transition-colors hover:bg-white/[0.07] sm:w-auto"
            >
              <span className="flex size-6 items-center justify-center rounded-full bg-white/10">
                <Play className="size-3 fill-current" aria-hidden="true" />
              </span>
              {t.hero.secondary}
            </a>
          </div>

          <dl className="mt-12 grid w-full max-w-lg grid-cols-3 divide-x divide-white/[0.06] rtl:divide-x-reverse">
            {t.hero.stats.map((s) => (
              <div key={s.label} className="px-2">
                <dt className="sr-only">{s.label}</dt>
                <dd className="text-xl font-semibold text-foreground sm:text-2xl">{s.value}</dd>
                <dd className="mt-1 text-xs text-muted-foreground">{s.label}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div id="showcase" className="mt-16 scroll-mt-24 sm:mt-20">
          <HeroPreview />
        </div>
      </div>
    </section>
  )
}
