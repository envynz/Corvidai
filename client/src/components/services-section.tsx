import { Brain, Code, Lightbulb } from "lucide-react";

export default function ServicesSection() {
  const services = [
    {
      icon: Brain,
      title: "Strategic Consulting",
      description: "Intelligent analysis and strategic planning to solve complex business challenges with innovative approaches."
    },
    {
      icon: Code,
      title: "Technology Solutions",
      description: "Custom software development and digital transformation that adapts to your unique business needs."
    },
    {
      icon: Lightbulb,
      title: "Innovation Leadership",
      description: "Guiding organizations through digital transformation with creative problem-solving and forward-thinking strategies."
    }
  ];

  return (
    <section className="py-20 bg-[hsl(222,84%,15%)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold gradient-text mb-4">What We Do</h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Leveraging intelligence and innovation to deliver exceptional solutions.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const Icon = service.icon;
            const gradients = [
              "from-[hsl(197,87%,43%)] to-[hsl(217,91%,60%)]",
              "from-[hsl(217,91%,60%)] to-[hsl(327,73%,56%)]",
              "from-[hsl(327,73%,56%)] to-[hsl(43,96%,49%)]"
            ];
            
            return (
              <div key={index} className="glass-effect rounded-2xl p-8 hover:scale-105 transition-transform duration-300">
                <div className={`w-12 h-12 bg-gradient-to-br ${gradients[index]} rounded-lg mb-6 flex items-center justify-center`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-[hsl(197,87%,43%)] mb-4">{service.title}</h3>
                <p className="text-slate-300 leading-relaxed">{service.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
