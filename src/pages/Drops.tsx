import { useState, useMemo, useRef, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { X, ChevronDown, SlidersHorizontal } from "lucide-react";
import { Link, useSearchParams } from "react-router-dom";
import EditorialNav from "@/components/EditorialNav";
import PageBreadcrumbs from "@/components/PageBreadcrumbs";
import ZineFooter from "@/components/ZineFooter";
import {
  products,
  allBrands,
  allCategories,
  allGenders,
  allStreetCodes,
  getBrandColor,
  getBrandInitial,
  type Product,
} from "@/data/products";

type SortOption = "default" | "price-asc" | "price-desc" | "brand-az";

const PRODUCTS_PER_PAGE = 24;

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-50px" },
  transition: { duration: 0.5 },
};

const FilterSelect = ({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: string[];
  onChange: (v: string) => void;
}) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const displayLabel = value || label;
  const isActive = !!value;

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen(!open)}
        className={`flex items-center gap-2 border border-border px-4 py-2.5 font-display text-base uppercase tracking-wider cursor-pointer hover:border-foreground transition-colors ${isActive ? "bg-foreground text-background" : "bg-background text-foreground"}`}
      >
        {isActive && <span className="text-sm">✓</span>}
        {displayLabel}
        <ChevronDown size={14} className={`ml-1 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      {open && (
        <div className="absolute top-full left-0 mt-1 z-50 min-w-[200px] max-h-[60vh] overflow-y-auto bg-foreground text-background border border-border shadow-lg overscroll-contain">
          <button
            onClick={() => { onChange(""); setOpen(false); }}
            className={`w-full text-left px-4 py-2.5 font-display text-base uppercase tracking-wider border-b border-background/20 hover:bg-background/10 transition-colors flex items-center gap-2`}
          >
            {!value && <span className="text-sm">✓</span>}
            All
          </button>
          {options.map((opt) => (
            <button
              key={opt}
              onClick={() => { onChange(opt); setOpen(false); }}
              className={`w-full text-left px-4 py-2.5 font-display text-base uppercase tracking-wider border-b border-background/20 last:border-b-0 hover:bg-background/10 transition-colors flex items-center gap-2`}
            >
              {value === opt && <span className="text-sm">✓</span>}
              {opt}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

const ProductCard = ({ product, index }: { product: Product; index: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ duration: 0.5, delay: (index % 4) * 0.05 }}
    className="group cursor-pointer block"
  >
  <Link to={`/product/${product.id}`} className="block">
    <div className="relative overflow-hidden">
      <div className="aspect-[4/5] overflow-hidden">
        {product.image ? (
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
        ) : (
          <div
            className="w-full h-full flex items-center justify-center transition-transform duration-700 group-hover:scale-110"
            style={{ backgroundColor: getBrandColor(product.brand) }}
          >
            <span className="font-display text-7xl md:text-8xl text-white/20 select-none">
              {getBrandInitial(product.brand)}
            </span>
          </div>
        )}
      </div>
    </div>
    {/* Cobalt accent line */}
    <div className="h-[3px] bg-cobalt w-full" />
    <div className="p-4 bg-background">
      <span className="font-mono text-[10px] uppercase tracking-widest text-stone">
        {product.brand}
      </span>
      <p className="font-display text-xl mt-1 line-clamp-2">{product.name}</p>
      <div className="flex items-center justify-between mt-2">
        <p className="font-mono text-sm text-muted-foreground">${product.price}</p>
        <span className="font-mono text-[9px] uppercase tracking-widest text-stone">
          {product.streetCode}
        </span>
      </div>
    </div>
  </Link>
  </motion.div>
);

const Drops = () => {
  const [searchParams] = useSearchParams();
  const initialStreetCode = searchParams.get("streetCode") || "";
  const initialBrand = searchParams.get("brand") || "";

  const [brandFilter, setBrandFilter] = useState(initialBrand);
  const [categoryFilter, setCategoryFilter] = useState("");
  const [genderFilter, setGenderFilter] = useState("");
  const [streetCodeFilter, setStreetCodeFilter] = useState(initialStreetCode);
  const [sort, setSort] = useState<SortOption>("default");
  const [visibleCount, setVisibleCount] = useState(PRODUCTS_PER_PAGE);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [navVisible, setNavVisible] = useState(true);
  const isInitialMount = useRef(true);

  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    if (latest > previous && latest > 50) {
      setNavVisible(false);
    } else {
      setNavVisible(true);
    }
  });

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [brandFilter, categoryFilter, genderFilter, streetCodeFilter, sort]);

  const activeFilters = useMemo(() => {
    const filters: { key: string; label: string; clear: () => void }[] = [];
    if (brandFilter) filters.push({ key: "brand", label: brandFilter, clear: () => setBrandFilter("") });
    if (categoryFilter) filters.push({ key: "category", label: categoryFilter, clear: () => setCategoryFilter("") });
    if (genderFilter) filters.push({ key: "gender", label: genderFilter, clear: () => setGenderFilter("") });
    if (streetCodeFilter) filters.push({ key: "streetCode", label: streetCodeFilter, clear: () => setStreetCodeFilter("") });
    return filters;
  }, [brandFilter, categoryFilter, genderFilter, streetCodeFilter]);

  const filteredProducts = useMemo(() => {
    let result = [...products];
    if (brandFilter) result = result.filter((p) => p.brand === brandFilter);
    if (categoryFilter) result = result.filter((p) => p.category === categoryFilter);
    if (genderFilter) result = result.filter((p) => p.gender === genderFilter);
    if (streetCodeFilter) result = result.filter((p) => p.streetCode === streetCodeFilter);

    switch (sort) {
      case "price-asc":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        result.sort((a, b) => b.price - a.price);
        break;
      case "brand-az":
        result.sort((a, b) => a.brand.localeCompare(b.brand) || a.name.localeCompare(b.name));
        break;
    }
    return result;
  }, [brandFilter, categoryFilter, genderFilter, streetCodeFilter, sort]);

  const visibleProducts = filteredProducts.slice(0, visibleCount);
  const hasMore = visibleCount < filteredProducts.length;

  const clearAllFilters = () => {
    setBrandFilter("");
    setCategoryFilter("");
    setGenderFilter("");
    setStreetCodeFilter("");
  };

  const filterControls = (
    <>
      <FilterSelect label="Brand" value={brandFilter} options={allBrands} onChange={setBrandFilter} />
      <FilterSelect label="Category" value={categoryFilter} options={allCategories} onChange={setCategoryFilter} />
      <FilterSelect label="Gender" value={genderFilter} options={allGenders} onChange={setGenderFilter} />
      <FilterSelect label="Street Code" value={streetCodeFilter} options={allStreetCodes} onChange={setStreetCodeFilter} />
      <FilterSelect
        label="Sort By"
        value={sort === "default" ? "" : sort === "price-asc" ? "Price: Low → High" : sort === "price-desc" ? "Price: High → Low" : "Brand: A → Z"}
        options={["Price: Low → High", "Price: High → Low", "Brand: A → Z"]}
        onChange={(v) => {
          if (v === "Price: Low → High") setSort("price-asc");
          else if (v === "Price: High → Low") setSort("price-desc");
          else if (v === "Brand: A → Z") setSort("brand-az");
          else setSort("default");
        }}
      />
    </>
  );

  return (
    <div className="min-h-screen bg-background">
      <EditorialNav />
      <PageBreadcrumbs items={[{ label: "Drops" }]} />

      {/* Header */}
      <section className="pt-4 pb-8 px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="font-mono text-xs uppercase tracking-widest text-saffron">
            Spring / Summer 2026
          </span>
          <h1 className="text-editorial-lg mt-2">DROPS</h1>
          <p className="font-body text-sm md:text-base text-muted-foreground max-w-lg mt-3">
            130 curated pieces from India's boldest independent labels. Filter by brand, category, or street code to find your next statement.
          </p>
        </motion.div>
      </section>

      {/* Filter Bar — Desktop */}
      <div className={`sticky z-40 bg-background border-y border-border px-6 md:px-12 py-3 transition-[top] duration-300 ${navVisible ? 'top-16' : 'top-0'}`}>
        <div className="hidden md:flex items-center gap-3 flex-wrap">
          {filterControls}
          <div className="ml-auto font-mono text-xs uppercase tracking-widest text-stone">
            {activeFilters.length > 0 ? `${filteredProducts.length} of ${products.length}` : products.length} Product{products.length !== 1 ? "s" : ""}
          </div>
        </div>

        {/* Mobile filter toggle */}
        <div className="md:hidden flex items-center justify-between">
          <button
            onClick={() => setMobileFiltersOpen(!mobileFiltersOpen)}
            className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest"
          >
            <SlidersHorizontal size={16} />
            Filters {activeFilters.length > 0 && `(${activeFilters.length})`}
          </button>
          <span className="font-mono text-xs uppercase tracking-widest text-stone">
            {activeFilters.length > 0 ? `${filteredProducts.length} of ${products.length}` : products.length} Products
          </span>
        </div>

        {/* Mobile filters expanded */}
        <AnimatePresence>
          {mobileFiltersOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="md:hidden overflow-hidden"
            >
              <div className="flex flex-col gap-2 pt-3">
                {filterControls}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Active Filter Chips */}
      {activeFilters.length > 0 && (
        <div className="px-6 md:px-12 py-3 flex items-center gap-2 flex-wrap">
          {activeFilters.map((f) => (
            <button
              key={f.key}
              onClick={f.clear}
              className="flex items-center gap-1.5 color-block-lemon px-3 py-1.5 font-mono text-[10px] uppercase tracking-widest font-bold hover:opacity-80 transition-opacity"
            >
              {f.label}
              <X size={12} />
            </button>
          ))}
          <button
            onClick={clearAllFilters}
            className="font-mono text-[10px] uppercase tracking-widest text-stone hover:text-foreground transition-colors ml-2"
          >
            Clear All
          </button>
        </div>
      )}

      {/* Product Grid */}
      <section className="px-6 md:px-12 py-8">
        {filteredProducts.length === 0 ? (
          <div className="text-center py-20">
            <p className="font-display text-3xl text-muted-foreground">No products found</p>
            <button
              onClick={clearAllFilters}
              className="mt-4 font-mono text-xs uppercase tracking-widest text-cobalt hover:underline"
            >
              Clear all filters
            </button>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {visibleProducts.map((product, i) => (
                <ProductCard key={product.id} product={product} index={i} />
              ))}
            </div>

            {/* Load More */}
            {hasMore && (
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="flex justify-center mt-12"
              >
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setVisibleCount((prev) => prev + PRODUCTS_PER_PAGE)}
                  className="color-block-ink px-10 py-4 font-display text-xl tracking-wider uppercase bauhaus-border text-cream"
                >
                  Load More ({filteredProducts.length - visibleCount} remaining) →
                </motion.button>
              </motion.div>
            )}
          </>
        )}
      </section>

      <ZineFooter />
    </div>
  );
};

export default Drops;
