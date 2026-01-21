import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CheckoutPage } from "@/components/CheckoutPage";

export default function Checkout() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1">
        <CheckoutPage />
      </main>
      <Footer />
    </div>
  );
}