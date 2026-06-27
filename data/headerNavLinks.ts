const headerNavLinks = [
  { href: '/', title: 'Home' },
  { href: '/about', title: 'About Us' },
  { href: '/experts', title: 'Experts' },
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
