import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CartPage } from "@/components/CartPage";

export default function Cart() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1">
        <CartPage />
      </main>
      <Footer />
    </div>
  );
}