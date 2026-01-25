"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Truck, Package, Clock, MapPin, Shield, DollarSign } from "lucide-react";

export const ShippingPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Shipping Information</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Everything you need to know about our shipping options, delivery times, and policies.
          </p>
        </div>

        {/* Shipping Options */}
        <div className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Truck className="h-5 w-5" />
                Shipping Options
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold">Standard Shipping</h3>
                      <Badge variant="secondary">$5.99</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">5-7 business days</p>
                    <p className="text-sm">Perfect for regular orders with no rush.</p>
                  </div>

                  <div className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold">Express Shipping</h3>
                      <Badge variant="secondary">$12.99</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">2-3 business days</p>
                    <p className="text-sm">Faster delivery for when you need it sooner.</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold">Overnight Shipping</h3>
                      <Badge variant="secondary">$24.99</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">1 business day</p>
                    <p className="text-sm">Next day delivery for urgent orders.</p>
                  </div>

                  <div className="border rounded-lg p-4 bg-green-50 border-green-200">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold text-green-800">Free Shipping</h3>
                      <Badge className="bg-green-100 text-green-800">$0.00</Badge>
                    </div>
                    <p className="text-sm text-green-700 mb-2">5-7 business days</p>
                    <p className="text-sm text-green-700">On orders over $75</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Delivery Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Package className="h-5 w-5" />
                Delivery Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold mb-3 flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    Processing Time
                  </h3>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• Orders placed before 2 PM EST ship same day</li>
                    <li>• Orders placed after 2 PM EST ship next business day</li>
                    <li>• Weekend orders ship on Monday</li>
                    <li>• Holiday processing may be delayed</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold mb-3 flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    Delivery Areas
                  </h3>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• United States (all 50 states)</li>
                    <li>• Canada (additional fees may apply)</li>
                    <li>• Alaska & Hawaii (extended delivery time)</li>
                    <li>• PO Boxes and APO/FPO addresses</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Shipping Policies */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Shipping Policies
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-2">Order Tracking</h3>
                  <p className="text-sm text-muted-foreground">
                    Once your order ships, you'll receive a tracking number via email. You can track your package 
                    on our website or directly with the carrier.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">Delivery Attempts</h3>
                  <p className="text-sm text-muted-foreground">
                    Carriers will attempt delivery up to 3 times. If unsuccessful, packages will be held at 
                    the local facility for pickup or returned to us.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">Damaged or Lost Packages</h3>
                  <p className="text-sm text-muted-foreground">
                    If your package arrives damaged or goes missing, please contact us within 48 hours. 
                    We'll work with the carrier to resolve the issue quickly.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">Address Changes</h3>
                  <p className="text-sm text-muted-foreground">
                    Address changes can only be made before the order ships. Once shipped, contact the 
                    carrier directly to arrange delivery changes.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* International Shipping */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="h-5 w-5" />
                Additional Fees
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="border rounded-lg p-4">
                    <h3 className="font-semibold mb-2">Oversized Items</h3>
                    <p className="text-sm text-muted-foreground">
                      Large furniture and oversized items may incur additional shipping fees. 
                      These will be calculated at checkout.
                    </p>
                  </div>

                  <div className="border rounded-lg p-4">
                    <h3 className="font-semibold mb-2">Remote Areas</h3>
                    <p className="text-sm text-muted-foreground">
                      Delivery to remote or rural areas may require additional fees and 
                      extended delivery times.
                    </p>
                  </div>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h3 className="font-semibold text-blue-800 mb-2">Need Help?</h3>
                  <p className="text-sm text-blue-700">
                    Have questions about shipping? Contact our customer service team at 
                    <span className="font-medium"> support@avenzo.co</span> or 
                    <span className="font-medium"> +1 (555) 123-4567</span>.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};