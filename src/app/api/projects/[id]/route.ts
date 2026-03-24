// src/app/api/projects/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const body = await req.json()
  const project = await prisma.project.update({
    where: { id: params.id },
    data: {
      title: body.title,
      description: body.description,
      content: body.content,
      tags: body.tags || [],
      liveUrl: body.liveUrl || null,
      githubUrl: body.githubUrl || null,
      published: body.published,
      featured: body.featured,
      coverImage: body.coverImage || null,
      order: body.order || 0,
    },
  })
  return NextResponse.json(project)
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  await prisma.project.delete({ where: { id: params.id } })
  return NextResponse.json({ ok: true })
}
