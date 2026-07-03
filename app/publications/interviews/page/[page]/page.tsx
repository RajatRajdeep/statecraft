import PublicationListPage, { pagesFor } from '@/layouts/PublicationListPage'

export const generateStaticParams = async () => pagesFor('interview')

export default async function Page(props: { params: Promise<{ page: string }> }) {
  const { page } = await props.params
  return <PublicationListPage filter="interview" title="Interviews" pageNumber={parseInt(page)} />
}
