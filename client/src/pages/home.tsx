import Navigation from "@/components/navigation";
import HeroSection from "@/components/hero-section";
import AboutSection from "@/components/about-section";
import ServicesSection from "@/components/services-section";
import BlogSection from "@/components/blog-section";
import ContactSection from "@/components/contact-section";
import Footer from "@/components/footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-[hsl(222,84%,15%)] text-slate-100">
      <Navigation />
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <BlogSection />
      <ContactSection />
      <Footer />
    </div>
  );
}
