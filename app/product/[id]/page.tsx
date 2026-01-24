"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { notFound } from "next/navigation";
import { ProductDetail } from "@/components/ProductDetail";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { getProductByIdWithFallback, Product } from "@/lib/api";
import { Loader2 } from "lucide-react";

export default function ProductPage() {
  const params = useParams();
  const id = params.id as string;
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFoundError, setNotFoundError] = useState(false);

  useEffect(() => {
    async function fetchProduct() {
      try {
        setLoading(true);
        const productData = await getProductByIdWithFallback(id);
        
        if (!productData) {
          // If it's a user-created product ID but not found, show helpful message
          if (id.startsWith('prod_')) {
            console.warn(`User-created product ${id} not found in localStorage. It may have been deleted or created on a different device.`);
          }
          setNotFoundError(true);
        } else {
          setProduct(productData);
        }
      } catch (error) {
        console.error('Error fetching product:', error);
        setNotFoundError(true);
      } finally {
        setLoading(false);
      }
    }

    if (id) {
      fetchProduct();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center space-y-4">
            <Loader2 className="h-8 w-8 animate-spin mx-auto text-primary" />
            <p className="text-muted-foreground">Loading product...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (notFoundError || !product) {
    notFound();
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1">
        <ProductDetail product={product} />
      </main>
      <Footer />
    </div>
  );
}