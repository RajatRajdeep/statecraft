/**
 * Registry of research series.
 *
 * Every publication with `pubType: "research"` must declare a `series` slug
 * that appears here — the slug forms part of the URL
 * (`/research-projects/<series>/<slug>`) and this file supplies the editorial
 * copy for the series landing page and cards.
 *
 * To add a series: append an entry here, then give its papers a matching
 * `series` value in their frontmatter.
 */
export type ResearchSeries = {
  /** URL slug — must match the `series` frontmatter value. */
  slug: string
  /** Display title, e.g. "Brahmastra Series on Nuclear Statecraft". */
  title: string
  /** One-line description used on the series card. */
  tagline: string
  /** Introductory copy for the series landing page, one entry per paragraph. */
  description: string[]
  /** Sort order of the series on /research-projects. */
  order: number
}

export const researchSeries: ResearchSeries[] = [
  {
    slug: 'brahmastra-nuclear-statecraft',
    title: 'Brahmastra Series on Nuclear Statecraft',
    tagline:
      'Nuclear weapons as instruments of statecraft — their political, strategic, technological and diplomatic dimensions.',
    description: [
      'The Brahmastra Series on Nuclear Statecraft is a research initiative of The Statecraft Institute (TSI) that examines the political, strategic, technological, and diplomatic dimensions of nuclear weapons in contemporary international relations. Drawing on the concept of the Brahmastra from India’s epic tradition as an instrument of extraordinary and potentially decisive power, the series employs the metaphor to frame nuclear weapons as tools of statecraft. It moves beyond purely technical or doctrinal treatments to analyse how states acquire, develop, deploy and ultimately restrain the most destructive instruments of modern warfare.',
      'The series is particularly timely. Nuclear dynamics today intersect with great-power competition, regional conflicts, missile defence, emerging technologies (including cyber capabilities and artificial intelligence), maritime security and the strategic calculations of middle powers. A defining feature of the series is its deliberate effort to connect strategic theory with contemporary practice, thereby complementing TSI’s emphasis on interpreting strategy, national security and the evolving international order.',
    ],
    order: 1,
  },
]

/** Look up a series by its slug. */
export const getSeries = (slug: string): ResearchSeries | undefined =>
  researchSeries.find((s) => s.slug === slug)

/** All series, in display order. */
export const sortedResearchSeries = (): ResearchSeries[] =>
  [...researchSeries].sort((a, b) => a.order - b.order)

export default researchSeries
