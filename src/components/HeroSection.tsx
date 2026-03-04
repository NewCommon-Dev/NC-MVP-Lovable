import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import heroPortrait from "@/assets/products/Bluorng_108.webp";
import editorialCollage from "@/assets/editorial-collage.jpg";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen overflow-hidden noise-overlay">
      {/* Background collage image */}
      <div className="absolute inset-0">
        <img
          src={editorialCollage}
          alt="Fashion editorial collage"
          className="w-full h-full object-cover" />
        
        <div className="absolute inset-0 bg-ink/15" />
      </div>

      {/* Main grid layout */}
      <div className="relative z-10 min-h-screen flex flex-col justify-end px-6 pb-12 pt-24">
        {/* Title block */}
        <div className="max-w-[1400px] mx-auto w-full">
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}>
            
            <p className="font-mono text-xs tracking-[0.3em] uppercase text-cream/70 mb-4">
              India's emerging fashion — Vol. 01
            </p>
            <h1 className="text-editorial-xl leading-[0.85]">
              <span className="text-destructive-foreground">YOUR </span>
              <span className="text-saffron">NEW</span>
              <br />
              <span className="text-destructive-foreground">WARDROBE</span>
            </h1>
          </motion.div>

          {/* Bottom bar */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="flex flex-col md:flex-row items-center justify-between mt-4 gap-6 bg-cream p-4 -mx-4 border border-ink text-ink">
            
            <div className="flex items-center gap-6">
              <div className="w-20 h-20 md:w-28 md:h-28 border-2 border-ink/30 overflow-hidden">
                <img
                  src={heroPortrait}
                  alt="Featured designer portrait"
                  className="w-full h-full object-cover border-primary border-solid border" />
                
              </div>
              <div>
                <p className="font-body text-sm text-ink/60 uppercase tracking-widest">Featured</p>
                <p className="font-display text-2xl md:text-3xl text-ink">12 EMERGING LABELS</p>
                <p className="font-body text-xs text-ink/50 mt-1">Redefining Indian streetwear</p>
              </div>
            </div>

            <Link to="/drops">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="color-block-saffron px-8 py-4 font-display text-xl tracking-wider uppercase bauhaus-border">
                Explore Collection →
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Decorative geometric elements */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.6, delay: 1 }}
        className="absolute top-24 right-8 w-16 h-16 bg-red hidden md:block" />
      
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.6, delay: 1.2 }}
        className="absolute top-44 right-8 w-4 h-4 rounded-full bg-lemon hidden md:block" />
      
    </section>);

};

export default HeroSection;