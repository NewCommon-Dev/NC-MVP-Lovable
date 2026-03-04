import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { Search, User } from "lucide-react";
import HangerIcon from "@/components/icons/HangerIcon";
import { Link } from "react-router-dom";
import { useState } from "react";

import { useWardrobe } from "@/context/WardrobeContext";
import SearchOverlay from "@/components/SearchOverlay";

const EditorialNav = () => {
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const { items } = useWardrobe();

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    if (latest > previous && latest > 50) {
      setHidden(true);
    } else {
      setHidden(false);
    }
  });

  return (
    <>
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: hidden ? "-100%" : 0, opacity: 1 }}
        transition={{ duration: 0.25, ease: "easeInOut" }}
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4">

        {/* Persistent semi-transparent gradient background */}
        <div
          className="absolute inset-0 bg-gradient-to-r from-ink/90 via-ink/75 to-ink/65 pointer-events-none" />

        <Link to="/" className="relative font-display text-2xl text-cream tracking-wider hover:opacity-60 transition-opacity">
          <span className="text-saffron">NEW</span>/COMMON
        </Link>

        <div className="relative hidden md:flex items-center gap-8 font-body text-sm tracking-widest uppercase text-cream">
          <Link to="/brands" className="hover:opacity-60 transition-opacity">Brands</Link>
          <a href="/#editorial" className="hover:opacity-60 transition-opacity">Editorial</a>
          <Link to="/drops" className="hover:opacity-60 transition-opacity">Drops</Link>
        </div>

        <div className="relative flex items-center gap-4 font-mono text-xs text-cream uppercase tracking-widest">
          <button onClick={() => setSearchOpen(true)} className="hover:opacity-60 transition-opacity">
            <Search size={20} />
          </button>
          <Link to="/wardrobe" className="relative hover:opacity-60 transition-opacity">
            <HangerIcon size={20} />
            {items.length > 0 &&
            <span className="absolute -top-2 -right-2 w-4 h-4 bg-saffron text-ink text-[9px] font-bold flex items-center justify-center rounded-full">
                {items.length}
              </span>
            }
          </Link>
          <User size={20} className="hover:opacity-60 transition-opacity cursor-pointer" />
        </div>
      </motion.nav>
      <SearchOverlay isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );

};

export default EditorialNav;