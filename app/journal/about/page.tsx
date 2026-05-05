import { genPageMetadata } from 'app/seo'
import journalData from '@/data/journalData'

export const metadata = genPageMetadata({ title: 'About NITIVYUH Journal' })

export default function JournalAboutPage() {
  return (
    <div className="mx-auto max-w-4xl">
      <div className="full-bleed bg-navy mb-12 px-4 py-16 text-white sm:px-8 lg:px-16">
        <div className="mx-auto max-w-4xl">
          <p className="text-gold mb-3 text-sm font-semibold tracking-widest uppercase">
            {journalData.name} Journal
          </p>
          <h1 className="text-4xl font-bold md:text-5xl">About the Journal</h1>
        </div>
      </div>

      <div className="prose prose-lg dark:prose-invert max-w-none px-4 sm:px-8 lg:px-16">
        <p className="text-xl leading-relaxed font-medium text-gray-700 dark:text-gray-300">
          {journalData.name} is the peer-reviewed flagship journal of {journalData.publisher},
          dedicated to scholarly inquiry at the crossroads of history, society, and politics.
        </p>

        <h2 className="text-navy dark:text-gold">Mission</h2>
        <p>{journalData.mission}</p>

        <h2 className="text-navy dark:text-gold">Editorial Standards</h2>
        <p>
          All submissions to {journalData.name} undergo a double-blind peer review process conducted
          by subject-matter experts. The editorial board maintains strict standards of academic
          rigour, originality, and relevance. We are committed to publishing work that advances
          knowledge while remaining accessible to both academic and policy audiences.
        </p>

        <h2 className="text-navy dark:text-gold">Subject Areas</h2>
        <p>
          {journalData.name} welcomes manuscripts across a broad range of disciplines, including but
          not limited to:
        </p>
        <ul>
          {journalData.scope.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>

        <h2 className="text-navy dark:text-gold">Editorial Board</h2>
        <p>
          The journal is guided by a distinguished editorial board comprising academics, former
          diplomats, and strategic affairs specialists drawn from leading institutions across India
          and abroad.
        </p>
      </div>
    </div>
  )
}
