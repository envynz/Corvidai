import { useEffect } from "react";
import Navigation from "@/components/navigation";
import HeroSection from "@/components/hero-section";
import AboutSection from "@/components/about-section";
import ServicesSection from "@/components/services-section";
import BlogSection from "@/components/blog-section";
import ContactSection from "@/components/contact-section";
import Footer from "@/components/footer";

export default function Home() {
  useEffect(() => {
    document.title = "Corvid AI — AI-Powered Digital Receptionist for NZ Tradies";

    // Reset meta description to homepage default (in case another page's
    // useEffect overwrote it during client-side navigation)
    let meta = document.querySelector('meta[name="description"]');
    if (!meta) {
      meta = document.createElement("meta");
      meta.setAttribute("name", "description");
      document.head.appendChild(meta);
    }
    meta.setAttribute(
      "content",
      "Corvid AI builds AI-powered tools for New Zealand businesses. Our Digital Receptionist answers missed calls 24/7, collects customer details, and texts you a summary — so you never lose a lead while you're on the job."
    );

    const canonical = document.querySelector('link[rel="canonical"]');
    if (canonical) {
      canonical.setAttribute('href', 'https://corvidai.io/');
    } else {
      const link = document.createElement('link');
      link.rel = 'canonical';
      link.href = 'https://corvidai.io/';
      document.head.appendChild(link);
    }

    // Scroll to a section (e.g. #about, #contact) if arriving via a link
    // from another page — mirrors the same fix used on the receptionist page.
    const hash = window.location.hash;
    if (hash) {
      const timer = setTimeout(() => {
        const el = document.querySelector(hash);
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }, 100);
      return () => clearTimeout(timer);
    }
  }, []);

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
