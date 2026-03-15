import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HeroSection from "@/components/home/HeroSection";
import CategoriesSection from "@/components/home/CategoriesSection";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import BulkOrderCTA from "@/components/home/BulkOrderCTA";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import ContactCTA from "@/components/home/ContactCTA";

const Index = () => (
  <>
    <Header />
    <main>
      <HeroSection />
      <CategoriesSection />
      <FeaturedProducts />
      <BulkOrderCTA />
      <WhyChooseUs />
      <TestimonialsSection />
      <ContactCTA />
    </main>
    <Footer />
  </>
);

export default Index;
