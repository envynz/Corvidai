import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import covidLogo from "@assets/corvidai_1753068680605.png";

export default function HeroSection() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="home" className="min-h-screen flex items-center justify-center hero-gradient pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="animate-fadeInUp">
          {/* Main logo display */}
          <div className="mb-8 flex justify-center">
            <div className="w-32 h-32 bg-gradient-to-br from-[hsl(197,87%,43%)] via-[hsl(217,91%,60%)] to-[hsl(327,73%,56%)] rounded-full p-1 animate-glow">
              <div className="w-full h-full bg-[hsl(222,84%,15%)] rounded-full flex items-center justify-center">
                <img
                  src={covidLogo}
                  alt="Corvid.ai Logo"
                  className="w-20 h-20 object-contain"
                />
              </div>
            </div>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            <span className="gradient-text">Corvid.ai</span>
          </h1>

          <p className="text-xl md:text-2xl text-slate-300 mb-4 max-w-3xl mx-auto leading-relaxed">
            Built on intelligence. Designed for the people who build New Zealand.
          </p>

          <p className="text-base md:text-lg text-slate-400 mb-10 max-w-2xl mx-auto leading-relaxed">
            AI-powered tools that work in the background — so you can focus on the work that matters.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            {/* Primary CTA — Digital Receptionist */}
            <Link href="/receptionist">
              <a className="inline-flex items-center gap-2 px-8 py-3 rounded-xl font-semibold text-[hsl(222,84%,15%)] bg-gradient-to-r from-[hsl(197,87%,43%)] to-[hsl(217,91%,60%)] hover:opacity-90 hover:-translate-y-0.5 transition-all duration-200 shadow-lg shadow-[hsl(197,87%,43%)]/25 animate-glow">
                Try a Live Demo
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M3 8h10M9 4l4 4-4 4"/></svg>
              </a>
            </Link>

            {/* Secondary CTA — Services */}
            <div className="gradient-border">
              <Button
                onClick={() => scrollToSection("services")}
                className="bg-[hsl(222,84%,15%)] text-white px-8 py-3 rounded-xl hover:bg-[hsl(215,25%,27%)] transition-all duration-300 font-medium"
              >
                Our Services
              </Button>
            </div>

            {/* Tertiary CTA — Contact */}
            <Button
              onClick={() => scrollToSection("contact")}
              variant="outline"
              className="border-[hsl(197,87%,43%)] text-[hsl(197,87%,43%)] px-8 py-3 rounded-xl hover:bg-[hsl(197,87%,43%)] hover:text-[hsl(222,84%,15%)] transition-all duration-300 font-medium"
            >
              Get In Touch
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}