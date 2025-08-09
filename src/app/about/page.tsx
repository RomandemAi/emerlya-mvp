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
            <Link href="/about" className="text-gray-900 font-medium">
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
            <h1 className="text-4xl font-bold text-gray-900 mb-8">About Emerlya AI</h1>
            
            <div className="prose prose-lg max-w-none">
              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">Our Mission</h2>
                <p className="text-gray-600 leading-relaxed">
                  Emerlya AI is revolutionizing content creation for modern businesses. We believe that every brand deserves 
                  to communicate with clarity, consistency, and impact. Our AI-powered platform empowers teams to generate 
                  high-quality content that perfectly captures their unique brand voice.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">What We Do</h2>
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

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">Our Values</h2>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">🎯 Precision</h3>
                    <p className="text-gray-600">
                      Every piece of content is crafted with attention to detail and brand alignment.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">🔒 Privacy</h3>
                    <p className="text-gray-600">
                      Your data is your own. We prioritize security and privacy in everything we do.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">⚡ Innovation</h3>
                    <p className="text-gray-600">
                      We continuously evolve our AI to deliver the best possible results.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">🤝 Partnership</h3>
                    <p className="text-gray-600">
                      We see ourselves as partners in your content journey, not just a tool.
                    </p>
                  </div>
                </div>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">Our Team</h2>
                <p className="text-gray-600 leading-relaxed">
                  Emerlya AI is built by a passionate team of AI researchers, software engineers, and content strategists 
                  who believe in the power of technology to enhance human creativity. Based in the European Union, we're 
                  committed to building ethical AI that respects user privacy and delivers real value.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">Contact Us</h2>
                <p className="text-gray-600 leading-relaxed">
                  Have questions or want to learn more about Emerlya AI?
                </p>
                <p className="text-gray-600 mt-2">
                  Email: <a href="mailto:hello@emerlya.com" className="text-indigo-600 hover:text-indigo-700">hello@emerlya.com</a>
                </p>
                <p className="text-gray-600">
                  Address: Amsterdam, Netherlands 🇳🇱
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
