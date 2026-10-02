import { useId } from 'react'
import { cn } from '@/lib/utils'

export function LogoMark({ className }: { className?: string }) {
  const id = useId()
  return (
    <svg viewBox="0 0 32 32" fill="none" aria-hidden="true" className={cn('size-8', className)}>
      <defs>
        <linearGradient id={`${id}-g`} x1="4" y1="4" x2="28" y2="28" gradientUnits="userSpaceOnUse">
          <stop stopColor="#34D399" />
          <stop offset="0.65" stopColor="#10B981" />
          <stop offset="1" stopColor="#F59E0B" />
        </linearGradient>
      </defs>
      <rect x="0.75" y="0.75" width="30.5" height="30.5" rx="9" fill="#0F1117" stroke={`url(#${id}-g)`} strokeOpacity="0.6" strokeWidth="1.5" />
      <path
        d="M8 19V9.6c0-.9 1.1-1.4 1.7-.7L16 15.2l6.3-6.3c.6-.7 1.7-.2 1.7.7V19"
        stroke={`url(#${id}-g)`}
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10.4 24c0-1.3 1-2.3 2.3-2.3 2.3 0 4.3 4.6 6.6 4.6 1.3 0 2.3-1 2.3-2.3s-1-2.3-2.3-2.3c-2.3 0-4.3 4.6-6.6 4.6-1.3 0-2.3-1-2.3-2.3z"
        stroke={`url(#${id}-g)`}
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function Logo({ className }: { className?: string }) {
  return (
    <span className={cn('flex items-center gap-2.5', className)}>
      <LogoMark />
      <span className="text-[15px] font-semibold tracking-tight text-foreground" dir="ltr">
        Mada Labs
      </span>
      <span className="font-arabic rounded-md border border-primary/30 bg-primary/10 px-1.5 py-0.5 text-xs font-bold leading-none text-mint">
        مَدى
      </span>
    </span>
  )
}
