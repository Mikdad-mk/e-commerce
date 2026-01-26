"use client";

import { useState } from "react";
import { CreditCard, Lock, Truck, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useCart } from "@/hooks/use-cart";
import { toast } from "sonner";
import { loadStripe } from "@stripe/stripe-js";

// Initialize Stripe
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

export const CheckoutPage = () => {
  const { items, getTotalPrice } = useCart();
  const [isProcessing, setIsProcessing] = useState(false);
  const [email, setEmail] = useState("");

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      toast.error("Please enter your email address");
      return;
    }

    setIsProcessing(true);

    try {
      // Create checkout session
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          items,
          customerEmail: email,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to create checkout session');
      }

      // Redirect to Stripe Checkout
      if (data.url) {
        window.location.href = data.url;
      } else {
        throw new Error('No checkout URL received');
      }
    } catch (error) {
      console.error('Checkout error:', error);
      toast.error(error instanceof Error ? error.message : 'Failed to process checkout');
      setIsProcessing(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="container py-16">
        <div className="text-center space-y-6">
          <h1 className="text-2xl font-bold">No items to checkout</h1>
          <p className="text-muted-foreground">
            Your cart is empty. Add some items before proceeding to checkout.
          </p>
          <Button asChild>
            <a href="/shop">Continue Shopping</a>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-6 sm:py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8">Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
          {/* Checkout Info */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Secure Checkout with Stripe</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="flex items-start space-x-3">
                    <Lock className="h-5 w-5 text-blue-600 mt-0.5" />
                    <div className="text-sm text-blue-800">
                      <p className="font-semibold mb-1">Secure Payment</p>
                      <p>Your payment information is encrypted and secure. We use Stripe for payment processing.</p>
                    </div>
                  </div>
                </div>

                <form onSubmit={handleCheckout} className="space-y-4">
                  <div>
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="your@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      We'll send your order confirmation here
                    </p>
                  </div>

                  <div className="space-y-3 pt-4">
                    <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span>Shipping address collected at checkout</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span>Payment details handled securely by Stripe</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span>Worldwide shipping available</span>
                    </div>
                  </div>

                  <Button
                    type="submit"
                    disabled={isProcessing}
                    className="w-full"
                    size="lg"
                  >
                    <Lock className="mr-2 h-4 w-4" />
                    {isProcessing ? "Redirecting to Stripe..." : "Proceed to Payment"}
                  </Button>
                </form>

                <div className="text-center text-xs text-muted-foreground pt-2">
                  <Lock className="inline h-3 w-3 mr-1" />
                  Powered by Stripe - PCI DSS compliant
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <CreditCard className="h-5 w-5" />
                  <span>Accepted Payment Methods</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-4">
                  <div className="text-sm text-muted-foreground">Visa</div>
                  <div className="text-sm text-muted-foreground">Mastercard</div>
                  <div className="text-sm text-muted-foreground">American Express</div>
                  <div className="text-sm text-muted-foreground">Discover</div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Order Summary */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Order Items */}
                <div className="space-y-3 max-h-64 overflow-y-auto">
                  {items.map((item) => (
                    <div key={`${item.id}-${item.selectedColor}`} className="flex items-center space-x-3">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="h-12 w-12 rounded-md object-cover flex-shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-medium truncate">{item.name}</h4>
                        <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                        {item.selectedColor && (
                          <p className="text-xs text-muted-foreground">Color: {item.selectedColor}</p>
                        )}
                      </div>
                      <div className="text-sm font-medium flex-shrink-0">
                        ${(item.price * item.quantity).toFixed(2)}
                      </div>
                    </div>
                  ))}
                </div>

                <Separator />

                {/* Pricing Breakdown */}
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Subtotal</span>
                    <span>${getTotalPrice().toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Shipping</span>
                    <span className="text-green-600">Free</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Tax</span>
                    <span>Calculated at checkout</span>
                  </div>
                  
                  <Separator />
                  
                  <div className="flex justify-between font-semibold text-lg">
                    <span>Total</span>
                    <span>${getTotalPrice().toFixed(2)}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};