import { genPageMetadata } from 'app/seo'
import { allPeople } from 'contentlayer/generated'
import Image from '@/components/Image'

export const metadata = genPageMetadata({ title: 'Our Team' })

const team = allPeople
  .filter((p) => p.isBoardMember && p.boardSection === 'editorial')
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

export default function TeamPage() {
  return (
    <div className="w-full">
      <div className="full-bleed bg-navy mb-12 px-4 py-16 text-white sm:px-8 lg:px-16">
        <div className="mx-auto">
          <p className="text-gold mb-3 text-sm font-semibold tracking-widest uppercase">
            The Statecraft Institute
          </p>
          <h1 className="text-4xl font-bold md:text-5xl">Our Team</h1>
        </div>
      </div>

      <div className="px-4 pb-16 sm:px-8 lg:px-16">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {team.map((person) => (
            <div key={person.slug} className="flex flex-col">
              <div className="aspect-square overflow-hidden rounded-lg bg-gray-100 dark:bg-gray-800">
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
              <div className="mt-4">
                <h3 className="text-navy text-base font-bold dark:text-white">{person.name}</h3>
                <p className="mt-1 text-sm leading-relaxed text-gray-500 dark:text-gray-400">
                  {person.company}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
