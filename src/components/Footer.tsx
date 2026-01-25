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
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6 mb-6">
            {/* Country/Region Selector */}
            <div className="flex flex-col space-y-2 lg:space-y-3">
              <span className="text-sm text-muted-foreground">
                Country/region
              </span>
              <select className="text-sm bg-background border border-border rounded-md px-3 py-2 text-foreground w-full max-w-sm lg:max-w-xs focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent">
                <option value="US">United States (USD $)</option>
                <option value="CA">Canada (CAD $)</option>
                <option value="UK">United Kingdom (GBP £)</option>
                <option value="EU">European Union (EUR €)</option>
                <option value="AU">Australia (AUD $)</option>
                <option value="JP">Japan (JPY ¥)</option>
              </select>
            </div>

            {/* Payment Methods */}
            <div className="w-full lg:w-auto lg:text-right">
              <div className="text-sm text-muted-foreground mb-3">
                We accept
              </div>
              <div className="grid grid-cols-5 lg:grid-cols-8 gap-2 max-w-sm lg:max-w-none lg:justify-items-end">
                {paymentMethods.map((method) => (
                  <div
                    key={method.name}
                    className="flex items-center justify-center h-8 bg-background rounded border border-border text-xs font-medium text-muted-foreground hover:border-primary/50 transition-colors duration-200"
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
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-6 lg:space-y-0">
              {/* Brand and Copyright */}
              <div className="flex flex-col lg:flex-row lg:items-center space-y-3 lg:space-y-0 lg:space-x-6">
                <Link href="/" className="font-serif text-xl font-bold text-foreground hover:text-primary transition-colors">
                  Avenzo
                </Link>
                <span className="text-sm text-muted-foreground">
                  © 2024, AVENZO LLC. All rights reserved.
                </span>
              </div>

              {/* Legal Links */}
              <div className="flex flex-col lg:flex-row space-y-3 lg:space-y-0 lg:space-x-6 text-sm">
                <Link 
                  href="/privacy" 
                  className="text-muted-foreground hover:text-foreground transition-colors duration-200"
                >
                  Privacy policy
                </Link>
                <Link 
                  href="/refund" 
                  className="text-muted-foreground hover:text-foreground transition-colors duration-200"
                >
                  Refund policy
                </Link>
                <Link 
                  href="/shipping" 
                  className="text-muted-foreground hover:text-foreground transition-colors duration-200"
                >
                  Shipping policy
                </Link>
                <Link 
                  href="/terms" 
                  className="text-muted-foreground hover:text-foreground transition-colors duration-200"
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
