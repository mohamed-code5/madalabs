'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Architecture } from './architecture'
import { Features } from './features'
import { Footer } from './footer'
import { Header, type View } from './header'
import { Hero } from './hero'
import { I18nProvider } from './i18n'
import { Pricing } from './pricing'
import { WorkspaceView } from './workspace/workspace-view'

export type SessionUser = { name: string; email: string }

type Props = { user: SessionUser | null; initialView: View }

export function MadaApp({ user, initialView }: Props) {
  const router = useRouter()
  const [view, setView] = useState<View>(initialView)

  const changeView = (next: View) => {
    if (next === 'workspace' && !user) {
      router.push('/sign-in')
      return
    }
    setView(next)
    if (next === 'workspace') window.scrollTo({ top: 0 })
  }

  return (
    <I18nProvider>
      <Header view={view} onViewChange={changeView} />
      {view === 'workspace' && user ? (
        <main>
          <WorkspaceView user={user} />
        </main>
      ) : (
        <main>
          <Hero onStart={() => changeView('workspace')} />
          <Features />
          <Architecture />
          <Pricing onSelect={() => changeView('workspace')} />
          <Footer />
        </main>
      )}
    </I18nProvider>
  )
}
