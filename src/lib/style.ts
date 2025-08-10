import { callOpenAI } from './openai';
import { StyleProfile } from './types';
import { styleProfilePrompt } from './prompts';

// Build a comprehensive style profile from brand content
export async function buildStyleProfile(sources: string[]): Promise<StyleProfile> {
  const combinedContent = sources.join('\n\n---\n\n');
  
  if (!combinedContent.trim()) {
    // Return a basic default profile if no content
    return getDefaultProfile();
  }

  try {
    const response = await callOpenAI(
      [
        {
          role: 'user',
          content: styleProfilePrompt(combinedContent)
        }
      ],
      {
        temperature: 0,
        maxTokens: 3000
      }
    );

    // Ensure we have a non-streaming response
    if ('choices' in response) {
      const content = response.choices[0]?.message?.content;
      if (!content) {
        throw new Error('No response from OpenAI');
      }

      // Parse the JSON response
      const profile = JSON.parse(content) as StyleProfile;
      
      // Validate the profile structure
      validateStyleProfile(profile);
      
      return profile;
    } else {
      throw new Error('Unexpected streaming response');
    }
    
  } catch (error) {
    console.error('Error building style profile:', error);
    
    // Fallback to a basic analysis if JSON parsing fails
    return await buildBasicProfile(combinedContent);
  }
}

// Validate that the style profile has the required structure
function validateStyleProfile(profile: any): asserts profile is StyleProfile {
  if (!profile || typeof profile !== 'object') {
    throw new Error('Profile must be an object');
  }

  const required = ['voice', 'content', 'structure', 'audience'];
  for (const field of required) {
    if (!(field in profile)) {
      throw new Error(`Profile missing required field: ${field}`);
    }
  }

  // Validate voice structure
  if (!profile.voice.tone || !Array.isArray(profile.voice.tone)) {
    throw new Error('voice.tone must be an array');
  }
  
  if (!profile.voice.personality || !Array.isArray(profile.voice.personality)) {
    throw new Error('voice.personality must be an array');
  }

  // Validate content structure
  if (!profile.content.themes || !Array.isArray(profile.content.themes)) {
    throw new Error('content.themes must be an array');
  }
  
  if (!profile.content.brandRules || typeof profile.content.brandRules !== 'object') {
    throw new Error('content.brandRules must be an object');
  }
}

// Build a basic profile using simple analysis if the main approach fails
async function buildBasicProfile(content: string): Promise<StyleProfile> {
  const basicPrompt = `Analyze this brand content and return a simple StyleProfile JSON:

Content: ${content.slice(0, 10000)}

Return only valid JSON with this structure:
{
  "voice": {"tone": ["professional"], "personality": ["helpful"], "cadence": "clear"},
  "content": {"themes": ["business"], "keywords": ["quality"], "brandRules": {"do": ["be helpful"], "dont": ["be negative"]}, "bannedWords": []},
  "structure": {"preferredFormats": ["posts"], "avgSentenceLength": 15, "usesEmoji": false, "hashtagStyle": "minimal"},
  "audience": {"demographics": ["professionals"], "painPoints": ["efficiency"], "interests": ["growth"]}
}`;

  try {
    const response = await callOpenAI(
      [{ role: 'user', content: basicPrompt }],
      { temperature: 0, maxTokens: 1500 }
    );

    if ('choices' in response) {
      const result = JSON.parse(response.choices[0]?.message?.content || '{}');
      return result;
    } else {
      throw new Error('Unexpected streaming response');
    }
  } catch (error) {
    console.error('Fallback profile creation failed:', error);
    return getDefaultProfile();
  }
}

// Get a sensible default profile
function getDefaultProfile(): StyleProfile {
  return {
    voice: {
      tone: ['professional', 'friendly', 'helpful'],
      personality: ['approachable', 'knowledgeable', 'reliable'],
      cadence: 'Clear and conversational with moderate pacing'
    },
    content: {
      themes: ['quality', 'service', 'value', 'growth'],
      keywords: ['professional', 'quality', 'trusted', 'experienced'],
      brandRules: {
        do: [
          'Focus on customer value',
          'Maintain professional tone',
          'Be helpful and informative'
        ],
        dont: [
          'Make unrealistic claims',
          'Use overly technical jargon',
          'Be pushy or aggressive'
        ]
      },
      bannedWords: ['cheap', 'desperate', 'spam']
    },
    structure: {
      preferredFormats: ['informational posts', 'helpful tips', 'announcements'],
      avgSentenceLength: 15,
      usesEmoji: false,
      hashtagStyle: 'Minimal and relevant'
    },
    audience: {
      demographics: ['professionals', 'business owners', 'decision makers'],
      painPoints: ['efficiency', 'quality', 'reliability'],
      interests: ['business growth', 'professional development', 'industry trends']
    }
  };
}

// Analyze a piece of content for brand alignment
export async function analyzeContentAlignment(
  content: string,
  profile: StyleProfile
): Promise<{
  score: number;
  analysis: string;
  suggestions: string[];
}> {
  const analysisPrompt = `Analyze how well this content aligns with the brand profile.

CONTENT:
${content}

BRAND PROFILE:
${JSON.stringify(profile, null, 2)}

Return JSON with:
{
  "score": 0.85, // 0-1 alignment score
  "analysis": "Brief analysis of alignment",
  "suggestions": ["Suggestion 1", "Suggestion 2"] // Improvement suggestions
}`;

  try {
    const response = await callOpenAI(
      [{ role: 'user', content: analysisPrompt }],
      { temperature: 0.3, maxTokens: 1000 }
    );

    if ('choices' in response) {
      const result = JSON.parse(response.choices[0]?.message?.content || '{}');
      
      return {
        score: Math.max(0, Math.min(1, result.score || 0.5)),
        analysis: result.analysis || 'Analysis unavailable',
        suggestions: Array.isArray(result.suggestions) ? result.suggestions : []
      };
    } else {
      throw new Error('Unexpected streaming response');
    }
    
  } catch (error) {
    console.error('Error analyzing content alignment:', error);
    return {
      score: 0.5,
      analysis: 'Analysis failed',
      suggestions: ['Unable to analyze content alignment']
    };
  }
}

// Extract key themes from content
export function extractThemes(content: string): string[] {
  const words = content.toLowerCase()
    .replace(/[^\w\s]/g, ' ')
    .split(/\s+/)
    .filter(word => word.length > 3);

  const wordCount: Record<string, number> = {};
  words.forEach(word => {
    wordCount[word] = (wordCount[word] || 0) + 1;
  });

  // Get top themes (words that appear multiple times)
  return Object.entries(wordCount)
    .filter(([_, count]) => count > 1)
    .sort(([_, a], [__, b]) => b - a)
    .slice(0, 8)
    .map(([word]) => word);
}

// Detect writing patterns
export function analyzeWritingPatterns(content: string): {
  avgSentenceLength: number;
  usesEmoji: boolean;
  formalityLevel: 'formal' | 'casual' | 'mixed';
} {
  const sentences = content.split(/[.!?]+/).filter(s => s.trim().length > 0);
  const totalWords = content.split(/\s+/).length;
  const avgSentenceLength = sentences.length > 0 ? totalWords / sentences.length : 15;
  
  const usesEmoji = /[\u{1F600}-\u{1F64F}]|[\u{1F300}-\u{1F5FF}]|[\u{1F680}-\u{1F6FF}]|[\u{1F1E0}-\u{1F1FF}]/u.test(content);
  
  const formalWords = ['therefore', 'furthermore', 'consequently', 'however', 'moreover'];
  const casualWords = ['awesome', 'cool', 'hey', 'yeah', 'super'];
  
  const formalCount = formalWords.filter(word => content.toLowerCase().includes(word)).length;
  const casualCount = casualWords.filter(word => content.toLowerCase().includes(word)).length;
  
  let formalityLevel: 'formal' | 'casual' | 'mixed' = 'mixed';
  if (formalCount > casualCount) formalityLevel = 'formal';
  else if (casualCount > formalCount) formalityLevel = 'casual';
  
  return {
    avgSentenceLength: Math.round(avgSentenceLength),
    usesEmoji,
    formalityLevel
  };
}
