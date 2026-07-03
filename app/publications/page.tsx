import PublicationListPage from '@/layouts/PublicationListPage'
import { genPageMetadata } from 'app/seo'

export const metadata = genPageMetadata({ title: 'Publications' })

export default function Page() {
  return <PublicationListPage filter="all" title="All Publications" />
}
