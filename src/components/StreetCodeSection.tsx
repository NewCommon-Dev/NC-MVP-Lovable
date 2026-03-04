import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { products, type Product } from "@/data/products";

const streetCodeData: Record<string, { heading: string; body: string }> = {
  "Desi Streets": {
    heading: "THE GULLY UNIFORM",
    body: "Born from bazaar chaos and block-print heritage — where Hindi-belt hustle meets global swagger.",
  },
  "New Luxury": {
    heading: "QUIET FLEX",
    body: "Elevated essentials that whisper status — hand-finished details, premium fabrics, zero logos screaming.",
  },
  "Utility Modern": {
    heading: "FUNCTION FIRST",
    body: "Engineered for the city grind — ripstop cargos, technical layers, and sneakers built to move.",
  },
  "Indo-Futuristic": {
    heading: "TOMORROW'S INDIA",
    body: "Sci-fi meets subcontinental craft — space-age silhouettes rooted in Indian textile DNA.",
  },
  "Craft Rewired": {
    heading: "HANDMADE REBELLION",
    body: "Traditional artisan techniques hijacked by streetwear — embroidery, patchwork, and block-print gone rogue.",
  },
};

const tabKeys = Object.keys(streetCodeData).sort();

const categoryPriority = ["Tops", "Outerwear", "Bottoms", "Sneakers"];

function selectDiverseProducts(filtered: Product[], max = 4): Product[] {
  const picked: Product[] = [];
  const usedCategories = new Set<string>();

  // First pass: one per priority category
  for (const cat of categoryPriority) {
    if (picked.length >= max) break;
    const match = filtered.find((p) => p.category === cat && !usedCategories.has(cat));
    if (match) {
      picked.push(match);
      usedCategories.add(cat);
    }
  }

  // Second pass: fill remaining slots
  for (const p of filtered) {
    if (picked.length >= max) break;
    if (!picked.includes(p)) picked.push(p);
  }

  return picked;
}

const StreetCodeSection = () => {
  const [activeTab, setActiveTab] = useState(tabKeys[0]);

  const selectedProducts = useMemo(() => {
    const filtered = products.filter((p) => p.streetCode === activeTab);
    return selectDiverseProducts(filtered, 4);
  }, [activeTab]);

  const data = streetCodeData[activeTab];
  const slug = activeTab.toLowerCase().replace(/\s+/g, "-");

  return (
    <div className="mt-16 mb-12 px-4 md:px-8">
      {/* Section label */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <span className="font-mono text-xs uppercase tracking-widest text-saffron">
          Street Code
        </span>
      </motion.div>

      {/* Tab bar */}
      <div className="flex items-center gap-1 mt-4 overflow-x-auto pb-2 scrollbar-hide">
        {tabKeys.map((code) => (
          <button
            key={code}
            onClick={() => setActiveTab(code)}
            className={`whitespace-nowrap px-5 py-2.5 font-mono text-xs uppercase tracking-widest transition-colors ${
              activeTab === code
                ? "color-block-ink text-cream"
                : "bg-background text-foreground border border-border hover:border-foreground"
            }`}
          >
            {code}
          </button>
        ))}
      </div>

      {/* Content: text left + cards right */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mt-8">
        {/* Left column — heading & body */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab + "-text"}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.35 }}
            className="md:col-span-3 flex flex-col justify-center"
          >
            <h3 className="font-display text-5xl md:text-6xl leading-none">
              {data.heading}
            </h3>
            <p className="font-body text-sm leading-relaxed text-muted-foreground mt-4 max-w-xs">
              {data.body}
            </p>
          </motion.div>
        </AnimatePresence>

        {/* Right column — product cards */}
        <div className="md:col-span-9">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab + "-cards"}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-3"
            >
              {selectedProducts.map((product) => (
                <Link
                  key={product.id}
                  to={`/product/${product.id}`}
                  className="group cursor-pointer block"
                >
                  <div className="aspect-[4/5] overflow-hidden">
                    {product.image ? (
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                    ) : (
                      <div className="w-full h-full bg-muted flex items-center justify-center">
                        <span className="font-display text-6xl text-muted-foreground/20">
                          {product.brand.charAt(0)}
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="h-[3px] bg-cobalt w-full" />
                  <div className="p-4 bg-background">
                    <span className="font-mono text-[10px] uppercase tracking-widest text-stone">
                      {product.brand}
                    </span>
                    <p className="font-display text-xl mt-1 line-clamp-2">
                      {product.name}
                    </p>
                    <p className="font-mono text-sm mt-2 text-muted-foreground">
                      ${product.price}
                    </p>
                  </div>
                </Link>
              ))}
            </motion.div>
          </AnimatePresence>

          {/* View All CTA */}
          <div className="flex justify-end mt-6">
            <Link to={`/drops?streetCode=${encodeURIComponent(activeTab)}`}>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="color-block-ink px-8 py-3 font-display text-lg tracking-wider uppercase bauhaus-border text-cream"
              >
                View All →
              </motion.button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StreetCodeSection;
