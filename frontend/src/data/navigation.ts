import { NavigationItem } from '@/types';
import { ROUTES } from '@/lib/constants';

export const MAIN_NAVIGATION: NavigationItem[] = [
  {
    href: ROUTES.about,
    label: 'About'
  },
  {
    href: ROUTES.companies,
    label: 'Companies'
  },
  {
    href: ROUTES.jobs,
    label: 'Startup Jobs'
  },
  {
    href: ROUTES.cofounder,
    label: 'Find a Co-Founder'
  },
  {
    href: ROUTES.library,
    label: 'Library'
  },
  {
    href: ROUTES.safe,
    label: 'SAFE'
  },
  {
    href: ROUTES.resources,
    label: 'Resources'
  }
];

export const FOOTER_SECTIONS = {
  programs: {
    title: 'Programs',
    links: [
      { href: ROUTES.apply, label: 'YC Program', external: false },
      { href: '/startup-school', label: 'Startup School', external: false },
      { href: ROUTES.jobs, label: 'Work at a Startup', external: false },
      { href: ROUTES.cofounder, label: 'Co-Founder Matching', external: false }
    ]
  },
  company: {
    title: 'Company',
    links: [
      { href: '/blog', label: 'YC Blog', external: false },
      { href: '/contact', label: 'Contact', external: false },
      { href: '/press', label: 'Press', external: false },
      { href: '/people', label: 'People', external: false },
      { href: '/careers', label: 'Careers', external: false },
      { href: '/privacy', label: 'Privacy Policy', external: false },
      { href: '/notice', label: 'Notice at Collection', external: false },
      { href: '/security', label: 'Security', external: false },
      { href: '/terms', label: 'Terms of Use', external: false }
    ]
  },
  resources: {
    title: 'Resources',
    links: [
      { href: ROUTES.companies, label: 'Startup Directory', external: false },
      { href: ROUTES.library, label: 'Startup Library', external: false },
      { href: '/investors', label: 'Investors', external: false },
      { href: ROUTES.safe, label: 'SAFE', external: false },
      { href: 'https://news.ycombinator.com', label: 'Hacker News', external: true },
      { href: '/launches', label: 'Launch YC', external: false },
      { href: '/deals', label: 'YC Deals', external: false }
    ]
  }
};