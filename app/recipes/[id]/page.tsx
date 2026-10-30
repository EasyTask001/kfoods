import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, ArrowUpRight } from 'lucide-react'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { recipes, getRecipeById } from '@/lib/recipes-data'

export function generateStaticParams() {
  return recipes.map((recipe) => ({ id: recipe.id }))
}
export const dynamicParams = false

export default async function RecipeDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const recipe = getRecipeById(id)
  if (!recipe) notFound()
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Recipe',
    name: recipe.title,
    description: recipe.description,
    image: recipe.image,
    author: { '@type': 'Organization', name: 'K Foods' },
    prepTime: `PT${parseInt(recipe.prepTime)}M`,
    cookTime: `PT${parseInt(recipe.cookTime)}M`,
    recipeYield: recipe.servings,
    recipeIngredient: recipe.ingredients,
    recipeInstructions: recipe.instructions.map((text, index) => ({
      '@type': 'HowToStep',
      position: index + 1,
      text,
    })),
  }
  return (
    <>
      <Header />
      <main id="main-content" tabIndex={-1}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(schema).replace(/</g, '\u003c'),
          }}
        />
        <section className="editorial-hero">
          <div className="site-shell">
            <Link href="/recipes" className="text-link mb-6">
              <ArrowLeft size={15} aria-hidden="true" /> Back to recipes
            </Link>
            <p className="eyebrow">
              {recipe.category.toUpperCase()} RECIPE ·{' '}
              {recipe.difficulty.toUpperCase()}
            </p>
            <h1>{recipe.title}</h1>
            <p>{recipe.description}</p>
            <dl className="flex flex-wrap gap-8 text-sm mt-7">
              <div>
                <dt className="text-muted-foreground">Prep time</dt>
                <dd>{recipe.prepTime}</dd>
              </div>
              <div>
                <dt className="text-muted-foreground">Cook time</dt>
                <dd>{recipe.cookTime}</dd>
              </div>
              <div>
                <dt className="text-muted-foreground">Servings</dt>
                <dd>{recipe.servings}</dd>
              </div>
            </dl>
          </div>
        </section>
        <section className="site-shell section-space">
          <div className="relative aspect-[16/9] overflow-hidden rounded-sm mb-12">
            <Image
              src={recipe.image}
              alt={recipe.title}
              fill
              priority
              sizes="(max-width: 700px) 100vw, 90vw"
              className="object-cover"
            />
          </div>
          <div className="grid md:grid-cols-[.8fr_1.2fr] gap-12">
            <section>
              <h2 className="font-serif text-3xl mb-6">Ingredients</h2>
              <ul className="list-disc pl-5 space-y-3 text-sm text-muted-foreground">
                {recipe.ingredients.map((ingredient) => (
                  <li key={ingredient}>{ingredient}</li>
                ))}
              </ul>
            </section>
            <section>
              <h2 className="font-serif text-3xl mb-6">Instructions</h2>
              <ol className="list-decimal pl-5 space-y-5 text-sm leading-loose">
                {recipe.instructions.map((instruction) => (
                  <li className="pl-3" key={instruction}>
                    {instruction}
                  </li>
                ))}
              </ol>
              {recipe.tips && (
                <aside className="bg-secondary p-6 mt-8">
                  <h3 className="font-serif text-xl mb-3">Kitchen notes</h3>
                  <ul className="list-disc pl-5 space-y-2 text-sm">
                    {recipe.tips.map((tip) => (
                      <li key={tip}>{tip}</li>
                    ))}
                  </ul>
                </aside>
              )}
            </section>
          </div>
          <div className="catalogue-trade">
            <h2>Start with the main ingredient.</h2>
            <Link
              href={`/products/${recipe.mainProduct}`}
              className="site-button"
            >
              Explore the product <ArrowUpRight size={17} aria-hidden="true" />
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
