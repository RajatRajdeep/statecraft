import { allPublications } from 'contentlayer/generated'
import Link from 'next/link'

export const metadata = {
  title: 'Redirecting…',
}

export const generateStaticParams = async () => {
  return allPublications.map((p) => ({ slug: p.slug.split('/').map((name) => decodeURI(name)) }))
}

export default async function Page(props: { params: Promise<{ slug: string[] }> }) {
  const params = await props.params
  const slug = decodeURI(params.slug.join('/'))
  // The article now lives under its pubType segment; use the computed path.
  const post = allPublications.find((p) => p.slug === slug)
  const target = post ? `/${post.path}/` : `/publications/`

  return (
    <>
      <meta httpEquiv="refresh" content={`0; url=${target}`} />
      <p>
        This page has moved. Redirecting to <Link href={target}>{target}</Link>…
      </p>
    </>
  )
}
