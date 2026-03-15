import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, ShoppingCart, Phone, Shield, Ruler, Weight, Palette } from "lucide-react";
import type { Product } from "@/data/products";
import { useCart } from "@/context/CartContext";
import { useToast } from "@/hooks/use-toast";

interface Props {
  product: Product | null;
  onClose: () => void;
}

const ProductDetailModal = ({ product, onClose }: Props) => {
  const { addToCart } = useCart();
  const { toast } = useToast();
  if (!product) return null;

  const discount = Math.round((1 - product.price / product.oldPrice) * 100);

  return (
    <Dialog open={!!product} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-3xl p-0 overflow-hidden max-h-[90vh] overflow-y-auto">
        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Image */}
          <div className="relative aspect-square md:aspect-auto">
            <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
            {product.badge && (
              <Badge className="absolute top-4 left-4 gold-gradient text-primary-foreground font-body border-0">
                {product.badge}
              </Badge>
            )}
          </div>

          {/* Details */}
          <div className="p-6 flex flex-col">
            <h2 className="font-display text-xl font-bold text-foreground mb-1">{product.name}</h2>
            <div className="flex items-center gap-2 mb-3">
              <Star className="w-4 h-4 fill-primary text-primary" />
              <span className="text-sm font-body font-medium">{product.rating}</span>
              <span className="text-xs text-muted-foreground font-body">({product.reviews} reviews)</span>
            </div>

            <div className="flex items-baseline gap-3 mb-4">
              <span className="font-body text-2xl font-bold text-foreground">₹{product.price.toLocaleString("en-IN")}</span>
              <span className="text-base text-muted-foreground line-through font-body">₹{product.oldPrice.toLocaleString("en-IN")}</span>
              <Badge variant="destructive" className="font-body text-xs">{discount}% OFF</Badge>
            </div>

            {/* Specs grid */}
            <div className="grid grid-cols-2 gap-3 mb-4 text-sm">
              <div className="flex items-start gap-2">
                <Ruler className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                <div>
                  <p className="text-muted-foreground font-body text-xs">Dimensions</p>
                  <p className="font-body font-medium text-foreground">{product.dimensions}</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <Weight className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                <div>
                  <p className="text-muted-foreground font-body text-xs">Weight</p>
                  <p className="font-body font-medium text-foreground">{product.weight}</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <Shield className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                <div>
                  <p className="text-muted-foreground font-body text-xs">Warranty</p>
                  <p className="font-body font-medium text-foreground">{product.warranty}</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <Palette className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                <div>
                  <p className="text-muted-foreground font-body text-xs">Colors</p>
                  <p className="font-body font-medium text-foreground">{product.colors.join(", ")}</p>
                </div>
              </div>
            </div>

            <p className="text-xs text-muted-foreground font-body mb-1">Material: <span className="text-foreground font-medium">{product.material}</span></p>

            {/* Features */}
            <div className="flex flex-wrap gap-1.5 my-3">
              {product.features.map((f) => (
                <span key={f} className="text-xs bg-muted text-muted-foreground px-2.5 py-1 rounded-full font-body">{f}</span>
              ))}
            </div>

            <p className="text-[11px] text-muted-foreground font-body mb-4">
              * Prices vary based on material, steel gauge & weight. Contact us for exact pricing.
            </p>

            {/* Actions */}
            <div className="mt-auto flex flex-col gap-2">
              <Button
                className="w-full gold-gradient text-primary-foreground font-body"
                onClick={() => {
                  addToCart(product);
                  toast({ title: `${product.name} added to cart` });
                  onClose();
                }}
              >
                <ShoppingCart className="w-4 h-4 mr-2" /> Add to Cart
              </Button>
              <div className="grid grid-cols-2 gap-2">
                <Button variant="outline" className="font-body" asChild>
                  <a href="https://wa.me/919371725270" target="_blank" rel="noopener noreferrer">
                    <Phone className="w-4 h-4 mr-1" /> WhatsApp
                  </a>
                </Button>
                <Button variant="secondary" className="font-body">
                  Request Bulk Quote
                </Button>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProductDetailModal;
