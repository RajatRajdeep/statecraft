import { genPageMetadata } from 'app/seo'
import expertsData from '@/data/expertsData'

export const metadata = genPageMetadata({ title: 'Experts' })

export default function ExpertsPage() {
  return (
    <div className="mx-auto max-w-6xl">
      <div className="full-bleed bg-navy mb-12 px-4 py-16 text-white sm:px-8 lg:px-16">
        <div className="mx-auto max-w-6xl">
          <p className="text-gold mb-3 text-sm font-semibold tracking-widest uppercase">Our Team</p>
          <h1 className="text-4xl font-bold md:text-5xl">Experts & Fellows</h1>
          <p className="mt-4 text-lg text-gray-300">
            Leading thinkers, practitioners, and analysts shaping policy discourse on national
            security and international affairs.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8 px-4 sm:px-8 md:grid-cols-2 lg:grid-cols-3 lg:px-16">
        {expertsData.map((expert) => (
          <div
            key={expert.name}
            className="overflow-hidden rounded-lg border border-gray-200 transition-shadow hover:shadow-lg dark:border-gray-700"
          >
            <div className="h-56 overflow-hidden bg-gray-100">
              <img
                src={expert.image}
                alt={expert.name}
                className="h-full w-full object-cover grayscale transition-all duration-300 hover:grayscale-0"
              />
            </div>
            <div className="p-5">
              <h3 className="text-navy text-lg font-bold dark:text-white">{expert.name}</h3>
              <p className="text-gold mt-1 mb-3 text-sm font-semibold">{expert.title}</p>
              <p className="mb-4 text-sm leading-relaxed text-gray-600 dark:text-gray-400">
                {expert.bio}
              </p>
              <div className="flex flex-wrap gap-1">
                {expert.areas.map((area) => (
                  <span
                    key={area}
                    className="bg-navy/10 dark:bg-gold/10 text-navy dark:text-gold rounded px-2 py-1 text-xs"
                  >
                    {area}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
