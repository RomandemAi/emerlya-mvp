import Link from 'next/link';
import UnifiedNavBar from '@/components/UnifiedNavBar';

export default function APIPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral via-white to-neutral">
      {/* Navigation */}
      <UnifiedNavBar />

      {/* Hero Section */}
      <section className="pt-20 pb-6 px-6 bg-gradient-to-br from-primary via-primary/95 to-primary/90">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex justify-center mb-4">
            <img 
              src="/emerlya-logo.svg" 
              alt="Emerlya AI Logo" 
              className="w-12 h-12 object-contain filter brightness-0 invert"
            />
          </div>
          <h1 className="text-xl md:text-2xl font-bold font-heading text-white mb-4">
            Developer API
            <span className="block text-accent">
              Documentation
            </span>
          </h1>
          <p className="text-sm md:text-base text-white/90 max-w-2xl mx-auto mb-6 leading-relaxed">
            Integrate Emerlya AI's advanced content generation capabilities directly into your applications
            with our RESTful API. Scale content creation with enterprise-grade reliability.
          </p>
          <div className="flex justify-center space-x-4">
            <Link href="/login">
              <button className="px-6 py-3 bg-accent text-primary rounded-lg font-medium hover:shadow-xl transition-all duration-200 hover:-translate-y-1">
                Get API Key
              </button>
            </Link>
            <button className="px-6 py-3 border border-white/30 text-white rounded-lg font-medium hover:bg-white/10 transition-all duration-200">
              View Documentation
            </button>
          </div>
        </div>
      </section>

      {/* Quick Start */}
      <section className="py-8 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="backdrop-blur-xl bg-white/80 rounded-2xl p-8 shadow-xl border border-white/50">
            <h2 className="text-lg md:text-xl font-bold font-heading text-primary mb-8 text-center">
              Quick Start Guide
            </h2>
            
            <div className="grid lg:grid-cols-2 gap-8">
              {/* Authentication */}
              <div>
                <h3 className="text-base md:text-lg font-semibold text-primary mb-4">1. Authentication</h3>
                <p className="text-gray-600 mb-4">
                  Get your API key from the dashboard and include it in your requests:
                </p>
                <div className="bg-gray-900 rounded-xl p-4 overflow-x-auto">
                  <code className="text-green-400 text-sm">
                    <span className="text-gray-400"># Include your API key in headers</span><br/>
                    <span className="text-blue-400">curl</span> -H <span className="text-yellow-300">"Authorization: Bearer YOUR_API_KEY"</span> \<br/>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;-H <span className="text-yellow-300">"Content-Type: application/json"</span> \<br/>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;https://api.emerlya.com/v1/generate
                  </code>
                </div>
              </div>

              {/* Basic Request */}
              <div>
                <h3 className="text-base md:text-lg font-semibold text-primary mb-4">2. Basic Content Generation</h3>
                <p className="text-gray-600 mb-4">
                  Send a POST request to generate content:
                </p>
                <div className="bg-gray-900 rounded-xl p-4 overflow-x-auto">
                  <code className="text-green-400 text-sm">
                    <span className="text-gray-400"># Generate blog content</span><br/>
                    <span className="text-blue-400">POST</span> /v1/generate<br/>
                    {`{`}<br/>
                    &nbsp;&nbsp;<span className="text-yellow-300">"prompt"</span>: <span className="text-green-300">"Write a blog about AI"</span>,<br/>
                    &nbsp;&nbsp;<span className="text-yellow-300">"type"</span>: <span className="text-green-300">"blog_post"</span>,<br/>
                    &nbsp;&nbsp;<span className="text-yellow-300">"brand_id"</span>: <span className="text-green-300">"your_brand_id"</span><br/>
                    {`}`}
                  </code>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* API Endpoints */}
      <section className="py-8 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-lg md:text-xl font-bold font-heading text-primary mb-8 text-center">
            Core API Endpoints
          </h2>
          
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Content Generation */}
            <div className="backdrop-blur-xl bg-white/80 rounded-2xl p-6 shadow-xl border border-white/50">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center mr-3">
                  <span className="text-white font-bold text-xs">POST</span>
                </div>
                <div>
                  <h3 className="text-base font-bold text-gray-900">Content Generation</h3>
                  <code className="text-sm text-gray-600">/v1/generate</code>
                </div>
              </div>
              
              <p className="text-gray-600 mb-4 text-sm">
                Generate various types of content using AI with your brand voice and guidelines.
              </p>
              
              <div className="space-y-2">
                <div className="text-sm text-gray-600">Parameters:</div>
                <ul className="text-sm text-gray-600 space-y-1 ml-4">
                  <li>• <code>prompt</code> - Content description</li>
                  <li>• <code>type</code> - Content type (blog, email, social)</li>
                  <li>• <code>brand_id</code> - Brand profile ID</li>
                  <li>• <code>length</code> - Content length preference</li>
                </ul>
              </div>
            </div>

            {/* Document Analysis */}
            <div className="backdrop-blur-xl bg-white/80 rounded-2xl p-6 shadow-xl border border-white/50">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-primary rounded-xl flex items-center justify-center mr-3">
                  <span className="text-white font-bold text-xs">POST</span>
                </div>
                <div>
                  <h3 className="text-base font-bold text-gray-900">Document Analysis</h3>
                  <code className="text-sm text-gray-600">/v1/analyze</code>
                </div>
              </div>
              
              <p className="text-gray-600 mb-4 text-sm">
                Upload and analyze documents to extract insights and improve content generation.
              </p>
              
              <div className="space-y-2">
                <div className="text-sm text-gray-600">Parameters:</div>
                <ul className="text-sm text-gray-600 space-y-1 ml-4">
                  <li>• <code>file</code> - Document file (PDF, DOCX)</li>
                  <li>• <code>brand_id</code> - Brand profile ID</li>
                  <li>• <code>extract_guidelines</code> - Extract brand guidelines</li>
                  <li>• <code>extract_knowledge</code> - Extract knowledge base</li>
                </ul>
              </div>
            </div>

            {/* Brand Management */}
            <div className="backdrop-blur-xl bg-white/80 rounded-2xl p-6 shadow-xl border border-white/50">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center mr-3">
                  <span className="text-white font-bold text-xs">GET</span>
                </div>
                <div>
                  <h3 className="text-base font-bold text-gray-900">Brand Management</h3>
                  <code className="text-sm text-gray-600">/v1/brands</code>
                </div>
              </div>
              
              <p className="text-gray-600 mb-4 text-sm">
                Manage brand profiles, voice settings, and content guidelines programmatically.
              </p>
              
              <div className="space-y-2">
                <div className="text-sm text-gray-600">Operations:</div>
                <ul className="text-sm text-gray-600 space-y-1 ml-4">
                  <li>• <code>GET /brands</code> - List all brands</li>
                  <li>• <code>POST /brands</code> - Create new brand</li>
                  <li>• <code>PUT /brands/:id</code> - Update brand</li>
                  <li>• <code>DELETE /brands/:id</code> - Delete brand</li>
                </ul>
              </div>
            </div>

            {/* Analytics */}
            <div className="backdrop-blur-xl bg-white/80 rounded-2xl p-6 shadow-xl border border-white/50">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl flex items-center justify-center mr-3">
                  <span className="text-white font-bold text-xs">GET</span>
                </div>
                <div>
                  <h3 className="text-base font-bold text-gray-900">Analytics & Usage</h3>
                  <code className="text-sm text-gray-600">/v1/analytics</code>
                </div>
              </div>
              
              <p className="text-gray-600 mb-4 text-sm">
                Get insights on your content performance, API usage, and generation statistics.
              </p>
              
              <div className="space-y-2">
                <div className="text-sm text-gray-600">Metrics:</div>
                <ul className="text-sm text-gray-600 space-y-1 ml-4">
                  <li>• Content generation count</li>
                  <li>• Word usage statistics</li>
                  <li>• Performance metrics</li>
                  <li>• Rate limit information</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Code Examples */}
      <section className="py-8 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-lg md:text-xl font-bold font-heading text-primary mb-8 text-center">
            Code Examples
          </h2>
          
          <div className="grid lg:grid-cols-2 gap-6">
            {/* JavaScript Example */}
            <div className="backdrop-blur-xl bg-white/80 rounded-2xl p-6 shadow-xl border border-white/50">
              <div className="flex items-center mb-4">
                <div className="w-8 h-8 bg-yellow-500 rounded-lg flex items-center justify-center mr-3">
                  <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M0 0h24v24H0V0zm22.034 18.276c-.175-1.095-.888-2.015-3.003-2.873-.736-.345-1.554-.585-1.797-1.14-.091-.33-.105-.51-.046-.705.15-.646.915-.84 1.515-.66.39.12.75.42.976.9 1.034-.676 1.034-.676 1.755-1.125-.27-.42-.404-.601-.586-.78-.63-.705-1.469-1.065-2.834-1.034l-.705.089c-.676.165-1.32.525-1.71 1.005-1.14 1.291-.811 3.541.569 4.471 1.365 1.02 3.361 1.244 3.616 2.205.24 1.17-.87 1.545-1.966 1.41-.811-.18-1.26-.586-1.755-1.336l-1.83 1.051c.21.48.45.689.81 1.109 1.74 1.756 6.09 1.666 6.871-1.004.029-.09.24-.705.074-1.65l.046.067zm-8.983-7.245h-2.248c0 1.938-.009 3.864-.009 5.805 0 1.232.063 2.363-.138 2.711-.33.689-1.18.601-1.566.48-.396-.196-.597-.466-.83-.855-.063-.105-.11-.196-.127-.196l-1.825 1.125c.305.63.75 1.172 1.324 1.517.855.51 2.004.675 3.207.405.783-.226 1.458-.691 1.811-1.411.51-.93.402-2.07.397-3.346.012-2.054 0-4.109 0-6.179l.004-.056z"/>
                  </svg>
                </div>
                <h3 className="text-base font-bold text-gray-900">JavaScript / Node.js</h3>
              </div>
              
              <div className="bg-gray-900 rounded-xl p-4 overflow-x-auto">
                <code className="text-sm">
                  <span className="text-gray-400">// Install: npm install emerlya-ai</span><br/>
                  <span className="text-purple-400">const</span> <span className="text-blue-300">Emerlya</span> = <span className="text-green-400">require</span>(<span className="text-yellow-300">'emerlya-ai'</span>);<br/><br/>
                  
                  <span className="text-purple-400">const</span> <span className="text-blue-300">client</span> = <span className="text-purple-400">new</span> <span className="text-blue-300">Emerlya</span>({`{`}<br/>
                  &nbsp;&nbsp;<span className="text-red-300">apiKey</span>: <span className="text-yellow-300">'your-api-key'</span><br/>
                  {`}`});<br/><br/>
                  
                  <span className="text-purple-400">async function</span> <span className="text-green-400">generateContent</span>() {`{`}<br/>
                  &nbsp;&nbsp;<span className="text-purple-400">const</span> <span className="text-blue-300">response</span> = <span className="text-purple-400">await</span> <span className="text-blue-300">client</span>.<span className="text-green-400">generate</span>({`{`}<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-red-300">prompt</span>: <span className="text-yellow-300">'Write marketing copy for AI tool'</span>,<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-red-300">type</span>: <span className="text-yellow-300">'marketing_copy'</span>,<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-red-300">brandId</span>: <span className="text-yellow-300">'brand_123'</span><br/>
                  &nbsp;&nbsp;{`}`});<br/><br/>
                  
                  &nbsp;&nbsp;<span className="text-blue-300">console</span>.<span className="text-green-400">log</span>(<span className="text-blue-300">response</span>.<span className="text-red-300">content</span>);<br/>
                  {`}`}
                </code>
              </div>
            </div>

            {/* Python Example */}
            <div className="backdrop-blur-xl bg-white/80 rounded-2xl p-6 shadow-xl border border-white/50">
              <div className="flex items-center mb-4">
                <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center mr-3">
                  <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M14.25.18l.9.2.73.26.59.3.45.32.34.34.25.34.16.33.1.3.04.26.02.2-.01.13V8.5l-.05.63-.13.55-.21.46-.26.38-.3.31-.33.25-.35.19-.35.14-.33.1-.3.07-.26.04-.21.02H8.77l-.69.05-.59.14-.5.22-.41.27-.33.32-.27.35-.2.36-.15.37-.1.35-.07.32-.04.27-.02.21v3.06H3.17l-.21-.03-.28-.07-.32-.12-.35-.18-.36-.26-.36-.36-.35-.46-.32-.59-.28-.73-.21-.88-.14-1.05L0 11.97l.06-1.22.16-1.04.24-.87.32-.71.36-.57.4-.44.42-.33.42-.24.4-.16.36-.1.32-.05.26-.02.21-.01H8.38l.69-.05.59-.14.5-.21.41-.28.33-.32.27-.35.2-.36.15-.36.1-.35.07-.32.04-.28.02-.21V3.23l.03-.21.07-.28.12-.32.18-.34.26-.36.36-.35.46-.35.59-.32.73-.28.88-.22L11.97 0l1.22.06 1.04.16.87.24.71.32.57.36.44.4.33.42.24.42.16.4.1.36.05.32.02.26.01.21v5.06h2.09l.14.01zm-6.47 14.25l-.23.33-.08.41.08.41.23.34.33.22.41.09.41-.09.33-.22.23-.34.08-.41-.08-.41-.23-.33-.33-.22-.41-.09-.41.09zm.23-7.33l.33.22.41.09.41-.09.33-.22.23-.34.08-.41-.08-.41-.23-.33-.33-.22-.41-.09-.41.09-.33.22-.23.33-.08.41.08.41.23.34z"/>
                  </svg>
                </div>
                <h3 className="text-base font-bold text-gray-900">Python</h3>
              </div>
              
              <div className="bg-gray-900 rounded-xl p-4 overflow-x-auto">
                <code className="text-sm">
                  <span className="text-gray-400"># Install: pip install emerlya-ai</span><br/>
                  <span className="text-purple-400">import</span> <span className="text-blue-300">emerlya</span><br/><br/>
                  
                  <span className="text-gray-400"># Initialize client</span><br/>
                  <span className="text-blue-300">client</span> = <span className="text-blue-300">emerlya</span>.<span className="text-green-400">Client</span>(<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-red-300">api_key</span>=<span className="text-yellow-300">"your-api-key"</span><br/>
                  )<br/><br/>
                  
                  <span className="text-gray-400"># Generate content</span><br/>
                  <span className="text-blue-300">response</span> = <span className="text-blue-300">client</span>.<span className="text-green-400">generate</span>(<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-red-300">prompt</span>=<span className="text-yellow-300">"Create email newsletter content"</span>,<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-red-300">content_type</span>=<span className="text-yellow-300">"email"</span>,<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-red-300">brand_id</span>=<span className="text-yellow-300">"brand_123"</span>,<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-red-300">length</span>=<span className="text-yellow-300">"medium"</span><br/>
                  )<br/><br/>
                  
                  <span className="text-purple-400">print</span>(<span className="text-blue-300">response</span>.<span className="text-red-300">content</span>)
                </code>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Rate Limits & Pricing */}
      <section className="py-8 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="backdrop-blur-xl bg-white/80 rounded-2xl p-8 shadow-xl border border-white/50">
            <h2 className="text-lg md:text-xl font-bold font-heading text-primary mb-8 text-center">
              Rate Limits & Pricing
            </h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-base font-semibold text-gray-900 mb-4">Rate Limits</h3>
                <ul className="space-y-2 text-gray-600 text-sm">
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-gray-400 rounded-full mr-3"></div>
                    <span><strong>Starter:</strong> 100 requests/hour</span>
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
                    <span><strong>Professional:</strong> 1,000 requests/hour</span>
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-accent rounded-full mr-3"></div>
                    <span><strong>Enterprise:</strong> Custom limits</span>
                  </li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-base font-semibold text-gray-900 mb-4">API Access Included</h3>
                <ul className="space-y-2 text-gray-600 text-sm">
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                    <span><strong>Essentials:</strong> 1,000 requests/month included</span>
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                    <span><strong>Professional:</strong> 5,000 requests/month included</span>
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-purple-500 rounded-full mr-3"></div>
                    <span><strong>Business:</strong> 25,000 requests/month included</span>
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-accent rounded-full mr-3"></div>
                    <span><strong>Enterprise:</strong> 100,000 requests/month included</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 px-6 bg-primary">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-lg md:text-xl font-bold font-heading text-white mb-4">
            Ready to Start Building?
          </h2>
          <p className="text-base text-white/90 mb-6 leading-relaxed">
            Get your API key today and start integrating AI-powered content generation into your applications.
          </p>
          <div className="flex justify-center space-x-4">
            <Link href="/login">
              <button className="px-6 py-3 bg-accent text-primary rounded-lg font-medium hover:shadow-xl transition-all duration-200 hover:-translate-y-1">
                Get API Key
              </button>
            </Link>
            <Link href="/contact">
              <button className="px-6 py-3 border border-white/30 text-white rounded-lg font-medium hover:bg-white/10 transition-all duration-200">
                Enterprise Sales
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
                <li><Link href="/cookies" className="text-white/80 hover:text-accent transition-colors text-sm">Cookie Policy</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="mt-8 pt-8 border-t border-white/20 text-center">
            <p className="text-white/80 text-sm">
              © 2025 Emerlya AI. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
