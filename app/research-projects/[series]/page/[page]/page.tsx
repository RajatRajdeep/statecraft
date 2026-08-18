import { notFound } from 'next/navigation'
import PublicationListPage, { pagesFor } from '@/layouts/PublicationListPage'
import SeriesHeader from '@/components/SeriesHeader'
import { getSeries, researchSeries } from '@/data/researchSeriesData'

export const generateStaticParams = async () =>
  researchSeries.flatMap((s) =>
    pagesFor('research', s.slug).map(({ page }) => ({ series: s.slug, page }))
  )

export default async function Page(props: { params: Promise<{ series: string; page: string }> }) {
  const { series, page } = await props.params
  const entry = getSeries(series)
  if (!entry) return notFound()

  return (
    <PublicationListPage
      filter="research"
      series={series}
      title={entry.title}
      pageNumber={parseInt(page)}
      intro={<SeriesHeader series={entry} />}
    />
  )
}
