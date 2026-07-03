import Link from 'next/link'

export const metadata = {
  title: 'Redirecting…',
}

export default function ArticlesRedirect() {
  return (
    <>
      <meta httpEquiv="refresh" content="0; url=/publications/" />
      <p>
        This page has moved. Redirecting to <Link href="/publications/">/publications/</Link>…
      </p>
    </>
  )
}
