import Link from './Link'
import SocialIcon from '@/components/social-icons'
import siteMetadata from '@/data/siteMetadata'

const currentYear = new Date().getFullYear()

export default function Footer() {
  return (
    <footer className="bg-navy mt-16 text-white">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <div>
            <p className="text-sm leading-relaxed text-gray-300">
              An independent research and policy platform dedicated to rigorous analysis of national
              security, international order, and strategic affairs.
            </p>
          </div>
          <div>
            <h3 className="text-gold mb-4 text-sm font-semibold tracking-wider uppercase">
              Quick Links
            </h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>
                <Link href="/about" className="hover:text-gold transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/publications" className="hover:text-gold transition-colors">
                  Publications
                </Link>
              </li>
              <li>
                <Link href="/journal" className="hover:text-gold transition-colors">
                  NEETIVIYUH Journal
                </Link>
              </li>
              <li>
                <Link href="/write-for-us" className="hover:text-gold transition-colors">
                  Write For Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-gold transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-gold mb-4 text-sm font-semibold tracking-wider uppercase">
              Contact
            </h3>
            <a
              href={`mailto:${siteMetadata.email}`}
              className="hover:text-gold mb-2 text-sm text-gray-300 transition-colors"
            >
              {siteMetadata.email}
            </a>
            <div className="mt-4 flex space-x-3">
              <SocialIcon
                kind="linkedin"
                href={siteMetadata.linkedin}
                size={7}
                iconClassName="fill-current text-gray-300 hover:text-gold transition-colors"
              />
              <SocialIcon
                kind="x"
                href={siteMetadata.x}
                size={7}
                iconClassName="fill-current text-gray-300 hover:text-gold transition-colors"
              />
            </div>
          </div>
        </div>
        <div className="border-gold/20 mt-8 border-t pt-6 text-center text-xs text-gray-400">
          <p>
            © {currentYear} {siteMetadata.title}. All rights reserved.
          </p>
          <p className="text-gold/70 mt-1 italic">सत्यं वद, धर्मं चर॥</p>
        </div>
      </div>
    </footer>
  )
}
