# E-Commerce Admin Setup Guide

## Overview
This e-commerce platform uses MongoDB for product storage and Cloudinary for image hosting.

## Features
- ✅ Admin panel for product management
- ✅ Multiple image upload to Cloudinary
- ✅ Browse existing Cloudinary images
- ✅ MongoDB database for product storage
- ✅ Real-time product updates on shop page

## Environment Variables
The `.env` file has been configured with:
- MongoDB connection string
- Cloudinary credentials (cloud name, API key, API secret)
- Admin password

## How to Use

### 1. Start the Development Server
```bash
cd e-commerce
npm run dev
```

### 2. Access Admin Panel
- Navigate to: `http://localhost:3000/admin`
- Login with password: `admin123`

### 3. Add Products
1. Fill in product details (name, price, description, category)
2. Choose image method:
   - **Upload New Images**: Select files from your computer and upload to Cloudinary
   - **Browse Cloudinary Images**: Select from existing images in your Cloudinary account
3. Click "Add Product" to save to MongoDB
4. Products will automatically appear on the shop page

### 4. View Products
- Shop page: `http://localhost:3000/shop`
- Products are fetched from MongoDB in real-time

## API Endpoints

### Products
- `GET /api/products` - Fetch all products with pagination
- `POST /api/products` - Create new product
- `DELETE /api/products?id={id}` - Delete product

### Cloudinary Upload
- `POST /api/upload/cloudinary` - Upload image to Cloudinary

### Database Test
- `GET /api/test-db` - Test MongoDB connection

## Database Structure

### Product Schema
```typescript
{
  name: string
  price: number
  originalPrice?: number
  description: string
  category: string
  image: string (main image URL)
  images: string[] (all image URLs)
  colors: string[]
  features: string[]
  dimensions: string
  material: string
  care: string
  inStock: boolean
  stockCount: number
  rating: number
  reviews: number
  isNewProduct: boolean
  onSale: boolean
  brand: string
  createdAt: Date
  updatedAt: Date
}
```

## Troubleshooting

### MongoDB Connection Issues
- Verify MONGODB_URI in `.env` file
- Check network connectivity
- Test connection: `http://localhost:3000/api/test-db`

### Cloudinary Upload Issues
- Verify Cloudinary credentials in `.env`
- Check file size (max 5MB)
- Ensure file type is supported (JPEG, PNG, WebP, GIF)

### Products Not Showing
- Refresh the shop page
- Check browser console for errors
- Verify products exist in MongoDB

## Tech Stack
- **Frontend**: Next.js 15, React 18, TypeScript
- **Database**: MongoDB with Mongoose
- **Image Storage**: Cloudinary
- **UI**: Tailwind CSS, Radix UI, shadcn/ui
- **Forms**: React Hook Form
- **Notifications**: Sonner
