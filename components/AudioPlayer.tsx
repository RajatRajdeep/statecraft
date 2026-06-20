'use client'

import { useEffect, useRef, useState } from 'react'

function HeadphonesIcon(props: React.SVGProps<SVGSVGElement>) {
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
      <title>Listen</title>
      <path d="M3 18v-6a9 9 0 0 1 18 0v6" />
      <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3z" />
      <path d="M3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z" />
    </svg>
  )
}

export default function AudioPlayer({ src, label = 'Listen' }: { src: string; label?: string }) {
  const [open, setOpen] = useState(false)
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

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-haspopup="true"
        aria-label={label}
        className="text-navy hover:border-gold hover:text-gold dark:hover:text-gold inline-flex h-10 w-10 items-center justify-center gap-2 rounded-full border border-gray-200 bg-[#f2ede8] transition-colors sm:w-auto sm:px-4 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
      >
        <HeadphonesIcon className="h-[18px] w-[18px]" />
        <span className="hidden text-sm font-medium sm:inline">{label}</span>
      </button>

      {open && (
        <div
          role="dialog"
          aria-label={label}
          className="absolute top-full right-0 z-20 mt-3 w-72 rounded-lg border border-gray-200 bg-white p-3 shadow-lg dark:border-gray-700 dark:bg-gray-800"
        >
          <div className="text-navy mb-2 flex items-center gap-2 text-sm font-semibold dark:text-gray-100">
            <HeadphonesIcon className="text-gold h-5 w-5" />
            {label}
          </div>
          {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
          <audio controls autoPlay src={src} className="w-full">
            Your browser does not support the audio element.
          </audio>
        </div>
      )}
    </div>
  )
}
