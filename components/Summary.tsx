'use client'

import { ReactNode } from 'react'

type Lang = 'english' | 'hindi'

export default function Summary({ children, lang }: { children: ReactNode; lang?: Lang }) {
  const label = lang === 'hindi' ? 'सारांश' : 'Summary'
  return (
    <div className="border-gold bg-navy/5 my-6 rounded-r-lg border-l-4 p-6 dark:bg-white/5">
      <p className="text-gold mb-2 font-semibold tracking-widest uppercase">{label}</p>
      <div className="text-base text-gray-700 dark:text-gray-300 [&>p]:m-0">{children}</div>
    </div>
  )
}
