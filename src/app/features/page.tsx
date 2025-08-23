import Link from 'next/link';
import UnifiedNavBar from '@/components/UnifiedNavBar';
import { 
  BoltIcon, 
  ShieldCheckIcon, 
  DocumentTextIcon, 
  GlobeAltIcon,
  ChartBarIcon,
  UsersIcon,
  HeartIcon,
  BeakerIcon,
  LightBulbIcon,
  CogIcon,
  LockClosedIcon,
  CheckCircleIcon
} from '@heroicons/react/24/outline';

export default function FeaturesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral via-white to-neutral">
      {/* Navigation */}
      <UnifiedNavBar />

      {/* Hero Section */}
      <section className="pt-24 pb-8 px-6 bg-gradient-to-br from-primary via-primary/95 to-primary/90">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-xl md:text-2xl font-bold font-heading text-white mb-4">
            Powerful AI Features for
            <span className="block text-accent">
              Modern Content Creation
            </span>
          </h1>
          <p className="text-base md:text-lg text-white/90 max-w-2xl mx-auto mb-6 leading-relaxed">
            Discover how Emerlya AI transforms your content workflow with cutting-edge artificial intelligence,
            advanced document analysis, and brand-perfect generation capabilities.
          </p>
          <Link href="/login">
            <button className="px-6 py-3 bg-accent text-primary rounded-lg font-medium hover:shadow-xl transition-all duration-200 hover:-translate-y-1">
              Start Free Trial
            </button>
          </Link>
        </div>
      </section>

      {/* Technology Overview */}
      <section className="py-8 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-4 gap-4 text-center">
            <div className="backdrop-blur-xl bg-white/80 rounded-xl p-4 shadow-lg border border-white/50">
              <div className="text-xl font-bold text-primary mb-2">OpenAI</div>
              <div className="text-sm text-gray-600">GPT-4 Powered</div>
            </div>
            <div className="backdrop-blur-xl bg-white/80 rounded-xl p-4 shadow-lg border border-white/50">
              <div className="text-xl font-bold text-accent mb-2">40+</div>
              <div className="text-sm text-gray-600">Languages</div>
            </div>
            <div className="backdrop-blur-xl bg-white/80 rounded-xl p-4 shadow-lg border border-white/50">
              <div className="text-xl font-bold text-primary mb-2">GDPR</div>
              <div className="text-sm text-gray-600">Compliant</div>
            </div>
            <div className="backdrop-blur-xl bg-white/80 rounded-xl p-4 shadow-lg border border-white/50">
              <div className="text-xl font-bold text-accent mb-2">99.9%</div>
              <div className="text-sm text-gray-600">Uptime</div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Features */}
      <section className="py-12 px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-lg md:text-xl font-bold font-heading text-center text-primary mb-8">
            Core AI Capabilities
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* AI Content Generation */}
            <div className="h-full p-5 rounded-xl bg-white border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="w-10 h-10 bg-accent rounded-lg flex items-center justify-center mb-3">
                <BoltIcon className="w-5 h-5 text-primary" />
              </div>
              <h3 className="text-base font-semibold font-heading text-primary mb-2">AI Content Generation</h3>
              <p className="text-sm text-gray-600 mb-3">
                Create compelling blog posts, marketing copy, social media content, and more with advanced AI models 
                that understand context, tone, and your brand voice.
              </p>
              <ul className="text-xs text-gray-600 space-y-1">
                <li>• Multiple content types (blogs, emails, ads)</li>
                <li>• Context-aware generation</li>
                <li>• Custom tone and style control</li>
                <li>• Multi-language support</li>
              </ul>
            </div>

            {/* Smart Document Analysis */}
            <div className="h-full p-5 rounded-xl bg-white border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="w-10 h-10 bg-accent rounded-lg flex items-center justify-center mb-3">
                <DocumentTextIcon className="w-5 h-5 text-primary" />
              </div>
              <h3 className="text-base font-semibold font-heading text-primary mb-2">Smart Document Analysis</h3>
              <p className="text-sm text-gray-600 mb-3">
                Upload your existing materials and let AI extract key insights, brand guidelines, and knowledge 
                to enhance future content generation with your unique expertise.
              </p>
              <ul className="text-xs text-gray-600 space-y-1">
                <li>• PDF, DOCX, TXT support</li>
                <li>• Knowledge extraction</li>
                <li>• Brand guideline analysis</li>
                <li>• Intelligent content suggestions</li>
              </ul>
            </div>

            {/* Brand Voice Control */}
            <div className="h-full p-5 rounded-xl bg-white border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="w-10 h-10 bg-accent rounded-lg flex items-center justify-center mb-3">
                <GlobeAltIcon className="w-5 h-5 text-primary" />
              </div>
              <h3 className="text-base font-semibold font-heading text-primary mb-2">Brand Voice Control</h3>
              <p className="text-sm text-gray-600 mb-3">
                Maintain perfect consistency across all content with customizable brand personas that capture 
                your unique voice, tone, and messaging style.
              </p>
              <ul className="text-xs text-gray-600 space-y-1">
                <li>• Custom brand personas</li>
                <li>• Tone consistency</li>
                <li>• Style guidelines enforcement</li>
                <li>• Multiple brand management</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Advanced Features */}
      <section className="py-12 px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="backdrop-blur-xl bg-primary/5 rounded-2xl p-8 shadow-xl border border-primary/10">
            <h2 className="text-lg md:text-xl font-bold font-heading text-center text-primary mb-8">
              Advanced AI Features
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              {/* Left Column */}
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-accent rounded-lg flex items-center justify-center flex-shrink-0">
                    <ChartBarIcon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-base font-semibold font-heading text-primary mb-2">Content Analytics</h3>
                    <p className="text-sm text-gray-600">
                      Track performance metrics, engagement rates, and optimize your content strategy with AI-powered insights.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-accent rounded-lg flex items-center justify-center flex-shrink-0">
                    <GlobeAltIcon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-base font-semibold font-heading text-primary mb-2">Multi-Language Support</h3>
                    <p className="text-sm text-gray-600">
                      Generate content in 40+ languages while maintaining your brand voice and cultural nuances.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-accent rounded-lg flex items-center justify-center flex-shrink-0">
                    <LightBulbIcon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-base font-semibold font-heading text-primary mb-2">Smart Suggestions</h3>
                    <p className="text-sm text-gray-600">
                      Get intelligent content recommendations based on trending topics, audience preferences, and performance data.
                    </p>
                  </div>
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-accent rounded-lg flex items-center justify-center flex-shrink-0">
                    <UsersIcon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-base font-semibold font-heading text-primary mb-2">Team Collaboration</h3>
                    <p className="text-sm text-gray-600">
                      Share brand assets, collaborate on content, and maintain consistency across your entire team.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-accent rounded-lg flex items-center justify-center flex-shrink-0">
                    <HeartIcon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-base font-semibold font-heading text-primary mb-2">Content Templates</h3>
                    <p className="text-sm text-gray-600">
                      Access hundreds of pre-built templates for emails, blogs, social posts, and more.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-accent rounded-lg flex items-center justify-center flex-shrink-0">
                    <CogIcon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-base font-semibold font-heading text-primary mb-2">API Integration</h3>
                    <p className="text-sm text-gray-600">
                      Integrate Emerlya AI into your existing tools and workflows with our robust REST API.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enterprise Features */}
      <section className="py-12 px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-lg md:text-xl font-bold font-heading text-center text-primary mb-8">
            Built for Modern Teams
          </h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-accent rounded-xl flex items-center justify-center mb-4 mx-auto">
                <LockClosedIcon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold font-heading text-primary mb-3">Bank-Level Security</h3>
              <p className="text-sm text-gray-600">
                256-bit encryption, SOC 2 compliance, and enterprise-grade security protocols protect your sensitive data.
              </p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-accent rounded-xl flex items-center justify-center mb-4 mx-auto">
                <CheckCircleIcon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold font-heading text-primary mb-3">GDPR Compliant</h3>
              <p className="text-sm text-gray-600">
                Built from the ground up with European privacy standards and GDPR compliance at its core.
              </p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-accent rounded-xl flex items-center justify-center mb-4 mx-auto">
                <BoltIcon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold font-heading text-primary mb-3">99.9% Uptime</h3>
              <p className="text-sm text-gray-600">
                Reliable, scalable infrastructure ensures your content generation is always available when you need it.
              </p>
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
          <div className="flex justify-center space-x-4">
            <Link href="/login">
              <button className="px-6 py-3 bg-accent text-primary rounded-lg font-medium hover:shadow-xl transition-all duration-200 hover:-translate-y-1">
                Start Free Trial
              </button>
            </Link>
            <Link href="/demo">
              <button className="px-6 py-3 bg-white/10 backdrop-blur-md border border-white/30 text-white rounded-lg font-medium hover:bg-white/20 transition-all duration-200">
                Watch Demo
              </button>
            </Link>
          </div>
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
            <p>© 2025 Emerlya AI. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
