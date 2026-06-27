import { genPageMetadata } from 'app/seo'
import { allPeople } from 'contentlayer/generated'
import Image from '@/components/Image'
import Link from '@/components/Link'

export const metadata = genPageMetadata({ title: 'Expert Contributors' })

const expertContributors = allPeople
  .filter((p) => p.isExpertContributor)
  .sort((a, b) => a.name.localeCompare(b.name))

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
      <span className="text-gold text-3xl font-bold">{initials}</span>
    </div>
  )
}

function ContributorCard({ person }: { person: (typeof allPeople)[number] }) {
  return (
    <div className="flex flex-col overflow-hidden rounded-lg border border-gray-200 transition-shadow hover:shadow-lg dark:border-gray-700">
      <div className="aspect-square overflow-hidden bg-gray-100 dark:bg-gray-800">
        {person.avatar ? (
          <Image
            src={person.avatar}
            alt={person.name}
            width={400}
            height={400}
            className="h-full w-full object-cover object-top"
          />
        ) : (
          <Initials name={person.name} />
        )}
      </div>
      <div className="flex flex-1 flex-col p-4">
        <h3 className="text-navy text-sm font-bold dark:text-white">{person.name}</h3>
        <p className="mt-0.5 text-xs leading-relaxed text-gray-600 dark:text-gray-400">
          {person.occupation}
        </p>
        <p className="mt-1 text-xs leading-relaxed text-gray-500 dark:text-gray-500">
          {person.company}
        </p>
        {person.profileUrl ? (
          <a
            href={person.profileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gold hover:text-gold/70 mt-4 self-start text-xs font-semibold transition-colors"
          >
            View Profile →
          </a>
        ) : person.isAuthor ? (
          <Link
            href={`/authors/${person.slug}`}
            className="text-gold hover:text-gold/70 mt-4 self-start text-xs font-semibold transition-colors"
          >
            View Profile →
          </Link>
        ) : null}
      </div>
    </div>
  )
}

export default function ExpertContributorsPage() {
  return (
    <div className="w-full">
      <div className="full-bleed bg-navy mb-12 px-4 py-16 text-white sm:px-8 lg:px-16">
        <div className="mx-auto">
          <h1 className="text-4xl font-bold md:text-5xl">Expert Contributors</h1>
          <p className="mt-4 text-lg text-gray-300">
            Scholars and practitioners who share their expertise.
          </p>
        </div>
      </div>

      <div className="px-4 pb-16 sm:px-8 lg:px-16">
        {expertContributors.length === 0 ? (
          <p className="text-gray-500">No expert contributors listed yet.</p>
        ) : (
          <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {expertContributors.map((person) => (
              <ContributorCard key={person.slug} person={person} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
