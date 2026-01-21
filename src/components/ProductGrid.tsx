"use client";

import { ProductCard } from "./ProductCard";

const products = [
  {
    id: "1",
    name: "Artisan Ceramic Vase",
    price: 48.00,
    image: "/assets/products/ceramic-vase.jpg",
    colors: ["#F5F5DC", "#D2B48C", "#8B4513"],
    isNew: true,
  },
  {
    id: "2",
    name: "Linen Throw Blanket",
    price: 65.00,
    image: "/assets/products/linen-blanket.jpg",
    colors: ["#FFFFF0", "#D2B48C", "#808080"],
  },
  {
    id: "3",
    name: "Oak Cutting Board",
    price: 38.00,
    originalPrice: 52.00,
    image: "/assets/products/cutting-board.jpg",
    colors: ["#DEB887", "#8B4513"],
    onSale: true,
  },
  {
    id: "4",
    name: "Luxury Scented Candle",
    price: 32.00,
    image: "/assets/products/scented-candle.jpg",
    colors: ["#FFFFF0", "#FFF8DC", "#FAF0E6"],
  },
  {
    id: "5",
    name: "Artisan Mug Set",
    price: 45.00,
    image: "/assets/products/ceramic-mugs.jpg",
    colors: ["#D2B48C", "#F5DEB3", "#8B4513"],
    isNew: true,
  },
  {
    id: "6",
    name: "Brass Table Lamp",
    price: 89.00,
    image: "/assets/products/table-lamp.jpg",
    colors: ["#D4AF37", "#C0C0C0"],
  },
  {
    id: "7",
    name: "Cotton Bath Towel Set",
    price: 55.00,
    originalPrice: 72.00,
    image: "/assets/products/bath-towels.jpg",
    colors: ["#FFFFF0", "#F5F5DC", "#D3D3D3"],
    onSale: true,
  },
  {
    id: "8",
    name: "Rattan Storage Basket",
    price: 42.00,
    image: "/assets/products/storage-basket.jpg",
    colors: ["#D2B48C", "#8B4513"],
  },
];

export const ProductGrid = () => {
  return (
    <section className="container py-8 md:py-12">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} {...product} />
        ))}
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-center gap-2 mt-12">
        <button className="flex h-10 w-10 items-center justify-center rounded-full bg-foreground text-background text-sm font-medium">
          1
        </button>
        <button className="flex h-10 w-10 items-center justify-center rounded-full text-foreground hover:bg-muted text-sm font-medium transition-colors">
          2
        </button>
        <button className="flex h-10 w-10 items-center justify-center rounded-full text-foreground hover:bg-muted text-sm font-medium transition-colors">
          3
        </button>
        <button className="flex h-10 w-10 items-center justify-center rounded-full text-foreground hover:bg-muted text-sm font-medium transition-colors">
          4
        </button>
        <button className="flex h-10 w-10 items-center justify-center rounded-full text-foreground hover:bg-muted text-sm font-medium transition-colors">
          →
        </button>
      </div>
    </section>
  );
};
