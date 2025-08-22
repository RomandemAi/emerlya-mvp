import OpenAI from 'openai';

// Lazy initialization of OpenAI client
let openaiClient: OpenAI | null = null;

function getOpenAIClient(): OpenAI {
  if (!openaiClient) {
    if (!process.env.OPENAI_API_KEY) {
      throw new Error('OPENAI_API_KEY environment variable is required');
    }
    openaiClient = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
  }
  return openaiClient;
}

// Export the client getter for backward compatibility
export const openai = {
  get chat() {
    return getOpenAIClient().chat;
  },
  get embeddings() {
    return getOpenAIClient().embeddings;
  }
};

// Helper function to create embeddings
export async function createEmbedding(text: string): Promise<number[]> {
  try {
    const response = await openai.embeddings.create({
      model: 'text-embedding-ada-002',
      input: text,
    });
    
    return response.data[0].embedding;
  } catch (error) {
    console.error('Error creating embedding:', error);
    throw error;
  }
}

// Helper function to chunk text
export function chunkText(text: string, maxChunkSize: number = 1000): string[] {
  const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0);
  const chunks: string[] = [];
  let currentChunk = '';

  for (const sentence of sentences) {
    if (currentChunk.length + sentence.length > maxChunkSize && currentChunk.length > 0) {
      chunks.push(currentChunk.trim());
      currentChunk = sentence;
    } else {
      currentChunk += (currentChunk ? '. ' : '') + sentence;
    }
  }

  if (currentChunk.trim()) {
    chunks.push(currentChunk.trim());
  }

  return chunks;
}

// Helper function to call OpenAI with retries and model fallback
export async function callOpenAI(
  messages: OpenAI.Chat.Completions.ChatCompletionMessageParam[],
  options: {
    temperature?: number;
    maxTokens?: number;
    stream?: boolean;
  } = {}
) {
  const { temperature = 0.7, maxTokens = 2000, stream = false } = options;

  try {
    // Try gpt-4o-mini first
    return await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages,
      temperature,
      max_tokens: maxTokens,
      stream,
    });
  } catch (error: any) {
    console.warn('gpt-4o-mini failed, trying gpt-4o...', error.message);
    
    try {
      // Fallback to gpt-4o
      return await openai.chat.completions.create({
        model: 'gpt-4o',
        messages,
        temperature,
        max_tokens: maxTokens,
        stream,
      });
    } catch (fallbackError: any) {
      console.error('Both models failed:', fallbackError.message);
      throw fallbackError;
    }
  }
}
