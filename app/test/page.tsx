"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

export default function TestPage() {
  const [testResults, setTestResults] = useState<string[]>([]);
  const [uploading, setUploading] = useState(false);

  const addResult = (result: string) => {
    setTestResults(prev => [...prev, `${new Date().toLocaleTimeString()}: ${result}`]);
  };

  const testCloudinaryUpload = async () => {
    setUploading(true);
    addResult("Starting Cloudinary upload test...");

    try {
      // Create a simple test image (1x1 pixel PNG)
      const canvas = document.createElement('canvas');
      canvas.width = 1;
      canvas.height = 1;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.fillStyle = '#FF0000';
        ctx.fillRect(0, 0, 1, 1);
      }

      canvas.toBlob(async (blob) => {
        if (!blob) {
          addResult("❌ Failed to create test image");
          setUploading(false);
          return;
        }

        const file = new File([blob], 'test.png', { type: 'image/png' });
        addResult(`✅ Created test image: ${file.name} (${file.size} bytes)`);

        const formData = new FormData();
        formData.append('file', file);

        try {
          const response = await fetch('/api/upload/cloudinary', {
            method: 'POST',
            body: formData,
          });

          const result = await response.json();
          
          if (result.success) {
            addResult(`✅ Cloudinary upload successful: ${result.imageUrl}`);
          } else {
            addResult(`❌ Cloudinary upload failed: ${result.error}`);
          }
        } catch (error) {
          addResult(`❌ Upload request failed: ${error}`);
        }
        
        setUploading(false);
      }, 'image/png');
    } catch (error) {
      addResult(`❌ Test setup failed: ${error}`);
      setUploading(false);
    }
  };

  const testLocalStorage = () => {
    addResult("Testing localStorage...");
    
    try {
      // Test write
      const testData = { test: true, timestamp: Date.now() };
      localStorage.setItem('test_item', JSON.stringify(testData));
      addResult("✅ localStorage write successful");

      // Test read
      const retrieved = localStorage.getItem('test_item');
      if (retrieved) {
        const parsed = JSON.parse(retrieved);
        addResult(`✅ localStorage read successful: ${JSON.stringify(parsed)}`);
      } else {
        addResult("❌ localStorage read failed");
      }

      // Check existing products
      const products = localStorage.getItem('avenzo_products');
      if (products) {
        const parsed = JSON.parse(products);
        addResult(`✅ Found ${parsed.length} existing products in localStorage`);
      } else {
        addResult("ℹ️ No existing products in localStorage");
      }

      // Cleanup
      localStorage.removeItem('test_item');
    } catch (error) {
      addResult(`❌ localStorage test failed: ${error}`);
    }
  };

  const addTestProduct = () => {
    addResult("Adding test product...");
    
    try {
      const testProduct = {
        id: Date.now().toString(),
        name: "Test Product " + Date.now(),
        price: 29.99,
        image: "https://via.placeholder.com/300x300/FF0000/FFFFFF?text=TEST",
        images: ["https://via.placeholder.com/300x300/FF0000/FFFFFF?text=TEST"],
        description: "This is a test product created for debugging",
        category: "Test",
        inStock: true,
        rating: 4.5,
        reviews: 10
      };

      const existingProducts = JSON.parse(localStorage.getItem('avenzo_products') || '[]');
      const updatedProducts = [...existingProducts, testProduct];
      localStorage.setItem('avenzo_products', JSON.stringify(updatedProducts));

      addResult(`✅ Test product added. Total products: ${updatedProducts.length}`);
      
      // Dispatch event
      window.dispatchEvent(new CustomEvent('productsUpdated'));
      addResult("✅ Products updated event dispatched");
      
      toast.success("Test product added!");
    } catch (error) {
      addResult(`❌ Failed to add test product: ${error}`);
    }
  };

  const clearProducts = () => {
    localStorage.removeItem('avenzo_products');
    addResult("✅ All products cleared from localStorage");
    window.dispatchEvent(new CustomEvent('productsUpdated'));
    toast.success("Products cleared!");
  };

  const clearResults = () => {
    setTestResults([]);
  };

  return (
    <div className="container py-8 max-w-4xl">
      <Card>
        <CardHeader>
          <CardTitle>Product System Test Page</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button onClick={testCloudinaryUpload} disabled={uploading}>
              {uploading ? "Uploading..." : "Test Cloudinary"}
            </Button>
            <Button onClick={testLocalStorage}>
              Test LocalStorage
            </Button>
            <Button onClick={addTestProduct}>
              Add Test Product
            </Button>
            <Button onClick={clearProducts} variant="destructive">
              Clear Products
            </Button>
          </div>

          <div className="flex gap-2">
            <Button onClick={clearResults} variant="outline" size="sm">
              Clear Results
            </Button>
          </div>

          <div>
            <h3 className="font-semibold mb-2">Test Results:</h3>
            <div className="bg-gray-100 p-4 rounded max-h-96 overflow-y-auto">
              {testResults.length === 0 ? (
                <p className="text-muted-foreground">No test results yet. Click a test button above.</p>
              ) : (
                <div className="space-y-1 font-mono text-sm">
                  {testResults.map((result, index) => (
                    <div key={index}>{result}</div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-2">Quick Links:</h3>
            <div className="flex gap-2">
              <Button asChild variant="outline">
                <a href="/admin" target="_blank">Admin Panel</a>
              </Button>
              <Button asChild variant="outline">
                <a href="/shop" target="_blank">Shop Page</a>
              </Button>
              <Button asChild variant="outline">
                <a href="/debug" target="_blank">Debug Page</a>
              </Button>
              <Button asChild variant="outline">
                <a href="/" target="_blank">Home Page</a>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}