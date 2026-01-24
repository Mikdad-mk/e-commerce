import { NextRequest, NextResponse } from 'next/server';
import { fallbackProducts, Product } from '@/lib/api';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    
    // Find product in fallback data
    const product = fallbackProducts.find(p => p.id === id);
    
    if (product) {
      return NextResponse.json(product);
    }
    
    // If not found in fallback data, it might be a user-created product
    // These are stored in localStorage on the client side
    // Return a special response indicating client-side lookup is needed
    if (id.startsWith('prod_')) {
      return NextResponse.json(
        { 
          error: 'Product requires client-side lookup',
          requiresClientLookup: true,
          productId: id
        },
        { status: 404 }
      );
    }
    
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