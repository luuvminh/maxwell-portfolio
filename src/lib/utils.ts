// src/lib/utils.ts
import { clsx, type ClassValue } from 'clsx'
import { format, formatDistanceToNow } from 'date-fns'

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs)
}

export function formatDate(date: Date | string): string {
  return format(new Date(date), 'MMMM d, yyyy')
}

export function formatRelative(date: Date | string): string {
  return formatDistanceToNow(new Date(date), { addSuffix: true })
}

export function truncate(str: string, length: number): string {
  if (str.length <= length) return str
  return str.slice(0, length).trimEnd() + '...'
}

export function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim()
}

export async function getSiteSettings(): Promise<Record<string, string>> {
  // Dynamic import to avoid issues in edge runtime
  const { prisma } = await import('./prisma')
  const settings = await prisma.siteSettings.findMany()
  return Object.fromEntries(settings.map(s => [s.key, s.value]))
}
