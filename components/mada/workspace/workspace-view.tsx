'use client'

import { useState } from 'react'
import { useCompletion } from '@ai-sdk/react'
import { ChatBar } from './chat-bar'
import { CodeEditor } from './code-editor'
import { extractHtml } from './extract-html'
import { PreviewPanel } from './preview-panel'
import { MAX_CREDITS, WorkspaceSidebar } from './workspace-sidebar'

export function WorkspaceView() {
  const [project, setProject] = useState('Sharara Agency')
  const [credits, setCredits] = useState(MAX_CREDITS)
  const [htmlByProject, setHtmlByProject] = useState<Record<string, string>>({})
  const [revisionByProject, setRevisionByProject] = useState<Record<string, number>>({})

  const { completion, complete, isLoading, error, stop } = useCompletion({
    api: '/api/generate',
    streamProtocol: 'text',
    throttle: 80,
  })

  const savedHtml = htmlByProject[project]
  const streamingHtml = isLoading ? extractHtml(completion) : ''
  const editorHtml = isLoading ? streamingHtml : savedHtml

  const generate = async (prompt: string) => {
    const target = project
    const result = await complete(prompt, { body: { project: target, currentHtml: htmlByProject[target] } })
    const html = result ? extractHtml(result) : ''
    if (!html.includes('</html>')) return false
    setHtmlByProject((prev) => ({ ...prev, [target]: html }))
    setRevisionByProject((prev) => ({ ...prev, [target]: (prev[target] ?? 0) + 1 }))
    setCredits((c) => Math.max(0, c - 1))
    return true
  }

  return (
    <div className="flex lg:h-[calc(100dvh-4rem)]">
      <WorkspaceSidebar activeProject={project} onSelect={setProject} credits={credits} disabled={isLoading} />
      <div className="relative flex min-w-0 flex-1 flex-col lg:flex-row">
        <div className="relative flex h-[60dvh] min-w-0 flex-1 flex-col lg:h-auto">
          <CodeEditor generatedHtml={editorHtml} streaming={isLoading} />
        </div>
        <PreviewPanel
          project={project}
          html={savedHtml}
          revision={revisionByProject[project] ?? 0}
          building={isLoading}
        />
        <ChatBar credits={credits} onGenerate={generate} onStop={stop} pending={isLoading} error={error} />
      </div>
    </div>
  )
}
