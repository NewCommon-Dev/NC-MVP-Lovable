import { motion } from "framer-motion";
import EditorialNav from "@/components/EditorialNav";
import PageBreadcrumbs from "@/components/PageBreadcrumbs";
import ZineFooter from "@/components/ZineFooter";
import codebrwn92 from "@/assets/products/Codebrwn_92.webp";

const Editorial002 = () => {
  return (
    <div className="min-h-screen bg-background">
      <EditorialNav />
      <PageBreadcrumbs items={[{ label: "Editorial", to: "/#editorial" }, { label: "002" }]} />

      {/* Hero Image */}
      <section className="relative h-[70vh] md:h-[85vh] overflow-hidden">
        <img src={codebrwn92} alt="India's fashion wave" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/20 to-transparent" />
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="absolute bottom-0 left-0 right-0 p-8 md:p-16"
        >
          <span className="font-mono text-xs uppercase tracking-widest text-saffron">Editorial 002</span>
          <h1 className="text-editorial-lg text-cream mt-2 max-w-4xl">
            WHY INDIA'S FASHION WAVE IS THE <span className="text-saffron">NEW COMMON</span>
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
            What looks niche today—Indian streetwear with spiritual notes, surrealist sneakers, resort wear stitched in a Delhi studio—is quietly training the global eye. Once someone has worn a pair of artisan-crafted Banjaaran Studio brogues or a hyper-detailed Codebrwn shirt, "basic" starts to feel like a bug, not a feature. The bar moves, one outfit at a time.
          </p>

          <div className="border-l-4 border-cobalt pl-6 my-12">
            <p className="font-display text-2xl md:text-3xl leading-tight text-foreground">
              THREE FORCES MAKE THIS EMERGING INDIAN AESTHETIC THE INEVITABLE NEW COMMON.
            </p>
          </div>

          <p className="font-body text-base md:text-lg leading-relaxed text-muted-foreground">
            First, cross-border shopping is becoming default, not exception. As logistics, payments, and cross-border e‑commerce infrastructure mature, buying a GullyLabs drop from New York or Berlin begins to feel as routine as ordering a book. The friction that once kept "cool Indian brands" as Instagram screenshots and saved posts is dissolving; now they can live in your closet, not just in your feed.
          </p>

          <p className="font-body text-base md:text-lg leading-relaxed text-muted-foreground">
            Second, there is a growing backlash against generic fast fashion. Consumers, especially Gen Z and younger millennials, are gravitating to labels that feel intimate, intentional, and rooted. That's exactly where Farak, Bluorng, and Perte D'ego excel: craft-infused, comfort-first designs that carry a recognizable signature even when the logo is nowhere in sight. The product promise shifts from "you won't notice this" to "you won't forget this."
          </p>

          <p className="font-body text-base md:text-lg leading-relaxed text-muted-foreground">
            Third, design is becoming identity infrastructure. Kapoor 2.0 and its mothership label experiment with clothing as emotional and spiritual interface, not mere outfit. Their work taps into a global appetite for garments that "say something" in a crowded feed—about belief, about mood, about the ways we move through a frantic world. In that context, Indian labels feel less like a regional curiosity and more like early adopters of a universal language.
          </p>

          <div className="border-l-4 border-saffron pl-6 my-12">
            <p className="font-display text-2xl md:text-3xl leading-tight text-foreground">
              THE NEXT LOGICAL STEP IS A DEDICATED, HIGH-TRUST, HIGH-TASTE PLATFORM THAT CURATES THESE LABELS FOR A GLOBAL AUDIENCE.
            </p>
          </div>

          <p className="font-body text-base md:text-lg leading-relaxed text-muted-foreground">
            In this world, discovery becomes the biggest bottleneck. The internet is infinite; human attention is not. That's where new common steps in: a discovery engine and e‑commerce layer that treats these brands as the norm of what fashion should be, not the quirky alternative.
          </p>

          <p className="font-body text-base md:text-lg leading-relaxed text-muted-foreground">
            On new common, a shopper in Dubai, London, or Los Angeles can build a wardrobe that casually mixes GullyLabs with Bluorng, Perte D'ego with Codebrwn, Kapoor 2.0 with Farak—and not think of it as "wearing Indian," just "wearing what feels right now." The platform's quiet provocation is simple: what if this is not the fringe, but the standard?
          </p>

          <p className="font-body text-base md:text-lg leading-relaxed text-muted-foreground">
            When that happens at scale, Indian design isn't a trend; it's infrastructure. The silhouettes, graphics, and stories coming out of today's small studios start to inform what tomorrow's "basics" look like in malls and marketplaces everywhere. Fashion stops flowing exclusively from a handful of Western capitals and starts moving like culture really moves: in currents, from many shores at once.
          </p>

          <p className="font-body text-base md:text-lg leading-relaxed text-muted-foreground">
            The future of fashion will not be dictated from a single center but from a mesh of cultures, crafts, and creators. The brands rising out of India today—and platforms like new common that stitch them together—are less a departure from the norm than an early preview of what the norm is about to become.
          </p>
        </motion.div>
      </article>

      <ZineFooter />
    </div>
  );
};

export default Editorial002;
