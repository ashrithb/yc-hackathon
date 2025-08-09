import { CompanyLogoProps } from '@/types/components';
import { cn } from '@/lib/utils';

export default function CompanyLogo({ 
  name, 
  logoUrl, 
  altText, 
  onClick, 
  className 
}: CompanyLogoProps) {
  const handleClick = () => {
    if (onClick) {
      onClick(name);
    }
  };

  return (
    <img
      src={logoUrl}
      alt={altText}
      className={cn(
        'h-8 object-contain transition-opacity',
        onClick && 'cursor-pointer hover:opacity-80',
        className
      )}
      onClick={handleClick}
    />
  );
}