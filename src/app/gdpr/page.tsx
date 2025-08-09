import Link from 'next/link';

export default function GDPRPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 px-6 py-4 backdrop-blur-xl bg-white/70 border-b border-gray-200/50">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center">
              <span className="text-white font-bold text-xl">E</span>
            </div>
            <span className="text-2xl font-semibold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Emerlya AI
            </span>
          </Link>
          <div className="flex items-center space-x-8">
            <Link href="/about" className="text-gray-600 hover:text-gray-900 transition-colors">
              About
            </Link>
            <Link href="/privacy" className="text-gray-600 hover:text-gray-900 transition-colors">
              Privacy
            </Link>
            <Link href="/terms" className="text-gray-600 hover:text-gray-900 transition-colors">
              Terms
            </Link>
            <Link href="/login">
              <button className="px-6 py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-medium hover:shadow-lg transition-all duration-200 hover:-translate-y-0.5">
                Get Started
              </button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Content */}
      <div className="pt-32 pb-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="backdrop-blur-xl bg-white/60 rounded-3xl p-12 shadow-2xl border border-white/50">
            <h1 className="text-4xl font-bold text-gray-900 mb-8">GDPR Rights & Compliance</h1>
            <p className="text-sm text-gray-500 mb-8">Your Data Protection Rights Under EU Law</p>
            
            <div className="prose prose-lg max-w-none space-y-8">
              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">Your Rights at a Glance</h2>
                <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl p-6 mb-6">
                  <p className="text-gray-700 font-medium">
                    Under the General Data Protection Regulation (GDPR), you have comprehensive rights regarding your personal data. 
                    We are committed to respecting and facilitating the exercise of these rights.
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Right to Access (Article 15)</h2>
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
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. Right to Rectification (Article 16)</h2>
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
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. Right to Erasure - &quot;Right to be Forgotten&quot; (Article 17)</h2>
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
                    <strong>How to exercise:</strong> Submit a deletion request at privacy@emerlya.com. We&apos;ll process it within 30 days.
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. Right to Data Portability (Article 20)</h2>
                <p className="text-gray-600 leading-relaxed mb-4">
                  You can receive your personal data in a structured, commonly used, and machine-readable format, and transmit it to another controller.
                </p>
                <div className="mt-4 p-4 bg-blue-50 rounded-xl">
                  <p className="text-sm text-blue-800">
                    <strong>How to exercise:</strong> Request data export via privacy@emerlya.com. We&apos;ll provide JSON or CSV format.
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Right to Object (Article 21)</h2>
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
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. Right to Restriction (Article 18)</h2>
                <p className="text-gray-600 leading-relaxed mb-4">
                  You can request restriction of processing when:
                </p>
                <ul className="list-disc pl-6 text-gray-600 space-y-2">
                  <li>You contest data accuracy</li>
                  <li>Processing is unlawful but you oppose erasure</li>
                  <li>We no longer need the data but you need it for legal claims</li>
                  <li>You&apos;ve objected pending verification of legitimate grounds</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">7. Rights Related to Automated Decision-Making (Article 22)</h2>
                <p className="text-gray-600 leading-relaxed">
                  You have the right not to be subject to decisions based solely on automated processing, including profiling, 
                  which produces legal or similarly significant effects. Our AI generates content but doesn't make automated 
                  decisions about you personally.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">How We Handle Your Requests</h2>
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
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">Data Protection Measures</h2>
                <ul className="list-disc pl-6 text-gray-600 space-y-2">
                  <li><strong>Encryption:</strong> All data encrypted in transit and at rest</li>
                  <li><strong>Access Control:</strong> Role-based access with multi-factor authentication</li>
                  <li><strong>Regular Audits:</strong> Security assessments and penetration testing</li>
                  <li><strong>Data Minimization:</strong> We only collect necessary data</li>
                  <li><strong>Privacy by Design:</strong> Data protection built into all processes</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">Contact Our Data Protection Team</h2>
                <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl p-6">
                  <div className="space-y-3">
                    <p className="text-gray-700">
                      <strong>Data Protection Officer:</strong><br />
                      Email: <a href="mailto:dpo@emerlya.com" className="text-indigo-600 hover:text-indigo-700">dpo@emerlya.com</a>
                    </p>
                    <p className="text-gray-700">
                      <strong>Privacy Team:</strong><br />
                      Email: <a href="mailto:privacy@emerlya.com" className="text-indigo-600 hover:text-indigo-700">privacy@emerlya.com</a>
                    </p>
                    <p className="text-gray-700">
                      <strong>Postal Address:</strong><br />
                      Emerlya AI B.V.<br />
                      Data Protection Department<br />
                      Amsterdam, Netherlands
                    </p>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">Lodge a Complaint</h2>
                <p className="text-gray-600 leading-relaxed mb-4">
                  If you&apos;re unsatisfied with how we handle your data or requests, you have the right to lodge a complaint with:
                </p>
                <div className="bg-orange-50 rounded-xl p-6">
                  <p className="text-gray-700 font-medium mb-2">Dutch Data Protection Authority</p>
                  <p className="text-gray-600 text-sm">
                    Autoriteit Persoonsgegevens<br />
                    Website: <a href="https://autoriteitpersoonsgegevens.nl" className="text-indigo-600 hover:text-indigo-700" target="_blank" rel="noopener noreferrer">autoriteitpersoonsgegevens.nl</a><br />
                    Phone: 0900-2001201
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
