'use client'

import siteMetadata from '@/data/siteMetadata'
import headerNavLinks from '@/data/headerNavLinks'
import Image from './Image'
import Link from './Link'
import MobileNav from './MobileNav'
import ThemeSwitch from './ThemeSwitch'
import SearchButton from './SearchButton'
import { useState, useRef, useEffect } from 'react'

interface NavLink {
  href: string
  title: string
  children?: NavLink[]
}

function DropdownMenu({ children }: { children: React.ReactNode }) {
  return (
    <div className="border-gold/30 bg-navy absolute top-full left-0 z-50 mt-1 min-w-56 rounded border shadow-lg">
      {children}
    </div>
  )
}

function NavItem({ link }: { link: NavLink }) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  if (!link.children) {
    return (
      <Link
        href={link.href}
        className="hover:text-gold text-sm font-medium tracking-wide text-white transition-colors"
      >
        {link.title}
      </Link>
    )
  }

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="hover:text-gold flex items-center gap-1 text-sm font-medium tracking-wide text-white transition-colors"
      >
        {link.title}
        <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
          <path
            fillRule="evenodd"
            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </button>
      {open && (
        <DropdownMenu>
          {link.children!.map((child) => (
            <Link
              key={child.href}
              href={child.href}
              className="hover:bg-gold/20 hover:text-gold block px-4 py-2.5 text-sm text-white"
            >
              {child.title}
            </Link>
          ))}
        </DropdownMenu>
      )}
    </div>
  )
}

const Header = () => {
  return (
    <header className="bg-navy sticky top-0 z-50 shadow-lg">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2 sm:px-6">
        <Link href="/" aria-label={siteMetadata.headerTitle}>
          <Image
            src="/static/images/logo.jpeg"
            alt="The Statecraft Institute"
            width={56}
            height={56}
            className="h-14 w-auto rounded bg-white px-2 py-1"
          />
        </Link>
        <div className="flex items-center gap-6">
          <nav className="hidden items-center gap-6 sm:flex">
            {headerNavLinks
              .filter((link) => link.href !== '/')
              .map((link) => (
                <NavItem key={link.href} link={link as NavLink} />
              ))}
          </nav>
          <SearchButton />
          <ThemeSwitch />
          <MobileNav />
        </div>
      </div>
    </header>
  )
}

export default Header
