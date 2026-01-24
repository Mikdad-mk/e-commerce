import { NextRequest, NextResponse } from 'next/server';
import { getProductsWithFallback, Product } from '@/lib/api';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    
    const params = {
      page: searchParams.get('page') ? parseInt(searchParams.get('page')!) : undefined,
      limit: searchParams.get('limit') ? parseInt(searchParams.get('limit')!) : undefined,
      category: searchParams.get('category') || undefined,
      search: searchParams.get('search') || undefined,
    };

    const result = await getProductsWithFallback(params);
    
    return NextResponse.json(result);
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch products' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const productData = await request.json();
    
    // Validate required fields
    if (!productData.name || !productData.price || !productData.description) {
      return NextResponse.json(
        { error: 'Missing required fields: name, price, description' },
        { status: 400 }
      );
    }

    // Generate unique ID for the product
    const productId = `prod_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    // Create complete product object
    const newProduct: Product = {
      id: productId,
      name: productData.name,
      price: parseFloat(productData.price),
      originalPrice: productData.originalPrice ? parseFloat(productData.originalPrice) : undefined,
      image: productData.image || productData.images?.[0] || '/placeholder.svg',
      images: productData.images || [productData.image || '/placeholder.svg'],
      colors: productData.colors || ['#000000'],
      isNew: productData.isNew || true,
      onSale: productData.onSale || false,
      description: productData.description,
      features: productData.features || [],
      dimensions: productData.dimensions || 'Standard size',
      material: productData.material || 'High quality materials',
      care: productData.care || 'Follow care instructions',
      inStock: productData.inStock !== false,
      stockCount: productData.stockCount || 10,
      category: productData.category || 'General',
      brand: 'Avenzo',
      rating: 4.5,
      reviews: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    // In a real application, you would save this to a database
    // For now, we'll store it in localStorage on the client side
    // or you could implement a simple file-based storage system
    
    // Store in browser localStorage (this is a demo implementation)
    // In production, you'd save to a database
    console.log('New product created:', newProduct);
    
    // For demo purposes, we'll just return success
    // The product will be stored client-side via localStorage
    return NextResponse.json({
      success: true,
      product: newProduct,
      message: 'Product created successfully'
    }, { status: 201 });
    
  } catch (error) {
    console.error('Product creation error:', error);
    return NextResponse.json(
      { error: 'Failed to create product' },
      { status: 500 }
    );
  }
}