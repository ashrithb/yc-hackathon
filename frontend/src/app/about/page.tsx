// Personalized (cohort guess): unknown
import Link from 'next/link'

export default function About() {
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
              <Link href="/about" className="text-[#c6542c] hover:text-gray-900 font-medium">About</Link>
              <Link href="/companies" className="text-gray-700 hover:text-gray-900">Companies</Link>
              <Link href="/jobs" className="text-gray-700 hover:text-gray-900">Startup Jobs</Link>
              <Link href="/cofounder" className="text-gray-700 hover:text-gray-900">Find a Co-Founder</Link>
              <Link href="/library" className="text-gray-700 hover:text-gray-900">Library</Link>
              <Link href="/safe" className="text-gray-700 hover:text-gray-900">SAFE</Link>
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
          <h1 className="text-5xl font-bold text-[#c6542c] mb-6">About Y Combinator</h1>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            Y Combinator created a new model for funding early stage startups. Twice a year we invest
            in a large number of startups and help them for three months to get their companies to the
            point where they can raise money on favorable terms or become profitable.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 mb-16">
          <div>
            <img
              src="https://ext.same-assets.com/919007649/2681548612.webp"
              alt="YC founders"
              className="w-full h-80 object-cover rounded-lg"
            />
          </div>
          <div>
            <h2 className="text-3xl font-bold mb-6">Our Story</h2>
            <p className="text-gray-700 mb-4">
              Y Combinator was founded in 2005 by Paul Graham, Jessica Livingston, Robert Morris, and Trevor Blackwell.
              We started because we wanted to help smart people build things they wanted to use.
            </p>
            <p className="text-gray-700 mb-4">
              Since then, we've funded over 5,000 companies with a combined valuation of over $800 billion.
              Our companies have created millions of jobs and serve billions of users worldwide.
            </p>
            <p className="text-gray-700">
              We believe the best way to predict the future is to help create it.
            </p>
          </div>
        </div>
      </section>

      {/* What We Do */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-4xl font-bold text-center mb-12">What We Do</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="bg-[#c6542c] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-white text-2xl font-bold">1</span>
            </div>
            <h3 className="text-xl font-bold mb-4">Fund Startups</h3>
            <p className="text-gray-700">
              We invest $500,000 in each company for 6% equity. No complicated terms, no legal fees.
            </p>
          </div>
          <div className="text-center">
            <div className="bg-[#c6542c] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-white text-2xl font-bold">2</span>
            </div>
            <h3 className="text-xl font-bold mb-4">3-Month Program</h3>
            <p className="text-gray-700">
              Intensive mentorship, weekly dinners with successful founders, and access to our network.
            </p>
          </div>
          <div className="text-center">
            <div className="bg-[#c6542c] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-white text-2xl font-bold">3</span>
            </div>
            <h3 className="text-xl font-bold mb-4">Demo Day</h3>
            <p className="text-gray-700">
              Present to an audience of top investors and press. Many companies raise their Series A here.
            </p>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-[#c6542c] mb-2">5,000+</div>
              <div className="text-gray-600">Companies Funded</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-[#c6542c] mb-2">$800B+</div>
              <div className="text-gray-600">Combined Valuation</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-[#c6542c] mb-2">300+</div>
              <div className="text-gray-600">Unicorns Created</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-[#c6542c] mb-2">40+</div>
              <div className="text-gray-600">Public Companies</div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-4xl font-bold text-center mb-12">Our Values</h2>
        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <h3 className="text-2xl font-bold mb-4 border-l-4 border-[#c6542c] pl-4">Make Something People Want</h3>
            <p className="text-gray-700 mb-6">
              This is our motto. The best startups are ones that solve real problems for real people.
              We help founders focus on building products users love.
            </p>

            <h3 className="text-2xl font-bold mb-4 border-l-4 border-[#c6542c] pl-4">Move Fast</h3>
            <p className="text-gray-700 mb-6">
              Speed is crucial for startups. We teach founders how to build and iterate quickly,
              test hypotheses, and learn from users.
            </p>
          </div>
          <div>
            <h3 className="text-2xl font-bold mb-4 border-l-4 border-[#c6542c] pl-4">Be Ambitious</h3>
            <p className="text-gray-700 mb-6">
              We encourage founders to think big and tackle important problems. The best startups
              often seem impossible at first.
            </p>

            <h3 className="text-2xl font-bold mb-4 border-l-4 border-[#c6542c] pl-4">Help Each Other</h3>
            <p className="text-gray-700 mb-6">
              Our community is built on mutual support. YC founders help each other succeed through
              advice, introductions, and partnerships.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#c6542c] py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">Ready to Apply?</h2>
          <p className="text-xl text-orange-100 mb-8 max-w-2xl mx-auto">
            Applications for our next batch are open. Join thousands of founders who have
            built successful companies with Y Combinator.
          </p>
          <Link href="/apply" className="bg-white text-[#c6542c] px-8 py-3 rounded text-lg font-medium hover:bg-gray-100 transition-colors">
            Apply Now
          </Link>
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