import { allBlogs } from 'contentlayer/generated'
import Link from 'next/link'

export const metadata = {
  title: 'Redirecting…',
}

export const generateStaticParams = async () => {
  return allBlogs.map((p) => ({ slug: p.slug.split('/').map((name) => decodeURI(name)) }))
}

export default async function Page(props: { params: Promise<{ slug: string[] }> }) {
  const params = await props.params
  const slug = decodeURI(params.slug.join('/'))
  const target = `/commentaries/${slug}/`

  return (
    <>
      <meta httpEquiv="refresh" content={`0; url=${target}`} />
      <p>
        This page has moved. Redirecting to <Link href={target}>{target}</Link>…
      </p>
    </>
  )
}
