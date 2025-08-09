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
      { href: ROUTES.apply, label: 'YC Program' },
      { href: '/startup-school', label: 'Startup School' },
      { href: ROUTES.jobs, label: 'Work at a Startup' },
      { href: ROUTES.cofounder, label: 'Co-Founder Matching' }
    ]
  },
  company: {
    title: 'Company',
    links: [
      { href: '/blog', label: 'YC Blog' },
      { href: '/contact', label: 'Contact' },
      { href: '/press', label: 'Press' },
      { href: '/people', label: 'People' },
      { href: '/careers', label: 'Careers' },
      { href: '/privacy', label: 'Privacy Policy' },
      { href: '/notice', label: 'Notice at Collection' },
      { href: '/security', label: 'Security' },
      { href: '/terms', label: 'Terms of Use' }
    ]
  },
  resources: {
    title: 'Resources',
    links: [
      { href: ROUTES.companies, label: 'Startup Directory' },
      { href: ROUTES.library, label: 'Startup Library' },
      { href: '/investors', label: 'Investors' },
      { href: ROUTES.safe, label: 'SAFE' },
      { href: 'https://news.ycombinator.com', label: 'Hacker News', external: true },
      { href: '/launches', label: 'Launch YC' },
      { href: '/deals', label: 'YC Deals' }
    ]
  }
};