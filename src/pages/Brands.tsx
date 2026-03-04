import { useState, useMemo, useRef, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import EditorialNav from "@/components/EditorialNav";
import PageBreadcrumbs from "@/components/PageBreadcrumbs";
import ZineFooter from "@/components/ZineFooter";
import { products, allBrands, getBrandColor, getBrandInitial } from "@/data/products";
import { brandDescriptions } from "@/data/brandDescriptions";
import brandsHero from "@/assets/brands-hero.jpg";

const getRandomProducts = (brand: string, count: number) => {
  const brandProducts = products.filter((p) => p.brand === brand);
  const categories = [...new Set(brandProducts.map((p) => p.category))];
  const picked: typeof brandProducts = [];

  for (const cat of categories) {
    if (picked.length >= count) break;
    const fromCat = brandProducts.filter((p) => p.category === cat && !picked.includes(p));
    if (fromCat.length > 0) picked.push(fromCat[0]);
  }

  for (const p of brandProducts) {
    if (picked.length >= count) break;
    if (!picked.includes(p)) picked.push(p);
  }

  return picked.slice(0, count);
};

const Brands = () => {
  const sortedBrands = useMemo(() => [...allBrands].sort((a, b) => a.localeCompare(b)), []);
  const [activeIndex, setActiveIndex] = useState(0);
  const tabsRef = useRef<HTMLDivElement>(null);
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);
  const isClickScrolling = useRef(false);

  const brandData = useMemo(() => {
    return sortedBrands.map((brand) => ({
      brand,
      description: brandDescriptions[brand] || "",
      products: getRandomProducts(brand, 6),
    }));
  }, [sortedBrands]);

  // Scroll-spy: observe which brand section is in view
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (isClickScrolling.current) return;
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const idx = sectionRefs.current.indexOf(entry.target as HTMLDivElement);
            if (idx !== -1) setActiveIndex(idx);
          }
        }
      },
      { rootMargin: "-30% 0px -60% 0px", threshold: 0 }
    );

    sectionRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, [brandData]);

  // Scroll active tab into view in sidebar
  useEffect(() => {
    const container = tabsRef.current;
    if (!container) return;
    const activeBtn = container.children[activeIndex] as HTMLElement;
    if (!activeBtn) return;
    activeBtn.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "nearest" });
  }, [activeIndex]);

  const handleTabClick = useCallback((i: number) => {
    setActiveIndex(i);
    const section = sectionRefs.current[i];
    if (section) {
      isClickScrolling.current = true;
      section.scrollIntoView({ behavior: "smooth", block: "start" });
      setTimeout(() => { isClickScrolling.current = false; }, 1000);
    }
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <EditorialNav />

      {/* Full-bleed Hero */}
      <div className="relative w-full h-[60vh] md:h-[70vh] overflow-hidden">
        <img
          src={brandsHero}
          alt="Editorial fashion brands"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/30 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 px-6 md:px-12 pb-10">
          <span
            className="font-mono text-[11px] uppercase tracking-widest text-saffron"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            The Labels
          </span>
          <h1 className="font-display text-5xl md:text-8xl text-cream mt-2">ALL BRANDS</h1>
          <p className="font-body text-sm md:text-base text-cream/70 max-w-lg mt-3">
            India's boldest independent labels — each with a distinct voice, craft, and vision.
          </p>
        </div>
      </div>

      <PageBreadcrumbs items={[{ label: "Brands" }]} />

      {/* Tabs + Scrollable Content */}
      <section className="mb-16 -mt-4">
        <div className="flex flex-col md:flex-row">
          {/* Tab List */}
          <div className="md:w-56 shrink-0 border-b md:border-b-0 md:border-r border-border overflow-x-auto md:overflow-x-visible md:overflow-y-auto md:max-h-[80vh] md:sticky md:top-16">
            <div ref={tabsRef} className="flex md:flex-col">
              {brandData.map((item, i) => (
                <button
                  key={item.brand}
                  onClick={() => handleTabClick(i)}
                  className={`relative text-left px-6 md:px-8 py-3 md:py-4 font-body uppercase tracking-widest transition-colors whitespace-nowrap ${
                    i === activeIndex
                      ? "text-foreground font-semibold"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                  style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "11px" }}
                >
                  {item.brand}
                  {i === activeIndex && (
                    <motion.div
                      layoutId="brands-tab-indicator"
                      className="absolute md:right-0 md:top-0 md:bottom-0 md:w-[3px] md:h-auto
                                 bottom-0 left-0 right-0 h-[3px] w-auto md:left-auto
                                 bg-saffron"
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Content — all brands rendered vertically */}
          <div className="flex-1">
            {brandData.map((section, sectionIndex) => (
              <div
                key={section.brand}
                ref={(el) => { sectionRefs.current[sectionIndex] = el; }}
                className="p-6 md:p-10 border-b border-border last:border-b-0 scroll-mt-16"
              >
                {/* Brand Header */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5 }}
                  className="mb-8"
                >
                  <span
                    className="font-mono text-[11px] uppercase tracking-widest text-saffron"
                    style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                  >
                    {String(sectionIndex + 1).padStart(2, "0")} / {sortedBrands.length}
                  </span>
                  <h2 className="font-display text-4xl md:text-7xl mt-2">{section.brand}</h2>
                  <p className="font-body text-sm md:text-base leading-relaxed text-muted-foreground mt-4 max-w-xl">
                    {section.description}
                  </p>
                </motion.div>

                {/* Product Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {section.products.map((product, i) => (
                    <motion.div
                      key={product.id}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: i * 0.05 }}
                      className="group cursor-pointer"
                    >
                      <Link to={`/product/${product.id}`} className="block">
                        <div className="aspect-[4/5] overflow-hidden">
                          {product.image ? (
                            <img
                              src={product.image}
                              alt={product.name}
                              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                          ) : (
                            <div
                              className="w-full h-full flex items-center justify-center"
                              style={{ backgroundColor: getBrandColor(product.brand) }}
                            >
                              <span className="font-display text-5xl text-white/20 select-none">
                                {getBrandInitial(product.brand)}
                              </span>
                            </div>
                          )}
                        </div>
                        <div className="h-[3px] bg-cobalt w-full" />
                        <div className="p-3 bg-background">
                          <p className="font-display text-base mt-1 line-clamp-2">{product.name}</p>
                          <p className="font-mono text-xs text-muted-foreground mt-1">${product.price}</p>
                        </div>
                      </Link>
                    </motion.div>
                  ))}
                </div>

                {/* CTA */}
                <div className="flex justify-center mt-10">
                  <Link to={`/drops?brand=${encodeURIComponent(section.brand)}`}>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="color-block-ink px-10 py-4 font-display text-lg tracking-wider uppercase bauhaus-border text-cream"
                    >
                      View All Products →
                    </motion.button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <ZineFooter />
    </div>
  );
};

export default Brands;
