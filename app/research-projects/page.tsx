import SeriesCards from '@/components/SeriesCards'
import { genPageMetadata } from 'app/seo'

export const metadata = genPageMetadata({ title: 'Research Projects' })

// The section index lists the series only — papers live on each series page.
// It gets its own masthead rather than the publications list layout: the tag
// sidebar there indexes individual publications, which this page does not show.
export default function Page() {
  return (
    <div className="w-full">
      <div className="full-bleed bg-navy mb-12 px-4 py-16 text-white sm:px-8 lg:px-16">
        <div className="mx-auto">
          <p className="text-gold mb-3 text-sm font-semibold tracking-widest uppercase">
            Long-form Research
          </p>
          <h1 className="text-4xl font-bold md:text-5xl">Research Projects</h1>
        </div>
      </div>

      <div className="px-4 sm:px-8 lg:px-16">
        <p className="max-w-4xl text-lg leading-relaxed text-gray-700 dark:text-gray-300">
          The Statecraft Institute's Research Projects initiative curates scholarly work on today's
          most consequential geopolitical challenges, with a specialised focus on nuclear strategy
          and intelligence studies.
        </p>
        <SeriesCards />
      </div>
    </div>
  )
}
