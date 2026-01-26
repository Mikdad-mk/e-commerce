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
  images?: string[];
  colors?: string[];
  isNewProduct?: boolean;
  onSale?: boolean;
  description: string;
  features?: string[];
  dimensions?: string;
  material?: string;
  care?: string;
  inStock: boolean;
  stockCount?: number;
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
      selectedColor: product.colors && product.colors.length > 0 ? product.colors[selectedColor] : undefined
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
    const maxStock = product.stockCount || 99; // Default to 99 if stockCount is undefined
    if (quantity < maxStock) {
      setQuantity(quantity + 1);
    }
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  return (
    <div className="container py-6 sm:py-8">
      {/* Breadcrumb */}
      <nav className="flex items-center space-x-2 text-sm text-muted-foreground mb-6 sm:mb-8 overflow-x-auto">
        <a href="/" className="hover:text-foreground whitespace-nowrap">Home</a>
        <span>/</span>
        <a href="/" className="hover:text-foreground whitespace-nowrap">Products</a>
        <span>/</span>
        <span className="text-foreground truncate">{product.name}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12">
        {/* Product Images */}
        <div className="space-y-4">
          <div className="aspect-square overflow-hidden rounded-lg bg-secondary/50">
            <img
              src={(product.images && product.images[selectedImage]) || product.image}
              alt={product.name}
              className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
              loading="lazy"
            />
          </div>
          
          {/* Image Thumbnails */}
          {product.images && product.images.length > 1 && (
            <div className="flex space-x-2 overflow-x-auto pb-2">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={cn(
                    "aspect-square w-16 sm:w-20 flex-shrink-0 overflow-hidden rounded-md border-2 transition-colors",
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
          )}
        </div>

        {/* Product Info */}
        <div className="space-y-4 sm:space-y-6">
          {/* Title and Badges */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              {product.isNewProduct && (
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
            <h1 className="text-2xl sm:text-3xl font-bold">{product.name}</h1>
            
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
          <div className="flex flex-col sm:flex-row sm:items-center space-y-1 sm:space-y-0 sm:space-x-2">
            <span className={cn(
              "text-2xl sm:text-3xl font-bold",
              product.onSale ? "text-sale" : "text-foreground"
            )}>
              ${product.price.toFixed(2)}
            </span>
            {product.originalPrice && (
              <span className="text-lg sm:text-xl text-muted-foreground line-through">
                ${product.originalPrice.toFixed(2)}
              </span>
            )}
          </div>

          {/* Description */}
          <p className="text-muted-foreground leading-relaxed">
            {product.description}
          </p>

          {/* Color Selection */}
          {product.colors && product.colors.length > 0 && (
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
          )}

          {/* Quantity and Add to Cart */}
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center space-y-3 sm:space-y-0 sm:space-x-4">
              <div className="flex items-center border rounded-md w-fit">
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
                  disabled={quantity >= (product.stockCount || 99)}
                  className="h-10 w-10"
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              
              <div className="text-sm text-muted-foreground">
                {product.stockCount || 'In stock'}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3">
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
                  "px-4 sm:px-6",
                  isWishlisted && "bg-red-50 border-red-200 text-red-600"
                )}
              >
                <Heart className={cn("h-4 w-4", isWishlisted && "fill-current")} />
                <span className="ml-2 sm:hidden">Wishlist</span>
              </Button>
            </div>
          </div>

          {/* Features */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 py-6 border-t border-b">
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
      <div className="mt-12 sm:mt-16">
        <Tabs defaultValue="details" className="w-full">
          <TabsList className="grid w-full grid-cols-3 h-auto">
            <TabsTrigger value="details" className="text-xs sm:text-sm">Details</TabsTrigger>
            <TabsTrigger value="features" className="text-xs sm:text-sm">Features</TabsTrigger>
            <TabsTrigger value="care" className="text-xs sm:text-sm">Care Instructions</TabsTrigger>
          </TabsList>
          
          <TabsContent value="details" className="mt-6 space-y-4">
            <div className="prose max-w-none">
              <h3 className="text-lg font-semibold mb-4">Product Details</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <div>
                  <h4 className="font-medium mb-2">Dimensions</h4>
                  <p className="text-muted-foreground">{product.dimensions || 'Standard size'}</p>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Material</h4>
                  <p className="text-muted-foreground">{product.material || 'High quality materials'}</p>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="features" className="mt-6">
            <h3 className="text-lg font-semibold mb-4">Key Features</h3>
            {product.features && product.features.length > 0 ? (
              <ul className="space-y-2">
                {product.features.map((feature, index) => (
                  <li key={index} className="flex items-start space-x-2">
                    <span className="text-primary mt-1">•</span>
                    <span className="text-muted-foreground">{feature}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-muted-foreground">No specific features listed for this product.</p>
            )}
          </TabsContent>
          
          <TabsContent value="care" className="mt-6">
            <h3 className="text-lg font-semibold mb-4">Care Instructions</h3>
            <p className="text-muted-foreground leading-relaxed">{product.care || 'Follow standard care instructions for this type of product.'}</p>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};