import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Clock, MessageCircle, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

const businessHours = [
  { day: "Monday – Saturday", time: "9:00 AM – 8:00 PM" },
  { day: "Sunday", time: "10:00 AM – 4:00 PM" },
];

const contactInfo = [
  {
    icon: Phone,
    label: "Phone",
    lines: [
      { text: "+91 93717 25270", href: "tel:+919371725270" },
      { text: "+91 98814 33875", href: "tel:+919881433875" },
    ],
  },
  {
    icon: Mail,
    label: "Email",
    lines: [{ text: "abubakarchanda3@gmail.com", href: "mailto:abubakarchanda3@gmail.com" }],
  },
  {
    icon: MapPin,
    label: "Address",
    lines: [{ text: "255, DAV College Road, Raviwar Peth, Bhavani Peth, Solapur, Maharashtra 413002" }],
  },
];

const Contact = () => {
  const { toast } = useToast();
  const [form, setForm] = useState({ name: "", phone: "", email: "", subject: "", message: "" });
  const [sending, setSending] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.phone.trim() || !form.message.trim()) {
      toast({ title: "Please fill required fields", variant: "destructive" });
      return;
    }

    setSending(true);
    const text = [
      `*New Inquiry from Website*`,
      `Name: ${form.name.trim()}`,
      form.email.trim() ? `Email: ${form.email.trim()}` : "",
      `Phone: ${form.phone.trim()}`,
      form.subject.trim() ? `Subject: ${form.subject.trim()}` : "",
      `Message: ${form.message.trim()}`,
    ]
      .filter(Boolean)
      .join("\n");

    window.open(`https://wa.me/919371725270?text=${encodeURIComponent(text)}`, "_blank");
    toast({ title: "Redirecting to WhatsApp…" });
    setSending(false);
  };

  return (
    <>
      <Header />
      <main>
        {/* Hero */}
        <section className="bg-steel-dark py-16 lg:py-24">
          <div className="container-max px-4">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <span className="text-gold font-body text-sm tracking-widest uppercase">Get in Touch</span>
              <h1 className="font-display text-4xl sm:text-5xl font-bold text-secondary mt-3 mb-4">Contact Us</h1>
              <p className="text-steel font-body text-base max-w-xl">
                Have questions about our products, need a custom quote, or want to place a bulk order? We'd love to hear from you.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Contact Grid */}
        <section className="section-padding bg-background">
          <div className="container-max">
            <div className="grid lg:grid-cols-5 gap-10">
              {/* Form */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="lg:col-span-3 bg-card border border-border rounded-xl p-6 sm:p-8"
              >
                <h2 className="font-display text-2xl font-bold text-foreground mb-6">Send Us a Message</h2>
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div className="space-y-2">
                      <Label htmlFor="name">Name *</Label>
                      <Input id="name" name="name" value={form.name} onChange={handleChange} placeholder="Your name" maxLength={100} required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone *</Label>
                      <Input id="phone" name="phone" value={form.phone} onChange={handleChange} placeholder="+91 XXXXX XXXXX" maxLength={15} required />
                    </div>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" name="email" type="email" value={form.email} onChange={handleChange} placeholder="you@example.com" maxLength={255} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="subject">Subject</Label>
                      <Input id="subject" name="subject" value={form.subject} onChange={handleChange} placeholder="e.g. Bulk Order Inquiry" maxLength={150} />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="message">Message *</Label>
                    <Textarea id="message" name="message" value={form.message} onChange={handleChange} placeholder="Tell us about your requirements…" rows={5} maxLength={1000} required />
                  </div>
                  <Button type="submit" size="lg" disabled={sending} className="gold-gradient text-primary-foreground font-body font-semibold w-full sm:w-auto px-10">
                    <Send className="w-4 h-4 mr-2" /> Send via WhatsApp
                  </Button>
                </form>
              </motion.div>

              {/* Sidebar */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="lg:col-span-2 space-y-6"
              >
                {/* Contact Info Cards */}
                {contactInfo.map((c) => (
                  <div key={c.label} className="bg-card border border-border rounded-xl p-5 flex gap-4">
                    <c.icon className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-display text-sm font-semibold text-foreground mb-1">{c.label}</h4>
                      {c.lines.map((l) =>
                        l.href ? (
                          <a key={l.text} href={l.href} className="block text-muted-foreground font-body text-sm hover:text-primary transition-colors">
                            {l.text}
                          </a>
                        ) : (
                          <p key={l.text} className="text-muted-foreground font-body text-sm">{l.text}</p>
                        )
                      )}
                    </div>
                  </div>
                ))}

                {/* Business Hours */}
                <div className="bg-card border border-border rounded-xl p-5">
                  <div className="flex gap-4">
                    <Clock className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-display text-sm font-semibold text-foreground mb-2">Business Hours</h4>
                      {businessHours.map((h) => (
                        <div key={h.day} className="flex justify-between text-sm font-body text-muted-foreground mb-1">
                          <span>{h.day}</span>
                          <span className="text-foreground font-medium">{h.time}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* WhatsApp */}
                <Button asChild size="lg" variant="outline" className="w-full border-primary text-primary hover:bg-primary/10 font-body">
                  <a href="https://wa.me/919371725270" target="_blank" rel="noopener noreferrer">
                    <MessageCircle className="w-4 h-4 mr-2" /> Chat on WhatsApp
                  </a>
                </Button>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Google Map */}
        <section className="bg-muted py-2">
          <div className="container-max">
            <motion.h2
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="font-display text-2xl font-bold text-foreground text-center mb-6 pt-8"
            >
              Visit Our Showroom
            </motion.h2>
            <div className="rounded-xl overflow-hidden border border-border mb-8" style={{ height: 400 }}>
              <iframe
                title="Rounak Furniture - Solapur Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3800.5!2d75.9239!3d17.6599!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc5b1007e59e88f%3A0x3c8ee956ac8b889b!2sRaunak%20steel%20wooden%20furniture!5e0!3m2!1sen!2sin!4v1700000000000"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Contact;
