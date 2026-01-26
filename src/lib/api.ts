// API configuration and types
export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  images?: string[];
  colors?: string[];
  isNewProduct?: boolean;
  onSale?: boolean;
  description: string;
  features?: string[];
  dimensions?: string;
  material?: string;
  care?: string;
  inStock: boolean;
  stockCount?: number;
  category?: string;
  brand?: string;
  rating?: number;
  reviews?: number;
  createdAt?: string;
  updatedAt?: string;
}

// API Configuration
const API_CONFIG = {
  // Replace with your actual API endpoint (currently using placeholder)
  BASE_URL: process.env.NEXT_PUBLIC_API_URL || 'https://api.placeholder.com/api',
  ENDPOINTS: {
    PRODUCTS: '/products',
    PRODUCT_BY_ID: '/products',
    CATEGORIES: '/categories',
    UPLOAD: '/upload'
  },
  // Add your API key if required
  API_KEY: process.env.NEXT_PUBLIC_API_KEY || '',
  // Enable local-only mode when no real API is configured
  LOCAL_ONLY: !process.env.NEXT_PUBLIC_API_URL || process.env.NEXT_PUBLIC_API_URL.includes('placeholder'),
};

// API Client class
class ApiClient {
  private baseUrl: string;
  private apiKey: string;
  private localOnly: boolean;

  constructor() {
    this.baseUrl = API_CONFIG.BASE_URL;
    this.apiKey = API_CONFIG.API_KEY;
    this.localOnly = API_CONFIG.LOCAL_ONLY;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    // Skip external API calls in local-only mode
    if (this.localOnly) {
      throw new Error('Local-only mode: External API disabled');
    }

    const url = `${this.baseUrl}${endpoint}`;
    
    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...(this.apiKey && { 'Authorization': `Bearer ${this.apiKey}` }),
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        throw new Error(`API Error: ${response.status} ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('API Request failed:', error);
      throw error;
    }
  }

  // Get all products
  async getProducts(params?: {
    page?: number;
    limit?: number;
    category?: string;
    search?: string;
  }): Promise<{ products: Product[]; total: number; page: number; totalPages: number }> {
    const searchParams = new URLSearchParams();
    
    if (params?.page) searchParams.append('page', params.page.toString());
    if (params?.limit) searchParams.append('limit', params.limit.toString());
    if (params?.category) searchParams.append('category', params.category);
    if (params?.search) searchParams.append('search', params.search);

    const endpoint = `${API_CONFIG.ENDPOINTS.PRODUCTS}?${searchParams.toString()}`;
    return this.request<{ products: Product[]; total: number; page: number; totalPages: number }>(endpoint);
  }

  // Get single product by ID
  async getProductById(id: string): Promise<Product> {
    const endpoint = `${API_CONFIG.ENDPOINTS.PRODUCT_BY_ID}/${id}`;
    return this.request<Product>(endpoint);
  }

  // Get categories
  async getCategories(): Promise<string[]> {
    return this.request<string[]>(API_CONFIG.ENDPOINTS.CATEGORIES);
  }

  // Upload image (if your API supports it)
  async uploadImage(file: File): Promise<{ url: string }> {
    const formData = new FormData();
    formData.append('image', file);

    return this.request<{ url: string }>(API_CONFIG.ENDPOINTS.UPLOAD, {
      method: 'POST',
      headers: {
        // Remove Content-Type to let browser set it for FormData
        ...(this.apiKey && { 'Authorization': `Bearer ${this.apiKey}` }),
      },
      body: formData,
    });
  }
}

// Create singleton instance
export const apiClient = new ApiClient();

// Fallback data (used when API is not available)
export const fallbackProducts: Product[] = [
  {
    id: "1",
    name: "Artisan Ceramic Vase",
    price: 48.00,
    image: "/assets/products/ceramic-vase.jpg",
    images: [
      "/assets/products/ceramic-vase.jpg",
      "/assets/products/ceramic-vase.jpg",
      "/assets/products/ceramic-vase.jpg"
    ],
    colors: ["#F5F5DC", "#D2B48C", "#8B4513"],
    isNew: true,
    description: "Handcrafted ceramic vase with a beautiful glazed finish. Perfect for displaying fresh flowers or as a standalone decorative piece.",
    features: [
      "Handcrafted ceramic construction",
      "Glazed finish for durability",
      "Perfect for fresh or dried flowers",
      "Unique artisan design",
      "Easy to clean"
    ],
    dimensions: "Height: 12 inches, Diameter: 6 inches",
    material: "High-quality ceramic with glazed finish",
    care: "Hand wash with mild soap. Avoid harsh chemicals.",
    inStock: true,
    stockCount: 15,
    category: "Decor",
    brand: "Avenzo",
    rating: 4.5,
    reviews: 24
  },
  {
    id: "2",
    name: "Linen Throw Blanket",
    price: 65.00,
    image: "/assets/products/linen-blanket.jpg",
    images: [
      "/assets/products/linen-blanket.jpg",
      "/assets/products/linen-blanket.jpg",
      "/assets/products/linen-blanket.jpg"
    ],
    colors: ["#FFFFF0", "#D2B48C", "#808080"],
    description: "Luxurious linen throw blanket that adds warmth and style to any room. Made from premium European linen.",
    features: [
      "100% European linen",
      "Breathable and temperature regulating",
      "Gets softer with each wash",
      "Versatile home decor piece",
      "Hypoallergenic"
    ],
    dimensions: "60 x 80 inches",
    material: "100% European linen",
    care: "Machine wash cold, tumble dry low",
    inStock: true,
    stockCount: 8,
    category: "Textiles",
    brand: "Avenzo",
    rating: 4.8,
    reviews: 18
  },
  {
    id: "3",
    name: "Bamboo Cutting Board",
    price: 32.00,
    originalPrice: 45.00,
    image: "/assets/products/cutting-board.jpg",
    images: [
      "/assets/products/cutting-board.jpg",
      "/assets/products/cutting-board.jpg",
      "/assets/products/cutting-board.jpg"
    ],
    colors: ["#DEB887", "#8B4513"],
    onSale: true,
    description: "Sustainable bamboo cutting board with natural antimicrobial properties. Perfect for food preparation.",
    features: [
      "Sustainable bamboo construction",
      "Natural antimicrobial properties",
      "Knife-friendly surface",
      "Easy to clean and maintain",
      "Eco-friendly choice"
    ],
    dimensions: "18 x 12 x 1.5 inches",
    material: "Premium bamboo",
    care: "Hand wash with mild soap, oil monthly",
    inStock: true,
    stockCount: 22,
    category: "Kitchen",
    brand: "Avenzo",
    rating: 4.6,
    reviews: 31
  },
  {
    id: "4",
    name: "Scented Soy Candle",
    price: 28.00,
    image: "/assets/products/scented-candle.jpg",
    images: [
      "/assets/products/scented-candle.jpg",
      "/assets/products/scented-candle.jpg",
      "/assets/products/scented-candle.jpg"
    ],
    colors: ["#FFFFFF", "#F5F5DC", "#FFB6C1"],
    isNew: true,
    description: "Hand-poured soy candle with natural essential oils. Creates a warm, inviting atmosphere.",
    features: [
      "100% natural soy wax",
      "Essential oil fragrance",
      "45-hour burn time",
      "Clean burning, no soot",
      "Reusable glass container"
    ],
    dimensions: "4 x 4 x 3 inches",
    material: "Soy wax, cotton wick, glass",
    care: "Trim wick to 1/4 inch before each use",
    inStock: true,
    stockCount: 18,
    category: "Decor",
    brand: "Avenzo",
    rating: 4.7,
    reviews: 42
  },
  {
    id: "5",
    name: "Ceramic Coffee Mugs Set",
    price: 42.00,
    image: "/assets/products/ceramic-mugs.jpg",
    images: [
      "/assets/products/ceramic-mugs.jpg",
      "/assets/products/ceramic-mugs.jpg",
      "/assets/products/ceramic-mugs.jpg"
    ],
    colors: ["#FFFFFF", "#000000", "#4169E1", "#228B22"],
    description: "Set of 4 handcrafted ceramic mugs. Perfect for your morning coffee or evening tea.",
    features: [
      "Set of 4 matching mugs",
      "Handcrafted ceramic",
      "Microwave and dishwasher safe",
      "Comfortable handle design",
      "12 oz capacity each"
    ],
    dimensions: "4.5 x 3.5 x 4 inches each",
    material: "High-quality ceramic",
    care: "Dishwasher safe, microwave safe",
    inStock: true,
    stockCount: 12,
    category: "Kitchen",
    brand: "Avenzo",
    rating: 4.4,
    reviews: 28
  },
  {
    id: "6",
    name: "Woven Storage Basket",
    price: 38.00,
    image: "/assets/products/storage-basket.jpg",
    images: [
      "/assets/products/storage-basket.jpg",
      "/assets/products/storage-basket.jpg",
      "/assets/products/storage-basket.jpg"
    ],
    colors: ["#DEB887", "#8B4513", "#FFFFFF"],
    description: "Handwoven storage basket made from natural materials. Perfect for organizing and home decor.",
    features: [
      "Handwoven natural materials",
      "Sturdy construction",
      "Versatile storage solution",
      "Decorative and functional",
      "Easy to clean"
    ],
    dimensions: "14 x 10 x 8 inches",
    material: "Natural woven fibers",
    care: "Spot clean with damp cloth",
    inStock: true,
    stockCount: 9,
    category: "Storage",
    brand: "Avenzo",
    rating: 4.3,
    reviews: 19
  },
  {
    id: "7",
    name: "Premium Bath Towels",
    price: 55.00,
    originalPrice: 75.00,
    image: "/assets/products/bath-towels.jpg",
    images: [
      "/assets/products/bath-towels.jpg",
      "/assets/products/bath-towels.jpg",
      "/assets/products/bath-towels.jpg"
    ],
    colors: ["#FFFFFF", "#F5F5DC", "#708090", "#8B4513"],
    onSale: true,
    description: "Set of 2 premium cotton bath towels. Ultra-soft and highly absorbent for luxury comfort.",
    features: [
      "Set of 2 bath towels",
      "100% premium cotton",
      "Ultra-soft and absorbent",
      "Quick-drying technology",
      "Machine washable"
    ],
    dimensions: "30 x 56 inches each",
    material: "100% premium cotton",
    care: "Machine wash warm, tumble dry low",
    inStock: true,
    stockCount: 16,
    category: "Textiles",
    brand: "Avenzo",
    rating: 4.9,
    reviews: 67
  },
  {
    id: "8",
    name: "Modern Table Lamp",
    price: 89.00,
    image: "/assets/products/table-lamp.jpg",
    images: [
      "/assets/products/table-lamp.jpg",
      "/assets/products/table-lamp.jpg",
      "/assets/products/table-lamp.jpg"
    ],
    colors: ["#000000", "#FFFFFF", "#C0C0C0"],
    isNew: true,
    description: "Contemporary table lamp with adjustable brightness. Perfect for reading or ambient lighting.",
    features: [
      "Adjustable brightness levels",
      "Modern minimalist design",
      "Energy-efficient LED",
      "Touch control operation",
      "Stable weighted base"
    ],
    dimensions: "8 x 8 x 18 inches",
    material: "Metal base, fabric shade",
    care: "Dust with soft cloth, avoid moisture",
    inStock: true,
    stockCount: 7,
    category: "Lighting",
    brand: "Avenzo",
    rating: 4.6,
    reviews: 33
  }
];

// Helper function to get products with fallback
export async function getProductsWithFallback(params?: {
  page?: number;
  limit?: number;
  category?: string;
  search?: string;
}): Promise<{ products: Product[]; total: number; page: number; totalPages: number }> {
  // Skip API call if in local-only mode
  if (API_CONFIG.LOCAL_ONLY) {
    return getLocalProducts(params);
  }

  try {
    return await apiClient.getProducts(params);
  } catch (error) {
    console.warn('External API unavailable, using local data');
    return getLocalProducts(params);
  }
}

// Helper function to get single product with fallback
export async function getProductByIdWithFallback(id: string): Promise<Product | null> {
  // Skip external API call if in local-only mode
  if (API_CONFIG.LOCAL_ONLY) {
    // Try local API first (works on both client and server)
    const localApiProduct = await getProductFromLocalAPI(id);
    if (localApiProduct) return localApiProduct;
    
    // Then try localStorage (client-side only)
    return getLocalProductById(id);
  }

  try {
    return await apiClient.getProductById(id);
  } catch (error) {
    console.warn('External API unavailable, using local data');
    
    // Try local API first
    const localApiProduct = await getProductFromLocalAPI(id);
    if (localApiProduct) return localApiProduct;
    
    // Then try localStorage
    return getLocalProductById(id);
  }
}

// Local data functions
function getLocalProducts(params?: {
  page?: number;
  limit?: number;
  category?: string;
  search?: string;
}): { products: Product[]; total: number; page: number; totalPages: number } {
  let allProducts: Product[] = [];
  
  // Only load products from localStorage (admin-created products with Cloudinary images)
  if (typeof window !== 'undefined') {
    try {
      const storedProducts = JSON.parse(localStorage.getItem('avenzo_products') || '[]');
      if (storedProducts && Array.isArray(storedProducts) && storedProducts.length > 0) {
        allProducts = [...storedProducts];
        console.log('Loaded admin products from localStorage:', storedProducts.length);
      } else {
        console.log('No admin products found in localStorage');
      }
    } catch (e) {
      console.warn('Failed to load products from localStorage:', e);
    }
  }
  
  // No fallback products - only show admin-created products with Cloudinary images
  
  // Filter products based on params
  let filteredProducts = allProducts;
  
  if (params?.category) {
    filteredProducts = filteredProducts.filter(p => 
      p.category?.toLowerCase() === params.category?.toLowerCase()
    );
  }
  
  if (params?.search) {
    const searchTerm = params.search.toLowerCase();
    filteredProducts = filteredProducts.filter(p =>
      p.name.toLowerCase().includes(searchTerm) ||
      p.description.toLowerCase().includes(searchTerm)
    );
  }
  
  const page = params?.page || 1;
  const limit = params?.limit || 10;
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  
  return {
    products: filteredProducts.slice(startIndex, endIndex),
    total: filteredProducts.length,
    page,
    totalPages: Math.ceil(filteredProducts.length / limit)
  };
}

function getLocalProductById(id: string): Product | null {
  // Only check localStorage for admin-created products (client-side only)
  if (typeof window !== 'undefined') {
    try {
      const storedProducts = JSON.parse(localStorage.getItem('avenzo_products') || '[]');
      const storedProduct = storedProducts.find((p: Product) => p.id === id);
      if (storedProduct) {
        console.log('Found admin product in localStorage:', storedProduct.name);
        return storedProduct;
      }
    } catch (e) {
      console.warn('Failed to load product from localStorage:', e);
    }
  }
  
  // No fallback products - only admin-created products with Cloudinary images
  console.log('Product not found:', id);
  return null;
}

// Helper function to get product from local API endpoint
async function getProductFromLocalAPI(id: string): Promise<Product | null> {
  try {
    const response = await fetch(`/api/products/${id}`);
    if (response.ok) {
      return await response.json();
    } else if (response.status === 404) {
      const errorData = await response.json();
      // If it requires client-side lookup, return null so we can try localStorage
      if (errorData.requiresClientLookup) {
        return null;
      }
    }
    return null;
  } catch (error) {
    console.warn('Local API unavailable:', error);
    return null;
  }
}