import Link from 'next/link';

export default function PrivacyPolicy() {
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
            <Link href="/privacy" className="text-gray-900 font-medium">
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
            <h1 className="text-4xl font-bold text-gray-900 mb-8">Privacy Policy</h1>
            <p className="text-sm text-gray-500 mb-8">Last updated: January 9, 2025</p>
            
            <div className="prose prose-lg max-w-none space-y-8">
              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Introduction</h2>
                <p className="text-gray-600 leading-relaxed">
                  Emerlya AI (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) is committed to protecting your privacy. This Privacy Policy 
                  explains how we collect, use, disclose, and safeguard your information when you use our service. 
                  We comply with the General Data Protection Regulation (GDPR) and other applicable data protection laws.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. Information We Collect</h2>
                <h3 className="text-xl font-semibold text-gray-800 mt-4 mb-2">Personal Information</h3>
                <ul className="list-disc pl-6 text-gray-600 space-y-2">
                  <li>Email address</li>
                  <li>Name (optional)</li>
                  <li>Payment information (processed securely via Stripe)</li>
                  <li>Usage data and analytics</li>
                </ul>
                
                <h3 className="text-xl font-semibold text-gray-800 mt-4 mb-2">Content Data</h3>
                <ul className="list-disc pl-6 text-gray-600 space-y-2">
                  <li>Documents you upload</li>
                  <li>Brand configurations</li>
                  <li>Generated content</li>
                  <li>Prompts and queries</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. Legal Basis for Processing (GDPR)</h2>
                <p className="text-gray-600 leading-relaxed mb-4">We process your personal data based on:</p>
                <ul className="list-disc pl-6 text-gray-600 space-y-2">
                  <li><strong>Contract:</strong> To provide our services as agreed in our Terms of Service</li>
                  <li><strong>Legitimate Interests:</strong> To improve our services and ensure security</li>
                  <li><strong>Consent:</strong> For marketing communications (you can opt-out anytime)</li>
                  <li><strong>Legal Obligations:</strong> To comply with applicable laws</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. How We Use Your Information</h2>
                <ul className="list-disc pl-6 text-gray-600 space-y-2">
                  <li>Provide and maintain our service</li>
                  <li>Process payments and manage subscriptions</li>
                  <li>Generate AI-powered content based on your specifications</li>
                  <li>Improve and personalize your experience</li>
                  <li>Send service updates and notifications</li>
                  <li>Ensure security and prevent fraud</li>
                  <li>Comply with legal obligations</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Data Storage and Security</h2>
                <p className="text-gray-600 leading-relaxed">
                  Your data is stored securely using industry-standard encryption. We use:
                </p>
                <ul className="list-disc pl-6 text-gray-600 space-y-2">
                  <li>Supabase for database storage (EU servers)</li>
                  <li>Pinecone for vector embeddings</li>
                  <li>SSL/TLS encryption for data in transit</li>
                  <li>AES-256 encryption for data at rest</li>
                  <li>Regular security audits and updates</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. Your Rights Under GDPR</h2>
                <p className="text-gray-600 leading-relaxed mb-4">As an EU resident, you have the right to:</p>
                <ul className="list-disc pl-6 text-gray-600 space-y-2">
                  <li><strong>Access:</strong> Request a copy of your personal data</li>
                  <li><strong>Rectification:</strong> Correct inaccurate data</li>
                  <li><strong>Erasure:</strong> Request deletion of your data (&quot;right to be forgotten&quot;)</li>
                  <li><strong>Portability:</strong> Receive your data in a portable format</li>
                  <li><strong>Restriction:</strong> Limit processing of your data</li>
                  <li><strong>Object:</strong> Object to certain processing activities</li>
                  <li><strong>Withdraw Consent:</strong> Withdraw consent at any time</li>
                </ul>
                <p className="text-gray-600 mt-4">
                  To exercise these rights, contact us at: <a href="mailto:privacy@emerlya.com" className="text-indigo-600 hover:text-indigo-700">privacy@emerlya.com</a>
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">7. Data Sharing</h2>
                <p className="text-gray-600 leading-relaxed mb-4">
                  We do not sell your personal data. We may share data with:
                </p>
                <ul className="list-disc pl-6 text-gray-600 space-y-2">
                  <li><strong>Service Providers:</strong> Stripe (payments), OpenAI (AI processing)</li>
                  <li><strong>Legal Requirements:</strong> When required by law or court order</li>
                  <li><strong>Business Transfers:</strong> In case of merger or acquisition (with notice)</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">8. Data Retention</h2>
                <p className="text-gray-600 leading-relaxed">
                  We retain your data only as long as necessary:
                </p>
                <ul className="list-disc pl-6 text-gray-600 space-y-2">
                  <li>Account data: Until account deletion</li>
                  <li>Content data: 30 days after deletion request</li>
                  <li>Payment records: As required by tax laws (typically 7 years)</li>
                  <li>Analytics: Anonymized after 2 years</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">9. International Transfers</h2>
                <p className="text-gray-600 leading-relaxed">
                  Your data is primarily stored in the EU. When we transfer data outside the EU, we ensure 
                  appropriate safeguards through Standard Contractual Clauses or adequacy decisions.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">10. Children&apos;s Privacy</h2>
                <p className="text-gray-600 leading-relaxed">
                  Our service is not intended for users under 16 years of age. We do not knowingly collect 
                  personal information from children under 16.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">11. Cookies</h2>
                <p className="text-gray-600 leading-relaxed">
                  We use essential cookies for authentication and functionality. For details, see our 
                  <Link href="/cookies" className="text-indigo-600 hover:text-indigo-700 ml-1">Cookie Policy</Link>.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">12. Updates to This Policy</h2>
                <p className="text-gray-600 leading-relaxed">
                  We may update this policy periodically. We will notify you of significant changes via email 
                  or prominent notice on our service.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">13. Contact Information</h2>
                <div className="text-gray-600 space-y-2">
                  <p><strong>Data Controller:</strong> Emerlya AI B.V.</p>
                  <p><strong>Email:</strong> <a href="mailto:privacy@emerlya.com" className="text-indigo-600 hover:text-indigo-700">privacy@emerlya.com</a></p>
                  <p><strong>Address:</strong> Amsterdam, Netherlands</p>
                  <p><strong>Data Protection Officer:</strong> <a href="mailto:dpo@emerlya.com" className="text-indigo-600 hover:text-indigo-700">dpo@emerlya.com</a></p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">14. Supervisory Authority</h2>
                <p className="text-gray-600 leading-relaxed">
                  You have the right to lodge a complaint with the Dutch Data Protection Authority 
                  (Autoriteit Persoonsgegevens) if you believe we have violated your privacy rights.
                </p>
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
