import { NextRequest, NextResponse } from 'next/server';
import { revalidateTag, revalidatePath } from 'next/cache';

// Webhook secret for security (set this in your environment variables)
const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET || 'your-webhook-secret';

export async function POST(request: NextRequest) {
  try {
    // Verify webhook secret
    const authHeader = request.headers.get('authorization');
    const providedSecret = authHeader?.replace('Bearer ', '');
    
    if (providedSecret !== WEBHOOK_SECRET) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { action, productId, data } = body;

    console.log('Webhook received:', { action, productId });

    // Handle different webhook actions
    switch (action) {
      case 'product.created':
      case 'product.updated':
      case 'product.deleted':
        // Revalidate the products cache
        revalidateTag('products');
        revalidatePath('/');
        revalidatePath('/api/products');
        
        if (productId) {
          revalidatePath(`/product/${productId}`);
          revalidatePath(`/api/products/${productId}`);
        }
        break;
        
      case 'products.bulk_update':
        // Revalidate all product-related caches
        revalidateTag('products');
        revalidatePath('/');
        revalidatePath('/api/products');
        break;
        
      default:
        console.warn('Unknown webhook action:', action);
    }

    return NextResponse.json({ 
      success: true, 
      message: 'Webhook processed successfully' 
    });
    
  } catch (error) {
    console.error('Webhook error:', error);
    return NextResponse.json(
      { error: 'Webhook processing failed' },
      { status: 500 }
    );
  }
}

// Handle GET requests for webhook verification (optional)
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const challenge = searchParams.get('challenge');
  
  if (challenge) {
    return new Response(challenge);
  }
  
  return NextResponse.json({ 
    message: 'Product webhook endpoint is active',
    timestamp: new Date().toISOString()
  });
}