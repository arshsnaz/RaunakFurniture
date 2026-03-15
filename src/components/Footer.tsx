import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, MessageCircle, Users } from "lucide-react";
import logo from "@/assets/logo.png";

const Footer = () => (
  <footer className="bg-steel-dark text-secondary">
    <div className="container-max section-padding pb-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">
        {/* Brand */}
        <div>
          <div className="flex items-center gap-3 mb-4">
            <img src={logo} alt="Rounak Furniture" className="h-12 w-auto" />
            <div>
              <span className="font-display text-lg font-bold text-gold-light block">Rounak</span>
              <span className="text-xs text-steel">Steel & Wooden Furniture</span>
            </div>
          </div>
          <p className="text-steel text-sm leading-relaxed font-body">
            Premium steel almirahs, commercial racks, sofa cum beds, and storage solutions with customization and pan-India bulk delivery.
          </p>
          <a
            href="https://chat.whatsapp.com/KpIXbmJGSun6HhdgUh4baz"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 mt-4 text-sm text-gold-light hover:text-gold transition-colors font-body"
          >
            <Users className="w-4 h-4" />
            Join WhatsApp Group for Updates
          </a>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="font-display text-gold-light text-lg mb-4">Quick Links</h4>
          <ul className="space-y-2.5 font-body text-sm">
            {[
              { label: "Steel Almirahs", path: "/products" },
              { label: "Commercial Racks", path: "/products" },
              { label: "Sofa Cum Beds", path: "/products" },
              { label: "Customize Almirah", path: "/customize" },
              { label: "Bulk Orders", path: "/bulk-orders" },
              { label: "Contact", path: "/contact" },
            ].map((link) => (
              <li key={link.label}>
                <Link to={link.path} className="text-steel hover:text-gold-light transition-colors">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Categories */}
        <div>
          <h4 className="font-display text-gold-light text-lg mb-4">Categories</h4>
          <ul className="space-y-2.5 font-body text-sm text-steel">
            <li>Mirror Door Almirahs</li>
            <li>Double Door Almirahs</li>
            <li>3-Door Almirahs</li>
            <li>Steel Sofa Cum Beds</li>
            <li>Commercial Racks</li>
            <li>Ration Storage Boxes</li>
            <li>Custom Furniture</li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="font-display text-gold-light text-lg mb-4">Contact Us</h4>
          <ul className="space-y-3 font-body text-sm">
            <li className="flex items-start gap-2.5 text-steel">
              <Phone className="w-4 h-4 mt-0.5 text-gold" />
              <div>
                <a href="tel:+919284707495" className="hover:text-gold-light transition-colors block">+91 92847 07495</a>
                <a href="tel:+919881433875" className="hover:text-gold-light transition-colors block">+91 98814 33875</a>
              </div>
            </li>
            <li className="flex items-start gap-2.5 text-steel">
              <Mail className="w-4 h-4 mt-0.5 text-gold" />
              <a href="mailto:abubakarchanda3@gmail.com" className="hover:text-gold-light transition-colors">abubakarchanda3@gmail.com</a>
            </li>
            <li className="flex items-start gap-2.5 text-steel">
              <MapPin className="w-4 h-4 mt-0.5 text-gold" />
              <span>255, DAV College Road, Raviwar Peth, Bhavani Peth, Solapur, Maharashtra 413002</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="mt-12 pt-8 border-t border-steel/20 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-steel text-xs font-body">
          © {new Date().getFullYear()} Rounak Steel & Wooden Furniture. All rights reserved.
        </p>
        <div className="flex items-center gap-4 text-xs text-steel font-body">
          <span>Privacy Policy</span>
          <span>Terms of Service</span>
        </div>
      </div>
    </div>

    {/* WhatsApp FAB */}
    <a
      href="https://wa.me/919371725270"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full gold-gradient hover:opacity-90 transition-opacity flex items-center justify-center elevated-shadow"
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle className="w-7 h-7 text-card" />
    </a>
  </footer>
);

export default Footer;
