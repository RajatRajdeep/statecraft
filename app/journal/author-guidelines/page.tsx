import { genPageMetadata } from 'app/seo'
import journalData from '@/data/journalData'

export const metadata = genPageMetadata({ title: 'Author Guidelines - NITIVYUH' })

export default function AuthorGuidelinesPage() {
  const { authorGuidelines, name, submissionEmail } = journalData

  return (
    <div className="w-full">
      <div className="full-bleed bg-navy mb-12 px-4 py-16 text-white sm:px-8 lg:px-16">
        <div className="mx-auto">
          <p className="text-gold mb-3 text-sm font-semibold tracking-widest uppercase">
            {name} Journal
          </p>
          <h1 className="text-4xl font-bold md:text-5xl">Author Guidelines</h1>
        </div>
      </div>

      <div className="prose prose-lg dark:prose-invert max-w-none px-4 sm:px-8 lg:px-16">
        <h2 className="text-navy dark:text-gold">Submission Requirements</h2>
        <ul>
          <li>Manuscripts must be original and not under review elsewhere</li>
          <li>
            Recommended length: <strong>{authorGuidelines.wordCount}</strong>
          </li>
          <li>Abstract: {authorGuidelines.abstractLength}</li>
          <li>Keywords: {authorGuidelines.keywords}</li>
          <li>File format: {authorGuidelines.fileFormat}</li>
          <li>
            Font: All English submissions in Times New Roman, size 12, amd Hindi submissions in
            Krutidev010, size 14. A standard double line spacing(2.0) is required for both.
          </li>
        </ul>

        <h2 className="text-navy dark:text-gold">Citation Style</h2>
        <p>
          {name} uses the <strong>{authorGuidelines.citationStyle}</strong> format. All citations
          must be complete and verifiable. Avoid ibid. for online citations.
        </p>

        <h2 className="text-navy dark:text-gold">Anonymisation</h2>
        <p>
          Since manuscripts undergo double-blind peer review, authors must ensure that the submitted
          manuscript contains no identifying information. A separate cover page must be submitted
          with the author's name, institutional affiliation, email address, and a brief biographical
          note (100 words).
        </p>

        <h2 className="text-navy dark:text-gold">Review Process</h2>
        <ol>
          {authorGuidelines.reviewProcess.map((step) => (
            <li key={step}>{step}</li>
          ))}
        </ol>

        <h2 className="text-navy dark:text-gold">How to Submit</h2>
        <p>
          Send your manuscript and cover page as separate attachments to{' '}
          <a href={`mailto:${submissionEmail}`} className="text-gold">
            {submissionEmail}
          </a>{' '}
          with the subject line: <strong>{name} Submission – [Title of Paper]</strong>.
        </p>

        <div className="not-prose bg-navy/5 border-gold/30 mt-8 rounded-lg border p-6 dark:bg-gray-800">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            <strong className="text-navy dark:text-gold">Note on AI:</strong> Consistent with TSI's
            editorial policy, the use of generative AI tools in the drafting or development of
            manuscripts submitted to {name} is not permitted. Only grammar and spell-checking use is
            allowed, and must be disclosed.
          </p>
        </div>
      </div>
    </div>
  )
}
