export const AboutPage = () => {
  return (
    <div className="container py-16 max-w-4xl">
      {/* Hero Section */}
      <div className="space-y-6 mb-16">
        <h1 className="text-4xl md:text-5xl font-bold">About Us</h1>
        <p className="text-lg text-muted-foreground leading-relaxed">
          AVENZO LLC provides high-quality household products designed to make everyday life easier, more organized, and more comfortable. We serve customers across the United States and the United Kingdom with a focus on reliable products and dependable service.
        </p>
        <p className="text-lg text-muted-foreground leading-relaxed">
          Each item is carefully selected to meet practical needs while maintaining strong quality standards, usability, and long-term value.
        </p>
        <p className="text-lg text-muted-foreground leading-relaxed">
          We believe in simple shopping, honest pricing, and consistent customer care — building trust with every order.
        </p>
      </div>

      {/* Divider */}
      <div className="flex justify-center mb-12">
        <div className="text-2xl text-muted-foreground">⸻</div>
      </div>

      {/* What We Offer */}
      <div className="space-y-6 mb-16">
        <h2 className="text-2xl md:text-3xl font-bold">What We Offer</h2>
        <p className="text-muted-foreground leading-relaxed">
          We offer a thoughtfully selected range of household products created for daily use and modern living. Our collection emphasizes functionality, durability, and convenience to help improve everyday routines.
        </p>
        <p className="text-muted-foreground leading-relaxed">
          From organization solutions to practical home essentials, every product is chosen to deliver real value.
        </p>
      </div>

      {/* Divider */}
      <div className="flex justify-center mb-12">
        <div className="text-2xl text-muted-foreground">⸻</div>
      </div>

      {/* Our Commitment */}
      <div className="space-y-6 mb-16">
        <h2 className="text-2xl md:text-3xl font-bold">Our Commitment</h2>
        <p className="text-muted-foreground leading-relaxed">
          AVENZO LLC is committed to transparency, secure transactions, and customer satisfaction. We ensure clear communication, careful order handling, and responsive customer support at every stage.
        </p>
      </div>

      {/* Divider */}
      <div className="flex justify-center mb-12">
        <div className="text-2xl text-muted-foreground">⸻</div>
      </div>

      {/* Our Mission */}
      <div className="space-y-6">
        <h2 className="text-2xl md:text-3xl font-bold">Our Mission</h2>
        <p className="text-muted-foreground leading-relaxed">
          Our mission is to simplify everyday living by providing practical household products and a trustworthy shopping experience for customers in the US and UK.
        </p>
      </div>
    </div>
  );
};