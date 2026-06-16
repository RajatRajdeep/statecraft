import Link from 'next/link'

export const metadata = {
  title: 'Redirecting…',
}

export default function ArticlesRedirect() {
  return (
    <>
      <meta httpEquiv="refresh" content="0; url=/commentaries/" />
      <p>
        This page has moved. Redirecting to <Link href="/commentaries/">/commentaries/</Link>…
      </p>
    </>
  )
}
