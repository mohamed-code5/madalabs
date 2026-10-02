'use client'

import { useState } from 'react'
import useSWR from 'swr'
import { useCompletion } from '@ai-sdk/react'
import { deleteProject, getProject, listProjects, saveProject } from '@/app/actions/projects'
import type { SessionUser } from '../mada-app'
import { useI18n } from '../i18n'
import { ChatBar } from './chat-bar'
import { CodeEditor } from './code-editor'
import { extractHtml } from './extract-html'
import { PreviewPanel } from './preview-panel'
import { MAX_CREDITS, WorkspaceSidebar } from './workspace-sidebar'

export function WorkspaceView({ user }: { user: SessionUser }) {
  const { t } = useI18n()
  const [selectedId, setSelectedId] = useState<number | null | undefined>(undefined)
  const [credits, setCredits] = useState(MAX_CREDITS)
  const [revision, setRevision] = useState(0)
  const [saveError, setSaveError] = useState(false)

  const { data: projects, mutate: mutateProjects } = useSWR('projects', () => listProjects())
  const activeId = selectedId === undefined ? (projects?.[0]?.id ?? null) : selectedId
  const { data: active, mutate: mutateActive } = useSWR(activeId ? ['project', activeId] : null, ([, id]) =>
    getProject(id as number),
  )

  const { completion, complete, isLoading, error, stop } = useCompletion({
    api: '/api/generate',
    streamProtocol: 'text',
    throttle: 80,
  })

  const savedHtml = activeId ? active?.html : undefined
  const editorHtml = isLoading ? extractHtml(completion) : savedHtml
  const title = activeId ? (active?.title ?? projects?.find((p) => p.id === activeId)?.title ?? '') : t.workspace.newDraft

  const generate = async (prompt: string) => {
    const targetId = activeId
    setSaveError(false)
    const result = await complete(prompt, { body: { project: title, currentHtml: savedHtml } })
    const html = result ? extractHtml(result) : ''
    if (!html.includes('</html>')) return false

    try {
      const { id } = await saveProject({ id: targetId, prompt, html })
      await mutateActive()
      await mutateProjects()
      setSelectedId(id)
      setRevision((r) => r + 1)
      setCredits((c) => Math.max(0, c - 1))
      return true
    } catch (err) {
      console.error('Saving project failed:', err)
      setSaveError(true)
      return false
    }
  }

  const remove = async (id: number) => {
    await deleteProject(id)
    if (id === activeId) setSelectedId(undefined)
    await mutateProjects()
  }

  return (
    <div className="flex lg:h-[calc(100dvh-4rem)]">
      <WorkspaceSidebar
        projects={projects}
        activeId={activeId}
        onSelect={setSelectedId}
        onNew={() => setSelectedId(null)}
        onDelete={remove}
        credits={credits}
        disabled={isLoading}
        user={user}
      />
      <div className="relative flex min-w-0 flex-1 flex-col lg:flex-row">
        <div className="relative flex h-[60dvh] min-w-0 flex-1 flex-col lg:h-auto">
          <CodeEditor generatedHtml={editorHtml} streaming={isLoading} />
        </div>
        <PreviewPanel project={title} html={savedHtml} revision={revision} building={isLoading} />
        <ChatBar
          credits={credits}
          onGenerate={generate}
          onStop={stop}
          pending={isLoading}
          error={error ?? (saveError ? new Error(t.workspace.saveError) : undefined)}
        />
      </div>
    </div>
  )
}
