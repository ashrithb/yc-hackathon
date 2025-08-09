// Personalized (cohort guess): unknown
// Personalized (cohort guess): unknown
'use client'

import Link from 'next/link'
import { trackEvent } from '@/lib/posthog'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'

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
      <Header />

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

      <Footer />
    </div>
  )
}