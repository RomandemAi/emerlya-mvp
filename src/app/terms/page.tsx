import Link from 'next/link';

export default function TermsOfService() {
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
            <Link href="/terms" className="text-gray-900 font-medium">
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
            <h1 className="text-4xl font-bold text-gray-900 mb-8">Terms of Service</h1>
            <p className="text-sm text-gray-500 mb-8">Effective Date: January 9, 2025</p>
            
            <div className="prose prose-lg max-w-none space-y-8">
              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Agreement to Terms</h2>
                <p className="text-gray-600 leading-relaxed">
                  By accessing or using Emerlya AI ("Service"), you agree to be bound by these Terms of Service ("Terms"). 
                  If you disagree with any part of these terms, you do not have permission to access the Service.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. Description of Service</h2>
                <p className="text-gray-600 leading-relaxed">
                  Emerlya AI provides AI-powered content generation services, including but not limited to:
                </p>
                <ul className="list-disc pl-6 text-gray-600 space-y-2">
                  <li>Brand voice customization and content generation</li>
                  <li>Document analysis and knowledge extraction</li>
                  <li>API access for programmatic content creation</li>
                  <li>Team collaboration features</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. Account Registration</h2>
                <p className="text-gray-600 leading-relaxed mb-4">To use our Service, you must:</p>
                <ul className="list-disc pl-6 text-gray-600 space-y-2">
                  <li>Be at least 16 years old</li>
                  <li>Provide accurate and complete registration information</li>
                  <li>Maintain the security of your account credentials</li>
                  <li>Promptly notify us of any unauthorized use</li>
                  <li>Accept responsibility for all activities under your account</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. Subscription and Payment</h2>
                <h3 className="text-xl font-semibold text-gray-800 mt-4 mb-2">4.1 Subscription Plans</h3>
                <ul className="list-disc pl-6 text-gray-600 space-y-2">
                  <li>Free trial: Limited features, no credit card required</li>
                  <li>Premium: €29/month, full access to all features</li>
                  <li>Enterprise: Custom pricing for large teams</li>
                </ul>
                
                <h3 className="text-xl font-semibold text-gray-800 mt-4 mb-2">4.2 Billing</h3>
                <ul className="list-disc pl-6 text-gray-600 space-y-2">
                  <li>Subscriptions renew automatically</li>
                  <li>Payment processed via Stripe</li>
                  <li>Prices exclude applicable taxes</li>
                  <li>No refunds for partial months</li>
                </ul>
                
                <h3 className="text-xl font-semibold text-gray-800 mt-4 mb-2">4.3 Cancellation</h3>
                <p className="text-gray-600 leading-relaxed">
                  You may cancel your subscription at any time. Access continues until the end of the billing period.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Acceptable Use</h2>
                <p className="text-gray-600 leading-relaxed mb-4">You agree NOT to use the Service to:</p>
                <ul className="list-disc pl-6 text-gray-600 space-y-2">
                  <li>Generate illegal, harmful, or offensive content</li>
                  <li>Violate intellectual property rights</li>
                  <li>Spread misinformation or propaganda</li>
                  <li>Harass, abuse, or harm others</li>
                  <li>Attempt to gain unauthorized access</li>
                  <li>Interfere with Service operations</li>
                  <li>Use for spam or unauthorized marketing</li>
                  <li>Violate any applicable laws or regulations</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. Intellectual Property</h2>
                <h3 className="text-xl font-semibold text-gray-800 mt-4 mb-2">6.1 Your Content</h3>
                <p className="text-gray-600 leading-relaxed">
                  You retain all rights to content you upload. By using our Service, you grant us a license to 
                  process your content solely for providing the Service.
                </p>
                
                <h3 className="text-xl font-semibold text-gray-800 mt-4 mb-2">6.2 Generated Content</h3>
                <p className="text-gray-600 leading-relaxed">
                  You own the content generated through our Service, subject to third-party rights and applicable laws.
                </p>
                
                <h3 className="text-xl font-semibold text-gray-800 mt-4 mb-2">6.3 Our Property</h3>
                <p className="text-gray-600 leading-relaxed">
                  The Service, including its original content and features, remains the exclusive property of Emerlya AI.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">7. Privacy and Data Protection</h2>
                <p className="text-gray-600 leading-relaxed">
                  Your use of our Service is also governed by our <Link href="/privacy" className="text-indigo-600 hover:text-indigo-700">Privacy Policy</Link>. 
                  We comply with GDPR and other applicable data protection laws.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">8. Disclaimers and Limitations</h2>
                <h3 className="text-xl font-semibold text-gray-800 mt-4 mb-2">8.1 Service Availability</h3>
                <p className="text-gray-600 leading-relaxed">
                  The Service is provided "as is" without warranties of any kind. We do not guarantee uninterrupted 
                  or error-free operation.
                </p>
                
                <h3 className="text-xl font-semibold text-gray-800 mt-4 mb-2">8.2 AI-Generated Content</h3>
                <p className="text-gray-600 leading-relaxed">
                  AI-generated content may contain errors or inaccuracies. You are responsible for reviewing and 
                  verifying all generated content before use.
                </p>
                
                <h3 className="text-xl font-semibold text-gray-800 mt-4 mb-2">8.3 Limitation of Liability</h3>
                <p className="text-gray-600 leading-relaxed">
                  To the maximum extent permitted by law, Emerlya AI shall not be liable for any indirect, incidental, 
                  special, or consequential damages. Our total liability shall not exceed the amount paid by you in 
                  the past 12 months.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">9. Indemnification</h2>
                <p className="text-gray-600 leading-relaxed">
                  You agree to indemnify and hold harmless Emerlya AI from any claims, damages, or expenses arising 
                  from your use of the Service or violation of these Terms.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">10. Termination</h2>
                <p className="text-gray-600 leading-relaxed">
                  We may terminate or suspend your account immediately, without prior notice, for conduct that we 
                  believe violates these Terms or is harmful to other users or the Service.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">11. Governing Law</h2>
                <p className="text-gray-600 leading-relaxed">
                  These Terms are governed by the laws of the Netherlands. Any disputes shall be resolved in the 
                  competent courts of Amsterdam, Netherlands.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">12. Changes to Terms</h2>
                <p className="text-gray-600 leading-relaxed">
                  We reserve the right to modify these Terms at any time. Material changes will be notified via 
                  email or prominent notice on the Service. Continued use after changes constitutes acceptance.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">13. Severability</h2>
                <p className="text-gray-600 leading-relaxed">
                  If any provision of these Terms is found unenforceable, the remaining provisions will continue 
                  in full force and effect.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">14. Contact Information</h2>
                <div className="text-gray-600 space-y-2">
                  <p><strong>Company:</strong> Emerlya AI B.V.</p>
                  <p><strong>Email:</strong> <a href="mailto:legal@emerlya.com" className="text-indigo-600 hover:text-indigo-700">legal@emerlya.com</a></p>
                  <p><strong>Address:</strong> Amsterdam, Netherlands</p>
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
