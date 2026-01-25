"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const footerLinks = {
  company: [
    { label: "About Us", href: "/about" },
    { label: "Contact", href: "/contact" },
  ],
  support: [
    { label: "Shipping Policy", href: "/shipping" },
  ],
  legal: [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
    { label: "Refund Policy", href: "/refund" },
  ],
};

const paymentMethods = [
  { name: "American Express", icon: "AMEX" },
  { name: "Apple Pay", icon: "Apple Pay" },
  { name: "Diners Club", icon: "Diners" },
  { name: "Discover", icon: "Discover" },
  { name: "Google Pay", icon: "Google Pay" },
  { name: "JCB", icon: "JCB" },
  { name: "Mastercard", icon: "Mastercard" },
  { name: "Visa", icon: "Visa" },
];

export const Footer = () => {
  return (
    <footer className="bg-background border-t border-border mt-auto">
      {/* Newsletter Section */}
      <div className="border-b border-border">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          <div className="max-w-md mx-auto text-center space-y-4">
            <h3 className="text-lg sm:text-xl font-medium text-foreground">Stay Updated</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Subscribe to get special offers, free giveaways, and updates.
            </p>
            <form className="flex flex-col sm:flex-row gap-3 max-w-sm mx-auto">
              <Input
                type="email"
                placeholder="Enter your email"
                className="flex-1 h-10"
                required
              />
              <Button type="submit" className="h-10 px-6 shrink-0">
                Subscribe
              </Button>
            </form>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
          {/* Company */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-foreground">
              Company
            </h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <Link 
                    href={link.href} 
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200 block py-1"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-foreground">
              Support
            </h4>
            <ul className="space-y-3">
              {footerLinks.support.map((link) => (
                <li key={link.label}>
                  <Link 
                    href={link.href} 
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200 block py-1"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-foreground">
              Legal
            </h4>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.label}>
                  <Link 
                    href={link.href} 
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200 block py-1"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="border-t border-border bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
          {/* Country/Region and Payment Methods */}
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 mb-6">
            {/* Country/Region Selector */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
              <span className="text-sm text-muted-foreground whitespace-nowrap">
                Country/region
              </span>
              <select className="text-sm bg-background border border-border rounded-md px-3 py-2 text-foreground min-w-[200px] focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent">
                <option value="US">United States (USD $)</option>
                <option value="CA">Canada (CAD $)</option>
                <option value="UK">United Kingdom (GBP £)</option>
                <option value="EU">European Union (EUR €)</option>
                <option value="AU">Australia (AUD $)</option>
                <option value="JP">Japan (JPY ¥)</option>
              </select>
            </div>

            {/* Payment Methods */}
            <div className="w-full lg:w-auto">
              <div className="text-sm text-muted-foreground mb-2 lg:text-right">
                We accept
              </div>
              <div className="flex flex-wrap items-center gap-2 justify-start lg:justify-end">
                {paymentMethods.map((method) => (
                  <div
                    key={method.name}
                    className="flex items-center justify-center min-w-[50px] h-8 bg-background rounded border border-border text-xs font-medium text-muted-foreground hover:border-primary/50 transition-colors duration-200"
                    title={method.name}
                  >
                    {method.icon}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Copyright and Legal Links */}
          <div className="pt-6 border-t border-border">
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
              {/* Brand and Copyright */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <Link href="/" className="font-serif text-xl font-bold text-foreground hover:text-primary transition-colors">
                  Avenzo
                </Link>
                <span className="text-sm text-muted-foreground">
                  © 2024, AVENZO LLC. All rights reserved.
                </span>
              </div>

              {/* Legal Links */}
              <div className="flex flex-wrap items-center gap-4 lg:gap-6 text-sm">
                <Link 
                  href="/privacy" 
                  className="text-muted-foreground hover:text-foreground transition-colors duration-200 whitespace-nowrap"
                >
                  Privacy policy
                </Link>
                <Link 
                  href="/refund" 
                  className="text-muted-foreground hover:text-foreground transition-colors duration-200 whitespace-nowrap"
                >
                  Refund policy
                </Link>
                <Link 
                  href="/shipping" 
                  className="text-muted-foreground hover:text-foreground transition-colors duration-200 whitespace-nowrap"
                >
                  Shipping policy
                </Link>
                <Link 
                  href="/terms" 
                  className="text-muted-foreground hover:text-foreground transition-colors duration-200 whitespace-nowrap"
                >
                  Terms of service
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
