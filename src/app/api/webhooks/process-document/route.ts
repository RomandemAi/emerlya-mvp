import { NextRequest, NextResponse } from 'next/server';
import { processDocument } from '../../../lib/document-processor.js';

export async function POST(request: NextRequest) {
  try {
    // Security: Check for Authorization header
    const authHeader = request.headers.get('authorization');
    const expectedAuth = `Bearer ${process.env.WEBHOOK_SECRET}`;
    
    if (!authHeader || authHeader !== expectedAuth) {
      console.error('Unauthorized webhook request - invalid or missing Authorization header');
      return NextResponse.json(
        { error: 'Unauthorized' }, 
        { status: 401 }
      );
    }

    // Parse the incoming JSON body
    const body = await request.json();
    
    // Extract the document ID from body.record.id
    const documentId = body?.record?.id;
    
    if (!documentId) {
      console.error('Invalid webhook payload - missing record.id');
      return NextResponse.json(
        { error: 'Invalid payload - missing record.id' }, 
        { status: 400 }
      );
    }

    console.log(`Webhook received for document: ${documentId}`);

    // Fire-and-forget call to processDocument (no await)
    processDocument(documentId).catch((error) => {
      console.error(`Background processing failed for document ${documentId}:`, error);
    });

    // Immediately return 200 to acknowledge receipt
    return NextResponse.json(
      { 
        success: true, 
        message: 'Webhook received and processing started',
        documentId 
      }, 
      { status: 200 }
    );

  } catch (error) {
    console.error('Webhook processing error:', error);
    return NextResponse.json(
      { 
        error: 'Internal server error',
        message: error instanceof Error ? error.message : 'Unknown error'
      }, 
      { status: 500 }
    );
  }
}

// Only allow POST requests
export async function GET() {
  return NextResponse.json(
    { error: 'Method not allowed' }, 
    { status: 405 }
  );
}
