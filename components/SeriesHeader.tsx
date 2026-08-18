import Link from '@/components/Link'
import type { ResearchSeries } from '@/data/researchSeriesData'

/** Masthead for a research series landing page. */
export default function SeriesHeader({ series }: { series: ResearchSeries }) {
  return (
    <section className="mt-6 mb-10 border-b border-gray-200 pb-8 dark:border-gray-700">
      <Link
        href="/research-projects"
        className="hover:text-gold text-xs font-semibold tracking-widest text-gray-500 uppercase transition-colors dark:text-gray-400"
      >
        &larr; All Series
      </Link>
      <h1 className="text-navy mt-3 text-3xl leading-tight font-extrabold tracking-tight sm:text-4xl dark:text-gray-100">
        {series.title}
      </h1>
      <div className="bg-gold mt-4 h-px w-16" aria-hidden="true" />
      <div className="mt-4 space-y-4 text-base leading-7 text-gray-600 dark:text-gray-400">
        {series.description.map((paragraph) => (
          <p key={paragraph.slice(0, 40)}>{paragraph}</p>
        ))}
      </div>
    </section>
  )
}
