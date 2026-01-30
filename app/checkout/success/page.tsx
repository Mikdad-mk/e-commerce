"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CheckCircle, Package, Mail, Truck, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useCart } from "@/hooks/use-cart";

function SuccessContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get('order_id');
  const { clearCart } = useCart();
  const [cleared, setCleared] = useState(false);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    if (orderId && !cleared) {
      // Clear cart after successful payment
      clearCart();
      setCleared(true);
    }
    
    // Trigger animations
    setTimeout(() => setShowContent(true), 100);
  }, [orderId, cleared, clearCart]);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1">
        <div className="container py-16">
          <div className="max-w-2xl mx-auto">
            {/* Success Animation */}
            <div className={`transition-opacity duration-500 ${showContent ? 'opacity-100' : 'opacity-0'}`}>
              <Card>
                <CardContent className="pt-12 pb-12">
                  {/* Success Icon */}
                  <div className="flex justify-center mb-8">
                    <div className="relative">
                      <div className="rounded-full bg-green-100 p-6">
                        <CheckCircle className="h-16 w-16 text-green-600" strokeWidth={2} />
                      </div>
                    </div>
                  </div>

                  {/* Success Message */}
                  <div className="text-center space-y-3 mb-8">
                    <h1 className="text-3xl font-bold text-foreground">
                      Order Confirmed!
                    </h1>
                    <p className="text-lg text-muted-foreground">
                      Thank you for your purchase
                    </p>
                  </div>

                  {/* Order ID */}
                  {orderId && (
                    <div className="bg-secondary/50 rounded-lg p-4 mb-8">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-muted-foreground mb-1">Order ID</p>
                          <p className="font-mono font-semibold text-base">{orderId.slice(-12).toUpperCase()}</p>
                        </div>
                        <Package className="h-5 w-5 text-primary" />
                      </div>
                    </div>
                  )}

                  {/* Status Steps */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                    {[
                      { icon: Mail, title: "Confirmation Sent", desc: "Check your email" },
                      { icon: Package, title: "Processing Order", desc: "Preparing your items" },
                      { icon: Truck, title: "Ready to Ship", desc: "Will notify you soon" },
                    ].map((step, index) => (
                      <div
                        key={index}
                        className="bg-secondary/30 rounded-lg p-4 border border-border"
                      >
                        <div className="flex flex-col items-center text-center space-y-2">
                          <div className="bg-primary/10 rounded-full p-3">
                            <step.icon className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <p className="font-semibold text-sm">{step.title}</p>
                            <p className="text-xs text-muted-foreground">{step.desc}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Button asChild size="lg" className="flex-1">
                      <a href="/shop">
                        Continue Shopping
                      </a>
                    </Button>
                    <Button variant="outline" asChild size="lg" className="flex-1">
                      <a href="/">
                        Back to Home
                      </a>
                    </Button>
                  </div>

                  {/* Additional Info */}
                  <div className="mt-8 pt-8 border-t">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      <div className="flex items-start space-x-3">
                        <Mail className="h-5 w-5 text-primary mt-0.5" />
                        <div>
                          <p className="font-semibold mb-1">Email Confirmation</p>
                          <p className="text-muted-foreground">Check your inbox for order details</p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <Truck className="h-5 w-5 text-primary mt-0.5" />
                        <div>
                          <p className="font-semibold mb-1">Shipping Updates</p>
                          <p className="text-muted-foreground">We'll notify you when it ships</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default function CheckoutSuccess() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <Loader2 className="h-12 w-12 animate-spin mx-auto text-primary" />
          <p className="text-muted-foreground">Loading order confirmation...</p>
        </div>
      </div>
    }>
      <SuccessContent />
    </Suspense>
  );
}
