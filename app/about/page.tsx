import { genPageMetadata } from 'app/seo'
import aboutData from '@/data/aboutData'

export const metadata = genPageMetadata({ title: 'About Us' })

export default function AboutPage() {
  return (
    <div className="w-full">
      <div className="full-bleed bg-navy mb-12 px-4 py-16 text-white sm:px-8 lg:px-16">
        <div className="mx-auto">
          <p className="text-gold mb-3 text-sm font-semibold tracking-widest uppercase">
            Who We Are
          </p>
          <h1 className="text-4xl font-bold md:text-5xl">{aboutData.name}</h1>
        </div>
      </div>

      <div className="prose prose-lg dark:prose-invert max-w-none px-4 sm:px-8 lg:px-16">
        <p className="text-xl leading-relaxed font-medium text-gray-700 dark:text-gray-300">
          {aboutData.description}
        </p>

        <p>{aboutData.founding}</p>

        <h2 className="text-navy dark:text-gold">Our Work</h2>
        <p>
          Our work spans the full architecture of contemporary security affairs. We publish in-depth
          research papers, policy briefs, strategic commentaries, and long-form analyses on themes
          including:
        </p>

        <div className="not-prose my-8 grid grid-cols-1 gap-4 md:grid-cols-2">
          {aboutData.topics.map((topic) => (
            <div key={topic} className="border-gold flex items-center gap-3 border-l-4 py-2 pl-4">
              <span className="font-medium text-gray-700 dark:text-gray-300">{topic}</span>
            </div>
          ))}
        </div>

        <p>{aboutData.focus}</p>

        <h2 className="text-navy dark:text-gold">Our Commitment</h2>
        <p>{aboutData.commitment}</p>

        <blockquote className="border-gold text-navy not-prose my-8 border-l-4 bg-gray-50 p-6 text-xl italic dark:bg-gray-800 dark:text-gray-200">
          "{aboutData.tagline}"
        </blockquote>
      </div>
    </div>
  )
}
