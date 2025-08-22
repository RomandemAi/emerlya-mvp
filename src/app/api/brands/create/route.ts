import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { 
  upsertBrand, 
  addSources, 
  indexChunks, 
  saveProfile, 
  saveMemory,
  saveDrafts,
  saveSettings
} from '@/lib/brand';
import { buildStyleProfile } from '@/lib/style';
import { extractBrandFacts, generateSeedContent } from '@/lib/facts';
import { BrandSource } from '@/lib/types';

// Force Node.js runtime for Supabase compatibility
export const runtime = 'nodejs';

export async function POST(req: NextRequest) {
  try {
    const { name, sources = [], settings = {} } = await req.json();

    if (!name || typeof name !== 'string') {
      return NextResponse.json(
        { error: 'Brand name is required' },
        { status: 400 }
      );
    }

    // Get authenticated user
    const supabase = await createClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    
    if (authError || !user) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }

    // Validate sources format
    const validatedSources: BrandSource[] = sources
      .filter((source: any) => source && source.content && typeof source.content === 'string')
      .map((source: any) => ({
        content: source.content.trim(),
        type: source.type || 'text',
        title: source.title || 'Untitled'
      }))
      .filter((source: BrandSource) => source.content.length > 10); // Minimum content length

    console.log(`Creating brand "${name}" with ${validatedSources.length} sources`);

    // Step 1: Create the brand with basic info
    const brand = await upsertBrand({
      name: name.trim(),
      ownerId: user.id,
      settings
    });

    console.log(`Brand created with ID: ${brand.id}`);

    // Step 2: Add source documents if provided
    if (validatedSources.length > 0) {
      console.log('Adding sources to brand...');
      await addSources(brand.id, validatedSources);

      // Step 3: Process documents into chunks and embeddings
      console.log('Processing documents into chunks...');
      await indexChunks(brand.id);

      // Step 4: Build style profile from sources
      console.log('Building style profile...');
      const profile = await buildStyleProfile(
        validatedSources.map(s => s.content)
      );
      await saveProfile(brand.id, profile);

      console.log('Style profile created:', {
        toneCount: profile.voice.tone.length,
        themeCount: profile.content.themes.length,
        rulesCount: profile.content.brandRules.do.length + profile.content.brandRules.dont.length
      });

      // Step 5: Extract brand memory/facts
      console.log('Extracting brand facts...');
      const memory = await extractBrandFacts(profile, validatedSources);
      await saveMemory(brand.id, memory);

      console.log(`Extracted ${memory.length} brand facts`);

      // Step 6: Generate seed content
      console.log('Generating seed content...');
      const seedContent = await generateSeedContent(profile, memory);
      await saveDrafts(brand.id, seedContent);

      console.log(`Generated ${seedContent.length} seed content pieces`);

      // Step 7: Save brand settings
      if (Object.keys(settings).length > 0) {
        console.log('Saving brand settings...');
        await saveSettings(brand.id, {
          brand_id: brand.id,
          default_tone: settings.default_tone || 'on-brand',
          default_type: settings.default_type || 'post',
          region: settings.region,
          language: settings.language || 'en',
          profanity_policy: settings.profanity_policy || 'soft'
        });
      }

      return NextResponse.json({
        success: true,
        brandId: brand.id,
        message: 'Brand created successfully with full analysis',
        stats: {
          sourcesProcessed: validatedSources.length,
          factsExtracted: memory.length,
          seedContentGenerated: seedContent.length,
          profileComplete: true
        }
      });

    } else {
      // No sources provided - create brand with defaults
      console.log('No sources provided, creating brand with defaults');
      
      // Save default settings
      await saveSettings(brand.id, {
        brand_id: brand.id,
        default_tone: settings.default_tone || 'on-brand',
        default_type: settings.default_type || 'post',
        region: settings.region,
        language: settings.language || 'en',
        profanity_policy: settings.profanity_policy || 'soft'
      });

      return NextResponse.json({
        success: true,
        brandId: brand.id,
        message: 'Brand created successfully (add content to enable analysis)',
        stats: {
          sourcesProcessed: 0,
          factsExtracted: 0,
          seedContentGenerated: 0,
          profileComplete: false
        }
      });
    }

  } catch (error) {
    console.error('Error creating brand:', error);
    
    return NextResponse.json(
      { 
        error: 'Failed to create brand',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

// GET endpoint to retrieve brand creation status
export async function GET(req: NextRequest) {
  try {
    const supabase = await createClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    
    if (authError || !user) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }

    // Get user's brands with basic stats
    const { data: brands, error: brandsError } = await supabase
      .from('brands')
      .select(`
        id,
        name,
        created_at,
        persona_config_json
      `)
      .eq('profile_id', user.id)
      .order('created_at', { ascending: false });

    if (brandsError) {
      throw new Error(`Failed to fetch brands: ${brandsError.message}`);
    }

    // Get document counts for each brand
    const brandStats = await Promise.all(
      (brands || []).map(async (brand) => {
        const { count: docCount } = await supabase
          .from('documents')
          .select('*', { count: 'exact', head: true })
          .eq('brand_id', brand.id);

        const { count: memoryCount } = await supabase
          .from('brand_memory')
          .select('*', { count: 'exact', head: true })
          .eq('brand_id', brand.id);

        const { count: draftCount } = await supabase
          .from('brand_drafts')
          .select('*', { count: 'exact', head: true })
          .eq('brand_id', brand.id);

        return {
          ...brand,
          stats: {
            documents: docCount || 0,
            memoryFacts: memoryCount || 0,
            seedContent: draftCount || 0,
            hasProfile: !!brand.persona_config_json
          }
        };
      })
    );

    return NextResponse.json({
      success: true,
      brands: brandStats
    });

  } catch (error) {
    console.error('Error fetching brands:', error);
    
    return NextResponse.json(
      { 
        error: 'Failed to fetch brands',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}
