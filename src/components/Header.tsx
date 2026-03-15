import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ShoppingCart, Search, Phone } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import logo from "@/assets/logo.png";
import { useCart } from "@/context/CartContext";

const navLinks = [
  { label: "Home", path: "/" },
  { label: "Products", path: "/products" },
  { label: "Customize", path: "/customize" },
  { label: "Bulk Orders", path: "/bulk-orders" },
  { label: "About Us", path: "/about" },
  { label: "Contact", path: "/contact" },
];

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const { totalItems } = useCart();

  return (
    <header className="sticky top-0 z-50 bg-card/95 backdrop-blur-md border-b border-border">
      {/* Top bar */}
      <div className="bg-steel-dark">
        <div className="container-max px-4 sm:px-6 lg:px-8 flex items-center justify-between py-1.5 text-sm">
          <span className="text-secondary font-body">Premium Steel & Wooden Furniture 14 Bulk Order Delivery Across India</span>
          <a href="tel:+919284707495" className="hidden sm:flex items-center gap-1.5 text-gold-light hover:text-gold transition-colors font-body">
            <Phone className="w-3.5 h-3.5" />
            +91 92847 07495
          </a>
        </div>
      </div>

      {/* Main nav */}
      <div className="container-max px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          <Link to="/" className="flex items-center gap-3 min-w-0">
            <img src={logo} alt="Rounak Steel & Wooden Furniture" className="h-16 lg:h-20 w-auto min-w-[64px]" />
            <div className="flex flex-col min-w-0">
              <span className="font-display text-lg font-bold text-foreground leading-tight block truncate">Rounak</span>
              <span className="text-xs text-muted-foreground font-body truncate">Steel & Wooden Furniture</span>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`font-body text-sm font-medium transition-colors hover:text-primary ${
                  location.pathname === link.path ? "text-primary" : "text-foreground"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <button className="p-2 rounded-lg hover:bg-muted transition-colors" aria-label="Search">
              <Search className="w-5 h-5 text-muted-foreground" />
            </button>
            <Link to="/cart" className="relative p-2 rounded-lg hover:bg-muted transition-colors" aria-label="Cart">
              <ShoppingCart className="w-5 h-5 text-muted-foreground" />
              <span className="absolute -top-0.5 -right-0.5 w-4.5 h-4.5 gold-gradient text-primary-foreground text-[10px] font-bold rounded-full flex items-center justify-center">
                {totalItems}
              </span>
            </Link>
            <button
              className="lg:hidden p-2 rounded-lg hover:bg-muted transition-colors"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="lg:hidden overflow-hidden bg-card border-t border-border"
            >
              <nav className="container-max px-4 py-4 flex flex-col gap-1">
                {navLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={() => setMobileOpen(false)}
                    className={`py-3 px-4 rounded-lg font-body text-sm font-medium transition-colors ${
                      location.pathname === link.path
                        ? "bg-primary/10 text-primary"
                        : "text-foreground hover:bg-muted"
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
    </header>
  );
};

export default Header;
