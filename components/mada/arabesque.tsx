import { useId } from 'react'
import { cn } from '@/lib/utils'

/** Tiled eight-point star lattice (khatam) used as a subtle mashrabiya overlay. */
export function ArabesquePattern({ className, size = 48 }: { className?: string; size?: number }) {
  const id = useId()
  const h = size / 2
  const q = size * 0.3
  return (
    <svg aria-hidden="true" className={cn('pointer-events-none absolute inset-0 size-full', className)}>
      <defs>
        <pattern id={id} width={size} height={size} patternUnits="userSpaceOnUse">
          <g fill="none" stroke="currentColor" strokeWidth="0.75">
            <rect x={h - q} y={h - q} width={q * 2} height={q * 2} />
            <rect x={h - q} y={h - q} width={q * 2} height={q * 2} transform={`rotate(45 ${h} ${h})`} />
            <circle cx={h} cy={h} r={q * 0.45} />
            <path d={`M0 0L${h - q} ${h - q}M${size} 0L${h + q} ${h - q}M0 ${size}L${h - q} ${h + q}M${size} ${size}L${h + q} ${h + q}`} />
          </g>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${id})`} />
    </svg>
  )
}

/** Single eight-point star used as a corner accent. */
export function StarAccent({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" fill="none" aria-hidden="true" className={className}>
      <g stroke="currentColor" strokeWidth="1">
        <rect x="8" y="8" width="24" height="24" />
        <rect x="8" y="8" width="24" height="24" transform="rotate(45 20 20)" />
        <circle cx="20" cy="20" r="5" />
      </g>
    </svg>
  )
}
