import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Star, ShoppingCart, SlidersHorizontal, X, ChevronDown, Eye } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useCart } from "@/context/CartContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { products, categories, type Product } from "@/data/products";
import ProductDetailModal from "@/components/products/ProductDetailModal";

const sortOptions = [
  { value: "featured", label: "Featured" },
  { value: "price-low", label: "Price: Low to High" },
  { value: "price-high", label: "Price: High to Low" },
  { value: "rating", label: "Top Rated" },
  { value: "newest", label: "Newest" },
];

const priceRanges = [
  { id: "all", label: "All Prices", min: 0, max: Infinity },
  { id: "under-5k", label: "Under ₹5,000", min: 0, max: 5000 },
  { id: "5k-10k", label: "₹5,000 – ₹10,000", min: 5000, max: 10000 },
  { id: "10k-20k", label: "₹10,000 – ₹20,000", min: 10000, max: 20000 },
  { id: "above-20k", label: "Above ₹20,000", min: 20000, max: Infinity },
];

const Products = () => {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [sortBy, setSortBy] = useState("featured");
  const [priceRange, setPriceRange] = useState("all");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const { addToCart } = useCart();
  const { toast } = useToast();

  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Category filter
    if (activeCategory !== "all") {
      result = result.filter((p) => p.category === activeCategory);
    }

    // Search filter
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.material.toLowerCase().includes(q) ||
          p.features.some((f) => f.toLowerCase().includes(q))
      );
    }

    // Price filter
    const range = priceRanges.find((r) => r.id === priceRange);
    if (range && range.id !== "all") {
      result = result.filter((p) => p.price >= range.min && p.price < range.max);
    }

    // Sort
    switch (sortBy) {
      case "price-low":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        result.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        result.sort((a, b) => b.rating - a.rating);
        break;
      case "newest":
        result.reverse();
        break;
    }

    return result;
  }, [search, activeCategory, sortBy, priceRange]);

  const clearFilters = () => {
    setSearch("");
    setActiveCategory("all");
    setSortBy("featured");
    setPriceRange("all");
  };

  const hasActiveFilters = search || activeCategory !== "all" || sortBy !== "featured" || priceRange !== "all";

  return (
    <>
      <Header />
      <main className="min-h-screen bg-background">
        {/* Page Header */}
        <section className="bg-steel-dark py-12 sm:py-16">
          <div className="container-max px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-secondary mb-3">
              Our Products
            </h1>
            <p className="font-body text-gold-light max-w-2xl mx-auto">
              Browse our complete range of premium steel almirahs, commercial racks, sofa cum beds & storage solutions. Prices vary by material, steel gauge & weight.
            </p>
          </div>
        </section>

        <div className="container-max px-4 sm:px-6 lg:px-8 py-8">
          {/* Search & Controls */}
          <div className="flex flex-col sm:flex-row gap-3 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search products, materials, features…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10 font-body"
              />
              {search && (
                <button onClick={() => setSearch("")} className="absolute right-3 top-1/2 -translate-y-1/2">
                  <X className="w-4 h-4 text-muted-foreground hover:text-foreground" />
                </button>
              )}
            </div>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-full sm:w-48 font-body">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {sortOptions.map((o) => (
                  <SelectItem key={o.value} value={o.value} className="font-body">
                    {o.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Mobile filter sheet */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" className="sm:hidden font-body">
                  <SlidersHorizontal className="w-4 h-4 mr-2" /> Filters
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-80">
                <SheetHeader>
                  <SheetTitle className="font-display">Filters</SheetTitle>
                </SheetHeader>
                <div className="mt-6 space-y-6">
                  <div>
                    <h4 className="font-body font-semibold text-sm mb-3 text-foreground">Category</h4>
                    <div className="space-y-2">
                      {categories.map((c) => (
                        <button
                          key={c.id}
                          onClick={() => setActiveCategory(c.id)}
                          className={`block w-full text-left px-3 py-2 rounded-lg text-sm font-body transition-colors ${
                            activeCategory === c.id ? "bg-primary/10 text-primary font-medium" : "text-muted-foreground hover:bg-muted"
                          }`}
                        >
                          {c.label}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="font-body font-semibold text-sm mb-3 text-foreground">Price Range</h4>
                    <div className="space-y-2">
                      {priceRanges.map((r) => (
                        <button
                          key={r.id}
                          onClick={() => setPriceRange(r.id)}
                          className={`block w-full text-left px-3 py-2 rounded-lg text-sm font-body transition-colors ${
                            priceRange === r.id ? "bg-primary/10 text-primary font-medium" : "text-muted-foreground hover:bg-muted"
                          }`}
                        >
                          {r.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>

          <div className="flex gap-8">
            {/* Desktop Sidebar */}
            <aside className="hidden sm:block w-56 flex-shrink-0">
              <div className="sticky top-28 space-y-6">
                <div>
                  <h4 className="font-display text-sm font-semibold mb-3 text-foreground">Category</h4>
                  <div className="space-y-1">
                    {categories.map((c) => (
                      <button
                        key={c.id}
                        onClick={() => setActiveCategory(c.id)}
                        className={`block w-full text-left px-3 py-2 rounded-lg text-sm font-body transition-colors ${
                          activeCategory === c.id ? "bg-primary/10 text-primary font-medium" : "text-muted-foreground hover:bg-muted"
                        }`}
                      >
                        {c.label}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="border-t border-border pt-4">
                  <h4 className="font-display text-sm font-semibold mb-3 text-foreground">Price Range</h4>
                  <div className="space-y-1">
                    {priceRanges.map((r) => (
                      <button
                        key={r.id}
                        onClick={() => setPriceRange(r.id)}
                        className={`block w-full text-left px-3 py-2 rounded-lg text-sm font-body transition-colors ${
                          priceRange === r.id ? "bg-primary/10 text-primary font-medium" : "text-muted-foreground hover:bg-muted"
                        }`}
                      >
                        {r.label}
                      </button>
                    ))}
                  </div>
                </div>

                {hasActiveFilters && (
                  <Button variant="ghost" size="sm" onClick={clearFilters} className="w-full text-destructive font-body">
                    <X className="w-3.5 h-3.5 mr-1" /> Clear All Filters
                  </Button>
                )}
              </div>
            </aside>

            {/* Product Grid */}
            <div className="flex-1">
              <div className="flex items-center justify-between mb-4">
                <p className="text-sm text-muted-foreground font-body">
                  Showing <span className="font-semibold text-foreground">{filteredProducts.length}</span> products
                </p>
                {hasActiveFilters && (
                  <button onClick={clearFilters} className="hidden sm:flex items-center gap-1 text-xs text-destructive font-body hover:underline">
                    <X className="w-3 h-3" /> Clear filters
                  </button>
                )}
              </div>

              {filteredProducts.length === 0 ? (
                <div className="text-center py-20">
                  <p className="font-display text-xl text-foreground mb-2">No products found</p>
                  <p className="text-muted-foreground font-body text-sm mb-4">Try adjusting your search or filters.</p>
                  <Button variant="outline" onClick={clearFilters} className="font-body">
                    Clear All Filters
                  </Button>
                </div>
              ) : (
                <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                  <AnimatePresence mode="popLayout">
                    {filteredProducts.map((p) => (
                      <motion.div
                        key={p.id}
                        layout
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.3 }}
                        className="group bg-card rounded-xl overflow-hidden card-shadow hover:elevated-shadow transition-shadow"
                      >
                        <div className="relative aspect-square overflow-hidden">
                          <img
                            src={p.image}
                            alt={p.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            loading="lazy"
                          />
                          {p.badge && (
                            <Badge className="absolute top-3 left-3 gold-gradient text-primary-foreground font-body text-xs border-0">
                              {p.badge}
                            </Badge>
                          )}
                          <div className="absolute top-3 right-3 bg-destructive text-destructive-foreground text-xs font-body font-bold px-2 py-0.5 rounded">
                            {Math.round((1 - p.price / p.oldPrice) * 100)}% OFF
                          </div>
                          {/* Quick view overlay */}
                          <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/20 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                            <Button
                              size="sm"
                              className="gold-gradient text-primary-foreground font-body"
                              onClick={() => setSelectedProduct(p)}
                            >
                              <Eye className="w-4 h-4 mr-1" /> Quick View
                            </Button>
                          </div>
                        </div>
                        <div className="p-4">
                          <p className="text-xs text-muted-foreground font-body mb-1 capitalize">
                            {categories.find((c) => c.id === p.category)?.label}
                          </p>
                          <h3 className="font-display text-base font-semibold text-foreground mb-1 line-clamp-1">{p.name}</h3>
                          <div className="flex items-center gap-1.5 mb-2">
                            <Star className="w-3.5 h-3.5 fill-primary text-primary" />
                            <span className="text-sm font-body font-medium text-foreground">{p.rating}</span>
                            <span className="text-xs text-muted-foreground font-body">({p.reviews})</span>
                          </div>
                          <div className="flex flex-wrap gap-1 mb-3">
                            {p.features.slice(0, 2).map((f) => (
                              <span key={f} className="text-[11px] bg-muted text-muted-foreground px-2 py-0.5 rounded font-body">
                                {f}
                              </span>
                            ))}
                          </div>
                          <div className="flex items-center justify-between">
                            <div>
                              <span className="font-body font-bold text-lg text-foreground">₹{p.price.toLocaleString("en-IN")}</span>
                              <span className="text-sm text-muted-foreground line-through ml-2 font-body">₹{p.oldPrice.toLocaleString("en-IN")}</span>
                            </div>
                            <Button
                              size="icon"
                              variant="outline"
                              className="rounded-lg border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                              onClick={() => {
                                addToCart(p);
                                toast({ title: `${p.name} added to cart` });
                              }}
                            >
                              <ShoppingCart className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />

      {/* Product Detail Modal */}
      <ProductDetailModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />
    </>
  );
};

export default Products;
