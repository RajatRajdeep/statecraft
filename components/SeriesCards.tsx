import Link from '@/components/Link'
import { sortedResearchSeries } from '@/data/researchSeriesData'

/**
 * The research series — the whole of the /research-projects section index.
 *
 * Full-width cards rather than tiles in a grid: there are only a handful of
 * series and they are the primary way into the section, so they read as
 * mastheads. The whole card is one link; the gold spine, title and arrow key
 * off `group-hover`. Individual papers are listed on each series' own page.
 */
export default function SeriesCards() {
  const series = sortedResearchSeries()
  if (series.length === 0) return null

  return (
    <ul className="mt-10 space-y-6">
      {series.map((s) => {
        return (
          <li key={s.slug}>
            <Link
              href={`/research-projects/${s.slug}`}
              prefetch={false}
              className="border-gold group block rounded-r-lg border border-l-4 border-gray-200 bg-[#f2ede8]/40 p-6 shadow-sm transition-shadow hover:shadow-md sm:p-8 dark:border-gray-700 dark:border-l-[var(--color-gold)] dark:bg-white/5"
            >
              <h2 className="text-navy group-hover:text-gold text-2xl leading-tight font-bold tracking-tight transition-colors sm:text-3xl dark:text-gray-100">
                {s.title}
              </h2>

              <p className="mt-3 text-base leading-7 text-gray-600 dark:text-gray-400">
                {s.tagline}
              </p>

              <span className="text-navy group-hover:text-gold mt-6 inline-flex items-center gap-2 text-[11px] font-bold tracking-[0.18em] uppercase transition-colors dark:text-gray-300">
                Read the series
                <span className="transition-transform group-hover:translate-x-1" aria-hidden="true">
                  &rarr;
                </span>
              </span>
            </Link>
          </li>
        )
      })}
    </ul>
  )
}
