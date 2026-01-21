import { Building2, Globe, ShoppingCart, Users, Truck, HeadphonesIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export const AboutPage = () => {
  return (
    <div className="container py-16">
      {/* Hero Section */}
      <div className="text-center space-y-6 mb-16">
        <h1 className="text-4xl md:text-5xl font-bold">About Avenzo</h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
          Your trusted partner for premium household products, serving customers worldwide through innovative e-commerce solutions.
        </p>
      </div>

      {/* Company Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
        <div className="space-y-6">
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <Building2 className="h-8 w-8 text-primary" />
              <h2 className="text-2xl font-semibold">Our Company</h2>
            </div>
            <p className="text-muted-foreground leading-relaxed">
              This website is operated by <strong>AVENZO LLC</strong> and is used for an online retail business. 
              The business sells household products through e-commerce, using this website and third-party online marketplaces.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Products are sourced from trusted suppliers and sold directly to customers. We pride ourselves on 
              offering quality household essentials that enhance your daily living experience.
            </p>
          </div>
        </div>

        <div className="space-y-6">
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <Globe className="h-8 w-8 text-primary" />
              <h2 className="text-2xl font-semibold">Global Reach</h2>
            </div>
            <p className="text-muted-foreground leading-relaxed">
              The business operates fully online and serves customers internationally. Our digital-first approach 
              allows us to reach customers worldwide, providing access to quality household products regardless 
              of geographic location.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              We leverage both our own e-commerce platform and established third-party marketplaces to ensure 
              maximum accessibility and convenience for our customers.
            </p>
          </div>
        </div>
      </div>

      {/* Business Activities */}
      <div className="mb-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">What We Do</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Our comprehensive business activities ensure a seamless shopping experience from product discovery to delivery.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="text-center">
            <CardContent className="p-6 space-y-4">
              <div className="mx-auto w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                <ShoppingCart className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold">Product Listing</h3>
              <p className="text-sm text-muted-foreground">
                Carefully curated household products sourced from trusted suppliers and listed across multiple platforms.
              </p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardContent className="p-6 space-y-4">
              <div className="mx-auto w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold">Digital Marketing</h3>
              <p className="text-sm text-muted-foreground">
                Strategic online marketing to connect customers with the products they need for their homes.
              </p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardContent className="p-6 space-y-4">
              <div className="mx-auto w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                <Building2 className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold">Order Processing</h3>
              <p className="text-sm text-muted-foreground">
                Efficient order management systems ensuring accurate and timely processing of customer orders.
              </p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardContent className="p-6 space-y-4">
              <div className="mx-auto w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                <Truck className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold">Fulfillment</h3>
              <p className="text-sm text-muted-foreground">
                Reliable fulfillment operations ensuring products reach customers safely and on time.
              </p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardContent className="p-6 space-y-4">
              <div className="mx-auto w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                <HeadphonesIcon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold">Customer Support</h3>
              <p className="text-sm text-muted-foreground">
                Dedicated customer support team providing assistance throughout the shopping journey.
              </p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardContent className="p-6 space-y-4">
              <div className="mx-auto w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                <Globe className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold">International Service</h3>
              <p className="text-sm text-muted-foreground">
                Global shipping and support capabilities serving customers across different countries and regions.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Mission Statement */}
      <div className="bg-muted/50 rounded-lg p-8 md:p-12 text-center">
        <h2 className="text-2xl md:text-3xl font-bold mb-6">Our Mission</h2>
        <p className="text-lg text-muted-foreground max-w-4xl mx-auto leading-relaxed">
          At Avenzo LLC, we are committed to providing high-quality household products that enhance everyday living. 
          Through our fully online operations, we connect customers worldwide with trusted suppliers, ensuring 
          access to premium home essentials with exceptional service and reliable delivery.
        </p>
      </div>

      {/* Contact Information */}
      <div className="mt-16 text-center">
        <h2 className="text-2xl font-bold mb-4">Get in Touch</h2>
        <p className="text-muted-foreground mb-6">
          Have questions about our products or services? We're here to help.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a 
            href="mailto:info@avenzo.com" 
            className="inline-flex items-center justify-center px-6 py-3 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
          >
            Contact Us
          </a>
          <a 
            href="/cart" 
            className="inline-flex items-center justify-center px-6 py-3 border border-border rounded-md hover:bg-muted transition-colors"
          >
            Shop Now
          </a>
        </div>
      </div>
    </div>
  );
};