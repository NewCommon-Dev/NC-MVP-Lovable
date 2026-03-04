import { useState } from "react";
import { motion } from "framer-motion";
import EditorialNav from "@/components/EditorialNav";
import PageBreadcrumbs from "@/components/PageBreadcrumbs";
import ZineFooter from "@/components/ZineFooter";

const Apply = () => {
  const [form, setForm] = useState({
    brandName: "",
    email: "",
    countryCode: "+91",
    phone: "",
    about: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // For now just show success state
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-background">
      <EditorialNav />
      <PageBreadcrumbs items={[{ label: "Apply" }]} />

      <section className="pt-4 pb-16 px-6 md:px-12 max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="font-mono text-xs uppercase tracking-widest text-saffron">
            For Brands
          </span>
          <h1 className="text-editorial-lg mt-2">APPLY</h1>
          <p className="font-body text-sm md:text-base text-muted-foreground max-w-lg mt-3">
            Join India's most curated fashion discovery platform. Tell us about your brand and why you belong on New/Common.
          </p>
        </motion.div>

        {submitted ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-12 p-8 border border-saffron/30 bg-saffron/5"
          >
            <p className="font-display text-3xl">THANK YOU.</p>
            <p className="font-body text-sm text-muted-foreground mt-2">
              We've received your application. Our team will review and get back to you soon.
            </p>
          </motion.div>
        ) : (
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            onSubmit={handleSubmit}
            className="mt-12 space-y-8"
          >
            {/* Brand Name */}
            <div>
              <label className="font-mono text-xs uppercase tracking-widest text-muted-foreground block mb-2">
                Brand Name
              </label>
              <input
                type="text"
                required
                maxLength={100}
                value={form.brandName}
                onChange={(e) => handleChange("brandName", e.target.value)}
                className="w-full bg-transparent border-b-2 border-border focus:border-saffron outline-none font-display text-2xl py-2 transition-colors placeholder:text-muted-foreground/30"
                placeholder="Your brand name"
              />
            </div>

            {/* Brand Email */}
            <div>
              <label className="font-mono text-xs uppercase tracking-widest text-muted-foreground block mb-2">
                Brand Email
              </label>
              <input
                type="email"
                required
                maxLength={255}
                value={form.email}
                onChange={(e) => handleChange("email", e.target.value)}
                className="w-full bg-transparent border-b-2 border-border focus:border-saffron outline-none font-display text-2xl py-2 transition-colors placeholder:text-muted-foreground/30"
                placeholder="hello@yourbrand.com"
              />
            </div>

            {/* Brand Cell Phone */}
            <div>
              <label className="font-mono text-xs uppercase tracking-widest text-muted-foreground block mb-2">
                Brand Cell Phone
              </label>
              <div className="flex gap-3">
                <input
                  type="text"
                  required
                  maxLength={5}
                  value={form.countryCode}
                  onChange={(e) => handleChange("countryCode", e.target.value)}
                  className="w-20 bg-transparent border-b-2 border-border focus:border-saffron outline-none font-display text-2xl py-2 transition-colors text-center"
                  placeholder="+91"
                />
                <input
                  type="tel"
                  required
                  maxLength={15}
                  value={form.phone}
                  onChange={(e) => handleChange("phone", e.target.value)}
                  className="flex-1 bg-transparent border-b-2 border-border focus:border-saffron outline-none font-display text-2xl py-2 transition-colors placeholder:text-muted-foreground/30"
                  placeholder="9876543210"
                />
              </div>
            </div>

            {/* Tell us about you */}
            <div>
              <label className="font-mono text-xs uppercase tracking-widest text-muted-foreground block mb-2">
                Tell us about you
              </label>
              <p className="font-body text-xs text-muted-foreground mb-3">
                Share why you should be on New/Common
              </p>
              <textarea
                required
                maxLength={1000}
                rows={5}
                value={form.about}
                onChange={(e) => handleChange("about", e.target.value)}
                className="w-full bg-transparent border-2 border-border focus:border-saffron outline-none font-body text-base p-4 transition-colors resize-none placeholder:text-muted-foreground/30"
                placeholder="Tell us about your brand's story, aesthetic, and what makes you different..."
              />
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="color-block-ink px-10 py-4 font-display text-xl tracking-wider uppercase bauhaus-border text-cream w-full"
            >
              Submit Application →
            </motion.button>
          </motion.form>
        )}
      </section>

      <ZineFooter />
    </div>
  );
};

export default Apply;
