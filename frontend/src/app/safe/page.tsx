'use client'

import Link from 'next/link'
import { trackEvent } from '@/lib/posthog'

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
      {/* Header */}
      <header className="bg-[#f6f6f2] border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link href="/" className="bg-[#c6542c] w-10 h-10 flex items-center justify-center rounded">
                <span className="text-white font-bold text-lg">Y</span>
              </Link>
            </div>

            <nav className="hidden md:flex space-x-8">
              <Link href="/about" className="text-gray-700 hover:text-gray-900">About</Link>
              <Link href="/companies" className="text-gray-700 hover:text-gray-900">Companies</Link>
              <Link href="/jobs" className="text-gray-700 hover:text-gray-900">Startup Jobs</Link>
              <Link href="/cofounder" className="text-gray-700 hover:text-gray-900">Find a Co-Founder</Link>
              <Link href="/library" className="text-gray-700 hover:text-gray-900">Library</Link>
              <Link href="/safe" className="text-[#c6542c] hover:text-gray-900 font-medium">SAFE</Link>
              <Link href="/resources" className="text-gray-700 hover:text-gray-900">Resources</Link>
            </nav>

            <Link href="/apply" className="bg-[#c6542c] text-white px-6 py-2 rounded hover:bg-orange-600 transition-colors">
              Apply
            </Link>
          </div>
        </div>
      </header>

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

      {/* Footer */}
      <footer className="bg-[#f6f6f2] border-t border-gray-200 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center mb-6">
                <div className="bg-[#c6542c] w-10 h-10 flex items-center justify-center rounded mr-4">
                  <span className="text-white font-bold text-lg">Y</span>
                </div>
                <span className="text-2xl font-bold">Make something people want.</span>
                <Link href="/apply" className="bg-[#c6542c] text-white px-4 py-2 rounded ml-4 hover:bg-orange-600 transition-colors">
                  Apply
                </Link>
              </div>
            </div>

            <div>
              <h3 className="font-bold mb-4">Programs</h3>
              <ul className="space-y-2 text-gray-600">
                <li><Link href="/apply" className="hover:text-gray-900">YC Program</Link></li>
                <li><Link href="/startup-school" className="hover:text-gray-900">Startup School</Link></li>
                <li><Link href="/jobs" className="hover:text-gray-900">Work at a Startup</Link></li>
                <li><Link href="/cofounder" className="hover:text-gray-900">Co-Founder Matching</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold mb-4">Company</h3>
              <ul className="space-y-2 text-gray-600">
                <li><Link href="/blog" className="hover:text-gray-900">YC Blog</Link></li>
                <li><Link href="/contact" className="hover:text-gray-900">Contact</Link></li>
                <li><Link href="/press" className="hover:text-gray-900">Press</Link></li>
                <li><Link href="/people" className="hover:text-gray-900">People</Link></li>
                <li><Link href="/careers" className="hover:text-gray-900">Careers</Link></li>
                <li><Link href="/privacy" className="hover:text-gray-900">Privacy Policy</Link></li>
                <li><Link href="/security" className="hover:text-gray-900">Security</Link></li>
                <li><Link href="/terms" className="hover:text-gray-900">Terms of Use</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold mb-4">Resources</h3>
              <ul className="space-y-2 text-gray-600">
                <li><Link href="/companies" className="hover:text-gray-900">Startup Directory</Link></li>
                <li><Link href="/library" className="hover:text-gray-900">Startup Library</Link></li>
                <li><Link href="/investors" className="hover:text-gray-900">Investors</Link></li>
                <li><Link href="/safe" className="hover:text-gray-900">SAFE</Link></li>
                <li><a href="https://news.ycombinator.com" target="_blank" className="hover:text-gray-900">Hacker News</a></li>
                <li><Link href="/launches" className="hover:text-gray-900">Launch YC</Link></li>
                <li><Link href="/deals" className="hover:text-gray-900">YC Deals</Link></li>
              </ul>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-gray-200 flex justify-between items-center">
            <p className="text-gray-600">© 2025 Y Combinator</p>
            <div className="flex space-x-4">
              <a href="https://twitter.com/ycombinator" target="_blank" className="text-gray-600 hover:text-gray-900">
                <span className="sr-only">Twitter</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"/>
                </svg>
              </a>
              <a href="https://linkedin.com/company/y-combinator" target="_blank" className="text-gray-600 hover:text-gray-900">
                <span className="sr-only">LinkedIn</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" clipRule="evenodd"/>
                </svg>
              </a>
              <a href="https://youtube.com/ycombinator" target="_blank" className="text-gray-600 hover:text-gray-900">
                <span className="sr-only">YouTube</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
