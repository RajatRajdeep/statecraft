'use client'

import { useState, useRef, useEffect } from 'react'
import { Facebook, Linkedin, X } from './social-icons/icons'

function ShareIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <title>Share</title>
      <circle cx="18" cy="5" r="3" />
      <circle cx="6" cy="12" r="3" />
      <circle cx="18" cy="19" r="3" />
      <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
      <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
    </svg>
  )
}

function LinkIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <title>Copy Link</title>
      <path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71" />
      <path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71" />
    </svg>
  )
}

function CheckIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <title>Copied</title>
      <polyline points="20 6 9 17 4 12" />
    </svg>
  )
}

export default function ShareButton() {
  const [open, setOpen] = useState(false)
  const [copied, setCopied] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    function handleEscape(e: KeyboardEvent) {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('mousedown', handleClickOutside)
    document.addEventListener('keydown', handleEscape)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('keydown', handleEscape)
    }
  }, [])

  const getUrl = () => (typeof window !== 'undefined' ? window.location.href : '')
  const getTitle = () => (typeof document !== 'undefined' ? document.title : '')

  const url = getUrl()
  const title = getTitle()
  const links = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
    x: `https://x.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
  }

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(getUrl())
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // clipboard API unavailable
    }
  }

  const iconLink =
    'rounded-full p-2 text-gray-500 transition-colors hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700'

  return (
    <div ref={containerRef} className="relative">
      <button
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-haspopup="true"
        aria-label="Share"
        className="text-navy hover:border-gold hover:text-gold dark:hover:text-gold inline-flex h-10 w-10 items-center justify-center gap-2 rounded-full border border-gray-200 bg-[#f2ede8] transition-colors sm:w-auto sm:px-4 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
      >
        <ShareIcon className="h-[18px] w-[18px]" />
        <span className="hidden text-sm font-medium sm:inline">Share</span>
      </button>

      {open && (
        <div
          role="dialog"
          aria-label="Share options"
          className="absolute top-full right-0 z-20 mt-3 flex items-center gap-1 rounded-full border border-gray-200 bg-white px-2 py-1.5 shadow-lg dark:border-gray-700 dark:bg-gray-800"
        >
          <a
            href={links.facebook}
            target="_blank"
            rel="noopener noreferrer"
            title="Share on Facebook"
            className={`${iconLink} hover:text-[#1877f2]`}
          >
            <Facebook className="h-[18px] w-[18px] fill-current" />
            <span className="sr-only">Share on Facebook</span>
          </a>
          <a
            href={links.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            title="Share on LinkedIn"
            className={`${iconLink} hover:text-[#0a66c2]`}
          >
            <Linkedin className="h-[18px] w-[18px] fill-current" />
            <span className="sr-only">Share on LinkedIn</span>
          </a>
          <a
            href={links.x}
            target="_blank"
            rel="noopener noreferrer"
            title="Share on X"
            className={`${iconLink} hover:text-black dark:hover:text-white`}
          >
            <X className="h-[18px] w-[18px] fill-current" />
            <span className="sr-only">Share on X</span>
          </a>
          <span className="mx-0.5 h-5 w-px bg-gray-200 dark:bg-gray-700" aria-hidden="true" />
          <button
            onClick={copyLink}
            title={copied ? 'Copied!' : 'Copy link'}
            className={`${iconLink} ${copied ? 'text-green-500 hover:bg-transparent dark:text-green-500' : 'hover:text-navy dark:hover:text-gray-200'}`}
          >
            {copied ? (
              <CheckIcon className="h-[18px] w-[18px]" />
            ) : (
              <LinkIcon className="h-[18px] w-[18px]" />
            )}
            <span className="sr-only">{copied ? 'Copied!' : 'Copy link'}</span>
          </button>
        </div>
      )}
    </div>
  )
}
