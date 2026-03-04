import { useState, useMemo, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { products, allBrands, getBrandColor, getBrandInitial } from "@/data/products";
import { brandDescriptions } from "@/data/brandDescriptions";

const getProductsForBrand = (brand: string, count: number) => {
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

const FeaturedFits = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const tabsRef = useRef<HTMLDivElement>(null);

  const brandData = useMemo(() => {
    return allBrands.map((brand) => ({
      brand,
      description: brandDescriptions[brand] || "",
      products: getProductsForBrand(brand, 3),
    }));
  }, []);

  const active = brandData[activeIndex];

  // Scroll active tab into view
  useEffect(() => {
    const container = tabsRef.current;
    if (!container) return;
    const activeBtn = container.children[activeIndex] as HTMLElement;
    if (!activeBtn) return;
    activeBtn.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "nearest" });
  }, [activeIndex]);

  return (
    <section className="my-16 mx-3 md:mx-6 border border-border">
      {/* Section Header */}
      <div className="px-6 md:px-10 pt-8 pb-4">
        <span className="font-mono text-[11px] uppercase tracking-widest text-saffron" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
          Curated Selection
        </span>
        <h2 className="font-display text-4xl md:text-6xl mt-1">FEATURED FITS</h2>
      </div>

      {/* Tabs + Content */}
      <div className="flex flex-col md:flex-row">
        {/* Tab List — horizontal scrollable on mobile, vertical scrollable on desktop */}
        <div className="md:w-56 shrink-0 border-b md:border-b-0 md:border-r border-border overflow-x-auto md:overflow-x-visible md:overflow-y-auto md:max-h-[600px]">
          <div ref={tabsRef} className="flex md:flex-col">
            {brandData.map((item, i) => (
              <button
                key={item.brand}
                onClick={() => setActiveIndex(i)}
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
                    layoutId="featured-tab-indicator"
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

        {/* Content Area */}
        <div className="flex-1 min-h-[500px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={active.brand}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.35 }}
              className="p-6 md:p-10"
            >
              <div className="mb-8">
                <h3 className="font-display text-3xl md:text-5xl">{active.brand}</h3>
                <p className="font-body text-sm leading-relaxed text-muted-foreground mt-3 max-w-lg">
                  {active.description}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                {active.products.map((product, i) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: i * 0.1 }}
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
                            <span className="font-display text-7xl text-white/20 select-none">
                              {getBrandInitial(product.brand)}
                            </span>
                          </div>
                        )}
                      </div>
                      <div className="h-[3px] bg-cobalt w-full" />
                      <div className="p-4 bg-background">
                        <span className="font-mono text-[10px] uppercase tracking-widest text-stone">
                          {product.brand}
                        </span>
                        <p className="font-display text-xl mt-1 line-clamp-2">{product.name}</p>
                        <div className="flex items-center justify-between mt-2">
                          <p className="font-mono text-sm text-muted-foreground">${product.price}</p>
                          <span className="font-mono text-[9px] uppercase tracking-widest text-stone">
                            {product.category}
                          </span>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* CTA */}
      <div className="flex justify-center pb-10 pt-4">
        <Link to="/brands">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="color-block-ink px-10 py-4 font-display text-xl tracking-wider uppercase bauhaus-border text-cream"
          >
            View All Brands →
          </motion.button>
        </Link>
      </div>
    </section>
  );
};

export default FeaturedFits;
