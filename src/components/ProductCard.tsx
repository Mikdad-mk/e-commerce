"use client";

import { Heart } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  image: string;
  colors?: string[];
  isNewProduct?: boolean;
  onSale?: boolean;
  originalPrice?: number;
}

export const ProductCard = ({
  id,
  name,
  price,
  image,
  colors,
  isNewProduct,
  onSale,
  originalPrice,
}: ProductCardProps) => {
  return (
    <article className="product-card group animate-fade-in" style={{ animationDelay: "0.1s" }}>
      <Link href={`/product/${id}`}>
        {/* Image Container */}
        <div className="product-image-container">
          <img
            src={image}
            alt={name}
            className="product-image"
            loading="lazy"
          />
          
          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-2">
            {isNewProduct && (
              <span className="rounded bg-badge-new px-2 py-1 text-xs font-medium text-primary-foreground">
                New
              </span>
            )}
            {onSale && (
              <span className="rounded bg-badge-sale px-2 py-1 text-xs font-medium text-primary-foreground">
                Sale
              </span>
            )}
          </div>

          {/* Wishlist Button */}
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-3 right-3 h-8 w-8 rounded-full bg-background/80 opacity-0 transition-opacity duration-300 hover:bg-background group-hover:opacity-100"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              // Handle wishlist toggle
            }}
          >
            <Heart className="h-4 w-4" />
          </Button>

          {/* Quick Add */}
          <div className="absolute bottom-0 left-0 right-0 translate-y-full transition-transform duration-300 group-hover:translate-y-0">
            <Button 
              className="w-full rounded-none rounded-b-lg bg-foreground hover:bg-foreground/90 text-background"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                // Handle quick add to cart
              }}
            >
              Quick Add
            </Button>
          </div>
        </div>
      </Link>

      {/* Product Info */}
      <Link href={`/product/${id}`}>
        <div className="p-4 space-y-2">
          <h3 className="text-sm font-medium text-foreground line-clamp-1 hover:text-primary transition-colors">
            {name}
          </h3>
          
          <div className="flex items-center gap-2">
            <span className={cn(
              "text-sm font-semibold",
              onSale ? "text-sale" : "text-foreground"
            )}>
              ${price.toFixed(2)}
            </span>
            {onSale && originalPrice && (
              <span className="text-sm text-muted-foreground line-through">
                ${originalPrice.toFixed(2)}
              </span>
            )}
          </div>

          {/* Color Options */}
          {colors && colors.length > 0 && (
            <div className="flex items-center gap-1.5 pt-1">
              {colors.slice(0, 4).map((color, index) => (
                <button
                  key={index}
                  className="color-dot"
                  style={{ backgroundColor: color }}
                  aria-label={`Color option ${index + 1}`}
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    // Handle color selection
                  }}
                />
              ))}
              {colors.length > 4 && (
                <span className="text-xs text-muted-foreground">+{colors.length - 4}</span>
              )}
            </div>
          )}
        </div>
      </Link>
    </article>
  );
};
