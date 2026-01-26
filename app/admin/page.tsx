"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Upload, RefreshCw, X, Trash2, Eye, LogOut, Clock, Image as ImageIcon } from "lucide-react";
import { Product } from "@/lib/api";
import { isAuthenticated, logout, getSessionTimeRemaining, extendSession } from "@/lib/auth";
import { AdminLogin } from "@/components/AdminLogin";

export default function AdminPage() {
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [storedProducts, setStoredProducts] = useState<Product[]>([]);
  const [sessionTimeLeft, setSessionTimeLeft] = useState<number>(0);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    originalPrice: "",
    description: "",
    category: "",
    image: "",
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
    const file = e.target.files?.[0];
    if (file) {
      // Validate file
      const maxSize = 5 * 1024 * 1024; // 5MB
      const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];

      if (!allowedTypes.includes(file.type)) {
        toast.error('Invalid file type. Please upload JPEG, PNG, WebP, or GIF images.');
        return;
      }

      if (file.size > maxSize) {
        toast.error('File size too large. Please upload images smaller than 5MB.');
        return;
      }

      setSelectedFile(file);
      
      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreviewUrl(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUploadImage = async () => {
    if (!selectedFile) {
      toast.error('Please select an image first');
      return;
    }

    setUploading(true);

    try {
      const formData = new FormData();
      formData.append('file', selectedFile);

      const response = await fetch('/api/upload/cloudinary', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();

      if (result.success) {
        setFormData(prev => ({
          ...prev,
          image: result.imageUrl
        }));
        toast.success('Image uploaded successfully!');
        setSelectedFile(null);
        setPreviewUrl("");
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
      } else {
        toast.error(result.error || 'Failed to upload image');
      }
    } catch (error) {
      console.error('Upload error:', error);
      toast.error('Failed to upload image');
    } finally {
      setUploading(false);
    }
  };

  const handleRemoveImage = () => {
    setFormData(prev => ({
      ...prev,
      image: ""
    }));
    setSelectedFile(null);
    setPreviewUrl("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.price || !formData.description || !formData.image) {
      toast.error('Please fill in all required fields and upload an image');
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
        image: formData.image,
        inStock: true,
        rating: 4.5,
        reviews: Math.floor(Math.random() * 100) + 10,
      };

      // Save to localStorage
      const existingProducts = JSON.parse(localStorage.getItem('avenzo_products') || '[]');
      const updatedProducts = [...existingProducts, newProduct];
      localStorage.setItem('avenzo_products', JSON.stringify(updatedProducts));

      // Reset form
      setFormData({
        name: "",
        price: "",
        originalPrice: "",
        description: "",
        category: "",
        image: "",
      });

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
          <p className="text-muted-foreground">Manage your products with Cloudinary image uploads</p>
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

              {/* Image Upload Section */}
              <div className="space-y-4">
                <Label>Product Image *</Label>
                
                {/* File Input */}
                <div className="flex items-center gap-4">
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleFileSelect}
                    className="hidden"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => fileInputRef.current?.click()}
                    disabled={uploading}
                  >
                    <ImageIcon className="h-4 w-4 mr-2" />
                    Select Image
                  </Button>
                  
                  {selectedFile && (
                    <Button
                      type="button"
                      onClick={handleUploadImage}
                      disabled={uploading}
                    >
                      {uploading ? (
                        <>
                          <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                          Uploading...
                        </>
                      ) : (
                        <>
                          <Upload className="h-4 w-4 mr-2" />
                          Upload to Cloudinary
                        </>
                      )}
                    </Button>
                  )}
                </div>

                {/* Preview */}
                {previewUrl && (
                  <div className="relative w-32 h-32 border rounded-lg overflow-hidden">
                    <img
                      src={previewUrl}
                      alt="Preview"
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}

                {/* Uploaded Image */}
                {formData.image && (
                  <div className="relative w-32 h-32 border rounded-lg overflow-hidden">
                    <img
                      src={formData.image}
                      alt="Uploaded"
                      className="w-full h-full object-cover"
                    />
                    <Button
                      type="button"
                      variant="destructive"
                      size="sm"
                      className="absolute top-1 right-1"
                      onClick={handleRemoveImage}
                    >
                      <X className="h-3 w-3" />
                    </Button>
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

              <Button type="submit" className="w-full" disabled={loading || !formData.image}>
                {loading ? (
                  <>
                    <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                    Adding Product...
                  </>
                ) : (
                  'Add Product'
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
                      <p className="text-sm text-muted-foreground">${product.price}</p>
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
          <CardTitle>Cloudinary Setup Instructions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg">
            <h4 className="font-semibold mb-2 text-yellow-800">⚠️ Setup Required</h4>
            <p className="text-sm text-yellow-700 mb-3">
              To enable image uploads, you need to configure an unsigned upload preset in your Cloudinary account:
            </p>
            <ol className="list-decimal list-inside space-y-2 text-sm text-yellow-700">
              <li>Go to <a href="https://console.cloudinary.com/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Cloudinary Console</a></li>
              <li>Navigate to <strong>Settings → Upload → Upload presets</strong></li>
              <li>Click <strong>"Add upload preset"</strong></li>
              <li>Set the preset name to: <code className="bg-yellow-100 px-1 rounded">ml_default</code></li>
              <li>Set <strong>Signing Mode</strong> to <strong>"Unsigned"</strong></li>
              <li>In the <strong>Upload Options</strong> tab, set <strong>Folder</strong> to: <code className="bg-yellow-100 px-1 rounded">avenzo_products</code></li>
              <li>Click <strong>"Save"</strong></li>
            </ol>
          </div>
          
          <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
            <h4 className="font-semibold mb-2 text-blue-800">Current Configuration:</h4>
            <div className="text-sm text-blue-700 space-y-1">
              <p><strong>Cloud Name:</strong> dyojqambm</p>
              <p><strong>Upload Preset:</strong> ml_default (unsigned)</p>
              <p><strong>Storage Folder:</strong> avenzo_products</p>
              <p><strong>Max File Size:</strong> 5MB</p>
              <p><strong>Supported Formats:</strong> JPEG, PNG, WebP, GIF</p>
            </div>
          </div>

          <div className="bg-green-50 border border-green-200 p-4 rounded-lg">
            <h4 className="font-semibold mb-2 text-green-800">✅ After Setup:</h4>
            <ul className="list-disc list-inside space-y-1 text-sm text-green-700">
              <li>Images will upload directly to your Cloudinary account</li>
              <li>Automatic optimization and CDN delivery</li>
              <li>Images organized in the "avenzo_products" folder</li>
              <li>Secure, fast, and reliable image hosting</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}