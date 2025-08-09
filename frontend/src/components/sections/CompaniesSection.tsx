'use client';

import CompanyLogo from '@/components/ui/CompanyLogo';
import { TOP_COMPANIES } from '@/data/companies';
import { trackEvent } from '@/lib/posthog';

export default function CompaniesSection() {
  const handleCompanyClick = (companyName: string) => {
    trackEvent('company_logo_clicked', { company: companyName });
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h2 className="text-3xl font-bold text-center mb-12">Top YC companies</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-8 items-center">
        {TOP_COMPANIES.map((company) => (
          <CompanyLogo
            key={company.name}
            name={company.name}
            logoUrl={company.logoUrl}
            altText={company.altText}
            onClick={handleCompanyClick}
          />
        ))}
      </div>
    </section>
  );
}