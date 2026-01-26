"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CheckCircle, Package, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useCart } from "@/hooks/use-cart";

export default function CheckoutSuccess() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('session_id');
  const { clearCart } = useCart();
  const [cleared, setCleared] = useState(false);

  useEffect(() => {
    if (sessionId && !cleared) {
      // Clear cart after successful payment
      clearCart();
      setCleared(true);
    }
  }, [sessionId, cleared, clearCart]);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1">
        <div className="container py-16">
          <div className="max-w-2xl mx-auto">
            <Card>
              <CardContent className="pt-12 pb-12 text-center space-y-6">
                <div className="flex justify-center">
                  <div className="rounded-full bg-green-100 p-6">
                    <CheckCircle className="h-16 w-16 text-green-600" />
                  </div>
                </div>

                <div className="space-y-2">
                  <h1 className="text-3xl font-bold">Order Confirmed!</h1>
                  <p className="text-muted-foreground text-lg">
                    Thank you for your purchase
                  </p>
                </div>

                {sessionId && (
                  <div className="bg-secondary/50 rounded-lg p-4">
                    <p className="text-sm text-muted-foreground">
                      Order ID: <span className="font-mono font-semibold">{sessionId.slice(-12)}</span>
                    </p>
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-6">
                  <div className="flex items-start space-x-3 text-left">
                    <Mail className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <p className="font-semibold text-sm">Confirmation Email</p>
                      <p className="text-sm text-muted-foreground">
                        Check your inbox for order details
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3 text-left">
                    <Package className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <p className="font-semibold text-sm">Shipping Updates</p>
                      <p className="text-sm text-muted-foreground">
                        We'll notify you when it ships
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 pt-6">
                  <Button asChild className="flex-1">
                    <a href="/shop">Continue Shopping</a>
                  </Button>
                  <Button variant="outline" asChild className="flex-1">
                    <a href="/">Back to Home</a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
