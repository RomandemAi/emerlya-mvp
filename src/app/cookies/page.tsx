import Link from 'next/link';

export default function CookiePolicy() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral via-white to-neutral">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 px-6 py-3 backdrop-blur-xl bg-primary/90 border-b border-primary/20">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Link href="/" className="flex items-center space-x-3">
            <div className="relative w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center overflow-hidden">
              {/* Data Flow E Logo */}
              <div className="relative">
                <span className="text-white font-bold text-xl font-heading relative z-10">E</span>
                {/* Animated data particles */}
                <div className="absolute inset-0 opacity-30">
                  <div className="absolute w-1 h-1 bg-accent rounded-full animate-pulse" style={{top: '20%', left: '15%', animationDelay: '0s'}}></div>
                  <div className="absolute w-1 h-1 bg-white rounded-full animate-pulse" style={{top: '60%', left: '80%', animationDelay: '0.5s'}}></div>
                  <div className="absolute w-0.5 h-0.5 bg-accent rounded-full animate-pulse" style={{top: '80%', left: '25%', animationDelay: '1s'}}></div>
                  <div className="absolute w-0.5 h-0.5 bg-white rounded-full animate-pulse" style={{top: '35%', left: '70%', animationDelay: '1.5s'}}></div>
                </div>
              </div>
            </div>
            <span className="text-xl font-semibold text-white font-heading hover:text-accent transition-colors">
              Emerlya AI
            </span>
          </Link>
          <div className="flex items-center space-x-6">
            <Link href="/" className="flex items-center space-x-2 px-5 py-2 bg-white/20 backdrop-blur-md border border-white/30 text-white rounded-xl font-medium hover:bg-white/30 transition-all duration-200 hover:-translate-y-0.5">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              <span className="hidden sm:inline">Back to Home</span>
              <span className="sm:hidden">Back</span>
            </Link>
            <div className="hidden md:flex items-center space-x-6">
              <Link href="/about" className="text-white/80 hover:text-accent transition-colors">
                About
              </Link>
              <Link href="/privacy" className="text-white/80 hover:text-accent transition-colors">
                Privacy
              </Link>
              <Link href="/terms" className="text-white/80 hover:text-accent transition-colors">
                Terms
              </Link>
            </div>
            <Link href="/login">
              <button className="px-5 py-2 bg-accent text-primary rounded-xl font-medium hover:shadow-lg transition-all duration-200 hover:-translate-y-0.5">
                Get Started
              </button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Content */}
      <div className="pt-24 md:pt-32 pb-12 md:pb-20 px-4 md:px-6">
        <div className="max-w-4xl mx-auto">
          <div className="backdrop-blur-xl bg-white/60 rounded-2xl md:rounded-3xl p-6 md:p-12 shadow-2xl border border-white/50">
            <h1 className="text-2xl md:text-4xl font-bold text-gray-900 mb-6 md:mb-8">Cookie Policy</h1>
            <p className="text-xs md:text-sm text-gray-500 mb-6 md:mb-8">Last updated: January 9, 2025</p>
            
            <div className="prose prose-base md:prose-lg max-w-none space-y-6 md:space-y-8">
              <section>
                <h2 className="text-xl md:text-2xl font-semibold text-gray-900 mb-3 md:mb-4">What Are Cookies?</h2>
                <p className="text-sm md:text-base text-gray-600 leading-relaxed">
                  Cookies are small text files placed on your device when you visit a website. They help websites 
                  remember your preferences, keep you logged in, and provide a better user experience. This policy 
                  explains how Emerlya AI uses cookies in compliance with EU Cookie Law and GDPR.
                </p>
              </section>

              <section>
                <h2 className="text-xl md:text-2xl font-semibold text-gray-900 mb-3 md:mb-4">Types of Cookies We Use</h2>
                
                <div className="space-y-4 md:space-y-6">
                  <div className="bg-green-50 rounded-xl p-4 md:p-6">
                    <h3 className="text-lg md:text-xl font-semibold text-gray-800 mb-2 md:mb-3">🔒 Essential Cookies</h3>
                    <p className="text-sm md:text-base text-gray-600 mb-3">
                      These cookies are necessary for the website to function properly. They cannot be disabled.
                    </p>
                    <div className="overflow-x-auto">
                      <table className="w-full text-xs md:text-sm">
                        <thead>
                          <tr className="border-b border-green-200">
                            <th className="text-left py-2 text-gray-700">Cookie Name</th>
                            <th className="text-left py-2 text-gray-700">Purpose</th>
                            <th className="text-left py-2 text-gray-700">Duration</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="border-b border-green-100">
                            <td className="py-2 text-gray-600">sb-access-token</td>
                            <td className="py-2 text-gray-600">Authentication</td>
                            <td className="py-2 text-gray-600">Session</td>
                          </tr>
                          <tr className="border-b border-green-100">
                            <td className="py-2 text-gray-600">sb-refresh-token</td>
                            <td className="py-2 text-gray-600">Session management</td>
                            <td className="py-2 text-gray-600">30 days</td>
                          </tr>
                          <tr>
                            <td className="py-2 text-gray-600">cookie-consent</td>
                            <td className="py-2 text-gray-600">Remember cookie preferences</td>
                            <td className="py-2 text-gray-600">1 year</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>

                  <div className="bg-blue-50 rounded-xl p-4 md:p-6">
                    <h3 className="text-lg md:text-xl font-semibold text-gray-800 mb-2 md:mb-3">📊 Analytics Cookies</h3>
                    <p className="text-sm md:text-base text-gray-600 mb-3">
                      These help us understand how visitors interact with our website. Currently disabled by default.
                    </p>
                    <div className="overflow-x-auto">
                      <table className="w-full text-xs md:text-sm">
                        <thead>
                          <tr className="border-b border-blue-200">
                            <th className="text-left py-2 text-gray-700">Cookie Name</th>
                            <th className="text-left py-2 text-gray-700">Purpose</th>
                            <th className="text-left py-2 text-gray-700">Duration</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td className="py-2 text-gray-600">_ga</td>
                            <td className="py-2 text-gray-600">Google Analytics (optional)</td>
                            <td className="py-2 text-gray-600">2 years</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>

                  <div className="bg-purple-50 rounded-xl p-4 md:p-6">
                    <h3 className="text-lg md:text-xl font-semibold text-gray-800 mb-2 md:mb-3">⚙️ Functional Cookies</h3>
                    <p className="text-sm md:text-base text-gray-600 mb-3">
                      These enable personalized features and remember your preferences.
                    </p>
                    <div className="overflow-x-auto">
                      <table className="w-full text-xs md:text-sm">
                        <thead>
                          <tr className="border-b border-purple-200">
                            <th className="text-left py-2 text-gray-700">Cookie Name</th>
                            <th className="text-left py-2 text-gray-700">Purpose</th>
                            <th className="text-left py-2 text-gray-700">Duration</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td className="py-2 text-gray-600">theme-preference</td>
                            <td className="py-2 text-gray-600">UI preferences</td>
                            <td className="py-2 text-gray-600">1 year</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">Your Cookie Choices</h2>
                <div className="bg-gradient-to-r from-primary/10 to-accent/10 rounded-2xl p-6">
                  <p className="text-gray-700 mb-4">
                    You have full control over cookies. Here&#39;s how to manage them:
                  </p>
                  <ul className="list-disc pl-6 text-gray-600 space-y-2">
                    <li><strong>Accept/Reject:</strong> Use our cookie banner to accept or reject non-essential cookies</li>
                    <li><strong>Browser Settings:</strong> Configure your browser to block or delete cookies</li>
                    <li><strong>Manage Preferences:</strong> Change your cookie settings anytime in your account</li>
                  </ul>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">How to Control Cookies</h2>
                <p className="text-gray-600 leading-relaxed mb-4">
                  You can control and/or delete cookies through your browser settings:
                </p>
                <ul className="list-disc pl-6 text-gray-600 space-y-2">
                  <li><a href="https://support.google.com/chrome/answer/95647" target="_blank" rel="noopener noreferrer" className="text-primary hover:text-accent transition-colors">Chrome</a></li>
                  <li><a href="https://support.mozilla.org/en-US/kb/enable-and-disable-cookies-website-preferences" target="_blank" rel="noopener noreferrer" className="text-primary hover:text-accent transition-colors">Firefox</a></li>
                  <li><a href="https://support.apple.com/guide/safari/manage-cookies-and-website-data-sfri11471/mac" target="_blank" rel="noopener noreferrer" className="text-primary hover:text-accent transition-colors">Safari</a></li>
                  <li><a href="https://support.microsoft.com/en-us/microsoft-edge/delete-cookies-in-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09" target="_blank" rel="noopener noreferrer" className="text-primary hover:text-accent transition-colors">Edge</a></li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">Impact of Disabling Cookies</h2>
                <div className="bg-yellow-50 rounded-xl p-6">
                  <p className="text-gray-700">
                    <strong>⚠️ Important:</strong> Disabling essential cookies may affect website functionality:
                  </p>
                  <ul className="list-disc pl-6 text-gray-600 space-y-2 mt-3">
                    <li>You may not be able to log in</li>
                    <li>Some features may not work properly</li>
                    <li>Your preferences won&#39;t be saved</li>
                    <li>You may see the cookie banner repeatedly</li>
                  </ul>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">Third-Party Services</h2>
                <p className="text-gray-600 leading-relaxed mb-4">
                  We use the following third-party services that may set their own cookies:
                </p>
                <ul className="list-disc pl-6 text-gray-600 space-y-2">
                  <li><strong>Stripe:</strong> Payment processing (essential for purchases)</li>
                  <li><strong>Supabase:</strong> Authentication and database services</li>
                  <li><strong>Google Analytics:</strong> Website analytics (only with your consent)</li>
                </ul>
                <p className="text-gray-600 mt-4">
                  These services have their own privacy policies and cookie practices. We recommend reviewing them.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">Cookie Consent for EU Users</h2>
                <p className="text-gray-600 leading-relaxed">
                  In compliance with EU Cookie Law (ePrivacy Directive) and GDPR, we:
                </p>
                <ul className="list-disc pl-6 text-gray-600 space-y-2">
                  <li>Request explicit consent before setting non-essential cookies</li>
                  <li>Provide clear information about cookie usage</li>
                  <li>Allow you to withdraw consent at any time</li>
                  <li>Function without non-essential cookies if you decline</li>
                  <li>Remember your preferences for future visits</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">Updates to This Policy</h2>
                <p className="text-gray-600 leading-relaxed">
                  We may update this Cookie Policy to reflect changes in our practices or legal requirements. 
                  Significant changes will be communicated through our website or email.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">Contact Us</h2>
                <p className="text-gray-600 leading-relaxed mb-4">
                  Questions about our use of cookies? Contact us:
                </p>
                <div className="bg-gradient-to-r from-primary/10 to-accent/10 rounded-2xl p-6">
                  <p className="text-gray-700">
                    <strong>Email:</strong> <a href="mailto:privacy@emerlya.com" className="text-primary hover:text-accent transition-colors">privacy@emerlya.com</a><br />
                    <strong>Data Protection Officer:</strong> <a href="mailto:dpo@emerlya.com" className="text-primary hover:text-accent transition-colors">dpo@emerlya.com</a><br />
                    <strong>Address:</strong> Amsterdam, Netherlands
                  </p>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white/80 backdrop-blur-md border-t border-gray-200/50 py-8 px-6">
        <div className="max-w-7xl mx-auto text-center text-sm text-gray-600">
          <p>© 2025 Emerlya AI. All rights reserved. | Built with ❤️ in the EU 🇪🇺</p>
          <div className="mt-4 flex justify-center space-x-6">
            <Link href="/privacy" className="hover:text-gray-900">Privacy</Link>
            <Link href="/terms" className="hover:text-gray-900">Terms</Link>
            <Link href="/gdpr" className="hover:text-gray-900">GDPR</Link>
            <Link href="/cookies" className="hover:text-gray-900">Cookies</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
