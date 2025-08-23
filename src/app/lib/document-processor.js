// src/lib/document-processor.js
// FINAL VERSION

// 1. Import necessary libraries
import { createClient } from '@supabase/supabase-js';
import { Pinecone } from '@pinecone-database/pinecone';
import OpenAI from 'openai';

// Lazy singletons
let _supabase = null;
let _pinecone = null;
let _openai = null;

function getSupabase() {
  if (_supabase) return _supabase;
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_KEY;
  if (!url || !serviceKey) {
    throw new Error('Supabase configuration missing');
  }
  _supabase = createClient(url, serviceKey);
  return _supabase;
}

function getPinecone() {
  if (_pinecone) return _pinecone;
  const apiKey = process.env.PINECONE_API_KEY;
  if (!apiKey) {
    throw new Error('Pinecone API key missing');
  }
  _pinecone = new Pinecone({ apiKey });
  return _pinecone;
}

function getOpenAI() {
  if (_openai) return _openai;
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    throw new Error('OPENAI_API_KEY missing');
  }
  _openai = new OpenAI({ apiKey });
  return _openai;
}

// 3. Main processing function
export async function processDocument(documentId) {
  console.log(`Processing document: ${documentId}`);

  try {
    const supabase = getSupabase();
    const pinecone = getPinecone();
    const openai = getOpenAI();

    // STEP 1: Fetch Data from Supabase
    const { data: documentData, error: documentError } = await supabase
      .from('documents')
      .select('content, brand_id')
      .eq('id', documentId)
      .single();

    if (documentError || !documentData) {
      await supabase.from('documents').update({ status: 'error' }).eq('id', documentId);
      throw new Error(`Failed to fetch document ${documentId}: ${documentError?.message}`);
    }
    const { content, brand_id } = documentData;
    console.log(`Fetched content for brand: ${brand_id}`);

    // STEP 2: Chunk the Text
    function chunkText(text, chunkSize, overlap) {
      const chunks = [];
      let i = 0;
      while (i < text.length) {
        chunks.push(text.slice(i, i + chunkSize));
        i += chunkSize - overlap;
      }
      return chunks;
    }
    const textChunks = chunkText(content, 1000, 200);
    console.log(`Split content into ${textChunks.length} chunks.`);

    // STEP 3: Vectorize each chunk
    console.log(`Vectorizing ${textChunks.length} chunks with OpenAI...`);
    const embeddingResponse = await openai.embeddings.create({
      model: 'text-embedding-3-small',
      input: textChunks,
    });
    const vectors = embeddingResponse.data.map((embeddingObj) => embeddingObj.embedding);
    console.log(`Successfully created ${vectors.length} vectors.`);

    // STEP 4: Upsert to Pinecone
    console.log('Connecting to Pinecone index...');
    const indexName = 'cora-mvp-index';
    const index = pinecone.index(indexName).namespace(brand_id);
    const vectorsToUpsert = vectors.map((vector, i) => ({
      id: `${documentId}-chunk-${i}`,
      values: vector,
      metadata: {
        text: textChunks[i],
      },
    }));
    console.log(`Upserting ${vectorsToUpsert.length} vectors to Pinecone...`);
    await index.upsert(vectorsToUpsert);
    console.log('Upsert to Pinecone complete.');

    // STEP 5: Update Status in Supabase
    await supabase.from('documents').update({ status: 'processed' }).eq('id', documentId);

    console.log(`Successfully processed document: ${documentId}`);
    return { success: true };

  } catch (error) {
    console.error(`Error processing document ${documentId}:`, error);
    try {
      const supabase = getSupabase();
      await supabase.from('documents').update({ status: 'error' }).eq('id', documentId);
    } catch {}
    return { success: false, error: error.message };
  }
}
