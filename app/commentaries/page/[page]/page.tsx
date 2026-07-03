import { allPublications } from 'contentlayer/generated'
import Link from 'next/link'

const POSTS_PER_PAGE = 5

export const metadata = {
  title: 'Redirecting…',
}

export const generateStaticParams = async () => {
  const totalPages = Math.ceil(allPublications.length / POSTS_PER_PAGE)
  return Array.from({ length: totalPages }, (_, i) => ({ page: (i + 1).toString() }))
}

export default async function Page(props: { params: Promise<{ page: string }> }) {
  const params = await props.params
  const target = `/publications/page/${params.page}/`

  return (
    <>
      <meta httpEquiv="refresh" content={`0; url=${target}`} />
      <p>
        This page has moved. Redirecting to <Link href={target}>{target}</Link>…
      </p>
    </>
  )
}
