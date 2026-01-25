"use client";

import { useState } from "react";
import { Heart, Minus, Plus, ShoppingCart, Star, Truck, Shield, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { useCart } from "@/hooks/use-cart";
import { useWishlist } from "@/hooks/use-wishlist";
import { toast } from "sonner";

interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  images: string[];
  colors: string[];
  isNew?: boolean;
  onSale?: boolean;
  description: string;
  features: string[];
  dimensions: string;
  material: string;
  care: string;
  inStock: boolean;
  stockCount: number;
}

interface ProductDetailProps {
  product: Product;
}

export const ProductDetail = ({ product }: ProductDetailProps) => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);
  
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist } = useWishlist();

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: quantity,
      selectedColor: product.colors[selectedColor]
    });
    toast.success(`${product.name} added to cart!`);
  };

  const handleWishlistToggle = () => {
    if (isWishlisted) {
      removeFromWishlist(product.id);
      setIsWishlisted(false);
      toast.success("Removed from wishlist");
    } else {
      addToWishlist({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image
      });
      setIsWishlisted(true);
      toast.success("Added to wishlist");
    }
  };

  const incrementQuantity = () => {
    if (quantity < product.stockCount) {
      setQuantity(quantity + 1);
    }
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  return (
    <div className="container py-8">
      {/* Breadcrumb */}
      <nav className="flex items-center space-x-2 text-sm text-muted-foreground mb-8">
        <a href="/" className="hover:text-foreground">Home</a>
        <span>/</span>
        <a href="/" className="hover:text-foreground">Products</a>
        <span>/</span>
        <span className="text-foreground">{product.name}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
        {/* Product Images */}
        <div className="space-y-4">
          <div className="aspect-square overflow-hidden rounded-lg bg-secondary/50">
            <img
              src={product.images[selectedImage]}
              alt={product.name}
              className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
              loading="lazy"
            />
          </div>
          
          {/* Image Thumbnails */}
          <div className="flex space-x-2">
            {product.images.map((image, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={cn(
                  "aspect-square w-20 overflow-hidden rounded-md border-2 transition-colors",
                  selectedImage === index ? "border-primary" : "border-transparent"
                )}
              >
                <img
                  src={image}
                  alt={`${product.name} ${index + 1}`}
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          {/* Title and Badges */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              {product.isNew && (
                <Badge variant="secondary" className="bg-badge-new text-primary-foreground">
                  New
                </Badge>
              )}
              {product.onSale && (
                <Badge variant="destructive" className="bg-badge-sale">
                  Sale
                </Badge>
              )}
            </div>
            <h1 className="text-3xl font-bold">{product.name}</h1>
            
            {/* Rating */}
            <div className="flex items-center space-x-2">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={cn(
                      "h-4 w-4",
                      i < 4 ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground"
                    )}
                  />
                ))}
              </div>
              <span className="text-sm text-muted-foreground">(24 reviews)</span>
            </div>
          </div>

          {/* Price */}
          <div className="flex items-center space-x-2">
            <span className={cn(
              "text-3xl font-bold",
              product.onSale ? "text-sale" : "text-foreground"
            )}>
              ${product.price.toFixed(2)}
            </span>
            {product.originalPrice && (
              <span className="text-xl text-muted-foreground line-through">
                ${product.originalPrice.toFixed(2)}
              </span>
            )}
          </div>

          {/* Description */}
          <p className="text-muted-foreground leading-relaxed">
            {product.description}
          </p>

          {/* Color Selection */}
          <div className="space-y-3">
            <h3 className="text-sm font-medium">Color</h3>
            <div className="flex items-center space-x-2">
              {product.colors.map((color, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedColor(index)}
                  className={cn(
                    "h-8 w-8 rounded-full border-2 transition-all",
                    selectedColor === index 
                      ? "border-foreground scale-110" 
                      : "border-border hover:scale-105"
                  )}
                  style={{ backgroundColor: color }}
                  aria-label={`Color option ${index + 1}`}
                />
              ))}
            </div>
          </div>

          {/* Quantity and Add to Cart */}
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <div className="flex items-center border rounded-md">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={decrementQuantity}
                  disabled={quantity <= 1}
                  className="h-10 w-10"
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="w-12 text-center font-medium">{quantity}</span>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={incrementQuantity}
                  disabled={quantity >= product.stockCount}
                  className="h-10 w-10"
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              
              <div className="text-sm text-muted-foreground">
                {product.stockCount} in stock
              </div>
            </div>

            <div className="flex space-x-3">
              <Button 
                onClick={handleAddToCart}
                disabled={!product.inStock}
                className="flex-1"
                size="lg"
              >
                <ShoppingCart className="mr-2 h-4 w-4" />
                Add to Cart
              </Button>
              
              <Button
                variant="outline"
                size="lg"
                onClick={handleWishlistToggle}
                className={cn(
                  "px-4",
                  isWishlisted && "bg-red-50 border-red-200 text-red-600"
                )}
              >
                <Heart className={cn("h-4 w-4", isWishlisted && "fill-current")} />
              </Button>
            </div>
          </div>

          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 py-6 border-t border-b">
            <div className="flex items-center space-x-2">
              <Truck className="h-5 w-5 text-primary" />
              <span className="text-sm">Free Shipping</span>
            </div>
            <div className="flex items-center space-x-2">
              <Shield className="h-5 w-5 text-primary" />
              <span className="text-sm">Quality Assured</span>
            </div>
            <div className="flex items-center space-x-2">
              <RotateCcw className="h-5 w-5 text-primary" />
              <span className="text-sm">Easy Returns</span>
            </div>
          </div>
        </div>
      </div>

      {/* Product Details Tabs */}
      <div className="mt-16">
        <Tabs defaultValue="details" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="details">Details</TabsTrigger>
            <TabsTrigger value="features">Features</TabsTrigger>
            <TabsTrigger value="care">Care Instructions</TabsTrigger>
          </TabsList>
          
          <TabsContent value="details" className="mt-6 space-y-4">
            <div className="prose max-w-none">
              <h3 className="text-lg font-semibold mb-4">Product Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium mb-2">Dimensions</h4>
                  <p className="text-muted-foreground">{product.dimensions}</p>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Material</h4>
                  <p className="text-muted-foreground">{product.material}</p>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="features" className="mt-6">
            <h3 className="text-lg font-semibold mb-4">Key Features</h3>
            <ul className="space-y-2">
              {product.features.map((feature, index) => (
                <li key={index} className="flex items-start space-x-2">
                  <span className="text-primary mt-1">•</span>
                  <span className="text-muted-foreground">{feature}</span>
                </li>
              ))}
            </ul>
          </TabsContent>
          
          <TabsContent value="care" className="mt-6">
            <h3 className="text-lg font-semibold mb-4">Care Instructions</h3>
            <p className="text-muted-foreground leading-relaxed">{product.care}</p>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};