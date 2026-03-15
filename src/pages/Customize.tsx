import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Phone, Send, RotateCcw, Info } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import AlmirahPreview from "@/components/customize/AlmirahPreview";

const colorOptions = [
  { id: "grey", label: "Steel Grey", hex: "#8B8F94" },
  { id: "ivory", label: "Ivory", hex: "#F5F0E8" },
  { id: "brown", label: "Brown", hex: "#8B6F4E" },
  { id: "blue", label: "Royal Blue", hex: "#4A6FA5" },
  { id: "red", label: "Maroon Red", hex: "#B04040" },
  { id: "green", label: "Forest Green", hex: "#4A7A5A" },
  { id: "black", label: "Matte Black", hex: "#3A3A3E" },
  { id: "wood-finish", label: "Wood Finish", hex: "#A67C52" },
];

const mirrorOptions = [
  { id: "none", label: "No Mirror" },
  { id: "full", label: "Full Length" },
  { id: "half", label: "Half Mirror" },
  { id: "oval", label: "Oval Mirror" },
];

const lockOptions = [
  { id: "none", label: "No Lock" },
  { id: "standard", label: "Standard Key Lock" },
  { id: "premium", label: "Premium 3-Point Lock" },
  { id: "digital", label: "Digital Lock" },
];

const handleOptions = [
  { id: "bar", label: "Bar Handle" },
  { id: "round", label: "Round Knob" },
  { id: "d-shape", label: "D-Shape Pull" },
];

const thicknessOptions = [
  { id: "24", label: "24 Gauge (Standard)" },
  { id: "22", label: "22 Gauge (Premium)" },
  { id: "20", label: "20 Gauge (Heavy Duty)" },
  { id: "18", label: "18 Gauge (Industrial)" },
];

const defaults = {
  height: 72,
  width: 36,
  color: "grey",
  shelves: 4,
  mirror: "full",
  lock: "standard",
  drawers: 1,
  thickness: "22",
  handle: "bar",
  doors: 2,
};

const Customize = () => {
  const [config, setConfig] = useState(defaults);

  const set = <K extends keyof typeof defaults>(key: K, val: (typeof defaults)[K]) =>
    setConfig((prev) => ({ ...prev, [key]: val }));

  const estimatedPrice = useMemo(() => {
    let base = 8000;
    // size
    base += (config.height - 60) * 80 + (config.width - 24) * 120;
    // thickness
    const thicknessMultiplier: Record<string, number> = { "24": 1, "22": 1.2, "20": 1.5, "18": 1.9 };
    base *= thicknessMultiplier[config.thickness] || 1;
    // doors
    if (config.doors === 3) base += 3500;
    // mirror
    if (config.mirror === "full") base += 1200;
    else if (config.mirror === "half") base += 700;
    else if (config.mirror === "oval") base += 900;
    // lock
    if (config.lock === "premium") base += 800;
    else if (config.lock === "digital") base += 2500;
    // drawers
    base += config.drawers * 600;
    // shelves
    base += Math.max(0, config.shelves - 3) * 200;
    return Math.round(base);
  }, [config]);

  const summaryText = `Custom Steel Almirah: ${config.height}"H × ${config.width}"W, ${config.doors}-door, ${colorOptions.find((c) => c.id === config.color)?.label}, ${config.shelves} shelves, ${mirrorOptions.find((m) => m.id === config.mirror)?.label}, ${lockOptions.find((l) => l.id === config.lock)?.label}, ${config.drawers} drawer(s), ${config.thickness} gauge, ${handleOptions.find((h) => h.id === config.handle)?.label}. Est. ₹${estimatedPrice.toLocaleString("en-IN")}`;

  const whatsappLink = `https://wa.me/919371725270?text=${encodeURIComponent(summaryText)}`;

  return (
    <>
      <Header />
      <main className="min-h-screen bg-background">
        {/* Header */}
        <section className="bg-steel-dark py-10 sm:py-14">
          <div className="container-max px-4 sm:px-6 lg:px-8 text-center">
            <Badge className="gold-gradient text-primary-foreground font-body border-0 mb-3">Customize</Badge>
            <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-secondary mb-3">
              Build Your Steel Almirah
            </h1>
            <p className="font-body text-gold-light max-w-xl mx-auto text-sm sm:text-base">
              Choose every detail — size, color, mirror, lock, drawers & more. See a live preview and get an instant estimate.
            </p>
          </div>
        </section>

        <div className="container-max px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Left: Live Preview */}
            <div className="order-2 lg:order-1">
              <div className="sticky top-28 bg-card rounded-2xl p-6 card-shadow">
                <h3 className="font-display text-lg font-semibold text-foreground mb-4 text-center">Live Preview</h3>
                <AlmirahPreview config={config} />

                {/* Price estimate */}
                <motion.div
                  key={estimatedPrice}
                  initial={{ scale: 0.95, opacity: 0.5 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="mt-6 text-center"
                >
                  <p className="text-xs text-muted-foreground font-body mb-1">Estimated Price</p>
                  <p className="font-display text-3xl font-bold text-foreground">
                    ₹{estimatedPrice.toLocaleString("en-IN")}
                  </p>
                  <p className="text-[11px] text-muted-foreground font-body mt-1">
                    * Final price may vary based on exact material & finish
                  </p>
                </motion.div>

                {/* Actions */}
                <div className="mt-5 flex flex-col sm:flex-row gap-2">
                  <Button className="flex-1 gold-gradient text-primary-foreground font-body" asChild>
                    <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
                      <Send className="w-4 h-4 mr-2" /> Send on WhatsApp
                    </a>
                  </Button>
                  <Button variant="outline" className="flex-1 font-body" asChild>
                    <a href="tel:+919371725270">
                      <Phone className="w-4 h-4 mr-2" /> Call to Order
                    </a>
                  </Button>
                </div>
              </div>
            </div>

            {/* Right: Configuration */}
            <div className="order-1 lg:order-2 space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="font-display text-xl font-semibold text-foreground">Configuration</h2>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setConfig(defaults)}
                  className="text-muted-foreground font-body"
                >
                  <RotateCcw className="w-3.5 h-3.5 mr-1" /> Reset
                </Button>
              </div>

              {/* Dimensions */}
              <fieldset className="bg-card rounded-xl p-5 card-shadow space-y-5">
                <legend className="font-display text-sm font-semibold text-foreground px-1">Dimensions</legend>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <Label className="font-body text-sm">Height</Label>
                    <span className="font-body text-sm font-semibold text-foreground">{config.height}"</span>
                  </div>
                  <Slider value={[config.height]} onValueChange={([v]) => set("height", v)} min={48} max={84} step={6} />
                  <div className="flex justify-between text-[10px] text-muted-foreground font-body mt-1">
                    <span>48"</span><span>84"</span>
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <Label className="font-body text-sm">Width</Label>
                    <span className="font-body text-sm font-semibold text-foreground">{config.width}"</span>
                  </div>
                  <Slider value={[config.width]} onValueChange={([v]) => set("width", v)} min={24} max={60} step={6} />
                  <div className="flex justify-between text-[10px] text-muted-foreground font-body mt-1">
                    <span>24"</span><span>60"</span>
                  </div>
                </div>

                <div>
                  <Label className="font-body text-sm mb-2 block">Number of Doors</Label>
                  <div className="flex gap-2">
                    {[1, 2, 3].map((d) => (
                      <button
                        key={d}
                        onClick={() => set("doors", d)}
                        className={`flex-1 py-2.5 rounded-lg text-sm font-body font-medium transition-colors border ${
                          config.doors === d
                            ? "bg-primary text-primary-foreground border-primary"
                            : "bg-card text-foreground border-border hover:bg-muted"
                        }`}
                      >
                        {d} Door{d > 1 ? "s" : ""}
                      </button>
                    ))}
                  </div>
                </div>
              </fieldset>

              {/* Color */}
              <fieldset className="bg-card rounded-xl p-5 card-shadow">
                <legend className="font-display text-sm font-semibold text-foreground px-1">Color</legend>
                <div className="grid grid-cols-4 gap-3 mt-2">
                  {colorOptions.map((c) => (
                    <Tooltip key={c.id}>
                      <TooltipTrigger asChild>
                        <button
                          onClick={() => set("color", c.id)}
                          className={`flex flex-col items-center gap-1.5 p-2 rounded-lg transition-all ${
                            config.color === c.id ? "ring-2 ring-primary bg-muted" : "hover:bg-muted"
                          }`}
                        >
                          <div
                            className="w-8 h-8 rounded-full border-2"
                            style={{ backgroundColor: c.hex, borderColor: config.color === c.id ? "hsl(38 60% 50%)" : "#ddd" }}
                          />
                          <span className="text-[10px] font-body text-muted-foreground leading-tight text-center">{c.label}</span>
                        </button>
                      </TooltipTrigger>
                      <TooltipContent className="font-body text-xs">{c.label}</TooltipContent>
                    </Tooltip>
                  ))}
                </div>
              </fieldset>

              {/* Steel Thickness */}
              <fieldset className="bg-card rounded-xl p-5 card-shadow">
                <legend className="font-display text-sm font-semibold text-foreground px-1 flex items-center gap-1">
                  Steel Thickness
                  <Tooltip>
                    <TooltipTrigger><Info className="w-3.5 h-3.5 text-muted-foreground" /></TooltipTrigger>
                    <TooltipContent className="font-body text-xs max-w-[200px]">Lower gauge = thicker & stronger steel. 20 gauge is recommended for heavy use.</TooltipContent>
                  </Tooltip>
                </legend>
                <div className="grid grid-cols-2 gap-2 mt-2">
                  {thicknessOptions.map((t) => (
                    <button
                      key={t.id}
                      onClick={() => set("thickness", t.id)}
                      className={`py-2.5 px-3 rounded-lg text-sm font-body transition-colors border text-left ${
                        config.thickness === t.id
                          ? "bg-primary text-primary-foreground border-primary"
                          : "bg-card text-foreground border-border hover:bg-muted"
                      }`}
                    >
                      {t.label}
                    </button>
                  ))}
                </div>
              </fieldset>

              {/* Interior */}
              <fieldset className="bg-card rounded-xl p-5 card-shadow space-y-5">
                <legend className="font-display text-sm font-semibold text-foreground px-1">Interior</legend>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <Label className="font-body text-sm">Shelves</Label>
                    <span className="font-body text-sm font-semibold text-foreground">{config.shelves}</span>
                  </div>
                  <Slider value={[config.shelves]} onValueChange={([v]) => set("shelves", v)} min={2} max={8} step={1} />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <Label className="font-body text-sm">Drawers</Label>
                    <span className="font-body text-sm font-semibold text-foreground">{config.drawers}</span>
                  </div>
                  <Slider value={[config.drawers]} onValueChange={([v]) => set("drawers", v)} min={0} max={3} step={1} />
                </div>
              </fieldset>

              {/* Mirror, Lock, Handle */}
              <fieldset className="bg-card rounded-xl p-5 card-shadow space-y-4">
                <legend className="font-display text-sm font-semibold text-foreground px-1">Accessories</legend>

                <div>
                  <Label className="font-body text-sm mb-2 block">Mirror</Label>
                  <Select value={config.mirror} onValueChange={(v) => set("mirror", v)}>
                    <SelectTrigger className="font-body"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      {mirrorOptions.map((m) => (
                        <SelectItem key={m.id} value={m.id} className="font-body">{m.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label className="font-body text-sm mb-2 block">Lock Type</Label>
                  <Select value={config.lock} onValueChange={(v) => set("lock", v)}>
                    <SelectTrigger className="font-body"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      {lockOptions.map((l) => (
                        <SelectItem key={l.id} value={l.id} className="font-body">{l.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label className="font-body text-sm mb-2 block">Handle Style</Label>
                  <div className="grid grid-cols-3 gap-2">
                    {handleOptions.map((h) => (
                      <button
                        key={h.id}
                        onClick={() => set("handle", h.id)}
                        className={`py-2.5 rounded-lg text-sm font-body font-medium transition-colors border ${
                          config.handle === h.id
                            ? "bg-primary text-primary-foreground border-primary"
                            : "bg-card text-foreground border-border hover:bg-muted"
                        }`}
                      >
                        {h.label}
                      </button>
                    ))}
                  </div>
                </div>
              </fieldset>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Customize;
