import { sortPosts, allCoreContent } from 'pliny/utils/contentlayer'
import { allPublications } from 'contentlayer/generated'
import Main from './Main'

export default async function Page() {
  const sortedPosts = sortPosts(allPublications)
  const posts = allCoreContent(sortedPosts)
  return <Main posts={posts} />
}
