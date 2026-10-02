import { MadaApp } from '@/components/mada/mada-app'
import { getSessionUser } from '@/lib/auth'

export default async function Page({ searchParams }: { searchParams: Promise<{ view?: string }> }) {
  const [{ view }, user] = await Promise.all([searchParams, getSessionUser()])
  const initialView = view === 'workspace' && user ? 'workspace' : 'landing'

  return <MadaApp user={user ? { name: user.name, email: user.email } : null} initialView={initialView} />
}
