import { callOpenAI } from './openai';
import { StyleProfile, BrandMemory, BrandSource } from './types';
import { brandFactsPrompt, seedContentPrompt } from './prompts';

// Extract brand facts from profile and sources
export async function extractBrandFacts(
  profile: StyleProfile, 
  sources: BrandSource[]
): Promise<BrandMemory[]> {
  const combinedContent = sources
    .map(source => source.content)
    .filter(Boolean)
    .join('\n\n---\n\n');

  if (!combinedContent.trim()) {
    return getDefaultBrandFacts();
  }

  try {
    const response = await callOpenAI(
      [
        {
          role: 'user',
          content: brandFactsPrompt(profile, combinedContent)
        }
      ],
      {
        temperature: 0,
        maxTokens: 2500
      }
    );

    if ('choices' in response) {
      const content = response.choices[0]?.message?.content;
      if (!content) {
        throw new Error('No response from OpenAI');
      }

      // Parse the JSON response
      const facts = JSON.parse(content) as BrandMemory[];
      
      // Validate and filter facts
      return validateAndFilterFacts(facts);
    } else {
      throw new Error('Unexpected streaming response');
    }
    
  } catch (error) {
    console.error('Error extracting brand facts:', error);
    
    // Fallback to basic fact extraction
    return await extractBasicFacts(combinedContent, profile);
  }
}

// Generate seed content for a brand
export async function generateSeedContent(
  profile: StyleProfile,
  memory: BrandMemory[]
): Promise<Array<{
  title: string;
  content: string;
  type: 'bio' | 'tagline' | 'caption' | 'email' | 'ad';
}>> {
  try {
    const response = await callOpenAI(
      [
        {
          role: 'user',
          content: seedContentPrompt(profile, memory)
        }
      ],
      {
        temperature: 0.7,
        maxTokens: 3000
      }
    );

    if ('choices' in response) {
      const content = response.choices[0]?.message?.content;
      if (!content) {
        throw new Error('No response from OpenAI');
      }

      // Parse the JSON response
      const seedContent = JSON.parse(content);
      
      if (Array.isArray(seedContent)) {
        return seedContent.filter(item => 
          item.title && item.content && item.type
        );
      }
    }
    
    throw new Error('Invalid seed content response');
    
  } catch (error) {
    console.error('Error generating seed content:', error);
    return getDefaultSeedContent();
  }
}

// Validate and filter brand facts
function validateAndFilterFacts(facts: any[]): BrandMemory[] {
  if (!Array.isArray(facts)) {
    return getDefaultBrandFacts();
  }

  return facts
    .filter(fact => 
      fact && 
      typeof fact === 'object' &&
      typeof fact.key === 'string' &&
      typeof fact.value === 'string' &&
      typeof fact.importance === 'number'
    )
    .map(fact => ({
      key: fact.key.trim(),
      value: fact.value.trim(),
      importance: Math.max(1, Math.min(5, Math.round(fact.importance)))
    }))
    .filter(fact => fact.key.length > 0 && fact.value.length > 0)
    .slice(0, 20); // Limit to 20 facts max
}

// Extract basic facts using simple analysis
async function extractBasicFacts(content: string, profile: StyleProfile): Promise<BrandMemory[]> {
  const basicPrompt = `Extract 5-8 key brand facts from this content:

Content: ${content.slice(0, 15000)}

Return JSON array:
[
  {"key": "Brand Mission", "value": "specific mission", "importance": 5},
  {"key": "Target Audience", "value": "specific audience", "importance": 4}
]`;

  try {
    const response = await callOpenAI(
      [{ role: 'user', content: basicPrompt }],
      { temperature: 0, maxTokens: 1000 }
    );

    if ('choices' in response) {
      const result = JSON.parse(response.choices[0]?.message?.content || '[]');
      return validateAndFilterFacts(result);
    }
    
    throw new Error('No response');
  } catch (error) {
    console.error('Basic fact extraction failed:', error);
    return getDefaultBrandFacts();
  }
}

// Get default brand facts when extraction fails
function getDefaultBrandFacts(): BrandMemory[] {
  return [
    {
      key: 'Brand Mission',
      value: 'Provide quality products and excellent customer service',
      importance: 5
    },
    {
      key: 'Target Audience',
      value: 'Professionals and business owners seeking reliable solutions',
      importance: 4
    },
    {
      key: 'Core Values',
      value: 'Quality, reliability, customer focus, innovation',
      importance: 4
    },
    {
      key: 'Tone Guidelines',
      value: 'Professional yet approachable, helpful, and trustworthy',
      importance: 5
    },
    {
      key: 'Content Restrictions',
      value: 'Avoid overly technical jargon, maintain positive messaging',
      importance: 4
    }
  ];
}

// Get default seed content when generation fails
function getDefaultSeedContent(): Array<{
  title: string;
  content: string;
  type: 'bio' | 'tagline' | 'caption' | 'email' | 'ad';
}> {
  return [
    {
      title: 'Brand Bio',
      content: 'We are dedicated to providing exceptional products and services that help our customers achieve their goals through quality, innovation, and reliability.',
      type: 'bio'
    },
    {
      title: 'Tagline Option 1',
      content: 'Excellence in Every Detail',
      type: 'tagline'
    },
    {
      title: 'Tagline Option 2',
      content: 'Your Success, Our Mission',
      type: 'tagline'
    },
    {
      title: 'Social Caption 1',
      content: 'Ready to take your business to the next level? Our proven solutions help companies like yours achieve measurable results. Let\'s talk about your goals.',
      type: 'caption'
    },
    {
      title: 'Social Caption 2',
      content: 'Quality isn\'t just what we deliver – it\'s who we are. From concept to completion, we\'re committed to excellence in everything we do.',
      type: 'caption'
    },
    {
      title: 'Social Caption 3',
      content: 'Behind every successful project is a team that cares about your success as much as you do. That\'s the difference experience makes.',
      type: 'caption'
    },
    {
      title: 'Welcome Email',
      content: 'Welcome to our community! We\'re excited to help you achieve your goals with our comprehensive solutions and dedicated support team.',
      type: 'email'
    },
    {
      title: 'Newsletter Intro',
      content: 'This week, we\'re sharing insights that can help streamline your operations and boost productivity. From industry trends to practical tips, here\'s what you need to know.',
      type: 'email'
    },
    {
      title: 'Product Ad',
      content: 'Transform your workflow with solutions designed for modern businesses. Experience the difference that quality and reliability make.',
      type: 'ad'
    },
    {
      title: 'Value Proposition',
      content: 'When you choose us, you\'re choosing proven expertise, reliable results, and a partnership focused on your success.',
      type: 'ad'
    }
  ];
}

// Analyze existing content to extract brand patterns
export function analyzeBrandPatterns(sources: BrandSource[]): {
  commonPhrases: string[];
  toneIndicators: string[];
  topics: string[];
} {
  const combinedContent = sources
    .map(s => s.content)
    .join(' ')
    .toLowerCase();

  // Extract common phrases (2-4 words that appear multiple times)
  const phrases = extractCommonPhrases(combinedContent);
  
  // Identify tone indicators
  const toneWords = extractToneIndicators(combinedContent);
  
  // Extract main topics
  const topics = extractMainTopics(combinedContent);

  return {
    commonPhrases: phrases,
    toneIndicators: toneWords,
    topics: topics
  };
}

function extractCommonPhrases(content: string): string[] {
  const words = content.replace(/[^\w\s]/g, ' ').split(/\s+/);
  const phrases: Record<string, number> = {};

  // Look for 2-4 word phrases
  for (let i = 0; i < words.length - 1; i++) {
    for (let len = 2; len <= 4 && i + len <= words.length; len++) {
      const phrase = words.slice(i, i + len).join(' ');
      if (phrase.length > 8) { // Minimum phrase length
        phrases[phrase] = (phrases[phrase] || 0) + 1;
      }
    }
  }

  return Object.entries(phrases)
    .filter(([_, count]) => count > 1)
    .sort(([_, a], [__, b]) => b - a)
    .slice(0, 10)
    .map(([phrase]) => phrase);
}

function extractToneIndicators(content: string): string[] {
  const toneWords = {
    professional: ['professional', 'expertise', 'experience', 'quality'],
    friendly: ['friendly', 'welcoming', 'warm', 'approachable'],
    innovative: ['innovative', 'cutting-edge', 'advanced', 'modern'],
    reliable: ['reliable', 'trusted', 'dependable', 'consistent'],
    helpful: ['helpful', 'support', 'assistance', 'guidance']
  };

  const indicators: string[] = [];
  
  Object.entries(toneWords).forEach(([tone, words]) => {
    const count = words.filter(word => content.includes(word)).length;
    if (count > 0) {
      indicators.push(tone);
    }
  });

  return indicators;
}

function extractMainTopics(content: string): string[] {
  const topicKeywords = {
    business: ['business', 'company', 'corporate', 'enterprise'],
    technology: ['technology', 'software', 'digital', 'tech'],
    service: ['service', 'support', 'customer', 'client'],
    growth: ['growth', 'development', 'improvement', 'progress'],
    innovation: ['innovation', 'creative', 'solution', 'breakthrough']
  };

  const topics: string[] = [];
  
  Object.entries(topicKeywords).forEach(([topic, keywords]) => {
    const count = keywords.filter(word => content.includes(word)).length;
    if (count > 1) {
      topics.push(topic);
    }
  });

  return topics;
}
