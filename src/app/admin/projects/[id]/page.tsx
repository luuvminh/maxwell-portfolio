// src/app/admin/projects/[id]/page.tsx
import { notFound } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import ProjectEditor from '@/components/admin/ProjectEditor'

export default async function EditProjectPage({ params }: { params: { id: string } }) {
  const project = await prisma.project.findUnique({ where: { id: params.id } })
  if (!project) notFound()
  return <ProjectEditor initialData={project} />
}
