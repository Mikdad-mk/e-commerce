import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Product from '@/models/Product';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();
    
    const { id } = await params;
    const product = await Product.findById(id).lean();

    if (!product) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      );
    }

    // Transform MongoDB _id to id
    const transformedProduct = {
      ...product,
      id: product._id.toString(),
      _id: undefined,
    };

    return NextResponse.json(transformedProduct);
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch product' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();
    
    const { id } = await params;
    const productData = await request.json();

    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      {
        $set: {
          name: productData.name,
          price: productData.price,
          originalPrice: productData.originalPrice,
          description: productData.description,
          category: productData.category,
          images: productData.images,
          image: productData.images?.[0] || productData.image,
          colors: productData.colors,
          features: productData.features,
          dimensions: productData.dimensions,
          material: productData.material,
          care: productData.care,
          inStock: productData.inStock,
          stockCount: productData.stockCount,
        },
      },
      { new: true }
    );

    if (!updatedProduct) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      product: {
        ...updatedProduct.toObject(),
        id: updatedProduct._id.toString(),
      },
      message: 'Product updated successfully',
    });
  } catch (error) {
    console.error('Product update error:', error);
    return NextResponse.json(
      { error: 'Failed to update product' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();

    const { id } = await params;
    const deletedProduct = await Product.findByIdAndDelete(id);

    if (!deletedProduct) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Product deleted successfully',
    });
  } catch (error) {
    console.error('Product deletion error:', error);
    return NextResponse.json(
      { error: 'Failed to delete product' },
      { status: 500 }
    );
  }
}
