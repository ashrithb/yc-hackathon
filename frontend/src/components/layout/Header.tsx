'use client';

import Logo from '@/components/ui/Logo';
import Button from '@/components/ui/Button';
import Navigation from './Navigation';
import { ROUTES } from '@/lib/constants';

export default function Header() {
  return (
    <header className="bg-[#f6f6f2] border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Logo />
          </div>

          <Navigation />

          <Button href={ROUTES.apply}>
            Apply
          </Button>
        </div>
      </div>
    </header>
  );
}