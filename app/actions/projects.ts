'use server'

import { and, desc, eq } from 'drizzle-orm'
import { z } from 'zod'
import { getSessionUser } from '@/lib/auth'
import { db } from '@/lib/db'
import { projects } from '@/lib/db/schema'

async function getUserId() {
  const user = await getSessionUser()
  if (!user) throw new Error('Unauthorized')
  return user.id
}

export type ProjectSummary = { id: number; title: string; updatedAt: Date }
export type ProjectDetail = ProjectSummary & { prompt: string; html: string }

export async function listProjects(): Promise<ProjectSummary[]> {
  const userId = await getUserId()
  return db
    .select({ id: projects.id, title: projects.title, updatedAt: projects.updatedAt })
    .from(projects)
    .where(eq(projects.userId, userId))
    .orderBy(desc(projects.updatedAt))
    .limit(100)
}

export async function getProject(id: number): Promise<ProjectDetail | null> {
  const userId = await getUserId()
  const [row] = await db
    .select({
      id: projects.id,
      title: projects.title,
      updatedAt: projects.updatedAt,
      prompt: projects.prompt,
      html: projects.html,
    })
    .from(projects)
    .where(and(eq(projects.id, id), eq(projects.userId, userId)))
    .limit(1)
  return row ?? null
}

const saveSchema = z.object({
  id: z.number().int().positive().nullable(),
  prompt: z.string().trim().min(1).max(4000),
  html: z.string().min(1).max(200_000),
})

export async function saveProject(input: z.input<typeof saveSchema>): Promise<{ id: number }> {
  const userId = await getUserId()
  const { id, prompt, html } = saveSchema.parse(input)

  if (id !== null) {
    const [row] = await db
      .update(projects)
      .set({ prompt, html, updatedAt: new Date() })
      .where(and(eq(projects.id, id), eq(projects.userId, userId)))
      .returning({ id: projects.id })
    if (!row) throw new Error('Project not found')
    return row
  }

  const title = prompt.replace(/\s+/g, ' ').slice(0, 60)
  const [row] = await db.insert(projects).values({ userId, title, prompt, html }).returning({ id: projects.id })
  return row
}

export async function deleteProject(id: number) {
  const userId = await getUserId()
  await db.delete(projects).where(and(eq(projects.id, z.number().int().positive().parse(id)), eq(projects.userId, userId)))
}
