'use client'

// Personalized (cohort guess): visual_learners

import Link from 'next/link'
import { trackEvent } from '@/lib/posthog'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'

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
      <Header />

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

      <Footer />
    </div>
  )
}