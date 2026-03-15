import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

const testimonials = [
  { name: "Rajesh Kumar", role: "Shop Owner, Solapur", text: "Ordered 20 steel almirahs for my warehouse. The quality and pricing were unmatched. 10-year warranty gives great peace of mind!", rating: 5 },
  { name: "Dr. Priya Sharma", role: "Hospital Admin, Pune", text: "We furnished our entire hospital with Rounak's commercial racks. Excellent build quality and timely bulk delivery.", rating: 5 },
  { name: "Anil Verma", role: "Homeowner, Mumbai", text: "The custom mirror almirah looks stunning in our bedroom. The steel sofa cum bed is also a great space saver!", rating: 5 },
];

const TestimonialsSection = () => (
  <section className="section-padding bg-cream">
    <div className="container-max">
      <div className="text-center mb-12">
        <span className="text-primary text-sm font-body font-semibold tracking-wider uppercase">Reviews</span>
        <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground mt-2">
          What Our Customers Say
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {testimonials.map((t, i) => (
          <motion.div
            key={t.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="bg-card rounded-xl p-6 card-shadow"
          >
            <Quote className="w-8 h-8 text-primary/30 mb-3" />
            <p className="text-sm text-foreground font-body leading-relaxed mb-4">"{t.text}"</p>
            <div className="flex items-center gap-1 mb-3">
              {[...Array(t.rating)].map((_, j) => (
                <Star key={j} className="w-4 h-4 fill-primary text-primary" />
              ))}
            </div>
            <p className="font-body font-semibold text-foreground text-sm">{t.name}</p>
            <p className="text-xs text-muted-foreground font-body">{t.role}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default TestimonialsSection;
