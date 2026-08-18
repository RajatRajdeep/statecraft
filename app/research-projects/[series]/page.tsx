import { notFound } from 'next/navigation'
import PublicationListPage from '@/layouts/PublicationListPage'
import SeriesHeader from '@/components/SeriesHeader'
import { getSeries, researchSeries } from '@/data/researchSeriesData'
import { genPageMetadata } from 'app/seo'

export const generateStaticParams = async () => researchSeries.map((s) => ({ series: s.slug }))

export async function generateMetadata(props: { params: Promise<{ series: string }> }) {
  const { series } = await props.params
  const entry = getSeries(series)
  if (!entry) return
  return genPageMetadata({ title: entry.title, description: entry.tagline })
}

export default async function Page(props: { params: Promise<{ series: string }> }) {
  const { series } = await props.params
  const entry = getSeries(series)
  if (!entry) return notFound()

  return (
    <PublicationListPage
      filter="research"
      series={series}
      title={entry.title}
      intro={<SeriesHeader series={entry} />}
    />
  )
}
