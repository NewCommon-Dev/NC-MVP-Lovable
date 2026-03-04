import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import HangerIcon from "@/components/icons/HangerIcon";
import EditorialNav from "@/components/EditorialNav";
import PageBreadcrumbs from "@/components/PageBreadcrumbs";
import ZineFooter from "@/components/ZineFooter";
import { products, getBrandColor, getBrandInitial } from "@/data/products";
import { useWardrobe } from "@/context/WardrobeContext";

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const product = products.find((p) => p.id === Number(id));
  const { addToWardrobe, removeFromWardrobe, isInWardrobe } = useWardrobe();

  if (!product) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <p className="font-display text-4xl">PRODUCT NOT FOUND</p>
          <Link to="/drops" className="font-mono text-xs uppercase tracking-widest text-cobalt hover:underline mt-4 inline-block">
            ← Back to Drops
          </Link>
        </div>
      </div>
    );
  }

  const inWardrobe = isInWardrobe(product.id);

  return (
    <div className="min-h-screen bg-background">
      <EditorialNav />
      <PageBreadcrumbs items={[{ label: "Drops", to: "/drops" }, { label: product.name }]} />

      <section className="pt-4 pb-16 px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 max-w-6xl mx-auto">
          {/* Product Image */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="relative overflow-hidden"
          >
            <div className="aspect-[4/5] overflow-hidden">
              {product.image ? (
                <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
              ) : (
                <div
                  className="w-full h-full flex items-center justify-center"
                  style={{ backgroundColor: getBrandColor(product.brand) }}
                >
                  <span className="font-display text-9xl text-white/20 select-none">
                    {getBrandInitial(product.brand)}
                  </span>
                </div>
              )}
            </div>
            <div className="h-[3px] bg-cobalt w-full" />
          </motion.div>

          {/* Product Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex flex-col justify-center"
          >
            <span className="font-mono text-xs uppercase tracking-widest text-saffron">{product.brand}</span>
            <h1 className="font-display text-4xl md:text-5xl mt-2">{product.name}</h1>
            <p className="font-display text-3xl mt-4 text-foreground">${product.price}</p>

            <div className="flex flex-wrap gap-3 mt-6">
              <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground border border-border px-3 py-1.5">
                {product.category}
              </span>
              <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground border border-border px-3 py-1.5">
                {product.gender}
              </span>
              <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground border border-border px-3 py-1.5">
                {product.streetCode}
              </span>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 mt-10">
              <motion.a
                href={product.productLink}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="color-block-ink px-8 py-4 font-display text-lg tracking-wider uppercase bauhaus-border text-cream flex items-center justify-center gap-3"
              >
                View Product <ExternalLink size={18} />
              </motion.a>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => inWardrobe ? removeFromWardrobe(product.id) : addToWardrobe(product.id)}
                className={`px-8 py-4 font-display text-lg tracking-wider uppercase bauhaus-border flex items-center justify-center gap-3 transition-colors ${
                  inWardrobe
                    ? "color-block-saffron"
                    : "bg-background text-foreground border-3 border-foreground hover:bg-foreground hover:text-background"
                }`}
              >
                <HangerIcon size={18} filled={inWardrobe} />
                {inWardrobe ? "Remove from Wardrobe" : "Add to Wardrobe"}
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>

      <ZineFooter />
    </div>
  );
};

export default ProductDetail;
