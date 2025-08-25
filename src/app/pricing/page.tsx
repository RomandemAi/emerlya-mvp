import Link from 'next/link';
import UnifiedNavBar from '@/components/UnifiedNavBar';
import PricingCheckoutButton from '@/components/PricingCheckoutButton';
import TopUpButton from '@/components/TopUpButton';
import { LightbulbIcon, DollarIcon, RocketIcon } from '@/components/icons';
import { CheckIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { createClient } from '@/lib/supabase/server';

export default async function PricingPage() {
  // Check if user is logged in and their current subscription
  const supabase = await createClient();
  const { data: { session } } = await supabase.auth.getSession();
  
  let currentSubscription = null;
  if (session) {
    const { data: profile } = await supabase
      .from('profiles')
      .select('subscription_status')
      .eq('id', session.user.id)
      .single();
    currentSubscription = profile?.subscription_status || 'free';
  }

  // Define tier hierarchy for upgrade logic
  const tierHierarchy = ['free', 'essentials', 'professional', 'business', 'enterprise'];
  const currentTierIndex = currentSubscription ? tierHierarchy.indexOf(currentSubscription) : -1;
  
  // Helper function to check if a plan should be shown
  const shouldShowPlan = (planTier: string) => {
    if (!currentSubscription) return true; // Show all plans for logged-out users
    if (currentSubscription === 'active') return true; // Legacy users see all plans
    
    const planIndex = tierHierarchy.indexOf(planTier);
    return planIndex > currentTierIndex; // Only show plans above current tier
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral via-white to-neutral">
      {/* Navigation */}
      <UnifiedNavBar />

      {/* Hero Section */}
      <section className="pt-20 pb-6 px-6 bg-gradient-to-br from-primary via-primary/95 to-primary/90">
        <div className="max-w-5xl mx-auto text-center">
          <div className="flex justify-center mb-4">
            <img 
              src="/emerlya-logo.svg" 
              alt="Emerlya AI Logo" 
              className="w-12 h-12 object-contain filter brightness-0 invert"
            />
          </div>
          <h1 className="text-xl md:text-2xl font-bold font-heading text-white mb-4">
            {currentSubscription ? (
              <>
                Upgrade Your
                <span className="block text-accent">
                  {currentSubscription === 'free' ? 'Free Plan' : 
                   currentSubscription === 'essentials' ? 'Essentials Plan' :
                   currentSubscription === 'professional' ? 'Professional Plan' :
                   currentSubscription === 'business' ? 'Business Plan' :
                   currentSubscription === 'active' ? 'Legacy Plan' : 'Current Plan'}
                </span>
              </>
            ) : (
              <>
                Simple, Transparent
                <span className="block text-accent">
                  Pricing for Everyone
                </span>
              </>
            )}
          </h1>
          <p className="text-base md:text-lg text-white/90 max-w-2xl mx-auto mb-6 leading-relaxed">
            {currentSubscription ? (
              currentSubscription === 'free' ? 
                'Unlock more features and higher limits with a paid plan. Upgrade anytime with no long-term commitment.' :
              currentSubscription === 'active' ?
                'You\'re on our legacy plan with grandfathered pricing. Explore our new plans for additional features.' :
              currentTierIndex >= tierHierarchy.indexOf('business') ?
                'You\'re on our highest tier! Contact us for enterprise solutions or custom plans.' :
                'Upgrade to unlock even more content generation power and advanced features.'
            ) : (
              'Choose the perfect plan for your content needs. Start free, upgrade anytime. No hidden fees, no long-term contracts.'
            )}
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
      <section className="py-4 px-6">
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
          {currentSubscription && (
            <div className="text-center mb-8">
              <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20 rounded-full">
                <span className="text-primary font-medium">
                  Current Plan: {
                    currentSubscription === 'free' ? 'Starter (Free)' :
                    currentSubscription === 'essentials' ? 'Essentials' :
                    currentSubscription === 'professional' ? 'Professional' :
                    currentSubscription === 'business' ? 'Business' :
                    currentSubscription === 'active' ? 'Legacy Pro' : 'Unknown'
                  }
                </span>
              </div>
            </div>
          )}
          {/* Show message for users on highest tier */}
          {currentSubscription && currentTierIndex >= tierHierarchy.indexOf('business') && currentSubscription !== 'active' && (
            <div className="text-center py-12">
              <div className="backdrop-blur-xl bg-white/80 rounded-3xl p-8 shadow-xl border border-purple-200 max-w-2xl mx-auto">
                <div className="text-6xl mb-6">🎉</div>
                <h3 className="text-2xl font-bold text-purple-700 mb-4">You're on our highest tier!</h3>
                <p className="text-gray-600 mb-6">
                  You have access to all our premium features. Need something custom? Let's talk!
                </p>
                <a href="/contact" className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all duration-200">
                  Contact Sales for Enterprise
                </a>
              </div>
            </div>
          )}

          <div className={`grid gap-6 ${currentSubscription && currentTierIndex >= tierHierarchy.indexOf('business') && currentSubscription !== 'active' ? 'hidden' : ''} grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4`}>
            
            {/* Free Plan */}
            {shouldShowPlan('free') && (
            <div className={`backdrop-blur-xl bg-white/80 rounded-2xl p-4 sm:p-6 shadow-xl border transition-all duration-300 relative ${
              currentSubscription === 'free' ? 'border-primary ring-2 ring-primary/20' : 'border-white/50 hover:shadow-2xl'
            }`}>
              {currentSubscription === 'free' && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <span className="bg-primary text-white px-3 py-1 rounded-full text-xs font-medium">
                    Current Plan
                  </span>
                </div>
              )}
              <div className="text-center mb-6">
                <h3 className="text-lg font-bold font-heading text-primary mb-2">Starter</h3>
                <p className="text-sm text-gray-600 mb-4">Perfect for trying out AI content</p>
                <div className="mb-4">
                  <span className="text-3xl font-bold text-primary">€0</span>
                  <span className="text-gray-600 ml-2">/month</span>
                </div>
                <PricingCheckoutButton
                  planName="Starter"
                  className={`w-full px-5 py-2.5 rounded-lg font-medium text-sm transition-colors ${
                    currentSubscription === 'free' 
                      ? 'bg-gray-200 text-gray-500 cursor-not-allowed' 
                      : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                  }`}
                  disabled={currentSubscription === 'free'}
                >
                  {currentSubscription === 'free' ? 'Current Plan' : 'Get Started Free'}
                </PricingCheckoutButton>
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
                  <CheckIcon className="w-4 h-4 text-accent mr-3 flex-shrink-0" />
                  <span className="text-sm text-gray-600">Top-up options</span>
                </li>
                <li className="flex items-center">
                  <XMarkIcon className="w-4 h-4 text-gray-400 mr-3 flex-shrink-0" />
                  <span className="text-sm text-gray-400">Document analysis</span>
                </li>
              </ul>
            </div>
            )}

            {/* NEW Essentials Plan */}
            {shouldShowPlan('essentials') && (
            <div className={`backdrop-blur-xl bg-white/80 rounded-2xl p-4 sm:p-6 shadow-xl border transition-all duration-300 relative ${
              currentSubscription === 'essentials' ? 'border-green-400 ring-2 ring-green-200' : 
              currentSubscription === 'free' ? 'border-green-300 hover:border-green-400' : 'border-green-200 hover:border-green-300 hover:shadow-2xl'
            }`}>
              {currentSubscription === 'essentials' && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <span className="bg-green-600 text-white px-3 py-1 rounded-full text-xs font-medium">
                    Current Plan
                  </span>
                </div>
              )}
              {currentSubscription === 'free' && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <span className="bg-accent text-primary px-3 py-1 rounded-full text-xs font-medium">
                    Recommended Upgrade
                  </span>
                </div>
              )}
              <div className="text-center mb-6">
                <h3 className="text-lg font-bold font-heading text-green-700 mb-2">Essentials</h3>
                <p className="text-sm text-gray-600 mb-4">Great value for content creators</p>
                <div className="mb-1">
                  <span className="text-sm text-gray-500 line-through">€15</span>
                  <span className="text-3xl font-bold text-green-600 ml-2">€9</span>
                  <span className="text-gray-600 ml-1">/month</span>
                </div>
                <div className="text-xs text-green-600 font-medium mb-4 bg-green-50 px-2 py-1 rounded-full inline-block">
                  40% more affordable!
                </div>
                <PricingCheckoutButton
                  planName="Essentials"
                  className={`w-full px-5 py-2.5 rounded-lg font-medium text-sm transition-all duration-200 ${
                    currentSubscription === 'essentials' 
                      ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                      : 'bg-gradient-to-r from-green-500 to-green-600 text-white hover:shadow-lg'
                  }`}
                  disabled={currentSubscription === 'essentials'}
                >
                  {currentSubscription === 'essentials' ? 'Current Plan' : 'Start 14-Day Trial'}
                </PricingCheckoutButton>
              </div>
              
              <ul className="space-y-3">
                <li className="flex items-center">
                  <CheckIcon className="w-4 h-4 text-accent mr-3 flex-shrink-0" />
                  <span className="text-sm text-gray-600">20,000 words/month</span>
                </li>
                <li className="flex items-center">
                  <CheckIcon className="w-4 h-4 text-accent mr-3 flex-shrink-0" />
                  <span className="text-sm text-gray-600">3 brand profiles</span>
                </li>
                <li className="flex items-center">
                  <CheckIcon className="w-4 h-4 text-accent mr-3 flex-shrink-0" />
                  <span className="text-sm text-gray-600">All content types</span>
                </li>
                <li className="flex items-center">
                  <CheckIcon className="w-4 h-4 text-accent mr-3 flex-shrink-0" />
                  <span className="text-sm text-gray-600">Email support</span>
                </li>
                <li className="flex items-center">
                  <CheckIcon className="w-4 h-4 text-accent mr-3 flex-shrink-0" />
                  <span className="text-sm text-gray-600">Basic analytics</span>
                </li>
                <li className="flex items-center">
                  <XMarkIcon className="w-4 h-4 text-gray-400 mr-3 flex-shrink-0" />
                  <span className="text-sm text-gray-400">Team collaboration</span>
                </li>
              </ul>
            </div>
            )}

            {/* Professional Plan - Most Popular */}
            {shouldShowPlan('professional') && (
            <div className="backdrop-blur-xl bg-white/80 rounded-2xl p-6 shadow-xl border-2 border-accent hover:shadow-2xl transition-all duration-300 relative">
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <span className="bg-gradient-to-r from-primary to-accent text-white px-4 py-1.5 rounded-full text-sm font-medium">
                  Most Popular
                </span>
              </div>
              
              <div className="text-center mb-6">
                <h3 className="text-lg font-bold font-heading text-primary mb-2">Professional</h3>
                <p className="text-sm text-gray-600 mb-4">For growing businesses</p>
                <div className="mb-1">
                  <span className="text-sm text-gray-500 line-through">€29</span>
                  <span className="text-3xl font-bold text-primary ml-2">€19</span>
                  <span className="text-gray-600 ml-1">/month</span>
                </div>
                <div className="text-xs text-emerald-600 font-medium mb-4 bg-emerald-50 px-2 py-1 rounded-full inline-block">
                  60% more affordable!
                </div>
                <PricingCheckoutButton
                  planName="Professional"
                  className="w-full px-5 py-2.5 bg-gradient-to-r from-primary to-accent text-white rounded-lg font-medium text-sm hover:shadow-lg transition-all duration-200"
                >
                  Start Free Trial
                </PricingCheckoutButton>
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
                  <span className="text-sm text-gray-600">Advanced analytics</span>
                </li>
              </ul>
            </div>
            )}

            {/* Business Plan */}
            {shouldShowPlan('business') && (
            <div className="backdrop-blur-xl bg-white/80 rounded-2xl p-6 shadow-xl border border-purple-200 hover:border-purple-300 hover:shadow-2xl transition-all duration-300">
              <div className="text-center mb-6">
                <h3 className="text-lg font-bold font-heading text-purple-700 mb-2">Business</h3>
                <p className="text-sm text-gray-600 mb-4">For teams and agencies</p>
                <div className="mb-4">
                  <span className="text-3xl font-bold text-purple-600">€39</span>
                  <span className="text-gray-600 ml-2">/month</span>
                </div>
                <PricingCheckoutButton
                  planName="Business"
                  className="w-full px-5 py-2.5 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-lg font-medium text-sm hover:shadow-lg transition-all duration-200"
                >
                  Start Free Trial
                </PricingCheckoutButton>
              </div>
              
              <ul className="space-y-3">
                <li className="flex items-center">
                  <CheckIcon className="w-4 h-4 text-accent mr-3 flex-shrink-0" />
                  <span className="text-sm text-gray-600">150,000 words/month</span>
                </li>
                <li className="flex items-center">
                  <CheckIcon className="w-4 h-4 text-accent mr-3 flex-shrink-0" />
                  <span className="text-sm text-gray-600">Unlimited brands</span>
                </li>
                <li className="flex items-center">
                  <CheckIcon className="w-4 h-4 text-accent mr-3 flex-shrink-0" />
                  <span className="text-sm text-gray-600">Team collaboration (5 users)</span>
                </li>
                <li className="flex items-center">
                  <CheckIcon className="w-4 h-4 text-accent mr-3 flex-shrink-0" />
                  <span className="text-sm text-gray-600">API access included</span>
                </li>
                <li className="flex items-center">
                  <CheckIcon className="w-4 h-4 text-accent mr-3 flex-shrink-0" />
                  <span className="text-sm text-gray-600">Priority support</span>
                </li>
                <li className="flex items-center">
                  <CheckIcon className="w-4 h-4 text-accent mr-3 flex-shrink-0" />
                  <span className="text-sm text-gray-600">Advanced analytics</span>
                </li>
              </ul>
            </div>
            )}
          </div>
        </div>
      </section>

      {/* Top-Up Options Section */}
      <section className="py-8 px-6 bg-gradient-to-r from-accent/5 to-primary/5">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold font-heading text-gray-900 mb-4">
              Need More Words? <span className="text-accent">Top Up Instantly!</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Already on a plan but need extra words this month? Buy top-ups instantly without changing your subscription.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {/* Micro Top-Up */}
            <div className="backdrop-blur-xl bg-white/90 rounded-2xl p-6 shadow-xl border border-blue-200 hover:border-blue-300 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full mb-4">
                  <LightbulbIcon className="text-primary" size={32} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Micro Top-Up</h3>
                <div className="text-3xl font-bold text-blue-600 mb-2">€5</div>
                <p className="text-gray-600 mb-4">5,000 extra words</p>
                <div className="text-sm text-gray-500 mb-6">
                  <div>• Instant activation</div>
                  <div>• Perfect for quick boosts</div>
                  <div>• €0.001 per word</div>
                  <div>• Great value option</div>
                </div>
                <TopUpButton
                  packageType="small"
                  words={5000}
                  price={5}
                  className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white py-3 px-6 rounded-xl font-semibold transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5"
                >
                  Buy 5,000 Words
                </TopUpButton>
              </div>
            </div>

            {/* Standard Top-Up */}
            <div className="backdrop-blur-xl bg-white/90 rounded-2xl p-6 shadow-xl border border-green-200 hover:border-green-300 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-green-100 rounded-full mb-4">
                  <DollarIcon className="text-green-600" size={32} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Standard Top-Up</h3>
                <div className="text-3xl font-bold text-green-600 mb-2">€10</div>
                <p className="text-gray-600 mb-4">12,000 extra words</p>
                <div className="text-sm text-gray-500 mb-6">
                  <div>• Instant activation</div>
                  <div>• One-time payment</div>
                  <div>• €0.00083 per word</div>
                  <div>• 20% better value</div>
                </div>
                <TopUpButton
                  packageType="medium"
                  words={12000}
                  price={10}
                  className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white py-3 px-6 rounded-xl font-semibold transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5"
                >
                  Buy 12,000 Words
                </TopUpButton>
              </div>
            </div>

            {/* Value Top-Up */}
            <div className="backdrop-blur-xl bg-white/90 rounded-2xl p-6 shadow-xl border border-purple-200 hover:border-purple-300 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 relative">
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <span className="bg-gradient-to-r from-purple-500 to-purple-600 text-white px-4 py-1 rounded-full text-sm font-medium">
                  Best Value
                </span>
              </div>
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-purple-100 rounded-full mb-4">
                  <RocketIcon className="text-accent" size={32} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Value Top-Up</h3>
                <div className="text-3xl font-bold text-purple-600 mb-2">€25</div>
                <p className="text-gray-600 mb-4">35,000 extra words</p>
                <div className="text-sm text-gray-500 mb-6">
                  <div>• Instant activation</div>
                  <div>• Best value per word</div>
                  <div>• €0.00071 per word</div>
                  <div>• 30% better value</div>
                </div>
                <TopUpButton
                  packageType="large"
                  words={35000}
                  price={25}
                  className="w-full bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white py-3 px-6 rounded-xl font-semibold transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5"
                >
                  Buy 35,000 Words
                </TopUpButton>
              </div>
            </div>
          </div>

          <div className="text-center mt-8">
            <p className="text-sm text-gray-600 max-w-md mx-auto">
              💡 <strong>Pro Tip:</strong> Top-ups are added to your current plan and don't expire. 
              Credits are used before your monthly allowance resets.
            </p>
          </div>
        </div>
      </section>

      {/* API Pricing Section */}
      <section className="py-8 px-6 bg-gradient-to-r from-blue-50 to-indigo-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold font-heading text-gray-900 mb-4">
              Developer <span className="text-blue-600">API Access</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Integrate Emerlya AI directly into your applications, websites, or workflows with our powerful API.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Free API */}
            <div className="backdrop-blur-xl bg-white/90 rounded-2xl p-6 shadow-xl border border-gray-200 hover:border-gray-300 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-gray-100 rounded-full mb-4">
                  <span className="text-2xl">🔑</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Developer Free</h3>
                <div className="text-3xl font-bold text-gray-600 mb-2">€0</div>
                <p className="text-gray-600 mb-4">500 requests/month</p>
                <div className="text-sm text-gray-500 mb-6 space-y-1">
                  <div>• Basic content generation</div>
                  <div>• 10 requests/minute</div>
                  <div>• Community support</div>
                  <div>• 1 API key</div>
                </div>
                <PricingCheckoutButton
                  planName="Starter"
                  className="w-full bg-gray-600 hover:bg-gray-700 text-white py-3 px-6 rounded-xl font-semibold transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5"
                >
                  Get Free API Key
                </PricingCheckoutButton>
              </div>
            </div>

            {/* Starter API */}
            <div className="backdrop-blur-xl bg-white/90 rounded-2xl p-6 shadow-xl border border-blue-200 hover:border-blue-300 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full mb-4">
                  <span className="text-2xl">⚡</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Developer Starter</h3>
                <div className="mb-2">
                  <span className="text-sm text-gray-500 line-through">€15</span>
                  <span className="text-3xl font-bold text-blue-600 ml-2">€9</span>
                  <span className="text-gray-600 ml-1">/month</span>
                </div>
                <p className="text-gray-600 mb-4">2,000 requests/month</p>
                <div className="text-sm text-gray-500 mb-6 space-y-1">
                  <div>• All content types</div>
                  <div>• 50 requests/minute</div>
                  <div>• Email support</div>
                  <div>• 3 API keys</div>
                </div>
                <PricingCheckoutButton
                  planName="Essentials"
                  className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white py-3 px-6 rounded-xl font-semibold transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5"
                >
                  Get Starter API
                </PricingCheckoutButton>
              </div>
            </div>

            {/* Pro API */}
            <div className="backdrop-blur-xl bg-white/90 rounded-2xl p-6 shadow-xl border border-purple-200 hover:border-purple-300 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 relative">
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <span className="bg-gradient-to-r from-purple-500 to-purple-600 text-white px-4 py-1 rounded-full text-sm font-medium">
                  Most Popular
                </span>
              </div>
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-purple-100 rounded-full mb-4">
                  <RocketIcon className="text-accent" size={32} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Developer Pro</h3>
                <div className="mb-2">
                  <span className="text-sm text-gray-500 line-through">€49</span>
                  <span className="text-3xl font-bold text-purple-600 ml-2">€29</span>
                  <span className="text-gray-600 ml-1">/month</span>
                </div>
                <p className="text-gray-600 mb-4">15,000 requests/month</p>
                <div className="text-sm text-gray-500 mb-6 space-y-1">
                  <div>• Advanced features</div>
                  <div>• 150 requests/minute</div>
                  <div>• Priority support</div>
                  <div>• 10 API keys</div>
                </div>
                <PricingCheckoutButton
                  planName="Professional"
                  className="w-full bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white py-3 px-6 rounded-xl font-semibold transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5"
                >
                  Get Pro API
                </PricingCheckoutButton>
              </div>
            </div>

            {/* Enterprise API */}
            <div className="backdrop-blur-xl bg-white/90 rounded-2xl p-6 shadow-xl border border-orange-200 hover:border-orange-300 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-orange-100 rounded-full mb-4">
                  <span className="text-2xl">🏢</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Enterprise API</h3>
                <div className="text-3xl font-bold text-orange-600 mb-2">€99</div>
                <p className="text-gray-600 mb-4">50,000 requests/month</p>
                <div className="text-sm text-gray-500 mb-6 space-y-1">
                  <div>• Custom integrations</div>
                  <div>• 500 requests/minute</div>
                  <div>• Dedicated support</div>
                  <div>• Unlimited keys</div>
                </div>
                <PricingCheckoutButton
                  planName="Business"
                  className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white py-3 px-6 rounded-xl font-semibold transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5"
                >
                  Get Enterprise API
                </PricingCheckoutButton>
              </div>
            </div>
          </div>

          <div className="text-center mt-8">
            <p className="text-sm text-gray-600 max-w-2xl mx-auto mb-4">
              🔗 <strong>Easy Integration:</strong> RESTful API with comprehensive documentation, 
              SDKs, and code examples. Get up and running in minutes.
            </p>
            <a 
              href="/api-docs" 
              className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium text-sm"
            >
              View API Documentation →
            </a>
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
            <PricingCheckoutButton
              planName="Starter"
              className="px-6 py-3 bg-accent text-primary rounded-lg font-medium hover:shadow-xl transition-all duration-200 hover:-translate-y-1"
            >
              Start Free Trial
            </PricingCheckoutButton>
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
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
