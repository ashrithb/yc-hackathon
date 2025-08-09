import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { MAIN_NAVIGATION } from '@/data/navigation';

export default function Navigation() {
  const pathname = usePathname();

  return (
    <nav className="hidden md:flex space-x-8">
      {MAIN_NAVIGATION.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={`hover:text-gray-900 transition-colors ${
            pathname === item.href
              ? 'text-[#c6542c] font-medium'
              : 'text-gray-700'
          }`}
        >
          {item.label}
        </Link>
      ))}
    </nav>
  );
}