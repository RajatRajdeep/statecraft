import PublicationListPage from '@/layouts/PublicationListPage'
import { genPageMetadata } from 'app/seo'

export const metadata = genPageMetadata({ title: 'Commentaries' })

export default function Page() {
  return <PublicationListPage filter="commentary" title="Commentaries" />
}
