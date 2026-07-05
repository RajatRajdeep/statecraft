import { notFound } from 'next/navigation'
import { allPeople, allPublications } from 'contentlayer/generated'
import { coreContent, sortPosts, allCoreContent } from 'pliny/utils/contentlayer'
import { MDXLayoutRenderer } from 'pliny/mdx-components'
import { components } from '@/components/MDXComponents'
import Image from '@/components/Image'
import Link from '@/components/Link'
import Tag from '@/components/Tag'
import CategoryBadge from '@/components/CategoryBadge'
import { formatDate } from '@/data/formatDate'
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

  const commentaries = allCoreContent(
    sortPosts(allPublications.filter((post) => post.authors?.includes(slug) && !post.draft))
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
          Publications by {author.name}
        </h2>

        {commentaries.length === 0 ? (
          <p className="text-gray-500">No publications yet.</p>
        ) : (
          <ul>
            {commentaries.map((post) => (
              <li
                key={post.slug}
                className="border-b border-gray-200 py-6 last:border-0 dark:border-gray-700"
              >
                <article className="flex flex-col space-y-2 xl:space-y-0">
                  <dl>
                    <dt className="sr-only">Published on</dt>
                    <dd className="flex items-center gap-3 text-base leading-6 font-medium text-gray-500 dark:text-gray-400">
                      <time dateTime={post.date} suppressHydrationWarning>
                        {formatDate(post.date)}
                      </time>
                      <CategoryBadge type={post.pubType} variant="chip" className="ml-auto" />
                    </dd>
                  </dl>
                  <div className="space-y-3">
                    <div>
                      <h2 className="text-2xl leading-8 font-bold tracking-tight">
                        <Link href={`/${post.path}`} className="text-gray-900 dark:text-gray-100">
                          {post.title}
                        </Link>
                      </h2>
                      <div className="flex flex-wrap">
                        {post.tags?.map((tag) => (
                          <Tag key={tag} text={tag} />
                        ))}
                      </div>
                    </div>
                    {post.summary && (
                      <div className="prose max-w-none text-gray-500 dark:text-gray-400">
                        {post.summary}
                      </div>
                    )}
                  </div>
                </article>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}
