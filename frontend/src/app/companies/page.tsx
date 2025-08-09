// Personalized (cohort guess): unknown
// Personalized (cohort guess): unknown
import Link from 'next/link'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'

export default function Companies() {
  const topCompanies = [
    { name: "Stripe", batch: "S09", valuation: "$95B", logo: "https://ext.same-assets.com/919007649/4027765942.png", description: "Online payments infrastructure" },
    { name: "Airbnb", batch: "W09", valuation: "$75B", logo: "https://ext.same-assets.com/919007649/2740485677.png", description: "Global marketplace for lodging" },
    { name: "Coinbase", batch: "S12", valuation: "$40B", logo: "https://ext.same-assets.com/919007649/3176626705.png", description: "Cryptocurrency exchange platform" },
    { name: "Instacart", batch: "S12", valuation: "$39B", logo: "https://ext.same-assets.com/919007649/1229063814.png", description: "Grocery delivery service" },
    { name: "DoorDash", batch: "S13", valuation: "$32B", logo: "https://ext.same-assets.com/919007649/2152230307.png", description: "Food delivery platform" },
    { name: "Cruise", batch: "W14", valuation: "$30B", logo: "https://ext.same-assets.com/919007649/1046160210.png", description: "Autonomous vehicle technology" },
    { name: "Twitch", batch: "S06", valuation: "$15B", logo: "https://ext.same-assets.com/919007649/3980320557.png", description: "Live streaming platform" },
    { name: "PagerDuty", batch: "S10", valuation: "$7B", logo: "https://ext.same-assets.com/919007649/3692787177.png", description: "Digital operations management" }
  ]

  const categories = [
    { name: "Fintech", count: 847 },
    { name: "Healthcare", count: 623 },
    { name: "AI/ML", count: 589 },
    { name: "Enterprise Software", count: 512 },
    { name: "Consumer", count: 445 },
    { name: "Biotech", count: 234 },
    { name: "Climate", count: 189 },
    { name: "Education", count: 167 }
  ]

  return (
    <div className="min-h-screen bg-[#f6f6f2]">
      <Header />

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-[#c6542c] mb-6">YC Companies</h1>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            Over 5,000 companies have been funded by Y Combinator since 2005.
            Together, they're worth over $800 billion and have created millions of jobs.
          </p>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-4 gap-8 text-center mb-16">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="text-3xl font-bold text-[#c6542c] mb-2">5,000+</div>
            <div className="text-gray-600">Total Companies</div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="text-3xl font-bold text-[#c6542c] mb-2">300+</div>
            <div className="text-gray-600">Unicorns</div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="text-3xl font-bold text-[#c6542c] mb-2">40+</div>
            <div className="text-gray-600">Public Companies</div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="text-3xl font-bold text-[#c6542c] mb-2">$800B+</div>
            <div className="text-gray-600">Combined Value</div>
          </div>
        </div>
      </section>

      {/* Top Companies */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-4xl font-bold text-center mb-12">Top Companies</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {topCompanies.map((company, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center mb-4">
                <img src={company.logo} alt={company.name} className="h-12 w-auto mr-4" />
                <div>
                  <h3 className="font-bold text-lg">{company.name}</h3>
                  <span className="text-sm text-gray-500">{company.batch}</span>
                </div>
              </div>
              <p className="text-gray-700 mb-3">{company.description}</p>
              <div className="text-[#c6542c] font-bold">{company.valuation} valuation</div>
            </div>
          ))}
        </div>
      </section>

      {/* Categories */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center mb-12">Companies by Category</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category, index) => (
              <div key={index} className="bg-[#f6f6f2] p-6 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer">
                <h3 className="font-bold text-lg mb-2">{category.name}</h3>
                <p className="text-gray-600">{category.count} companies</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Notable Exits */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-4xl font-bold text-center mb-12">Notable Exits</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-xl font-bold mb-2">Stripe</h3>
            <p className="text-gray-600 mb-2">Acquired for $95B valuation</p>
            <p className="text-sm text-gray-500">Leading online payment processing platform</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-xl font-bold mb-2">Airbnb</h3>
            <p className="text-gray-600 mb-2">IPO at $47B valuation</p>
            <p className="text-sm text-gray-500">Revolutionized travel and hospitality</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-xl font-bold mb-2">Coinbase</h3>
            <p className="text-gray-600 mb-2">IPO at $65B valuation</p>
            <p className="text-sm text-gray-500">Leading cryptocurrency exchange</p>
          </div>
        </div>
      </section>

      {/* Search CTA */}
      <section className="bg-[#c6542c] py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">Explore All Companies</h2>
          <p className="text-xl text-orange-100 mb-8 max-w-2xl mx-auto">
            Search through our complete directory of YC companies by batch, category, or industry.
          </p>
          <div className="max-w-md mx-auto">
            <div className="flex">
              <input
                type="text"
                placeholder="Search companies..."
                className="flex-1 px-4 py-3 rounded-l-lg border-none focus:ring-2 focus:ring-white"
              />
              <button className="bg-white text-[#c6542c] px-6 py-3 rounded-r-lg font-medium hover:bg-gray-100 transition-colors">
                Search
              </button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}