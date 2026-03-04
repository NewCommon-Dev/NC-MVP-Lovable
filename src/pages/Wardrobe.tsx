import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { X } from "lucide-react";
import HangerIcon from "@/components/icons/HangerIcon";
import EditorialNav from "@/components/EditorialNav";
import PageBreadcrumbs from "@/components/PageBreadcrumbs";
import ZineFooter from "@/components/ZineFooter";
import { products, getBrandColor, getBrandInitial } from "@/data/products";
import { useWardrobe } from "@/context/WardrobeContext";

const Wardrobe = () => {
  const { items, removeFromWardrobe } = useWardrobe();
  const wardrobeProducts = products.filter((p) => items.includes(p.id));

  return (
    <div className="min-h-screen bg-background">
      <EditorialNav />
      <PageBreadcrumbs items={[{ label: "Wardrobe" }]} />

      <section className="pt-4 pb-8 px-6 md:px-12">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <span className="font-mono text-xs uppercase tracking-widest text-saffron">Your Collection</span>
          <h1 className="text-editorial-lg mt-2">WARDROBE</h1>
          <p className="font-body text-sm md:text-base text-muted-foreground max-w-lg mt-3">
            {wardrobeProducts.length} piece{wardrobeProducts.length !== 1 ? "s" : ""} saved to your wardrobe.
          </p>
        </motion.div>
      </section>

      <section className="px-6 md:px-12 py-8 min-h-[40vh]">
        {wardrobeProducts.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center py-20 text-center"
          >
            <HangerIcon size={48} className="text-muted-foreground/30 mb-4" />
            <p className="font-display text-3xl text-muted-foreground">YOUR WARDROBE IS EMPTY</p>
            <p className="font-body text-sm text-muted-foreground mt-2">Browse drops and add pieces you love.</p>
            <Link
              to="/drops"
              className="mt-6 color-block-ink px-8 py-3 font-display text-lg tracking-wider uppercase bauhaus-border text-cream inline-block"
            >
              Explore Drops →
            </Link>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {wardrobeProducts.map((product, i) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                className="group relative"
              >
                <Link to={`/product/${product.id}`} className="block">
                  <div className="relative overflow-hidden">
                    <div className="aspect-[4/5] overflow-hidden">
                      {product.image ? (
                        <img src={product.image} alt={product.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center" style={{ backgroundColor: getBrandColor(product.brand) }}>
                          <span className="font-display text-7xl text-white/20 select-none">{getBrandInitial(product.brand)}</span>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="h-[3px] bg-cobalt w-full" />
                  <div className="p-4 bg-background">
                    <span className="font-mono text-[10px] uppercase tracking-widest text-stone">{product.brand}</span>
                    <p className="font-display text-xl mt-1 line-clamp-2">{product.name}</p>
                    <p className="font-mono text-sm mt-2 text-muted-foreground">${product.price}</p>
                  </div>
                </Link>
                <button
                  onClick={() => removeFromWardrobe(product.id)}
                  className="absolute top-3 right-3 w-8 h-8 bg-foreground text-background flex items-center justify-center hover:bg-destructive transition-colors z-10"
                  aria-label="Remove from wardrobe"
                >
                  <X size={14} />
                </button>
              </motion.div>
            ))}
          </div>
        )}
      </section>

      <ZineFooter />
    </div>
  );
};

export default Wardrobe;
