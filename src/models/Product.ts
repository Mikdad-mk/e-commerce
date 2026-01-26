import mongoose, { Schema, Document } from 'mongoose';

export interface IProduct extends Document {
  name: string;
  price: number;
  originalPrice?: number;
  description: string;
  category: string;
  image: string;
  images: string[];
  colors: string[];
  features: string[];
  dimensions: string;
  material: string;
  care: string;
  inStock: boolean;
  stockCount: number;
  rating: number;
  reviews: number;
  isNew: boolean;
  onSale: boolean;
  brand: string;
  createdAt: Date;
  updatedAt: Date;
}

const ProductSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true },
    originalPrice: { type: Number },
    description: { type: String, required: true },
    category: { type: String, required: true, default: 'Home Essentials' },
    image: { type: String, required: true },
    images: { type: [String], required: true },
    colors: { type: [String], default: ['#000000'] },
    features: { type: [String], default: [] },
    dimensions: { type: String, default: 'Standard size' },
    material: { type: String, default: 'High quality materials' },
    care: { type: String, default: 'Follow standard care instructions' },
    inStock: { type: Boolean, default: true },
    stockCount: { type: Number, default: 10 },
    rating: { type: Number, default: 4.5 },
    reviews: { type: Number, default: 0 },
    isNew: { type: Boolean, default: true },
    onSale: { type: Boolean, default: false },
    brand: { type: String, default: 'Avenzo' },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Product || mongoose.model<IProduct>('Product', ProductSchema);
