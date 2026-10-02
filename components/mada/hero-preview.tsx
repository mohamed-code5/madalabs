'use client'

import { useEffect, useState } from 'react'
import { Bot, Check, CreditCard, Globe, Lock, RefreshCw, ShoppingBag, TrendingUp, Users } from 'lucide-react'
import { CodeLine } from './code-line'
import { LogoMark } from './logo'

const STREAM_CODE = [
  "import { createCheckout } from '@/lib/pay'",
  '',
  'export async function POST(req: Request) {',
  '  const { cart, locale } = await req.json()',
  "  const session = await createCheckout({",
  "    currency: 'SAR',",
  '    items: cart.items,',
  "    dir: locale === 'ar' ? 'rtl' : 'ltr',",
  '  })',
  '  return Response.json(session)',
  '}',
]

function useStreamedLength(total: number) {
  const [length, setLength] = useState(0)
  useEffect(() => {
    const id = setInterval(() => {
      setLength((n) => (n >= total + 60 ? 0 : n + 2))
    }, 30)
    return () => clearInterval(id)
  }, [total])
  return Math.min(length, total)
}

export function HeroPreview() {
  const fullText = STREAM_CODE.join('\n')
  const visible = useStreamedLength(fullText.length)
  const shownLines = fullText.slice(0, visible).split('\n')
  const done = visible >= fullText.length

  return (
    <div className="relative [perspective:2400px]">
      <div aria-hidden="true" className="absolute inset-x-10 -top-6 h-40 rounded-full bg-primary/20 blur-3xl" />
      <div
        dir="ltr"
        className="relative overflow-hidden rounded-2xl border border-white/10 bg-onyx/90 shadow-[0_40px_120px_-30px_rgb(0_0_0/0.9),0_0_0_1px_rgb(255_255_255/0.03)] transition-transform duration-700 ease-out [transform:rotateX(14deg)_scale(0.97)] hover:[transform:rotateX(0deg)_scale(1)] motion-reduce:[transform:none]"
      >
        <div className="flex h-11 items-center gap-3 border-b border-white/[0.06] bg-white/[0.02] px-4">
          <div className="flex gap-1.5" aria-hidden="true">
            <span className="size-3 rounded-full bg-[#ff5f57]/80" />
            <span className="size-3 rounded-full bg-[#febc2e]/80" />
            <span className="size-3 rounded-full bg-[#28c840]/80" />
          </div>
          <div className="mx-auto flex items-center gap-2 rounded-md border border-white/[0.06] bg-black/30 px-3 py-1 text-xs text-muted-foreground">
            <Lock className="size-3" aria-hidden="true" />
            mada.dev/w/souq-express
          </div>
          <span className="hidden items-center gap-1.5 text-xs text-mint sm:flex">
            <span className="size-1.5 animate-pulse rounded-full bg-mint" />
            Live
          </span>
        </div>

        <div className="grid min-h-[480px] md:grid-cols-[minmax(0,5fr)_minmax(0,8fr)]">
          <ChatPane />
          <div className="flex flex-col border-t border-white/[0.06] bg-black/20 md:border-t-0 md:border-l">
            <div className="flex h-9 items-center gap-2 border-b border-white/[0.06] px-3 text-xs text-muted-foreground">
              <Globe className="size-3.5" aria-hidden="true" />
              <span>localhost:3000/dashboard</span>
              <RefreshCw className="ml-auto size-3.5" aria-hidden="true" />
            </div>
            <PreviewDashboard />
            <div className="border-t border-white/[0.06] bg-black/40 p-3 font-mono text-[11.5px] leading-5">
              <div className="mb-2 flex items-center gap-2 text-[11px] text-muted-foreground">
                <span className="rounded bg-white/5 px-1.5 py-0.5 text-zinc-300">app/api/checkout/route.ts</span>
                <span className={done ? 'text-mint' : 'text-gold'}>{done ? '✓ compiled in 412ms' : 'streaming…'}</span>
              </div>
              <pre className="h-[176px] overflow-hidden" aria-label="Streaming generated code">
                {shownLines.map((line, i) => (
                  <div key={i} className="flex">
                    <span className="w-6 shrink-0 select-none text-zinc-600">{i + 1}</span>
                    <CodeLine line={line} />
                    {i === shownLines.length - 1 && !done && (
                      <span className="animate-caret ml-px inline-block h-4 w-[7px] translate-y-0.5 bg-mint" />
                    )}
                  </div>
                ))}
              </pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function ChatPane() {
  return (
    <div className="flex flex-col gap-4 p-4 sm:p-5">
      <Message align="end" lang="ar">
        أنشئ منصة تجارة إلكترونية مع بوابة دفع سريعة
      </Message>
      <AgentMessage>
        <p>
          On it. Scaffolding a bilingual storefront with an RTL-first layout, a Supabase product catalog, and a
          one-tap checkout route.
        </p>
        <ul className="mt-3 space-y-1.5 text-xs">
          {['Created app/(store)/layout.tsx', 'Provisioned products + orders tables', 'Wired /api/checkout'].map(
            (step) => (
              <li key={step} className="flex items-center gap-2 text-zinc-400">
                <Check className="size-3.5 text-mint" aria-hidden="true" />
                <span className="font-mono">{step}</span>
              </li>
            ),
          )}
        </ul>
      </AgentMessage>
      <Message align="end">Add a revenue dashboard with live orders.</Message>
      <AgentMessage>
        <span className="flex items-center gap-2 text-zinc-300">
          <span className="flex gap-1" aria-hidden="true">
            <span className="size-1.5 animate-bounce rounded-full bg-mint [animation-delay:-0.3s]" />
            <span className="size-1.5 animate-bounce rounded-full bg-mint [animation-delay:-0.15s]" />
            <span className="size-1.5 animate-bounce rounded-full bg-mint" />
          </span>
          Generating dashboard…
        </span>
      </AgentMessage>
    </div>
  )
}

function Message({ children, align, lang }: { children: React.ReactNode; align: 'end'; lang?: string }) {
  return (
    <div className={align === 'end' ? 'flex justify-end' : 'flex'}>
      <p
        lang={lang}
        dir={lang === 'ar' ? 'rtl' : 'ltr'}
        className={`max-w-[85%] rounded-2xl rounded-br-md border border-white/[0.06] bg-white/[0.06] px-3.5 py-2.5 text-sm text-zinc-100 ${lang === 'ar' ? 'font-arabic' : ''}`}
      >
        {children}
      </p>
    </div>
  )
}

function AgentMessage({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex gap-2.5">
      <LogoMark className="size-7 shrink-0" />
      <div className="min-w-0 flex-1 rounded-2xl rounded-tl-md border border-primary/15 bg-primary/[0.05] px-3.5 py-2.5 text-sm leading-relaxed text-zinc-300">
        {children}
      </div>
    </div>
  )
}

const BARS = [38, 52, 44, 68, 59, 82, 74, 91, 66, 88, 95, 78]

function PreviewDashboard() {
  return (
    <div className="flex-1 p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <ShoppingBag className="size-4 text-mint" aria-hidden="true" />
          <span className="text-sm font-semibold text-zinc-100">Souq Express</span>
          <span className="font-arabic text-xs text-zinc-500">سوق إكسبريس</span>
        </div>
        <Bot className="size-4 text-zinc-500" aria-hidden="true" />
      </div>
      <div className="mt-4 grid grid-cols-3 gap-2.5">
        {[
          { label: 'Revenue', value: 'SAR 84.2k', icon: TrendingUp, delta: '+18%' },
          { label: 'Orders', value: '1,284', icon: CreditCard, delta: '+9%' },
          { label: 'Customers', value: '6,930', icon: Users, delta: '+24%' },
        ].map(({ label, value, icon: Icon, delta }) => (
          <div key={label} className="rounded-lg border border-white/[0.06] bg-white/[0.03] p-2.5">
            <div className="flex items-center justify-between text-[10px] text-zinc-500">
              {label}
              <Icon className="size-3" aria-hidden="true" />
            </div>
            <div className="mt-1 text-sm font-semibold text-zinc-100">{value}</div>
            <div className="text-[10px] text-mint">{delta}</div>
          </div>
        ))}
      </div>
      <div className="mt-3 flex h-24 items-end gap-1.5 rounded-lg border border-white/[0.06] bg-white/[0.02] p-2.5">
        {BARS.map((h, i) => (
          <div
            key={i}
            className={`flex-1 rounded-sm ${i === BARS.length - 2 ? 'bg-gold' : 'bg-gradient-to-t from-emerald-600/60 to-emerald-400'}`}
            style={{ height: `${h}%` }}
          />
        ))}
      </div>
    </div>
  )
}
