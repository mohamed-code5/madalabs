'use client'

import { useState, type FormEvent } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { ArrowLeft, Loader2 } from 'lucide-react'
import { authClient } from '@/lib/auth-client'
import { LanguageSwitch } from './header'
import { I18nProvider, useI18n } from './i18n'
import { Logo } from './logo'

type Mode = 'sign-in' | 'sign-up'

export function AuthForm({ mode }: { mode: Mode }) {
  return (
    <I18nProvider>
      <AuthFormInner mode={mode} />
    </I18nProvider>
  )
}

function AuthFormInner({ mode }: { mode: Mode }) {
  const { t } = useI18n()
  const router = useRouter()
  const [pending, setPending] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const isSignUp = mode === 'sign-up'

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = new FormData(e.currentTarget)
    const email = String(form.get('email') ?? '').trim()
    const password = String(form.get('password') ?? '')
    const name = String(form.get('name') ?? '').trim()

    setPending(true)
    setError(null)
    const { error: authError } = isSignUp
      ? await authClient.signUp.email({ email, password, name: name || email.split('@')[0] })
      : await authClient.signIn.email({ email, password })
    setPending(false)

    if (authError) {
      console.error('Auth failed:', authError.message)
      setError(t.auth.error)
      return
    }
    router.push('/?view=workspace')
    router.refresh()
  }

  const inputClass =
    'h-11 w-full rounded-lg border border-white/10 bg-white/[0.03] px-3.5 text-sm text-foreground placeholder:text-muted-foreground/60 outline-none transition-colors focus:border-emerald-400/60 focus:ring-2 focus:ring-emerald-400/20'

  return (
    <main className="flex min-h-dvh flex-col px-4 py-6">
      <div className="mx-auto flex w-full max-w-md items-center justify-between">
        <Link href="/" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground">
          <ArrowLeft className="size-4 rtl:-scale-x-100" aria-hidden="true" />
          {t.auth.back}
        </Link>
        <LanguageSwitch />
      </div>

      <div className="flex flex-1 items-center justify-center py-10">
        <div className="w-full max-w-md rounded-2xl border border-white/[0.08] bg-card/60 p-8 shadow-2xl">
          <Logo />
          <h1 className="mt-8 text-balance text-2xl font-semibold text-foreground">
            {isSignUp ? t.auth.signUpTitle : t.auth.signInTitle}
          </h1>
          <p className="mt-1.5 text-sm text-muted-foreground">{isSignUp ? t.auth.signUpSub : t.auth.signInSub}</p>

          <form onSubmit={onSubmit} className="mt-8 flex flex-col gap-4">
            {isSignUp && (
              <div className="flex flex-col gap-1.5">
                <label htmlFor="name" className="text-sm font-medium text-foreground">
                  {t.auth.name}
                </label>
                <input id="name" name="name" autoComplete="name" maxLength={80} className={inputClass} />
              </div>
            )}
            <div className="flex flex-col gap-1.5">
              <label htmlFor="email" className="text-sm font-medium text-foreground">
                {t.auth.email}
              </label>
              <input id="email" name="email" type="email" required autoComplete="email" dir="ltr" className={inputClass} />
            </div>
            <div className="flex flex-col gap-1.5">
              <label htmlFor="password" className="text-sm font-medium text-foreground">
                {t.auth.password}
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                minLength={8}
                maxLength={128}
                autoComplete={isSignUp ? 'new-password' : 'current-password'}
                aria-describedby={isSignUp ? 'password-hint' : undefined}
                dir="ltr"
                className={inputClass}
              />
              {isSignUp && (
                <p id="password-hint" className="text-xs text-muted-foreground">
                  {t.auth.passwordHint}
                </p>
              )}
            </div>

            {error && (
              <p role="alert" className="rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-2 text-sm text-red-300">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={pending}
              className="mt-2 inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-emerald-500 via-emerald-400 to-amber-400 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-60"
            >
              {pending && <Loader2 className="size-4 animate-spin" aria-hidden="true" />}
              {pending ? t.auth.pending : isSignUp ? t.auth.submitSignUp : t.auth.submitSignIn}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-muted-foreground">
            {isSignUp ? t.auth.toSignIn : t.auth.toSignUp}{' '}
            <Link href={isSignUp ? '/sign-in' : '/sign-up'} className="font-medium text-mint hover:underline">
              {isSignUp ? t.auth.toSignInLink : t.auth.toSignUpLink}
            </Link>
          </p>
        </div>
      </div>
    </main>
  )
}
