"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CheckCircle, Package, Mail, Truck, ArrowRight, Sparkles, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useCart } from "@/hooks/use-cart";

function SuccessContent() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('session_id');
  const { clearCart } = useCart();
  const [cleared, setCleared] = useState(false);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    if (sessionId && !cleared) {
      // Clear cart after successful payment
      clearCart();
      setCleared(true);
    }
    
    // Trigger animations
    setTimeout(() => setShowContent(true), 100);
  }, [sessionId, cleared, clearCart]);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-background via-background to-primary/5">
      <Header />
      <main className="flex-1 relative overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-green-500/5 rounded-full blur-3xl animate-pulse delay-1000" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-3xl animate-pulse delay-500" />
        </div>

        <div className="container py-16 relative z-10">
          <div className="max-w-3xl mx-auto">
            {/* Success Animation */}
            <div className={`transition-all duration-1000 ${showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <Card className="border-2 shadow-2xl">
                <CardContent className="pt-12 pb-12">
                  {/* Animated Check Icon */}
                  <div className="flex justify-center mb-8">
                    <div className="relative">
                      {/* Outer Ring Animation */}
                      <div className="absolute inset-0 rounded-full bg-green-500/20 animate-ping" />
                      <div className="absolute inset-0 rounded-full bg-green-500/10 animate-pulse" />
                      
                      {/* Main Icon */}
                      <div className="relative rounded-full bg-gradient-to-br from-green-400 to-green-600 p-8 shadow-lg transform hover:scale-110 transition-transform duration-300">
                        <CheckCircle className="h-20 w-20 text-white animate-bounce-slow" strokeWidth={2.5} />
                      </div>
                      
                      {/* Sparkles */}
                      <Sparkles className="absolute -top-2 -right-2 h-8 w-8 text-yellow-400 animate-spin-slow" />
                      <Sparkles className="absolute -bottom-2 -left-2 h-6 w-6 text-yellow-400 animate-spin-slow delay-300" />
                    </div>
                  </div>

                  {/* Success Message */}
                  <div className="text-center space-y-4 mb-8">
                    <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-green-600 to-green-400 bg-clip-text text-transparent animate-fade-in">
                      Order Confirmed!
                    </h1>
                    <p className="text-xl text-muted-foreground animate-fade-in delay-200">
                      Thank you for your purchase! 🎉
                    </p>
                    <p className="text-sm text-muted-foreground animate-fade-in delay-300">
                      Your order has been successfully placed and is being processed
                    </p>
                  </div>

                  {/* Order ID */}
                  {sessionId && (
                    <div className="bg-gradient-to-r from-primary/10 to-green-500/10 rounded-xl p-6 mb-8 animate-fade-in delay-400 border border-primary/20">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-muted-foreground mb-1">Order ID</p>
                          <p className="font-mono font-bold text-lg">{sessionId.slice(-12).toUpperCase()}</p>
                        </div>
                        <div className="bg-green-500/20 rounded-full p-3">
                          <Package className="h-6 w-6 text-green-600" />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Status Steps */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                    {[
                      { icon: Mail, title: "Confirmation Sent", desc: "Check your email", delay: "delay-500" },
                      { icon: Package, title: "Processing Order", desc: "Preparing your items", delay: "delay-700" },
                      { icon: Truck, title: "Ready to Ship", desc: "Will notify you soon", delay: "delay-900" },
                    ].map((step, index) => (
                      <div
                        key={index}
                        className={`group relative bg-gradient-to-br from-background to-primary/5 rounded-xl p-6 border-2 border-primary/10 hover:border-primary/30 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 animate-fade-in ${step.delay}`}
                      >
                        <div className="flex flex-col items-center text-center space-y-3">
                          <div className="bg-primary/10 rounded-full p-4 group-hover:bg-primary/20 transition-colors">
                            <step.icon className="h-6 w-6 text-primary" />
                          </div>
                          <div>
                            <p className="font-semibold text-sm mb-1">{step.title}</p>
                            <p className="text-xs text-muted-foreground">{step.desc}</p>
                          </div>
                        </div>
                        
                        {/* Connecting Line (except last item) */}
                        {index < 2 && (
                          <div className="hidden md:block absolute top-1/2 -right-2 w-4 h-0.5 bg-gradient-to-r from-primary/30 to-transparent" />
                        )}
                      </div>
                    ))}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-4 animate-fade-in delay-1000">
                    <Button asChild size="lg" className="flex-1 group shadow-lg hover:shadow-xl transition-all">
                      <a href="/shop" className="flex items-center justify-center">
                        Continue Shopping
                        <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </a>
                    </Button>
                    <Button variant="outline" asChild size="lg" className="flex-1 group border-2 hover:border-primary/50">
                      <a href="/" className="flex items-center justify-center">
                        Back to Home
                      </a>
                    </Button>
                  </div>

                  {/* Additional Info */}
                  <div className="mt-8 pt-8 border-t border-border/50 animate-fade-in delay-1100">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-muted-foreground">
                      <div className="flex items-start space-x-3">
                        <div className="bg-blue-500/10 rounded-full p-2 mt-0.5">
                          <Mail className="h-4 w-4 text-blue-600" />
                        </div>
                        <div>
                          <p className="font-semibold text-foreground mb-1">Email Confirmation</p>
                          <p>We've sent order details to your email address</p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <div className="bg-purple-500/10 rounded-full p-2 mt-0.5">
                          <Truck className="h-4 w-4 text-purple-600" />
                        </div>
                        <div>
                          <p className="font-semibold text-foreground mb-1">Shipping Updates</p>
                          <p>Track your order status via email notifications</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Floating Confetti Effect */}
            <div className="fixed inset-0 pointer-events-none overflow-hidden">
              {[...Array(20)].map((_, i) => (
                <div
                  key={i}
                  className="absolute animate-confetti"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `-${Math.random() * 20}%`,
                    animationDelay: `${Math.random() * 3}s`,
                    animationDuration: `${3 + Math.random() * 2}s`,
                  }}
                >
                  <div
                    className="w-2 h-2 rounded-full"
                    style={{
                      backgroundColor: ['#10b981', '#3b82f6', '#f59e0b', '#ec4899', '#8b5cf6'][Math.floor(Math.random() * 5)],
                    }}
                  />
                </div>
              ))}
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
