import { motion } from "framer-motion";
import { Phone, MessageCircle, ArrowRight, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const ContactCTA = () => (
  <section className="section-padding bg-background">
    <div className="container-max">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="bg-steel-dark rounded-2xl p-8 sm:p-12 lg:p-16 text-center"
      >
        <h2 className="font-display text-3xl sm:text-4xl font-bold text-secondary mb-4">
          Ready to Furnish Your Space?
        </h2>
        <p className="text-steel font-body text-base max-w-xl mx-auto mb-8">
          Get in touch for custom quotes, bulk orders, or to explore our premium furniture collection. We deliver across India for wholesale orders.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Button asChild size="lg" className="gold-gradient text-primary-foreground font-body font-semibold px-8 hover:opacity-90">
            <Link to="/contact">
              Contact Us <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="gold-gradient border-0 text-primary-foreground font-body font-semibold px-8 hover:opacity-90 transition-opacity">
            <a href="https://wa.me/919371725270" target="_blank" rel="noopener noreferrer">
              <MessageCircle className="w-4 h-4 mr-2" /> WhatsApp
            </a>
          </Button>
          <Button asChild variant="outline" size="lg" className="gold-gradient border-0 text-primary-foreground font-body font-semibold px-8 hover:opacity-90 transition-opacity">
            <a href="tel:+919371725270">
              <Phone className="w-4 h-4 mr-2" /> Call Now
            </a>
          </Button>
        </div>
        <div className="mt-6">
          <a
            href="https://chat.whatsapp.com/KpIXbmJGSun6HhdgUh4baz"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-gold-light hover:text-gold transition-colors font-body text-sm"
          >
            <Users className="w-4 h-4" />
            Join our WhatsApp Group for latest updates & offers
          </a>
        </div>
      </motion.div>
    </div>
  </section>
);

export default ContactCTA;
