import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Product from '@/models/Product';

export async function GET() {
  try {
    await connectDB();
    
    // Get total product count
    const totalProducts = await Product.countDocuments();
    
    // Get all products to calculate image statistics
    const products = await Product.find({}, 'images').lean();
    
    // Calculate total images
    const totalImages = products.reduce((sum, product) => {
      return sum + (product.images?.length || 0);
    }, 0);
    
    // Calculate average images per product
    const avgImagesPerProduct = totalProducts > 0 
      ? (totalImages / totalProducts).toFixed(2) 
      : '0';

    return NextResponse.json({
      success: true,
      stats: {
        totalProducts,
        totalImages,
        avgImagesPerProduct: parseFloat(avgImagesPerProduct),
      },
    });
  } catch (error) {
    console.error('Stats API Error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch statistics' },
      { status: 500 }
    );
  }
}
