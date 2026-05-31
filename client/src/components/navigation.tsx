import { useState, useEffect, useRef } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import { Link, useLocation } from "wouter";
import covidLogo from "@assets/corvidai_1753068680605.png";

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const servicesRef = useRef<HTMLDivElement>(null);
  const [location, navigate] = useLocation();
  const isHome = location === "/";

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (servicesRef.current && !servicesRef.current.contains(e.target as Node)) {
        setServicesOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleNavClick = (sectionId: string) => {
    setIsOpen(false);
    setServicesOpen(false);
    if (isHome) {
      const element = document.getElementById(sectionId);
      if (element) element.scrollIntoView({ behavior: "smooth" });
    } else {
      navigate(`/#${sectionId}`);
    }
  };

  const navLinkClass = "hover:text-[hsl(197,87%,43%)] transition-colors duration-300";

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
      scrolled ? "glass-effect" : "bg-transparent"
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">

          {/* Logo — always goes to home */}
          <Link href="/" className="flex items-center space-x-3">
            <img src={covidLogo} alt="Corvid.ai Logo" className="w-8 h-8 rounded-lg" />
            <span className="text-xl font-bold gradient-text">Corvid.ai</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <button onClick={() => handleNavClick("home")} className={navLinkClass}>Home</button>
            <button onClick={() => handleNavClick("about")} className={navLinkClass}>About</button>

            {/* Services Dropdown */}
            <div className="relative" ref={servicesRef}>
              <button
                onClick={() => setServicesOpen(!servicesOpen)}
                className={`flex items-center gap-1 ${navLinkClass}`}
              >
                Services
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${servicesOpen ? "rotate-180" : ""}`} />
              </button>
              {servicesOpen && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-56 glass-effect rounded-xl border border-[hsl(215,27.9%,16.9%)] overflow-hidden shadow-xl">
                  <Link
                    href="/receptionist"
                    onClick={() => setServicesOpen(false)}
                    className="flex items-center gap-2 px-4 py-3 text-sm text-slate-200 hover:text-[hsl(197,87%,43%)] hover:bg-[hsl(197,87%,43%)]/10 transition-colors duration-200"
                  >
                    📞 Digital Receptionist
                  </Link>
                  <div className="border-t border-[hsl(215,27.9%,16.9%)]" />
                  <button
                    onClick={() => handleNavClick("contact")}
                    className="flex items-center gap-2 px-4 py-3 text-sm text-slate-200 hover:text-[hsl(197,87%,43%)] hover:bg-[hsl(197,87%,43%)]/10 transition-colors duration-200 w-full text-left"
                  >
                    🧠 AI Consulting
                  </button>
                </div>
              )}
            </div>

            <button onClick={() => handleNavClick("blog")} className={navLinkClass}>Blog</button>
            <button onClick={() => handleNavClick("contact")} className={navLinkClass}>Contact</button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-slate-300 hover:text-[hsl(197,87%,43%)]"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden glass-effect rounded-lg mt-2 p-4">
            <div className="flex flex-col space-y-4">
              <button onClick={() => handleNavClick("home")} className={`text-left ${navLinkClass}`}>Home</button>
              <button onClick={() => handleNavClick("about")} className={`text-left ${navLinkClass}`}>About</button>

              {/* Mobile Services */}
              <div>
                <button
                  onClick={() => setServicesOpen(!servicesOpen)}
                  className={`flex items-center gap-1 text-left w-full ${navLinkClass}`}
                >
                  Services
                  <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${servicesOpen ? "rotate-180" : ""}`} />
                </button>
                {servicesOpen && (
                  <div className="mt-2 ml-4 border-l border-[hsl(197,87%,43%)]/30 pl-4 flex flex-col gap-2">
                    <Link
                      href="/receptionist"
                      onClick={() => { setServicesOpen(false); setIsOpen(false); }}
                      className="block text-sm text-slate-300 hover:text-[hsl(197,87%,43%)] transition-colors duration-200 py-1"
                    >
                      📞 Digital Receptionist
                    </Link>
                    <button
                      onClick={() => handleNavClick("contact")}
                      className="block text-sm text-slate-300 hover:text-[hsl(197,87%,43%)] transition-colors duration-200 py-1 text-left"
                    >
                      🧠 AI Consulting
                    </button>
                  </div>
                )}
              </div>

              <button onClick={() => handleNavClick("blog")} className={`text-left ${navLinkClass}`}>Blog</button>
              <button onClick={() => handleNavClick("contact")} className={`text-left ${navLinkClass}`}>Contact</button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
