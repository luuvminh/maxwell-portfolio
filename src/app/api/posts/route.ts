// src/app/api/posts/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { generateSlug } from '@/lib/utils'

export async function GET() {
  const posts = await prisma.post.findMany({ orderBy: { createdAt: 'desc' } })
  return NextResponse.json(posts)
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const body = await req.json()
  const { title, excerpt, content, tags, published, featured, coverImage } = body

  const slug = generateSlug(title)

  const post = await prisma.post.create({
    data: {
      slug,
      title,
      excerpt,
      content,
      tags: tags || [],
      published: published || false,
      featured: featured || false,
      coverImage: coverImage || null,
      publishedAt: published ? new Date() : null,
    },
  })
  return NextResponse.json(post, { status: 201 })
}
