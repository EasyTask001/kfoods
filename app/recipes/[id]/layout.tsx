import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import { notFound } from 'next/navigation'
import { getRecipeById } from '@/lib/recipes-data'
import { createPageMetadata } from '@/lib/seo'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>
}): Promise<Metadata> {
  const { id } = await params
  const recipe = getRecipeById(id)
  if (!recipe) notFound()
  return createPageMetadata({
    title: recipe.title,
    description: recipe.description,
    path: `/recipes/${recipe.id}`,
    image: recipe.image,
  })
}

export default function RecipeLayout({ children }: { children: ReactNode }) {
  return children
}
