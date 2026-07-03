import PublicationListPage, { pagesFor } from '@/layouts/PublicationListPage'

export const generateStaticParams = async () => pagesFor('commentary')

export default async function Page(props: { params: Promise<{ page: string }> }) {
  const { page } = await props.params
  return (
    <PublicationListPage filter="commentary" title="Commentaries" pageNumber={parseInt(page)} />
  )
}
