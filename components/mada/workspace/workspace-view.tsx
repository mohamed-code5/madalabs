'use client'

import { useState } from 'react'
import { ChatBar } from './chat-bar'
import { CodeEditor } from './code-editor'
import { PreviewPanel } from './preview-panel'
import { MAX_CREDITS, WorkspaceSidebar } from './workspace-sidebar'

const SIMULATED_GENERATION_MS = 1800

export function WorkspaceView() {
  const [project, setProject] = useState('Sharara Agency')
  const [credits, setCredits] = useState(MAX_CREDITS)
  const [revision, setRevision] = useState(0)

  const generate = async () => {
    await new Promise((resolve) => setTimeout(resolve, SIMULATED_GENERATION_MS))
    setCredits((c) => Math.max(0, c - 1))
    setRevision((r) => r + 1)
  }

  return (
    <div className="flex lg:h-[calc(100dvh-4rem)]">
      <WorkspaceSidebar activeProject={project} onSelect={setProject} credits={credits} />
      <div className="relative flex min-w-0 flex-1 flex-col lg:flex-row">
        <div className="relative flex h-[60dvh] min-w-0 flex-1 flex-col lg:h-auto">
          <CodeEditor />
        </div>
        <PreviewPanel project={project} revision={revision} />
        <ChatBar credits={credits} onGenerate={generate} />
      </div>
    </div>
  )
}
