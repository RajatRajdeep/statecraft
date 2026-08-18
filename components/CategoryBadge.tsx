import type { ReactNode } from 'react'

type PubType = 'commentary' | 'book-review' | 'interview' | 'research'

const labels: Record<PubType, string> = {
  commentary: 'Commentary',
  'book-review': 'Book Review',
  interview: 'Interview',
  research: 'Research',
}

interface Props {
  type?: string
  className?: string
  // `kicker` — gold dot + navy label, for text/meta areas (default).
  // `overlay` — solid pill, for sitting on top of a card image.
  // `chip` — outlined pill, for text lists on a light background.
  // `masthead` — gold label flanked by two rules, an eyebrow above article titles.
  variant?: 'kicker' | 'overlay' | 'chip' | 'masthead'
  /** Extra label shown beside the type in the `masthead` variant — used to name
   *  a research paper's series. */
  suffix?: ReactNode
}

// A single, consistent category label used for every publication type — only
// the text differs, so all types read as one system.
export default function CategoryBadge({ type, className = '', variant = 'kicker', suffix }: Props) {
  const key = (type ?? 'commentary') as PubType
  const label = labels[key] ?? labels.commentary

  if (variant === 'overlay') {
    return (
      <span
        className={`bg-navy/90 inline-block rounded px-2 py-1 text-xs font-semibold tracking-wider text-white uppercase backdrop-blur-sm ${className}`}
      >
        {label}
      </span>
    )
  }

  if (variant === 'masthead') {
    return (
      <span className={`flex flex-wrap items-center justify-center gap-x-4 gap-y-2 ${className}`}>
        <span className="bg-gold hidden h-px w-14 sm:block" aria-hidden="true" />
        <span className="text-gold text-[13px] font-bold tracking-[0.22em] uppercase">{label}</span>
        {suffix && (
          <>
            <span className="bg-gold/60 h-3 w-px" aria-hidden="true" />
            <span className="text-gold text-[13px] font-bold tracking-[0.22em] uppercase">
              {suffix}
            </span>
          </>
        )}
        <span className="bg-gold hidden h-px w-14 sm:block" aria-hidden="true" />
      </span>
    )
  }

  if (variant === 'chip') {
    return (
      <span
        className={`border-navy/30 text-navy inline-block rounded border px-2 py-0.5 text-[11px] font-semibold tracking-wider uppercase dark:border-gray-500 dark:text-gray-200 ${className}`}
      >
        {label}
      </span>
    )
  }

  return (
    <span
      className={`text-navy inline-flex items-center gap-1.5 text-xs font-semibold tracking-wider uppercase dark:text-gray-200 ${className}`}
    >
      <span className="bg-gold h-1.5 w-1.5 rounded-full" aria-hidden="true" />
      {label}
    </span>
  )
}
