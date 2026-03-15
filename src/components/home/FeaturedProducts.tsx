import { motion } from "framer-motion";
import { Star, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useCart } from "@/context/CartContext";
import { useToast } from "@/hooks/use-toast";
import { products as allProducts } from "@/data/products";
import almirahMirror from "@/assets/product-almirah-mirror.jpg";
import almirah3door from "@/assets/product-almirah-3door.jpg";
import almirahDouble from "@/assets/product-almirah-double.jpg";
import almirahColored from "@/assets/product-almirah-colored.jpg";
import sofaCumbed from "@/assets/product-sofa-cumbed.jpg";
import rack1 from "@/assets/product-rack-1.jpg";
import storageBox from "@/assets/product-storage-box.jpg";

const products = [
  {
    name: "Mirror Door Steel Almirah",
    price: "₹12,499",
    oldPrice: "₹15,999",
    image: almirahMirror,
    badge: "Best Seller",
    rating: 4.8,
    reviews: 124,
  },
  {
    name: "3-Door Wardrobe with Drawers",
    price: "₹22,999",
    oldPrice: "₹28,500",
    image: almirah3door,
    badge: "Premium",
    rating: 4.9,
    reviews: 89,
  },
  {
    name: "Double Door Steel Almirah",
    price: "₹10,999",
    oldPrice: "₹13,999",
    image: almirahDouble,
    badge: "Popular",
    rating: 4.7,
    reviews: 201,
  },
  {
    name: "Colored Double Mirror Almirah",
    price: "₹14,499",
    oldPrice: "₹18,999",
    image: almirahColored,
    badge: "New",
    rating: 4.6,
    reviews: 67,
  },
  {
    name: "Steel Sofa Cum Bed",
    price: "₹16,999",
    oldPrice: "₹21,999",
    image: sofaCumbed,
    badge: "Trending",
    rating: 4.7,
    reviews: 156,
  },
  {
    name: "5-Shelf Commercial Rack",
    price: "₹6,999",
    oldPrice: "₹8,999",
    image: rack1,
    badge: null,
    rating: 4.6,
    reviews: 201,
  },
  {
    name: "Steel Ration Storage Box",
    price: "₹2,499",
    oldPrice: "₹3,499",
    image: storageBox,
    badge: null,
    rating: 4.5,
    reviews: 312,
  },
];

const FeaturedProducts = () => {
  const { addToCart } = useCart();
  const { toast } = useToast();

  return (
    <section className="section-padding bg-cream">
    <div className="container-max">
      <div className="text-center mb-12">
        <span className="text-primary text-sm font-body font-semibold tracking-wider uppercase">Top Picks</span>
        <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground mt-2">
          Featured Products
        </h2>
        <p className="text-muted-foreground font-body text-sm mt-2">Prices vary based on material, steel gauge & weight</p>
      </div>

      <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
        {products.slice(0, 8).map((p, i) => {
          const matchedProduct = allProducts.find((ap) => ap.name === p.name);
          return (
            <motion.div
              key={p.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow flex flex-col border border-gray-100"
              style={{ minHeight: '320px', maxWidth: '340px', margin: '0 auto' }}
            >
              <div className="relative w-full aspect-[4/3] flex items-center justify-center bg-gray-50 mb-3 rounded-xl overflow-hidden">
                <img
                  src={p.image}
                  alt={p.name}
                  className="w-full h-full object-cover transition-all duration-300 group-hover:brightness-95 group-hover:scale-105"
                  style={{ maxHeight: '180px', maxWidth: '100%' }}
                  loading="lazy"
                />
                {p.badge && (
                  <Badge className="absolute top-3 left-3 gold-gradient text-primary-foreground font-body text-xs border-0">
                    {p.badge}
                  </Badge>
                )}
                <div className="absolute top-3 right-3 bg-destructive text-destructive-foreground text-xs font-body font-bold px-2 py-0.5 rounded">
                  {Math.round((1 - parseInt(p.price.replace(/[₹,]/g, "")) / parseInt(p.oldPrice.replace(/[₹,]/g, ""))) * 100)}% OFF
                </div>
              </div>
              <div className="p-4 flex-1 flex flex-col justify-between">
                <h3 className="font-display text-base font-semibold text-foreground mb-1 text-center line-clamp-2">{p.name}</h3>
                <div className="flex items-center gap-1.5 mb-2 justify-center">
                  <Star className="w-3.5 h-3.5 fill-primary text-primary" />
                  <span className="text-sm font-body font-medium text-foreground">{p.rating}</span>
                  <span className="text-xs text-muted-foreground font-body">({p.reviews})</span>
                </div>
                <div className="flex items-center justify-between mt-auto">
                  <div>
                    <span className="font-body font-bold text-lg text-foreground">{p.price}</span>
                    <span className="text-sm text-muted-foreground line-through ml-2 font-body">{p.oldPrice}</span>
                  </div>
                  <Button
                    size="icon"
                    variant="outline"
                    className="rounded-lg border-primary text-primary hover:bg-primary hover:text-primary-foreground shadow-md"
                    onClick={() => {
                      if (matchedProduct) {
                        addToCart(matchedProduct);
                        toast({ title: `${p.name} added to cart` });
                      }
                    }}
                  >
                    <ShoppingCart className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
    </section>
  );
};

export default FeaturedProducts;
