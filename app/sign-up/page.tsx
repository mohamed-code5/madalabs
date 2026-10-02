import type { Metadata } from 'next'
import { redirect } from 'next/navigation'
import { AuthForm } from '@/components/mada/auth-form'
import { getSessionUser } from '@/lib/auth'

export const metadata: Metadata = { title: 'Create account | Mada Labs' }

export default async function SignUpPage() {
  if (await getSessionUser()) redirect('/?view=workspace')
  return <AuthForm mode="sign-up" />
}
