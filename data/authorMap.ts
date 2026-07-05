import { allPeople } from 'contentlayer/generated'

/** Minimal, serializable author info used by publication author cards. */
export interface AuthorInfo {
  slug: string
  name: string
  avatar?: string
  occupation?: string
}

/**
 * Build a slug → AuthorInfo lookup from the People collection. Kept lean (no MDX
 * body) so it can be passed as a prop from server pages into client layouts
 * without bloating the client bundle.
 */
export function getAuthorMap(): Record<string, AuthorInfo> {
  const map: Record<string, AuthorInfo> = {}
  for (const person of allPeople) {
    map[person.slug] = {
      slug: person.slug,
      name: person.name,
      avatar: person.avatar,
      occupation: person.occupation,
    }
  }
  return map
}

/** Resolve a publication's `authors` slug list to AuthorInfo, dropping unknowns. */
export function resolveAuthors(
  authors: string[] | undefined,
  map: Record<string, AuthorInfo>
): AuthorInfo[] {
  return (authors ?? []).map((slug) => map[slug]).filter((a): a is AuthorInfo => Boolean(a))
}
