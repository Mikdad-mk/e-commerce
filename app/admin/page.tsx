"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Upload, RefreshCw, X, Trash2, Eye, LogOut, Clock, Plus } from "lucide-react";
import { Product } from "@/lib/api";
import { isAuthenticated, logout, getSessionTimeRemaining, extendSession } from "@/lib/auth";
import { AdminLogin } from "@/components/AdminLogin";

export default function AdminPage() {
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [storedProducts, setStoredProducts] = useState<Product[]>([]);
  const [sessionTimeLeft, setSessionTimeLeft] = useState<number>(0);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    originalPrice: "",
    description: "",
    category: "",
    images: [] as string[],
  });

  useEffect(() => {
    const checkAuth = () => {
      setAuthenticated(isAuthenticated());
    };
    
    checkAuth();
    
    // Update session timer every second
    const timer = setInterval(() => {
      if (isAuthenticated()) {
        setSessionTimeLeft(getSessionTimeRemaining());
      } else {
        setAuthenticated(false);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (authenticated) {
      loadStoredProducts();
    }
  }, [authenticated]);

  const loadStoredProducts = () => {
    try {
      const stored = localStorage.getItem('avenzo_products');
      if (stored) {
        setStoredProducts(JSON.parse(stored));
      }
    } catch (error) {
      console.error('Error loading products:', error);
      toast.error('Failed to load products');
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    // Validate files
    const maxSize = 5 * 1024 * 1024; // 5MB
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
    const validFiles: File[] = [];
    const newPreviewUrls: string[] = [];

    files.forEach(file => {
      if (!allowedTypes.includes(file.type)) {
        toast.error(`Invalid file type for ${file.name}. Please upload JPEG, PNG, WebP, or GIF images.`);
        return;
      }

      if (file.size > maxSize) {
        toast.error(`File ${file.name} is too large. Please upload images smaller than 5MB.`);
        return;
      }

      validFiles.push(file);
      
      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => {
        newPreviewUrls.push(e.target?.result as string);
        if (newPreviewUrls.length === validFiles.length) {
          setPreviewUrls(prev => [...prev, ...newPreviewUrls]);
        }
      };
      reader.readAsDataURL(file);
    });

    setSelectedFiles(prev => [...prev, ...validFiles]);
  };

  const handleUploadImages = async () => {
    if (selectedFiles.length === 0) {
      toast.error('Please select images first');
      return;
    }

    setUploading(true);
    const uploadedUrls: string[] = [];

    try {
      console.log(`Starting upload of ${selectedFiles.length} files...`);
      
      // Upload files one by one
      for (let i = 0; i < selectedFiles.length; i++) {
        const file = selectedFiles[i];
        console.log(`Uploading file ${i + 1}/${selectedFiles.length}: ${file.name}`);
        
        const formData = new FormData();
        formData.append('file', file);

        const response = await fetch('/api/upload/cloudinary', {
          method: 'POST',
          body: formData,
        });

        const result = await response.json();
        console.log(`Upload result for ${file.name}:`, result);

        if (result.success) {
          uploadedUrls.push(result.imageUrl);
          toast.success(`Image ${i + 1}/${selectedFiles.length} uploaded successfully!`);
        } else {
          console.error(`Upload failed for ${file.name}:`, result);
          toast.error(`Failed to upload ${file.name}: ${result.error}`);
        }
      }

      console.log(`Successfully uploaded ${uploadedUrls.length} images:`, uploadedUrls);

      // Update form data with uploaded images
      setFormData(prev => ({
        ...prev,
        images: [...prev.images, ...uploadedUrls]
      }));

      setUploadedImages(prev => [...prev, ...uploadedUrls]);

      // Clear selected files and previews
      setSelectedFiles([]);
      setPreviewUrls([]);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }

      toast.success(`Successfully uploaded ${uploadedUrls.length} images!`);
    } catch (error) {
      console.error('Upload error:', error);
      toast.error('Failed to upload images');
    } finally {
      setUploading(false);
    }
  };

  const handleRemovePreview = (index: number) => {
    setSelectedFiles(prev => prev.filter((_, i) => i !== index));
    setPreviewUrls(prev => prev.filter((_, i) => i !== index));
  };

  const handleRemoveUploadedImage = (index: number) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
    setUploadedImages(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    console.log('Form submission started with data:', formData);
    
    if (!formData.name || !formData.price || !formData.description || formData.images.length === 0) {
      console.error('Form validation failed:', {
        name: !!formData.name,
        price: !!formData.price,
        description: !!formData.description,
        imagesCount: formData.images.length
      });
      toast.error('Please fill in all required fields and upload at least one image');
      return;
    }

    setLoading(true);

    try {
      const newProduct: Product = {
        id: Date.now().toString(),
        name: formData.name,
        price: parseFloat(formData.price),
        originalPrice: formData.originalPrice ? parseFloat(formData.originalPrice) : undefined,
        description: formData.description,
        category: formData.category || 'Home Essentials',
        image: formData.images[0], // First image as main image
        images: formData.images, // All images
        inStock: true,
        rating: 4.5,
        reviews: Math.floor(Math.random() * 100) + 10,
      };

      console.log('Creating new product:', newProduct);

      // Save to localStorage
      const existingProducts = JSON.parse(localStorage.getItem('avenzo_products') || '[]');
      const updatedProducts = [...existingProducts, newProduct];
      localStorage.setItem('avenzo_products', JSON.stringify(updatedProducts));

      console.log('Product saved to localStorage. Total products:', updatedProducts.length);

      // Dispatch custom event to notify other components
      window.dispatchEvent(new CustomEvent('productsUpdated'));
      console.log('Products updated event dispatched');

      // Reset form
      setFormData({
        name: "",
        price: "",
        originalPrice: "",
        description: "",
        category: "",
        images: [],
      });
      setUploadedImages([]);

      loadStoredProducts();
      toast.success('Product added successfully!');
    } catch (error) {
      console.error('Error adding product:', error);
      toast.error('Failed to add product');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteProduct = (productId: string) => {
    try {
      const existingProducts = JSON.parse(localStorage.getItem('avenzo_products') || '[]');
      const updatedProducts = existingProducts.filter((p: Product) => p.id !== productId);
      localStorage.setItem('avenzo_products', JSON.stringify(updatedProducts));
      
      // Dispatch custom event to notify other components
      window.dispatchEvent(new CustomEvent('productsUpdated'));
      
      loadStoredProducts();
      toast.success('Product deleted successfully!');
    } catch (error) {
      console.error('Error deleting product:', error);
      toast.error('Failed to delete product');
    }
  };

  const handleExtendSession = () => {
    extendSession();
    toast.success('Session extended by 30 minutes');
  };

  const handleLogout = () => {
    logout();
    setAuthenticated(false);
    toast.success('Logged out successfully');
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  if (!authenticated) {
    return <AdminLogin onLogin={() => setAuthenticated(true)} />;
  }

  return (
    <div className="container py-8 max-w-6xl">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <p className="text-muted-foreground">Manage your products with multiple Cloudinary image uploads</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Clock className="h-4 w-4" />
            <span>Session: {formatTime(sessionTimeLeft)}</span>
            <Button
              onClick={handleExtendSession}
              variant="outline"
              size="sm"
            >
              Extend
            </Button>
          </div>
          <Button onClick={handleLogout} variant="outline" size="sm">
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Add Product Form */}
        <Card>
          <CardHeader>
            <CardTitle>Add New Product</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="name">Product Name *</Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Enter product name"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="price">Price *</Label>
                  <Input
                    id="price"
                    name="price"
                    type="number"
                    step="0.01"
                    value={formData.price}
                    onChange={handleInputChange}
                    placeholder="0.00"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="originalPrice">Original Price</Label>
                  <Input
                    id="originalPrice"
                    name="originalPrice"
                    type="number"
                    step="0.01"
                    value={formData.originalPrice}
                    onChange={handleInputChange}
                    placeholder="0.00"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="category">Category</Label>
                <Input
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  placeholder="e.g., Kitchen, Bath, Decor"
                />
              </div>

              {/* Multiple Image Upload Section */}
              <div className="space-y-4">
                <Label>Product Images * (Multiple images supported)</Label>
                
                {/* File Input */}
                <div className="flex items-center gap-4">
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleFileSelect}
                    className="hidden"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => fileInputRef.current?.click()}
                    disabled={uploading}
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Select Images
                  </Button>
                  
                  {selectedFiles.length > 0 && (
                    <Button
                      type="button"
                      onClick={handleUploadImages}
                      disabled={uploading}
                    >
                      {uploading ? (
                        <>
                          <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                          Uploading {selectedFiles.length} images...
                        </>
                      ) : (
                        <>
                          <Upload className="h-4 w-4 mr-2" />
                          Upload {selectedFiles.length} images to Cloudinary
                        </>
                      )}
                    </Button>
                  )}
                </div>

                {/* Selected Files Preview */}
                {previewUrls.length > 0 && (
                  <div>
                    <Label className="text-sm text-muted-foreground">Selected Images (Ready to Upload)</Label>
                    <div className="grid grid-cols-3 gap-2 mt-2">
                      {previewUrls.map((url, index) => (
                        <div key={index} className="relative">
                          <img
                            src={url}
                            alt={`Preview ${index + 1}`}
                            className="w-full h-20 object-cover rounded border"
                          />
                          <Button
                            type="button"
                            variant="destructive"
                            size="sm"
                            className="absolute -top-1 -right-1 h-6 w-6 p-0"
                            onClick={() => handleRemovePreview(index)}
                          >
                            <X className="h-3 w-3" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Uploaded Images */}
                {uploadedImages.length > 0 && (
                  <div>
                    <Label className="text-sm text-green-600">Uploaded Images ({uploadedImages.length})</Label>
                    <div className="grid grid-cols-3 gap-2 mt-2">
                      {uploadedImages.map((url, index) => (
                        <div key={index} className="relative">
                          <img
                            src={url}
                            alt={`Uploaded ${index + 1}`}
                            className="w-full h-20 object-cover rounded border border-green-200"
                          />
                          <Button
                            type="button"
                            variant="destructive"
                            size="sm"
                            className="absolute -top-1 -right-1 h-6 w-6 p-0"
                            onClick={() => handleRemoveUploadedImage(index)}
                          >
                            <X className="h-3 w-3" />
                          </Button>
                          {index === 0 && (
                            <div className="absolute bottom-0 left-0 right-0 bg-green-600 text-white text-xs text-center py-1 rounded-b">
                              Main Image
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div>
                <Label htmlFor="description">Description *</Label>
                <Textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Enter product description"
                  rows={4}
                  required
                />
              </div>

              <Button type="submit" className="w-full" disabled={loading || formData.images.length === 0}>
                {loading ? (
                  <>
                    <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                    Adding Product...
                  </>
                ) : (
                  `Add Product ${formData.images.length > 0 ? `(${formData.images.length} images)` : ''}`
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Products List */}
        <Card>
          <CardHeader>
            <CardTitle>Stored Products ({storedProducts.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {storedProducts.length === 0 ? (
                <p className="text-muted-foreground text-center py-8">
                  No products added yet
                </p>
              ) : (
                storedProducts.map((product) => (
                  <div key={product.id} className="flex items-center gap-3 p-3 border rounded-lg">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-12 h-12 object-cover rounded"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = '/placeholder.svg';
                      }}
                    />
                    <div className="flex-1 min-w-0">
                      <p className="font-medium truncate">{product.name}</p>
                      <p className="text-sm text-muted-foreground">
                        ${product.price}
                        {product.images && product.images.length > 1 && (
                          <span className="ml-2 text-xs bg-secondary px-1 rounded">
                            {product.images.length} images
                          </span>
                        )}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        onClick={() => window.open(`/product/${product.id}`, '_blank')}
                        variant="outline"
                        size="sm"
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button
                        onClick={() => {
                          if (confirm(`Are you sure you want to delete "${product.name}"?\n\nThis action cannot be undone.`)) {
                            handleDeleteProduct(product.id);
                          }
                        }}
                        variant="outline"
                        size="sm"
                        className="text-destructive hover:text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Instructions */}
      <Card className="mt-8">
        <CardHeader>
          <CardTitle>📋 Step-by-Step Guide</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
            <h4 className="font-semibold mb-2 text-blue-800">🚀 How to Add Products:</h4>
            <ol className="list-decimal list-inside space-y-2 text-sm text-blue-700">
              <li><strong>Fill Product Details:</strong> Enter product name, price, description, and category</li>
              <li><strong>Select Images:</strong> Click "Select Images" and choose multiple image files</li>
              <li><strong>Upload to Cloudinary:</strong> Click "Upload X images to Cloudinary" button</li>
              <li><strong>Wait for Upload:</strong> Wait for all images to upload successfully (green checkmarks)</li>
              <li><strong>Submit Product:</strong> Click "Add Product" button to save</li>
              <li><strong>Verify:</strong> Check that the product appears in the "Stored Products" section</li>
            </ol>
          </div>
          
          <div className="bg-green-50 border border-green-200 p-4 rounded-lg">
            <h4 className="font-semibold mb-2 text-green-800">✅ Features:</h4>
            <ul className="list-disc list-inside space-y-1 text-sm text-green-700">
              <li>Upload multiple Cloudinary images per product</li>
              <li>Real-time upload progress and status</li>
              <li>Image preview before and after upload</li>
              <li>First image automatically becomes main product image</li>
              <li>Products automatically appear on shop and home pages</li>
              <li>Individual image removal capability</li>
              <li>Only admin-created products with Cloudinary images are displayed</li>
            </ul>
          </div>

          <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg">
            <h4 className="font-semibold mb-2 text-yellow-800">⚠️ Important Notes:</h4>
            <ul className="list-disc list-inside space-y-1 text-sm text-yellow-700">
              <li>You must upload images to Cloudinary BEFORE submitting the product</li>
              <li>Maximum file size: 5MB per image</li>
              <li>Supported formats: JPEG, PNG, WebP, GIF</li>
              <li>Products are stored locally in your browser</li>
              <li>Only admin-created products are displayed (no dummy products)</li>
              <li>Use the test page (/test) to debug any issues</li>
            </ul>
          </div>

          <div className="bg-gray-50 border border-gray-200 p-4 rounded-lg">
            <h4 className="font-semibold mb-2 text-gray-800">🔧 Troubleshooting:</h4>
            <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
              <li>If products don't appear on shop page, try refreshing the page</li>
              <li>If Cloudinary upload fails, check your internet connection</li>
              <li>Visit <a href="/test" className="text-blue-600 underline">/test</a> to run diagnostic tests</li>
              <li>Visit <a href="/debug" className="text-blue-600 underline">/debug</a> to see product loading status</li>
              <li>Check browser console for detailed error messages</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}