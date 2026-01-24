"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Upload, RefreshCw, X, Image as ImageIcon, Trash2, Eye } from "lucide-react";
import { uploadBase64Image, createThumbnail } from "@/lib/image-utils";
import { Product } from "@/lib/api";

export default function AdminPage() {
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [storedProducts, setStoredProducts] = useState<Product[]>([]);
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    description: "",
    image: "",
    images: [] as string[],
    category: "",
    inStock: true,
    colors: [] as string[],
    features: [] as string[],
  });

  // Load stored products on component mount
  useEffect(() => {
    loadStoredProducts();
  }, []);

  const loadStoredProducts = () => {
    try {
      const stored = JSON.parse(localStorage.getItem('avenzo_products') || '[]');
      setStoredProducts(stored);
    } catch (error) {
      console.error('Failed to load stored products:', error);
    }
  };

  const deleteProduct = (productId: string) => {
    try {
      const stored = JSON.parse(localStorage.getItem('avenzo_products') || '[]');
      const filtered = stored.filter((p: Product) => p.id !== productId);
      localStorage.setItem('avenzo_products', JSON.stringify(filtered));
      setStoredProducts(filtered);
      toast.success('Product deleted successfully!');
    } catch (error) {
      toast.error('Failed to delete product');
      console.error('Delete error:', error);
    }
  };

  const handleInputChange = (field: string, value: string | boolean | string[]) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleImageUpload = async (file: File, isMainImage: boolean = true) => {
    try {
      setUploading(true);
      
      // Upload using base64 system
      const result = await uploadBase64Image(file, true);
      
      if (isMainImage) {
        handleInputChange('image', result.base64);
      } else {
        handleInputChange('images', [...formData.images, result.base64]);
      }
      
      toast.success('Image uploaded successfully!');
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      toast.error(`Failed to upload image: ${errorMessage}`);
      console.error('Upload error:', error);
    } finally {
      setUploading(false);
    }
  };

  const removeMainImage = () => {
    handleInputChange('image', '');
  };

  const removeImage = (index: number) => {
    const newImages = formData.images.filter((_, i) => i !== index);
    handleInputChange('images', newImages);
  };

  const addFeature = () => {
    const feature = prompt('Enter a product feature:');
    if (feature && feature.trim()) {
      handleInputChange('features', [...formData.features, feature.trim()]);
    }
  };

  const removeFeature = (index: number) => {
    const newFeatures = formData.features.filter((_, i) => i !== index);
    handleInputChange('features', newFeatures);
  };

  const addColor = () => {
    const color = prompt('Enter a color (hex code like #FF0000):');
    if (color && color.trim() && color.match(/^#[0-9A-F]{6}$/i)) {
      handleInputChange('colors', [...formData.colors, color.trim()]);
    } else if (color) {
      toast.error('Please enter a valid hex color code (e.g., #FF0000)');
    }
  };

  const removeColor = (index: number) => {
    const newColors = formData.colors.filter((_, i) => i !== index);
    handleInputChange('colors', newColors);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      setLoading(true);
      
      const productData = {
        ...formData,
        price: parseFloat(formData.price),
        images: formData.image ? [formData.image, ...formData.images] : formData.images,
      };
      
      // Send to API endpoint
      const response = await fetch('/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(productData),
      });
      
      if (response.ok) {
        const result = await response.json();
        
        // Also store locally for immediate access
        const existingProducts = JSON.parse(localStorage.getItem('avenzo_products') || '[]');
        existingProducts.push(result.product);
        localStorage.setItem('avenzo_products', JSON.stringify(existingProducts));
        
        // Refresh the stored products list
        loadStoredProducts();
        
        toast.success(
          `Product "${result.product.name}" added successfully! Click to view.`,
          {
            action: {
              label: "View Product",
              onClick: () => window.open(`/product/${result.product.id}`, '_blank')
            }
          }
        );
        
        // Reset form
        setFormData({
          name: "",
          price: "",
          description: "",
          image: "",
          images: [],
          category: "",
          inStock: true,
          colors: [],
          features: [],
        });
      } else {
        const error = await response.json();
        throw new Error(error.error || 'Failed to add product');
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      toast.error(`Failed to add product: ${errorMessage}`);
      console.error('Submit error:', error);
    } finally {
      setLoading(false);
    }
  };

  const triggerWebhook = async () => {
    try {
      const response = await fetch('/api/webhook/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.NEXT_PUBLIC_WEBHOOK_SECRET || 'your-webhook-secret'}`,
        },
        body: JSON.stringify({
          action: 'products.bulk_update',
          timestamp: new Date().toISOString(),
        }),
      });
      
      if (response.ok) {
        toast.success('Cache refreshed successfully!');
      } else {
        throw new Error('Webhook failed');
      }
    } catch (error) {
      toast.error('Failed to refresh cache');
      console.error('Webhook error:', error);
    }
  };

  return (
    <div className="container mx-auto py-8 max-w-4xl">
      <div className="space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold">Product Admin</h1>
          <p className="text-muted-foreground mt-2">
            Add new products to your store with base64 image storage
          </p>
        </div>

        {/* Cache Refresh */}
        <Card>
          <CardHeader>
            <CardTitle>Cache Management</CardTitle>
          </CardHeader>
          <CardContent>
            <Button onClick={triggerWebhook} variant="outline" className="w-full">
              <RefreshCw className="mr-2 h-4 w-4" />
              Refresh Product Cache
            </Button>
          </CardContent>
        </Card>

        {/* Add Product Form */}
        <Card>
          <CardHeader>
            <CardTitle>Add New Product</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Product Name</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="price">Price ($)</Label>
                  <Input
                    id="price"
                    type="number"
                    step="0.01"
                    value={formData.price}
                    onChange={(e) => handleInputChange('price', e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Input
                  id="category"
                  value={formData.category}
                  onChange={(e) => handleInputChange('category', e.target.value)}
                  placeholder="e.g., Home Decor, Kitchen, Textiles"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  rows={4}
                  required
                />
              </div>

              {/* Main Product Image */}
              <div className="space-y-4">
                <Label>Main Product Image</Label>
                
                {formData.image && (
                  <div className="relative inline-block">
                    <img
                      src={formData.image}
                      alt="Main product"
                      className="w-32 h-32 object-cover rounded-lg border"
                    />
                    <Button
                      type="button"
                      variant="destructive"
                      size="icon"
                      className="absolute -top-2 -right-2 h-6 w-6"
                      onClick={() => handleInputChange('image', '')}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </div>
                )}
                
                <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) handleImageUpload(file, true);
                    }}
                    className="hidden"
                    id="main-image-upload"
                    disabled={uploading}
                  />
                  <label htmlFor="main-image-upload" className="cursor-pointer">
                    <ImageIcon className="mx-auto h-8 w-8 text-muted-foreground mb-2" />
                    <p className="text-sm text-muted-foreground">
                      {uploading ? 'Uploading...' : 'Click to upload main image'}
                    </p>
                  </label>
                </div>
              </div>

              {/* Additional Images */}
              <div className="space-y-4">
                <Label>Additional Images</Label>
                
                {formData.images.length > 0 && (
                  <div className="grid grid-cols-4 gap-4">
                    {formData.images.map((image, index) => (
                      <div key={index} className="relative">
                        <img
                          src={image}
                          alt={`Product ${index + 1}`}
                          className="w-full h-24 object-cover rounded-lg border"
                        />
                        <Button
                          type="button"
                          variant="destructive"
                          size="icon"
                          className="absolute -top-2 -right-2 h-6 w-6"
                          onClick={() => removeImage(index)}
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
                
                <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) handleImageUpload(file, false);
                    }}
                    className="hidden"
                    id="additional-image-upload"
                    disabled={uploading}
                  />
                  <label htmlFor="additional-image-upload" className="cursor-pointer">
                    <Upload className="mx-auto h-8 w-8 text-muted-foreground mb-2" />
                    <p className="text-sm text-muted-foreground">
                      {uploading ? 'Uploading...' : 'Click to add more images'}
                    </p>
                  </label>
                </div>
              </div>

              {/* Colors */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label>Colors</Label>
                  <Button type="button" variant="outline" size="sm" onClick={addColor}>
                    Add Color
                  </Button>
                </div>
                
                {formData.colors.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {formData.colors.map((color, index) => (
                      <div key={index} className="flex items-center gap-2 bg-secondary rounded-full px-3 py-1">
                        <div
                          className="w-4 h-4 rounded-full border"
                          style={{ backgroundColor: color }}
                        />
                        <span className="text-sm">{color}</span>
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="h-4 w-4 p-0"
                          onClick={() => removeColor(index)}
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Features */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label>Features</Label>
                  <Button type="button" variant="outline" size="sm" onClick={addFeature}>
                    Add Feature
                  </Button>
                </div>
                
                {formData.features.length > 0 && (
                  <div className="space-y-2">
                    {formData.features.map((feature, index) => (
                      <div key={index} className="flex items-center gap-2 bg-secondary rounded px-3 py-2">
                        <span className="flex-1 text-sm">{feature}</span>
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6"
                          onClick={() => removeFeature(index)}
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <Button type="submit" disabled={loading || uploading} className="w-full">
                {loading ? 'Adding Product...' : 'Add Product'}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Stored Products */}
        <Card>
          <CardHeader>
            <CardTitle>Stored Products ({storedProducts.length})</CardTitle>
          </CardHeader>
          <CardContent>
            {storedProducts.length === 0 ? (
              <p className="text-muted-foreground text-center py-8">
                No products stored yet. Add your first product above!
              </p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {storedProducts.map((product) => (
                  <div key={product.id} className="border rounded-lg p-4 space-y-3">
                    {product.image && (
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-32 object-cover rounded"
                      />
                    )}
                    <div>
                      <h3 className="font-medium text-sm line-clamp-1">{product.name}</h3>
                      <p className="text-sm text-muted-foreground">${product.price}</p>
                      <p className="text-xs text-muted-foreground line-clamp-2">{product.description}</p>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => window.open(`/product/${product.id}`, '_blank')}
                        className="flex-1"
                      >
                        <Eye className="h-3 w-3 mr-1" />
                        View
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => {
                          if (confirm(`Are you sure you want to delete "${product.name}"?`)) {
                            deleteProduct(product.id);
                          }
                        }}
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Base64 Storage Info */}
        <Card>
          <CardHeader>
            <CardTitle>Image Storage Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label>Storage Method</Label>
              <p className="text-sm text-muted-foreground">
                Base64 encoding with local storage
              </p>
            </div>
            <div>
              <Label>Upload Endpoint</Label>
              <p className="text-sm text-muted-foreground">
                {typeof window !== 'undefined' ? `${window.location.origin}/api/upload/upload` : '/api/upload/upload'}
              </p>
            </div>
            <div>
              <Label>Features</Label>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Automatic image compression</li>
                <li>• Thumbnail generation</li>
                <li>• File validation (type & size)</li>
                <li>• No external dependencies</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}