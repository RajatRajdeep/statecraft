import { genPageMetadata } from 'app/seo'
import siteMetadata from '@/data/siteMetadata'
import Button from '@/components/Button'

export const metadata = genPageMetadata({ title: 'Contact Us' })

const contactPoints = [
  {
    label: 'General Enquiries',
    email: siteMetadata.email,
    subject: '',
    note: null,
  },
  {
    label: 'Article Submissions',
    email: siteMetadata.email,
    subject: 'Commentary Submission',
    note: 'Subject: Commentary Submission – [Title]',
  },
  {
    label: 'NITIVYUH Journal',
    email: siteMetadata.email,
    subject: 'NITIVYUH Submission',
    note: 'Subject: NITIVYUH Submission – [Title]',
  },
]

export default function ContactPage() {
  return (
    <div className="w-full">
      <div className="full-bleed bg-navy mb-12 px-4 py-16 text-white sm:px-8 lg:px-16">
        <div className="mx-auto">
          <p className="text-gold mb-3 text-sm font-semibold tracking-widest uppercase">
            Get In Touch
          </p>
          <h1 className="text-4xl font-bold md:text-5xl">Contact Us</h1>
        </div>
      </div>

      <div className="full-bleed px-4 sm:px-8 lg:px-16">
        <div className="flex flex-col gap-6 pb-12">
          {contactPoints.map((point) => (
            <div key={point.label} className="flex items-start gap-4">
              <div className="bg-navy flex h-10 w-10 shrink-0 items-center justify-center rounded-full">
                <svg className="text-gold h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white">{point.label}</h3>
                <a
                  href={`mailto:${point.email}${point.subject ? `?subject=${point.subject}` : ''}`}
                  className="text-gold hover:underline"
                >
                  {point.email}
                </a>
                {point.note && (
                  <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{point.note}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
