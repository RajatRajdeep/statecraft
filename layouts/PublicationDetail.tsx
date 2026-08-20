import 'css/prism.css'
import 'katex/dist/katex.css'

import { components } from '@/components/MDXComponents'
import { MDXLayoutRenderer } from 'pliny/mdx-components'
import { sortPosts, coreContent, allCoreContent } from 'pliny/utils/contentlayer'
import { allPublications, allPeople } from 'contentlayer/generated'
import type { People, Publication } from 'contentlayer/generated'
import PostSimple from '@/layouts/PostSimple'
import PostLayout from '@/layouts/PostLayout'
import PostBanner from '@/layouts/PostBanner'
import { Metadata } from 'next'
import siteMetadata from '@/data/siteMetadata'
import { notFound } from 'next/navigation'
import { existsSync } from 'fs'
import path from 'path'

const defaultLayout = 'PostLayout'
const layouts = {
  PostSimple,
  PostLayout,
  PostBanner,
}

/** Build metadata for a publication detail page, looked up by its flat slug. */
export async function buildMetadata(rawSlug: string): Promise<Metadata | undefined> {
  const slug = decodeURI(rawSlug)
  const post = allPublications.find((p) => p.slug === slug)
  if (!post) return

  const authorList = post.authors || ['default']
  const authorDetails = authorList.map((author) => {
    const authorResults = allPeople.find((p) => p.slug === author)
    return coreContent(authorResults as People)
  })

  const publishedAt = new Date(post.date).toISOString()
  const modifiedAt = new Date(post.lastmod || post.date).toISOString()
  const authors = authorDetails.map((author) => author.name)
  let imageList = [siteMetadata.socialBanner]
  if (post.images) {
    imageList = typeof post.images === 'string' ? [post.images] : post.images
  }
  const ogImages = imageList.map((img) => ({
    url: img && img.includes('http') ? img : siteMetadata.siteUrl.replace(/\/$/, '') + img,
  }))

  return {
    title: post.title,
    description: post.summary,
    openGraph: {
      title: post.title,
      description: post.summary,
      siteName: siteMetadata.title,
      locale: 'en_US',
      type: 'article',
      publishedTime: publishedAt,
      modifiedTime: modifiedAt,
      url: './',
      images: ogImages,
      authors: authors.length > 0 ? authors : [siteMetadata.author],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.summary,
      images: imageList,
    },
  }
}

/** Renders a publication detail page, looked up by its flat slug. */
export default async function PublicationDetail({ slug: rawSlug }: { slug: string }) {
  const slug = decodeURI(rawSlug)
  // Filter out drafts in production
  const sortedCoreContents = allCoreContent(sortPosts(allPublications))
  const postIndex = sortedCoreContents.findIndex((p) => p.slug === slug)
  if (postIndex === -1) {
    return notFound()
  }

  const prev = sortedCoreContents[postIndex + 1]
  const next = sortedCoreContents[postIndex - 1]
  const post = allPublications.find((p) => p.slug === slug) as Publication
  const authorList = post?.authors || ['default']
  const authorDetails = authorList.map((author) => {
    const authorResults = allPeople.find((p) => p.slug === author)
    return coreContent(authorResults as People)
  })
  const mainContent = coreContent(post)
  const jsonLd = post.structuredData
  jsonLd['author'] = authorDetails.map((author) => ({
    '@type': 'Person',
    name: author.name,
  }))

  const Layout = layouts[post.layout || defaultLayout]

  // If an audio recording exists for this publication
  // (public/static/audio/commentaries/<slug>.mp3 — the audio folder keeps its
  // historical name), expose its served URL so the layout can render a
  // "Listen" control.
  const audioFile = path.join(
    process.cwd(),
    'public',
    'static',
    'audio',
    'commentaries',
    `${slug}.mp3`
  )
  const audioSrc = existsSync(audioFile) ? `/static/audio/commentaries/${slug}.mp3` : undefined

  // Research papers ship with a typeset PDF edition, produced by the institute
  // and committed under public/static/pdf/research-projects/<series>/. Probing
  // for the file means any publication can offer one, not just research. The
  // BASE_PATH prefix keeps the link correct when the site is served from a
  // subpath.
  const pdfFile = post.series
    ? path.join(
        process.cwd(),
        'public',
        'static',
        'pdf',
        'research-projects',
        post.series,
        `${slug}.pdf`
      )
    : undefined
  const pdfHref =
    pdfFile && existsSync(pdfFile)
      ? `${process.env.BASE_PATH || ''}/static/pdf/research-projects/${post.series}/${slug}.pdf`
      : undefined

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Layout
        content={mainContent}
        authorDetails={authorDetails}
        next={next}
        prev={prev}
        audioSrc={audioSrc}
        pdfHref={pdfHref}
      >
        <MDXLayoutRenderer code={post.body.code} components={components} toc={post.toc} />
      </Layout>
    </>
  )
}
