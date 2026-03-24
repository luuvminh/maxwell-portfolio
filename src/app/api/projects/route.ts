// src/app/api/projects/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { generateSlug } from '@/lib/utils'

export async function GET() {
  const projects = await prisma.project.findMany({ orderBy: [{ order: 'asc' }, { createdAt: 'desc' }] })
  return NextResponse.json(projects)
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const body = await req.json()
  const { title, description, content, tags, liveUrl, githubUrl, published, featured, coverImage, order } = body

  const project = await prisma.project.create({
    data: {
      slug: generateSlug(title),
      title, description, content,
      tags: tags || [],
      liveUrl: liveUrl || null,
      githubUrl: githubUrl || null,
      published: published || false,
      featured: featured || false,
      coverImage: coverImage || null,
      order: order || 0,
    },
  })
  return NextResponse.json(project, { status: 201 })
}
