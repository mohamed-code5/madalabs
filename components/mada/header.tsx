'use client'

import { useState } from 'react'
import { ArrowUpRight, LayoutTemplate, Menu, PanelsTopLeft, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Logo } from './logo'
import { useI18n, type Lang } from './i18n'

export type View = 'landing' | 'workspace'

type HeaderProps = { view: View; onViewChange: (view: View) => void }

export function Header({ view, onViewChange }: HeaderProps) {
  const { t } = useI18n()
  const [open, setOpen] = useState(false)

  const links = [
    { href: '#features', label: t.nav.features },
    { href: '#pricing', label: t.nav.pricing },
    { href: '#architecture', label: t.nav.architecture },
    { href: '#docs', label: t.nav.docs },
    { href: '#showcase', label: t.nav.showcase },
  ]

  const goTo = () => {
    onViewChange('landing')
    setOpen(false)
  }

  return (
    <header className="glass sticky top-0 z-50 border-b border-white/[0.06]">
      <div className="mx-auto flex h-16 max-w-7xl items-center gap-4 px-4 sm:px-6">
        <a href="#top" onClick={goTo} aria-label="Mada Labs home" className="shrink-0">
          <Logo />
        </a>

        <nav aria-label="Primary" className="hidden flex-1 justify-center lg:flex">
          <ul className="flex items-center gap-1">
            {links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={goTo}
                  className="rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="ms-auto flex items-center gap-2 lg:ms-0">
          <ViewToggle view={view} onViewChange={onViewChange} />
          <LanguageSwitch />
          <button
            type="button"
            onClick={() => onViewChange('workspace')}
            className="group relative hidden h-9 items-center gap-1.5 overflow-hidden rounded-lg bg-gradient-to-r from-emerald-500 via-emerald-400 to-amber-400 px-4 text-sm font-semibold text-primary-foreground shadow-[0_0_24px_-6px_rgb(16_185_129/0.7)] transition-transform hover:scale-[1.02] md:inline-flex"
          >
            <span
              aria-hidden="true"
              className="animate-shimmer absolute inset-0 bg-gradient-to-r from-transparent via-white/45 to-transparent"
            />
            <span className="relative">{t.nav.launch}</span>
            <ArrowUpRight className="relative size-4 rtl:-scale-x-100" aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            className="inline-flex size-9 items-center justify-center rounded-lg border border-white/10 text-muted-foreground hover:text-foreground lg:hidden"
          >
            {open ? <X className="size-4" aria-hidden="true" /> : <Menu className="size-4" aria-hidden="true" />}
            <span className="sr-only">{t.nav.menu}</span>
          </button>
        </div>
      </div>

      {open && (
        <nav id="mobile-nav" aria-label="Mobile" className="border-t border-white/[0.06] px-4 pb-4 lg:hidden">
          <ul className="flex flex-col py-2">
            {links.map((link) => (
              <li key={link.href}>
                <a href={link.href} onClick={goTo} className="block rounded-md px-2 py-2.5 text-sm text-muted-foreground hover:text-foreground">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <button
            type="button"
            onClick={() => {
              onViewChange('workspace')
              setOpen(false)
            }}
            className="mt-1 w-full rounded-lg bg-primary py-2.5 text-sm font-semibold text-primary-foreground"
          >
            {t.nav.launch}
          </button>
        </nav>
      )}
    </header>
  )
}

function ViewToggle({ view, onViewChange }: HeaderProps) {
  const { t } = useI18n()
  const options = [
    { value: 'landing' as const, label: t.nav.landing, icon: LayoutTemplate },
    { value: 'workspace' as const, label: t.nav.workspace, icon: PanelsTopLeft },
  ]
  return (
    <div role="tablist" aria-label={t.nav.viewLabel} className="flex rounded-lg border border-white/10 bg-white/[0.03] p-0.5">
      {options.map(({ value, label, icon: Icon }) => (
        <button
          key={value}
          type="button"
          role="tab"
          aria-selected={view === value}
          onClick={() => onViewChange(value)}
          className={cn(
            'inline-flex h-8 items-center gap-1.5 rounded-md px-2.5 text-xs font-medium transition-colors',
            view === value ? 'bg-white/10 text-foreground' : 'text-muted-foreground hover:text-foreground',
          )}
        >
          <Icon className="size-3.5" aria-hidden="true" />
          <span className="hidden sm:inline">{label}</span>
          <span className="sr-only sm:hidden">{label}</span>
        </button>
      ))}
    </div>
  )
}

export function LanguageSwitch() {
  const { lang, setLang } = useI18n()
  const options: { value: Lang; label: string }[] = [
    { value: 'en', label: 'EN' },
    { value: 'ar', label: 'العربية' },
  ]
  return (
    <div role="group" aria-label="Language" className="flex rounded-lg border border-white/10 bg-white/[0.03] p-0.5">
      {options.map((o) => (
        <button
          key={o.value}
          type="button"
          lang={o.value}
          aria-pressed={lang === o.value}
          onClick={() => setLang(o.value)}
          className={cn(
            'h-8 rounded-md px-2.5 text-xs font-semibold transition-colors',
            o.value === 'ar' && 'font-arabic',
            lang === o.value ? 'bg-primary/15 text-mint' : 'text-muted-foreground hover:text-foreground',
          )}
        >
          {o.label}
        </button>
      ))}
    </div>
  )
}
