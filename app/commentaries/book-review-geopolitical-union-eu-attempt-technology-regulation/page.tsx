import Link from 'next/link'

export const metadata = {
  title: 'Redirecting…',
}

// The book review's slug dropped its `book-review-` prefix and moved under the
// book-reviews segment. This static stub preserves the original public URL
// (/commentaries/book-review-geopolitical-union-...) that was shared before the
// rename. It sits alongside the [...slug] catch-all and, being a concrete
// segment, takes precedence for this exact path.
const target = '/publications/book-reviews/geopolitical-union-eu-attempt-technology-regulation/'

export default function Page() {
  return (
    <>
      <meta httpEquiv="refresh" content={`0; url=${target}`} />
      <p>
        This page has moved. Redirecting to <Link href={target}>{target}</Link>…
      </p>
    </>
  )
}
