import Link from 'next/link';

export default function GDPRPage() {
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
            <Link href="/features" className="text-white/80 hover:text-accent transition-colors">
              Features
            </Link>
            <Link href="/pricing" className="text-white/80 hover:text-accent transition-colors">
              Pricing
            </Link>
            <Link href="/blog" className="text-white/80 hover:text-accent transition-colors">
              Blog
            </Link>
            <Link href="/about" className="text-white/80 hover:text-accent transition-colors">
              About
            </Link>
            <Link href="/privacy" className="text-white/80 hover:text-accent transition-colors">
              Privacy
            </Link>
            <Link href="/terms" className="text-white/80 hover:text-accent transition-colors">
              Terms
            </Link>
            <Link href="/gdpr" className="text-accent font-medium">
              GDPR
            </Link>
            <Link href="/demo">
              <button className="px-5 py-2 bg-accent text-primary rounded-xl font-medium hover:shadow-lg transition-all duration-200 hover:-translate-y-0.5">
                Request Demo
              </button>
            </Link>
            <Link href="/login">
              <button className="px-5 py-2 border border-white/30 text-white rounded-xl font-medium hover:bg-white/10 transition-all duration-200">
                Login
              </button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-24 pb-8 px-6 bg-gradient-to-br from-primary via-primary/95 to-primary/90">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-xl md:text-2xl font-bold font-heading text-white mb-4">
            GDPR Rights & 
            <span className="block text-accent">
              Compliance
            </span>
          </h1>
          <p className="text-base text-white/90 max-w-2xl mx-auto mb-6 leading-relaxed">
            Your Data Protection Rights Under EU Law
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-8 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="backdrop-blur-xl bg-white/80 rounded-2xl p-8 shadow-xl border border-white/50">
            <div className="space-y-8">
              <section>
                <h2 className="text-lg md:text-xl font-bold font-heading text-primary mb-4">Your Rights at a Glance</h2>
                <div className="bg-gradient-to-r from-primary/5 to-accent/5 rounded-xl p-6 border border-primary/10">
                  <p className="text-gray-700 font-medium">
                    Under the General Data Protection Regulation (GDPR), you have comprehensive rights regarding 
                    your personal data. We are committed to respecting and facilitating the exercise of these rights.
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-lg md:text-xl font-bold font-heading text-primary mb-4">1. Right to Access (Article 15)</h2>
                <p className="text-gray-600 leading-relaxed mb-4">
                  You have the right to obtain confirmation whether we process your personal data and access to:
                </p>
                <ul className="list-disc pl-6 text-gray-600 space-y-2">
                  <li>A copy of your personal data</li>
                  <li>The purposes of processing</li>
                  <li>Categories of data processed</li>
                  <li>Recipients of your data</li>
                  <li>Data retention periods</li>
                  <li>Your rights regarding the data</li>
                </ul>
                <div className="mt-4 p-4 bg-blue-50 rounded-xl">
                  <p className="text-sm text-blue-800">
                    <strong>How to exercise:</strong> Email us at privacy@emerlya.com with "Data Access Request" in the subject line.
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-lg md:text-xl font-bold font-heading text-primary mb-4">2. Right to Rectification (Article 16)</h2>
                <p className="text-gray-600 leading-relaxed mb-4">
                  You can request correction of inaccurate personal data or completion of incomplete data.
                </p>
                <div className="mt-4 p-4 bg-blue-50 rounded-xl">
                  <p className="text-sm text-blue-800">
                    <strong>How to exercise:</strong> Update your profile in the dashboard or contact us for assistance.
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-lg md:text-xl font-bold font-heading text-primary mb-4">3. Right to Erasure - "Right to be Forgotten" (Article 17)</h2>
                <p className="text-gray-600 leading-relaxed mb-4">
                  You can request deletion of your personal data when:
                </p>
                <ul className="list-disc pl-6 text-gray-600 space-y-2">
                  <li>Data is no longer necessary for original purposes</li>
                  <li>You withdraw consent (where consent is the legal basis)</li>
                  <li>You object to processing and no overriding legitimate grounds exist</li>
                  <li>Data was unlawfully processed</li>
                  <li>Legal obligation requires erasure</li>
                </ul>
                <div className="mt-4 p-4 bg-blue-50 rounded-xl">
                  <p className="text-sm text-blue-800">
                    <strong>How to exercise:</strong> Submit a deletion request at privacy@emerlya.com. We'll process it within 30 days.
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-lg md:text-xl font-bold font-heading text-primary mb-4">4. Right to Data Portability (Article 20)</h2>
                <p className="text-gray-600 leading-relaxed mb-4">
                  You can receive your personal data in a structured, commonly used, and machine-readable format, and transmit it to another controller.
                </p>
                <div className="mt-4 p-4 bg-blue-50 rounded-xl">
                  <p className="text-sm text-blue-800">
                    <strong>How to exercise:</strong> Request data export via privacy@emerlya.com. We'll provide JSON or CSV format.
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-lg md:text-xl font-bold font-heading text-primary mb-4">5. Right to Object (Article 21)</h2>
                <p className="text-gray-600 leading-relaxed mb-4">
                  You can object to processing based on legitimate interests or for direct marketing purposes.
                </p>
                <div className="mt-4 p-4 bg-blue-50 rounded-xl">
                  <p className="text-sm text-blue-800">
                    <strong>How to exercise:</strong> Use the unsubscribe link in emails or contact privacy@emerlya.com.
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-lg md:text-xl font-bold font-heading text-primary mb-4">6. Right to Restriction (Article 18)</h2>
                <p className="text-gray-600 leading-relaxed mb-4">
                  You can request restriction of processing when:
                </p>
                <ul className="list-disc pl-6 text-gray-600 space-y-2">
                  <li>You contest data accuracy</li>
                  <li>Processing is unlawful but you oppose erasure</li>
                  <li>We no longer need the data but you need it for legal claims</li>
                  <li>You've objected pending verification of legitimate grounds</li>
                </ul>
              </section>

              <section>
                <h2 className="text-lg md:text-xl font-bold font-heading text-primary mb-4">7. Rights Related to Automated Decision-Making (Article 22)</h2>
                <p className="text-gray-600 leading-relaxed">
                  You have the right not to be subject to decisions based solely on automated processing, including profiling, 
                  which produces legal or similarly significant effects. Our AI generates content but doesn't make automated 
                  decisions about you personally.
                </p>
              </section>

              <section>
                <h2 className="text-lg md:text-xl font-bold font-heading text-primary mb-4">How We Handle Your Requests</h2>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-white/80 rounded-xl p-6 border border-gray-200">
                    <h3 className="font-semibold text-gray-900 mb-3">⏱️ Response Time</h3>
                    <p className="text-gray-600 text-sm">
                      We respond to all requests within 30 days. Complex requests may take up to 90 days with notice.
                    </p>
                  </div>
                  <div className="bg-white/80 rounded-xl p-6 border border-gray-200">
                    <h3 className="font-semibold text-gray-900 mb-3">🆓 Free of Charge</h3>
                    <p className="text-gray-600 text-sm">
                      First request is always free. Excessive or repetitive requests may incur a reasonable fee.
                    </p>
                  </div>
                  <div className="bg-white/80 rounded-xl p-6 border border-gray-200">
                    <h3 className="font-semibold text-gray-900 mb-3">✅ Identity Verification</h3>
                    <p className="text-gray-600 text-sm">
                      We may request additional information to confirm your identity before processing requests.
                    </p>
                  </div>
                  <div className="bg-white/80 rounded-xl p-6 border border-gray-200">
                    <h3 className="font-semibold text-gray-900 mb-3">📝 Documentation</h3>
                    <p className="text-gray-600 text-sm">
                      All requests and actions taken are documented for compliance and audit purposes.
                    </p>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-lg md:text-xl font-bold font-heading text-primary mb-4">Data Protection Measures</h2>
                <ul className="list-disc pl-6 text-gray-600 space-y-2">
                  <li><strong>Encryption:</strong> All data encrypted in transit and at rest</li>
                  <li><strong>Access Control:</strong> Role-based access with multi-factor authentication</li>
                  <li><strong>Regular Audits:</strong> Security assessments and penetration testing</li>
                  <li><strong>Data Minimization:</strong> We only collect necessary data</li>
                  <li><strong>Privacy by Design:</strong> Data protection built into all processes</li>
                </ul>
              </section>

              <section>
                <h2 className="text-lg md:text-xl font-bold font-heading text-primary mb-4">Contact Our Data Protection Team</h2>
                <div className="bg-gradient-to-r from-primary/5 to-accent/5 rounded-xl p-6 border border-primary/10">
                  <div className="space-y-3">
                    <p className="text-gray-700">
                      <strong>Data Protection Officer:</strong><br />
                      Email: <a href="mailto:dpo@emerlya.com" className="text-accent hover:text-primary font-medium">dpo@emerlya.com</a>
                    </p>
                    <p className="text-gray-700">
                      <strong>Privacy Team:</strong><br />
                      Email: <a href="mailto:privacy@emerlya.com" className="text-accent hover:text-primary font-medium">privacy@emerlya.com</a>
                    </p>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-lg md:text-xl font-bold font-heading text-primary mb-4">Lodge a Complaint</h2>
                <p className="text-gray-600 leading-relaxed mb-4">
                  If you're unsatisfied with how we handle your data or requests, you have the right to lodge a complaint with:
                </p>
                <div className="bg-orange-50 rounded-xl p-6">
                  <p className="text-gray-700 font-medium mb-2">Dutch Data Protection Authority</p>
                  <p className="text-gray-600 text-sm">
                    Autoriteit Persoonsgegevens<br />
                    Website: <a href="https://autoriteitpersoonsgegevens.nl" className="text-accent hover:text-primary" target="_blank" rel="noopener noreferrer">autoriteitpersoonsgegevens.nl</a><br />
                    Phone: 0900-2001201
                  </p>
                </div>
              </section>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 px-6 bg-primary">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-lg md:text-xl font-bold font-heading text-white mb-4">
            Questions About Your Rights?
          </h2>
          <p className="text-base text-white/90 mb-6 leading-relaxed">
            We're here to help. Contact us with any questions about your data protection rights.
          </p>
          <a href="mailto:privacy@emerlya.com">
            <button className="px-6 py-3 bg-accent text-primary rounded-lg font-medium hover:shadow-xl transition-all duration-200 hover:-translate-y-1">
              Contact Us
            </button>
          </a>
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
            <p>© 2025 Emerlya AI. All rights reserved. | Built with ❤️ in the EU 🇪🇺</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
