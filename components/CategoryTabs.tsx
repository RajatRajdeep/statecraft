'use client'

import { usePathname } from 'next/navigation'
import Link from '@/components/Link'

const tabs = [
  { href: '/publications', label: 'All' },
  { href: '/publications/commentaries', label: 'Commentaries' },
  { href: '/publications/book-reviews', label: 'Book Reviews' },
  { href: '/publications/interviews', label: 'Interviews' },
]

function isActive(pathname: string, href: string): boolean {
  // Strip any trailing /page/N so pagination pages keep their tab active.
  const base = pathname.replace(/\/page\/\d+\/?$/, '').replace(/\/$/, '')
  if (href === '/publications') {
    return base === '/publications'
  }
  return base === href
}

export default function CategoryTabs() {
  const pathname = usePathname()

  return (
    <nav className="mb-8 flex flex-wrap gap-x-6 gap-y-2 border-b border-gray-200 dark:border-gray-700">
      {tabs.map((tab) => {
        const active = isActive(pathname, tab.href)
        return (
          <Link
            key={tab.href}
            href={tab.href}
            className={`-mb-px border-b-2 pb-2 text-sm font-semibold tracking-wide uppercase transition-colors ${
              active
                ? 'border-gold text-navy dark:text-gray-100'
                : 'hover:text-navy border-transparent text-gray-500 dark:text-gray-400 dark:hover:text-gray-200'
            }`}
          >
            {tab.label}
          </Link>
        )
      })}
    </nav>
  )
}
