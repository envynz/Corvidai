import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import covidLogo from "@assets/corvidai_1753068680605.png";

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsOpen(false);
    }
  };

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
      scrolled ? "glass-effect" : "bg-transparent"
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <img 
              src={covidLogo} 
              alt="Corvidai Logo" 
              className="w-8 h-8 rounded-lg"
            />
            <span className="text-xl font-bold gradient-text">Corvidai</span>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8">
            <button 
              onClick={() => scrollToSection("home")}
              className="hover:text-[hsl(197,87%,43%)] transition-colors duration-300"
            >
              Home
            </button>
            <button 
              onClick={() => scrollToSection("about")}
              className="hover:text-[hsl(197,87%,43%)] transition-colors duration-300"
            >
              About
            </button>
            <button 
              onClick={() => scrollToSection("blog")}
              className="hover:text-[hsl(197,87%,43%)] transition-colors duration-300"
            >
              Blog
            </button>
            <button 
              onClick={() => scrollToSection("contact")}
              className="hover:text-[hsl(197,87%,43%)] transition-colors duration-300"
            >
              Contact
            </button>
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
              <button 
                onClick={() => scrollToSection("home")}
                className="text-left hover:text-[hsl(197,87%,43%)] transition-colors duration-300"
              >
                Home
              </button>
              <button 
                onClick={() => scrollToSection("about")}
                className="text-left hover:text-[hsl(197,87%,43%)] transition-colors duration-300"
              >
                About
              </button>
              <button 
                onClick={() => scrollToSection("blog")}
                className="text-left hover:text-[hsl(197,87%,43%)] transition-colors duration-300"
              >
                Blog
              </button>
              <button 
                onClick={() => scrollToSection("contact")}
                className="text-left hover:text-[hsl(197,87%,43%)] transition-colors duration-300"
              >
                Contact
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
