import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Trash2, Plus, Minus, ShoppingBag, ArrowLeft, Send, MessageCircle } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useCart } from "@/context/CartContext";
import { useToast } from "@/hooks/use-toast";

const Cart = () => {
  const { items, updateQuantity, removeFromCart, clearCart, totalItems, totalPrice } = useCart();
  const { toast } = useToast();
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [customerNote, setCustomerNote] = useState("");

  const handlePlaceOrder = () => {
    const name = customerName.trim();
    const phone = customerPhone.trim();

    if (!name || !phone) {
      toast({ title: "Please enter your name and phone number", variant: "destructive" });
      return;
    }
    if (phone.length < 10 || !/^\+?\d[\d\s-]{8,14}$/.test(phone.replace(/\s/g, ""))) {
      toast({ title: "Please enter a valid phone number", variant: "destructive" });
      return;
    }
    if (items.length === 0) {
      toast({ title: "Your cart is empty", variant: "destructive" });
      return;
    }

    const orderLines = items.map(
      (item, i) =>
        `${i + 1}. ${item.product.name} — Qty: ${item.quantity} — ₹${(item.product.price * item.quantity).toLocaleString("en-IN")}`
    );

    const text = [
      `*New Order from Website*`,
      ``,
      `*Customer:* ${name}`,
      `*Phone:* ${phone}`,
      customerNote.trim() ? `*Note:* ${customerNote.trim()}` : "",
      ``,
      `*Order Items:*`,
      ...orderLines,
      ``,
      `*Total Items:* ${totalItems}`,
      `*Estimated Total:* ₹${totalPrice.toLocaleString("en-IN")}`,
      ``,
      `_Prices may vary based on material, steel gauge & weight._`,
    ]
      .filter(Boolean)
      .join("\n");

    window.open(`https://wa.me/919371725270?text=${encodeURIComponent(text)}`, "_blank");
    toast({ title: "Redirecting to WhatsApp to place your order…" });
  };

  return (
    <>
      <Header />
      <main className="min-h-screen bg-background">
        {/* Page Header */}
        <section className="bg-steel-dark py-12 sm:py-16">
          <div className="container-max px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="font-display text-3xl sm:text-4xl font-bold text-secondary mb-2">
              Your Cart
            </h1>
            <p className="font-body text-gold-light">
              {totalItems > 0
                ? `${totalItems} item${totalItems > 1 ? "s" : ""} in your cart`
                : "Your cart is empty"}
            </p>
          </div>
        </section>

        <div className="container-max px-4 sm:px-6 lg:px-8 py-8">
          {items.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-20"
            >
              <ShoppingBag className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h2 className="font-display text-2xl font-bold text-foreground mb-2">
                Your cart is empty
              </h2>
              <p className="text-muted-foreground font-body mb-6">
                Browse our products and add items to your cart.
              </p>
              <Button asChild className="gold-gradient text-primary-foreground font-body">
                <Link to="/products">
                  <ArrowLeft className="w-4 h-4 mr-2" /> Browse Products
                </Link>
              </Button>
            </motion.div>
          ) : (
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Cart Items */}
              <div className="lg:col-span-2 space-y-4">
                <div className="flex items-center justify-between mb-2">
                  <h2 className="font-display text-xl font-bold text-foreground">
                    Cart Items
                  </h2>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-destructive font-body text-xs"
                    onClick={() => {
                      clearCart();
                      toast({ title: "Cart cleared" });
                    }}
                  >
                    <Trash2 className="w-3.5 h-3.5 mr-1" /> Clear All
                  </Button>
                </div>

                <AnimatePresence mode="popLayout">
                  {items.map((item) => (
                    <motion.div
                      key={item.product.id}
                      layout
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="bg-card border border-border rounded-xl p-4 flex gap-4"
                    >
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-24 h-24 sm:w-28 sm:h-28 object-cover rounded-lg flex-shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <h3 className="font-display text-sm sm:text-base font-semibold text-foreground truncate">
                          {item.product.name}
                        </h3>
                        <p className="text-xs text-muted-foreground font-body mt-0.5">
                          {item.product.material} • {item.product.dimensions}
                        </p>
                        <div className="flex items-baseline gap-2 mt-1">
                          <span className="font-body font-bold text-foreground">
                            ₹{item.product.price.toLocaleString("en-IN")}
                          </span>
                          <span className="text-xs text-muted-foreground line-through font-body">
                            ₹{item.product.oldPrice.toLocaleString("en-IN")}
                          </span>
                        </div>

                        <div className="flex items-center justify-between mt-3">
                          <div className="flex items-center gap-1">
                            <Button
                              size="icon"
                              variant="outline"
                              className="h-8 w-8 rounded-lg"
                              onClick={() => {
                                if (item.quantity <= 1) {
                                  removeFromCart(item.product.id);
                                } else {
                                  updateQuantity(item.product.id, item.quantity - 1);
                                }
                              }}
                            >
                              <Minus className="w-3.5 h-3.5" />
                            </Button>
                            <span className="w-10 text-center font-body font-semibold text-foreground text-sm">
                              {item.quantity}
                            </span>
                            <Button
                              size="icon"
                              variant="outline"
                              className="h-8 w-8 rounded-lg"
                              onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                              disabled={item.quantity >= 99}
                            >
                              <Plus className="w-3.5 h-3.5" />
                            </Button>
                          </div>

                          <div className="flex items-center gap-3">
                            <span className="font-body font-bold text-foreground text-sm sm:text-base">
                              ₹{(item.product.price * item.quantity).toLocaleString("en-IN")}
                            </span>
                            <Button
                              size="icon"
                              variant="ghost"
                              className="h-8 w-8 text-destructive hover:text-destructive"
                              onClick={() => {
                                removeFromCart(item.product.id);
                                toast({ title: `${item.product.name} removed from cart` });
                              }}
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>

                <Button asChild variant="outline" className="font-body mt-4">
                  <Link to="/products">
                    <ArrowLeft className="w-4 h-4 mr-2" /> Continue Shopping
                  </Link>
                </Button>
              </div>

              {/* Order Summary */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="lg:col-span-1"
              >
                <div className="bg-card border border-border rounded-xl p-6 sticky top-28">
                  <h2 className="font-display text-lg font-bold text-foreground mb-5">
                    Order Summary
                  </h2>

                  <div className="space-y-3 mb-5 text-sm font-body">
                    <div className="flex justify-between text-muted-foreground">
                      <span>Subtotal ({totalItems} items)</span>
                      <span className="text-foreground font-medium">
                        ₹{totalPrice.toLocaleString("en-IN")}
                      </span>
                    </div>
                    <div className="flex justify-between text-muted-foreground">
                      <span>Delivery</span>
                      <span className="text-primary font-medium">Calculated after confirmation</span>
                    </div>
                    <div className="border-t border-border pt-3 flex justify-between">
                      <span className="font-display font-bold text-foreground">Estimated Total</span>
                      <span className="font-display font-bold text-foreground text-lg">
                        ₹{totalPrice.toLocaleString("en-IN")}
                      </span>
                    </div>
                  </div>

                  <p className="text-[11px] text-muted-foreground font-body mb-5">
                    * Final price confirmed after order review. Prices may vary based on material, steel gauge & weight.
                  </p>

                  {/* Customer Details */}
                  <div className="space-y-3 mb-5">
                    <div className="space-y-1.5">
                      <Label htmlFor="cart-name" className="text-xs">Your Name *</Label>
                      <Input
                        id="cart-name"
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                        placeholder="Enter your name"
                        maxLength={100}
                      />
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="cart-phone" className="text-xs">Phone Number *</Label>
                      <Input
                        id="cart-phone"
                        value={customerPhone}
                        onChange={(e) => setCustomerPhone(e.target.value)}
                        placeholder="+91 XXXXX XXXXX"
                        maxLength={15}
                      />
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="cart-note" className="text-xs">Note (optional)</Label>
                      <Textarea
                        id="cart-note"
                        value={customerNote}
                        onChange={(e) => setCustomerNote(e.target.value)}
                        placeholder="Any special requirements…"
                        rows={2}
                        maxLength={500}
                      />
                    </div>
                  </div>

                  <Button
                    className="w-full gold-gradient text-primary-foreground font-body font-semibold"
                    size="lg"
                    onClick={handlePlaceOrder}
                  >
                    <Send className="w-4 h-4 mr-2" /> Place Order via WhatsApp
                  </Button>

                  <Button
                    asChild
                    variant="outline"
                    className="w-full mt-2 border-primary text-primary hover:bg-primary/10 font-body"
                  >
                    <a href="https://wa.me/919371725270" target="_blank" rel="noopener noreferrer">
                      <MessageCircle className="w-4 h-4 mr-2" /> Need Help? Chat with Us
                    </a>
                  </Button>
                </div>
              </motion.div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Cart;
