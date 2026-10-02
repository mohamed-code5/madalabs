'use client'

import { useEffect, useRef, useState } from 'react'
import { ChevronDown, Database, FileCode2, FolderOpen, Globe } from 'lucide-react'
import { cn } from '@/lib/utils'
import { CodeLine } from '../code-line'
import { useI18n } from '../i18n'
import { FILES, TREE, type WorkspaceFile } from './files'

const GENERATED_NAME = 'index.html'

function FileIcon({ name, className }: { name: string; className?: string }) {
  if (name.endsWith('.sql')) return <Database className={cn('text-gold', className)} aria-hidden="true" />
  if (name.endsWith('.html')) return <Globe className={cn('text-mint', className)} aria-hidden="true" />
  return <FileCode2 className={cn('text-sky-400', className)} aria-hidden="true" />
}

type Props = { generatedHtml?: string; streaming: boolean }

export function CodeEditor({ generatedHtml, streaming }: Props) {
  const { t } = useI18n()
  const [tabs, setTabs] = useState(['page.tsx', 'schema.sql'])
  const [active, setActive] = useState('page.tsx')
  const scrollRef = useRef<HTMLPreElement>(null)

  const generatedFile: WorkspaceFile | null = generatedHtml
    ? { name: GENERATED_NAME, path: `public/${GENERATED_NAME}`, content: generatedHtml.split('\n') }
    : null
  const files = generatedFile ? [generatedFile, ...FILES] : FILES
  const tree = generatedFile ? [{ folder: 'public', files: [GENERATED_NAME] }, ...TREE] : TREE
  const visibleTabs = generatedFile && !tabs.includes(GENERATED_NAME) ? [GENERATED_NAME, ...tabs] : tabs
  const file = files.find((f) => f.name === active) ?? files[0]

  const hasGenerated = Boolean(generatedFile)
  useEffect(() => {
    if (!hasGenerated) return
    setTabs((prev) => (prev.includes(GENERATED_NAME) ? prev : [GENERATED_NAME, ...prev]))
    setActive(GENERATED_NAME)
  }, [hasGenerated])

  const lineCount = file.content.length
  useEffect(() => {
    if (streaming && active === GENERATED_NAME && scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [streaming, active, lineCount])

  const open = (name: string) => {
    setTabs((prev) => (prev.includes(name) ? prev : [...prev, name]))
    setActive(name)
  }

  return (
    <div dir="ltr" className="flex min-h-0 flex-1 overflow-hidden">
      <div className="hidden w-48 shrink-0 flex-col border-r border-white/[0.06] bg-black/20 md:flex">
        <h2 className="px-3 pb-2 pt-3 text-[11px] font-medium uppercase tracking-wider text-muted-foreground">{t.workspace.explorer}</h2>
        <ul className="space-y-0.5 px-1.5 text-[13px]">
          {tree.map((dir) => (
            <li key={dir.folder}>
              <div className="flex items-center gap-1.5 px-1.5 py-1 text-zinc-300">
                <ChevronDown className="size-3.5 text-zinc-500" aria-hidden="true" />
                <FolderOpen className="size-3.5 text-mint" aria-hidden="true" />
                {dir.folder}
              </div>
              <ul>
                {dir.files.map((name) => (
                  <li key={name}>
                    <button
                      type="button"
                      onClick={() => open(name)}
                      className={cn(
                        'flex w-full items-center gap-1.5 rounded-md py-1 pl-8 pr-2 text-left transition-colors',
                        active === name ? 'bg-primary/10 text-foreground' : 'text-zinc-400 hover:bg-white/[0.04] hover:text-zinc-200',
                      )}
                    >
                      <FileIcon name={name} className="size-3.5" />
                      {name}
                    </button>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </div>

      <div className="flex min-w-0 flex-1 flex-col bg-[#0b0c11]">
        <div role="tablist" aria-label="Open files" className="flex h-10 shrink-0 items-end overflow-x-auto border-b border-white/[0.06] bg-black/30">
          {visibleTabs.map((name) => (
            <button
              key={name}
              type="button"
              role="tab"
              aria-selected={active === name}
              onClick={() => setActive(name)}
              className={cn(
                'relative flex h-full items-center gap-2 border-r border-white/[0.06] px-4 font-mono text-xs transition-colors',
                active === name ? 'bg-[#0b0c11] text-foreground' : 'text-muted-foreground hover:text-zinc-200',
              )}
            >
              {active === name && <span className="absolute inset-x-0 top-0 h-px bg-mint" aria-hidden="true" />}
              <FileIcon name={name} className="size-3.5" />
              {name}
              {name === GENERATED_NAME && streaming && <span className="size-1.5 animate-pulse rounded-full bg-mint" aria-hidden="true" />}
            </button>
          ))}
        </div>
        <div className="flex h-7 shrink-0 items-center px-4 font-mono text-[11px] text-zinc-500">{file.path.split('/').join(' › ')}</div>
        <pre
          ref={scrollRef}
          role="tabpanel"
          aria-label={file.name}
          aria-busy={streaming && file.name === GENERATED_NAME}
          className="min-h-0 flex-1 overflow-auto pb-32 font-mono text-[13px] leading-6"
        >
          {file.content.map((line, i) => (
            <div key={i} className="flex hover:bg-white/[0.02]">
              <span className="w-12 shrink-0 select-none pr-4 text-right text-zinc-600">{i + 1}</span>
              <CodeLine line={line} />
            </div>
          ))}
        </pre>
      </div>
    </div>
  )
}
