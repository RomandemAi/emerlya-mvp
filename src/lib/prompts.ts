import { StyleProfile, BrandMemory, BrandSettings } from './types';

export function styleSystemPrompt(
  profile: StyleProfile,
  memory: BrandMemory[],
  settings: BrandSettings
): string {
  // Sort memory by importance (highest first)
  const sortedMemory = [...memory].sort((a, b) => b.importance - a.importance);
  
  return `You are Emerlya AI, a brand voice mirror that generates content with perfect brand alignment.

STYLE PROFILE (strictly adhere to every detail):
${JSON.stringify(profile, null, 2)}

PERSISTENT BRAND MEMORY (critical facts to respect, ordered by importance):
${sortedMemory.map(m => `• ${m.key}: ${m.value} (importance: ${m.importance}/5)`).join('\n')}

BRAND SETTINGS:
- Default tone: ${settings.default_tone}
- Region: ${settings.region || 'Universal'}
- Language: ${settings.language}
- Profanity policy: ${settings.profanity_policy}

CORE RULES:
1. NEVER violate brandRules.dont or use bannedWords
2. Maintain the exact voice.tone and voice.personality described in the profile
3. Follow the voice.cadence pattern precisely
4. Use only content.themes that align with the brand
5. Respect audience demographics and pain points
6. Apply regional spelling preferences (${settings.region || 'universal'})
7. If the user's prompt conflicts with brand memory or rules, politely suggest an on-brand alternative

CONTENT GENERATION APPROACH:
- Channel the brand's authentic voice as defined in the profile
- Weave in relevant themes and keywords naturally
- Match the typical structure and format preferences
- Address the target audience's specific interests and pain points
- Maintain consistency with the brand's established personality

OUTPUT INSTRUCTIONS:
- Generate only the requested content unless analysis is explicitly requested
- Ensure every word reflects the brand's unique voice and values
- If unsure about brand alignment, err on the side of the established profile`;
}

export function styleProfilePrompt(sources: string): string {
  return `Analyze the brand content below and create a comprehensive StyleProfile JSON object that captures the brand's unique voice, content patterns, and audience focus.

CONTENT TO ANALYZE:
${sources.slice(0, 50000)} // Limit to avoid token overflow

Return a StyleProfile object with this exact structure:

{
  "voice": {
    "tone": ["adjective1", "adjective2", "adjective3"], // 3-5 core tone descriptors
    "personality": ["trait1", "trait2", "trait3"], // 3-5 personality traits
    "cadence": "description of sentence flow and rhythm"
  },
  "content": {
    "themes": ["theme1", "theme2", "theme3"], // 5-8 recurring themes
    "keywords": ["keyword1", "keyword2"], // 10-15 important brand terms
    "brandRules": {
      "do": ["always do this", "consistently include"], // 3-5 rules
      "dont": ["never do this", "avoid entirely"] // 3-5 prohibitions
    },
    "bannedWords": ["word1", "word2"] // Words that should never appear
  },
  "structure": {
    "preferredFormats": ["format1", "format2"], // Common content types
    "avgSentenceLength": 15, // Estimate average sentence length
    "usesEmoji": true, // Whether emojis are used
    "hashtagStyle": "description of hashtag usage"
  },
  "audience": {
    "demographics": ["demographic1", "demographic2"], // Target demographics
    "painPoints": ["pain1", "pain2"], // Audience challenges addressed
    "interests": ["interest1", "interest2"] // Audience interests catered to
  }
}

Be extremely precise and specific. Extract actual patterns from the content, not generic descriptions.`;
}

export function brandFactsPrompt(profile: StyleProfile, sources: string): string {
  return `From the content and StyleProfile below, extract critical brand facts that should persist across all content generation.

STYLE PROFILE:
${JSON.stringify(profile, null, 2)}

BRAND CONTENT:
${sources.slice(0, 40000)}

Return a JSON array of objects with this structure:
[
  {
    "key": "Brand Mission",
    "value": "Specific mission statement or core purpose",
    "importance": 5
  },
  {
    "key": "Core Offerings",
    "value": "Main products/services offered",
    "importance": 4
  }
]

EXTRACT THESE SPECIFIC TYPES (importance levels shown):
- Brand mission/purpose (importance: 5)
- Target audience & their pain points (importance: 4-5)
- Core products/services/offerings (importance: 4-5)
- Tone pillars in 3-4 key points (importance: 5)
- Forbidden topics, claims, or approaches (importance: 5)
- Must-use phrases, taglines, or branded terms (importance: 4-5)
- Regional spelling preferences or local context (importance: 3)
- Compliance requirements or disclaimers (importance: 5)
- Brand values or beliefs that guide content (importance: 4)
- Unique selling propositions or differentiators (importance: 4)

Be extremely specific and actionable. Extract only facts that are clearly stated or strongly implied in the content.`;
}

export function seedContentPrompt(profile: StyleProfile, memory: BrandMemory[]): string {
  const sortedMemory = [...memory].sort((a, b) => b.importance - a.importance);
  
  return `Generate seed content for this brand to demonstrate the voice and provide instant examples.

STYLE PROFILE:
${JSON.stringify(profile, null, 2)}

BRAND MEMORY:
${sortedMemory.map(m => `• ${m.key}: ${m.value}`).join('\n')}

Generate exactly 10 pieces of seed content with this structure:
[
  {
    "title": "Brand Bio",
    "content": "A compelling 2-3 sentence brand bio",
    "type": "bio"
  },
  {
    "title": "Tagline Option 1",
    "content": "A memorable brand tagline",
    "type": "tagline"
  },
  {
    "title": "Tagline Option 2", 
    "content": "Alternative brand tagline",
    "type": "tagline"
  },
  {
    "title": "Social Caption 1",
    "content": "Engaging social media caption with brand voice",
    "type": "caption"
  },
  {
    "title": "Social Caption 2",
    "content": "Different style social caption",
    "type": "caption"
  },
  {
    "title": "Social Caption 3",
    "content": "Third variation social caption",
    "type": "caption"
  },
  {
    "title": "Welcome Email",
    "content": "Warm welcome email in brand voice",
    "type": "email"
  },
  {
    "title": "Newsletter Intro",
    "content": "Newsletter opening paragraph",
    "type": "email"
  },
  {
    "title": "Product Ad",
    "content": "Compelling product advertisement",
    "type": "ad"
  },
  {
    "title": "Value Proposition",
    "content": "Clear value proposition statement",
    "type": "ad"
  }
]

Each piece should perfectly embody the brand voice and demonstrate different content types.`;
}
