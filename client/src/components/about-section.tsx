import fine from "@assets/fine.png";

export default function AboutSection() {
  const values = [
    {
      colour: "bg-[hsl(197,87%,43%)]",
      text: "AI that augments people — never replaces them",
    },
    {
      colour: "bg-[hsl(217,91%,60%)]",
      text: "Built for the people who keep New Zealand running",
    },
    {
      colour: "bg-[hsl(327,73%,56%)]",
      text: "Honest pricing. No surprises. No lock-in.",
    },
  ];

  return (
    <section id="about" className="py-20 bg-[hsl(215,25%,27%)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold gradient-text mb-4">About Corvid AI</h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            A real person. A clear purpose. AI built for New Zealand.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">

          {/* Left — Story */}
          <div className="space-y-6">
            <h3 className="text-2xl font-semibold text-[hsl(197,87%,43%)]">
              Built on intelligence. Designed for the people who build New Zealand.
            </h3>

            <p className="text-slate-300 leading-relaxed">
              Corvid AI was built by Ali Alsaffaf — a servant leader who has spent his career doing one thing well: taking away the noise so the people around him can focus on what they do best.
            </p>

            <p className="text-slate-300 leading-relaxed">
              New Zealand is a nation of extraordinary people. Tradies, small business owners, and everyday hardworking Kiwis who show up, do the mahi, and keep this country running. They're skilled, passionate, and deserve better tools — tools that work as hard as they do.
            </p>

            <p className="text-slate-300 leading-relaxed">
              Corvid AI builds AI-powered tools that handle the important-but-boring parts of running a business — so you can spend more time doing what you love, what you're great at, and what actually moves the needle.
            </p>

            <p className="text-slate-300 leading-relaxed">
              We believe AI should augment people — never replace them. Every tool we build is designed to make the person behind the business more powerful, not redundant.
            </p>

            <div className="space-y-4 mt-8">
              {values.map((v, i) => (
                <div key={i} className="flex items-center space-x-3">
                  <div className={`w-2 h-2 ${v.colour} rounded-full flex-shrink-0`}></div>
                  <span className="text-slate-300">{v.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right — Founder card */}
          <div className="glass-effect rounded-2xl p-8">
            <img
              src={fine}
              alt="Ali Alsaffaf — Founder of Corvid AI"
              className="rounded-xl w-full h-64 object-cover mb-6"
            />

            <h4 className="text-xl font-semibold text-[hsl(197,87%,43%)] mb-1 text-center">
              Ali Alsaffaf
            </h4>
            <p className="text-slate-400 mb-5 text-center text-sm">
              Founder, Corvid AI · Waikato, New Zealand
            </p>

            <p className="text-slate-300 text-sm leading-relaxed text-center italic mb-5">
              "I didn't build Corvid AI to sell software. I built it because the people of this country are remarkable — and they deserve technology that actually works for them, not against them."
            </p>

            <div className="border-t border-slate-600 pt-5">
              <p className="text-slate-400 text-xs leading-relaxed text-center">
                Corvid AI's ultimate goal is simple: to generate enough success to give back — paying medical bills, funding scholarships, supporting those who need it most. Every client we help is a step toward that.
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
