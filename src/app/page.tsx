import Link from 'next/link';
import { getAuthenticatedUser } from '../lib/supabase/auth';
import { redirect } from 'next/navigation';

export default async function LandingPage() {
  // Check if user is already logged in
  const user = await getAuthenticatedUser();
  
  if (user) {
    // If logged in, redirect to dashboard
    redirect('/dashboard');
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 px-6 py-4 backdrop-blur-xl bg-white/70 border-b border-gray-200/50">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center">
              <span className="text-white font-bold text-xl">E</span>
            </div>
            <span className="text-2xl font-semibold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Emerlya AI
            </span>
          </div>
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
            <Link href="/about" className="text-gray-600 hover:text-gray-900 transition-colors">
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
      <section className="pt-24 pb-8 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-900 mb-4">
            Enterprise AI Content Platform
          </h1>
          <div className="mb-3">
            <span className="text-lg md:text-xl lg:text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Emerlya AI
            </span>
          </div>
          <p className="text-sm md:text-base text-gray-600 max-w-2xl mx-auto mb-6 leading-relaxed">
            Create compelling, on-brand content in seconds. Our AI understands your unique voice 
            and delivers professional results that resonate with your audience.
          </p>
          <div className="flex justify-center space-x-3">
            <Link href="/login">
              <button className="px-5 py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg font-medium text-sm hover:shadow-lg transition-all duration-200">
                Start Free Trial
              </button>
            </Link>
            <Link href="/demo">
              <button className="px-5 py-2.5 bg-white/80 backdrop-blur-md border border-gray-200 text-gray-700 rounded-lg font-medium text-sm hover:shadow-lg transition-all duration-200">
                Watch Demo
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Feature Cards Section */}
      <section className="py-8 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-lg md:text-xl font-bold text-center text-gray-900 mb-6">
            Why Choose Emerlya AI?
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Card 1 */}
            <div className="group">
              <div className="h-full p-4 rounded-2xl backdrop-blur-xl bg-white/40 border border-white/50 shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center mb-3">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-sm font-semibold text-gray-900 mb-2">
                  AI-Powered Generation
                </h3>
                <p className="text-xs text-gray-600">
                  Leverage cutting-edge AI models to create compelling content that resonates with your audience.
                </p>
              </div>
            </div>

            {/* Card 2 */}
            <div className="group">
              <div className="h-full p-4 rounded-2xl backdrop-blur-xl bg-white/40 border border-white/50 shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg flex items-center justify-center mb-3">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                  </svg>
                </div>
                <h3 className="text-sm font-semibold text-gray-900 mb-2">
                  Brand Voice Control
                </h3>
                <p className="text-xs text-gray-600">
                  Maintain perfect consistency across all content with customizable brand voice profiles.
                </p>
              </div>
            </div>

            {/* Card 3 */}
            <div className="group">
              <div className="h-full p-4 rounded-2xl backdrop-blur-xl bg-white/40 border border-white/50 shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-lg flex items-center justify-center mb-3">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h3 className="text-sm font-semibold text-gray-900 mb-2">
                  Smart Document Analysis
                </h3>
                <p className="text-xs text-gray-600">
                  Upload your documents and let AI extract insights to enhance content generation.
                </p>
              </div>
            </div>

            {/* Card 4 */}
            <div className="group">
              <div className="h-full p-4 rounded-2xl backdrop-blur-xl bg-white/40 border border-white/50 shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-red-600 rounded-lg flex items-center justify-center mb-3">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <h3 className="text-sm font-semibold text-gray-900 mb-2">
                  Enterprise Security
                </h3>
                <p className="text-xs text-gray-600">
                  GDPR compliant with bank-level encryption. Your data is always secure and private.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-8 px-6 bg-gradient-to-b from-transparent to-slate-50/50">
        <div className="max-w-6xl mx-auto">
          <div className="backdrop-blur-xl bg-white/60 rounded-2xl p-6 shadow-xl border border-white/50">
            <h2 className="text-lg md:text-xl font-bold text-center text-gray-900 mb-6">
              Built for Modern Teams
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-8 h-8 bg-gradient-to-br from-yellow-500 to-orange-600 rounded-lg flex items-center justify-center mb-3 mx-auto">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-sm font-semibold mb-2">Lightning Fast</h3>
                <p className="text-xs text-gray-600">Generate content in seconds, not hours</p>
              </div>
              <div className="text-center">
                <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center mb-3 mx-auto">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
                    <circle cx="12" cy="12" r="3" strokeWidth={2} />
                  </svg>
                </div>
                <h3 className="text-sm font-semibold mb-2">Always On-Brand</h3>
                <p className="text-xs text-gray-600">Maintain consistency across all channels</p>
              </div>
              <div className="text-center">
                <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center mb-3 mx-auto">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                </div>
                <h3 className="text-sm font-semibold mb-2">Scale Effortlessly</h3>
                <p className="text-xs text-gray-600">From startup to enterprise, we grow with you</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-8 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-lg md:text-xl font-bold text-gray-900 mb-3">
            Ready to Transform Your Content Strategy?
          </h2>
          <p className="text-sm md:text-base text-gray-600 mb-4">
            Join thousands of teams already using Emerlya AI to create amazing content.
          </p>
          <Link href="/login">
            <button className="px-5 py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg font-medium text-sm hover:shadow-lg transition-all duration-200">
              Get Started Free
            </button>
          </Link>
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
