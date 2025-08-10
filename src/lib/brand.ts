import { createClient } from './supabase/server';
import { createEmbedding, chunkText } from './openai';
import { 
  Brand, 
  BrandSource, 
  BrandMemory, 
  BrandSettings, 
  StyleProfile, 
  BrandChunk, 
  BrandDraft 
} from './types';

// Create or update a brand
export async function upsertBrand(data: {
  name: string;
  ownerId: string;
  settings?: Partial<BrandSettings>;
}): Promise<Brand> {
  const supabase = await createClient();
  
  // Create the brand
  const { data: brand, error: brandError } = await supabase
    .from('brands')
    .insert({
      name: data.name,
      profile_id: data.ownerId
    })
    .select()
    .single();

  if (brandError) {
    throw new Error(`Failed to create brand: ${brandError.message}`);
  }

  // Create default settings if provided
  if (data.settings) {
    await saveSettings(brand.id, {
      brand_id: brand.id,
      default_tone: data.settings.default_tone || 'on-brand',
      default_type: data.settings.default_type || 'post',
      region: data.settings.region,
      language: data.settings.language || 'en',
      profanity_policy: data.settings.profanity_policy || 'soft'
    });
  }

  return brand;
}

// Add source documents to a brand
export async function addSources(brandId: string, sources: BrandSource[]): Promise<void> {
  const supabase = await createClient();
  
  const documents = sources.map(source => ({
    brand_id: brandId,
    content: source.content,
    status: 'pending'
  }));

  const { error } = await supabase
    .from('documents')
    .insert(documents);

  if (error) {
    throw new Error(`Failed to add sources: ${error.message}`);
  }
}

// Process documents into chunks with embeddings
export async function indexChunks(brandId: string): Promise<void> {
  const supabase = await createClient();
  
  // Get all pending documents for this brand
  const { data: documents, error: docError } = await supabase
    .from('documents')
    .select('*')
    .eq('brand_id', brandId)
    .eq('status', 'pending');

  if (docError) {
    throw new Error(`Failed to fetch documents: ${docError.message}`);
  }

  if (!documents || documents.length === 0) {
    return;
  }

  // Process each document
  for (const doc of documents) {
    try {
      // Split into chunks
      const chunks = chunkText(doc.content, 1000);
      
      // Create embeddings and save chunks
      const chunkData = [];
      for (let i = 0; i < chunks.length; i++) {
        const embedding = await createEmbedding(chunks[i]);
        chunkData.push({
          brand_id: brandId,
          document_id: doc.id,
          chunk: chunks[i],
          chunk_index: i,
          embedding: JSON.stringify(embedding) // Store as JSON string for now
        });
      }

      // Save chunks to database
      const { error: chunkError } = await supabase
        .from('brand_chunks')
        .insert(chunkData);

      if (chunkError) {
        console.error(`Failed to save chunks for doc ${doc.id}:`, chunkError);
        continue;
      }

      // Mark document as processed
      await supabase
        .from('documents')
        .update({ status: 'processed' })
        .eq('id', doc.id);

    } catch (error) {
      console.error(`Failed to process document ${doc.id}:`, error);
      
      // Mark document as error
      await supabase
        .from('documents')
        .update({ status: 'error' })
        .eq('id', doc.id);
    }
  }
}

// Save style profile to brand
export async function saveProfile(brandId: string, profile: StyleProfile): Promise<void> {
  const supabase = await createClient();
  
  const { error } = await supabase
    .from('brands')
    .update({ persona_config_json: profile })
    .eq('id', brandId);

  if (error) {
    throw new Error(`Failed to save profile: ${error.message}`);
  }
}

// Save brand memory facts
export async function saveMemory(brandId: string, memory: BrandMemory[]): Promise<void> {
  const supabase = await createClient();
  
  const memoryData = memory.map(m => ({
    brand_id: brandId,
    key: m.key,
    value: m.value,
    importance: m.importance
  }));

  const { error } = await supabase
    .from('brand_memory')
    .insert(memoryData);

  if (error) {
    throw new Error(`Failed to save memory: ${error.message}`);
  }
}

// Save brand settings
export async function saveSettings(brandId: string, settings: BrandSettings): Promise<void> {
  const supabase = await createClient();
  
  const { error } = await supabase
    .from('brand_settings')
    .upsert(settings, { onConflict: 'brand_id' });

  if (error) {
    throw new Error(`Failed to save settings: ${error.message}`);
  }
}

// Save seed content drafts
export async function saveDrafts(brandId: string, drafts: Omit<BrandDraft, 'id' | 'brand_id'>[]): Promise<void> {
  const supabase = await createClient();
  
  const draftData = drafts.map(draft => ({
    brand_id: brandId,
    title: draft.title,
    content: draft.content,
    type: draft.type
  }));

  const { error } = await supabase
    .from('brand_drafts')
    .insert(draftData);

  if (error) {
    throw new Error(`Failed to save drafts: ${error.message}`);
  }
}

// Retrieve style profile
export async function getProfile(brandId: string): Promise<StyleProfile | null> {
  const supabase = await createClient();
  
  const { data, error } = await supabase
    .from('brands')
    .select('persona_config_json')
    .eq('id', brandId)
    .single();

  if (error) {
    throw new Error(`Failed to get profile: ${error.message}`);
  }

  return data?.persona_config_json || null;
}

// Retrieve brand memory
export async function getMemory(brandId: string): Promise<BrandMemory[]> {
  const supabase = await createClient();
  
  const { data, error } = await supabase
    .from('brand_memory')
    .select('key, value, importance')
    .eq('brand_id', brandId)
    .order('importance', { ascending: false });

  if (error) {
    throw new Error(`Failed to get memory: ${error.message}`);
  }

  return data || [];
}

// Retrieve brand settings
export async function getSettings(brandId: string): Promise<BrandSettings> {
  const supabase = await createClient();
  
  const { data, error } = await supabase
    .from('brand_settings')
    .select('*')
    .eq('brand_id', brandId)
    .single();

  if (error) {
    // Return defaults if no settings found
    return {
      brand_id: brandId,
      default_tone: 'on-brand',
      default_type: 'post',
      language: 'en',
      profanity_policy: 'soft'
    };
  }

  return data;
}

// Retrieve relevant chunks using similarity search
export async function retrieveChunks(brandId: string, query: string, limit: number = 5): Promise<BrandChunk[]> {
  const supabase = await createClient();
  
  try {
    // Create embedding for the query
    const queryEmbedding = await createEmbedding(query);
    
    // For now, get random chunks since we need proper vector search setup
    // TODO: Implement proper vector similarity search when pgvector is configured
    const { data, error } = await supabase
      .from('brand_chunks')
      .select('*')
      .eq('brand_id', brandId)
      .limit(limit);

    if (error) {
      throw new Error(`Failed to retrieve chunks: ${error.message}`);
    }

    return data || [];
  } catch (error) {
    console.error('Error retrieving chunks:', error);
    return [];
  }
}

// Get brand drafts
export async function getDrafts(brandId: string): Promise<BrandDraft[]> {
  const supabase = await createClient();
  
  const { data, error } = await supabase
    .from('brand_drafts')
    .select('*')
    .eq('brand_id', brandId)
    .order('created_at', { ascending: false });

  if (error) {
    throw new Error(`Failed to get drafts: ${error.message}`);
  }

  return data || [];
}

// Clear brand memory (for rebuilding)
export async function clearMemory(brandId: string): Promise<void> {
  const supabase = await createClient();
  
  const { error } = await supabase
    .from('brand_memory')
    .delete()
    .eq('brand_id', brandId);

  if (error) {
    throw new Error(`Failed to clear memory: ${error.message}`);
  }
}

// Clear brand chunks (for rebuilding)
export async function clearChunks(brandId: string): Promise<void> {
  const supabase = await createClient();
  
  const { error } = await supabase
    .from('brand_chunks')
    .delete()
    .eq('brand_id', brandId);

  if (error) {
    throw new Error(`Failed to clear chunks: ${error.message}`);
  }
}
