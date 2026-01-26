import { NextRequest, NextResponse } from 'next/server';
import { Product } from '@/lib/api';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    
    // Only handle admin-created products (stored in localStorage)
    // These have timestamp-based IDs or start with 'prod_'
    // Return a special response indicating client-side lookup is needed
    if (id.startsWith('prod_') || /^\d+$/.test(id)) {
      return NextResponse.json(
        { 
          error: 'Product requires client-side lookup',
          requiresClientLookup: true,
          productId: id
        },
        { status: 404 }
      );
    }
    
    // No fallback products - only admin-created products with Cloudinary images
    return NextResponse.json(
      { error: 'Product not found' },
      { status: 404 }
    );
  } catch (error) {
    console.error('Product fetch error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch product' },
      { status: 500 }
    );
  }
}