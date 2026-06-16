import { genPageMetadata } from 'app/seo'
import Link from '@/components/Link'
import Button from '@/components/Button'
import journalData from '@/data/journalData'

export const metadata = genPageMetadata({ title: 'NEETIVIYUH Journal' })

export default function JournalPage() {
  return (
    <div className="w-full">
      <div className="full-bleed bg-navy mb-12 px-4 py-16 text-white sm:px-8 lg:px-16">
        <div className="mx-auto">
          <p className="text-gold mb-3 text-sm font-semibold tracking-widest uppercase">
            Publication
          </p>
          <h1 className="text-4xl font-bold md:text-5xl">{journalData.name}</h1>
          <p className="text-gold mt-2 font-serif text-xl italic">{journalData.subtitle}</p>
          <p className="mt-4 text-base text-gray-300">Published by {journalData.publisher}</p>
        </div>
      </div>
      <div className="flex px-4 sm:px-8 lg:px-16">
        <div className="mb-12 grid grid-cols-1 gap-8 md:grid-cols-3">
          <div className="prose prose-lg dark:prose-invert max-w-none md:col-span-2">
            <h2 className="text-navy dark:text-gold">About {journalData.name}</h2>
            <p>{journalData.description}</p>

            <h2 className="text-navy dark:text-gold">Mission</h2>
            <p>{journalData.mission}</p>

            <h2 className="text-navy dark:text-gold">Editorial Standards</h2>
            <p>{journalData.editorialStandards}</p>

            <h2 className="text-navy dark:text-gold">Subject Areas</h2>
            <p>
              {journalData.name} welcomes manuscripts across a broad range of disciplines, including
              but not limited to:
            </p>
            <ul>
              {journalData.subjectAreas.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <div className="space-y-4">
            <div className="border-gold/30 rounded-lg border bg-gray-50 p-5 dark:bg-gray-800">
              <h3 className="text-navy dark:text-gold mb-3 text-sm font-bold tracking-wider uppercase">
                Publication Details
              </h3>
              <dl className="space-y-2 text-sm">
                <div>
                  <dt className="text-gray-500 dark:text-gray-400">Frequency</dt>
                  <dd className="font-medium">{journalData.frequency}</dd>
                </div>
                <div>
                  <dt className="text-gray-500 dark:text-gray-400">Language</dt>
                  <dd className="font-medium">{journalData.language}</dd>
                </div>
                <div>
                  <dt className="text-gray-500 dark:text-gray-400">Format</dt>
                  <dd className="font-medium">{journalData.format}</dd>
                </div>
                <div>
                  <dt className="text-gray-500 dark:text-gray-400">Publisher</dt>
                  <dd className="font-medium">{journalData.publisher}</dd>
                </div>
              </dl>
            </div>
            <div className="border-navy/20 rounded-lg border p-5 dark:border-gray-600">
              <h3 className="text-navy dark:text-gold mb-3 text-sm font-bold tracking-wider uppercase">
                Quick Links
              </h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/journal/author-guidelines" className="text-gold hover:underline">
                    Author Guidelines →
                  </Link>
                </li>
                <li>
                  <Link
                    href={`mailto:${journalData.submissionEmail}`}
                    className="text-gold hover:underline"
                  >
                    Submit Manuscript →
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* <div className="border-t border-gray-200 pt-8 text-center dark:border-gray-700">
          <p className="mb-4 text-gray-600 dark:text-gray-400">
            Interested in contributing to {journalData.name}?
          </p>
          <Button href="/journal/author-guidelines" variant="secondary">
            View Author Guidelines
          </Button>
        </div> */}
      </div>
    </div>
  )
}
