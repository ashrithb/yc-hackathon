import Link from 'next/link';
import { ButtonProps } from '@/types/components';
import { cn } from '@/lib/utils';

const buttonVariants = {
  primary: 'bg-[#c6542c] text-white hover:bg-orange-600',
  secondary: 'bg-white text-[#c6542c] hover:bg-gray-100',
  outline: 'border border-gray-300 text-gray-700 hover:bg-gray-50'
};

const buttonSizes = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-2',
  lg: 'px-8 py-3 text-lg'
};

export default function Button({ 
  children, 
  href, 
  onClick, 
  variant = 'primary', 
  size = 'md', 
  className,
  external = false 
}: ButtonProps) {
  const baseClasses = `inline-block rounded font-medium transition-colors ${buttonVariants[variant]} ${buttonSizes[size]}`;
  const combinedClasses = cn(baseClasses, className);

  if (href) {
    if (external) {
      return (
        <a 
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={combinedClasses}
        >
          {children}
        </a>
      );
    }
    return (
      <Link href={href} className={combinedClasses}>
        {children}
      </Link>
    );
  }

  return (
    <button 
      onClick={onClick}
      className={combinedClasses}
    >
      {children}
    </button>
  );
}