import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Product from '@/models/Product';

export async function GET(request: NextRequest) {
  try {
    await connectDB();
    
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '12');
    const category = searchParams.get('category');
    const search = searchParams.get('search');

    // Build query
    const query: any = {};
    if (category && category !== 'all') {
      query.category = category;
    }
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
      ];
    }

    // Get total count
    const total = await Product.countDocuments(query);

    // Get products with pagination
    const products = await Product.find(query)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .lean();

    // Transform MongoDB _id to id
    const transformedProducts = products.map((product: any) => ({
      ...product,
      id: product._id.toString(),
      _id: undefined,
    }));

    return NextResponse.json({
      products: transformedProducts,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
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
    await connectDB();
    
    const productData = await request.json();
    
    // Validate required fields
    if (!productData.name || !productData.price || !productData.description || !productData.images || productData.images.length === 0) {
      return NextResponse.json(
        { error: 'Missing required fields: name, price, description, images' },
        { status: 400 }
      );
    }

    // Create new product
    const newProduct = new Product({
      name: productData.name,
      price: parseFloat(productData.price),
      originalPrice: productData.originalPrice ? parseFloat(productData.originalPrice) : undefined,
      description: productData.description,
      category: productData.category || 'Home Essentials',
      image: productData.images[0],
      images: productData.images,
      colors: productData.colors || ['#000000'],
      features: productData.features || [],
      dimensions: productData.dimensions || 'Standard size',
      material: productData.material || 'High quality materials',
      care: productData.care || 'Follow standard care instructions',
      inStock: productData.inStock !== false,
      stockCount: productData.stockCount || 10,
      rating: 4.5,
      reviews: 0,
      isNew: true,
      onSale: !!productData.originalPrice,
      brand: 'Avenzo',
    });

    await newProduct.save();

    return NextResponse.json({
      success: true,
      product: {
        ...newProduct.toObject(),
        id: newProduct._id.toString(),
      },
      message: 'Product created successfully',
    }, { status: 201 });
    
  } catch (error) {
    console.error('Product creation error:', error);
    return NextResponse.json(
      { error: 'Failed to create product' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    await connectDB();
    
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { error: 'Product ID is required' },
        { status: 400 }
      );
    }

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