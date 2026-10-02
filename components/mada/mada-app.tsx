'use client'

import { useState } from 'react'
import { Architecture } from './architecture'
import { Features } from './features'
import { Footer } from './footer'
import { Header, type View } from './header'
import { Hero } from './hero'
import { I18nProvider } from './i18n'
import { Pricing } from './pricing'
import { WorkspaceView } from './workspace/workspace-view'

export function MadaApp() {
  const [view, setView] = useState<View>('landing')

  const changeView = (next: View) => {
    setView(next)
    if (next === 'workspace') window.scrollTo({ top: 0 })
  }

  return (
    <I18nProvider>
      <Header view={view} onViewChange={changeView} />
      {view === 'landing' ? (
        <main>
          <Hero onStart={() => changeView('workspace')} />
          <Features />
          <Architecture />
          <Pricing onSelect={() => changeView('workspace')} />
          <Footer />
        </main>
      ) : (
        <main>
          <WorkspaceView />
        </main>
      )}
    </I18nProvider>
  )
}
