import covidLogo from "@assets/corvidai_1753068680605.png";
import { Mail, Linkedin } from "lucide-react";
import { Link } from "wouter";

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
            <Link
              href="/receptionist"
              className="text-slate-400 hover:text-[hsl(197,87%,43%)] transition-colors"
            >
              Digital Receptionist
            </Link>
            <Link 
              href="/blog"
              className="text-slate-400 hover:text-[hsl(197,87%,43%)] transition-colors"
            >
              Blog
            </Link>
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
              href="https://www.facebook.com/CorvidAI"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-400 hover:text-[hsl(197,87%,43%)] transition-colors"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </a>
            <a 
              href="mailto:hello@corvidai.io" 
              className="text-slate-400 hover:text-[hsl(197,87%,43%)] transition-colors"
            >
              <Mail size={20} />
            </a>
          </div>
        </div>

        <div className="border-t border-slate-600 mt-8 pt-8 text-center">
          <p className="text-slate-400 text-sm">
            © 2026 Corvid.ai. Built on intelligence. Designed for the people who build New Zealand.
          </p>
        </div>
      </div>
    </footer>
  );
}
