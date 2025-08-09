import Link from 'next/link';
import { LogoProps } from '@/types/components';
import { ROUTES } from '@/lib/constants';
import { cn } from '@/lib/utils';

const logoSizes = {
  sm: 'w-8 h-8 text-base',
  md: 'w-10 h-10 text-lg',
  lg: 'w-12 h-12 text-xl'
};

export default function Logo({ size = 'md', className, linkToHome = true }: LogoProps) {
  const logoClasses = cn(
    'bg-[#c6542c] flex items-center justify-center rounded',
    logoSizes[size],
    className
  );

  const logoContent = (
    <div className={logoClasses}>
      <span className="text-white font-bold">Y</span>
    </div>
  );

  if (linkToHome) {
    return (
      <Link href={ROUTES.home}>
        {logoContent}
      </Link>
    );
  }

  return logoContent;
}