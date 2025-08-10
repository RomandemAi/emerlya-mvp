// Core type definitions for the Emerlya AI system

export interface StyleProfile {
  voice: {
    tone: string[];
    personality: string[];
    cadence: string;
  };
  content: {
    themes: string[];
    keywords: string[];
    brandRules: {
      do: string[];
      dont: string[];
    };
    bannedWords: string[];
  };
  structure: {
    preferredFormats: string[];
    avgSentenceLength: number;
    usesEmoji: boolean;
    hashtagStyle: string;
  };
  audience: {
    demographics: string[];
    painPoints: string[];
    interests: string[];
  };
}

export interface BrandMemory {
  key: string;
  value: string;
  importance: number; // 1-5
}

export interface BrandSettings {
  brand_id: string;
  default_tone: string;
  default_type: string;
  region?: string;
  language: string;
  profanity_policy: string;
}

export interface BrandSource {
  content: string;
  type: 'text' | 'url' | 'file';
  title?: string;
}

export interface BrandChunk {
  id: string;
  brand_id: string;
  document_id?: string;
  chunk: string;
  chunk_index: number;
  embedding?: number[];
}

export interface BrandDraft {
  id: string;
  brand_id: string;
  title: string;
  content: string;
  type: 'bio' | 'tagline' | 'caption' | 'email' | 'ad';
}

export interface Brand {
  id: string;
  profile_id: string;
  name: string;
  persona_config_json?: StyleProfile;
  created_at: string;
}

export interface GenerationRequest {
  brandId: string;
  prompt: string;
  type?: string;
  wordCount?: number;
  tone?: string;
}

export interface GenerationContext {
  profile: StyleProfile;
  memory: BrandMemory[];
  chunks: BrandChunk[];
  settings: BrandSettings;
}

export interface BlogPost {
  id: string;
  brand_id: string;
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

export interface BlogPostCreate {
  brand_id: string;
  title: string;
  content?: string; // Optional for AI generation
  topic?: string; // Required for AI generation if no content
  tags?: string[];
  status?: 'draft' | 'published';
  author_type?: 'manual' | 'ai-generated';
  seo_title?: string;
  excerpt?: string;
}

export interface BlogPostUpdate {
  title?: string;
  content?: string;
  tags?: string[];
  status?: 'draft' | 'published';
  seo_title?: string;
  excerpt?: string;
}

export interface BlogGenerationRequest {
  brand_id: string;
  topic: string;
  tags?: string[];
  target_word_count?: number;
  custom_prompt?: string;
}
