import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { Shield, Award, Truck, Users, Factory, Calendar } from "lucide-react";

const milestones = [
  { year: "2005", title: "Founded in Solapur", desc: "Started as a small steel furniture workshop on DAV College Road." },
  { year: "2010", title: "Expanded Product Line", desc: "Added sofa cum beds, commercial racks, and ration storage boxes." },
  { year: "2015", title: "Pan-India Delivery", desc: "Began bulk shipping across Maharashtra and neighboring states." },
  { year: "2020", title: "Customization Studio", desc: "Launched the almirah customization service for institutional clients." },
  { year: "2024", title: "Digital Presence", desc: "Brought our full catalog online with live customization tools." },
];

const values = [
  { icon: Shield, title: "Quality First", desc: "Every piece uses premium-grade steel with anti-rust treatment and a 10-year warranty." },
  { icon: Factory, title: "Factory Direct", desc: "No middlemen. Buy directly from our Solapur manufacturing unit at wholesale prices." },
  { icon: Truck, title: "Pan-India Delivery", desc: "Reliable shipping for bulk orders across India with safe packaging." },
  { icon: Award, title: "Trusted by Institutions", desc: "Hospitals, schools, government offices, and warehouses rely on our furniture." },
  { icon: Users, title: "Customer Focused", desc: "Custom sizing, color choices, and dedicated support for every order." },
  { icon: Calendar, title: "18+ Years Experience", desc: "Nearly two decades of expertise in steel and wooden furniture manufacturing." },
];

const About = () => (
  <>
    <Header />
    <main>
      {/* Hero */}
      <section className="bg-steel-dark py-20 lg:py-28">
        <div className="container-max px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <span className="text-gold font-body text-sm tracking-widest uppercase">Our Story</span>
            <h1 className="font-display text-4xl sm:text-5xl font-bold text-secondary mt-3 mb-6">
              Crafting Premium Steel Furniture Since 2005
            </h1>
            <p className="text-steel font-body text-lg leading-relaxed">
              Rounak Steel &amp; Wooden Furniture is a Solapur-based manufacturer specializing in steel almirahs, commercial racks, sofa cum beds, and storage solutions. We serve households, businesses, and institutions across India with factory-direct pricing and unmatched durability.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Values */}
      <section className="section-padding bg-background">
        <div className="container-max">
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-display text-3xl font-bold text-foreground text-center mb-12"
          >
            Why Customers Choose Us
          </motion.h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {values.map((v, i) => (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="bg-card border border-border rounded-xl p-6"
              >
                <v.icon className="w-8 h-8 text-gold mb-4" />
                <h3 className="font-display text-lg font-semibold text-foreground mb-2">{v.title}</h3>
                <p className="text-muted-foreground font-body text-sm leading-relaxed">{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="section-padding bg-muted">
        <div className="container-max max-w-3xl">
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-display text-3xl font-bold text-foreground text-center mb-12"
          >
            Our Journey
          </motion.h2>
          <div className="space-y-8">
            {milestones.map((m, i) => (
              <motion.div
                key={m.year}
                initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex gap-6 items-start"
              >
                <div className="flex-shrink-0 w-16 h-16 rounded-full bg-primary flex items-center justify-center">
                  <span className="font-display text-primary-foreground font-bold text-sm">{m.year}</span>
                </div>
                <div>
                  <h3 className="font-display text-lg font-semibold text-foreground">{m.title}</h3>
                  <p className="text-muted-foreground font-body text-sm mt-1">{m.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </main>
    <Footer />
  </>
);

export default About;
