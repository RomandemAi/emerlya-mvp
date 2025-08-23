import Link from 'next/link';
import UnifiedNavBar from '@/components/UnifiedNavBar';

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50">
      {/* Navigation */}
      <UnifiedNavBar />

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Get in Touch with
            <span className="block bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              The Emerlya AI Team
            </span>
          </h1>
          <p className="text-xl text-gray-600 mb-12 leading-relaxed">
            Have questions about our AI content platform? Need help with your account? 
            Want to discuss enterprise solutions? We're here to help you succeed.
          </p>
        </div>
      </section>

      {/* Contact Options */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-8 mb-16">
            {/* Sales */}
            <div className="backdrop-blur-xl bg-white/60 rounded-3xl p-8 shadow-2xl border border-white/50 text-center hover:shadow-3xl transition-all duration-300 hover:-translate-y-2">
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Sales & Demos</h3>
              <p className="text-gray-600 mb-6">
                Want to see Emerlya AI in action? Schedule a personalized demo or discuss enterprise solutions.
              </p>
              <a href="mailto:hello@emerlya.com" className="inline-block px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl font-medium hover:shadow-lg transition-all duration-200 hover:-translate-y-0.5">
                Contact Sales
              </a>
              <p className="text-sm text-gray-500 mt-3">hello@emerlya.com</p>
            </div>

            {/* Support */}
            <div className="backdrop-blur-xl bg-white/60 rounded-3xl p-8 shadow-2xl border border-white/50 text-center hover:shadow-3xl transition-all duration-300 hover:-translate-y-2">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Technical Support</h3>
              <p className="text-gray-600 mb-6">
                Need help with your account, API integration, or have technical questions? Our support team is here.
              </p>
              <a href="mailto:hello@emerlya.com" className="inline-block px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-xl font-medium hover:shadow-lg transition-all duration-200 hover:-translate-y-0.5">
                Get Support
              </a>
              <p className="text-sm text-gray-500 mt-3">hello@emerlya.com</p>
            </div>

            {/* General */}
            <div className="backdrop-blur-xl bg-white/60 rounded-3xl p-8 shadow-2xl border border-white/50 text-center hover:shadow-3xl transition-all duration-300 hover:-translate-y-2">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">General Inquiries</h3>
              <p className="text-gray-600 mb-6">
                Have questions about partnerships, press inquiries, or general feedback? Let's chat.
              </p>
              <a href="mailto:hello@emerlya.com" className="inline-block px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-xl font-medium hover:shadow-lg transition-all duration-200 hover:-translate-y-0.5">
                Say Hello
              </a>
              <p className="text-sm text-gray-500 mt-3">hello@emerlya.com</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="backdrop-blur-xl bg-white/60 rounded-3xl p-12 shadow-2xl border border-white/50">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Send Us a Message
              </h2>
              <p className="text-lg text-gray-600">
                Fill out the form below and we'll get back to you within 24 hours.
              </p>
            </div>

            <form className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">
                    First Name *
                  </label>
                  <input
                    type="text"
                    required
                    className="w-full px-4 py-3 bg-white/80 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    placeholder="Enter your first name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">
                    Last Name *
                  </label>
                  <input
                    type="text"
                    required
                    className="w-full px-4 py-3 bg-white/80 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    placeholder="Enter your last name"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    className="w-full px-4 py-3 bg-white/80 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    placeholder="your.email@company.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">
                    Company
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 bg-white/80 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    placeholder="Your company name"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Inquiry Type
                </label>
                <select className="w-full px-4 py-3 bg-white/80 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent">
                  <option>General Inquiry</option>
                  <option>Sales & Pricing</option>
                  <option>Technical Support</option>
                  <option>Partnership</option>
                  <option>Press & Media</option>
                  <option>Enterprise Solutions</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Message *
                </label>
                <textarea
                  required
                  rows={6}
                  className="w-full px-4 py-3 bg-white/80 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none"
                  placeholder="Tell us how we can help you..."
                ></textarea>
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="privacy-consent"
                  className="w-4 h-4 text-indigo-600 bg-white border-gray-300 rounded focus:ring-indigo-500"
                />
                <label htmlFor="privacy-consent" className="ml-2 text-sm text-gray-600">
                  I agree to the <Link href="/privacy" className="text-indigo-600 hover:text-indigo-700">Privacy Policy</Link> and consent to my data being processed to respond to my inquiry.
                </label>
              </div>

              <button
                type="submit"
                className="w-full px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-2xl font-medium text-lg hover:shadow-xl transition-all duration-200 hover:-translate-y-1"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 px-6 bg-gradient-to-b from-transparent to-slate-50/50">
        <div className="max-w-4xl mx-auto">
          <div className="backdrop-blur-xl bg-white/60 rounded-3xl p-12 shadow-2xl border border-white/50">
            <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">Quick Answers</h3>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Do you offer free trials?</h4>
                  <p className="text-gray-600 text-sm">
                    Yes! We offer a 14-day free trial with 5,000 words to test our platform.
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Can I schedule a demo?</h4>
                  <p className="text-gray-600 text-sm">
                    Absolutely! Contact our sales team to schedule a personalized demo at your convenience.
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Do you provide API documentation?</h4>
                  <p className="text-gray-600 text-sm">
                    Yes, we have comprehensive API documentation available on our <Link href="/api-docs" className="text-indigo-600 hover:text-indigo-700">API page</Link>.
                  </p>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Is enterprise pricing available?</h4>
                  <p className="text-gray-600 text-sm">
                    Yes, we offer custom enterprise solutions with volume discounts and dedicated support.
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">What languages do you support?</h4>
                  <p className="text-gray-600 text-sm">
                    Our platform supports content generation in 40+ languages with maintained brand voice.
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Response Time</h4>
                  <p className="text-gray-600 text-sm">
                    Sales inquiries: Within 2 hours<br/>
                    Support requests: Within 4 hours<br/>
                    General inquiries: Within 24 hours
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Don't have questions? Jump right in and start creating amazing content with Emerlya AI.
          </p>
          <div className="flex justify-center space-x-4">
            <Link href="/login">
              <button className="px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-2xl font-medium text-lg hover:shadow-xl transition-all duration-200 hover:-translate-y-1">
                Start Free Trial
              </button>
            </Link>
            <Link href="/demo">
              <button className="px-8 py-4 bg-white/80 backdrop-blur-md border border-gray-200 text-gray-700 rounded-2xl font-medium text-lg hover:shadow-lg transition-all duration-200 hover:-translate-y-0.5">
                Watch Demo
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white/80 backdrop-blur-md border-t border-gray-200/50 py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <img 
                  src="/emerlya-logo.svg" 
                  alt="Emerlya AI Logo" 
                  className="w-8 h-8 object-contain"
                />
                <span className="text-xl font-semibold">Emerlya AI</span>
              </div>
              <p className="text-gray-600 text-sm">
                Intelligent content generation for modern teams.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold text-gray-900 mb-4">Product</h4>
              <ul className="space-y-2">
                <li><Link href="/features" className="text-gray-600 hover:text-gray-900 text-sm">Features</Link></li>
                <li><Link href="/pricing" className="text-gray-600 hover:text-gray-900 text-sm">Pricing</Link></li>
                <li><Link href="/api-docs" className="text-gray-600 hover:text-gray-900 text-sm">API</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-gray-900 mb-4">Company</h4>
              <ul className="space-y-2">
                <li><Link href="/about" className="text-gray-600 hover:text-gray-900 text-sm">About</Link></li>
                <li><Link href="/blog" className="text-gray-600 hover:text-gray-900 text-sm">Blog</Link></li>
                <li><Link href="/contact" className="text-gray-600 hover:text-gray-900 text-sm">Contact</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-gray-900 mb-4">Legal</h4>
              <ul className="space-y-2">
                <li><Link href="/privacy" className="text-gray-600 hover:text-gray-900 text-sm">Privacy Policy</Link></li>
                <li><Link href="/terms" className="text-gray-600 hover:text-gray-900 text-sm">Terms of Service</Link></li>
                <li><Link href="/gdpr" className="text-gray-600 hover:text-gray-900 text-sm">GDPR</Link></li>
                <li><Link href="/cookies" className="text-gray-600 hover:text-gray-900 text-sm">Cookie Policy</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="mt-12 pt-8 border-t border-gray-200/50 text-center text-sm text-gray-600">
            <p>© 2025 Emerlya AI. All rights reserved. | Built with ❤️ in the EU 🇪🇺</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
