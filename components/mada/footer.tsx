'use client'

import { MessageCircle } from 'lucide-react'
import { GithubIcon as Github, XIcon as Twitter } from './brand-icons'
import { Logo } from './logo'
import { useI18n } from './i18n'

export function Footer() {
  const { t } = useI18n()
  return (
    <footer id="docs" className="relative overflow-hidden border-t border-white/[0.06] bg-onyx/40">
      <span
        aria-hidden="true"
        lang="ar"
        className="font-arabic pointer-events-none absolute -bottom-16 start-1/2 -translate-x-1/2 select-none text-[18rem] font-extrabold leading-none text-white/[0.025] sm:text-[24rem] rtl:translate-x-1/2"
      >
        مَدى
      </span>

      <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_repeat(4,1fr)]">
          <div>
            <Logo />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">{t.footer.tagline}</p>
            <div className="mt-6 flex gap-2">
              {[
                { icon: MessageCircle, label: 'Discord' },
                { icon: Twitter, label: 'X' },
                { icon: Github, label: 'GitHub' },
              ].map(({ icon: Icon, label }) => (
                <a
                  key={label}
                  href="#"
                  aria-label={label}
                  className="flex size-9 items-center justify-center rounded-lg border border-white/10 text-muted-foreground transition-colors hover:border-primary/40 hover:text-mint"
                >
                  <Icon className="size-4" aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>
          {t.footer.cols.map((col) => (
            <nav key={col.title} aria-label={col.title}>
              <h3 className="text-sm font-semibold text-foreground">{col.title}</h3>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((l) => (
                  <li key={l}>
                    <a href="#" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>
        <div className="mt-16 flex flex-col gap-4 border-t border-white/[0.06] pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-muted-foreground">{t.footer.copyright}</p>
          <p className="flex items-center gap-2 text-xs text-muted-foreground">
            <span className="size-1.5 rounded-full bg-mint" />
            All systems operational
          </p>
        </div>
      </div>
    </footer>
  )
}
