import Image from '@/components/Image'
import Link from '@/components/Link'
import type { AuthorInfo } from '@/data/authorMap'

/** Avatar-initials fallback when an author has no photo. */
function Initials({ name }: { name: string }) {
  const initials = name
    .replace(/^Dr\.?\s+/, '')
    .split(' ')
    .slice(0, 2)
    .map((w) => w[0])
    .join('')
    .toUpperCase()
  return (
    <div className="bg-navy flex h-full w-full items-center justify-center">
      <span className="text-gold text-xs font-bold">{initials}</span>
    </div>
  )
}

/**
 * Compact author card: photo, name and title. Renders one row per author; each
 * links to the author's profile page. Used on the home grid and publication
 * listings.
 */
export default function AuthorCard({
  authors,
  className = '',
}: {
  authors: AuthorInfo[]
  className?: string
}) {
  if (!authors.length) return null
  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      {authors.map((author) => (
        <Link
          key={author.slug}
          href={`/authors/${author.slug}`}
          className="group flex items-center gap-2.5"
        >
          <div className="h-9 w-9 shrink-0 overflow-hidden rounded-full bg-gray-100 dark:bg-gray-800">
            {author.avatar ? (
              <Image
                src={author.avatar}
                alt={author.name}
                width={36}
                height={36}
                className="h-full w-full object-cover object-top"
              />
            ) : (
              <Initials name={author.name} />
            )}
          </div>
          <div className="min-w-0">
            <p className="text-navy group-hover:text-gold truncate text-sm font-semibold transition-colors dark:text-gray-100">
              {author.name}
            </p>
            {author.occupation && (
              <p className="truncate text-xs text-gray-500 dark:text-gray-400">
                {author.occupation}
              </p>
            )}
          </div>
        </Link>
      ))}
    </div>
  )
}
