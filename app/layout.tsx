import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Providers } from "./providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Haven | Home & Household Essentials",
  description: "Discover premium household products for your home. Quality kitchen, living room, bedroom & bathroom essentials. Shop Haven for curated home goods delivered to your door.",
  keywords: "home goods, household products, kitchen accessories, home decor, bathroom essentials, living room decor",
  authors: [{ name: "Haven" }],
  openGraph: {
    title: "Haven | Home & Household Essentials",
    description: "Discover premium household products for your home. Quality essentials for every room.",
    type: "website",
    images: ["https://lovable.dev/opengraph-image-p98pqg.png"],
  },
  twitter: {
    card: "summary_large_image",
    site: "@HavenHome",
    images: ["https://lovable.dev/opengraph-image-p98pqg.png"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}