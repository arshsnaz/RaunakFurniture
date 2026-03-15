import { motion } from "framer-motion";
import { Shield, Truck, Settings, Award, Headphones, IndianRupee } from "lucide-react";

const features = [
  { icon: Shield, title: "10-Year Warranty", desc: "All steel furniture comes with 10-year warranty coverage." },
  { icon: Truck, title: "Pan India Bulk Delivery", desc: "Free delivery for bulk & wholesale orders across India." },
  { icon: Settings, title: "Custom Designs", desc: "Customize almirahs & racks to your exact specifications." },
  { icon: Award, title: "Premium Quality", desc: "Heavy-gauge steel and handcrafted furniture." },
  { icon: Headphones, title: "Dedicated Support", desc: "Expert assistance for orders, delivery, and installation." },
  { icon: IndianRupee, title: "Best Prices", desc: "Factory-direct pricing with no middleman markup." },
];

const WhyChooseUs = () => (
  <section className="section-padding bg-background">
    <div className="container-max">
      <div className="text-center mb-12">
        <span className="text-primary text-sm font-body font-semibold tracking-wider uppercase">Our Promise</span>
        <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground mt-2">
          Why Choose Rounak Furniture
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((f, i) => (
          <motion.div
            key={f.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
            className="bg-card rounded-xl p-6 card-shadow hover:elevated-shadow transition-shadow group"
          >
            <div className="w-12 h-12 rounded-xl gold-gradient flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <f.icon className="w-6 h-6 text-primary-foreground" />
            </div>
            <h3 className="font-display text-lg font-semibold text-foreground mb-2">{f.title}</h3>
            <p className="text-sm text-muted-foreground font-body leading-relaxed">{f.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default WhyChooseUs;
