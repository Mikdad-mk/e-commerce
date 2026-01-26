"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Loader2, Search, Check, X, RefreshCw, Image as ImageIcon } from "lucide-react";
import { toast } from "sonner";

interface CloudinaryImage {
  public_id: string;
  secure_url: string;
  url: string;
  format: string;
  width: number;
  height: number;
  bytes: number;
  created_at: string;
  folder: string;
  filename: string;
  thumbnail: string;
  medium: string;
}

interface CloudinaryImageBrowserProps {
  onImagesSelected: (images: string[]) => void;
  selectedImages: string[];
  maxSelection?: number;
}

export const CloudinaryImageBrowser = ({ 
  onImagesSelected, 
  selectedImages, 
  maxSelection = 10 
}: CloudinaryImageBrowserProps) => {
  const [images, setImages] = useState<CloudinaryImage[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [folder, setFolder] = useState("");
  const [nextCursor, setNextCursor] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(true);

  const fetchImages = async (reset = false) => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (folder) params.append('folder', folder);
      params.append('max_results', '20');
      if (!reset && nextCursor) params.append('next_cursor', nextCursor);

      const response = await fetch(`/api/cloudinary/images?${params.toString()}`);
      const data = await response.json();

      if (data.success) {
        if (reset) {
          setImages(data.images);
        } else {
          setImages(prev => [...prev, ...data.images]);
        }
        setNextCursor(data.next_cursor);
        setHasMore(!!data.next_cursor);
      } else {
        toast.error(`Failed to fetch images: ${data.error}`);
      }
    } catch (error) {
      console.error('Error fetching images:', error);
      toast.error('Failed to fetch images from Cloudinary');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchImages(true);
  }, [folder]);

  const handleImageToggle = (imageUrl: string) => {
    const isSelected = selectedImages.includes(imageUrl);
    
    if (isSelected) {
      // Remove from selection
      onImagesSelected(selectedImages.filter(url => url !== imageUrl));
    } else {
      // Add to selection (if under limit)
      if (selectedImages.length < maxSelection) {
        onImagesSelected([...selectedImages, imageUrl]);
      } else {
        toast.error(`Maximum ${maxSelection} images can be selected`);
      }
    }
  };

  const handleSelectAll = () => {
    const visibleImageUrls = images
      .filter(img => 
        !searchTerm || 
        img.filename.toLowerCase().includes(searchTerm.toLowerCase()) ||
        img.public_id.toLowerCase().includes(searchTerm.toLowerCase())
      )
      .map(img => img.secure_url)
      .slice(0, maxSelection);
    
    onImagesSelected(visibleImageUrls);
  };

  const handleClearSelection = () => {
    onImagesSelected([]);
  };

  const filteredImages = images.filter(img => 
    !searchTerm || 
    img.filename.toLowerCase().includes(searchTerm.toLowerCase()) ||
    img.public_id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <ImageIcon className="h-5 w-5" />
          Cloudinary Image Browser
          {selectedImages.length > 0 && (
            <Badge variant="secondary">
              {selectedImages.length} selected
            </Badge>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Controls */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search images..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          <div className="flex gap-2">
            <Button
              onClick={() => fetchImages(true)}
              variant="outline"
              size="sm"
              disabled={loading}
            >
              <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
              Refresh
            </Button>
            <Button
              onClick={handleSelectAll}
              variant="outline"
              size="sm"
              disabled={filteredImages.length === 0}
            >
              Select All
            </Button>
            <Button
              onClick={handleClearSelection}
              variant="outline"
              size="sm"
              disabled={selectedImages.length === 0}
            >
              Clear
            </Button>
          </div>
        </div>

        {/* Folder Filter */}
        <div>
          <Input
            placeholder="Filter by folder (e.g., avenzo_products)"
            value={folder}
            onChange={(e) => setFolder(e.target.value)}
          />
        </div>

        {/* Images Grid */}
        {loading && images.length === 0 ? (
          <div className="flex items-center justify-center py-12">
            <div className="text-center space-y-4">
              <Loader2 className="h-8 w-8 animate-spin mx-auto text-primary" />
              <p className="text-muted-foreground">Loading images from Cloudinary...</p>
            </div>
          </div>
        ) : filteredImages.length === 0 ? (
          <div className="text-center py-12">
            <ImageIcon className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <p className="text-muted-foreground">
              {searchTerm ? 'No images match your search' : 'No images found in Cloudinary'}
            </p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {filteredImages.map((image) => {
                const isSelected = selectedImages.includes(image.secure_url);
                return (
                  <div
                    key={image.public_id}
                    className={`relative group cursor-pointer border-2 rounded-lg overflow-hidden transition-all ${
                      isSelected 
                        ? 'border-primary bg-primary/5' 
                        : 'border-transparent hover:border-primary/50'
                    }`}
                    onClick={() => handleImageToggle(image.secure_url)}
                  >
                    <div className="aspect-square">
                      <img
                        src={image.thumbnail}
                        alt={image.filename}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    </div>
                    
                    {/* Selection Overlay */}
                    <div className={`absolute inset-0 flex items-center justify-center transition-opacity ${
                      isSelected ? 'bg-primary/20' : 'bg-black/0 group-hover:bg-black/20'
                    }`}>
                      {isSelected ? (
                        <div className="bg-primary text-primary-foreground rounded-full p-2">
                          <Check className="h-4 w-4" />
                        </div>
                      ) : (
                        <div className="opacity-0 group-hover:opacity-100 bg-white/90 text-foreground rounded-full p-2">
                          <Check className="h-4 w-4" />
                        </div>
                      )}
                    </div>

                    {/* Image Info */}
                    <div className="absolute bottom-0 left-0 right-0 bg-black/70 text-white p-2 text-xs opacity-0 group-hover:opacity-100 transition-opacity">
                      <p className="truncate font-medium">{image.filename}</p>
                      <p className="text-white/80">
                        {image.width}×{image.height} • {formatFileSize(image.bytes)}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Load More */}
            {hasMore && (
              <div className="text-center">
                <Button
                  onClick={() => fetchImages(false)}
                  variant="outline"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Loading...
                    </>
                  ) : (
                    'Load More Images'
                  )}
                </Button>
              </div>
            )}
          </>
        )}

        {/* Selection Summary */}
        {selectedImages.length > 0 && (
          <div className="bg-secondary/50 p-4 rounded-lg">
            <h4 className="font-medium mb-2">Selected Images ({selectedImages.length}/{maxSelection})</h4>
            <div className="grid grid-cols-6 sm:grid-cols-8 md:grid-cols-10 gap-2">
              {selectedImages.map((url, index) => (
                <div key={url} className="relative group">
                  <img
                    src={url}
                    alt={`Selected ${index + 1}`}
                    className="w-full aspect-square object-cover rounded border"
                  />
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleImageToggle(url);
                    }}
                    className="absolute -top-1 -right-1 bg-destructive text-destructive-foreground rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};