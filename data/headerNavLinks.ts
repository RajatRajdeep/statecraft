const headerNavLinks = [
  { href: '/', title: 'Home' },
  { href: '/about', title: 'About Us' },
  { href: '/write-for-us', title: 'Write For Us' },
  {
    href: '/journal',
    title: 'Journal',
    children: [
      { href: '/journal', title: 'NITIVYUH: Quarterly Journal' },
      { href: '/journal/author-guidelines', title: 'Author Guidelines' },
      { href: '/journal/editorial-board', title: 'Editorial Board' },
    ],
  },
  // { href: '/team', title: 'Our Team' },
  { href: '/contact', title: 'Contact Us' },
]

export default headerNavLinks
