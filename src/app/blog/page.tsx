import Link from 'next/link';

interface BlogPost {
  id: string;
  title: string;
  content: string;
  excerpt?: string;
  tags: string[];
  status: 'draft' | 'published';
  author_type: 'manual' | 'ai-generated';
  topic?: string;
  seo_title?: string;
  word_count: number;
  created_at: string;
  updated_at: string;
}

async function getBlogPosts(): Promise<BlogPost[]> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
    const response = await fetch(`${baseUrl}/api/blog/public`, {
      cache: 'no-store', // Always fetch fresh data
    });
    
    if (!response.ok) {
      console.error('Failed to fetch blog posts:', response.statusText);
      return [];
    }

    const data = await response.json();
    return data.posts || [];
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return [];
  }
}

export default async function BlogPage() {
  const blogPosts = await getBlogPosts();

  // Helper functions
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const getReadingTime = (wordCount: number) => {
    return Math.ceil(wordCount / 250); // 250 words per minute
  };

  const getCategory = (tags: string[]) => {
    return tags.length > 0 ? tags[0] : 'General';
  };

  const getEmoji = (tags: string[]) => {
    const tag = tags[0]?.toLowerCase() || '';
    if (tag.includes('ai') || tag.includes('tech')) return '🤖';
    if (tag.includes('brand')) return '🎯';
    if (tag.includes('privacy') || tag.includes('security')) return '🔒';
    if (tag.includes('business') || tag.includes('growth')) return '📈';
    if (tag.includes('science') || tag.includes('analysis')) return '⚡';
    if (tag.includes('content') || tag.includes('marketing')) return '📊';
    return '✨';
  };

  // Fallback data when no posts exist
  const fallbackPosts = [
    {
      id: 'sample-1',
      title: 'The Silent Architecture of AI',
      excerpt: 'In the quantum realm between human thought and machine learning, there exists a silent architecture that shapes our digital consciousness.',
      tags: ['AI', 'Technology', 'Philosophy'],
      word_count: 1250,
      created_at: new Date().toISOString(),
      content: 'Sample content...',
      status: 'published' as const,
      author_type: 'manual' as const,
      updated_at: new Date().toISOString(),
    },
    {
      id: 'sample-2',
      title: 'When the Universe Writes Back',
      excerpt: 'Somewhere between the cosmic dance of data and the intimate whisper of personalized content, brands discover their voice in the vast echo chamber of digital space.',
      tags: ['Brand Voice', 'Content', 'Strategy'],
      word_count: 980,
      created_at: new Date(Date.now() - 24*60*60*1000).toISOString(),
      content: 'Sample content...',
      status: 'published' as const,
      author_type: 'ai-generated' as const,
      updated_at: new Date().toISOString(),
    },
    {
      id: 'sample-3',
      title: 'The Brand Voice Revolution',
      excerpt: 'How AI is transforming the way businesses communicate, creating authentic connections at scale while maintaining the human touch that makes brands memorable.',
      tags: ['Marketing', 'Business', 'Innovation'],
      word_count: 1180,
      created_at: new Date(Date.now() - 2*24*60*60*1000).toISOString(),
      content: 'Sample content...',
      status: 'published' as const,
      author_type: 'manual' as const,
      updated_at: new Date().toISOString(),
    },
  ];

  const displayPosts = blogPosts.length > 0 ? blogPosts : fallbackPosts;
  const categories = ["All", "AI", "Technology", "Brand Voice", "Content", "Strategy", "Marketing", "Business"];

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
      {displayPosts.length > 0 && (
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
                      {getCategory(displayPosts[0].tags)}
                    </span>
                  </div>
                  <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                    {displayPosts[0].title}
                  </h2>
                  <p className="text-lg text-gray-600 mb-6">
                    {displayPosts[0].excerpt}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center">
                        <span className="text-white font-semibold text-sm">EA</span>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">Emerlya AI Team</p>
                        <p className="text-sm text-gray-600">
                          {formatDate(displayPosts[0].created_at)} • {getReadingTime(displayPosts[0].word_count)} min read
                        </p>
                      </div>
                    </div>
                    <Link href={`/blog/${displayPosts[0].id}`}>
                      <button className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-medium hover:shadow-lg transition-all duration-200 hover:-translate-y-0.5">
                        Read More
                      </button>
                    </Link>
                  </div>
                </div>
                <div className="flex items-center justify-center">
                  <div className="w-64 h-64 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-3xl flex items-center justify-center">
                    <span className="text-8xl">{getEmoji(displayPosts[0].tags)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Blog Grid */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-12">Latest Articles</h2>
          
          {displayPosts.length > 1 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {displayPosts.slice(1).map((post) => (
                <article key={post.id} className="backdrop-blur-xl bg-white/60 rounded-3xl p-8 shadow-2xl border border-white/50 hover:shadow-3xl transition-all duration-300 hover:-translate-y-2">
                  <div className="mb-6">
                    <div className="w-16 h-16 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-2xl flex items-center justify-center mb-4">
                      <span className="text-2xl">{getEmoji(post.tags)}</span>
                    </div>
                    <div className="flex items-center mb-3">
                      <span className="text-xs text-indigo-600 font-medium bg-indigo-50 px-2 py-1 rounded-full">
                        {getCategory(post.tags)}
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
                      <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center">
                        <span className="text-white font-semibold text-xs">EA</span>
                      </div>
                      <div>
                        <p className="text-xs font-medium text-gray-900">Emerlya AI Team</p>
                        <p className="text-xs text-gray-600">{formatDate(post.created_at)}</p>
                      </div>
                    </div>
                    <span className="text-xs text-gray-500">{getReadingTime(post.word_count)} min</span>
                  </div>
                  
                  <Link href={`/blog/${post.id}`}>
                    <button className="w-full mt-6 px-4 py-3 bg-gray-100 hover:bg-gray-200 text-gray-900 rounded-xl font-medium transition-colors">
                      Read Article
                    </button>
                  </Link>
                </article>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="w-24 h-24 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-4xl">📝</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">No Additional Posts Yet</h3>
              <p className="text-gray-600 mb-6">We're working on creating more amazing content for you!</p>
              <Link href="/login">
                <button className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-medium hover:shadow-lg transition-all duration-200 hover:-translate-y-0.5">
                  Start Creating
                </button>
              </Link>
            </div>
          )}
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
