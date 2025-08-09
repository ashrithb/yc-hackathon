import { TestimonialCardProps } from '@/types/components';
import { cn } from '@/lib/utils';

export default function TestimonialCard({ 
  quote, 
  author, 
  title, 
  avatarUrl, 
  className 
}: TestimonialCardProps) {
  return (
    <div className={cn('flex items-start space-x-6', className)}>
      <img
        src={avatarUrl}
        alt={author}
        className="w-16 h-16 rounded-full object-cover flex-shrink-0"
      />
      <div className="flex-1">
        <blockquote className="text-lg text-gray-800 mb-2">
          "{quote}"
        </blockquote>
        <cite className="font-bold not-italic">{author}</cite>
        <p className="text-gray-600">{title}</p>
      </div>
    </div>
  );
}