"use client";

import { useState, useEffect } from "react";
import { ProductCard } from "./ProductCard";
import { getProductsWithFallback, Product } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import Link from "next/link";

export const FeaturedProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchFeaturedProducts = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await getProductsWithFallback({
        page: 1,
        limit: 4, // Show only 4 featured products
      });

      setProducts(response.products);
    } catch (err) {
      setError('Failed to load featured products.');
      console.error('Error fetching featured products:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFeaturedProducts();
  }, []);

  if (loading) {
    return (
      <section className="py-16 bg-background">
        <div className="container">
          <div className="flex items-center justify-center min-h-[200px]">
            <div className="text-center space-y-4">
              <Loader2 className="h-8 w-8 animate-spin mx-auto text-primary" />
              <p className="text-muted-foreground">Loading featured products...</p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (error || products.length === 0) {
    return null; // Don't show the section if there are no products
  }

  return (
    <section className="py-16 bg-background">
      <div className="container">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Featured Products
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Discover our handpicked selection of premium home essentials, 
            carefully curated to enhance your living space
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-12">
          {products.map((product) => (
            <div key={product.id} className="group">
              <ProductCard {...product} />
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center">
          <Link href="/shop">
            <Button 
              size="lg" 
              variant="outline"
              className="px-8 py-3 border-2 hover:bg-foreground hover:text-background transition-colors"
            >
              View All Products
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};