export const HeroBanner = () => {
  return (
    <section className="relative w-full overflow-hidden">
      <div className="relative h-[280px] md:h-[340px] lg:h-[400px]">
        <img
          src="/assets/hero-banner.jpg"
          alt="Avenzoa Home Collection"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background/60 to-transparent" />
        <div className="absolute inset-0 flex items-center">
          <div className="container">
            <div className="max-w-md space-y-4">
              <p className="text-sm font-medium uppercase tracking-widest text-foreground/70">
                New Collection
              </p>
              <h1 className="font-serif text-4xl md:text-5xl font-bold text-foreground">
                Shop
              </h1>
              <p className="text-sm text-muted-foreground">
                Home &gt; Shop
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
