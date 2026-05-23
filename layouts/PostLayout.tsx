import { ReactNode } from 'react'
import { CoreContent } from 'pliny/utils/contentlayer'
import type { Blog, People } from 'contentlayer/generated'
import Comments from '@/components/Comments'
import Link from '@/components/Link'
import PageTitle from '@/components/PageTitle'
import SectionContainer from '@/components/SectionContainer'
import Image from '@/components/Image'
import Tag from '@/components/Tag'
import siteMetadata from '@/data/siteMetadata'
import ScrollTopAndComment from '@/components/ScrollTopAndComment'

const editUrl = (path) => `${siteMetadata.siteRepo}/blob/main/data/${path}`
const discussUrl = (path) =>
  `https://mobile.twitter.com/search?q=${encodeURIComponent(`${siteMetadata.siteUrl}/${path}`)}`

const postDateTemplate: Intl.DateTimeFormatOptions = {
  weekday: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric',
}

interface LayoutProps {
  content: CoreContent<Blog>
  authorDetails: CoreContent<People>[]
  next?: { path: string; title: string }
  prev?: { path: string; title: string }
  children: ReactNode
}

export default function PostLayout({ content, authorDetails, next, prev, children }: LayoutProps) {
  const { filePath, path, slug, date, title, tags } = content
  const basePath = path.split('/')[0]

  return (
    <SectionContainer>
      <ScrollTopAndComment />
      <article>
        <div className="px-4 sm:px-6 lg:px-8 xl:divide-y xl:divide-gray-200 xl:px-12 xl:dark:divide-gray-700">
          <header className="pt-12 xl:pt-16 xl:pb-6">
            <div className="space-y-1 text-center">
              <div>
                <PageTitle>{title}</PageTitle>
              </div>
            </div>
          </header>
          <div className="grid-rows-[auto_1fr] divide-y divide-gray-200 pb-8 xl:grid xl:grid-cols-4 xl:gap-x-6 xl:divide-y-0 dark:divide-gray-700">
            <dl className="border-b border-gray-200 pt-6 pb-10 xl:pt-11 dark:border-gray-700">
              <dt className="mb-2 text-right text-xs font-medium tracking-wide text-gray-500 uppercase xl:text-left dark:text-gray-400">
                {authorDetails.length > 1 ? 'Authors' : 'Author'}
              </dt>
              <dd>
                <ul className="flex flex-wrap justify-end gap-4 xl:block xl:space-y-8 xl:space-x-0">
                  {authorDetails.map((author, index) => (
                    <li key={author.slug ?? index}>
                      {/* Mobile: circular avatar */}
                      <div className="flex items-center space-x-2 xl:hidden">
                        {author.avatar && (
                          <Image
                            src={author.avatar}
                            width={38}
                            height={38}
                            alt={author.name}
                            className="h-10 w-10 rounded-full object-cover"
                          />
                        )}
                        <Link
                          href={`/authors/${author.slug}`}
                          className="text-sm font-medium text-gray-900 hover:text-[#c9a84c] dark:text-gray-100 dark:hover:text-[#c9a84c]"
                        >
                          {author.name}
                        </Link>
                      </div>
                      {/* Desktop: full card */}
                      <div className="hidden w-5/6 overflow-hidden rounded-sm bg-[#f2ede8] xl:block dark:bg-gray-800">
                        {author.avatar && (
                          <div className="relative aspect-square w-full">
                            <Image
                              src={author.avatar}
                              fill
                              alt={author.name}
                              className="object-cover object-top"
                            />
                          </div>
                        )}
                        <div className="px-4 pt-4 pb-5 text-center">
                          <Link
                            href={`/authors/${author.slug}`}
                            className="text-lg font-bold text-gray-900 hover:text-[#c9a84c] dark:text-gray-100 dark:hover:text-[#c9a84c]"
                          >
                            {author.name}
                          </Link>
                          {author.occupation && (
                            <p className="mt-1 text-base leading-snug text-gray-500 dark:text-gray-400">
                              {author.occupation}
                            </p>
                          )}
                          {author.company && (
                            <p className="text-base leading-snug text-gray-500 dark:text-gray-400">
                              {author.company}
                            </p>
                          )}
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </dd>
              <div className="mt-6 border-t border-gray-200 pt-6 dark:border-gray-700">
                <dt className="text-right text-xs font-medium tracking-wide text-gray-500 uppercase xl:text-left dark:text-gray-400">
                  Published on
                </dt>
                <dd className="mt-1 text-right text-sm leading-6 text-gray-500 xl:text-left dark:text-gray-400">
                  <time dateTime={date}>
                    {new Date(date).toLocaleDateString(siteMetadata.locale, postDateTemplate)}
                  </time>
                </dd>
              </div>
            </dl>
            <div className="divide-y divide-gray-200 xl:col-span-3 xl:row-span-2 xl:pb-0 dark:divide-gray-700">
              <div className="prose dark:prose-invert max-w-none pt-10 pb-8 text-justify">
                {children}
              </div>
              {/* <div className="pt-6 pb-6 text-sm text-gray-700 dark:text-gray-300">
                <Link href={discussUrl(path)} rel="nofollow">
                  Discuss on Twitter
                </Link>
                {` • `}
                <Link href={editUrl(filePath)}>View on GitHub</Link>
              </div> */}
              {/* {siteMetadata.comments && (
                <div
                  className="pt-6 pb-6 text-center text-gray-700 dark:text-gray-300"
                  id="comment"
                >
                  <Comments slug={slug} />
                </div>
              )} */}
            </div>
            <footer>
              <div className="divide-gray-200 text-sm leading-5 font-medium xl:col-start-1 xl:row-start-2 xl:divide-y dark:divide-gray-700">
                {tags && (
                  <div className="py-4 xl:py-8">
                    <h2 className="text-xs tracking-wide text-gray-500 uppercase dark:text-gray-400">
                      Tags
                    </h2>
                    <div className="flex flex-wrap">
                      {tags.map((tag) => (
                        <Tag key={tag} text={tag} />
                      ))}
                    </div>
                  </div>
                )}
                {(next || prev) && (
                  <div className="flex justify-between py-4 xl:block xl:space-y-8 xl:py-8">
                    {prev && prev.path && (
                      <div>
                        <h2 className="text-xs tracking-wide text-gray-500 uppercase dark:text-gray-400">
                          Previous Article
                        </h2>
                        <div className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400">
                          <Link href={`/${prev.path}`}>{prev.title}</Link>
                        </div>
                      </div>
                    )}
                    {next && next.path && (
                      <div>
                        <h2 className="text-xs tracking-wide text-gray-500 uppercase dark:text-gray-400">
                          Next Article
                        </h2>
                        <div className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400">
                          <Link href={`/${next.path}`}>{next.title}</Link>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
              <div className="pt-4 xl:pt-8">
                <Link
                  href={`/${basePath}`}
                  className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
                  aria-label="Back to articles"
                >
                  &larr; Back to articles
                </Link>
              </div>
            </footer>
          </div>
        </div>
      </article>
    </SectionContainer>
  )
}
