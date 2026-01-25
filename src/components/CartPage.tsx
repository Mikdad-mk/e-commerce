"use client";

import { useState } from "react";
import { Minus, Plus, Trash2, ShoppingBag, Shield, Truck, Star, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useCart } from "@/hooks/use-cart";
import { cn } from "@/lib/utils";

export const CartPage = () => {
  const { items, updateQuantity, removeFromCart, getTotalPrice, clearCart } = useCart();
  const [isLoading, setIsLoading] = useState(false);

  const handleQuantityChange = (id: string, newQuantity: number) => {
    updateQuantity(id, newQuantity);
  };

  const handleRemoveItem = (id: string) => {
    removeFromCart(id);
  };

  const handleCheckout = () => {
    setIsLoading(true);
    // Simulate checkout process
    setTimeout(() => {
      setIsLoading(false);
      // Redirect to checkout page
      window.location.href = "/checkout";
    }, 1000);
  };

  if (items.length === 0) {
    return (
      <div className="container py-16">
        <div className="text-center space-y-6">
          <ShoppingBag className="mx-auto h-24 w-24 text-muted-foreground" />
          <div className="space-y-2">
            <h1 className="text-2xl font-bold">Your cart is empty</h1>
            <p className="text-muted-foreground">
              Looks like you haven't added anything to your cart yet.
            </p>
          </div>
          <Link href="/">
            <Button size="lg">Continue Shopping</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-6 sm:py-8">
      <div className="space-y-6 sm:space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-2">
            <h1 className="text-2xl sm:text-3xl font-bold">Shopping Cart</h1>
            <p className="text-muted-foreground">
              {items.length} {items.length === 1 ? "item" : "items"} in your cart
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Shield className="h-4 w-4 text-green-500" />
              <span>Secure checkout</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Truck className="h-4 w-4 text-blue-500" />
              <span>Free shipping</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <Card key={`${item.id}-${item.selectedColor}`}>
                <CardContent className="p-4 sm:p-6">
                  <div className="flex flex-col sm:flex-row items-start space-y-4 sm:space-y-0 sm:space-x-4">
                    {/* Product Image */}
                    <div className="flex-shrink-0 w-full sm:w-auto">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="h-32 w-full sm:h-24 sm:w-24 rounded-md object-cover"
                      />
                    </div>

                    {/* Product Details */}
                    <div className="flex-1 space-y-2 w-full">
                      <div className="flex flex-col sm:flex-row items-start justify-between space-y-2 sm:space-y-0">
                        <div className="w-full sm:w-auto">
                          <h3 className="font-medium">{item.name}</h3>
                          {item.selectedColor && (
                            <div className="flex items-center space-x-2 mt-1">
                              <span className="text-sm text-muted-foreground">Color:</span>
                              <div
                                className="h-4 w-4 rounded-full border border-border"
                                style={{ backgroundColor: item.selectedColor }}
                              />
                            </div>
                          )}
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleRemoveItem(item.id)}
                          className="text-muted-foreground hover:text-destructive self-end sm:self-start"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>

                      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-3 sm:space-y-0">
                        {/* Quantity Controls */}
                        <div className="flex items-center border rounded-md">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                            disabled={item.quantity <= 1}
                            className="h-8 w-8"
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <span className="w-12 text-center text-sm font-medium">
                            {item.quantity}
                          </span>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                            className="h-8 w-8"
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>

                        {/* Price */}
                        <div className="text-left sm:text-right">
                          <div className="font-semibold">
                            ${(item.price * item.quantity).toFixed(2)}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            ${item.price.toFixed(2)} each
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Order Summary */}
          <div className="space-y-6">
            <Card>
              <CardContent className="p-6 space-y-4">
                <h2 className="text-lg font-semibold">Order Summary</h2>
                
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
                    <span>${(getTotalPrice() * 0.08).toFixed(2)}</span>
                  </div>
                  
                  <Separator />
                  
                  <div className="flex justify-between font-semibold">
                    <span>Total</span>
                    <span>${(getTotalPrice() * 1.08).toFixed(2)}</span>
                  </div>
                </div>

                <Button 
                  onClick={handleCheckout}
                  disabled={isLoading}
                  className="w-full"
                  size="lg"
                >
                  {isLoading ? "Processing..." : "Proceed to Checkout"}
                </Button>

                <div className="text-center">
                  <Link href="/" className="text-sm text-primary hover:underline">
                    Continue Shopping
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};