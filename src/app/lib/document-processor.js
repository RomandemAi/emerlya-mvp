// src/lib/document-processor.js
// FINAL VERSION

// 1. Import necessary libraries
import { createClient } from '@supabase/supabase-js';
import { Pinecone } from '@pinecone-database/pinecone';
import OpenAI from 'openai';

// 2. Initialize clients
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_KEY);
const pinecone = new Pinecone({ apiKey: process.env.PINECONE_API_KEY });
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// 3. Main processing function
export async function processDocument(documentId) {
  console.log(`Processing document: ${documentId}`);

  try {
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
    // Update document status to 'error' in Supabase if anything fails
    await supabase.from('documents').update({ status: 'error' }).eq('id', documentId);
    return { success: false, error: error.message };
  }
}
