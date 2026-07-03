import { allPublications } from 'contentlayer/generated'
import PublicationDetail, { buildMetadata } from '@/layouts/PublicationDetail'

export const generateStaticParams = async () =>
  allPublications.filter((p) => p.pubType === 'book-review').map((p) => ({ slug: p.slug }))

export async function generateMetadata(props: { params: Promise<{ slug: string }> }) {
  const { slug } = await props.params
  return buildMetadata(slug)
}

export default async function Page(props: { params: Promise<{ slug: string }> }) {
  const { slug } = await props.params
  return <PublicationDetail slug={slug} />
}
