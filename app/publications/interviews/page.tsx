import PublicationListPage from '@/layouts/PublicationListPage'
import { genPageMetadata } from 'app/seo'

export const metadata = genPageMetadata({ title: 'Interviews' })

export default function Page() {
  return <PublicationListPage filter="interview" title="Interviews" />
}
