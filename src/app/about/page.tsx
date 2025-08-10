import Link from 'next/link';

export default function AboutPage() {
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
            <Link href="/features" className="text-gray-600 hover:text-gray-900 transition-colors">
              Features
            </Link>
            <Link href="/pricing" className="text-gray-600 hover:text-gray-900 transition-colors">
              Pricing
            </Link>
            <Link href="/blog" className="text-gray-600 hover:text-gray-900 transition-colors">
              Blog
            </Link>
            <Link href="/about" className="text-gray-900 font-medium">
              About
            </Link>
            <Link href="/login">
              <button className="px-6 py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-medium hover:shadow-lg transition-all duration-200 hover:-translate-y-0.5">
                Get Started
              </button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            About Emerlya AI
          </h1>
          <p className="text-xl text-gray-600 mb-12 leading-relaxed">
            We're building the future of intelligent content creation, helping teams 
            craft compelling stories with the power of artificial intelligence.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="backdrop-blur-xl bg-white/60 rounded-3xl p-12 shadow-2xl border border-white/50">
            <div className="prose prose-lg max-w-none space-y-8">
              <section>
                <h2 className="text-3xl font-semibold text-gray-900 mb-6">Our Mission</h2>
                <p className="text-gray-600 leading-relaxed">
                  Emerlya AI is revolutionizing content creation for modern businesses. We believe that every brand deserves 
                  to communicate with clarity, consistency, and impact. Our AI-powered platform empowers teams to generate 
                  high-quality content that perfectly captures their unique brand voice.
                </p>
              </section>

              <section>
                <h2 className="text-3xl font-semibold text-gray-900 mb-6">What We Do</h2>
                <p className="text-gray-600 leading-relaxed mb-6">
                  We combine cutting-edge artificial intelligence with deep understanding of brand communication to deliver:
                </p>
                <ul className="list-disc pl-6 text-gray-600 space-y-3">
                  <li>Intelligent content generation that maintains brand consistency</li>
                  <li>Advanced document analysis to extract and utilize your knowledge base</li>
                  <li>Customizable AI personas that embody your brand's voice</li>
                  <li>Enterprise-grade security and GDPR compliance</li>
                  <li>Seamless integration with your existing workflow</li>
                </ul>
              </section>

              <section>
                <h2 className="text-3xl font-semibold text-gray-900 mb-6">Our Values</h2>
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl p-6">
                    <h3 className="font-semibold text-gray-900 mb-3 text-lg">🎯 Precision</h3>
                    <p className="text-gray-600">
                      Every piece of content is crafted with attention to detail and brand alignment.
                    </p>
                  </div>
                  <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-6">
                    <h3 className="font-semibold text-gray-900 mb-3 text-lg">🔒 Privacy</h3>
                    <p className="text-gray-600">
                      Your data is your own. We prioritize security and privacy in everything we do.
                    </p>
                  </div>
                  <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-2xl p-6">
                    <h3 className="font-semibold text-gray-900 mb-3 text-lg">⚡ Innovation</h3>
                    <p className="text-gray-600">
                      We continuously evolve our AI to deliver the best possible results.
                    </p>
                  </div>
                  <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl p-6">
                    <h3 className="font-semibold text-gray-900 mb-3 text-lg">🤝 Partnership</h3>
                    <p className="text-gray-600">
                      We see ourselves as partners in your content journey, not just a tool.
                    </p>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-3xl font-semibold text-gray-900 mb-6">Our Team</h2>
                <p className="text-gray-600 leading-relaxed">
                  Emerlya AI is built by a passionate team of AI researchers, software engineers, and content strategists 
                  who believe in the power of technology to enhance human creativity. Based in the European Union, we're 
                  committed to building ethical AI that respects user privacy and delivers real value.
                </p>
              </section>

              <section>
                <h2 className="text-3xl font-semibold text-gray-900 mb-6">Why Choose Emerlya?</h2>
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
                <h2 className="text-3xl font-semibold text-gray-900 mb-6">Contact Us</h2>
                <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl p-6">
                  <p className="text-gray-700 mb-4">
                    Have questions or want to learn more about Emerlya AI?
                  </p>
                  <p className="text-gray-700 mb-2">
                    <strong>Email:</strong> <a href="mailto:hello@emerlya.com" className="text-indigo-600 hover:text-indigo-700">hello@emerlya.com</a>
                  </p>
                  <p className="text-gray-700">
                    <strong>Address:</strong> Amsterdam, Netherlands 🇳🇱
                  </p>
                </div>
              </section>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Ready to Transform Your Content?
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Join thousands of teams already creating amazing content with Emerlya AI.
          </p>
          <div className="flex justify-center space-x-4">
            <Link href="/login">
              <button className="px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-2xl font-medium text-lg hover:shadow-xl transition-all duration-200 hover:-translate-y-1">
                Start Free Trial
              </button>
            </Link>
            <Link href="/contact">
              <button className="px-8 py-4 bg-white/80 backdrop-blur-md border border-gray-200 text-gray-700 rounded-2xl font-medium text-lg hover:shadow-lg transition-all duration-200 hover:-translate-y-0.5">
                Get in Touch
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white/80 backdrop-blur-md border-t border-gray-200/50 py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold">E</span>
                </div>
                <span className="text-xl font-semibold">Emerlya AI</span>
              </div>
              <p className="text-gray-600 text-sm">
                Intelligent content generation for modern teams.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold text-gray-900 mb-4">Product</h4>
              <ul className="space-y-2">
                <li><Link href="/features" className="text-gray-600 hover:text-gray-900 text-sm">Features</Link></li>
                <li><Link href="/pricing" className="text-gray-600 hover:text-gray-900 text-sm">Pricing</Link></li>
                <li><Link href="/api-docs" className="text-gray-600 hover:text-gray-900 text-sm">API</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-gray-900 mb-4">Company</h4>
              <ul className="space-y-2">
                <li><Link href="/about" className="text-gray-600 hover:text-gray-900 text-sm">About</Link></li>
                <li><Link href="/blog" className="text-gray-600 hover:text-gray-900 text-sm">Blog</Link></li>
                <li><Link href="/contact" className="text-gray-600 hover:text-gray-900 text-sm">Contact</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-gray-900 mb-4">Legal</h4>
              <ul className="space-y-2">
                <li><Link href="/privacy" className="text-gray-600 hover:text-gray-900 text-sm">Privacy Policy</Link></li>
                <li><Link href="/terms" className="text-gray-600 hover:text-gray-900 text-sm">Terms of Service</Link></li>
                <li><Link href="/gdpr" className="text-gray-600 hover:text-gray-900 text-sm">GDPR</Link></li>
                <li><Link href="/cookies" className="text-gray-600 hover:text-gray-900 text-sm">Cookie Policy</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="mt-12 pt-8 border-t border-gray-200/50 text-center text-sm text-gray-600">
            <p>© 2025 Emerlya AI. All rights reserved. | Built with ❤️ in the EU 🇪🇺</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
