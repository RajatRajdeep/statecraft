import Image from '@/components/Image'
import Link from '@/components/Link'
import Tag from '@/components/Tag'
import Button from '@/components/Button'
import siteMetadata from '@/data/siteMetadata'
import { formatDate } from '@/data/formatDate'

const MAX_DISPLAY = 6

export default function Home({ posts }) {
  return (
    <>
      {/* Hero Section — full viewport width */}
      <div className="full-bleed bg-navy mb-12 px-4 py-20 text-white sm:px-8 lg:px-16">
        <div className="mx-auto max-w-4xl text-center">
          <p className="text-gold mb-4 text-sm font-semibold tracking-widest uppercase">
            The Statecraft Institute
          </p>
          <h1 className="mb-6 text-4xl leading-tight font-bold md:text-5xl">
            Calibrating Power. Interpreting Strategy
          </h1>
          <p className="mx-auto mb-8 max-w-2xl text-lg text-gray-300">
            In-depth research, policy briefs, and strategic analysis on geopolitics, defence,
            counter-terrorism, and international relations.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button href="/articles" variant="primary">
              Read Articles
            </Button>
            <Button href="/journal" variant="outline">
              NITIVYUH Journal
            </Button>
          </div>
        </div>
      </div>

      {/* Latest Articles — full viewport width */}
      <div className="full-bleed px-4 py-12 sm:px-8 lg:px-16 xl:px-24">
        <div className="mx-auto max-w-screen-2xl">
          <div className="mb-8">
            <h2 className="text-navy border-gold inline-block border-b-2 pb-2 text-2xl font-bold dark:text-gray-100">
              Latest Articles
            </h2>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {!posts.length && <p className="text-gray-500">No posts found.</p>}
            {posts.slice(0, MAX_DISPLAY).map((post) => {
              const { slug, date, title, summary, tags, images } = post
              return (
                <article
                  key={slug}
                  className="overflow-hidden rounded-lg border border-gray-200 shadow-sm transition-shadow hover:shadow-md dark:border-gray-700"
                >
                  {images && images[0] && (
                    <div className="h-48 overflow-hidden">
                      <Image
                        src={images[0]}
                        alt={title}
                        width={400}
                        height={192}
                        className="h-full w-full object-cover"
                      />
                    </div>
                  )}
                  <div className="p-5">
                    <div className="mb-2 flex flex-wrap gap-1">
                      {tags.slice(0, 2).map((tag) => (
                        <Tag key={tag} text={tag} />
                      ))}
                    </div>
                    <h3 className="mb-2 text-lg leading-snug font-bold">
                      <Link
                        href={`/articles/${slug}`}
                        className="text-navy hover:text-gold transition-colors dark:text-gray-100"
                      >
                        {title}
                      </Link>
                    </h3>
                    <p className="mb-3 line-clamp-2 text-sm text-gray-500 dark:text-gray-400">
                      {summary}
                    </p>
                    <div className="flex items-center justify-between">
                      <time className="text-xs text-gray-400" dateTime={date}>
                        {formatDate(date)}
                      </time>
                      <Link
                        href={`/articles/${slug}`}
                        className="text-gold text-xs font-semibold hover:underline"
                      >
                        Read more →
                      </Link>
                    </div>
                  </div>
                </article>
              )
            })}
          </div>
          {posts.length > MAX_DISPLAY && (
            <div className="mt-8 text-center">
              <Button href="/articles" variant="secondary">
                View All Articles →
              </Button>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
