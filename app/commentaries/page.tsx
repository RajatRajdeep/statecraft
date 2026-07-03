import Link from 'next/link'

export const metadata = {
  title: 'Redirecting…',
}

// The commentaries section moved under /publications. Keep this stub so old
// /commentaries/ links continue to work.
export default function CommentariesRedirect() {
  return (
    <>
      <meta httpEquiv="refresh" content="0; url=/publications/" />
      <p>
        This page has moved. Redirecting to <Link href="/publications/">/publications/</Link>…
      </p>
    </>
  )
}
