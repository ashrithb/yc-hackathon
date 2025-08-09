'use client'

import Link from 'next/link'
import { trackEvent } from '@/lib/posthog'

export default function Library() {
  const categories = [
    {
      title: "Getting Started",
      articles: [
        { title: "How to Build Your MVP", author: "Michael Seibel", readTime: "5 min" },
        { title: "Choosing the Right Co-Founder", author: "Paul Graham", readTime: "8 min" },
        { title: "How to Get Your First 10 Customers", author: "Adora Cheung", readTime: "6 min" },
        { title: "Startup Ideas We'd Like to Fund", author: "Paul Graham", readTime: "12 min" }
      ]
    },
    {
      title: "Product & Growth",
      articles: [
        { title: "Do Things That Don't Scale", author: "Paul Graham", readTime: "10 min" },
        { title: "How to Get Users and Grow", author: "Alex Schultz", readTime: "15 min" },
        { title: "Building Product Your Users Love", author: "Kevin Hale", readTime: "8 min" },
        { title: "The Importance of Product Market Fit", author: "Andy Rachleff", readTime: "7 min" }
      ]
    },
    {
      title: "Fundraising",
      articles: [
        { title: "How to Raise Money", author: "Paul Graham", readTime: "20 min" },
        { title: "Investor Updates That Get Responses", author: "Kat Manalac", readTime: "6 min" },
        { title: "Understanding SAFEs", author: "Carolynn Levy", readTime: "10 min" },
        { title: "What We Look For in Founders", author: "Geoff Ralston", readTime: "5 min" }
      ]
    },
    {
      title: "Team & Culture",
      articles: [
        { title: "How to Hire Your First Engineer", author: "Harj Taggar", readTime: "8 min" },
        { title: "Building a Strong Company Culture", author: "Alfred Lin", readTime: "12 min" },
        { title: "Managing Your Team", author: "Ben Horowitz", readTime: "15 min" },
        { title: "Firing Fast and Hiring Slow", author: "Keith Rabois", readTime: "6 min" }
      ]
    }
  ]

  const videos = [
    {
      title: "Startup School: Building Products Users Love",
      speaker: "Kevin Hale",
      duration: "52:18",
      views: "1.2M",
      thumbnail: "https://img.youtube.com/vi/yP176MBG9Tk/hqdefault.jpg"
    },
    {
      title: "How to Get Your First 10 Customers",
      speaker: "Adora Cheung",
      duration: "26:14",
      views: "890K",
      thumbnail: "https://img.youtube.com/vi/BjR2pl7FlSY/hqdefault.jpg"
    },
    {
      title: "How to Start a Startup: Ideas, Products, Teams",
      speaker: "Sam Altman",
      duration: "38:45",
      views: "2.1M",
      thumbnail: "https://img.youtube.com/vi/ZoqgAy3h4OM/hqdefault.jpg"
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
              <Link href="/library" className="text-[#c6542c] hover:text-gray-900 font-medium">Library</Link>
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
          <h1 className="text-5xl font-bold text-[#c6542c] mb-6">Startup Library</h1>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            Essential readings, videos, and resources for startup founders. Learn from the
            experiences of successful entrepreneurs and YC partners.
          </p>
        </div>

        {/* Search */}
        <div className="max-w-2xl mx-auto mb-16">
          <div className="flex">
            <input
              type="text"
              placeholder="Search articles, videos, and resources..."
              className="flex-1 px-4 py-3 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-[#c6542c]"
            />
            <button className="bg-[#c6542c] text-white px-6 py-3 rounded-r-lg hover:bg-orange-600 transition-colors">
              Search
            </button>
          </div>
        </div>
      </section>

      {/* Featured Videos */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-4xl font-bold text-center mb-12">Featured Videos</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {videos.map((video, index) => (
            <div key={index} className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow cursor-pointer">
              <div className="relative">
                <img src={video.thumbnail} alt={video.title} className="w-full h-48 object-cover" />
                <div className="absolute bottom-2 right-2 bg-black bg-opacity-75 text-white px-2 py-1 rounded text-sm">
                  {video.duration}
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="bg-[#c6542c] rounded-full p-3">
                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z"/>
                    </svg>
                  </div>
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-bold text-lg mb-2">{video.title}</h3>
                <p className="text-gray-600 mb-2">{video.speaker}</p>
                <p className="text-sm text-gray-500">{video.views} views</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Articles by Category */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center mb-12">Essential Reading</h2>
          <div className="grid md:grid-cols-2 gap-12">
            {categories.map((category, index) => (
              <div key={index}>
                <h3 className="text-2xl font-bold mb-6 border-l-4 border-[#c6542c] pl-4">{category.title}</h3>
                <div className="space-y-4">
                  {category.articles.map((article, articleIndex) => (
                    <div key={articleIndex} className="p-4 bg-[#f6f6f2] rounded-lg hover:bg-gray-100 transition-colors cursor-pointer">
                      <h4 className="font-bold text-lg mb-2">{article.title}</h4>
                      <div className="flex items-center text-sm text-gray-600">
                        <span>By {article.author}</span>
                        <span className="mx-2">•</span>
                        <span>{article.readTime} read</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tools & Resources */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-4xl font-bold text-center mb-12">Tools & Resources</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-xl font-bold mb-3">SAFE Templates</h3>
            <p className="text-gray-700 mb-4">
              Download our standardized SAFE (Simple Agreement for Future Equity) documents.
            </p>
            <Link href="/safe" className="text-[#c6542c] hover:underline">
              View SAFE Documents →
            </Link>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-xl font-bold mb-3">Cap Table Templates</h3>
            <p className="text-gray-700 mb-4">
              Excel and Google Sheets templates for tracking equity and dilution.
            </p>
            <a href="#" className="text-[#c6542c] hover:underline">
              Download Templates →
            </a>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-xl font-bold mb-3">Pitch Deck Guide</h3>
            <p className="text-gray-700 mb-4">
              How to create an effective pitch deck that gets investor attention.
            </p>
            <a href="#" className="text-[#c6542c] hover:underline">
              Read Guide →
            </a>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-xl font-bold mb-3">Legal Templates</h3>
            <p className="text-gray-700 mb-4">
              Standard legal documents for startups including NDAs and employment agreements.
            </p>
            <a href="#" className="text-[#c6542c] hover:underline">
              Browse Templates →
            </a>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-xl font-bold mb-3">Financial Models</h3>
            <p className="text-gray-700 mb-4">
              Templates for financial planning, revenue projections, and unit economics.
            </p>
            <a href="#" className="text-[#c6542c] hover:underline">
              Get Models →
            </a>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-xl font-bold mb-3">Startup School</h3>
            <p className="text-gray-700 mb-4">
              Free 10-week online course for early-stage founders.
            </p>
            <Link href="/startup-school" className="text-[#c6542c] hover:underline">
              Learn More →
            </Link>
          </div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="bg-[#c6542c] py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">Stay Updated</h2>
          <p className="text-xl text-orange-100 mb-8 max-w-2xl mx-auto">
            Get the latest startup advice, new content, and YC updates delivered to your inbox.
          </p>
          <div className="max-w-md mx-auto">
            <div className="flex">
              <input
                type="email"
                placeholder="Enter your email..."
                className="flex-1 px-4 py-3 rounded-l-lg border-none focus:ring-2 focus:ring-white"
              />
              <button
                className="bg-white text-[#c6542c] px-6 py-3 rounded-r-lg font-medium hover:bg-gray-100 transition-colors"
                onClick={() => trackEvent('newsletter_subscribe_clicked', { page: 'library' })}
              >
                Subscribe
              </button>
            </div>
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
