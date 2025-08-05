import covidLogo from "@assets/corvidai_1753068680605.png";
import { Mail, Linkedin } from "lucide-react";

export default function Footer() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="bg-[hsl(215,25%,27%)] py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center space-x-3 mb-6 md:mb-0">
            <img 
              src={covidLogo} 
              alt="Corvid.ai Logo" 
              className="w-8 h-8 rounded-lg"
            />
            <span className="text-xl font-bold gradient-text">Corvid.ai</span>
          </div>
          
          <div className="flex space-x-6 mb-6 md:mb-0">
            <button 
              onClick={() => scrollToSection("home")}
              className="text-slate-400 hover:text-[hsl(197,87%,43%)] transition-colors"
            >
              Home
            </button>
            <button 
              onClick={() => scrollToSection("about")}
              className="text-slate-400 hover:text-[hsl(197,87%,43%)] transition-colors"
            >
              About
            </button>
            <button 
              onClick={() => scrollToSection("blog")}
              className="text-slate-400 hover:text-[hsl(197,87%,43%)] transition-colors"
            >
              Blog
            </button>
            <button 
              onClick={() => scrollToSection("contact")}
              className="text-slate-400 hover:text-[hsl(197,87%,43%)] transition-colors"
            >
              Contact
            </button>
          </div>
          
          <div className="flex space-x-4">
            <a 
              href="https://www.linkedin.com/in/alialsaffaf/" 
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-400 hover:text-[hsl(197,87%,43%)] transition-colors"
            >
              <Linkedin size={20} />
            </a>
            <a 
              href="mailto:hello@corvidai.com" 
              className="text-slate-400 hover:text-[hsl(197,87%,43%)] transition-colors"
            >
              <Mail size={20} />
            </a>
          </div>
        </div>
        
        <div className="border-t border-slate-600 mt-8 pt-8 text-center">
          <p className="text-slate-400 text-sm">
            © 2024 Corvid.ai. Intelligence that soars above the ordinary.
          </p>
        </div>
      </div>
    </footer>
  );
}
