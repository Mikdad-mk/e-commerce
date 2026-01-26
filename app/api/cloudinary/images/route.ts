import { NextRequest, NextResponse } from 'next/server';
import { v2 as cloudinary } from 'cloudinary';

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const folder = searchParams.get('folder') || '';
    const maxResults = parseInt(searchParams.get('max_results') || '50');
    const nextCursor = searchParams.get('next_cursor') || undefined;

    // Build search query
    let searchQuery = cloudinary.search
      .expression(folder ? `folder:${folder}` : 'resource_type:image')
      .sort_by('created_at', 'desc')
      .max_results(maxResults);

    // Add next_cursor if provided
    if (nextCursor) {
      searchQuery = searchQuery.next_cursor(nextCursor);
    }

    // Execute search
    const result = await searchQuery.execute();

    // Transform the results to include useful information
    const images = result.resources.map((resource: any) => ({
      public_id: resource.public_id,
      secure_url: resource.secure_url,
      url: resource.url,
      format: resource.format,
      width: resource.width,
      height: resource.height,
      bytes: resource.bytes,
      created_at: resource.created_at,
      folder: resource.folder || '',
      filename: resource.filename || resource.public_id.split('/').pop(),
      // Generate different sizes
      thumbnail: cloudinary.url(resource.public_id, {
        width: 150,
        height: 150,
        crop: 'fill',
        quality: 'auto',
        format: 'auto'
      }),
      medium: cloudinary.url(resource.public_id, {
        width: 400,
        height: 400,
        crop: 'fill',
        quality: 'auto',
        format: 'auto'
      })
    }));

    return NextResponse.json({
      success: true,
      images,
      next_cursor: result.next_cursor,
      total_count: result.total_count
    });

  } catch (error) {
    console.error('Error fetching Cloudinary images:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to fetch images from Cloudinary',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}