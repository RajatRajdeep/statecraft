function DownloadIcon(props: React.SVGProps<SVGSVGElement>) {
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
      <title>Download PDF</title>
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="7 10 12 15 17 10" />
      <line x1="12" y1="15" x2="12" y2="3" />
    </svg>
  )
}

/**
 * Link to a publication's pre-generated PDF. Styled to sit next to
 * `ShareButton` / `AudioPlayer` in the article toolbar.
 *
 * The PDFs are produced at build time by `scripts/pdf.mjs`, so `href` must
 * already carry any `BASE_PATH` prefix.
 */
export default function DownloadPdfButton({
  href,
  label = 'PDF',
}: {
  href: string
  label?: string
}) {
  return (
    <a
      href={href}
      download
      aria-label="Download this publication as a PDF"
      className="text-navy hover:border-gold hover:text-gold dark:hover:text-gold inline-flex h-10 w-10 items-center justify-center gap-2 rounded-full border border-gray-200 bg-[#f2ede8] transition-colors sm:w-auto sm:px-4 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100 print:hidden"
    >
      <DownloadIcon className="h-[18px] w-[18px]" />
      <span className="hidden text-sm font-medium sm:inline">{label}</span>
    </a>
  )
}
