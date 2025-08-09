// Personalized (cohort guess): unknown
'use client'

import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { trackEvent } from '@/lib/posthog'
import Link from 'next/link'

export default function SAFE() {
  const documents = [
    {
      title: "SAFE - Valuation Cap, no Discount",
      description: "The most common SAFE structure with a valuation cap but no discount rate.",
      fileSize: "125 KB",
      downloads: "45,000+"
    },
    {
      title: "SAFE - Discount, no Valuation Cap",
      description: "SAFE with discount rate but no valuation cap for later-stage companies.",
      fileSize: "118 KB",
      downloads: "18,000+"
    },
    {
      title: "SAFE - Valuation Cap and Discount",
      description: "SAFE with both valuation cap and discount rate for maximum investor protection.",
      fileSize: "132 KB",
      downloads: "32,000+"
    },
    {
      title: "SAFE - MFN, no Valuation Cap, no Discount",
      description: "Most Favored Nation SAFE that matches terms of future SAFEs.",
      fileSize: "115 KB",
      downloads: "12,000+"
    }
  ]

  return (
    <div className="min-h-screen bg-[#f6f6f2]">
      <Header />

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-[#c6542c] mb-6">SAFE</h1>
          <h2 className="text-2xl text-gray-800 mb-6">Simple Agreement for Future Equity</h2>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            The SAFE is a simple instrument that we invented to replace convertible notes.
            It's designed to make seed funding faster, simpler, and more founder-friendly.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="bg-white p-8 rounded-lg shadow-sm mb-12">
            <h3 className="text-2xl font-bold mb-6">What is a SAFE?</h3>
            <div className="prose max-w-none">
              <p className="text-gray-700 mb-4">
                A SAFE (Simple Agreement for Future Equity) is an investment contract that provides for an investor
                to receive equity in a company at a future priced round of investment. The investor pays money to the
                company today, and gets company shares in the future when a specific triggering event occurs.
              </p>
              <p className="text-gray-700 mb-4">
                SAFEs are used by startups to raise capital in seed financing rounds. They were designed by Y Combinator
                as a replacement for convertible notes, offering a simpler and more founder-friendly alternative.
              </p>
              <p className="text-gray-700">
                The key benefits of SAFEs include: no interest, no maturity date, standardized terms,
                and faster execution compared to traditional convertible notes.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Document Downloads */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-4xl font-bold text-center mb-12">Download SAFE Documents</h2>
        <div className="grid md:grid-cols-2 gap-8">
          {documents.map((doc, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h3 className="text-xl font-bold mb-3">{doc.title}</h3>
              <p className="text-gray-700 mb-4">{doc.description}</p>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-4 text-sm text-gray-500">
                  <span>PDF • {doc.fileSize}</span>
                  <span>•</span>
                  <span>{doc.downloads} downloads</span>
                </div>
              </div>
              <button
                className="w-full bg-[#c6542c] text-white py-2 px-4 rounded hover:bg-orange-600 transition-colors"
                onClick={() => trackEvent('safe_document_downloaded', {
                  document_title: doc.title,
                  file_size: doc.fileSize,
                  downloads: doc.downloads
                })}
              >
                Download PDF
              </button>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-600 mb-4">
            All SAFE documents are available under Creative Commons license.
          </p>
          <Link href="/library" className="text-[#c6542c] hover:underline">
            Need help understanding SAFEs? Read our guide →
          </Link>
        </div>
      </section>

      {/* Key Benefits */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center mb-12">Why Use SAFEs?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-[#c6542c] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3">Simple & Fast</h3>
              <p className="text-gray-700">
                No complex terms, interest rates, or maturity dates. Close your round in days, not weeks.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-[#c6542c] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3">Founder Friendly</h3>
              <p className="text-gray-700">
                No board seats, voting rights, or control provisions. Founders maintain control of their company.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-[#c6542c] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3">Standardized</h3>
              <p className="text-gray-700">
                Industry-standard documents that investors know and trust. No need for expensive legal negotiations.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How SAFEs Work */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center mb-12">How SAFEs Work</h2>
          <div className="max-w-4xl mx-auto">
            <div className="space-y-8">
              <div className="flex items-start space-x-4">
                <div className="bg-[#c6542c] w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-white font-bold">1</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Investment</h3>
                  <p className="text-gray-700">
                    Investor gives money to the company in exchange for the right to receive equity
                    in a future priced financing round.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-[#c6542c] w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-white font-bold">2</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Triggering Event</h3>
                  <p className="text-gray-700">
                    SAFE converts to equity when the company raises a priced round, is acquired,
                    or reaches an IPO (liquidity event).
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-[#c6542c] w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-white font-bold">3</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Conversion</h3>
                  <p className="text-gray-700">
                    SAFE converts to preferred stock at either the valuation cap or discount rate,
                    whichever is more favorable to the investor.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-4xl font-bold text-center mb-12">Frequently Asked Questions</h2>
        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-3">What's the difference between a SAFE and convertible note?</h3>
            <p className="text-gray-700 mb-6">
              SAFEs are simpler than convertible notes because they don't have interest rates,
              maturity dates, or debt components. They're pure equity instruments.
            </p>

            <h3 className="text-xl font-bold mb-3">Do I need a lawyer to use a SAFE?</h3>
            <p className="text-gray-700 mb-6">
              While legal review is always recommended, SAFEs are standardized documents
              designed to minimize legal fees and complexity.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-3">What happens if the company never raises a priced round?</h3>
            <p className="text-gray-700 mb-6">
              SAFEs include provisions for liquidity events like acquisitions or IPOs.
              In these cases, SAFE holders receive their pro rata share.
            </p>

            <h3 className="text-xl font-bold mb-3">Can I modify the SAFE terms?</h3>
            <p className="text-gray-700 mb-6">
              We recommend using the standard SAFE documents without modifications
              to maintain their simplicity and investor familiarity.
            </p>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-[#c6542c] py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">Ready to Raise with SAFEs?</h2>
          <p className="text-xl text-orange-100 mb-8 max-w-2xl mx-auto">
            Download our SAFE documents and start raising capital with the industry standard.
          </p>
          <div className="space-x-4">
            <button className="bg-white text-[#c6542c] px-8 py-3 rounded text-lg font-medium hover:bg-gray-100 transition-colors">
              Download All SAFEs
            </button>
            <Link href="/library" className="bg-transparent border-2 border-white text-white px-8 py-3 rounded text-lg font-medium hover:bg-white hover:text-[#c6542c] transition-colors">
              Read the Guide
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}