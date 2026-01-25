"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Truck, Package, Clock, MapPin, Shield, DollarSign } from "lucide-react";

export const ShippingPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 sm:py-12 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4">Shipping Policy – AVENZO</h1>
          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto px-4">
            Everything you need to know about our shipping policies, delivery times, and order processing.
          </p>
        </div>

        {/* Shipping Policies */}
        <div className="space-y-6 sm:space-y-8">
          {/* Order Cancellation */}
          <Card>
            <CardHeader className="p-4 sm:p-6">
              <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
                <Package className="h-5 w-5" />
                Order Cancellation
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 sm:p-6 space-y-4">
              <div className="border-l-4 border-muted pl-4">
                <h3 className="font-semibold mb-2">Important Notice</h3>
                <p className="text-sm text-muted-foreground mb-2">
                  Once an order is placed, it begins processing immediately and cannot be cancelled.
                </p>
                <p className="text-sm text-muted-foreground">
                  If you no longer want the item after delivery, please contact our support team to start 
                  the return and refund process.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Shipping Protection */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Shipping Protection
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="border-l-4 border-muted pl-4">
                <h3 className="font-semibold mb-2">Coverage Details</h3>
                <p className="text-sm text-muted-foreground mb-2">
                  If you selected Shipping Protection at checkout, your order is covered in case it is lost in transit.
                </p>
                <p className="text-sm text-muted-foreground">
                  You may choose a replacement or a full refund if this happens.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Lost or Missing Packages */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                Lost or Missing Packages
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="font-semibold mb-3">Address Accuracy</h3>
                <p className="text-sm text-muted-foreground mb-3">
                  Please make sure your shipping address is correct when placing your order.
                </p>
                <p className="text-sm text-muted-foreground">
                  We are not responsible for delivery issues caused by incorrect or incomplete addresses.
                </p>
              </div>

              <div className="border-l-4 border-muted pl-4">
                <h3 className="font-semibold mb-2">Our Responsibility</h3>
                <p className="text-sm text-muted-foreground">
                  If a package is lost due to an error on our side, we will take full responsibility 
                  and offer a replacement or refund at no additional cost.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Customs & Import Fees */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="h-5 w-5" />
                Customs & Import Fees
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="border-l-4 border-muted pl-4">
                <h3 className="font-semibold mb-2">International Orders</h3>
                <p className="text-sm text-muted-foreground mb-2">
                  Some orders may be subject to customs or import fees depending on your country.
                </p>
                <p className="text-sm text-muted-foreground">
                  These fees are not included in the product price and are the responsibility of the customer.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Shipping Time by Region */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Shipping Time
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <p className="text-sm text-muted-foreground">
                Shipping times vary by location. Estimated delivery times are shown below:
              </p>

              <div>
                <h3 className="font-semibold mb-4">Estimated Delivery Times</h3>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse border border-border rounded-lg min-w-[400px]">
                    <thead>
                      <tr className="bg-muted/50">
                        <th className="border border-border p-3 sm:p-4 text-left font-semibold text-sm sm:text-base">Location</th>
                        <th className="border border-border p-3 sm:p-4 text-left font-semibold text-sm sm:text-base">Estimated Delivery Time</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="border border-border p-3 sm:p-4 text-sm sm:text-base">United States</td>
                        <td className="border border-border p-3 sm:p-4 text-sm sm:text-base">7–15 business days</td>
                      </tr>
                      <tr className="bg-muted/20">
                        <td className="border border-border p-3 sm:p-4 text-sm sm:text-base">Canada & Europe</td>
                        <td className="border border-border p-3 sm:p-4 text-sm sm:text-base">7–15 business days</td>
                      </tr>
                      <tr>
                        <td className="border border-border p-3 sm:p-4 text-sm sm:text-base">Australia & New Zealand</td>
                        <td className="border border-border p-3 sm:p-4 text-sm sm:text-base">15–25 business days</td>
                      </tr>
                      <tr className="bg-muted/20">
                        <td className="border border-border p-3 sm:p-4 text-sm sm:text-base">Central & South America</td>
                        <td className="border border-border p-3 sm:p-4 text-sm sm:text-base">7–15 business days</td>
                      </tr>
                      <tr>
                        <td className="border border-border p-3 sm:p-4 text-sm sm:text-base">Asia</td>
                        <td className="border border-border p-3 sm:p-4 text-sm sm:text-base">7–15 business days</td>
                      </tr>
                      <tr className="bg-muted/20">
                        <td className="border border-border p-3 sm:p-4 text-sm sm:text-base">Africa</td>
                        <td className="border border-border p-3 sm:p-4 text-sm sm:text-base">15–30 business days</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="border-t pt-4">
                <h3 className="font-semibold mb-2">Please note:</h3>
                <ul className="text-sm text-muted-foreground space-y-1 ml-4">
                  <li>• Processing time is 2–3 business days</li>
                  <li>• Delivery times do not include customs or clearance delays</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Tracking Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Truck className="h-5 w-5" />
                Tracking Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="font-semibold mb-3">Order Tracking</h3>
                <p className="text-sm text-muted-foreground mb-3">
                  Once your order ships, you will receive a tracking number by email.
                </p>
                <p className="text-sm text-muted-foreground">
                  In some cases, tracking updates may take a few days to appear.
                </p>
              </div>

              <div>
                <h3 className="font-semibold mb-3">Tracking Shows "No Information Available"</h3>
                <p className="text-sm text-muted-foreground mb-2">
                  Some carriers take 2–5 business days to update tracking details.
                </p>
                <p className="text-sm text-muted-foreground">
                  If your order was placed more than 5 business days ago and tracking has not updated, 
                  please contact our support team for assistance.
                </p>
              </div>

              <div className="border-t pt-4">
                <h3 className="font-semibold mb-2">Need Tracking Help?</h3>
                <p className="text-sm text-muted-foreground">
                  Contact us at <span className="font-medium">avanzoaofficial@gmail.com</span> or 
                  <span className="font-medium"> +1 (555) 123-4567</span> with your order number.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Package className="h-5 w-5" />
                Questions About Shipping?
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="border-l-4 border-muted pl-4">
                <h3 className="font-semibold mb-2">Contact Our Support Team</h3>
                <p className="text-sm text-muted-foreground">
                  Have questions about shipping? Contact our customer service team at 
                  <span className="font-medium"> avanzoaofficial@gmail.com</span> or 
                  <span className="font-medium"> +1 (555) 123-4567</span>.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};