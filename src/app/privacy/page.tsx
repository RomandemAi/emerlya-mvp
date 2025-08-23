import Link from 'next/link';
import UnifiedNavBar from '@/components/UnifiedNavBar';

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral via-white to-neutral">
      {/* Navigation */}
      <UnifiedNavBar />

      {/* Hero Section */}
      <section className="pt-24 pb-8 px-6 bg-gradient-to-br from-primary via-primary/95 to-primary/90">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-xl md:text-2xl font-bold font-heading text-white mb-4">
            Privacy 
            <span className="block text-accent">
              Policy
            </span>
          </h1>
          <p className="text-base text-white/90 max-w-2xl mx-auto mb-6 leading-relaxed">
            Your privacy is important to us. Learn how we protect your data.
          </p>
          <p className="text-sm text-white/70">Last updated: January 9, 2025</p>
        </div>
      </section>

      {/* Content */}
      <section className="py-8 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="backdrop-blur-xl bg-white/80 rounded-2xl p-8 shadow-xl border border-white/50">
            <div className="space-y-8">
              <section>
                <h2 className="text-lg md:text-xl font-bold font-heading text-primary mb-4">1. Introduction</h2>
                <p className="text-gray-600 leading-relaxed">
                  Emerlya AI (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) is committed to protecting your privacy. This Privacy Policy 
                  explains how we collect, use, disclose, and safeguard your information when you use our service. 
                  We comply with the General Data Protection Regulation (GDPR) and other applicable data protection laws.
                </p>
              </section>

              <section>
                <h2 className="text-lg md:text-xl font-bold font-heading text-primary mb-4">2. Information We Collect</h2>
                <h3 className="text-base md:text-lg font-semibold text-primary mt-4 mb-2">Personal Information</h3>
                <ul className="list-disc pl-6 text-gray-600 space-y-2">
                  <li>Email address</li>
                  <li>Name (optional)</li>
                  <li>Payment information (processed securely via Stripe)</li>
                  <li>Usage data and analytics</li>
                </ul>
                
                <h3 className="text-base md:text-lg font-semibold text-primary mt-4 mb-2">Content Data</h3>
                <ul className="list-disc pl-6 text-gray-600 space-y-2">
                  <li>Documents you upload</li>
                  <li>Brand configurations</li>
                  <li>Generated content</li>
                  <li>Prompts and queries</li>
                </ul>
              </section>

              <section>
                <h2 className="text-lg md:text-xl font-bold font-heading text-primary mb-4">3. Legal Basis for Processing (GDPR)</h2>
                <p className="text-gray-600 leading-relaxed mb-4">We process your personal data based on:</p>
                <ul className="list-disc pl-6 text-gray-600 space-y-2">
                  <li><strong>Contract:</strong> To provide our services as agreed in our Terms of Service</li>
                  <li><strong>Legitimate Interests:</strong> To improve our services and ensure security</li>
                  <li><strong>Consent:</strong> For marketing communications (you can opt-out anytime)</li>
                  <li><strong>Legal Obligations:</strong> To comply with applicable laws</li>
                </ul>
              </section>

              <section>
                <h2 className="text-lg md:text-xl font-bold font-heading text-primary mb-4">4. How We Use Your Information</h2>
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
                <h2 className="text-lg md:text-xl font-bold font-heading text-primary mb-4">5. Data Storage and Security</h2>
                <p className="text-gray-600 leading-relaxed mb-4">
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
                <h2 className="text-lg md:text-xl font-bold font-heading text-primary mb-4">6. Your Rights Under GDPR</h2>
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
                  To exercise these rights, contact us at: <a href="mailto:hello@emerlya.com" className="text-accent hover:text-primary font-medium">hello@emerlya.com</a>
                </p>
              </section>

              <section>
                <h2 className="text-lg md:text-xl font-bold font-heading text-primary mb-4">7. Data Sharing</h2>
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
                <h2 className="text-lg md:text-xl font-bold font-heading text-primary mb-4">8. Data Retention</h2>
                <p className="text-gray-600 leading-relaxed mb-4">
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
                <h2 className="text-lg md:text-xl font-bold font-heading text-primary mb-4">9. International Transfers</h2>
                <p className="text-gray-600 leading-relaxed">
                  Your data is primarily stored in the EU. When we transfer data outside the EU, we ensure 
                  appropriate safeguards through Standard Contractual Clauses or adequacy decisions.
                </p>
              </section>

              <section>
                <h2 className="text-lg md:text-xl font-bold font-heading text-primary mb-4">10. Children&apos;s Privacy</h2>
                <p className="text-gray-600 leading-relaxed">
                  Our service is not intended for users under 16 years of age. We do not knowingly collect 
                  personal information from children under 16.
                </p>
              </section>

              <section>
                <h2 className="text-lg md:text-xl font-bold font-heading text-primary mb-4">11. Cookies</h2>
                <p className="text-gray-600 leading-relaxed">
                  We use essential cookies for authentication and functionality. For details, see our 
                  <Link href="/cookies" className="text-accent hover:text-primary font-medium ml-1">Cookie Policy</Link>.
                </p>
              </section>

              <section>
                <h2 className="text-lg md:text-xl font-bold font-heading text-primary mb-4">12. Updates to This Policy</h2>
                <p className="text-gray-600 leading-relaxed">
                  We may update this policy periodically. We will notify you of significant changes via email 
                  or prominent notice on our service.
                </p>
              </section>

              <section>
                <h2 className="text-lg md:text-xl font-bold font-heading text-primary mb-4">13. Contact Information</h2>
                <div className="bg-gradient-to-r from-primary/5 to-accent/5 rounded-xl p-6 border border-primary/10">
                  <div className="text-gray-700 space-y-2">
                    <p><strong>Email:</strong> <a href="mailto:hello@emerlya.com" className="text-accent hover:text-primary font-medium">hello@emerlya.com</a></p>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-lg md:text-xl font-bold font-heading text-primary mb-4">14. Supervisory Authority</h2>
                <p className="text-gray-600 leading-relaxed">
                  You have the right to lodge a complaint with the Dutch Data Protection Authority 
                  (Autoriteit Persoonsgegevens) if you believe we have violated your privacy rights.
                </p>
              </section>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 px-6 bg-primary">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-lg md:text-xl font-bold font-heading text-white mb-4">
            Questions About Your Privacy?
          </h2>
          <p className="text-base text-white/90 mb-6 leading-relaxed">
            We're here to help. Contact us with any privacy-related questions.
          </p>
          <a href="mailto:hello@emerlya.com">
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
