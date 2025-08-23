import Link from 'next/link';
import UnifiedNavBar from '@/components/UnifiedNavBar';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral via-white to-neutral">
      {/* Navigation */}
      <UnifiedNavBar />

      {/* Hero Section */}
      <section className="pt-24 pb-8 px-6 bg-gradient-to-br from-primary via-primary/95 to-primary/90">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-xl md:text-2xl font-bold font-heading text-white mb-4">
            About 
            <span className="block text-accent">
              Emerlya AI
            </span>
          </h1>
          <p className="text-base md:text-lg text-white/90 max-w-2xl mx-auto mb-6 leading-relaxed">
            We're building the future of intelligent content creation, helping teams 
            craft compelling stories with the power of artificial intelligence.
          </p>
        </div>
      </section>

      {/* Key Stats */}
      <section className="py-8 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center backdrop-blur-xl bg-white/80 rounded-2xl p-6 shadow-xl border border-white/50">
              <div className="text-3xl font-bold text-accent mb-2">40+</div>
              <div className="text-sm text-gray-600">Languages Supported</div>
            </div>
            <div className="text-center backdrop-blur-xl bg-white/80 rounded-2xl p-6 shadow-xl border border-white/50">
              <div className="text-3xl font-bold text-primary mb-2">99.9%</div>
              <div className="text-sm text-gray-600">Uptime Guarantee</div>
            </div>
            <div className="text-center backdrop-blur-xl bg-white/80 rounded-2xl p-6 shadow-xl border border-white/50">
              <div className="text-3xl font-bold text-accent mb-2">GDPR</div>
              <div className="text-sm text-gray-600">Compliant & Secure</div>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-8 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="backdrop-blur-xl bg-white/80 rounded-2xl p-8 shadow-xl border border-white/50">
            <div className="space-y-8">
              <section>
                <h2 className="text-xl md:text-2xl font-bold font-heading text-primary mb-4">Our Mission</h2>
                <p className="text-gray-600 leading-relaxed">
                  Emerlya AI is revolutionizing content creation for modern businesses. We believe that every brand deserves 
                  to communicate with clarity, consistency, and impact. Our AI-powered platform empowers teams to generate 
                  high-quality content that perfectly captures their unique brand voice.
                </p>
              </section>

              <section>
                <h2 className="text-xl md:text-2xl font-bold font-heading text-primary mb-4">What We Do</h2>
                <p className="text-gray-600 leading-relaxed mb-4">
                  We combine cutting-edge artificial intelligence with deep understanding of brand communication to deliver:
                </p>
                <ul className="list-disc pl-6 text-gray-600 space-y-2">
                  <li>Intelligent content generation that maintains brand consistency</li>
                  <li>Advanced document analysis to extract and utilize your knowledge base</li>
                  <li>Customizable AI personas that embody your brand's voice</li>
                  <li>Enterprise-grade security and GDPR compliance</li>
                  <li>Seamless integration with your existing workflow</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl md:text-2xl font-bold font-heading text-primary mb-4">Our Values</h2>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-gradient-to-r from-primary/10 to-accent/10 rounded-xl p-4">
                    <div className="flex items-center mb-3">
                      <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center mr-3">
                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <h3 className="font-semibold text-primary">Precision</h3>
                    </div>
                    <p className="text-sm text-gray-600">
                      Every piece of content is crafted with attention to detail and brand alignment.
                    </p>
                  </div>
                  <div className="bg-gradient-to-r from-accent/10 to-primary/10 rounded-xl p-4">
                    <div className="flex items-center mb-3">
                      <div className="w-8 h-8 bg-gradient-to-br from-accent to-primary rounded-lg flex items-center justify-center mr-3">
                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                        </svg>
                      </div>
                      <h3 className="font-semibold text-primary">Privacy</h3>
                    </div>
                    <p className="text-sm text-gray-600">
                      Your data is your own. We prioritize security and privacy in everything we do.
                    </p>
                  </div>
                  <div className="bg-gradient-to-r from-primary/10 to-accent/10 rounded-xl p-4">
                    <div className="flex items-center mb-3">
                      <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center mr-3">
                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                      </div>
                      <h3 className="font-semibold text-primary">Innovation</h3>
                    </div>
                    <p className="text-sm text-gray-600">
                      We continuously evolve our AI to deliver the best possible results.
                    </p>
                  </div>
                  <div className="bg-gradient-to-r from-accent/10 to-primary/10 rounded-xl p-4">
                    <div className="flex items-center mb-3">
                      <div className="w-8 h-8 bg-gradient-to-br from-accent to-primary rounded-lg flex items-center justify-center mr-3">
                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 515.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                      </div>
                      <h3 className="font-semibold text-primary">Partnership</h3>
                    </div>
                    <p className="text-sm text-gray-600">
                      We see ourselves as partners in your content journey, not just a tool.
                    </p>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-xl md:text-2xl font-bold font-heading text-primary mb-4">Our Team</h2>
                <p className="text-gray-600 leading-relaxed">
                  Emerlya AI is built by a passionate team of AI researchers, software engineers, and content strategists 
                  who believe in the power of technology to enhance human creativity. Based in the European Union, we're 
                  committed to building ethical AI that respects user privacy and delivers real value.
                </p>
              </section>

              <section>
                <h2 className="text-xl md:text-2xl font-bold font-heading text-primary mb-4">Why Choose Emerlya?</h2>
                <p className="text-gray-600 leading-relaxed mb-4">
                  We're building the future of AI-powered content creation, making it accessible and 
                  intuitive for businesses of all sizes. Our platform learns from your unique style and 
                  preferences, ensuring every piece of content feels authentically yours.
                </p>
                <p className="text-gray-600 leading-relaxed">
                  Whether you're a marketer crafting campaigns, a startup founder telling your story,
                  or an enterprise managing multiple brands, Emerlya AI adapts to your needs and scales 
                  with your ambitions.
                </p>
              </section>

              <section>
                <h2 className="text-xl md:text-2xl font-bold font-heading text-primary mb-4">Contact Us</h2>
                <div className="bg-gradient-to-r from-primary/5 to-accent/5 rounded-xl p-6 border border-primary/10">
                  <p className="text-gray-700 mb-3">
                    Have questions or want to learn more about Emerlya AI?
                  </p>
                  <p className="text-gray-700">
                    <strong>Email:</strong> <a href="mailto:hello@emerlya.com" className="text-accent hover:text-primary font-medium">hello@emerlya.com</a>
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
            Ready to Transform Your Content Strategy?
          </h2>
          <p className="text-lg text-white/90 mb-6 leading-relaxed">
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
              <Link href="/" className="flex items-center space-x-2 mb-4">
                <img 
                  src="/emerlya-logo.svg" 
                  alt="Emerlya AI Logo" 
                  className="w-8 h-8 object-contain"
                />
                <span className="text-xl font-semibold font-heading text-white hover:text-accent transition-colors">Emerlya AI</span>
              </Link>
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
