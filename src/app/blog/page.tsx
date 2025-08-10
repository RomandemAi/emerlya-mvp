import Link from 'next/link';

export default function BlogPage() {
  const blogPosts = [
    {
      id: 1,
      title: "The Future of AI-Powered Content Creation",
      excerpt: "Explore how artificial intelligence is revolutionizing content marketing and what it means for modern businesses.",
      author: "Sarah Chen",
      date: "January 15, 2025",
      readTime: "5 min read",
      category: "AI Insights",
      image: "🤖",
    },
    {
      id: 2,
      title: "Building Consistent Brand Voice with AI",
      excerpt: "Learn how to maintain your unique brand personality across all content channels using AI-powered tools.",
      author: "Marcus Johnson",
      date: "January 10, 2025",
      readTime: "7 min read",
      category: "Brand Strategy",
      image: "🎯",
    },
    {
      id: 3,
      title: "GDPR and AI: Privacy-First Content Generation",
      excerpt: "Understanding how European privacy regulations shape the development of AI content tools and protect user data.",
      author: "Dr. Elena Müller",
      date: "January 8, 2025",
      readTime: "6 min read",
      category: "Privacy & Compliance",
      image: "🔒",
    },
    {
      id: 4,
      title: "From Startup to Scale: AI Content Strategies",
      excerpt: "How growing companies can leverage AI to scale their content operations without losing quality or authenticity.",
      author: "Tom Williams",
      date: "January 5, 2025",
      readTime: "8 min read",
      category: "Business Growth",
      image: "📈",
    },
    {
      id: 5,
      title: "The Science Behind Brand Voice Analysis",
      excerpt: "Deep dive into the AI algorithms that analyze and replicate your unique brand voice across different content types.",
      author: "Dr. Ana Rodriguez",
      date: "January 3, 2025",
      readTime: "10 min read",
      category: "Technology",
      image: "⚡",
    },
    {
      id: 6,
      title: "Content ROI: Measuring AI-Generated Impact",
      excerpt: "How to track and measure the effectiveness of AI-generated content to maximize your return on investment.",
      author: "David Park",
      date: "December 28, 2024",
      readTime: "6 min read",
      category: "Analytics",
      image: "📊",
    },
  ];

  const categories = ["All", "AI Insights", "Brand Strategy", "Privacy & Compliance", "Business Growth", "Technology", "Analytics"];

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
            <Link href="/blog" className="text-gray-900 font-medium">
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
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Insights & Updates from
            <span className="block bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              The Emerlya AI Team
            </span>
          </h1>
          <p className="text-xl text-gray-600 mb-12 leading-relaxed">
            Stay up-to-date with the latest in AI content generation, brand strategy, 
            and the future of digital marketing. Expert insights from our team and industry leaders.
          </p>
          
          {/* Newsletter Signup */}
          <div className="backdrop-blur-xl bg-white/60 rounded-2xl p-8 shadow-xl border border-white/50 max-w-md mx-auto">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Stay Updated</h3>
            <div className="flex flex-col sm:flex-row gap-3">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="flex-1 px-4 py-3 bg-white/80 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
              <button className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-medium hover:shadow-lg transition-all duration-200 hover:-translate-y-0.5">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-10 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {categories.map((category) => (
              <button
                key={category}
                className={`px-6 py-3 rounded-xl font-medium transition-all duration-200 ${
                  category === "All" 
                    ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg" 
                    : "bg-white/60 backdrop-blur-xl border border-white/50 text-gray-600 hover:text-gray-900 hover:shadow-lg hover:-translate-y-0.5"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Post */}
      <section className="py-10 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="backdrop-blur-xl bg-white/60 rounded-3xl p-12 shadow-2xl border border-white/50 mb-16">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="flex items-center mb-4">
                  <span className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                    Featured
                  </span>
                  <span className="ml-3 text-sm text-gray-600">
                    {blogPosts[0].category}
                  </span>
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  {blogPosts[0].title}
                </h2>
                <p className="text-lg text-gray-600 mb-6">
                  {blogPosts[0].excerpt}
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center">
                      <span className="text-white font-semibold text-sm">SC</span>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">{blogPosts[0].author}</p>
                      <p className="text-sm text-gray-600">{blogPosts[0].date} • {blogPosts[0].readTime}</p>
                    </div>
                  </div>
                  <Link href={`/blog/${blogPosts[0].id}`}>
                    <button className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-medium hover:shadow-lg transition-all duration-200 hover:-translate-y-0.5">
                      Read More
                    </button>
                  </Link>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <div className="w-64 h-64 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-3xl flex items-center justify-center">
                  <span className="text-8xl">{blogPosts[0].image}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-12">Latest Articles</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.slice(1).map((post) => (
              <article key={post.id} className="backdrop-blur-xl bg-white/60 rounded-3xl p-8 shadow-2xl border border-white/50 hover:shadow-3xl transition-all duration-300 hover:-translate-y-2">
                <div className="mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-2xl flex items-center justify-center mb-4">
                    <span className="text-2xl">{post.image}</span>
                  </div>
                  <div className="flex items-center mb-3">
                    <span className="text-xs text-indigo-600 font-medium bg-indigo-50 px-2 py-1 rounded-full">
                      {post.category}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gradient-to-br from-gray-400 to-gray-600 rounded-full flex items-center justify-center">
                      <span className="text-white font-semibold text-xs">
                        {post.author.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <div>
                      <p className="text-xs font-medium text-gray-900">{post.author}</p>
                      <p className="text-xs text-gray-600">{post.date}</p>
                    </div>
                  </div>
                  <span className="text-xs text-gray-500">{post.readTime}</span>
                </div>
                
                <Link href={`/blog/${post.id}`}>
                  <button className="w-full mt-6 px-4 py-3 bg-gray-100 hover:bg-gray-200 text-gray-900 rounded-xl font-medium transition-colors">
                    Read Article
                  </button>
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Topics Section */}
      <section className="py-20 px-6 bg-gradient-to-b from-transparent to-slate-50/50">
        <div className="max-w-4xl mx-auto">
          <div className="backdrop-blur-xl bg-white/60 rounded-3xl p-12 shadow-2xl border border-white/50">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
              Popular Topics
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">AI & Technology</h3>
                <ul className="space-y-3">
                  <li><Link href="/blog/topic/ai-insights" className="text-gray-600 hover:text-indigo-600 transition-colors">AI Content Generation</Link></li>
                  <li><Link href="/blog/topic/machine-learning" className="text-gray-600 hover:text-indigo-600 transition-colors">Machine Learning Trends</Link></li>
                  <li><Link href="/blog/topic/automation" className="text-gray-600 hover:text-indigo-600 transition-colors">Content Automation</Link></li>
                  <li><Link href="/blog/topic/nlp" className="text-gray-600 hover:text-indigo-600 transition-colors">Natural Language Processing</Link></li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Business & Strategy</h3>
                <ul className="space-y-3">
                  <li><Link href="/blog/topic/content-marketing" className="text-gray-600 hover:text-indigo-600 transition-colors">Content Marketing</Link></li>
                  <li><Link href="/blog/topic/brand-voice" className="text-gray-600 hover:text-indigo-600 transition-colors">Brand Voice & Tone</Link></li>
                  <li><Link href="/blog/topic/roi" className="text-gray-600 hover:text-indigo-600 transition-colors">Content ROI</Link></li>
                  <li><Link href="/blog/topic/scaling" className="text-gray-600 hover:text-indigo-600 transition-colors">Scaling Content Operations</Link></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Ready to Transform Your Content Strategy?
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Start creating AI-powered content that resonates with your audience and drives results.
          </p>
          <div className="flex justify-center space-x-4">
            <Link href="/login">
              <button className="px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-2xl font-medium text-lg hover:shadow-xl transition-all duration-200 hover:-translate-y-1">
                Start Free Trial
              </button>
            </Link>
            <Link href="/demo">
              <button className="px-8 py-4 bg-white/80 backdrop-blur-md border border-gray-200 text-gray-700 rounded-2xl font-medium text-lg hover:shadow-lg transition-all duration-200 hover:-translate-y-0.5">
                Watch Demo
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
