import PublicationListPage, { pagesFor } from '@/layouts/PublicationListPage'

export const generateStaticParams = async () => pagesFor('book-review')

export default async function Page(props: { params: Promise<{ page: string }> }) {
  const { page } = await props.params
  return (
    <PublicationListPage filter="book-review" title="Book Reviews" pageNumber={parseInt(page)} />
  )
}
