import { motion } from "framer-motion";
import { ArrowRight, Shield, Truck, Settings } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import heroBg from "@/assets/hero-bg.jpg";

const HeroSection = () => (
  <section className="relative min-h-[85vh] flex items-center overflow-hidden">
    <img src={heroBg} alt="" className="absolute inset-0 w-full h-full object-cover" />
    <div className="absolute inset-0 hero-overlay" />

    <div className="relative container-max px-4 sm:px-6 lg:px-8 py-20">
      <div className="max-w-2xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-gold/20 text-gold-light text-sm font-body font-medium mb-6">
            Trusted Across India
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold leading-tight mb-6 text-secondary">
            Premium Steel & Wooden Furniture for{" "}
            <span className="text-gradient-gold">Homes & Businesses</span>
          </h1>
          <p className="text-lg text-steel font-body leading-relaxed mb-8 max-w-xl">
            High quality steel almirahs, sofa cum beds, racks, and storage solutions with customization and bulk order options — delivered across India.
          </p>

          <div className="flex flex-wrap gap-4 mb-4">
            <Button asChild size="lg" className="gold-gradient text-primary-foreground font-body font-semibold px-8 hover:opacity-90 transition-opacity">
              <Link to="/products">
                Browse Products <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="gold-gradient border-0 text-primary-foreground font-body font-semibold px-8 hover:opacity-90 transition-opacity">
              <Link to="/bulk-orders">Request Bulk Quote</Link>
            </Button>
          </div>
          <div className="flex flex-wrap gap-4">
            {/* WhatsApp group button removed as requested */}
          </div>
        </motion.div>

        {/* Trust badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="flex flex-wrap gap-6 mt-12"
        >
          {[
            { icon: Shield, label: "10 Year Warranty" },
            { icon: Truck, label: "Pan India Bulk Delivery" },
            { icon: Settings, label: "Custom Designs" },
          ].map(({ icon: Icon, label }) => (
            <div key={label} className="flex items-center gap-2.5 text-steel">
              <div className="w-9 h-9 rounded-lg bg-gold/15 flex items-center justify-center">
                <Icon className="w-4.5 h-4.5 text-gold-light" />
              </div>
              <span className="text-sm font-body font-medium text-secondary">{label}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  </section>
);

export default HeroSection;
