"use client";

import { useState, useEffect } from "react";
import { Product } from "@/lib/api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export const ProductDebug = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [localStorageProducts, setLocalStorageProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Handle client-side hydration
  useEffect(() => {
    setMounted(true);
  }, []);

  const loadProducts = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/products?limit=20');
      const data = await response.json();
      
      if (response.ok) {
        setProducts(data.products || []);
      }
      
      // Also check localStorage directly (client-side only)
      if (typeof window !== 'undefined') {
        const stored = localStorage.getItem('avenzo_products');
        if (stored) {
          setLocalStorageProducts(JSON.parse(stored));
        }
      }
    } catch (error) {
      console.error('Error loading products:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (mounted) {
      loadProducts();
    }
  }, [mounted]);

  const clearLocalStorage = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('avenzo_products');
      setLocalStorageProducts([]);
      loadProducts();
    }
  };

  return (
    <div className="container py-8">
      <Card>
        <CardHeader>
          <CardTitle>Product Debug Information</CardTitle>
          <div className="flex gap-2">
            <Button onClick={loadProducts} disabled={loading}>
              {loading ? 'Loading...' : 'Refresh'}
            </Button>
            <Button onClick={clearLocalStorage} variant="destructive">
              Clear LocalStorage
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <h3 className="font-semibold mb-2">Products from MongoDB API ({products.length})</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {products.map((product) => (
                <div key={product.id} className="border p-3 rounded">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-32 object-cover rounded mb-2"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = '/placeholder.svg';
                    }}
                  />
                  <p className="font-medium">{product.name}</p>
                  <p className="text-sm text-muted-foreground">${product.price}</p>
                  <p className="text-xs text-muted-foreground">ID: {product.id}</p>
                  <p className="text-xs text-muted-foreground">
                    Images: {product.images?.length || 1}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-2">LocalStorage Products (Legacy - {localStorageProducts.length})</h3>
            <p className="text-sm text-muted-foreground mb-2">
              Note: Products are now stored in MongoDB. LocalStorage is no longer used.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {localStorageProducts.map((product) => (
                <div key={product.id} className="border p-3 rounded bg-yellow-50">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-32 object-cover rounded mb-2"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = '/placeholder.svg';
                    }}
                  />
                  <p className="font-medium">{product.name}</p>
                  <p className="text-sm text-muted-foreground">${product.price}</p>
                  <p className="text-xs text-muted-foreground">ID: {product.id}</p>
                  <p className="text-xs text-muted-foreground">
                    Images: {product.images?.length || 1}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-2">Raw LocalStorage Data</h3>
            <pre className="bg-gray-100 p-4 rounded text-xs overflow-auto max-h-40">
              {!mounted ? 'Loading...' : (typeof window !== 'undefined' ? (localStorage.getItem('avenzo_products') || 'No data') : 'Not available')}
            </pre>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};