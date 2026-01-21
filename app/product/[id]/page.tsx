import { notFound } from "next/navigation";
import { ProductDetail } from "@/components/ProductDetail";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

// This would typically come from a database or API
const products = [
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
    stockCount: 15
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
    stockCount: 8
  },
  {
    id: "3",
    name: "Oak Cutting Board",
    price: 38.00,
    originalPrice: 52.00,
    image: "/assets/products/cutting-board.jpg",
    images: [
      "/assets/products/cutting-board.jpg",
      "/assets/products/cutting-board.jpg",
      "/assets/products/cutting-board.jpg"
    ],
    colors: ["#DEB887", "#8B4513"],
    onSale: true,
    description: "Premium oak cutting board with natural wood grain. Perfect for food preparation and serving.",
    features: [
      "Solid oak construction",
      "Natural antimicrobial properties",
      "Reversible design",
      "Hand-finished edges",
      "Food-safe finish"
    ],
    dimensions: "18 x 12 x 1.5 inches",
    material: "Solid oak wood",
    care: "Hand wash only, oil monthly to maintain finish",
    inStock: true,
    stockCount: 12
  },
  {
    id: "4",
    name: "Luxury Scented Candle",
    price: 32.00,
    image: "/assets/products/scented-candle.jpg",
    images: [
      "/assets/products/scented-candle.jpg",
      "/assets/products/scented-candle.jpg",
      "/assets/products/scented-candle.jpg"
    ],
    colors: ["#FFFFF0", "#FFF8DC", "#FAF0E6"],
    description: "Hand-poured soy wax candle with premium fragrance oils. Creates a warm, inviting atmosphere.",
    features: [
      "100% soy wax",
      "Premium fragrance oils",
      "Cotton wick for clean burn",
      "45-hour burn time",
      "Reusable glass container"
    ],
    dimensions: "4 x 4 x 3 inches",
    material: "Soy wax, cotton wick, glass container",
    care: "Trim wick to 1/4 inch before each use",
    inStock: true,
    stockCount: 20
  },
  {
    id: "5",
    name: "Artisan Mug Set",
    price: 45.00,
    image: "/assets/products/ceramic-mugs.jpg",
    images: [
      "/assets/products/ceramic-mugs.jpg",
      "/assets/products/ceramic-mugs.jpg",
      "/assets/products/ceramic-mugs.jpg"
    ],
    colors: ["#D2B48C", "#F5DEB3", "#8B4513"],
    isNew: true,
    description: "Set of 2 handcrafted ceramic mugs with unique glazed finish. Perfect for your morning coffee or evening tea.",
    features: [
      "Set of 2 mugs",
      "Handcrafted ceramic",
      "Microwave safe",
      "Dishwasher safe",
      "Comfortable handle design"
    ],
    dimensions: "4 x 4 x 4 inches each",
    material: "Ceramic with food-safe glaze",
    care: "Dishwasher safe, microwave safe",
    inStock: true,
    stockCount: 10
  },
  {
    id: "6",
    name: "Brass Table Lamp",
    price: 89.00,
    image: "/assets/products/table-lamp.jpg",
    images: [
      "/assets/products/table-lamp.jpg",
      "/assets/products/table-lamp.jpg",
      "/assets/products/table-lamp.jpg"
    ],
    colors: ["#D4AF37", "#C0C0C0"],
    description: "Elegant brass table lamp with fabric shade. Adds sophisticated lighting to any space.",
    features: [
      "Solid brass base",
      "Fabric lampshade",
      "Standard E26 bulb socket",
      "In-line switch",
      "Weighted base for stability"
    ],
    dimensions: "Height: 24 inches, Base: 6 inches diameter",
    material: "Brass base, fabric shade",
    care: "Dust with soft cloth, avoid harsh chemicals",
    inStock: true,
    stockCount: 5
  },
  {
    id: "7",
    name: "Cotton Bath Towel Set",
    price: 55.00,
    originalPrice: 72.00,
    image: "/assets/products/bath-towels.jpg",
    images: [
      "/assets/products/bath-towels.jpg",
      "/assets/products/bath-towels.jpg",
      "/assets/products/bath-towels.jpg"
    ],
    colors: ["#FFFFF0", "#F5F5DC", "#D3D3D3"],
    onSale: true,
    description: "Luxurious cotton bath towel set. Soft, absorbent, and quick-drying for everyday comfort.",
    features: [
      "Set of 3 towels",
      "100% cotton",
      "Highly absorbent",
      "Quick-drying",
      "Machine washable"
    ],
    dimensions: "Bath towel: 30 x 56 inches",
    material: "100% cotton",
    care: "Machine wash warm, tumble dry medium",
    inStock: true,
    stockCount: 18
  },
  {
    id: "8",
    name: "Rattan Storage Basket",
    price: 42.00,
    image: "/assets/products/storage-basket.jpg",
    images: [
      "/assets/products/storage-basket.jpg",
      "/assets/products/storage-basket.jpg",
      "/assets/products/storage-basket.jpg"
    ],
    colors: ["#D2B48C", "#8B4513"],
    description: "Handwoven rattan storage basket perfect for organizing and adding natural texture to your home.",
    features: [
      "Handwoven rattan",
      "Sturdy construction",
      "Natural finish",
      "Versatile storage solution",
      "Eco-friendly material"
    ],
    dimensions: "16 x 12 x 10 inches",
    material: "Natural rattan",
    care: "Dust regularly, avoid moisture",
    inStock: true,
    stockCount: 7
  }
];

interface ProductPageProps {
  params: {
    id: string;
  };
}

export default function ProductPage({ params }: ProductPageProps) {
  const product = products.find(p => p.id === params.id);

  if (!product) {
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

export async function generateStaticParams() {
  return products.map((product) => ({
    id: product.id,
  }));
}