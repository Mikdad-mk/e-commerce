"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, Eye, Lock, Users, Mail, FileText } from "lucide-react";

export const PrivacyPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Privacy Policy</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Your privacy is important to us. This policy explains how we collect, use, and protect your information.
          </p>
          <p className="text-sm text-muted-foreground mt-2">
            Last updated: January 25, 2026
          </p>
        </div>

        <div className="space-y-8">
          {/* Information We Collect */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Information We Collect
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Personal Information</h3>
                <ul className="space-y-1 text-sm text-muted-foreground ml-4">
                  <li>• Name, email address, and phone number</li>
                  <li>• Billing and shipping addresses</li>
                  <li>• Payment information (processed securely by our payment providers)</li>
                  <li>• Account credentials and preferences</li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Automatically Collected Information</h3>
                <ul className="space-y-1 text-sm text-muted-foreground ml-4">
                  <li>• IP address and browser information</li>
                  <li>• Device type and operating system</li>
                  <li>• Pages visited and time spent on our site</li>
                  <li>• Referring websites and search terms</li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Cookies and Tracking</h3>
                <ul className="space-y-1 text-sm text-muted-foreground ml-4">
                  <li>• Essential cookies for site functionality</li>
                  <li>• Analytics cookies to improve our services</li>
                  <li>• Marketing cookies for personalized experiences</li>
                  <li>• Third-party cookies from integrated services</li>
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
              <div>
                <h3 className="font-semibold mb-2">Order Processing</h3>
                <p className="text-sm text-muted-foreground">
                  We use your information to process orders, handle payments, arrange shipping, 
                  and provide customer support for your purchases.
                </p>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Communication</h3>
                <p className="text-sm text-muted-foreground">
                  We may send you order confirmations, shipping updates, customer service messages, 
                  and promotional emails (which you can opt out of at any time).
                </p>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Site Improvement</h3>
                <p className="text-sm text-muted-foreground">
                  We analyze usage patterns to improve our website, products, and services. 
                  This helps us provide a better shopping experience.
                </p>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Legal Compliance</h3>
                <p className="text-sm text-muted-foreground">
                  We may use information to comply with legal obligations, resolve disputes, 
                  and enforce our terms of service.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Information Sharing */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Information Sharing
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Service Providers</h3>
                <p className="text-sm text-muted-foreground">
                  We share information with trusted third parties who help us operate our business, 
                  including payment processors, shipping companies, and email service providers.
                </p>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Legal Requirements</h3>
                <p className="text-sm text-muted-foreground">
                  We may disclose information when required by law, court order, or to protect 
                  our rights, property, or safety, or that of others.
                </p>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Business Transfers</h3>
                <p className="text-sm text-muted-foreground">
                  In the event of a merger, acquisition, or sale of assets, customer information 
                  may be transferred as part of the business transaction.
                </p>
              </div>

              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <h3 className="font-semibold text-green-800 mb-2">We Never Sell Your Data</h3>
                <p className="text-sm text-green-700">
                  We do not sell, rent, or trade your personal information to third parties 
                  for their marketing purposes.
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
              <div>
                <h3 className="font-semibold mb-2">Security Measures</h3>
                <ul className="space-y-1 text-sm text-muted-foreground ml-4">
                  <li>• SSL encryption for all data transmission</li>
                  <li>• Secure servers with regular security updates</li>
                  <li>• Limited access to personal information</li>
                  <li>• Regular security audits and monitoring</li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Payment Security</h3>
                <p className="text-sm text-muted-foreground">
                  We use industry-standard payment processors that comply with PCI DSS standards. 
                  We do not store complete credit card information on our servers.
                </p>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Data Retention</h3>
                <p className="text-sm text-muted-foreground">
                  We retain your information only as long as necessary to provide services, 
                  comply with legal obligations, and resolve disputes.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Your Rights */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Your Rights and Choices
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Access and Update</h3>
                <p className="text-sm text-muted-foreground">
                  You can access and update your account information at any time through 
                  your account dashboard or by contacting us.
                </p>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Email Preferences</h3>
                <p className="text-sm text-muted-foreground">
                  You can opt out of promotional emails by clicking the unsubscribe link 
                  in any email or updating your account preferences.
                </p>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Cookie Settings</h3>
                <p className="text-sm text-muted-foreground">
                  You can control cookies through your browser settings. Note that disabling 
                  certain cookies may affect site functionality.
                </p>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Data Deletion</h3>
                <p className="text-sm text-muted-foreground">
                  You can request deletion of your account and personal information by 
                  contacting our customer service team.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Mail className="h-5 w-5" />
                Contact Us About Privacy
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  If you have questions about this privacy policy or how we handle your information, 
                  please contact us:
                </p>

                <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                  <p className="text-sm"><strong>Email:</strong> privacy@avenzo.com</p>
                  <p className="text-sm"><strong>Phone:</strong> +1 (555) 123-4567</p>
                  <p className="text-sm">
                    <strong>Mail:</strong><br />
                    AVENZO LLC<br />
                    Privacy Department<br />
                    123 Business Avenue, Suite 100<br />
                    New York, NY 10001
                  </p>
                </div>

                <div className="border-t pt-4">
                  <p className="text-xs text-muted-foreground">
                    We reserve the right to update this privacy policy at any time. 
                    Changes will be posted on this page with an updated revision date.
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