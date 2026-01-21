"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const footerLinks = {
  company: [
    { label: "About Us", href: "/about" },
    { label: "Blog", href: "/blog" },
    { label: "Careers", href: "/careers" },
    { label: "Locations", href: "/locations" },
  ],
  customerCare: [
    { label: "Size Guide", href: "/size-guide" },
    { label: "Help & FAQs", href: "/faq" },
    { label: "Return My Order", href: "/returns" },
    { label: "Refer a Friend", href: "/referral" },
  ],
  terms: [
    { label: "Duties & Taxes", href: "/duties" },
    { label: "Shipping Info", href: "/shipping" },
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms & Conditions", href: "/terms" },
  ],
  social: [
    { label: "Instagram", href: "https://instagram.com" },
    { label: "Facebook", href: "https://facebook.com" },
    { label: "Pinterest", href: "https://pinterest.com" },
    { label: "TikTok", href: "https://tiktok.com" },
  ],
};

export const Footer = () => {
  return (
    <footer className="bg-foreground text-primary-foreground">
      {/* Main Footer */}
      <div className="container py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Newsletter */}
          <div className="lg:col-span-2 space-y-4">
            <h3 className="text-lg font-medium">
              Receive an exclusive{" "}
              <span className="text-primary">20%</span>{" "}
              discount code when you signup.
            </h3>
            <div className="flex gap-2 max-w-md">
              <Input
                type="email"
                placeholder="Enter your email"
                className="bg-transparent border-primary-foreground/30 text-primary-foreground placeholder:text-primary-foreground/50 focus-visible:ring-primary"
              />
              <Button variant="outline" className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground shrink-0">
                Subscribe
              </Button>
            </div>
          </div>

          {/* Company */}
          <div className="footer-section">
            <h4 className="footer-title">Company</h4>
            <ul className="space-y-2.5">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="footer-link">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Care */}
          <div className="footer-section">
            <h4 className="footer-title">Customer Care</h4>
            <ul className="space-y-2.5">
              {footerLinks.customerCare.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="footer-link">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Terms & Follow */}
          <div className="footer-section">
            <h4 className="footer-title">Terms & Policies</h4>
            <ul className="space-y-2.5">
              {footerLinks.terms.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="footer-link">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
            
            <h4 className="footer-title mt-6">Follow Us</h4>
            <ul className="space-y-2.5">
              {footerLinks.social.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="footer-link"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-primary-foreground/10">
        <div className="container py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <span className="font-serif text-xl font-bold">Haven</span>
            <span className="text-sm text-primary-foreground/60">
              ©2024. All rights reserved
            </span>
          </div>

          {/* Payment Methods */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 px-2 py-1 rounded bg-primary-foreground/10 text-xs font-medium">
              VISA
            </div>
            <div className="flex items-center gap-2 px-2 py-1 rounded bg-primary-foreground/10 text-xs font-medium">
              MC
            </div>
            <div className="flex items-center gap-2 px-2 py-1 rounded bg-primary-foreground/10 text-xs font-medium">
              AMEX
            </div>
            <div className="flex items-center gap-2 px-2 py-1 rounded bg-primary-foreground/10 text-xs font-medium">
              PayPal
            </div>

            <div className="hidden md:flex items-center gap-4 ml-4 text-sm text-primary-foreground/60">
              <span>EN</span>
              <span>USD</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
