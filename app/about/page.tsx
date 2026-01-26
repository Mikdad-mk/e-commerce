import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { AboutPage } from "@/components/AboutPage";

export const metadata = {
  title: "About Us | Avenzo",
  description: "AVENZO LLC provides high-quality household products designed to make everyday life easier. Serving customers across the US and UK with reliable products and dependable service.",
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