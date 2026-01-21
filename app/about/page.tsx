import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { AboutPage } from "@/components/AboutPage";

export const metadata = {
  title: "About Us | Avenzo",
  description: "Learn about Avenzo LLC - your trusted online retailer for premium household products. We serve customers internationally through e-commerce and third-party marketplaces.",
};

export default function About() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1">
        <AboutPage />
      </main>
      <Footer />
    </div>
  );
}