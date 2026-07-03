import PublicationListPage from '@/layouts/PublicationListPage'
import { genPageMetadata } from 'app/seo'

export const metadata = genPageMetadata({ title: 'Book Reviews' })

export default function Page() {
  return <PublicationListPage filter="book-review" title="Book Reviews" />
}
