import { genPageMetadata } from 'app/seo'
import writeForUsData from '@/data/writeForUsData'
import Button from '@/components/Button'

export const metadata = genPageMetadata({ title: 'Write For Us' })

export default function WriteForUsPage() {
  return (
    <div className="w-full">
      <div className="full-bleed bg-navy mb-12 px-4 py-16 text-white sm:px-8 lg:px-16">
        <div className="mx-auto">
          <p className="text-gold mb-3 text-sm font-semibold tracking-widest uppercase">
            Contribute
          </p>
          <h1 className="text-4xl font-bold md:text-5xl">Write For Us</h1>
          <p className="mt-4 text-lg text-gray-300">
            TSI Publication Guidelines for Contributing Authors
          </p>
        </div>
      </div>

      <div className="prose prose-lg dark:prose-invert max-w-none px-4 sm:px-8 lg:px-16">
        <p className="text-xl leading-relaxed font-medium text-gray-700 dark:text-gray-300">
          {writeForUsData.intro}
        </p>

        <div className="not-prose bg-navy my-8 rounded-lg p-6 text-white">
          <h3 className="text-gold mb-3 text-lg font-bold">How to Submit</h3>
          <p className="text-gray-300">
            To submit a piece, write to us at{' '}
            <a
              href={`mailto:${writeForUsData.submissionEmail}`}
              className="text-gold font-semibold hover:underline"
            >
              {writeForUsData.submissionEmail}
            </a>
            . Please use the subject line to indicate that you are sending a commentary along with
            its tentative title. Your email should also include a brief introduction about yourself
            and your area of expertise.
          </p>
        </div>

        <h2 className="text-navy dark:text-gold">Our Policy on Artificial Intelligence</h2>
        <p>{writeForUsData.aiPolicy}</p>

        <h2 className="text-navy dark:text-gold">Editorial Guidelines</h2>
        <ul>
          {writeForUsData.guidelines.map((g, i) => (
            <li key={i}>{g}</li>
          ))}
        </ul>

        <h2 className="text-navy dark:text-gold">Editorial Process</h2>
        <p>{writeForUsData.editorialProcess}</p>
        <p>
          TSI is committed to keeping all contributors informed and maintaining full transparency at
          every stage of the publication process.
        </p>
      </div>

      <div className="mt-12 px-4 text-center sm:px-8 lg:px-16">
        <Button
          href={`mailto:${writeForUsData.submissionEmail}?subject=Commentary Submission`}
          variant="primary"
          size="lg"
        >
          Submit Your Article
        </Button>
      </div>
    </div>
  )
}
