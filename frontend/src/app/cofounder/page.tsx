// Personalized (cohort guess): unknown
'use client'

import Link from 'next/link'
import { useState } from 'react'
import { trackEvent } from '@/lib/posthog'

export default function CoFounder() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    linkedin: '',
    location: '',
    skills: '',
    idea: '',
    commitment: '',
    experience: ''
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    trackEvent('cofounder_profile_submitted', {
      location: formData.location,
      commitment: formData.commitment,
      has_idea: !!formData.idea,
      skills_count: formData.skills.split(',').length
    })
    alert('Profile submitted! We\'ll match you with potential co-founders.')
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const cofounderProfiles = [
    {
      name: "Sarah Chen",
      skills: "Full-stack, React, Node.js, AWS",
      location: "San Francisco, CA",
      commitment: "Full-time",
      experience: "Former eng at Stripe, 5 years experience",
      lookingFor: "Business co-founder for fintech startup"
    },
    {
      name: "Emily Thompson",
      skills: "Machine Learning, Python, Data Science",
      location: "Remote",
      commitment: "Full-time",
      experience: "ML Engineer at Google, PhD in AI",
      lookingFor: "Co-founder for AI healthcare startup"
    },
    {
      name: "Michael Rodriguez",
      skills: "Product, UX Design, Growth Marketing",
      location: "New York, NY",
      commitment: "Full-time",
      experience: "PM at Meta, launched 3 products",
      lookingFor: "Technical co-founder for social app"
    },
    {
      name: "David Kim",
      skills: "Sales, Business Development, Fundraising",
      location: "Los Angeles, CA",
      commitment: "Full-time",
      experience: "Founded 2 startups, raised $5M total",
      lookingFor: "Technical co-founder for B2B SaaS"
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
              <Link href="/cofounder" className="text-[#c6542c] hover:text-gray-900 font-medium">Find a Co-Founder</Link>
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
          <h1 className="text-5xl font-bold text-[#c6542c] mb-6">Find Your Co-Founder</h1>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            Connect with talented entrepreneurs who share your vision. Our matching platform
            helps you find the perfect co-founder for your startup journey.
          </p>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-4 gap-8 text-center mb-16">
          <div>
            <div className="text-3xl font-bold text-[#c6542c] mb-2">10,000+</div>
            <div className="text-gray-600">Active Profiles</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-[#c6542c] mb-2">2,500+</div>
            <div className="text-gray-600">Successful Matches</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-[#c6542c] mb-2">500+</div>
            <div className="text-gray-600">Funded Startups</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-[#c6542c] mb-2">85%</div>
            <div className="text-gray-600">Match Success Rate</div>
          </div>
        </div>
      </section>

      {/* Featured Profiles */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center mb-12">Featured Co-Founder Profiles</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {cofounderProfiles.map((profile, index) => (
              <div key={index} className="border border-gray-200 p-6 rounded-lg hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-bold mb-2">{profile.name}</h3>
                    <div className="flex items-center space-x-4 text-sm text-gray-600 mb-2">
                      <span>📍 {profile.location}</span>
                      <span>•</span>
                      <span>⏰ {profile.commitment}</span>
                    </div>
                  </div>
                  <button
                    className="bg-[#c6542c] text-white px-4 py-2 rounded hover:bg-orange-600 transition-colors"
                    onClick={() => trackEvent('cofounder_connect_clicked', {
                      profile_name: profile.name,
                      skills: profile.skills,
                      location: profile.location
                    })}
                  >
                    Connect
                  </button>
                </div>
                <div className="mb-3">
                  <div className="text-sm font-medium text-gray-700 mb-1">Skills:</div>
                  <div className="text-sm text-gray-600">{profile.skills}</div>
                </div>
                <div className="mb-3">
                  <div className="text-sm font-medium text-gray-700 mb-1">Experience:</div>
                  <div className="text-sm text-gray-600">{profile.experience}</div>
                </div>
                <div>
                  <div className="text-sm font-medium text-gray-700 mb-1">Looking For:</div>
                  <div className="text-sm text-gray-600">{profile.lookingFor}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <button className="bg-white text-[#c6542c] border-2 border-[#c6542c] px-8 py-3 rounded hover:bg-[#c6542c] hover:text-white transition-colors">
              Browse All Profiles
            </button>
          </div>
        </div>
      </section>

      {/* Create Profile Form */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-3xl font-bold mb-8">Create Your Co-Founder Profile</h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#c6542c]"
                  placeholder="John Doe"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email *</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#c6542c]"
                  placeholder="john@example.com"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">LinkedIn Profile</label>
                <input
                  type="url"
                  name="linkedin"
                  value={formData.linkedin}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#c6542c]"
                  placeholder="https://linkedin.com/in/johndoe"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Location *</label>
                <select
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#c6542c]"
                >
                  <option value="">Select Location</option>
                  <option value="San Francisco">San Francisco, CA</option>
                  <option value="New York">New York, NY</option>
                  <option value="Los Angeles">Los Angeles, CA</option>
                  <option value="Austin">Austin, TX</option>
                  <option value="Seattle">Seattle, WA</option>
                  <option value="Remote">Remote</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Skills & Expertise *</label>
              <input
                type="text"
                name="skills"
                value={formData.skills}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#c6542c]"
                placeholder="e.g., Python, Machine Learning, Product Management, Sales"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Professional Experience *</label>
              <textarea
                name="experience"
                value={formData.experience}
                onChange={handleChange}
                required
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#c6542c]"
                placeholder="Describe your relevant work experience and achievements"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Startup Idea (Optional)</label>
              <textarea
                name="idea"
                value={formData.idea}
                onChange={handleChange}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#c6542c]"
                placeholder="If you have a specific idea you're working on, describe it here"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Time Commitment *</label>
              <select
                name="commitment"
                value={formData.commitment}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#c6542c]"
              >
                <option value="">Select Commitment Level</option>
                <option value="Full-time">Full-time (40+ hours/week)</option>
                <option value="Part-time">Part-time (20-40 hours/week)</option>
                <option value="Weekends">Weekends & Evenings</option>
                <option value="Advisory">Advisory Only</option>
              </select>
            </div>

            <div className="pt-6">
              <button
                type="submit"
                className="w-full bg-[#c6542c] text-white py-3 px-6 rounded-md text-lg font-medium hover:bg-orange-600 transition-colors"
              >
                Create Profile & Start Matching
              </button>
            </div>
          </form>
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-[#c6542c] py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-white text-center mb-12">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-[#c6542c] text-2xl font-bold">1</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Create Your Profile</h3>
              <p className="text-orange-100">
                Tell us about your skills, experience, and what you're looking for in a co-founder.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-[#c6542c] text-2xl font-bold">2</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Get Matched</h3>
              <p className="text-orange-100">
                Our algorithm matches you with compatible co-founders based on skills and goals.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-[#c6542c] text-2xl font-bold">3</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Start Building</h3>
              <p className="text-orange-100">
                Connect with matches, validate fit, and start building your startup together.
              </p>
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