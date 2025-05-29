// app/api/revalidate/route.ts
import { revalidateTag } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const secret = request.nextUrl.searchParams.get('secret');

    if (secret !== process.env.REVALIDATE_SECRET) {
      return NextResponse.json({ message: 'Invalid secret' }, { status: 401 });
    }

    const body = await request.json();
    const documentType = body._type;
    const slug = body.slug?.current; // assuming slug is in body.slug.current

    // Revalidate by type or slug
    if (documentType === 'project') {
      if (slug) {
        await revalidateTag(`project-${slug}`);
        console.log(`Revalidated tag: project-${slug}`);
      } else {
        await revalidateTag('projects');
        console.log('Revalidated tag: projects');
      }
    } else if (documentType === 'page') {
      if (slug) {
        await revalidateTag(`page-${slug}`);
        console.log(`Revalidated tag: page-${slug}`);
      } else {
        await revalidateTag('pages');
        console.log('Revalidated tag: pages');
      }
    } else {
      console.log('Unknown document type. No tags revalidated.');
    }

    return NextResponse.json({ message: 'Revalidation successful', revalidated: true, now: Date.now() });

  } catch (error) {
    console.error('Error revalidating:', error);
    return NextResponse.json({
      message: 'Error revalidating',
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}
