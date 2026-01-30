"use client";

import { useState } from "react";
import { Lock, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useCart } from "@/hooks/use-cart";
import { toast } from "sonner";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

export const CheckoutPage = () => {
  const { items, getTotalPrice } = useCart();
  const [email, setEmail] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

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

  const paypalOptions = {
    clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID!,
    currency: "USD",
    intent: "capture",
  };

  return (
    <div className="container py-6 sm:py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8">Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
          {/* Checkout Info */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Secure Checkout with PayPal</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="flex items-start space-x-3">
                    <Lock className="h-5 w-5 text-blue-600 mt-0.5" />
                    <div className="text-sm text-blue-800">
                      <p className="font-semibold mb-1">Secure Payment</p>
                      <p>Your payment is processed securely through PayPal. You can pay with your PayPal account or credit/debit card.</p>
                    </div>
                  </div>
                </div>

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
                    <span>Secure PayPal checkout</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span>Pay with PayPal or card</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span>Worldwide shipping available</span>
                  </div>
                </div>

                {/* PayPal Buttons */}
                <div className="pt-4">
                  {email ? (
                    <PayPalScriptProvider options={paypalOptions}>
                      <PayPalButtons
                        style={{ layout: "vertical", label: "pay" }}
                        disabled={isProcessing}
                        createOrder={async () => {
                          setIsProcessing(true);
                          try {
                            const response = await fetch('/api/paypal/create-order', {
                              method: 'POST',
                              headers: { 'Content-Type': 'application/json' },
                              body: JSON.stringify({ items }),
                            });
                            const data = await response.json();
                            if (!response.ok) throw new Error(data.error);
                            return data.orderID;
                          } catch (error) {
                            toast.error('Failed to create order');
                            setIsProcessing(false);
                            throw error;
                          }
                        }}
                        onApprove={async (data) => {
                          try {
                            const response = await fetch('/api/paypal/capture-order', {
                              method: 'POST',
                              headers: { 'Content-Type': 'application/json' },
                              body: JSON.stringify({ orderID: data.orderID }),
                            });
                            const result = await response.json();
                            if (!response.ok) throw new Error(result.error);
                            
                            toast.success('Payment successful!');
                            window.location.href = `/checkout/success?order_id=${data.orderID}`;
                          } catch (error) {
                            toast.error('Payment failed');
                            setIsProcessing(false);
                          }
                        }}
                        onError={(err) => {
                          console.error('PayPal error:', err);
                          toast.error('Payment error occurred');
                          setIsProcessing(false);
                        }}
                        onCancel={() => {
                          toast.info('Payment cancelled');
                          setIsProcessing(false);
                        }}
                      />
                    </PayPalScriptProvider>
                  ) : (
                    <div className="text-center p-4 bg-secondary/50 rounded-lg">
                      <p className="text-sm text-muted-foreground">
                        Please enter your email address to continue
                      </p>
                    </div>
                  )}
                </div>

                <div className="text-center text-xs text-muted-foreground pt-2">
                  <Lock className="inline h-3 w-3 mr-1" />
                  Powered by PayPal - Secure payments
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
