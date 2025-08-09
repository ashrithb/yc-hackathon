import React from 'react';

export interface ButtonProps {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  external?: boolean;
}

export interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  linkToHome?: boolean;
}

export interface StatCardProps {
  value: string;
  label: string;
  description?: string;
  icon?: React.ReactNode;
  className?: string;
}

export interface CompanyLogoProps {
  name: string;
  logoUrl: string;
  altText: string;
  onClick?: (companyName: string) => void;
  className?: string;
}

export interface TestimonialCardProps {
  quote: string;
  author: string;
  title: string;
  avatarUrl: string;
  className?: string;
}

export interface VideoEmbedProps {
  src: string;
  title: string;
  aspectRatio?: 'video' | 'square';
  className?: string;
}

export interface SectionProps {
  children: React.ReactNode;
  className?: string;
  background?: 'default' | 'white' | 'primary' | 'gray';
}