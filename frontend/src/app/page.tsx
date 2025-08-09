// Personalized (cohort guess): unknown
// Personalized (cohort guess): unknown
'use client'

import Image from 'next/image'
import Link from 'next/link'
import { trackEvent } from '@/lib/posthog'
import { usePageTracking } from '@/hooks/usePageTracking'

export default function Home() {
  usePageTracking('home')

  return (
    <div className="min-h-screen bg-[#f6f6f2]">
      {/* Header */}
      <header className="bg-[#f6f6f2] border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center">
              <div className="bg-[#c6542c] w-10 h-10 flex items-center justify-center rounded">
                <span className="text-white font-bold text-lg">Y</span>
              </div>
            </div>

            {/* Navigation */}
            <nav className="hidden md:flex space-x-8">
              <Link href="/about" className="text-gray-700 hover:text-gray-900">About</Link>
              <Link href="/companies" className="text-gray-700 hover:text-gray-900">Companies</Link>
              <Link href="/jobs" className="text-gray-700 hover:text-gray-900">Startup Jobs</Link>
              <Link href="/cofounder" className="text-gray-700 hover:text-gray-900">Find a Co-Founder</Link>
              <Link href="/library" className="text-gray-700 hover:text-gray-900">Library</Link>
              <Link href="/safe" className="text-gray-700 hover:text-gray-900">SAFE</Link>
              <Link href="/resources" className="text-gray-700 hover:text-gray-900">Resources</Link>
            </nav>

            {/* Apply Button */}
            <Link href="/apply" className="bg-[#c6542c] text-white px-6 py-2 rounded hover:bg-orange-600 transition-colors">
              Apply
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-6xl font-bold text-[#c6542c] mb-4">Y Combinator</h1>
            <p className="text-2xl text-gray-800 mb-8">Make something people want.</p>
            <Link
              href="/apply"
              className="bg-[#c6542c] text-white px-8 py-3 rounded text-lg hover:bg-orange-600 transition-colors inline-block"
              onClick={() => trackEvent('apply_button_clicked', { location: 'hero_section' })}
            >
              Apply to YC
            </Link>

            {/* Stats */}
            <div className="mt-12 space-y-4">
              <div className="flex items-center space-x-4">
                <div className="bg-[#c6542c] p-2 rounded">
                  <div className="w-6 h-6 bg-orange-400 rounded"></div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-[#c6542c]">5,000</div>
                  <div className="text-gray-600">funded startups</div>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="bg-[#c6542c] p-2 rounded">
                  <div className="w-6 h-6 bg-orange-400 rounded"></div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-[#c6542c]">$800B</div>
                  <div className="text-gray-600">combined valuation</div>
                </div>
              </div>
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

      {/* Top YC Companies */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">Top YC companies</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-8 items-center">
          <img
            src="https://ext.same-assets.com/919007649/4027765942.png"
            alt="Stripe"
            className="h-8 object-contain cursor-pointer hover:opacity-80 transition-opacity"
            onClick={() => trackEvent('company_logo_clicked', { company: 'Stripe' })}
          />
          <img
            src="https://ext.same-assets.com/919007649/2740485677.png"
            alt="Airbnb"
            className="h-8 object-contain cursor-pointer hover:opacity-80 transition-opacity"
            onClick={() => trackEvent('company_logo_clicked', { company: 'Airbnb' })}
          />
          <img
            src="https://ext.same-assets.com/919007649/1229063814.png"
            alt="Instacart"
            className="h-8 object-contain cursor-pointer hover:opacity-80 transition-opacity"
            onClick={() => trackEvent('company_logo_clicked', { company: 'Instacart' })}
          />
          <img
            src="https://ext.same-assets.com/919007649/2152230307.png"
            alt="DoorDash"
            className="h-8 object-contain cursor-pointer hover:opacity-80 transition-opacity"
            onClick={() => trackEvent('company_logo_clicked', { company: 'DoorDash' })}
          />
          <img
            src="https://ext.same-assets.com/919007649/1046160210.png"
            alt="Cruise"
            className="h-8 object-contain cursor-pointer hover:opacity-80 transition-opacity"
            onClick={() => trackEvent('company_logo_clicked', { company: 'Cruise' })}
          />
          <img
            src="https://ext.same-assets.com/919007649/3980320557.png"
            alt="Twitch"
            className="h-8 object-contain cursor-pointer hover:opacity-80 transition-opacity"
            onClick={() => trackEvent('company_logo_clicked', { company: 'Twitch' })}
          />
          <img
            src="https://ext.same-assets.com/919007649/3176626705.png"
            alt="Coinbase"
            className="h-8 object-contain cursor-pointer hover:opacity-80 transition-opacity"
            onClick={() => trackEvent('company_logo_clicked', { company: 'Coinbase' })}
          />
          <img
            src="https://ext.same-assets.com/919007649/3692787177.png"
            alt="PagerDuty"
            className="h-8 object-contain cursor-pointer hover:opacity-80 transition-opacity"
            onClick={() => trackEvent('company_logo_clicked', { company: 'PagerDuty' })}
          />
        </div>
      </section>

      {/* Value Proposition */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">
            We help founders <span className="text-[#c6542c]">make something people want</span> and the results speak for themselves.
          </h2>
        </div>

        <div className="grid md:grid-cols-4 gap-8 mb-16">
          <div className="text-center">
            <div className="border-l-4 border-[#c6542c] pl-4 text-left">
              <p className="text-gray-800">We help founders at their earliest stages regardless of their age.</p>
            </div>
          </div>
          <div className="text-center">
            <div className="border-l-4 border-[#c6542c] pl-4 text-left">
              <p className="text-gray-800">We improve the success rate of our startups.</p>
            </div>
          </div>
          <div className="text-center">
            <div className="border-l-4 border-[#c6542c] pl-4 text-left">
              <p className="text-gray-800">We give startups a huge fundraising advantage.</p>
            </div>
          </div>
          <div className="text-center">
            <div className="border-l-4 border-[#c6542c] pl-4 text-left">
              <p className="text-gray-800">Our companies have a track record of becoming billion dollar companies.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Formula for Success */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-8">
          <h2 className="text-4xl font-bold mb-4">
            Our formula for <span className="text-[#c6542c]">success</span>.
          </h2>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="aspect-video bg-black rounded-lg overflow-hidden">
            <iframe
              src="https://www.youtube.com/embed/EiRnSjcVIqk"
              title="Y Combinator Formula for Success"
              className="w-full h-full"
              allowFullScreen
            />
          </div>
        </div>
      </section>

      {/* Run by Startup Founders */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">
            YC is <span className="text-[#c6542c]">run by startup founders</span> who have built exactly what they wanted when starting and growing a startup.
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-16">
          {/* Most Experienced Partners */}
          <div>
            <img
              src="https://ext.same-assets.com/919007649/79853469.jpeg"
              alt="The most experienced partners"
              className="w-full h-64 object-cover rounded-lg mb-6"
            />
            <h3 className="text-xl font-bold mb-4 border-l-4 border-[#c6542c] pl-4">The most experienced partners</h3>
            <p className="text-gray-700">
              Each founder is assigned a dedicated YC partner who has mentored hundreds of YC companies. They have
              more data on what it takes to build a successful startup than any other early stage startup advisor.
              These partners read applications, interview companies, and mentor startups throughout the batch. You can
              access them in person, over email, and on Slack.
            </p>
          </div>

          {/* Investor Network */}
          <div>
            <img
              src="https://ext.same-assets.com/919007649/1723170951.jpeg"
              alt="Investor network"
              className="w-full h-64 object-cover rounded-lg mb-6"
            />
            <h3 className="text-xl font-bold mb-4 border-l-4 border-[#c6542c] pl-4">Investor network</h3>
            <p className="text-gray-700">
              YC companies have raised $85 billion dollars from the best investors in the world. Our founders have
              access to the YC Investor Database which has profiles and reviews for more than 50,000 startup investors.
            </p>
          </div>

          {/* Private Social Network */}
          <div>
            <img
              src="https://ext.same-assets.com/919007649/2432499652.jpeg"
              alt="Private social network"
              className="w-full h-64 object-cover rounded-lg mb-6"
            />
            <h3 className="text-xl font-bold mb-4 border-l-4 border-[#c6542c] pl-4">Private social network only for founders</h3>
            <p className="text-gray-700">
              YC founders get to benefit from the collective wisdom of over 9000 YC alumni. They can access these alums
              through Bookface, our private social network. We have a forum for asking questions to the community, a founder
              directory for finding specific people who can provide advice and intros, and a company directory for finding
              potential customers.
            </p>
          </div>

          {/* Exclusive Deals */}
          <div>
            <img
              src="https://ext.same-assets.com/919007649/2535445362.jpeg"
              alt="Exclusive deals"
              className="w-full h-64 object-cover rounded-lg mb-6"
            />
            <h3 className="text-xl font-bold mb-4 border-l-4 border-[#c6542c] pl-4">Exclusive deals</h3>
            <p className="text-gray-700">
              YC founders have access to over 1000 deals from leading software companies. Every YC company gets
              free credits or significant discounts on hosting, banking, cap table management, back office, and much more.
              Companies report these deals to be worth in excess of $500,000.
            </p>
          </div>
        </div>
      </section>

      {/* Founders' Interests First */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">
            We put <span className="text-[#c6542c]">founders' interests</span> first.
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <ul className="space-y-4">
            <li className="flex items-center">
              <span className="text-[#c6542c] mr-3">•</span>
              <span>We don't take a board seat.</span>
            </li>
            <li className="flex items-center">
              <span className="text-[#c6542c] mr-3">•</span>
              <span>We don't take weeks/months to decide to invest.</span>
            </li>
            <li className="flex items-center">
              <span className="text-[#c6542c] mr-3">•</span>
              <span>We don't require decks, business plans, or MBAs.</span>
            </li>
          </ul>

          <ul className="space-y-4">
            <li className="flex items-center">
              <span className="text-[#c6542c] mr-3">•</span>
              <span>We don't demand 20% of your company.</span>
            </li>
            <li className="flex items-center">
              <span className="text-[#c6542c] mr-3">•</span>
              <span>We don't charge fees.</span>
            </li>
            <li className="flex items-center">
              <span className="text-[#c6542c] mr-3">•</span>
              <span>We don't tell you what to do. We only offer advice.</span>
            </li>
          </ul>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <img src="https://ext.same-assets.com/919007649/3690948445.jpeg" alt="YC founders" className="w-full h-48 object-cover rounded-lg" />
          <img src="https://ext.same-assets.com/919007649/654533272.jpeg" alt="YC founders" className="w-full h-48 object-cover rounded-lg" />
          <img src="https://ext.same-assets.com/919007649/1324763298.jpeg" alt="YC founders" className="w-full h-48 object-cover rounded-lg" />
        </div>
      </section>

      {/* Community Testimonials */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Hear more from the community.</h2>
        </div>

        <div className="space-y-12">
          <div className="flex items-start space-x-6">
            <img
              src="https://ext.same-assets.com/919007649/1301345132.jpeg"
              alt="Marc Andreessen"
              className="w-16 h-16 rounded-full object-cover"
            />
            <div>
              <blockquote className="text-lg text-gray-800 mb-2">
                "Y Combinator is the best program for creating top-end entrepreneurs that has ever existed."
              </blockquote>
              <cite className="font-bold">Marc Andreessen</cite>
              <p className="text-gray-600">General Partner, Andreessen Horowitz</p>
            </div>
          </div>

          <div className="flex items-start space-x-6">
            <img
              src="https://ext.same-assets.com/919007649/612216148.jpeg"
              alt="Ron Conway"
              className="w-16 h-16 rounded-full object-cover"
            />
            <div>
              <blockquote className="text-lg text-gray-800 mb-2">
                "Y Combinator is the best startup accelerator in the world. YC helps their companies a lot, and the YC community
                is a huge asset for the companies that go through the program."
              </blockquote>
              <cite className="font-bold">Ron Conway</cite>
              <p className="text-gray-600">Founder, SV Angel</p>
            </div>
          </div>

          <div className="flex items-start space-x-6">
            <img
              src="https://ext.same-assets.com/919007649/468649891.jpeg"
              alt="Brian Chesky"
              className="w-16 h-16 rounded-full object-cover"
            />
            <div>
              <blockquote className="text-lg text-gray-800 mb-2">
                "At YC, we were challenged to do things that don't scale – to start with the perfect experience for one person,
                then work backwards and scale it to 100 people who love us. This was the best piece of advice we've ever received."
              </blockquote>
              <cite className="font-bold">Brian Chesky</cite>
              <p className="text-gray-600">Founder, Airbnb (YC W09)</p>
            </div>
          </div>

          <div className="flex items-start space-x-6">
            <img
              src="https://ext.same-assets.com/919007649/1613571458.jpeg"
              alt="Patrick Collison"
              className="w-16 h-16 rounded-full object-cover"
            />
            <div>
              <blockquote className="text-lg text-gray-800 mb-2">
                "I doubt that Stripe would have worked without YC. It's that simple. Acquiring early customers, figuring out who to
                hire, closing deals with banks, raising money – YC's partners were closely involved and crucially helpful."
              </blockquote>
              <cite className="font-bold">Patrick Collison</cite>
              <p className="text-gray-600">Founder, Stripe (YC S09)</p>
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
                <li><Link href="/notice" className="hover:text-gray-900">Notice at Collection</Link></li>
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
              <Link href="#" className="text-gray-600 hover:text-gray-900">
                <span className="sr-only">Twitter</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"/>
                </svg>
              </Link>
              <Link href="#" className="text-gray-600 hover:text-gray-900">
                <span className="sr-only">Facebook</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd"/>
                </svg>
              </Link>
              <Link href="#" className="text-gray-600 hover:text-gray-900">
                <span className="sr-only">Instagram</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987 6.62 0 11.987-5.367 11.987-11.987C24.014 5.367 18.637.001 12.017.001zM8.449 16.988c-1.297 0-2.448-.49-3.323-1.297C4.198 14.895 3.5 13.559 3.5 12.017s.698-2.878 1.626-3.674c.875-.807 2.026-1.297 3.323-1.297s2.448.49 3.323 1.297c.928.796 1.626 2.132 1.626 3.674s-.698 2.878-1.626 3.674c-.875.807-2.026 1.297-3.323 1.297zm7.009 0c-1.297 0-2.448-.49-3.323-1.297-.928-.796-1.626-2.132-1.626-3.674s.698-2.878 1.626-3.674c.875-.807 2.026-1.297 3.323-1.297s2.448.49 3.323 1.297c.928.796 1.626 2.132 1.626 3.674s-.698 2.878-1.626 3.674c-.875.807-2.026 1.297-3.323 1.297z" clipRule="evenodd"/>
                </svg>
              </Link>
              <Link href="#" className="text-gray-600 hover:text-gray-900">
                <span className="sr-only">LinkedIn</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" clipRule="evenodd"/>
                </svg>
              </Link>
              <Link href="#" className="text-gray-600 hover:text-gray-900">
                <span className="sr-only">YouTube</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}