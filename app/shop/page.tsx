import { Header } from "@/components/Header";
import { ProductGrid } from "@/components/ProductGrid";

export default function Shop() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1">
        <ProductGrid />
      </main>
    </div>
  );
}