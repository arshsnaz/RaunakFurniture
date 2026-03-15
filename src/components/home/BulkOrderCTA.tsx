import { motion } from "framer-motion";
import { Building2, GraduationCap, Stethoscope, Briefcase, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const sectors = [
  { icon: Stethoscope, label: "Hospitals & Medical Stores" },
  { icon: GraduationCap, label: "Schools & Universities" },
  { icon: Briefcase, label: "Offices & Corporates" },
  { icon: Building2, label: "Warehouses & Shops" },
];

const BulkOrderCTA = () => (
  <section className="section-padding steel-gradient relative overflow-hidden">
    <div className="absolute inset-0 bg-gradient-to-br from-steel-dark/90 to-steel-dark/70" />
    <div className="container-max relative">
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-gold text-sm font-body font-semibold tracking-wider uppercase">For Businesses</span>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-secondary mt-2 mb-4">
            Bulk Furniture Supply Across India
          </h2>
          <p className="text-steel text-base font-body leading-relaxed mb-8">
            We supply high-quality steel almirahs, storage racks, and office furniture in bulk to businesses, hospitals, schools, and government institutions across India.
          </p>
          <Button asChild size="lg" className="gold-gradient text-primary-foreground font-body font-semibold px-8 hover:opacity-90">
            <Link to="/bulk-orders">
              Request Bulk Quote <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-2 gap-4"
        >
          {sectors.map(({ icon: Icon, label }) => (
            <div key={label} className="bg-secondary/5 backdrop-blur-sm border border-secondary/10 rounded-xl p-5 flex flex-col items-center text-center gap-3">
              <div className="w-12 h-12 rounded-lg bg-gold/15 flex items-center justify-center">
                <Icon className="w-6 h-6 text-gold-light" />
              </div>
              <span className="text-sm font-body font-medium text-secondary">{label}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  </section>
);

export default BulkOrderCTA;
