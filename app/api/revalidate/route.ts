import { revalidateTag } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

// This API route will be called by Sanity webhooks to trigger revalidation
export async function POST(request: NextRequest) {
  try {
    // Get the secret from the request to verify it's coming from Sanity
    const secret = request.nextUrl.searchParams.get('secret');
    
    // Check if the secret matches what you set in your Sanity webhook
    if (secret !== process.env.REVALIDATE_SECRET) {
      return NextResponse.json({ message: 'Invalid secret' }, { status: 401 });
    }

    // Get the document type from the webhook payload
    const body = await request.json();
    const documentType = body._type;

    // Revalidate specific paths based on document type
    if (documentType === 'project') {
      // Revalidate the projects page and all project pages
      await revalidateTag('projects');
      console.log('Revalidated projects');
    } else if (documentType === 'page') {
      // Revalidate all pages
      await revalidateTag('pages');
      console.log('Revalidated pages');
    }

    return NextResponse.json({ 
      message: 'Revalidation successful',
      revalidated: true,
      now: Date.now()
    });
  } catch (error) {
    console.error('Error revalidating:', error);
    return NextResponse.json({ 
      message: 'Error revalidating',
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
} 
