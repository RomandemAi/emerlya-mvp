import Link from 'next/link';
import UnifiedNavBar from '@/components/UnifiedNavBar';

export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral via-white to-neutral">
      {/* Navigation */}
      <UnifiedNavBar />

      {/* Hero Section */}
      <section className="pt-24 pb-8 px-6 bg-gradient-to-br from-primary via-primary/95 to-primary/90">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-xl md:text-2xl font-bold font-heading text-white mb-4">
            Terms of 
            <span className="block text-accent">
              Service
            </span>
          </h1>
          <p className="text-base text-white/90 max-w-2xl mx-auto mb-6 leading-relaxed">
            Please read these terms carefully before using our service.
          </p>
          <p className="text-sm text-white/70">Effective Date: January 9, 2025</p>
        </div>
      </section>

      {/* Content */}
      <section className="py-8 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="backdrop-blur-xl bg-white/80 rounded-2xl p-8 shadow-xl border border-white/50">
            <div className="space-y-8">
              <section>
                <h2 className="text-lg md:text-xl font-bold font-heading text-primary mb-4">1. Agreement to Terms</h2>
                <p className="text-gray-600 leading-relaxed">
                  By accessing or using Emerlya AI (&quot;Service&quot;), you agree to be bound by these Terms of Service (&quot;Terms&quot;). 
                  If you disagree with any part of these terms, you do not have permission to access the Service.
                </p>
              </section>

              <section>
                <h2 className="text-lg md:text-xl font-bold font-heading text-primary mb-4">2. Description of Service</h2>
                <p className="text-gray-600 leading-relaxed mb-4">
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
                <h2 className="text-lg md:text-xl font-bold font-heading text-primary mb-4">3. Account Registration</h2>
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
                <h2 className="text-lg md:text-xl font-bold font-heading text-primary mb-4">4. Subscription and Payment</h2>
                <h3 className="text-base md:text-lg font-semibold text-primary mt-4 mb-2">4.1 Subscription Plans</h3>
                <ul className="list-disc pl-6 text-gray-600 space-y-2">
                  <li>Free trial: Limited features, no credit card required</li>
                  <li>Premium: €29/month, full access to all features</li>
                  <li>Enterprise: Custom pricing for large teams</li>
                </ul>
                
                <h3 className="text-base md:text-lg font-semibold text-primary mt-4 mb-2">4.2 Billing</h3>
                <ul className="list-disc pl-6 text-gray-600 space-y-2">
                  <li>Subscriptions renew automatically</li>
                  <li>Payment processed via Stripe</li>
                  <li>Prices exclude applicable taxes</li>
                  <li>No refunds for partial months</li>
                </ul>
                
                <h3 className="text-base md:text-lg font-semibold text-primary mt-4 mb-2">4.3 Cancellation</h3>
                <p className="text-gray-600 leading-relaxed">
                  You may cancel your subscription at any time. Access continues until the end of the billing period.
                </p>
              </section>

              <section>
                <h2 className="text-lg md:text-xl font-bold font-heading text-primary mb-4">5. Acceptable Use</h2>
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
                <h2 className="text-lg md:text-xl font-bold font-heading text-primary mb-4">6. Intellectual Property</h2>
                <h3 className="text-base md:text-lg font-semibold text-primary mt-4 mb-2">6.1 Your Content</h3>
                <p className="text-gray-600 leading-relaxed">
                  You retain all rights to content you upload. By using our Service, you grant us a license to 
                  process your content solely for providing the Service.
                </p>
                
                <h3 className="text-base md:text-lg font-semibold text-primary mt-4 mb-2">6.2 Generated Content</h3>
                <p className="text-gray-600 leading-relaxed">
                  You own the content generated through our Service, subject to third-party rights and applicable laws.
                </p>
                
                <h3 className="text-base md:text-lg font-semibold text-primary mt-4 mb-2">6.3 Our Property</h3>
                <p className="text-gray-600 leading-relaxed">
                  The Service, including its original content and features, remains the exclusive property of Emerlya AI.
                </p>
              </section>

              <section>
                <h2 className="text-lg md:text-xl font-bold font-heading text-primary mb-4">7. Privacy and Data Protection</h2>
                <p className="text-gray-600 leading-relaxed">
                  Your use of our Service is also governed by our <Link href="/privacy" className="text-accent hover:text-primary font-medium">Privacy Policy</Link>. 
                  We comply with GDPR and other applicable data protection laws.
                </p>
              </section>

              <section>
                <h2 className="text-lg md:text-xl font-bold font-heading text-primary mb-4">8. Disclaimers and Limitations</h2>
                <h3 className="text-base md:text-lg font-semibold text-primary mt-4 mb-2">8.1 Service Availability</h3>
                <p className="text-gray-600 leading-relaxed">
                  The Service is provided &quot;as is&quot; without warranties of any kind. We do not guarantee uninterrupted 
                  or error-free operation.
                </p>
                
                <h3 className="text-base md:text-lg font-semibold text-primary mt-4 mb-2">8.2 AI-Generated Content</h3>
                <p className="text-gray-600 leading-relaxed">
                  AI-generated content may contain errors or inaccuracies. You are responsible for reviewing and 
                  verifying all generated content before use.
                </p>
                
                <h3 className="text-base md:text-lg font-semibold text-primary mt-4 mb-2">8.3 Limitation of Liability</h3>
                <p className="text-gray-600 leading-relaxed">
                  To the maximum extent permitted by law, Emerlya AI shall not be liable for any indirect, incidental, 
                  special, or consequential damages. Our total liability shall not exceed the amount paid by you in 
                  the past 12 months.
                </p>
              </section>

              <section>
                <h2 className="text-lg md:text-xl font-bold font-heading text-primary mb-4">9. Indemnification</h2>
                <p className="text-gray-600 leading-relaxed">
                  You agree to indemnify and hold harmless Emerlya AI from any claims, damages, or expenses arising 
                  from your use of the Service or violation of these Terms.
                </p>
              </section>

              <section>
                <h2 className="text-lg md:text-xl font-bold font-heading text-primary mb-4">10. Termination</h2>
                <p className="text-gray-600 leading-relaxed">
                  We may terminate or suspend your account immediately, without prior notice, for conduct that we 
                  believe violates these Terms or is harmful to other users or the Service.
                </p>
              </section>

              <section>
                <h2 className="text-lg md:text-xl font-bold font-heading text-primary mb-4">11. Governing Law</h2>
                <p className="text-gray-600 leading-relaxed">
                  These Terms are governed by the laws of the Netherlands. Any disputes shall be resolved in the 
                  competent courts of Amsterdam, Netherlands.
                </p>
              </section>

              <section>
                <h2 className="text-lg md:text-xl font-bold font-heading text-primary mb-4">12. Changes to Terms</h2>
                <p className="text-gray-600 leading-relaxed">
                  We reserve the right to modify these Terms at any time. Material changes will be notified via 
                  email or prominent notice on the Service. Continued use after changes constitutes acceptance.
                </p>
              </section>

              <section>
                <h2 className="text-lg md:text-xl font-bold font-heading text-primary mb-4">13. Severability</h2>
                <p className="text-gray-600 leading-relaxed">
                  If any provision of these Terms is found unenforceable, the remaining provisions will continue 
                  in full force and effect.
                </p>
              </section>

              <section>
                <h2 className="text-lg md:text-xl font-bold font-heading text-primary mb-4">14. Contact Information</h2>
                <div className="bg-gradient-to-r from-primary/5 to-accent/5 rounded-xl p-6 border border-primary/10">
                  <div className="text-gray-700 space-y-2">
                    <p><strong>Email:</strong> <a href="mailto:hello@emerlya.com" className="text-accent hover:text-primary font-medium">hello@emerlya.com</a></p>
                  </div>
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
            Ready to Get Started?
          </h2>
          <p className="text-base text-white/90 mb-6 leading-relaxed">
            Join thousands of teams already using Emerlya AI to create amazing content.
          </p>
          <Link href="/login">
            <button className="px-6 py-3 bg-accent text-primary rounded-lg font-medium hover:shadow-xl transition-all duration-200 hover:-translate-y-1">
              Get Started Free
            </button>
          </Link>
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
