import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Search } from "lucide-react";
import { Link } from "react-router-dom";
import { products, getBrandColor, getBrandInitial } from "@/data/products";

interface SearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

const SearchOverlay = ({ isOpen, onClose }: SearchOverlayProps) => {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setQuery("");
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [isOpen, onClose]);

  const results = query.trim().length > 1
    ? products.filter(
        (p) =>
          p.name.toLowerCase().includes(query.toLowerCase()) ||
          p.brand.toLowerCase().includes(query.toLowerCase())
      ).slice(0, 12)
    : [];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[60] bg-ink/95 backdrop-blur-sm flex flex-col"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 md:px-12 py-6">
            <span className="font-display text-xl text-cream tracking-wider">
              <span className="text-saffron">SEARCH</span>
            </span>
            <button onClick={onClose} className="text-cream hover:text-saffron transition-colors">
              <X size={24} />
            </button>
          </div>

          {/* Search Input */}
          <div className="px-6 md:px-12 pb-8">
            <div className="flex items-center gap-4 border-b-2 border-cream/20 pb-3">
              <Search size={24} className="text-cream/40" />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search products or brands..."
                className="w-full bg-transparent font-display text-3xl md:text-5xl text-cream placeholder:text-cream/20 outline-none tracking-wider"
              />
            </div>
          </div>

          {/* Results */}
          <div className="flex-1 overflow-y-auto px-6 md:px-12 pb-12">
            {query.trim().length > 1 && (
              <p className="font-mono text-xs uppercase tracking-widest text-cream/40 mb-6">
                {results.length} result{results.length !== 1 ? "s" : ""}
              </p>
            )}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {results.map((product) => (
                <Link
                  key={product.id}
                  to={`/product/${product.id}`}
                  onClick={onClose}
                  className="group block"
                >
                  <div className="aspect-[4/5] overflow-hidden">
                    {product.image ? (
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    ) : (
                      <div
                        className="w-full h-full flex items-center justify-center"
                        style={{ backgroundColor: getBrandColor(product.brand) }}
                      >
                        <span className="font-display text-6xl text-white/20">
                          {getBrandInitial(product.brand)}
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="h-[2px] bg-cobalt w-full" />
                  <div className="py-3">
                    <span className="font-mono text-[10px] uppercase tracking-widest text-cream/40">
                      {product.brand}
                    </span>
                    <p className="font-display text-lg text-cream mt-1 line-clamp-1">{product.name}</p>
                    <p className="font-mono text-sm text-cream/50">${product.price}</p>
                  </div>
                </Link>
              ))}
            </div>
            {query.trim().length > 1 && results.length === 0 && (
              <div className="text-center py-20">
                <p className="font-display text-3xl text-cream/30">No results found</p>
                <p className="font-mono text-xs text-cream/20 mt-2 uppercase tracking-widest">
                  Try a different search term
                </p>
              </div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SearchOverlay;
