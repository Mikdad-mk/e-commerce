"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const faqs = [
  {
    question: "How long does shipping take?",
    answer: "Standard shipping typically takes 5-7 business days. Express shipping options are available for faster delivery within 2-3 business days."
  },
  {
    question: "Do you offer free shipping?",
    answer: "Yes! We offer free standard shipping on all orders over $50. For orders under $50, a flat shipping rate of $5.99 applies."
  },
  {
    question: "Can I return or exchange a product?",
    answer: "Absolutely! We accept returns within 30 days of purchase. Items must be in original condition with tags attached. Please see our refund policy for complete details."
  },
  {
    question: "What if the product is damaged or defective?",
    answer: "If you receive a damaged or defective item, please contact us immediately. We'll provide a full refund or replacement at no cost to you, including return shipping."
  },
  {
    question: "How do I track my order?",
    answer: "Once your order ships, you'll receive a tracking number via email. You can use this number to track your package on our website or the carrier's website."
  },
  {
    question: "Is it safe to shop from Avenzo?",
    answer: "Yes, absolutely! We use secure SSL encryption to protect your personal and payment information. Your privacy and security are our top priorities."
  }
];

export const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-16 bg-background">
      <div className="container max-w-4xl">
        {/* FAQ Section */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Questions? We've Got You Covered
          </h2>
        </div>

        <div className="space-y-4 mb-16">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="border border-border rounded-lg overflow-hidden bg-card"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full border-2 border-primary flex items-center justify-center flex-shrink-0">
                    <span className="text-primary text-sm font-medium">?</span>
                  </div>
                  <span className="font-medium text-foreground">{faq.question}</span>
                </div>
                <ChevronDown
                  className={`h-5 w-5 text-muted-foreground transition-transform ${
                    openIndex === index ? "rotate-180" : ""
                  }`}
                />
              </button>
              {openIndex === index && (
                <div className="px-6 pb-4">
                  <div className="pl-9">
                    <p className="text-muted-foreground leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Still Have Questions Section */}
        <div className="relative">
          <div className="text-center py-12 px-6">
            <h3 className="text-2xl font-bold text-foreground mb-4">
              Still Have Questions?
            </h3>
            <p className="text-muted-foreground mb-2">
              We're here 24/7 — use the chatbox on the bottom right to talk to us anytime, or
            </p>
            <p className="text-muted-foreground mb-6">
              email <a href="mailto:info@avenzo.co.in" className="text-primary hover:underline">info@avenzo.co.in</a>
            </p>
            <p className="text-sm text-muted-foreground mb-8">
              by clicking the button below
            </p>
            <Link href="/contact">
              <Button 
                size="lg" 
                className="bg-primary hover:bg-primary/90 text-primary-foreground px-8"
              >
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};