const headerNavLinks = [
  { href: '/', title: 'Home' },
  { href: '/about', title: 'About Us' },
  {
    href: '/publications',
    title: 'Publications',
    children: [
      { href: '/publications', title: 'All Publications' },
      { href: '/publications/commentaries', title: 'Commentaries' },
      { href: '/publications/book-reviews', title: 'Book Reviews' },
      { href: '/publications/interviews', title: 'Interviews' },
    ],
  },
  {
    href: '/research-projects',
    title: 'Research Projects',
    children: [
      {
        href: '/research-projects/brahmastra-nuclear-statecraft',
        title: 'Brahmastra Series on Nuclear Statecraft',
      },
    ],
  },
  { href: '/expert-contributors', title: 'Expert Contributors' },
  {
    href: '/journal',
    title: 'Journal',
    children: [
      { href: '/journal', title: 'NEETIVIYUH: Quarterly Journal' },
      { href: '/journal/author-guidelines', title: 'Author Guidelines' },
      { href: '/journal/editorial-board', title: 'Editorial Board' },
    ],
  },
  // { href: '/team', title: 'Our Team' },
  { href: '/contact', title: 'Contact Us' },
]

export default headerNavLinks
