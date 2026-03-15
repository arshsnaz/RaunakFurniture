import { useState } from "react";
import { motion } from "framer-motion";
import {
  Building2, GraduationCap, Stethoscope, Briefcase, Store, Warehouse,
  ArrowRight, CheckCircle2, Phone, MessageCircle, Shield, Truck, Award, Package
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const sectors = [
  { icon: Stethoscope, label: "Hospitals & Medical Stores", desc: "Steel almirahs, medicine racks, instrument storage" },
  { icon: GraduationCap, label: "Schools & Universities", desc: "Student lockers, library racks, staff almirahs" },
  { icon: Briefcase, label: "Offices & Corporates", desc: "Filing cabinets, executive almirahs, storage units" },
  { icon: Building2, label: "Government & PSU", desc: "Record storage, bulk almirahs, heavy-duty racks" },
  { icon: Store, label: "Retail & Shops", desc: "Display racks, storage almirahs, commercial shelving" },
  { icon: Warehouse, label: "Warehouses & Godowns", desc: "Industrial racks, grain storage boxes, heavy racks" },
];

const benefits = [
  { icon: Shield, title: "10-Year Warranty", desc: "Every piece backed by our decade-long guarantee" },
  { icon: Truck, title: "Pan-India Delivery", desc: "Free delivery on bulk orders across all states" },
  { icon: Award, title: "Factory-Direct Pricing", desc: "No middlemen — best wholesale rates guaranteed" },
  { icon: Package, title: "Custom Sizes Available", desc: "Made-to-order dimensions for your exact needs" },
];

const productOptions = [
  "Steel Almirahs (Single Door)",
  "Steel Almirahs (Double Door)",
  "Steel Almirahs (3-Door)",
  "Mirror Door Almirahs",
  "Colored Almirahs",
  "Commercial Storage Racks",
  "Custom-Size Racks",
  "Steel Sofa Cum Beds",
  "Ration / Grain Storage Boxes",
  "Mixed / Multiple Products",
];

const BulkOrders = () => {
  const [formData, setFormData] = useState({
    name: "",
    organization: "",
    phone: "",
    email: "",
    sector: "",
    product: "",
    quantity: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.sector || !formData.product || !formData.quantity) {
      toast({ title: "Please fill all required fields", variant: "destructive" });
      return;
    }

    const msg = `🏢 *Bulk Order Inquiry*\n\n👤 Name: ${formData.name}\n🏛️ Organization: ${formData.organization}\n📞 Phone: ${formData.phone}\n📧 Email: ${formData.email}\n🏷️ Sector: ${formData.sector}\n📦 Product: ${formData.product}\n🔢 Quantity: ${formData.quantity}\n💬 Note: ${formData.message}`;
    const url = `https://wa.me/919371725270?text=${encodeURIComponent(msg)}`;
    window.open(url, "_blank");
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero */}
      <section className="steel-gradient relative overflow-hidden pt-28 pb-20">
        <div className="absolute inset-0 bg-gradient-to-br from-steel-dark/95 to-steel-dark/80" />
        <div className="container-max relative text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="text-gold text-sm font-body font-semibold tracking-wider uppercase">Wholesale & Institutional</span>
            <h1 className="font-display text-4xl sm:text-5xl font-bold text-secondary mt-3 mb-5">
              Bulk Furniture Orders<br />for Every Industry
            </h1>
            <p className="text-steel max-w-2xl mx-auto text-lg font-body leading-relaxed">
              From 10 pieces to 10,000 — we manufacture and deliver premium steel furniture across India with factory-direct pricing and a 10-year warranty.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Benefits */}
      <section className="section-padding bg-cream">
        <div className="container-max">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map(({ icon: Icon, title, desc }, i) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
              >
                <Card className="border-none shadow-sm hover:shadow-md transition-shadow h-full bg-card">
                  <CardContent className="p-6 text-center flex flex-col items-center gap-3">
                    <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center">
                      <Icon className="w-7 h-7 text-primary" />
                    </div>
                    <h3 className="font-display text-lg font-semibold text-foreground">{title}</h3>
                    <p className="text-muted-foreground text-sm font-body">{desc}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Sectors */}
      <section className="section-padding bg-background">
        <div className="container-max">
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-center mb-12">
            <span className="text-primary text-sm font-body font-semibold tracking-wider uppercase">Industries We Serve</span>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground mt-2">Trusted by Every Sector</h2>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {sectors.map(({ icon: Icon, label, desc }, i) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.5 }}
                className="border border-border rounded-xl p-6 hover:border-primary/40 hover:shadow-md transition-all group cursor-default"
              >
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <Icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-display text-lg font-semibold text-foreground mb-1">{label}</h3>
                <p className="text-muted-foreground text-sm font-body">{desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Lead Capture Form */}
      <section className="section-padding steel-gradient relative overflow-hidden" id="bulk-form">
        <div className="absolute inset-0 bg-gradient-to-br from-steel-dark/95 to-steel-dark/80" />
        <div className="container-max relative">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
              <span className="text-gold text-sm font-body font-semibold tracking-wider uppercase">Get a Quote</span>
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-secondary mt-2 mb-5">
                Request Your Bulk Order Quote
              </h2>
              <p className="text-steel text-base font-body leading-relaxed mb-8">
                Fill in your requirements and our team will get back to you within 24 hours with the best wholesale pricing.
              </p>

              <div className="space-y-5">
                {[
                  "Minimum order: 10 pieces for wholesale pricing",
                  "Custom sizes & colors available at no extra cost",
                  "Free delivery on orders above ₹1,00,000",
                  "GST billing & proper invoicing available",
                  "Installation support for large orders",
                ].map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-gold mt-0.5 shrink-0" />
                    <span className="text-secondary/80 font-body text-sm">{item}</span>
                  </div>
                ))}
              </div>

              <div className="mt-10 flex flex-col sm:flex-row gap-4">
                <a href="tel:+919371725270" className="inline-flex items-center gap-2 text-gold hover:text-gold-light font-body font-medium transition-colors">
                  <Phone className="w-5 h-5" /> 93717 25270
                </a>
                <a href="tel:+919881433875" className="inline-flex items-center gap-2 text-gold hover:text-gold-light font-body font-medium transition-colors">
                  <Phone className="w-5 h-5" /> 98814 33875
                </a>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {submitted ? (
                <div className="bg-card rounded-2xl p-10 text-center">
                  <CheckCircle2 className="w-16 h-16 text-primary mx-auto mb-4" />
                  <h3 className="font-display text-2xl font-bold text-foreground mb-2">Quote Request Sent!</h3>
                  <p className="text-muted-foreground font-body mb-6">Our team will contact you within 24 hours.</p>
                  <Button onClick={() => setSubmitted(false)} variant="outline">Submit Another Inquiry</Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="bg-card rounded-2xl p-8 space-y-5 shadow-lg">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="font-body text-foreground">Full Name *</Label>
                      <Input placeholder="Your name" value={formData.name} onChange={(e) => handleChange("name", e.target.value)} maxLength={100} />
                    </div>
                    <div className="space-y-2">
                      <Label className="font-body text-foreground">Organization</Label>
                      <Input placeholder="Company / Institution" value={formData.organization} onChange={(e) => handleChange("organization", e.target.value)} maxLength={100} />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="font-body text-foreground">Phone Number *</Label>
                      <Input type="tel" placeholder="10-digit number" value={formData.phone} onChange={(e) => handleChange("phone", e.target.value)} maxLength={15} />
                    </div>
                    <div className="space-y-2">
                      <Label className="font-body text-foreground">Email</Label>
                      <Input type="email" placeholder="your@email.com" value={formData.email} onChange={(e) => handleChange("email", e.target.value)} maxLength={255} />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label className="font-body text-foreground">Sector / Industry *</Label>
                    <Select onValueChange={(v) => handleChange("sector", v)}>
                      <SelectTrigger><SelectValue placeholder="Select your sector" /></SelectTrigger>
                      <SelectContent>
                        {sectors.map(({ label }) => (
                          <SelectItem key={label} value={label}>{label}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="font-body text-foreground">Product Required *</Label>
                      <Select onValueChange={(v) => handleChange("product", v)}>
                        <SelectTrigger><SelectValue placeholder="Select product" /></SelectTrigger>
                        <SelectContent>
                          {productOptions.map((p) => (
                            <SelectItem key={p} value={p}>{p}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label className="font-body text-foreground">Quantity *</Label>
                      <Input type="number" placeholder="Number of pieces" min={1} value={formData.quantity} onChange={(e) => handleChange("quantity", e.target.value)} />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label className="font-body text-foreground">Additional Requirements</Label>
                    <Textarea placeholder="Custom sizes, colors, delivery timeline, etc." value={formData.message} onChange={(e) => handleChange("message", e.target.value)} maxLength={1000} rows={3} />
                  </div>

                  <Button type="submit" size="lg" className="w-full gold-gradient text-primary-foreground font-body font-semibold hover:opacity-90">
                    <MessageCircle className="w-5 h-5 mr-2" /> Send Quote Request via WhatsApp
                  </Button>
                  <p className="text-xs text-muted-foreground text-center font-body">Your inquiry will be sent directly via WhatsApp for fastest response</p>
                </form>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default BulkOrders;
