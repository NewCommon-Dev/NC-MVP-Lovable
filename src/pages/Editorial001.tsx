import { motion } from "framer-motion";
import EditorialNav from "@/components/EditorialNav";
import PageBreadcrumbs from "@/components/PageBreadcrumbs";
import ZineFooter from "@/components/ZineFooter";
import farak28 from "@/assets/products/Farak_28.webp";

const Editorial001 = () => {
  return (
    <div className="min-h-screen bg-background">
      <EditorialNav />
      <PageBreadcrumbs items={[{ label: "Editorial", to: "/#editorial" }, { label: "001" }]} />

      {/* Hero Image */}
      <section className="relative h-[70vh] md:h-[85vh] overflow-hidden">
        <img src={farak28} alt="India's new fashion labels" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/20 to-transparent" />
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="absolute bottom-0 left-0 right-0 p-8 md:p-16"
        >
          <span className="font-mono text-xs uppercase tracking-widest text-saffron">Editorial 001</span>
          <h1 className="text-editorial-lg text-cream mt-2 max-w-4xl">
            WHY INDIA'S NEW LABELS PROVE THIS IS <span className="text-saffron">INDIA'S CENTURY</span>
          </h1>
        </motion.div>
      </section>

      {/* Article Body */}
      <article className="max-w-3xl mx-auto px-6 md:px-8 py-16 md:py-24">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="space-y-8"
        >
          <p className="font-body text-lg md:text-xl leading-relaxed text-foreground/90 font-medium">
            India's fashion upstarts aren't just having a moment; they're making the case that the century belongs to India, and they're quietly sketching the blueprint for the new common in global style.
          </p>

          <p className="font-body text-base md:text-lg leading-relaxed text-muted-foreground">
            India's new fashion vanguard doesn't ask for a seat at the table; it builds its own, then hand-stitches the chairs. In studios from Delhi to Bengaluru, labels are fusing ancestral craft with future-facing silhouettes—and exporting that confidence worldwide.
          </p>

          <p className="font-body text-base md:text-lg leading-relaxed text-muted-foreground">
            GullyLabs turns sneakers into cultural encyclopedias, dropping hand-lasted collections inspired by Indian motifs and built to stand next to any global sneaker drop. Banjaaran Studio treats footwear like heirlooms, blending centuries-old shoemaking traditions with sharply modern, gender-inclusive designs that are as comfortable in a gallery as they are on a street corner. Farak and Bluorng weaponize streetwear as soft power, pairing oversized, unisex silhouettes with South Asian craft and pop-culture polish, speaking fluently to a generation raised on both local lore and global memes.
          </p>

          <p className="font-body text-base md:text-lg leading-relaxed text-muted-foreground">
            Perte D'ego offers hand-made resort-ready pieces from a New Delhi studio, positioning sustainable, artisanal Indian luxury as vacation uniform rather than "ethnic" costume. Codebrwn literally prints an artist's surreal canvases onto clothing, reframing "Indian luxury" as a perspective, not a price tag. Kapoor 2.0 extends a celebrated designer's universe into a more accessible line, where spiritual themes, street energy, and experimental fabric treatments are engineered for global wardrobes, not just runway moments.
          </p>

          <div className="border-l-4 border-saffron pl-6 my-12">
            <p className="font-display text-2xl md:text-3xl leading-tight text-foreground">
              TOGETHER, THESE LABELS SIGNAL A POWER SHIFT: INDIA IS MOVING FROM BEING THE WORLD'S FACTORY TO BEING ONE OF ITS MOST INTRIGUING MOODBOARDS.
            </p>
          </div>

          <p className="font-body text-base md:text-lg leading-relaxed text-muted-foreground">
            The country's fashion story is no longer about low-cost production and quiet back-end excellence; it's about taste-making, storytelling, and point of view. The pivot from price-led imitation to culture-led differentiation is already visible in the way these brands talk, shoot, and ship.
          </p>

          <p className="font-body text-base md:text-lg leading-relaxed text-muted-foreground">
            In a century defined by identity and pluralism, India's advantage is narrative density. These brands don't just sell clothes; they sell specificities—hyper-local stories, crafts, and emotional cues that algorithmic fast fashion can't replicate. Every sneaker drop, hand-tooled leather sole, or oversize graphic tee becomes an act of translation: from lane to world, from memory to marketplace.
          </p>

          <p className="font-body text-base md:text-lg leading-relaxed text-muted-foreground">
            The 20th century belonged to industrial speed; this one will belong to cultural bandwidth—and on that front, India is overqualified. The country is no longer just answering, "Can we make this cheaper?" but posing a more subversive question: "Can you keep up with how interesting we're about to get?" If you want to know what the future of fashion looks like, don't just watch the big four fashion weeks. Watch what's quietly selling out online in India—and then watch it ship everywhere.
          </p>
        </motion.div>
      </article>

      <ZineFooter />
    </div>
  );
};

export default Editorial001;
