import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'

export default function About() {
  return (
    <div className="min-h-screen bg-[#f6f6f2]">
      <Header />

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

      <Footer />
    </div>
  )
}