"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { RotateCcw, Clock, CreditCard, Package, AlertCircle, CheckCircle, Mail } from "lucide-react";

export const RefundPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Refund Policy</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            We want you to be completely satisfied with your purchase. Here's our comprehensive refund policy.
          </p>
          <p className="text-sm text-muted-foreground mt-2">
            Last updated: January 25, 2026
          </p>
        </div>

        <div className="space-y-8">
          {/* Return Window */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Return Window
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="border rounded-lg p-4 bg-green-50 border-green-200">
                  <div className="flex items-center gap-2 mb-2">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <h3 className="font-semibold text-green-800">Standard Returns</h3>
                  </div>
                  <p className="text-sm text-green-700 mb-2">
                    You have <strong>30 days</strong> from delivery to return most items
                  </p>
                  <ul className="text-xs text-green-600 space-y-1">
                    <li>• Home decor items</li>
                    <li>• Kitchen accessories</li>
                    <li>• Textiles and linens</li>
                    <li>• Storage solutions</li>
                  </ul>
                </div>

                <div className="border rounded-lg p-4 bg-blue-50 border-blue-200">
                  <div className="flex items-center gap-2 mb-2">
                    <Clock className="h-5 w-5 text-blue-600" />
                    <h3 className="font-semibold text-blue-800">Extended Returns</h3>
                  </div>
                  <p className="text-sm text-blue-700 mb-2">
                    <strong>60 days</strong> for select premium items
                  </p>
                  <ul className="text-xs text-blue-600 space-y-1">
                    <li>• Furniture pieces</li>
                    <li>• Large appliances</li>
                    <li>• Premium collections</li>
                    <li>• Custom orders (conditions apply)</li>
                  </ul>
                </div>
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <div className="flex items-start gap-2">
                  <AlertCircle className="h-4 w-4 text-yellow-600 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-yellow-800">Return Window Starts</p>
                    <p className="text-xs text-yellow-700 mt-1">
                      The return period begins on the day you receive your item, not when you place the order.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Return Conditions */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Package className="h-5 w-5" />
                Return Conditions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="font-semibold mb-3 text-green-800">✓ Eligible for Return</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• Items in original condition</li>
                    <li>• Unused and unworn products</li>
                    <li>• Original packaging included</li>
                    <li>• All tags and labels attached</li>
                  </ul>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• No signs of wear or damage</li>
                    <li>• All accessories included</li>
                    <li>• Original receipt or order number</li>
                    <li>• Items not on exclusion list</li>
                  </ul>
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-3 text-red-800">✗ Not Eligible for Return</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• Personalized or custom items</li>
                    <li>• Perishable goods</li>
                    <li>• Intimate or sanitary products</li>
                    <li>• Digital downloads</li>
                  </ul>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• Items damaged by misuse</li>
                    <li>• Products past return window</li>
                    <li>• Final sale items</li>
                    <li>• Gift cards</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Return Process */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <RotateCcw className="h-5 w-5" />
                How to Return Items
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-primary font-bold">1</span>
                  </div>
                  <h3 className="font-semibold mb-2">Initiate Return</h3>
                  <p className="text-sm text-muted-foreground">
                    Contact us or use your account to start a return request
                  </p>
                </div>

                <div className="text-center">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-primary font-bold">2</span>
                  </div>
                  <h3 className="font-semibold mb-2">Pack & Ship</h3>
                  <p className="text-sm text-muted-foreground">
                    Pack items securely and ship using our prepaid label
                  </p>
                </div>

                <div className="text-center">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-primary font-bold">3</span>
                  </div>
                  <h3 className="font-semibold mb-2">Get Refund</h3>
                  <p className="text-sm text-muted-foreground">
                    Receive your refund within 5-7 business days
                  </p>
                </div>
              </div>

              <div className="border-t pt-6">
                <h3 className="font-semibold mb-3">Return Methods</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="border rounded-lg p-4">
                    <h4 className="font-medium mb-2">Online Return Portal</h4>
                    <p className="text-sm text-muted-foreground">
                      Log into your account and select "Return Items" from your order history.
                    </p>
                  </div>
                  <div className="border rounded-lg p-4">
                    <h4 className="font-medium mb-2">Contact Customer Service</h4>
                    <p className="text-sm text-muted-foreground">
                      Call us at +1 (555) 123-4567 or email support@avenzo.co
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Refund Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="h-5 w-5" />
                Refund Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="font-semibold mb-3">Refund Timeline</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="text-sm font-medium">Processing Time</span>
                    <Badge variant="secondary">1-2 business days</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="text-sm font-medium">Credit Card Refunds</span>
                    <Badge variant="secondary">3-5 business days</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="text-sm font-medium">PayPal Refunds</span>
                    <Badge variant="secondary">1-2 business days</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="text-sm font-medium">Bank Transfer</span>
                    <Badge variant="secondary">5-7 business days</Badge>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-3">Refund Method</h3>
                <p className="text-sm text-muted-foreground mb-3">
                  Refunds will be issued to the original payment method used for the purchase.
                </p>
                <ul className="space-y-1 text-sm text-muted-foreground ml-4">
                  <li>• Credit card purchases: Refunded to the same card</li>
                  <li>• PayPal purchases: Refunded to PayPal account</li>
                  <li>• Gift card purchases: Refunded as store credit</li>
                  <li>• Cash purchases: Refunded as store credit or check</li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold mb-3">Partial Refunds</h3>
                <p className="text-sm text-muted-foreground mb-2">
                  Partial refunds may be issued for:
                </p>
                <ul className="space-y-1 text-sm text-muted-foreground ml-4">
                  <li>• Items with minor damage or wear</li>
                  <li>• Items missing original packaging</li>
                  <li>• Items returned after 30 days but within 60 days</li>
                  <li>• Restocking fees for large items (if applicable)</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Exchanges */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <RotateCcw className="h-5 w-5" />
                Exchanges
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Exchange Policy</h3>
                <p className="text-sm text-muted-foreground">
                  We offer exchanges for the same item in a different size, color, or style 
                  (subject to availability). Exchanges follow the same timeline as returns.
                </p>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Price Differences</h3>
                <ul className="space-y-1 text-sm text-muted-foreground ml-4">
                  <li>• If the new item costs more, you'll pay the difference</li>
                  <li>• If the new item costs less, we'll refund the difference</li>
                  <li>• Exchange shipping is free for defective items</li>
                  <li>• Standard shipping rates apply for preference exchanges</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Mail className="h-5 w-5" />
                Need Help with Returns?
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  Our customer service team is here to help with any return questions or issues.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h3 className="font-semibold mb-2">Contact Information</h3>
                    <div className="space-y-1 text-sm">
                      <p><strong>Email:</strong> returns@avenzo.co</p>
                      <p><strong>Phone:</strong> +1 (555) 123-4567</p>
                      <p><strong>Hours:</strong> Mon-Fri 9AM-6PM EST</p>
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-4">
                    <h3 className="font-semibold mb-2">Return Address</h3>
                    <div className="text-sm">
                      <p>AVENZO LLC Returns</p>
                      <p>456 Warehouse Drive</p>
                      <p>Distribution Center</p>
                      <p>Newark, NJ 07102</p>
                    </div>
                  </div>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <p className="text-sm text-blue-700">
                    <strong>Tip:</strong> Keep your tracking number when returning items. 
                    This helps us locate your return and process it faster.
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