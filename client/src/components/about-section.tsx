export default function AboutSection() {
  return (
    <section id="about" className="py-20 bg-[hsl(215,25%,27%)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold gradient-text mb-4">About Corvidai</h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Discover the story behind the intelligence and innovation that drives our mission.
          </p>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h3 className="text-2xl font-semibold text-[hsl(197,87%,43%)]">The Intelligence of Corvids</h3>
            <p className="text-slate-300 leading-relaxed">
              Like the remarkable corvid family - ravens, crows, and magpies - known for their exceptional intelligence and problem-solving abilities, Corvidai represents the fusion of natural intelligence with cutting-edge AI technology.
            </p>
            <p className="text-slate-300 leading-relaxed">
              Our approach combines analytical thinking, creative solutions, and adaptive strategies to tackle complex challenges in the digital landscape. We believe in the power of intelligent design and innovative problem-solving.
            </p>
            
            <div className="space-y-4 mt-8">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-[hsl(197,87%,43%)] rounded-full"></div>
                <span className="text-slate-300">Strategic Problem Solving</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-[hsl(217,91%,60%)] rounded-full"></div>
                <span className="text-slate-300">Innovative Technology Solutions</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-[hsl(327,73%,56%)] rounded-full"></div>
                <span className="text-slate-300">Adaptive Intelligence</span>
              </div>
            </div>
          </div>
          
          <div className="glass-effect rounded-2xl p-8">
            <img 
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=800" 
              alt="Professional headshot" 
              className="rounded-xl w-full h-64 object-cover mb-6"
            />
            
            <h4 className="text-xl font-semibold text-[hsl(197,87%,43%)] mb-2">Founder & Visionary</h4>
            <p className="text-slate-400 mb-4">Technology Strategist & Innovation Leader</p>
            <p className="text-slate-300 text-sm leading-relaxed">
              "Intelligence isn't just about processing information—it's about connecting ideas, adapting to challenges, and creating solutions that make a meaningful impact."
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
