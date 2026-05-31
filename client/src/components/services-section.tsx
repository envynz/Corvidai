import { Phone, Star, Brain } from "lucide-react";
import { Link } from "wouter";

export default function ServicesSection() {
  const services = [
    {
      icon: Phone,
      title: "Digital Receptionist",
      description: "An AI-powered receptionist that answers your missed calls 24/7, collects customer details, and texts you a summary — so you never lose another lead while you're on the job.",
      gradient: "from-[hsl(197,87%,43%)] to-[hsl(217,91%,60%)]",
      cta: { label: "Learn more", href: "/receptionist", external: false },
      badge: null,
    },
    {
      icon: Star,
      title: "Google Review Manager",
      description: "Automatically request, manage, and respond to Google reviews from your customers — building your reputation on autopilot while you focus on delivering great work.",
      gradient: "from-[hsl(217,91%,60%)] to-[hsl(327,73%,56%)]",
      cta: null,
      badge: "Coming soon",
    },
    {
      icon: Brain,
      title: "AI Consulting",
      description: "Custom AI solutions designed around your specific business challenges. From workflow automation to intelligent systems — if you can imagine it, we can build it.",
      gradient: "from-[hsl(327,73%,56%)] to-[hsl(43,96%,49%)]",
      cta: { label: "Get in touch", href: "contact", external: false, scroll: true },
      badge: null,
    },
  ];

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) element.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="services" className="py-20 bg-[hsl(222,84%,15%)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold gradient-text mb-4">What We Build</h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Practical AI tools designed for the people who keep New Zealand running.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <div
                key={index}
                className="glass-effect rounded-2xl p-8 hover:scale-105 transition-transform duration-300 flex flex-col"
              >
                {/* Icon */}
                <div className={`w-12 h-12 bg-gradient-to-br ${service.gradient} rounded-lg mb-6 flex items-center justify-center flex-shrink-0`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>

                {/* Title + badge */}
                <div className="flex items-center gap-3 mb-4">
                  <h3 className="text-xl font-semibold text-[hsl(197,87%,43%)]">{service.title}</h3>
                  {service.badge && (
                    <span className="text-xs font-semibold px-2 py-1 rounded-full bg-[hsl(217,91%,60%)]/15 text-[hsl(217,91%,60%)] border border-[hsl(217,91%,60%)]/25 whitespace-nowrap">
                      {service.badge}
                    </span>
                  )}
                </div>

                {/* Description */}
                <p className="text-slate-300 leading-relaxed flex-1">{service.description}</p>

                {/* CTA */}
                {service.cta && (
                  <div className="mt-6">
                    {service.cta.scroll ? (
                      <button
                        onClick={() => scrollToSection(service.cta!.href)}
                        className="inline-flex items-center gap-2 text-sm font-semibold text-[hsl(197,87%,43%)] hover:text-[hsl(217,91%,60%)] transition-colors duration-200"
                      >
                        {service.cta.label}
                        <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                          <path d="M3 8h10M9 4l4 4-4 4"/>
                        </svg>
                      </button>
                    ) : (
                      <Link href={service.cta.href}>
                        <a className="inline-flex items-center gap-2 text-sm font-semibold text-[hsl(197,87%,43%)] hover:text-[hsl(217,91%,60%)] transition-colors duration-200">
                          {service.cta.label}
                          <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                            <path d="M3 8h10M9 4l4 4-4 4"/>
                          </svg>
                        </a>
                      </Link>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
