// src/app/admin/posts/[id]/page.tsx
import { notFound } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import PostEditor from '@/components/admin/PostEditor'

export default async function EditPostPage({ params }: { params: { id: string } }) {
  const post = await prisma.post.findUnique({ where: { id: params.id } })
  if (!post) notFound()
  return <PostEditor initialData={post} />
}
