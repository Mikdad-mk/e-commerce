"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, Eye, Lock, Users, Mail, FileText } from "lucide-react";

export const PrivacyPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Privacy Policy – AVENZO</h1>
          <p className="text-sm text-muted-foreground mt-2">
            Last updated: January 23, 2026
          </p>
        </div>

        <div className="space-y-8">
          {/* Introduction */}
          <Card>
            <CardContent className="pt-6">
              <p className="text-sm text-muted-foreground mb-4">
                AVENZO ("we", "our", "us") operates this website and online store to provide products and services to our customers. 
                This Privacy Policy explains how we collect, use, store, and protect your personal information when you visit our website, 
                make a purchase, or communicate with us.
              </p>
              
              <div className="border-l-4 border-muted pl-4">
                <p className="text-sm text-muted-foreground">
                  By using our website and services, you agree to the collection and use of information 
                  in accordance with this Privacy Policy.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Information We Collect */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Information We Collect
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <p className="text-sm text-muted-foreground">
                We may collect the following personal information:
              </p>

              <div>
                <h3 className="font-semibold mb-3">1. Contact Information</h3>
                <ul className="space-y-1 text-sm text-muted-foreground ml-4">
                  <li>• Name</li>
                  <li>• Email address</li>
                  <li>• Phone number</li>
                  <li>• Billing and shipping address</li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold mb-3">2. Payment Information</h3>
                <ul className="space-y-1 text-sm text-muted-foreground ml-4">
                  <li>• Payment method details (processed securely by third-party payment providers)</li>
                  <li>• Transaction history and order details</li>
                </ul>
                <div className="border-l-4 border-muted pl-4 mt-3">
                  <p className="text-sm text-muted-foreground font-medium">
                    We do not store your full card numbers.
                  </p>
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-3">3. Account & Order Information</h3>
                <ul className="space-y-1 text-sm text-muted-foreground ml-4">
                  <li>• Login details (if applicable)</li>
                  <li>• Products viewed or purchased</li>
                  <li>• Customer service communications</li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold mb-3">4. Technical Information</h3>
                <ul className="space-y-1 text-sm text-muted-foreground ml-4">
                  <li>• IP address</li>
                  <li>• Browser and device type</li>
                  <li>• Website activity and usage data</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* How We Use Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Eye className="h-5 w-5" />
                How We Use Your Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground mb-3">We use your information to:</p>
              <ul className="space-y-2 text-sm text-muted-foreground ml-4">
                <li>• Process orders and payments</li>
                <li>• Deliver products</li>
                <li>• Provide customer support</li>
                <li>• Send order updates and important notifications</li>
                <li>• Improve website performance and user experience</li>
                <li>• Prevent fraud and unauthorized activity</li>
                <li>• Comply with legal requirements</li>
              </ul>
            </CardContent>
          </Card>

          {/* Sharing of Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Sharing of Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm text-muted-foreground mb-3">We may share your data only with:</p>
                <ul className="space-y-1 text-sm text-muted-foreground ml-4">
                  <li>• Payment processors (for secure transactions)</li>
                  <li>• Shipping and delivery partners</li>
                  <li>• Service providers who help operate our website</li>
                </ul>
              </div>

              <div className="border-l-4 border-muted pl-4">
                <p className="text-sm text-muted-foreground font-medium">
                  We do not sell or rent your personal data.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Data Security */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lock className="h-5 w-5" />
                Data Security
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">
                We use reasonable security measures to protect your personal information. However, no online system is 100% secure, 
                and we cannot guarantee absolute security.
              </p>
            </CardContent>
          </Card>

          {/* Data Retention */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Data Retention
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground mb-3">We keep your information only as long as necessary to:</p>
              <ul className="space-y-1 text-sm text-muted-foreground ml-4">
                <li>• Fulfill orders</li>
                <li>• Comply with legal obligations</li>
                <li>• Resolve disputes</li>
                <li>• Improve services</li>
              </ul>
            </CardContent>
          </Card>

          {/* Your Rights */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Your Rights
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground mb-3">Depending on your location, you may have the right to:</p>
              <ul className="space-y-1 text-sm text-muted-foreground ml-4">
                <li>• Access your personal data</li>
                <li>• Request correction or deletion</li>
                <li>• Withdraw consent for marketing emails</li>
              </ul>
              <p className="text-sm text-muted-foreground mt-3">
                You can request this by contacting us.
              </p>
            </CardContent>
          </Card>

          {/* Cookies */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Cookies
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">
                We may use cookies and similar technologies to improve website functionality and analytics. 
                You can disable cookies in your browser settings.
              </p>
            </CardContent>
          </Card>

          {/* Children's Privacy */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Children's Privacy
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Our services are not intended for children under 18, and we do not knowingly collect data from minors.
              </p>
            </CardContent>
          </Card>

          {/* Changes to Policy */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Changes to This Policy
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">
                We may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated date.
              </p>
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
                  If you have any questions about this Privacy Policy or your data, contact us at:
                </p>

                <div className="border-l-4 border-muted pl-4">
                  <p className="text-sm font-medium">Email: info@avenzo.co.in</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};