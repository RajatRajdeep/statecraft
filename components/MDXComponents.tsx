import TOCInline from 'pliny/ui/TOCInline'
import Pre from 'pliny/ui/Pre'
import BlogNewsletterForm from 'pliny/ui/BlogNewsletterForm'
import type { MDXComponents } from 'mdx/types'
import type { ComponentPropsWithoutRef } from 'react'
import Image from './Image'
import CustomLink from './Link'
import TableWrapper from './TableWrapper'
import Summary from './Summary'

// remark-gfm auto-generates the footnotes section heading with the fixed
// text "Footnotes" (id="footnote-label") — relabel it here rather than in
// the markdown, since there's no per-document hook into that heading.
function Heading2({ id, children, ...props }: ComponentPropsWithoutRef<'h2'>) {
  if (id === 'footnote-label') {
    return (
      <h2 id={id} {...props}>
        {Array.isArray(children)
          ? children.map((child) => (child === 'Footnotes' ? 'References' : child))
          : children === 'Footnotes'
            ? 'References'
            : children}
      </h2>
    )
  }
  return (
    <h2 id={id} {...props}>
      {children}
    </h2>
  )
}

export const components: MDXComponents = {
  Image,
  TOCInline,
  a: CustomLink,
  pre: Pre,
  table: TableWrapper,
  BlogNewsletterForm,
  Summary,
  h2: Heading2,
}
