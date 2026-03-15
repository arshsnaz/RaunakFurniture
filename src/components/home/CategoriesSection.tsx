import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import almirahMirror from "@/assets/product-almirah-mirror.jpg";
import rack1 from "@/assets/product-rack-1.jpg";
import sofaCumbed from "@/assets/product-sofa-cumbed.jpg";
import storageBox from "@/assets/product-storage-box.jpg";
import almirah3door from "@/assets/product-almirah-3door.jpg";
import almirahColored from "@/assets/product-almirah-colored.jpg";

const categories = [
  { name: "Mirror Door Almirahs", image: almirahMirror, desc: "Premium steel almirahs with full-length mirror & lock" },
  { name: "3-Door Almirahs", image: almirah3door, desc: "Spacious 3-door wardrobes with drawers & mirror" },
  { name: "Colored Almirahs", image: almirahColored, desc: "Vibrant two-tone almirahs with double mirror doors" },
  { name: "Commercial Racks", image: rack1, desc: "Heavy-duty custom-size racks for shops & warehouses" },
  { name: "Steel Sofa Cum Beds", image: sofaCumbed, desc: "Convertible steel sofa cum beds with storage" },
  { name: "Ration Storage Boxes", image: storageBox, desc: "Steel boxes for storing grains, rice, dal & more" },
];

const CategoriesSection = () => (
  <section className="section-padding bg-background">
    <div className="container-max">
      <div className="text-center mb-12">
        <span className="text-primary text-sm font-body font-semibold tracking-wider uppercase">Our Range</span>
        <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground mt-2">
          Furniture Categories
        </h2>
      </div>

      <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
        {categories.map((cat, i) => (
          <motion.div
            key={cat.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
          >
            <Link
              to="/products"
              className="group block bg-card rounded-2xl overflow-hidden card-shadow hover:elevated-shadow transition-shadow duration-300"
            >
              <div className="w-full h-48 sm:h-56 md:h-60 lg:h-64 overflow-hidden flex items-center justify-center bg-background">
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-auto h-full max-h-full object-contain group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
              </div>
              <div className="p-4">
                <h3 className="font-display text-lg font-semibold text-foreground mb-1">{cat.name}</h3>
                <p className="text-sm text-muted-foreground font-body mb-3">{cat.desc}</p>
                <span className="inline-flex items-center gap-1 text-primary text-sm font-body font-medium group-hover:gap-2 transition-all">
                  Explore <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default CategoriesSection;
