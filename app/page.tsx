import { Header } from "@/components/Header";
import { HeroBanner } from "@/components/HeroBanner";
import { FilterBar } from "@/components/FilterBar";
import { ProductGrid } from "@/components/ProductGrid";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1">
        <HeroBanner />
        <FilterBar />
        <ProductGrid />
      </main>
      <Footer />
    </div>
  );
}