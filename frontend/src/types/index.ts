export interface NavigationItem {
  href: string;
  label: string;
  isActive?: boolean;
}

export interface Company {
  name: string;
  logoUrl: string;
  altText: string;
}

export interface Testimonial {
  quote: string;
  author: string;
  title: string;
  avatarUrl: string;
}

export interface Statistic {
  value: string;
  label: string;
  description?: string;
}

export interface ValueProposition {
  title: string;
  description: string;
}

export interface Feature {
  title: string;
  description: string;
  imageUrl: string;
  imageAlt: string;
}

export interface SocialLink {
  href: string;
  platform: string;
  icon: React.ReactNode;
}