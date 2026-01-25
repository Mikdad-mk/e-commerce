"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RotateCcw, Clock, CreditCard, Package, AlertCircle, CheckCircle, Mail, X } from "lucide-react";

export const RefundPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Return & Refund Policy – AVENZO</h1>
          <p className="text-sm text-muted-foreground mt-2">
            Last updated: January 23, 2026
          </p>
        </div>

        <div className="space-y-8">
          {/* Introduction */}
          <Card>
            <CardContent className="pt-6">
              <p className="text-sm text-muted-foreground">
                At AVENZO, we want you to be completely satisfied with your purchase. If you are not happy with your order, we're here to help.
              </p>
            </CardContent>
          </Card>

          {/* Returns */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <RotateCcw className="h-5 w-5" />
                Returns
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="border-l-4 border-muted pl-4">
                <p className="text-sm text-muted-foreground font-medium">
                  We offer a 30-day return period from the date you receive your item.
                </p>
              </div>

              <div>
                <h3 className="font-semibold mb-3">To qualify for a return:</h3>
                <ul className="space-y-2 text-sm text-muted-foreground ml-4">
                  <li>• The item must be unused, unworn, and in its original condition</li>
                  <li>• Original packaging and tags must be intact</li>
                  <li>• Proof of purchase is required</li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold mb-3">To request a return, please contact us at:</h3>
                <div className="border-l-4 border-muted pl-4">
                  <p className="text-sm text-muted-foreground">
                    📧 <strong>info@avenzo.co.in</strong>
                  </p>
                </div>
              </div>

              <div className="border-l-4 border-muted pl-4">
                <p className="text-sm text-muted-foreground mb-2">
                  Once your return is approved, we will provide instructions on how and where to send your package.
                </p>
                <p className="text-sm text-muted-foreground font-medium">
                  Returns sent without prior approval will not be accepted.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Damaged or Incorrect Items */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertCircle className="h-5 w-5" />
                Damaged or Incorrect Items
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Please inspect your order as soon as it arrives.
              </p>

              <div>
                <h3 className="font-semibold mb-3">If your item is:</h3>
                <ul className="space-y-1 text-sm text-muted-foreground ml-4">
                  <li>• Damaged</li>
                  <li>• Defective</li>
                  <li>• Incorrect</li>
                </ul>
              </div>

              <div className="border-l-4 border-muted pl-4">
                <p className="text-sm text-muted-foreground">
                  Contact us immediately at <strong>info@avenzo.co.in</strong> with photos so we can resolve the issue quickly.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Non-Returnable Items */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <X className="h-5 w-5" />
                Non-Returnable Items
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground mb-3">
                Some products cannot be returned, including:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Perishable goods (food, flowers, plants)</li>
                  <li>• Custom or personalized items</li>
                  <li>• Personal care or hygiene products</li>
                  <li>• Hazardous or flammable materials</li>
                </ul>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Gift cards</li>
                  <li>• Sale or clearance items</li>
                </ul>
              </div>

              <div className="border-l-4 border-muted pl-4">
                <p className="text-sm text-muted-foreground">
                  If you're unsure about a product, contact us before purchasing.
                </p>
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
              <div className="border-l-4 border-muted pl-4">
                <h3 className="font-semibold text-muted-foreground mb-2">We do not offer direct exchanges.</h3>
                <p className="text-sm text-muted-foreground mb-3">
                  The fastest solution is to:
                </p>
                <ul className="text-sm text-muted-foreground space-y-1 ml-4">
                  <li>• Return the original item</li>
                  <li>• Place a new order once the return is approved</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* EU Customers */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Package className="h-5 w-5" />
                European Union Customers – 14 Day Right of Withdrawal
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="border-l-4 border-muted pl-4">
                <p className="text-sm text-muted-foreground mb-2">
                  If your order is delivered within the European Union, you have the legal right to cancel or return your order within 14 days without providing a reason.
                </p>
                <p className="text-sm text-muted-foreground">
                  Returned items must be unused, in original packaging, and with proof of purchase.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Refunds */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="h-5 w-5" />
                Refunds
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="font-semibold mb-3">Refund Process</h3>
                <p className="text-sm text-muted-foreground mb-3">
                  Once we receive and inspect your return:
                </p>
                <ul className="space-y-2 text-sm text-muted-foreground ml-4">
                  <li>• You will be notified of approval or rejection</li>
                  <li>• Approved refunds are processed to your original payment method within 10 business days</li>
                </ul>
              </div>

              <div className="border-l-4 border-muted pl-4">
                <p className="text-sm text-muted-foreground mb-2">
                  Please note: banks and payment providers may take additional time to post the refund.
                </p>
                <p className="text-sm text-muted-foreground">
                  If you haven't received your refund after 15 business days, contact us at:
                </p>
                <p className="text-sm text-muted-foreground font-medium mt-2">
                  📧 info@avenzo.co.in
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};