"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Upload, RefreshCw, X, Image as ImageIcon, Trash2, Eye, LogOut, Clock } from "lucide-react";
import { uploadBase64Image, createThumbnail, getDetailedStorageUsage, isStorageNearLimit, estimateBase64Size } from "@/lib/image-utils";
import { Product } from "@/lib/api";
import { isAuthenticated, logout, getSessionTimeRemaining, extendSession } from "@/lib/auth";
import { AdminLogin } from "@/components/AdminLogin";

export default function AdminPage() {
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [storedProducts, setStoredProducts] = useState<Product[]>([]);
  const [storageUsage, setStorageUsage] = useState({ used: 0, available: 0, percentage: 0 });
  const [detailedStorage, setDetailedStorage] = useState<any>(null);
  const [compressionLevel, setCompressionLevel] = useState<'normal' | 'high' | 'ultra'>('ultra');
  const [sessionTime, setSessionTime] = useState(0);
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

  // Check authentication on component mount
  useEffect(() => {
    setAuthenticated(isAuthenticated());
    setSessionTime(getSessionTimeRemaining());
    
    // Update session time every minute
    const interval = setInterval(() => {
      const remaining = getSessionTimeRemaining();
      setSessionTime(remaining);
      
      if (remaining === 0) {
        setAuthenticated(false);
        toast.error("Session expired. Please login again.");
      }
    }, 60000); // Check every minute
    
    return () => clearInterval(interval);
  }, []);

  // Load stored products and update storage usage when authenticated
  useEffect(() => {
    if (authenticated) {
      loadStoredProducts();
      updateStorageUsage();
      extendSession(); // Extend session on activity
    }
  }, [authenticated]);

  const handleLogin = () => {
    setAuthenticated(true);
    setSessionTime(getSessionTimeRemaining());
  };

  const handleLogout = () => {
    logout();
    setAuthenticated(false);
    toast.success("Logged out successfully");
  };

  const updateStorageUsage = () => {
    const detailed = getDetailedStorageUsage();
    setStorageUsage(detailed.total);
    setDetailedStorage(detailed);
  };

  const loadStoredProducts = () => {
    try {
      const stored = JSON.parse(localStorage.getItem('avenzo_products') || '[]');
      // Only show products that were created through admin (have prod_ prefix)
      const adminProducts = stored.filter((product: Product) => product.id.startsWith('prod_'));
      setStoredProducts(adminProducts);
    } catch (error) {
      console.error('Failed to load stored products:', error);
    }
  };

  const deleteProduct = (productId: string) => {
    try {
      const stored = JSON.parse(localStorage.getItem('avenzo_products') || '[]');
      const filtered = stored.filter((p: Product) => p.id !== productId);
      localStorage.setItem('avenzo_products', JSON.stringify(filtered));
      loadStoredProducts(); // This will now only show admin products
      toast.success('Product deleted successfully!');
    } catch (error) {
      toast.error('Failed to delete product');
      console.error('Delete error:', error);
    }
  };

  const clearAllProducts = () => {
    try {
      localStorage.removeItem('avenzo_products');
      setStoredProducts([]);
      updateStorageUsage();
      toast.success('All products cleared successfully!');
    } catch (error) {
      toast.error('Failed to clear products');
      console.error('Clear error:', error);
    }
  };

  const handleInputChange = (field: string, value: string | boolean | string[]) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleImageUpload = async (file: File, isMainImage: boolean = true) => {
    try {
      // Check storage before upload
      const estimatedSize = estimateBase64Size(file);
      const currentUsage = detailedStorage?.total || { used: 0, available: 5, percentage: 0 };
      
      if (currentUsage.used + (estimatedSize / 1024 / 1024) > 4.5) { // 4.5MB warning
        toast.error('Storage almost full! Consider deleting some images or products.');
        return;
      }
      
      setUploading(true);
      
      // Upload using base64 system with selected compression
      const result = await uploadBase64Image(file, true, compressionLevel);
      
      // Show compression stats
      const compressionRatio = ((result.originalSize - result.compressedSize) / result.originalSize * 100).toFixed(1);
      console.log(`Compression: ${compressionRatio}% reduction (${(result.originalSize/1024).toFixed(1)}KB → ${(result.compressedSize/1024).toFixed(1)}KB)`);
      
      if (isMainImage) {
        handleInputChange('image', result.base64);
      } else {
        handleInputChange('images', [...formData.images, result.base64]);
      }
      
      // Update storage usage
      updateStorageUsage();
      
      toast.success(`Image uploaded! ${compressionRatio}% size reduction achieved.`);
      
      // Warn if storage is getting full
      if (isStorageNearLimit()) {
        toast.warning('Storage is getting full. Consider using Ultra compression.');
      }
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
      extendSession(); // Extend session on activity
      
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

  // Show login screen if not authenticated
  if (!authenticated) {
    return <AdminLogin onLogin={handleLogin} />;
  }

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
        {/* Header with Session Info */}
        <div className="flex items-center justify-between">
          <div className="text-center flex-1">
            <h1 className="text-3xl font-bold">Product Admin</h1>
            <p className="text-muted-foreground mt-2">
              Add new products to your store with base64 image storage
            </p>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="text-right text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                <span>Session: {sessionTime}m remaining</span>
              </div>
            </div>
            <Button
              onClick={handleLogout}
              variant="outline"
              size="sm"
              className="flex items-center gap-2"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </Button>
          </div>
        </div>

        {/* Image Compression Settings */}
        <Card>
          <CardHeader>
            <CardTitle>Image Compression Settings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <Label>Compression Level (affects image quality and storage usage)</Label>
              <div className="grid grid-cols-1 gap-3">
                <div 
                  className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                    compressionLevel === 'ultra' ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50'
                  }`}
                  onClick={() => setCompressionLevel('ultra')}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium text-sm">Ultra Compression (Recommended)</div>
                      <div className="text-xs text-muted-foreground">300px max, 40% quality - Maximum storage</div>
                    </div>
                    <div className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                      ~50-100 images
                    </div>
                  </div>
                </div>
                
                <div 
                  className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                    compressionLevel === 'high' ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50'
                  }`}
                  onClick={() => setCompressionLevel('high')}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium text-sm">High Compression</div>
                      <div className="text-xs text-muted-foreground">400px max, 50% quality - Good balance</div>
                    </div>
                    <div className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded">
                      ~30-50 images
                    </div>
                  </div>
                </div>
                
                <div 
                  className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                    compressionLevel === 'normal' ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50'
                  }`}
                  onClick={() => setCompressionLevel('normal')}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium text-sm">Normal Compression</div>
                      <div className="text-xs text-muted-foreground">600px max, 70% quality - Better quality</div>
                    </div>
                    <div className="text-xs bg-red-100 text-red-800 px-2 py-1 rounded">
                      ~15-25 images
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="text-xs text-muted-foreground space-y-1 pt-2 border-t">
              <p><strong>Ultra Compression:</strong> Best for maximum storage, good for product catalogs</p>
              <p><strong>High Compression:</strong> Good balance of quality and storage</p>
              <p><strong>Normal Compression:</strong> Better quality but uses more storage</p>
            </div>
          </CardContent>
        </Card>

        {/* Storage Usage Monitor */}
        <Card>
          <CardHeader>
            <CardTitle>Storage Usage</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Used Storage</span>
                <span>{storageUsage.used}MB / ~5MB</span>
              </div>
              <div className="w-full bg-secondary rounded-full h-2">
                <div 
                  className={`h-2 rounded-full transition-all duration-300 ${
                    storageUsage.percentage > 90 ? 'bg-red-500' :
                    storageUsage.percentage > 70 ? 'bg-yellow-500' : 'bg-green-500'
                  }`}
                  style={{ width: `${Math.min(storageUsage.percentage, 100)}%` }}
                />
              </div>
              <div className="text-xs text-muted-foreground">
                {storageUsage.percentage}% used • {storageUsage.available}MB available
              </div>
            </div>
            
            {storageUsage.percentage > 80 && (
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                <div className="flex items-start gap-2">
                  <svg className="w-4 h-4 text-yellow-600 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  <div>
                    <p className="text-sm font-medium text-yellow-800">Storage Warning</p>
                    <p className="text-xs text-yellow-700 mt-1">
                      You're running low on storage space. Consider deleting unused products or images.
                    </p>
                  </div>
                </div>
              </div>
            )}
            
            <div className="text-xs text-muted-foreground space-y-1">
              <p>• <strong>Ultra compression:</strong> ~50-100 images possible</p>
              <p>• <strong>High compression:</strong> ~30-50 images possible</p>
              <p>• <strong>Normal compression:</strong> ~15-25 images possible</p>
              <p>• Current setting: <strong>{compressionLevel}</strong> compression</p>
            </div>
          </CardContent>
        </Card>

        {/* Cache Refresh */}
        <Card>
          <CardHeader>
            <CardTitle>Admin Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button onClick={triggerWebhook} variant="outline" className="w-full">
              <RefreshCw className="mr-2 h-4 w-4" />
              Refresh Product Cache
            </Button>
            
            {storedProducts.length > 0 && (
              <Button 
                onClick={() => {
                  if (confirm(`Are you sure you want to delete ALL ${storedProducts.length} products?\n\nThis action cannot be undone.`)) {
                    clearAllProducts();
                  }
                }}
                variant="destructive" 
                className="w-full"
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Clear All Products ({storedProducts.length})
              </Button>
            )}
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
                      onClick={removeMainImage}
                      title="Remove main image"
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
                      {uploading ? 'Uploading...' : formData.image ? 'Click to replace main image' : 'Click to upload main image'}
                    </p>
                  </label>
                </div>
              </div>

              {/* Additional Images */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label>Additional Images</Label>
                  <span className="text-sm text-muted-foreground">
                    {formData.images.length} image{formData.images.length !== 1 ? 's' : ''}
                  </span>
                </div>
                
                {formData.images.length > 0 && (
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {formData.images.map((image, index) => (
                      <div key={index} className="relative group">
                        <img
                          src={image}
                          alt={`Product ${index + 1}`}
                          className="w-full h-24 object-cover rounded-lg border transition-opacity group-hover:opacity-75"
                        />
                        <Button
                          type="button"
                          variant="destructive"
                          size="icon"
                          className="absolute -top-2 -right-2 h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                          onClick={() => removeImage(index)}
                          title={`Remove image ${index + 1}`}
                        >
                          <X className="h-3 w-3" />
                        </Button>
                        <div className="absolute bottom-1 left-1 bg-black/50 text-white text-xs px-1 rounded">
                          {index + 1}
                        </div>
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
            <div className="flex items-center justify-between">
              <CardTitle>Your Products ({storedProducts.length})</CardTitle>
              <Button
                onClick={loadStoredProducts}
                variant="outline"
                size="sm"
              >
                <RefreshCw className="h-4 w-4 mr-2" />
                Refresh
              </Button>
            </div>
            <p className="text-sm text-muted-foreground">
              Products created through this admin panel
            </p>
          </CardHeader>
          <CardContent>
            {storedProducts.length === 0 ? (
              <div className="text-center py-12 border-2 border-dashed border-border rounded-lg">
                <ImageIcon className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium mb-2">No products yet</h3>
                <p className="text-muted-foreground mb-4">
                  Create your first product using the form above
                </p>
                <Button
                  onClick={() => document.getElementById('name')?.focus()}
                  variant="outline"
                >
                  Add Your First Product
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {storedProducts.map((product) => (
                  <div key={product.id} className="border rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                    {product.image && (
                      <div className="aspect-square overflow-hidden bg-gray-100">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-200"
                        />
                      </div>
                    )}
                    <div className="p-4 space-y-3">
                      <div>
                        <h3 className="font-medium text-sm line-clamp-1" title={product.name}>
                          {product.name}
                        </h3>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-lg font-semibold text-primary">
                            ${product.price}
                          </span>
                          {product.originalPrice && (
                            <span className="text-sm text-muted-foreground line-through">
                              ${product.originalPrice}
                            </span>
                          )}
                        </div>
                      </div>
                      
                      <p className="text-xs text-muted-foreground line-clamp-2" title={product.description}>
                        {product.description}
                      </p>
                      
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <span className="bg-secondary px-2 py-1 rounded">
                          {product.category || 'General'}
                        </span>
                        {product.images && product.images.length > 1 && (
                          <span className="bg-secondary px-2 py-1 rounded">
                            {product.images.length} images
                          </span>
                        )}
                        {product.isNew && (
                          <span className="bg-badge-new text-primary-foreground px-2 py-1 rounded">
                            New
                          </span>
                        )}
                        {product.onSale && (
                          <span className="bg-badge-sale text-primary-foreground px-2 py-1 rounded">
                            Sale
                          </span>
                        )}
                      </div>
                      
                      <div className="flex gap-2 pt-2">
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
                            if (confirm(`Are you sure you want to delete "${product.name}"?\n\nThis action cannot be undone.`)) {
                              deleteProduct(product.id);
                            }
                          }}
                          title="Delete product"
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
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