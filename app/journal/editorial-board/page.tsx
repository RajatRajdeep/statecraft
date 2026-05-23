import { genPageMetadata } from 'app/seo'
import { allPeople } from 'contentlayer/generated'
import Image from '@/components/Image'
import Link from '@/components/Link'

export const metadata = genPageMetadata({ title: 'Editorial Board' })

const editorialBoard = allPeople
  .filter((p) => p.isBoardMember && p.boardSection === 'editorial')
  .sort((a, b) => (a.boardOrder ?? 99) - (b.boardOrder ?? 99))

const advisoryBoard = allPeople
  .filter((p) => p.isBoardMember && p.boardSection === 'advisory')
  .sort((a, b) => (a.boardOrder ?? 99) - (b.boardOrder ?? 99))

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

function MemberCard({
  person,
  showLink = true,
  showRole = true,
}: {
  person: (typeof allPeople)[number]
  showLink?: boolean
  showRole?: boolean
}) {
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
      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-navy text-base font-bold dark:text-white">{person.name}</h3>
        {showRole && (
          <p className="text-gold mt-0.5 mb-2 text-sm font-semibold">{person.boardRole}</p>
        )}
        <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-400">
          {person.occupation}
        </p>
        <p className="mt-1 text-sm leading-relaxed text-gray-500 dark:text-gray-500">
          {person.company}
        </p>
        {showLink && person.profileUrl && (
          <a
            href={person.profileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gold hover:text-gold/70 mt-6 self-start text-sm font-semibold transition-colors"
          >
            View Profile →
          </a>
        )}
        {showLink && person.isAuthor && !person.profileUrl && (
          <Link
            href={`/authors/${person.slug}`}
            className="text-gold hover:text-gold/70 mt-6 self-start text-sm font-semibold transition-colors"
          >
            View Profile →
          </Link>
        )}
      </div>
    </div>
  )
}

function BoardSection({
  title,
  subtitle,
  members,
  showLinks = true,
  showRoles = true,
}: {
  title: string
  subtitle: string
  members: typeof allPeople
  showLinks?: boolean
  showRoles?: boolean
}) {
  return (
    <section className="mb-14">
      <div className="mb-8 border-b border-gray-200 pb-4 dark:border-gray-700">
        <h2 className="text-navy text-2xl font-bold dark:text-white">{title}</h2>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{subtitle}</p>
      </div>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {members.map((person) => (
          <MemberCard key={person.slug} person={person} showLink={showLinks} showRole={showRoles} />
        ))}
      </div>
    </section>
  )
}

export default function BoardPage() {
  return (
    <div className="w-full">
      <div className="full-bleed bg-navy mb-12 px-4 py-16 text-white sm:px-8 lg:px-16">
        <div className="mx-auto">
          <p className="text-gold mb-3 text-sm font-semibold tracking-widest uppercase">
            NITIVYUH Quarterly Journal
          </p>
          <h1 className="text-4xl font-bold md:text-5xl">Editorial Board</h1>
          <p className="mt-4 text-lg text-gray-300">
            The scholars and practitioners who guide the editorial direction and intellectual
            standards of NITIVYUH.
          </p>
        </div>
      </div>

      <div className="px-4 pb-16 sm:px-8 lg:px-16">
        <BoardSection
          title="Editorial Team"
          subtitle="Responsible for editorial decisions, peer review coordination, and publication standards."
          members={editorialBoard}
          showLinks={false}
        />
        <BoardSection
          title="Editorial Advisory Board"
          subtitle="Distinguished experts who provide strategic guidance and academic mentorship to the journal."
          members={advisoryBoard}
          showRoles={false}
        />
      </div>
    </div>
  )
}
