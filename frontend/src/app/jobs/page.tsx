'use client'

import Link from 'next/link'
import { trackEvent } from '@/lib/posthog'

export default function Jobs() {
  const jobListings = [
    {
      company: "Stripe",
      logo: "https://ext.same-assets.com/919007649/4027765942.png",
      role: "Senior Software Engineer",
      location: "San Francisco, CA",
      type: "Full-time",
      salary: "$180K - $250K",
      equity: "0.1% - 0.5%",
      description: "Join our payments infrastructure team to build the future of online commerce."
    },
    {
      company: "Airbnb",
      logo: "https://ext.same-assets.com/919007649/2740485677.png",
      role: "Product Manager",
      location: "Remote",
      type: "Full-time",
      salary: "$160K - $220K",
      equity: "0.05% - 0.3%",
      description: "Lead product development for our host experience platform."
    },
    {
      company: "Coinbase",
      logo: "https://ext.same-assets.com/919007649/3176626705.png",
      role: "Frontend Engineer",
      location: "New York, NY",
      type: "Full-time",
      salary: "$150K - $200K",
      equity: "0.1% - 0.4%",
      description: "Build user-facing features for our cryptocurrency exchange platform."
    },
    {
      company: "Instacart",
      logo: "https://ext.same-assets.com/919007649/1229063814.png",
      role: "Data Scientist",
      location: "San Francisco, CA",
      type: "Full-time",
      salary: "$140K - $190K",
      equity: "0.05% - 0.25%",
      description: "Use machine learning to optimize grocery delivery and recommendations."
    },
    {
      company: "DoorDash",
      logo: "https://ext.same-assets.com/919007649/2152230307.png",
      role: "Backend Engineer",
      location: "Remote",
      type: "Full-time",
      salary: "$160K - $210K",
      equity: "0.1% - 0.3%",
      description: "Scale our delivery platform to serve millions of customers."
    },
    {
      company: "Cruise",
      logo: "https://ext.same-assets.com/919007649/1046160210.png",
      role: "Machine Learning Engineer",
      location: "San Francisco, CA",
      type: "Full-time",
      salary: "$180K - $250K",
      equity: "0.2% - 0.6%",
      description: "Develop autonomous vehicle perception and decision-making systems."
    }
  ]

  const categories = [
    { name: "Engineering", count: 1247, icon: "💻" },
    { name: "Product", count: 423, icon: "📱" },
    { name: "Design", count: 312, icon: "🎨" },
    { name: "Marketing", count: 289, icon: "📢" },
    { name: "Sales", count: 234, icon: "💼" },
    { name: "Operations", count: 198, icon: "⚙️" },
    { name: "Data Science", count: 167, icon: "📊" },
    { name: "Customer Success", count: 134, icon: "🤝" }
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
              <Link href="/jobs" className="text-[#c6542c] hover:text-gray-900 font-medium">Startup Jobs</Link>
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
          <h1 className="text-5xl font-bold text-[#c6542c] mb-6">Work at a Startup</h1>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            Find your next role at the world's most promising startups. Over 3,000 companies
            are hiring through Y Combinator's job board.
          </p>
        </div>

        {/* Search */}
        <div className="max-w-4xl mx-auto mb-16">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="grid md:grid-cols-4 gap-4">
              <div>
                <input
                  type="text"
                  placeholder="Job title or company..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#c6542c]"
                />
              </div>
              <div>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#c6542c]">
                  <option>All Locations</option>
                  <option>Remote</option>
                  <option>San Francisco</option>
                  <option>New York</option>
                  <option>Los Angeles</option>
                </select>
              </div>
              <div>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#c6542c]">
                  <option>All Categories</option>
                  <option>Engineering</option>
                  <option>Product</option>
                  <option>Design</option>
                  <option>Marketing</option>
                </select>
              </div>
              <div>
                <button className="w-full bg-[#c6542c] text-white py-2 px-4 rounded-md hover:bg-orange-600 transition-colors">
                  Search Jobs
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-4 gap-8 text-center mb-16">
          <div>
            <div className="text-3xl font-bold text-[#c6542c] mb-2">3,000+</div>
            <div className="text-gray-600">Hiring Companies</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-[#c6542c] mb-2">15,000+</div>
            <div className="text-gray-600">Open Positions</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-[#c6542c] mb-2">$150K+</div>
            <div className="text-gray-600">Average Salary</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-[#c6542c] mb-2">0.25%</div>
            <div className="text-gray-600">Average Equity</div>
          </div>
        </div>
      </section>

      {/* Job Categories */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center mb-12">Browse by Category</h2>
          <div className="grid md:grid-cols-4 gap-6">
            {categories.map((category, index) => (
              <div key={index} className="bg-[#f6f6f2] p-6 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer">
                <div className="text-2xl mb-2">{category.icon}</div>
                <h3 className="font-bold text-lg mb-1">{category.name}</h3>
                <p className="text-gray-600">{category.count} open positions</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Jobs */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-4xl font-bold text-center mb-12">Featured Positions</h2>
        <div className="space-y-6">
          {jobListings.map((job, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-4">
                  <img src={job.logo} alt={job.company} className="h-12 w-12 object-contain" />
                  <div className="flex-1">
                    <h3 className="text-xl font-bold mb-1">{job.role}</h3>
                    <div className="flex items-center space-x-4 text-gray-600 mb-2">
                      <span className="font-medium">{job.company}</span>
                      <span>•</span>
                      <span>{job.location}</span>
                      <span>•</span>
                      <span>{job.type}</span>
                    </div>
                    <p className="text-gray-700 mb-3">{job.description}</p>
                    <div className="flex items-center space-x-6 text-sm">
                      <div>
                        <span className="text-gray-500">Salary:</span>
                        <span className="ml-1 font-medium">{job.salary}</span>
                      </div>
                      <div>
                        <span className="text-gray-500">Equity:</span>
                        <span className="ml-1 font-medium">{job.equity}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <button
                  className="bg-[#c6542c] text-white px-6 py-2 rounded hover:bg-orange-600 transition-colors"
                  onClick={() => trackEvent('job_application_clicked', {
                    company: job.company,
                    role: job.role,
                    location: job.location,
                    salary: job.salary
                  })}
                >
                  Apply
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <button className="bg-white text-[#c6542c] border-2 border-[#c6542c] px-8 py-3 rounded hover:bg-[#c6542c] hover:text-white transition-colors">
            View All Jobs
          </button>
        </div>
      </section>

      {/* Why Work at a YC Company */}
      <section className="bg-[#c6542c] py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-white text-center mb-12">Why Work at a YC Company?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-4xl mb-4">🚀</div>
              <h3 className="text-xl font-bold text-white mb-3">High Growth</h3>
              <p className="text-orange-100">
                Join companies that are scaling rapidly and making a real impact in their industries.
              </p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-4">💰</div>
              <h3 className="text-xl font-bold text-white mb-3">Competitive Compensation</h3>
              <p className="text-orange-100">
                Get market-rate salaries plus meaningful equity in companies with huge potential.
              </p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-4">🌟</div>
              <h3 className="text-xl font-bold text-white mb-3">Learn from the Best</h3>
              <p className="text-orange-100">
                Work alongside top talent and learn from founders who've built billion-dollar companies.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-4xl font-bold text-center mb-12">How It Works</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="bg-[#c6542c] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-white text-2xl font-bold">1</span>
            </div>
            <h3 className="text-xl font-bold mb-3">Browse & Apply</h3>
            <p className="text-gray-700">
              Search through thousands of positions at YC companies and apply directly.
            </p>
          </div>
          <div className="text-center">
            <div className="bg-[#c6542c] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-white text-2xl font-bold">2</span>
            </div>
            <h3 className="text-xl font-bold mb-3">Interview Process</h3>
            <p className="text-gray-700">
              Go through a streamlined interview process with the startup's founding team.
            </p>
          </div>
          <div className="text-center">
            <div className="bg-[#c6542c] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-white text-2xl font-bold">3</span>
            </div>
            <h3 className="text-xl font-bold mb-3">Join & Grow</h3>
            <p className="text-gray-700">
              Start making an impact from day one and grow your career with the company.
            </p>
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
