import { openai } from './openai';
import { getProfile, getMemory, getSettings, retrieveChunks } from './brand';
import { BlogGenerationRequest } from './types';

interface BlogGenerationResult {
  content: string;
  tags: string[];
  seo_title: string;
}

export async function generateBlogPost(request: BlogGenerationRequest): Promise<BlogGenerationResult> {
  const { brand_id, topic, tags = [], target_word_count = 700, custom_prompt } = request;

  try {
    // Get brand context
    const [profile, memory, settings] = await Promise.all([
      getProfile(brand_id),
      getMemory(brand_id),
      getSettings(brand_id)
    ]);

    // Get relevant chunks based on topic
    const relevantChunks = await retrieveChunks(brand_id, topic, 3);

    // Build the system prompt for blog generation
    const systemPrompt = buildBlogSystemPrompt(profile, memory, settings, relevantChunks);
    
    // Build the user prompt
    const userPrompt = buildBlogUserPrompt(topic, tags, target_word_count, custom_prompt);

    // Generate the blog post using OpenAI
    const completion = await openai.chat.completions.create({
      model: process.env.OPENAI_MODEL || 'gpt-4o',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt }
      ],
      temperature: 0.7,
      max_tokens: 2000
    });

    const response = completion.choices[0]?.message?.content;
    if (!response) {
      throw new Error('No response generated from OpenAI');
    }

    // Parse the response to extract content, title, and tags
    const parsed = parseAIResponse(response);
    
    return {
      content: parsed.content,
      tags: parsed.tags.length > 0 ? parsed.tags : generateTagsFromTopic(topic),
      seo_title: parsed.seo_title || `${topic} - Brand Blog Post`
    };

  } catch (error) {
    console.error('Blog generation error:', error);
    throw new Error('Failed to generate blog post with AI');
  }
}

function buildBlogSystemPrompt(profile: any, memory: any[], settings: any, chunks: any[]): string {
  let prompt = `You are an expert blog writer creating content for a specific brand. Your task is to write engaging, informative blog posts that perfectly match the brand's voice and style.

BRAND CONTEXT:
`;

  // Add brand voice and style from profile
  if (profile?.voice) {
    prompt += `
Voice & Tone: ${profile.voice.tone?.join(', ') || 'Professional, engaging'}
Personality: ${profile.voice.personality?.join(', ') || 'Authentic, helpful'}
Writing Style: ${profile.voice.cadence || 'Clear and conversational'}
`;
  }

  // Add brand content guidelines
  if (profile?.content) {
    prompt += `
Brand Themes: ${profile.content.themes?.join(', ') || 'Industry expertise, customer success'}
Key Topics: ${profile.content.keywords?.join(', ') || 'Innovation, solutions, growth'}
`;

    if (profile.content.brandRules?.do?.length > 0) {
      prompt += `\nBrand Guidelines (DO): ${profile.content.brandRules.do.join(', ')}`;
    }
    
    if (profile.content.brandRules?.dont?.length > 0) {
      prompt += `\nBrand Guidelines (DON'T): ${profile.content.brandRules.dont.join(', ')}`;
    }
  }

  // Add important brand facts from memory
  if (memory.length > 0) {
    prompt += `\nIMPORTANT BRAND FACTS TO REMEMBER:`;
    memory.slice(0, 5).forEach(fact => {
      prompt += `\n- ${fact.key}: ${fact.value}`;
    });
  }

  // Add relevant context from brand documents
  if (chunks.length > 0) {
    prompt += `\nRELEVANT BRAND CONTEXT:`;
    chunks.forEach((chunk, i) => {
      prompt += `\n${i + 1}. ${chunk.chunk.substring(0, 200)}...`;
    });
  }

  // Add language and region preferences
  prompt += `\nLanguage: ${settings.language || 'en'}`;
  if (settings.region) {
    prompt += `\nRegion: ${settings.region}`;
  }

  prompt += `

WRITING INSTRUCTIONS:
- Write in the brand's authentic voice and tone
- Create engaging, valuable content that serves the reader
- Include practical insights and actionable advice when relevant
- Maintain consistent brand messaging throughout
- Use natural, conversational language
- Structure content with clear headings and good flow
- End with a compelling conclusion or call-to-action

RESPONSE FORMAT:
Return your response in this exact format:

TITLE: [SEO-friendly blog title]
TAGS: [tag1, tag2, tag3, tag4, tag5]
CONTENT:
[Full blog post content here]
`;

  return prompt;
}

function buildBlogUserPrompt(topic: string, tags: string[], target_word_count: number, custom_prompt?: string): string {
  let prompt = `Please write a blog post about: ${topic}

Target length: ${target_word_count} words

`;

  if (tags.length > 0) {
    prompt += `Suggested tags to consider: ${tags.join(', ')}\n`;
  }

  if (custom_prompt) {
    prompt += `Additional instructions: ${custom_prompt}\n`;
  }

  prompt += `
Please create an engaging, well-structured blog post that provides real value to readers while perfectly matching the brand voice and guidelines provided.`;

  return prompt;
}

function parseAIResponse(response: string): { content: string; tags: string[]; seo_title: string } {
  const lines = response.split('\n');
  let title = '';
  let tags: string[] = [];
  let content = '';
  let isContent = false;

  for (const line of lines) {
    if (line.startsWith('TITLE:')) {
      title = line.replace('TITLE:', '').trim();
    } else if (line.startsWith('TAGS:')) {
      const tagString = line.replace('TAGS:', '').trim();
      tags = tagString.split(',').map(tag => tag.trim()).filter(tag => tag.length > 0);
    } else if (line.startsWith('CONTENT:')) {
      isContent = true;
    } else if (isContent) {
      content += line + '\n';
    }
  }

  return {
    content: content.trim(),
    tags,
    seo_title: title
  };
}

function generateTagsFromTopic(topic: string): string[] {
  // Simple tag generation based on topic keywords
  const words = topic.toLowerCase().split(/\s+/);
  const tags = words
    .filter(word => word.length > 3)
    .slice(0, 5)
    .map(word => word.charAt(0).toUpperCase() + word.slice(1));
  
  return tags.length > 0 ? tags : ['Blog', 'Content', 'Business'];
}
