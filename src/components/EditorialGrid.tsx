import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import farak28 from "@/assets/products/Farak_28.webp";
import codebrwn92 from "@/assets/products/Codebrwn_92.webp";
import detailAccessories from "@/assets/detail-accessories.jpg";
import StreetCodeSection from "@/components/StreetCodeSection";
import FeaturedFits from "@/components/FeaturedFits";

const fadeUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-100px" },
  transition: { duration: 0.7 }
};

const EditorialGrid = () => {
  return (
    <section className="px-3 py-3">
      {/* Bauhaus-style grid with visible gaps */}
      <div className="editorial-grid grid-cols-1 md:grid-cols-12 md:grid-rows-[400px_300px_auto]">
        {/* Large editorial image — Editorial 001 */}
        <motion.div
          {...fadeUp}
          className="md:col-span-5 md:row-span-2 relative overflow-hidden group cursor-pointer">
          <Link to="/editorial/001" className="block w-full h-full">
            <img
              src={farak28}
              alt="Editorial 001"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
            <div className="absolute inset-0 bg-ink/20 group-hover:bg-ink/40 transition-colors" />
            <div className="absolute bottom-0 left-0 p-6">
              <span className="font-mono text-xs uppercase tracking-widest text-cream/70">Issue 01</span>
              <h3 className="font-display text-4xl md:text-5xl text-cream mt-1">EDITORIAL<br />001</h3>
            </div>
            <div className="absolute top-4 right-4 color-block-red px-3 py-1">
              <span className="font-mono text-xs uppercase tracking-widest">New</span>
            </div>
          </Link>
        </motion.div>

        {/* Saffron text block */}
        <motion.div
          {...fadeUp}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="md:col-span-4 color-block-saffron p-8 flex flex-col justify-between">
          <div>
            <span className="font-mono text-xs uppercase tracking-widest opacity-60">Issue 01 / Spring 2026</span>
            <h3 className="text-editorial-md mt-4">
              WHERE CRAFT MEETS COUNTERCULTURE
            </h3>
            <p className="font-body text-sm leading-relaxed opacity-70 max-w-xs mt-4">
              Discover India's boldest emerging labels — where ancient textile traditions 
              collide with Tokyo's street energy and Berlin's geometric precision.
            </p>
          </div>
          <Link to="/drops">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="color-block-red px-6 py-3 font-display text-lg tracking-wider uppercase bauhaus-border text-cream mt-6">
              Shop Now →
            </motion.button>
          </Link>
        </motion.div>

        {/* Editorial 002 tile */}
        <motion.div
          {...fadeUp}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="md:col-span-3 relative overflow-hidden group cursor-pointer">
          <Link to="/editorial/002" className="block w-full h-full">
            <img
              src={codebrwn92}
              alt="Editorial 002"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-ink/80 to-transparent">
              <p className="font-display text-xl text-cream">EDITORIAL 002</p>
              <p className="font-mono text-xs text-cream/60">The New Common</p>
            </div>
          </Link>
        </motion.div>

        {/* Accessories detail */}
        <motion.div
          {...fadeUp}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="md:col-span-3 relative overflow-hidden group cursor-pointer">
          <img
            src={detailAccessories}
            alt="Contemporary Indian jewelry"
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
          <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-ink/80 to-transparent">
            <p className="font-display text-xl text-cream">ADORN</p>
            <p className="font-mono text-xs text-cream/60">Accessories Edit</p>
          </div>
        </motion.div>

        {/* Our Story / Manifesto */}
        <motion.div
          {...fadeUp}
          transition={{ duration: 0.7, delay: 0.25 }}
          className="md:col-span-4 bg-background p-8 flex flex-col justify-between border border-border">
          <div>
            <span className="font-mono text-xs uppercase tracking-widest text-saffron">OUR STORY</span>
            <p className="font-display text-xl md:text-2xl leading-tight mt-4 text-foreground">
              <span className="font-bold">This is India's century.</span>
            </p>
            <p className="font-body text-sm leading-relaxed text-muted-foreground mt-4">
              We're building a platform to take India's most innovative brands and the new common culture they represent to the world.
            </p>
          </div>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="color-block-cobalt px-6 py-3 font-display text-lg tracking-wider uppercase bauhaus-border text-cream mt-6 w-fit border-primary">
            Our Story →
          </motion.button>
        </motion.div>
      </div>

      {/* Featured Fits Section */}
      <FeaturedFits />

      {/* Street Code Section */}
      <StreetCodeSection />
    </section>);

};

export default EditorialGrid;