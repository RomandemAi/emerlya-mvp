import Link from 'next/link';
import { getIconForTags } from '@/components/BlogIcons';

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


  // Show sample content only when there are no real posts
  const showFallbackContent = blogPosts.length === 0;

  const displayPosts = blogPosts;
  const categories = ["All", "AI", "Technology", "Brand Voice", "Content", "Strategy", "Marketing", "Business"];

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral via-white to-neutral">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 px-6 py-3 backdrop-blur-xl bg-primary/90 border-b border-primary/20">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Link href="/" className="flex items-center space-x-3">
            <div className="relative w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center overflow-hidden">
              {/* Data Flow E Logo */}
              <div className="relative">
                <span className="text-white font-bold text-xl font-heading relative z-10">E</span>
                {/* Animated data particles */}
                <div className="absolute inset-0 opacity-30">
                  <div className="absolute w-1 h-1 bg-accent rounded-full animate-pulse" style={{top: '20%', left: '15%', animationDelay: '0s'}}></div>
                  <div className="absolute w-1 h-1 bg-white rounded-full animate-pulse" style={{top: '60%', left: '80%', animationDelay: '0.5s'}}></div>
                  <div className="absolute w-0.5 h-0.5 bg-accent rounded-full animate-pulse" style={{top: '80%', left: '25%', animationDelay: '1s'}}></div>
                  <div className="absolute w-0.5 h-0.5 bg-white rounded-full animate-pulse" style={{top: '35%', left: '70%', animationDelay: '1.5s'}}></div>
                </div>
              </div>
            </div>
            <span className="text-xl font-semibold text-white font-heading hover:text-accent transition-colors">
              Emerlya AI
            </span>
          </Link>
          <div className="flex items-center space-x-6">
            <Link href="/features" className="text-white/80 hover:text-accent transition-colors">
              Features
            </Link>
            <Link href="/pricing" className="text-white/80 hover:text-accent transition-colors">
              Pricing
            </Link>
            <Link href="/blog" className="text-accent font-medium">
              Blog
            </Link>
            <Link href="/about" className="text-white/80 hover:text-accent transition-colors">
              About
            </Link>
            <Link href="/demo">
              <button className="px-5 py-2 bg-accent text-primary rounded-xl font-medium hover:shadow-lg transition-all duration-200 hover:-translate-y-0.5">
                Request Demo
              </button>
            </Link>
            <Link href="/login">
              <button className="px-5 py-2 border border-white/30 text-white rounded-xl font-medium hover:bg-white/10 transition-all duration-200">
                Login
              </button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-24 pb-8 px-6 bg-gradient-to-br from-primary via-primary/95 to-primary/90">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold font-heading text-white mb-4">
            Insights & Updates from
            <span className="block text-accent">
              The Emerlya AI Team
            </span>
          </h1>
          <p className="text-base md:text-lg text-white/90 max-w-2xl mx-auto mb-6 leading-relaxed">
            Stay up-to-date with the latest in AI content generation, brand strategy, 
            and the future of digital marketing. Expert insights from our team and industry leaders.
          </p>
          
          {/* Newsletter Signup */}
          <div className="backdrop-blur-xl bg-white/80 rounded-2xl p-6 shadow-xl border border-white/50 max-w-md mx-auto">
            <h3 className="text-lg font-semibold font-heading text-primary mb-4">Stay Updated</h3>
            <div className="flex flex-col sm:flex-row gap-3">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="flex-1 px-4 py-3 bg-white/80 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
              />
              <button className="px-6 py-3 bg-gradient-to-r from-primary to-accent text-white rounded-xl font-medium hover:shadow-lg transition-all duration-200 hover:-translate-y-0.5">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-8 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {categories.map((category) => (
              <button
                key={category}
                className={`px-6 py-3 rounded-xl font-medium transition-all duration-200 ${
                  category === "All" 
                    ? "bg-gradient-to-r from-primary to-accent text-white shadow-lg" 
                    : "backdrop-blur-xl bg-white/80 border border-white/50 text-gray-600 hover:text-primary hover:shadow-lg hover:-translate-y-0.5"
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
        <section className="py-8 px-6">
          <div className="max-w-6xl mx-auto">
            <div className="backdrop-blur-xl bg-white/80 rounded-3xl p-8 md:p-12 shadow-2xl border border-white/50 mb-12">
              <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-center">
                <div>
                  <div className="flex items-center mb-4">
                    <span className="bg-gradient-to-r from-primary to-accent text-white px-3 py-1 rounded-full text-sm font-medium">
                      Featured
                    </span>
                    <span className="ml-3 text-sm text-gray-600">
                      {getCategory(displayPosts[0].tags)}
                    </span>
                  </div>
                  <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold font-heading text-primary mb-4">
                    {displayPosts[0].title}
                  </h2>
                  <p className="text-base md:text-lg text-gray-600 mb-6">
                    {displayPosts[0].excerpt}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center">
                        <span className="text-white font-semibold text-sm font-heading">EA</span>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-primary">Emerlya AI Team</p>
                        <p className="text-sm text-gray-600">
                          {formatDate(displayPosts[0].created_at)} • {getReadingTime(displayPosts[0].word_count)} min read
                        </p>
                      </div>
                    </div>
                    <Link href={`/blog/${displayPosts[0].id}`}>
                      <button className="px-6 py-3 bg-gradient-to-r from-primary to-accent text-white rounded-xl font-medium hover:shadow-lg transition-all duration-200 hover:-translate-y-0.5">
                        Read More
                      </button>
                    </Link>
                  </div>
                </div>
                <div className="flex items-center justify-center">
                  <div className="w-48 h-48 md:w-64 md:h-64 bg-gradient-to-br from-accent/20 to-primary/20 rounded-3xl flex items-center justify-center">
                    {getIconForTags(displayPosts[0].tags, "w-24 h-24 md:w-32 md:h-32")}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Blog Grid */}
      <section className="py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold font-heading text-primary mb-8">Latest Articles</h2>
          
          {displayPosts.length > 1 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {displayPosts.slice(1).map((post) => (
                <article key={post.id} className="backdrop-blur-xl bg-white/80 rounded-3xl p-6 shadow-xl border border-white/50 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
                  <div className="mb-6">
                    <div className="w-16 h-16 bg-gradient-to-br from-accent/20 to-primary/20 rounded-2xl flex items-center justify-center mb-4">
                      {getIconForTags(post.tags, "w-8 h-8")}
                    </div>
                    <div className="flex items-center mb-3">
                      <span className="text-xs text-accent font-medium bg-accent/10 px-2 py-1 rounded-full">
                        {getCategory(post.tags)}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold font-heading text-primary mb-3 line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                      {post.excerpt}
                    </p>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center">
                        <span className="text-white font-semibold text-xs font-heading">EA</span>
                      </div>
                      <div>
                        <p className="text-xs font-medium text-primary">Emerlya AI Team</p>
                        <p className="text-xs text-gray-600">{formatDate(post.created_at)}</p>
                      </div>
                    </div>
                    <span className="text-xs text-gray-500">{getReadingTime(post.word_count)} min</span>
                  </div>
                  
                  <Link href={`/blog/${post.id}`}>
                    <button className="w-full mt-6 px-4 py-3 bg-primary/5 hover:bg-primary/10 text-primary rounded-xl font-medium transition-colors">
                      Read Article
                    </button>
                  </Link>
                </article>
              ))}
            </div>
          ) : showFallbackContent ? (
            <div className="text-center py-12">
              <div className="w-24 h-24 bg-gradient-to-br from-accent/20 to-primary/20 rounded-full flex items-center justify-center mx-auto mb-6">
                {getIconForTags(['content'], "w-12 h-12")}
              </div>
              <h3 className="text-xl font-semibold font-heading text-primary mb-4">Coming Soon: Amazing Content</h3>
              <p className="text-gray-600 mb-6">We're working on creating insightful articles about AI content generation, brand strategy, and digital marketing innovations.</p>
              <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto mt-8">
                <div className="backdrop-blur-xl bg-white/80 rounded-2xl p-6 border border-white/50">
                  <div className="w-12 h-12 bg-gradient-to-br from-accent/20 to-primary/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                    {getIconForTags(['ai'], "w-6 h-6")}
                  </div>
                  <h4 className="font-semibold font-heading text-primary mb-2">AI & Technology</h4>
                  <p className="text-sm text-gray-600">Deep dives into AI content generation and machine learning trends</p>
                </div>
                <div className="backdrop-blur-xl bg-white/80 rounded-2xl p-6 border border-white/50">
                  <div className="w-12 h-12 bg-gradient-to-br from-accent/20 to-primary/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                    {getIconForTags(['brand'], "w-6 h-6")}
                  </div>
                  <h4 className="font-semibold font-heading text-primary mb-2">Brand Strategy</h4>
                  <p className="text-sm text-gray-600">Expert insights on brand voice and content strategy</p>
                </div>
                <div className="backdrop-blur-xl bg-white/80 rounded-2xl p-6 border border-white/50">
                  <div className="w-12 h-12 bg-gradient-to-br from-accent/20 to-primary/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                    {getIconForTags(['business'], "w-6 h-6")}
                  </div>
                  <h4 className="font-semibold font-heading text-primary mb-2">Business Growth</h4>
                  <p className="text-sm text-gray-600">Practical tips for scaling content operations and ROI</p>
                </div>
              </div>
              <div className="mt-8">
                <Link href="/login">
                  <button className="px-8 py-4 bg-gradient-to-r from-primary to-accent text-white rounded-xl font-medium hover:shadow-lg transition-all duration-200 hover:-translate-y-0.5">
                    Start Creating Content
                  </button>
                </Link>
              </div>
            </div>
          ) : null}
        </div>
      </section>

      {/* Topics Section */}
      <section className="py-12 px-6 bg-gradient-to-b from-transparent to-neutral/50">
        <div className="max-w-4xl mx-auto">
          <div className="backdrop-blur-xl bg-white/80 rounded-3xl p-8 md:p-12 shadow-xl border border-white/50">
            <h2 className="text-2xl md:text-3xl font-bold font-heading text-primary text-center mb-8">
              Popular Topics
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold font-heading text-primary mb-4">AI & Technology</h3>
                <ul className="space-y-3">
                  <li><Link href="/blog/topic/ai-insights" className="text-gray-600 hover:text-accent transition-colors">AI Content Generation</Link></li>
                  <li><Link href="/blog/topic/machine-learning" className="text-gray-600 hover:text-accent transition-colors">Machine Learning Trends</Link></li>
                  <li><Link href="/blog/topic/automation" className="text-gray-600 hover:text-accent transition-colors">Content Automation</Link></li>
                  <li><Link href="/blog/topic/nlp" className="text-gray-600 hover:text-accent transition-colors">Natural Language Processing</Link></li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold font-heading text-primary mb-4">Business & Strategy</h3>
                <ul className="space-y-3">
                  <li><Link href="/blog/topic/content-marketing" className="text-gray-600 hover:text-accent transition-colors">Content Marketing</Link></li>
                  <li><Link href="/blog/topic/brand-voice" className="text-gray-600 hover:text-accent transition-colors">Brand Voice & Tone</Link></li>
                  <li><Link href="/blog/topic/roi" className="text-gray-600 hover:text-accent transition-colors">Content ROI</Link></li>
                  <li><Link href="/blog/topic/scaling" className="text-gray-600 hover:text-accent transition-colors">Scaling Content Operations</Link></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 px-6 bg-primary">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold font-heading text-white mb-4">
            Ready to Transform Your Content Strategy?
          </h2>
          <p className="text-lg text-white/90 mb-6 leading-relaxed">
            Start creating AI-powered content that resonates with your audience and drives results.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/login">
              <button className="px-8 py-4 bg-accent text-primary rounded-xl font-medium text-lg hover:shadow-xl transition-all duration-200 hover:-translate-y-1">
                Start Free Trial
              </button>
            </Link>
            <Link href="/demo">
              <button className="px-8 py-4 border border-white/30 text-white rounded-xl font-medium text-lg hover:bg-white/10 transition-all duration-200">
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
            <p>© 2025 Emerlya AI. All rights reserved. | Built with ❤️ in the EU 🇪🇺</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
