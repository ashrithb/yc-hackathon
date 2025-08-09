import { VideoEmbedProps } from '@/types/components';
import { cn } from '@/lib/utils';

const aspectRatios = {
  video: 'aspect-video',
  square: 'aspect-square'
};

export default function VideoEmbed({ 
  src, 
  title, 
  aspectRatio = 'video', 
  className 
}: VideoEmbedProps) {
  return (
    <div className={cn(
      'bg-black rounded-lg overflow-hidden',
      aspectRatios[aspectRatio],
      className
    )}>
      <iframe
        src={src}
        title={title}
        className="w-full h-full"
        allowFullScreen
        loading="lazy"
      />
    </div>
  );
}