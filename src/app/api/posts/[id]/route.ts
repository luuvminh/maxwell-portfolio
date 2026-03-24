// src/app/api/posts/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const body = await req.json()
  const { title, excerpt, content, tags, published, featured, coverImage } = body

  const existing = await prisma.post.findUnique({ where: { id: params.id } })
  if (!existing) return NextResponse.json({ error: 'Not found' }, { status: 404 })

  const post = await prisma.post.update({
    where: { id: params.id },
    data: {
      title,
      excerpt,
      content,
      tags: tags || [],
      published,
      featured,
      coverImage: coverImage || null,
      publishedAt: published && !existing.publishedAt ? new Date() : existing.publishedAt,
    },
  })
  return NextResponse.json(post)
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  await prisma.post.delete({ where: { id: params.id } })
  return NextResponse.json({ ok: true })
}
