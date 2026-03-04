import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const ZineFooter = () => {
  return (
    <footer className="color-block-ink px-6 py-16">
      <div className="max-w-[1400px] mx-auto">
        {/* Big typographic statement */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <h2 className="text-editorial-lg text-cream">
            FASHION IS
            <br />
            <span className="text-saffron">IDENTITY.</span>
          </h2>
        </motion.div>

        {/* Grid info */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pb-12 border-b border-cream/10">
          <div>
            <p className="font-mono text-xs uppercase tracking-widest text-cream/40 mb-4">Platform</p>
            <ul className="space-y-2 font-body text-sm text-cream/70">
              <li><a href="#" className="hover:text-saffron transition-colors">Brands</a></li>
              <li><a href="#" className="hover:text-saffron transition-colors">Editorials</a></li>
              <li><a href="#" className="hover:text-saffron transition-colors">Drops</a></li>
            </ul>
          </div>
          <div>
            <p className="font-mono text-xs uppercase tracking-widest text-cream/40 mb-4">For Brands</p>
            <ul className="space-y-2 font-body text-sm text-cream/70">
              <li><a href="#" className="hover:text-saffron transition-colors">Criteria for Listing</a></li>
              <li><Link to="/apply" className="hover:text-saffron transition-colors">Apply for New/Common</Link></li>
            </ul>
          </div>
          <div>
            <p className="font-mono text-xs uppercase tracking-widest text-cream/40 mb-4">Culture</p>
            <ul className="space-y-2 font-body text-sm text-cream/70">
              <li><a href="#" className="hover:text-saffron transition-colors">Journal</a></li>
              <li><a href="#" className="hover:text-saffron transition-colors">Archive</a></li>
              <li><a href="#" className="hover:text-saffron transition-colors">Events</a></li>
            </ul>
          </div>
          <div>
            <p className="font-mono text-xs uppercase tracking-widest text-cream/40 mb-4">Connect</p>
            <ul className="space-y-2 font-body text-sm text-cream/70">
              <li><a href="#" className="hover:text-saffron transition-colors">Instagram</a></li>
              <li><a href="#" className="hover:text-saffron transition-colors">Twitter/X</a></li>
              <li><a href="#" className="hover:text-saffron transition-colors">Newsletter</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mt-8 gap-4">
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 bg-saffron" />
            <span className="font-display text-xl text-cream tracking-wider">
              <span className="text-saffron">NEW</span>/COMMON
            </span>
          </div>
          <p className="font-mono text-xs text-cream/30 tracking-wider">
            © 2026 NEW/COMMON — INDIA'S FASHION DISCOVERY PLATFORM
          </p>
        </div>
      </div>
    </footer>
  );
};

export default ZineFooter;
