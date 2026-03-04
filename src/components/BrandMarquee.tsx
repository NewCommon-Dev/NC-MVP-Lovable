const brands = [
  "ALMOST GODS", "KAPOOR 2.0", "FARAK", "GULLY LABS", "BANJARAN", "PERTE D'EGO",
  "BISKIT", "COMET", "CODEBRWN", "BLUORNG", "HUEMN"
];

const BrandMarquee = () => {
  return (
    <section className="color-block-ink py-4 overflow-hidden bauhaus-border border-x-0">
      <div className="flex animate-marquee whitespace-nowrap">
        {[...brands, ...brands].map((brand, i) => (
          <span
            key={i}
            className="font-display text-3xl md:text-5xl text-cream/90 mx-6 md:mx-12 inline-flex items-center gap-4"
          >
            {brand}
            <span className="w-2 h-2 bg-saffron inline-block" />
          </span>
        ))}
      </div>
    </section>
  );
};

export default BrandMarquee;
