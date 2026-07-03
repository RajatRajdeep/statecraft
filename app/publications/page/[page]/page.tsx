import PublicationListPage, { pagesFor } from '@/layouts/PublicationListPage'

export const generateStaticParams = async () => pagesFor('all')

export default async function Page(props: { params: Promise<{ page: string }> }) {
  const { page } = await props.params
  return <PublicationListPage filter="all" title="All Publications" pageNumber={parseInt(page)} />
}
