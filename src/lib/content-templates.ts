// Enhanced content templates to compete with Jasper AI's 50+ templates
export interface ContentTemplate {
  id: string;
  name: string;
  description: string;
  category: 'marketing' | 'sales' | 'social' | 'business' | 'creative' | 'seo';
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  estimatedWords: number;
  requiredFields: string[];
  optionalFields: string[];
  systemPrompt: string;
  userPromptTemplate: string;
  outputFormat: 'paragraph' | 'list' | 'structured' | 'script';
  tags: string[];
}

export const CONTENT_TEMPLATES: Record<string, ContentTemplate> = {
  // 🎯 MARKETING TEMPLATES
  'product-launch-email': {
    id: 'product-launch-email',
    name: 'Product Launch Email',
    description: 'Announcement email for new product or feature launches',
    category: 'marketing',
    difficulty: 'intermediate',
    estimatedWords: 200,
    requiredFields: ['product_name', 'key_benefits', 'target_audience'],
    optionalFields: ['launch_date', 'special_offer', 'social_proof'],
    systemPrompt: 'Create an engaging product launch email that builds excitement and drives action. Focus on benefits over features, create urgency, and include a clear call-to-action.',
    userPromptTemplate: 'Write a product launch email for {{product_name}} targeting {{target_audience}}. Key benefits: {{key_benefits}}. {{#launch_date}}Launch date: {{launch_date}}.{{/launch_date}} {{#special_offer}}Special offer: {{special_offer}}.{{/special_offer}}',
    outputFormat: 'structured',
    tags: ['email', 'launch', 'announcement', 'conversion']
  },

  'ad-copy-facebook': {
    id: 'ad-copy-facebook',
    name: 'Facebook Ad Copy',
    description: 'High-converting Facebook ad copy with hook, benefits, and CTA',
    category: 'marketing',
    difficulty: 'beginner',
    estimatedWords: 75,
    requiredFields: ['product_service', 'target_audience', 'main_benefit'],
    optionalFields: ['pain_point', 'social_proof', 'urgency'],
    systemPrompt: 'Create scroll-stopping Facebook ad copy that hooks attention in the first line, clearly states benefits, and includes a compelling call-to-action. Keep it concise and action-oriented.',
    userPromptTemplate: 'Write Facebook ad copy for {{product_service}} targeting {{target_audience}}. Main benefit: {{main_benefit}}. {{#pain_point}}Address this pain point: {{pain_point}}.{{/pain_point}} {{#urgency}}Create urgency with: {{urgency}}.{{/urgency}}',
    outputFormat: 'paragraph',
    tags: ['ads', 'facebook', 'social-media', 'paid', 'conversion']
  },

  'blog-seo-optimized': {
    id: 'blog-seo-optimized',
    name: 'SEO Blog Post',
    description: 'Search engine optimized blog post with proper structure and keywords',
    category: 'seo',
    difficulty: 'advanced',
    estimatedWords: 1200,
    requiredFields: ['topic', 'target_keyword', 'audience'],
    optionalFields: ['related_keywords', 'competitor_analysis', 'internal_links'],
    systemPrompt: 'Write an SEO-optimized blog post with proper H2/H3 structure, natural keyword integration, engaging introduction, valuable content, and strong conclusion. Include meta description suggestion.',
    userPromptTemplate: 'Write an SEO blog post about {{topic}} targeting the keyword "{{target_keyword}}" for {{audience}}. {{#related_keywords}}Include these related keywords naturally: {{related_keywords}}.{{/related_keywords}} Make it comprehensive and valuable.',
    outputFormat: 'structured',
    tags: ['blog', 'seo', 'content-marketing', 'organic', 'long-form']
  },

  // 💼 SALES TEMPLATES
  'sales-sequence': {
    id: 'sales-sequence',
    name: 'Email Sales Sequence',
    description: '5-email nurture sequence to convert leads into customers',
    category: 'sales',
    difficulty: 'advanced',
    estimatedWords: 800,
    requiredFields: ['product_service', 'target_persona', 'main_objection'],
    optionalFields: ['price_point', 'guarantees', 'testimonials'],
    systemPrompt: 'Create a 5-email sales sequence that builds trust, addresses objections, provides value, and gradually leads to a sale. Each email should have a clear purpose and flow naturally to the next.',
    userPromptTemplate: 'Create a 5-email sales sequence for {{product_service}} targeting {{target_persona}}. Address this main objection: {{main_objection}}. {{#price_point}}Price point: {{price_point}}.{{/price_point}} Structure: Email 1 (Introduction), Email 2 (Problem), Email 3 (Solution), Email 4 (Social Proof), Email 5 (Final Offer).',
    outputFormat: 'structured',
    tags: ['sales', 'email-sequence', 'nurture', 'conversion', 'funnel']
  },

  'cold-outreach': {
    id: 'cold-outreach',
    name: 'Cold Outreach Email',
    description: 'Personalized cold email that gets responses',
    category: 'sales',
    difficulty: 'intermediate',
    estimatedWords: 150,
    requiredFields: ['prospect_name', 'company', 'value_proposition'],
    optionalFields: ['common_connection', 'specific_research', 'meeting_request'],
    systemPrompt: 'Write a personalized cold outreach email that feels genuine, provides immediate value, and has a soft call-to-action. Avoid being salesy or pushy.',
    userPromptTemplate: 'Write a cold outreach email to {{prospect_name}} at {{company}}. Value proposition: {{value_proposition}}. {{#common_connection}}Mention our common connection: {{common_connection}}.{{/common_connection}} {{#specific_research}}Reference this research about their company: {{specific_research}}.{{/specific_research}}',
    outputFormat: 'paragraph',
    tags: ['cold-email', 'outreach', 'b2b', 'prospecting', 'personalized']
  },

  // 📱 SOCIAL MEDIA TEMPLATES
  'linkedin-thought-leadership': {
    id: 'linkedin-thought-leadership',
    name: 'LinkedIn Thought Leadership',
    description: 'Professional LinkedIn post that establishes industry expertise',
    category: 'social',
    difficulty: 'intermediate',
    estimatedWords: 300,
    requiredFields: ['industry_topic', 'personal_insight', 'target_professionals'],
    optionalFields: ['recent_trend', 'personal_story', 'call_for_discussion'],
    systemPrompt: 'Create a LinkedIn thought leadership post that shares valuable insights, establishes expertise, and encourages professional discussion. Use a conversational yet professional tone.',
    userPromptTemplate: 'Write a LinkedIn thought leadership post about {{industry_topic}} for {{target_professionals}}. Share this personal insight: {{personal_insight}}. {{#recent_trend}}Reference this recent trend: {{recent_trend}}.{{/recent_trend}} {{#personal_story}}Include this personal experience: {{personal_story}}.{{/personal_story}}',
    outputFormat: 'paragraph',
    tags: ['linkedin', 'thought-leadership', 'professional', 'b2b', 'expertise']
  },

  'social-media-carousel': {
    id: 'social-media-carousel',
    name: 'Instagram/LinkedIn Carousel',
    description: 'Multi-slide carousel post with tips, insights, or step-by-step guide',
    category: 'social',
    difficulty: 'intermediate',
    estimatedWords: 400,
    requiredFields: ['main_topic', 'slide_count', 'target_audience'],
    optionalFields: ['specific_tips', 'call_to_action', 'hashtags'],
    systemPrompt: 'Create content for a social media carousel with engaging slide titles and concise, valuable content for each slide. Include visual descriptions and a strong finale.',
    userPromptTemplate: 'Create a {{slide_count}}-slide carousel about {{main_topic}} for {{target_audience}}. {{#specific_tips}}Include these specific tips: {{specific_tips}}.{{/specific_tips}} Make each slide valuable and visually distinct.',
    outputFormat: 'structured',
    tags: ['carousel', 'instagram', 'linkedin', 'visual', 'tips', 'educational']
  },

  // 🎬 CREATIVE TEMPLATES
  'video-script': {
    id: 'video-script',
    name: 'Video Script',
    description: 'Engaging video script with hooks, storytelling, and clear CTA',
    category: 'creative',
    difficulty: 'advanced',
    estimatedWords: 600,
    requiredFields: ['video_purpose', 'video_length', 'target_audience'],
    optionalFields: ['key_message', 'visual_elements', 'background_music'],
    systemPrompt: 'Write a compelling video script with a strong hook in the first 3 seconds, clear storytelling structure, visual cues, and timing notes. Include directions for visuals and pacing.',
    userPromptTemplate: 'Write a {{video_length}} video script for {{video_purpose}} targeting {{target_audience}}. {{#key_message}}Key message: {{key_message}}.{{/key_message}} Include timing cues and visual directions.',
    outputFormat: 'script',
    tags: ['video', 'script', 'storytelling', 'visual', 'engagement']
  },

  // 📰 BUSINESS TEMPLATES
  'case-study': {
    id: 'case-study',
    name: 'Customer Case Study',
    description: 'Detailed case study showcasing customer success and results',
    category: 'business',
    difficulty: 'advanced',
    estimatedWords: 800,
    requiredFields: ['customer_name', 'challenge', 'solution', 'results'],
    optionalFields: ['timeline', 'quote', 'metrics', 'next_steps'],
    systemPrompt: 'Write a compelling case study using the Problem-Solution-Results framework. Include specific metrics, customer quotes, and make it relatable to similar prospects.',
    userPromptTemplate: 'Write a case study for {{customer_name}}. Challenge: {{challenge}}. Solution: {{solution}}. Results: {{results}}. {{#metrics}}Include these specific metrics: {{metrics}}.{{/metrics}} {{#quote}}Customer quote: "{{quote}}".{{/quote}}',
    outputFormat: 'structured',
    tags: ['case-study', 'social-proof', 'results', 'customer-success', 'b2b']
  },

  'press-release': {
    id: 'press-release',
    name: 'Press Release',
    description: 'Professional press release for company announcements',
    category: 'business',
    difficulty: 'advanced',
    estimatedWords: 400,
    requiredFields: ['announcement', 'company_name', 'key_stakeholder'],
    optionalFields: ['quotes', 'background_info', 'contact_info'],
    systemPrompt: 'Write a professional press release following AP style guidelines. Include headline, dateline, lead paragraph with who/what/when/where/why, supporting details, and boilerplate.',
    userPromptTemplate: 'Write a press release about {{announcement}} for {{company_name}}. Key stakeholder: {{key_stakeholder}}. {{#quotes}}Include these quotes: {{quotes}}.{{/quotes}} Follow professional press release format.',
    outputFormat: 'structured',
    tags: ['press-release', 'announcement', 'media', 'corporate', 'news']
  }
};

// Template categories for organization
export const TEMPLATE_CATEGORIES = {
  marketing: {
    name: 'Marketing',
    description: 'Email campaigns, ads, and promotional content',
    icon: '📢',
    color: 'blue'
  },
  sales: {
    name: 'Sales',
    description: 'Outreach, sequences, and conversion content',
    icon: '💼',
    color: 'green'
  },
  social: {
    name: 'Social Media',
    description: 'Posts, stories, and social engagement content',
    icon: '📱',
    color: 'purple'
  },
  business: {
    name: 'Business',
    description: 'Professional communications and corporate content',
    icon: '🏢',
    color: 'gray'
  },
  creative: {
    name: 'Creative',
    description: 'Scripts, stories, and creative content',
    icon: '🎬',
    color: 'pink'
  },
  seo: {
    name: 'SEO & Content',
    description: 'Search-optimized content and blog posts',
    icon: '🔍',
    color: 'yellow'
  }
};

// Helper functions
export function getTemplatesByCategory(category: string): ContentTemplate[] {
  return Object.values(CONTENT_TEMPLATES).filter(template => template.category === category);
}

export function getTemplateById(id: string): ContentTemplate | undefined {
  return CONTENT_TEMPLATES[id];
}

export function getAllTemplates(): ContentTemplate[] {
  return Object.values(CONTENT_TEMPLATES);
}

export function searchTemplates(query: string): ContentTemplate[] {
  const lowercaseQuery = query.toLowerCase();
  return Object.values(CONTENT_TEMPLATES).filter(template => 
    template.name.toLowerCase().includes(lowercaseQuery) ||
    template.description.toLowerCase().includes(lowercaseQuery) ||
    template.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery))
  );
}
