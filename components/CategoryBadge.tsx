type PubType = 'commentary' | 'book-review' | 'interview'

const labels: Record<PubType, string> = {
  commentary: 'Commentary',
  'book-review': 'Book Review',
  interview: 'Interview',
}

interface Props {
  type?: string
  className?: string
}

// A single, consistent category kicker used for every publication type — an
// uppercase label with a small gold dot. Only the text differs by type, so the
// three types read as one system rather than three colour treatments.
export default function CategoryBadge({ type, className = '' }: Props) {
  const key = (type ?? 'commentary') as PubType
  const label = labels[key] ?? labels.commentary

  return (
    <span
      className={`text-navy inline-flex items-center gap-1.5 text-xs font-semibold tracking-wider uppercase dark:text-gray-200 ${className}`}
    >
      <span className="bg-gold h-1.5 w-1.5 rounded-full" aria-hidden="true" />
      {label}
    </span>
  )
}
