import Link from 'next/link';
import UnifiedNavBar from '@/components/UnifiedNavBar';
import { CheckIcon, XMarkIcon } from '@heroicons/react/24/outline';

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral via-white to-neutral">
      {/* Navigation */}
      <UnifiedNavBar />

      {/* Hero Section */}
      <section className="pt-24 pb-8 px-6 bg-gradient-to-br from-primary via-primary/95 to-primary/90">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-xl md:text-2xl font-bold font-heading text-white mb-4">
            Simple, Transparent
            <span className="block text-accent">
              Pricing for Everyone
            </span>
          </h1>
          <p className="text-base md:text-lg text-white/90 max-w-2xl mx-auto mb-6 leading-relaxed">
            Choose the perfect plan for your content needs. Start free, upgrade anytime.
            No hidden fees, no long-term contracts.
          </p>
          
          {/* Billing Toggle */}
          <div className="flex items-center justify-center mb-6">
            <span className="text-white/80 mr-3 text-sm">Monthly</span>
            <div className="relative">
              <input type="checkbox" id="billing-toggle" className="sr-only" />
              <label htmlFor="billing-toggle" className="flex items-center cursor-pointer">
                <div className="w-12 h-6 bg-white/30 rounded-full p-1 transition-colors duration-300">
                  <div className="w-4 h-4 bg-white rounded-full transition-transform duration-300 transform"></div>
                </div>
              </label>
            </div>
            <span className="text-white/80 ml-3 text-sm">
              Annual 
              <span className="inline-block ml-2 px-2 py-1 bg-accent text-primary text-xs rounded-full font-medium">
                Save 20%
              </span>
            </span>
          </div>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="py-6 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-3 gap-4 text-center">
            <div className="flex items-center justify-center space-x-2 text-gray-600">
              <CheckIcon className="w-4 h-4 text-accent" />
              <span className="text-sm">30-day money-back guarantee</span>
            </div>
            <div className="flex items-center justify-center space-x-2 text-gray-600">
              <CheckIcon className="w-4 h-4 text-primary" />
              <span className="text-sm">GDPR compliant & secure</span>
            </div>
            <div className="flex items-center justify-center space-x-2 text-gray-600">
              <CheckIcon className="w-4 h-4 text-accent" />
              <span className="text-sm">No setup fees or contracts</span>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-8 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-6">
            
            {/* Free Plan */}
            <div className="backdrop-blur-xl bg-white/80 rounded-2xl p-6 shadow-xl border border-white/50 hover:shadow-2xl transition-all duration-300">
              <div className="text-center mb-6">
                <h3 className="text-lg font-bold font-heading text-primary mb-2">Starter</h3>
                <p className="text-sm text-gray-600 mb-4">Perfect for individuals getting started</p>
                <div className="mb-4">
                  <span className="text-3xl font-bold text-primary">€0</span>
                  <span className="text-gray-600 ml-2">/month</span>
                </div>
                <Link href="/login">
                  <button className="w-full px-5 py-2.5 bg-gray-100 text-gray-900 rounded-lg font-medium text-sm hover:bg-gray-200 transition-colors">
                    Get Started Free
                  </button>
                </Link>
              </div>
              
              <ul className="space-y-3">
                <li className="flex items-center">
                  <CheckIcon className="w-4 h-4 text-accent mr-3 flex-shrink-0" />
                  <span className="text-sm text-gray-600">5,000 words/month</span>
                </li>
                <li className="flex items-center">
                  <CheckIcon className="w-4 h-4 text-accent mr-3 flex-shrink-0" />
                  <span className="text-sm text-gray-600">1 brand profile</span>
                </li>
                <li className="flex items-center">
                  <CheckIcon className="w-4 h-4 text-accent mr-3 flex-shrink-0" />
                  <span className="text-sm text-gray-600">Basic content types</span>
                </li>
                <li className="flex items-center">
                  <CheckIcon className="w-4 h-4 text-accent mr-3 flex-shrink-0" />
                  <span className="text-sm text-gray-600">Email support</span>
                </li>
                <li className="flex items-center">
                  <XMarkIcon className="w-4 h-4 text-gray-400 mr-3 flex-shrink-0" />
                  <span className="text-sm text-gray-400">Document analysis</span>
                </li>
                <li className="flex items-center">
                  <XMarkIcon className="w-4 h-4 text-gray-400 mr-3 flex-shrink-0" />
                  <span className="text-sm text-gray-400">Team collaboration</span>
                </li>
              </ul>
            </div>

            {/* Pro Plan - Most Popular */}
            <div className="backdrop-blur-xl bg-white/80 rounded-2xl p-6 shadow-xl border-2 border-accent hover:shadow-2xl transition-all duration-300 relative">
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <span className="bg-gradient-to-r from-primary to-accent text-white px-4 py-1.5 rounded-full text-sm font-medium">
                  Most Popular
                </span>
              </div>
              
              <div className="text-center mb-6">
                <h3 className="text-lg font-bold font-heading text-primary mb-2">Professional</h3>
                <p className="text-sm text-gray-600 mb-4">For growing businesses and teams</p>
                <div className="mb-4">
                  <span className="text-3xl font-bold text-primary">€29</span>
                  <span className="text-gray-600 ml-2">/month</span>
                </div>
                <Link href="/login">
                  <button className="w-full px-5 py-2.5 bg-gradient-to-r from-primary to-accent text-white rounded-lg font-medium text-sm hover:shadow-lg transition-all duration-200">
                    Start Free Trial
                  </button>
                </Link>
              </div>
              
              <ul className="space-y-3">
                <li className="flex items-center">
                  <CheckIcon className="w-4 h-4 text-accent mr-3 flex-shrink-0" />
                  <span className="text-sm text-gray-600">50,000 words/month</span>
                </li>
                <li className="flex items-center">
                  <CheckIcon className="w-4 h-4 text-accent mr-3 flex-shrink-0" />
                  <span className="text-sm text-gray-600">5 brand profiles</span>
                </li>
                <li className="flex items-center">
                  <CheckIcon className="w-4 h-4 text-accent mr-3 flex-shrink-0" />
                  <span className="text-sm text-gray-600">All content types</span>
                </li>
                <li className="flex items-center">
                  <CheckIcon className="w-4 h-4 text-accent mr-3 flex-shrink-0" />
                  <span className="text-sm text-gray-600">Document analysis</span>
                </li>
                <li className="flex items-center">
                  <CheckIcon className="w-4 h-4 text-accent mr-3 flex-shrink-0" />
                  <span className="text-sm text-gray-600">Priority support</span>
                </li>
                <li className="flex items-center">
                  <CheckIcon className="w-4 h-4 text-accent mr-3 flex-shrink-0" />
                  <span className="text-sm text-gray-600">Team collaboration (5 users)</span>
                </li>
                <li className="flex items-center">
                  <CheckIcon className="w-4 h-4 text-accent mr-3 flex-shrink-0" />
                  <span className="text-sm text-gray-600">API access</span>
                </li>
              </ul>
            </div>

            {/* Enterprise Plan */}
            <div className="backdrop-blur-xl bg-white/80 rounded-2xl p-6 shadow-xl border border-white/50 hover:shadow-2xl transition-all duration-300">
              <div className="text-center mb-6">
                <h3 className="text-lg font-bold font-heading text-primary mb-2">Enterprise</h3>
                <p className="text-sm text-gray-600 mb-4">For large organizations with custom needs</p>
                <div className="mb-4">
                  <span className="text-3xl font-bold text-primary">Custom</span>
                </div>
                <Link href="/contact">
                  <button className="w-full px-5 py-2.5 bg-primary text-white rounded-lg font-medium text-sm hover:bg-primary/90 transition-colors">
                    Contact Sales
                  </button>
                </Link>
              </div>
              
              <ul className="space-y-3">
                <li className="flex items-center">
                  <CheckIcon className="w-4 h-4 text-accent mr-3 flex-shrink-0" />
                  <span className="text-sm text-gray-600">Unlimited words</span>
                </li>
                <li className="flex items-center">
                  <CheckIcon className="w-4 h-4 text-accent mr-3 flex-shrink-0" />
                  <span className="text-sm text-gray-600">Unlimited brand profiles</span>
                </li>
                <li className="flex items-center">
                  <CheckIcon className="w-4 h-4 text-accent mr-3 flex-shrink-0" />
                  <span className="text-sm text-gray-600">Custom AI models</span>
                </li>
                <li className="flex items-center">
                  <CheckIcon className="w-4 h-4 text-accent mr-3 flex-shrink-0" />
                  <span className="text-sm text-gray-600">Advanced analytics</span>
                </li>
                <li className="flex items-center">
                  <CheckIcon className="w-4 h-4 text-accent mr-3 flex-shrink-0" />
                  <span className="text-sm text-gray-600">Dedicated support</span>
                </li>
                <li className="flex items-center">
                  <CheckIcon className="w-4 h-4 text-accent mr-3 flex-shrink-0" />
                  <span className="text-sm text-gray-600">Unlimited team members</span>
                </li>
                <li className="flex items-center">
                  <CheckIcon className="w-4 h-4 text-accent mr-3 flex-shrink-0" />
                  <span className="text-sm text-gray-600">On-premise deployment</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-8 px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="backdrop-blur-xl bg-primary/5 rounded-2xl p-6 shadow-xl border border-primary/10">
            <h2 className="text-lg md:text-xl font-bold font-heading text-center text-primary mb-6">
              Frequently Asked Questions
            </h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-base font-semibold font-heading text-primary mb-2">
                  What happens when I reach my word limit?
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  When you approach your monthly word limit, we'll notify you with plenty of time to upgrade. 
                  Your account won't be suspended - you'll simply need to upgrade to continue generating content.
                </p>
              </div>

              <div>
                <h3 className="text-base font-semibold font-heading text-primary mb-2">
                  Can I change plans anytime?
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Absolutely! You can upgrade or downgrade your plan at any time. Changes take effect immediately, 
                  and we'll prorate any billing adjustments.
                </p>
              </div>

              <div>
                <h3 className="text-base font-semibold font-heading text-primary mb-2">
                  Do you offer refunds?
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  We offer a 30-day money-back guarantee for all paid plans. If you're not satisfied, 
                  contact us within 30 days for a full refund.
                </p>
              </div>

              <div>
                <h3 className="text-base font-semibold font-heading text-primary mb-2">
                  What payment methods do you accept?
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  We accept all major credit cards (Visa, MasterCard, American Express) and PayPal. 
                  Enterprise customers can also pay by bank transfer.
                </p>
              </div>

              <div>
                <h3 className="text-base font-semibold font-heading text-primary mb-2">
                  Is my data secure?
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Yes! We use bank-level encryption and are fully GDPR compliant. Your content and data 
                  are never used to train our models or shared with third parties.
                </p>
              </div>

              <div>
                <h3 className="text-base font-semibold font-heading text-primary mb-2">
                  Do you offer custom enterprise solutions?
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Yes! Our Enterprise plan includes custom AI models, on-premise deployment options, 
                  and dedicated support. Contact our sales team to discuss your specific requirements.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 px-6 bg-primary">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-lg md:text-xl font-bold font-heading text-white mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-lg text-white/90 mb-6 leading-relaxed">
            Join thousands of teams already creating amazing content with Emerlya AI. 
            Start your free trial today - no credit card required.
          </p>
          <div className="flex justify-center space-x-4">
            <Link href="/login">
              <button className="px-6 py-3 bg-accent text-primary rounded-lg font-medium hover:shadow-xl transition-all duration-200 hover:-translate-y-1">
                Start Free Trial
              </button>
            </Link>
            <Link href="/contact">
              <button className="px-6 py-3 bg-white/10 backdrop-blur-md border border-white/30 text-white rounded-lg font-medium hover:bg-white/20 transition-all duration-200">
                Contact Sales
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-primary py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center">
                  <span className="text-primary font-bold font-heading">E</span>
                </div>
                <span className="text-xl font-semibold font-heading text-white">Emerlya AI</span>
              </div>
              <p className="text-white/80 text-sm leading-relaxed">
                Intelligent content generation for modern teams.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold font-heading text-white mb-4">Product</h4>
              <ul className="space-y-2">
                <li><Link href="/features" className="text-white/80 hover:text-accent transition-colors text-sm">Features</Link></li>
                <li><Link href="/pricing" className="text-white/80 hover:text-accent transition-colors text-sm">Pricing</Link></li>
                <li><Link href="/api-docs" className="text-white/80 hover:text-accent transition-colors text-sm">API</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold font-heading text-white mb-4">Company</h4>
              <ul className="space-y-2">
                <li><Link href="/about" className="text-white/80 hover:text-accent transition-colors text-sm">About</Link></li>
                <li><Link href="/blog" className="text-white/80 hover:text-accent transition-colors text-sm">Blog</Link></li>
                <li><Link href="/contact" className="text-white/80 hover:text-accent transition-colors text-sm">Contact</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold font-heading text-white mb-4">Legal</h4>
              <ul className="space-y-2">
                <li><Link href="/privacy" className="text-white/80 hover:text-accent transition-colors text-sm">Privacy Policy</Link></li>
                <li><Link href="/terms" className="text-white/80 hover:text-accent transition-colors text-sm">Terms of Service</Link></li>
                <li><Link href="/gdpr" className="text-white/80 hover:text-accent transition-colors text-sm">GDPR</Link></li>
                <li><Link href="/cookies" className="text-white/80 hover:text-accent transition-colors text-sm">Cookie Policy</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="mt-12 pt-8 border-t border-white/20 text-center text-sm text-white/60">
            <p>© 2025 Emerlya AI. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
