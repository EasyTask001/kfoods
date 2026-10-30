import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { recipes } from '@/lib/recipes-data'

export default async function RecipesPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>
}) {
  const { category } = await searchParams
  const filter = category === 'rice' || category === 'dal' ? category : 'all'
  const shown =
    filter === 'all'
      ? recipes
      : recipes.filter((recipe) => recipe.category === filter)
  return (
    <>
      <Header />
      <main id="main-content" tabIndex={-1}>
        <section className="editorial-hero">
          <div className="site-shell">
            <p className="eyebrow">FROM PANTRY TO PLATE</p>
            <h1>Something good is cooking.</h1>
            <p>
              Simple inspiration for fragrant rice, comforting dals and
              flavour-filled meals. Explore our existing recipe collection and
              make it your own.
            </p>
          </div>
        </section>
        <section className="site-shell section-space">
          <nav
            aria-label="Recipe categories"
            className="flex flex-wrap gap-3 mb-10"
          >
            {[
              ['all', 'All recipes'],
              ['dal', 'Dal recipes'],
              ['rice', 'Rice recipes'],
            ].map(([value, label]) => (
              <Link
                key={value}
                href={
                  value === 'all' ? '/recipes' : `/recipes?category=${value}`
                }
                aria-current={filter === value ? 'page' : undefined}
                className={
                  filter === value
                    ? 'site-button'
                    : 'site-button !bg-transparent !text-primary'
                }
              >
                {label}
              </Link>
            ))}
          </nav>
          <div className="recipe-preview-grid">
            {shown.map((recipe) => (
              <Link
                href={`/recipes/${recipe.id}`}
                className="recipe-preview"
                key={recipe.id}
              >
                <div>
                  <Image
                    src={recipe.image}
                    alt={recipe.title}
                    fill
                    loading="eager"
                    sizes="(max-width: 700px) 100vw, 33vw"
                  />
                </div>
                <p className="eyebrow">
                  {recipe.cookTime} COOK TIME ·{' '}
                  {recipe.difficulty.toUpperCase()}
                </p>
                <h2 className="font-serif text-2xl mt-2 flex items-center justify-between gap-4">
                  {recipe.title}
                  <ArrowUpRight size={18} aria-hidden="true" />
                </h2>
                <p className="text-sm text-muted-foreground mt-3 leading-relaxed">
                  {recipe.description}
                </p>
              </Link>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
