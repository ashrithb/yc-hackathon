import { StatCardProps } from '@/types/components';
import { cn } from '@/lib/utils';

export default function StatCard({ 
  value, 
  label, 
  description, 
  icon, 
  className 
}: StatCardProps) {
  return (
    <div className={cn('text-center', className)}>
      <div className="flex items-center space-x-4">
        {icon && (
          <div className="bg-[#c6542c] p-2 rounded">
            {icon}
          </div>
        )}
        <div>
          <div className="text-2xl font-bold text-[#c6542c] mb-2">{value}</div>
          <div className="text-gray-600">{label}</div>
          {description && (
            <div className="text-gray-600 text-sm mt-1">{description}</div>
          )}
        </div>
      </div>
    </div>
  );
}