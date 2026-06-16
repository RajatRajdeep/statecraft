import { notFound } from 'next/navigation'
import { allPeople, allBlogs } from 'contentlayer/generated'
import { coreContent, sortPosts, allCoreContent } from 'pliny/utils/contentlayer'
import { MDXLayoutRenderer } from 'pliny/mdx-components'
import { components } from '@/components/MDXComponents'
import Image from '@/components/Image'
import Link from '@/components/Link'
import { genPageMetadata } from 'app/seo'

export async function generateStaticParams() {
  return allPeople.filter((p) => p.isAuthor).map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const author = allPeople.find((p) => p.slug === slug && p.isAuthor)
  if (!author) return {}
  return genPageMetadata({ title: author.name })
}

export default async function AuthorPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const author = allPeople.find((p) => p.slug === slug && p.isAuthor)
  if (!author) return notFound()

  const articles = allCoreContent(
    sortPosts(allBlogs.filter((post) => post.authors?.includes(slug) && !post.draft))
  )

  return (
    <div className="mx-auto max-w-4xl">
      <div className="full-bleed bg-navy mb-12 px-4 py-16 text-white sm:px-8 lg:px-16">
        <div className="mx-auto flex max-w-4xl items-center gap-8">
          {author.avatar && (
            <Image
              src={author.avatar}
              alt={author.name}
              width={96}
              height={96}
              className="ring-gold h-24 w-24 flex-shrink-0 rounded-full object-cover ring-2"
            />
          )}
          <div>
            <p className="text-gold mb-1 text-sm font-semibold tracking-widest uppercase">Author</p>
            <h1 className="text-3xl font-bold md:text-4xl">{author.name}</h1>
            {author.occupation && <p className="mt-2 text-gray-300">{author.occupation}</p>}
            {author.company && <p className="text-gray-300">{author.company}</p>}
          </div>
        </div>
      </div>

      <div className="px-4 sm:px-8 lg:px-16">
        {author.body.raw.trim() && (
          <div className="prose dark:prose-invert mb-12 max-w-none">
            <MDXLayoutRenderer code={author.body.code} components={components} />
          </div>
        )}

        <h2 className="text-navy dark:text-gold mb-6 text-2xl font-bold">
          Commentaries by {author.name}
        </h2>

        {articles.length === 0 ? (
          <p className="text-gray-500">No commentaries published yet.</p>
        ) : (
          <ul className="divide-y divide-gray-200 dark:divide-gray-700">
            {articles.map((post) => (
              <li key={post.slug} className="py-6">
                <Link href={`/commentaries/${post.slug}`} className="group block">
                  <p className="text-gold mb-1 text-xs font-semibold tracking-widest uppercase">
                    {new Date(post.date).toLocaleDateString('en-GB', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric',
                    })}
                  </p>
                  <h3 className="group-hover:text-gold dark:group-hover:text-gold text-xl font-semibold transition-colors dark:text-white">
                    {post.title}
                  </h3>
                  {post.summary && (
                    <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-gray-600 dark:text-gray-400">
                      {post.summary}
                    </p>
                  )}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}
