"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Scale, ShoppingCart, Shield, AlertTriangle, Mail } from "lucide-react";

export const TermsPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 sm:py-12 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4">Terms of Service</h1>
          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto px-4">
            Please read these terms carefully before using our website and services.
          </p>
          <p className="text-sm text-muted-foreground mt-2">
            Last updated: January 25, 2026
          </p>
        </div>

        <div className="space-y-6 sm:space-y-8">
          {/* Acceptance of Terms */}
          <Card>
            <CardHeader className="p-4 sm:p-6">
              <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
                <FileText className="h-5 w-5" />
                Acceptance of Terms
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 sm:p-6 space-y-4">
              <p className="text-sm text-muted-foreground">
                By accessing and using the Avenzo website and services, you accept and agree to be bound by 
                the terms and provision of this agreement. If you do not agree to abide by the above, 
                please do not use this service.
              </p>
              
              <div className="border-l-4 border-muted pl-4">
                <p className="text-sm text-muted-foreground">
                  <strong>Important:</strong> These terms constitute a legally binding agreement between 
                  you and AVENZO LLC. Please read them carefully.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Use License */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Scale className="h-5 w-5" />
                Use License
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Permitted Use</h3>
                <ul className="space-y-1 text-sm text-muted-foreground ml-4">
                  <li>• Browse and purchase products for personal use</li>
                  <li>• Create an account to manage orders and preferences</li>
                  <li>• Contact customer service for support</li>
                  <li>• Share product links and reviews</li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Prohibited Use</h3>
                <ul className="space-y-1 text-sm text-muted-foreground ml-4">
                  <li>• Commercial resale of products without authorization</li>
                  <li>• Automated data collection or scraping</li>
                  <li>• Attempting to gain unauthorized access to our systems</li>
                  <li>• Uploading malicious code or content</li>
                  <li>• Impersonating other users or entities</li>
                  <li>• Violating any applicable laws or regulations</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Orders and Purchases */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ShoppingCart className="h-5 w-5" />
                Orders and Purchases
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Order Acceptance</h3>
                <p className="text-sm text-muted-foreground">
                  All orders are subject to acceptance and availability. We reserve the right to refuse 
                  or cancel any order for any reason, including but not limited to product availability, 
                  errors in pricing or product information, or suspected fraudulent activity.
                </p>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Pricing and Payment</h3>
                <ul className="space-y-1 text-sm text-muted-foreground ml-4">
                  <li>• All prices are in USD and subject to change without notice</li>
                  <li>• Payment is required at the time of order placement</li>
                  <li>• We accept major credit cards and other payment methods as displayed</li>
                  <li>• Taxes and shipping fees will be calculated at checkout</li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Product Information</h3>
                <p className="text-sm text-muted-foreground">
                  We strive to provide accurate product descriptions, images, and pricing. However, 
                  we do not warrant that product descriptions or other content is accurate, complete, 
                  reliable, current, or error-free.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Account Responsibilities */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Account Responsibilities
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Account Security</h3>
                <ul className="space-y-1 text-sm text-muted-foreground ml-4">
                  <li>• You are responsible for maintaining the confidentiality of your account</li>
                  <li>• You must provide accurate and complete information</li>
                  <li>• You must promptly update any changes to your information</li>
                  <li>• You are responsible for all activities under your account</li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Account Termination</h3>
                <p className="text-sm text-muted-foreground">
                  We may terminate or suspend your account at any time for violation of these terms, 
                  fraudulent activity, or other reasons at our sole discretion.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Disclaimers */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5" />
                Disclaimers and Limitations
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Service Availability</h3>
                <p className="text-sm text-muted-foreground">
                  Our website and services are provided "as is" without warranties of any kind. 
                  We do not guarantee uninterrupted or error-free service.
                </p>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Limitation of Liability</h3>
                <p className="text-sm text-muted-foreground">
                  In no event shall AVENZO LLC be liable for any indirect, incidental, special, 
                  consequential, or punitive damages, including but not limited to loss of profits, 
                  data, or use, arising out of or relating to your use of our services.
                </p>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Third-Party Links</h3>
                <p className="text-sm text-muted-foreground">
                  Our website may contain links to third-party websites. We are not responsible 
                  for the content, privacy policies, or practices of these external sites.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Intellectual Property */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Intellectual Property
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Our Content</h3>
                <p className="text-sm text-muted-foreground">
                  All content on this website, including text, graphics, logos, images, and software, 
                  is the property of AVENZO LLC and is protected by copyright and other intellectual 
                  property laws.
                </p>
              </div>

              <div>
                <h3 className="font-semibold mb-2">User Content</h3>
                <p className="text-sm text-muted-foreground">
                  By submitting content (reviews, comments, etc.), you grant us a non-exclusive, 
                  royalty-free license to use, modify, and display such content in connection with 
                  our services.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Governing Law */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Scale className="h-5 w-5" />
                Governing Law and Disputes
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Applicable Law</h3>
                <p className="text-sm text-muted-foreground">
                  These terms shall be governed by and construed in accordance with the laws of 
                  the State of New York, without regard to its conflict of law provisions.
                </p>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Dispute Resolution</h3>
                <p className="text-sm text-muted-foreground">
                  Any disputes arising from these terms or your use of our services shall be 
                  resolved through binding arbitration in accordance with the rules of the 
                  American Arbitration Association.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Changes to Terms */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Changes to Terms
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">
                We reserve the right to modify these terms at any time. Changes will be effective 
                immediately upon posting on this page. Your continued use of our services after 
                changes are posted constitutes acceptance of the modified terms.
              </p>

              <div className="border-l-4 border-muted pl-4">
                <p className="text-sm text-muted-foreground">
                  <strong>Stay Informed:</strong> We recommend reviewing these terms periodically 
                  to stay informed of any updates.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Mail className="h-5 w-5" />
                Contact Information
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  If you have questions about these terms of service, please contact us:
                </p>

                <div className="border-l-4 border-muted pl-4 space-y-2">
                  <p className="text-sm"><strong>Email:</strong> info@avenzo.co.in</p>
                  <p className="text-sm"><strong>Phone:</strong> +1 (555) 123-4567</p>
                  <p className="text-sm">
                    <strong>Mail:</strong><br />
                    AVENZO LLC<br />
                    Legal Department<br />
                    30 N GOULD ST STE N<br />
                    SHERIDAN, WY 82801
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