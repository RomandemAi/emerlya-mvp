import Link from 'next/link';
import UnifiedNavBar from '@/components/UnifiedNavBar';
import { getAuthenticatedUser } from '../lib/supabase/auth';
import { redirect } from 'next/navigation';
import { 
  BoltIcon, 
  ShieldCheckIcon, 
  DocumentTextIcon, 
  LockClosedIcon,
  ChartBarIcon,
  GlobeAltIcon
} from '@heroicons/react/24/outline';

export default async function LandingPage() {
  // Check if user is already logged in
  const user = await getAuthenticatedUser();
  
  if (user) {
    // If logged in, redirect to dashboard
    redirect('/dashboard');
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral via-white to-neutral">
      {/* Navigation */}
      <UnifiedNavBar />

      {/* Hero Section */}
      <section className="pt-18 pb-5 px-6 bg-gradient-to-br from-primary via-primary/95 to-primary/90">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex justify-center mb-4">
            <img 
              src="/emerlya-logo.svg" 
              alt="Emerlya AI Logo" 
              className="w-16 h-16 object-contain filter brightness-0 invert"
            />
          </div>
          <h1 className="text-xl md:text-2xl font-bold font-heading text-white mb-3">
            Enterprise AI Content Platform
          </h1>
          <div className="mb-3">
            <span className="text-base md:text-lg font-bold font-heading text-accent">
              - Emerlya AI
            </span>
          </div>
          <p className="text-sm md:text-base text-white/90 max-w-xl mx-auto mb-5 leading-relaxed">
            AI for on-brand content creation in seconds. Transform your content strategy with 
            intelligent generation that understands your unique voice.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-3">
            <Link href="/login">
              <button className="px-5 py-2.5 bg-accent text-primary rounded-lg font-medium hover:shadow-xl transition-all duration-200 hover:-translate-y-1">
                Start Free Trial
              </button>
            </Link>
            <Link href="/demo">
              <button className="px-5 py-2.5 bg-white/10 backdrop-blur-md border border-white/30 text-white rounded-lg font-medium hover:bg-white/20 transition-all duration-200">
                Request Demo
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Feature Cards Section */}
      <section className="py-6 px-6 bg-neutral">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-lg md:text-xl font-bold font-heading text-center text-primary mb-6">
            Why Choose Emerlya AI?
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Card 1 */}
            <div className="group">
              <div className="h-full p-4 rounded-xl bg-white border border-gray-200 shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300">
                <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center mb-2">
                  <BoltIcon className="w-4 h-4 text-primary" />
                </div>
                <h3 className="text-sm font-semibold font-heading text-primary mb-2">
                  AI-Powered Generation
                </h3>
                <p className="text-xs text-gray-600 leading-relaxed">
                  Leverage cutting-edge AI models to create compelling content that resonates with your audience.
                </p>
              </div>
            </div>

            {/* Card 2 */}
            <div className="group">
              <div className="h-full p-4 rounded-xl bg-white border border-gray-200 shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300">
                <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center mb-2">
                  <GlobeAltIcon className="w-4 h-4 text-primary" />
                </div>
                <h3 className="text-sm font-semibold font-heading text-primary mb-2">
                  Brand Voice Control
                </h3>
                <p className="text-xs text-gray-600 leading-relaxed">
                  Maintain perfect consistency across all content with customizable brand voice profiles.
                </p>
              </div>
            </div>

            {/* Card 3 */}
            <div className="group">
              <div className="h-full p-4 rounded-xl bg-white border border-gray-200 shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300">
                <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center mb-2">
                  <DocumentTextIcon className="w-4 h-4 text-primary" />
                </div>
                <h3 className="text-sm font-semibold font-heading text-primary mb-2">
                  Smart Document Analysis
                </h3>
                <p className="text-xs text-gray-600 leading-relaxed">
                  Upload your documents and let AI extract insights to enhance content generation.
                </p>
              </div>
            </div>

            {/* Card 4 */}
            <div className="group">
              <div className="h-full p-4 rounded-xl bg-white border border-gray-200 shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300">
                <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center mb-2">
                  <ShieldCheckIcon className="w-4 h-4 text-primary" />
                </div>
                <h3 className="text-sm font-semibold font-heading text-primary mb-2">
                  Enterprise Security
                </h3>
                <p className="text-xs text-gray-600 leading-relaxed">
                  GDPR compliant with bank-level encryption. Your data is always secure and private.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Built for Modern Teams Section */}
      <section className="py-8 px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-lg md:text-xl font-bold font-heading text-center text-primary mb-6">
            Built for Modern Teams
          </h2>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="text-center">
              <div className="w-10 h-10 bg-accent rounded-xl flex items-center justify-center mb-3 mx-auto">
                <BoltIcon className="w-5 h-5 text-primary" />
              </div>
              <h3 className="text-base font-semibold font-heading text-primary mb-2">Lightning Fast</h3>
              <p className="text-gray-600 leading-relaxed text-xs">Generate content in seconds, not hours. Our AI works at the speed of thought.</p>
            </div>
            <div className="text-center">
              <div className="w-10 h-10 bg-accent rounded-xl flex items-center justify-center mb-3 mx-auto">
                <GlobeAltIcon className="w-5 h-5 text-primary" />
              </div>
              <h3 className="text-base font-semibold font-heading text-primary mb-2">Always On-Brand</h3>
              <p className="text-gray-600 leading-relaxed text-xs">Maintain consistency across all channels with intelligent brand voice control.</p>
            </div>
            <div className="text-center">
              <div className="w-10 h-10 bg-accent rounded-xl flex items-center justify-center mb-3 mx-auto">
                <ChartBarIcon className="w-5 h-5 text-primary" />
              </div>
              <h3 className="text-base font-semibold font-heading text-primary mb-2">Scale Effortlessly</h3>
              <p className="text-gray-600 leading-relaxed text-xs">From startup to enterprise, we grow with you every step of the way.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-8 px-6 bg-primary">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-lg md:text-xl font-bold font-heading text-white mb-3">
            Ready to Transform Your Content Strategy?
          </h2>
          <p className="text-base text-white/90 mb-5 leading-relaxed">
            Join thousands of teams already using Emerlya AI to create amazing content.
          </p>
          <Link href="/login">
            <button className="px-5 py-2.5 bg-accent text-primary rounded-lg font-medium hover:shadow-xl transition-all duration-200 hover:-translate-y-1">
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
            <p>© 2025 Emerlya AI. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
