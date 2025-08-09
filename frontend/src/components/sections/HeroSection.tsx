'use client';

import Image from 'next/image';
import Button from '@/components/ui/Button';
import StatCard from '@/components/ui/StatCard';
import { trackEvent } from '@/lib/posthog';
import { ROUTES } from '@/lib/constants';

export default function HeroSection() {
  const handleApplyClick = () => {
    trackEvent('apply_button_clicked', { location: 'hero_section' });
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div>
          <h1 className="text-6xl font-bold text-[#c6542c] mb-4">Y Combinator</h1>
          <p className="text-2xl text-gray-800 mb-8">Make something people want.</p>
          
          <Button
            href={ROUTES.apply}
            size="lg"
            onClick={handleApplyClick}
          >
            Apply to YC
          </Button>

          <div className="mt-12 space-y-4">
            <StatCard
              value="5,000"
              label="funded startups"
              icon={<div className="w-6 h-6 bg-orange-400 rounded"></div>}
            />
            <StatCard
              value="$800B"
              label="combined valuation"
              icon={<div className="w-6 h-6 bg-orange-400 rounded"></div>}
            />
          </div>
        </div>

        <div className="relative">
          <img
            src="https://ext.same-assets.com/919007649/2681548612.webp"
            alt="Y Combinator founders"
            className="w-full h-auto rounded-lg"
          />
        </div>
      </div>
    </section>
  );
}