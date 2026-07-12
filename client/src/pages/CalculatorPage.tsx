import { useState, useEffect } from "react";
import { Link } from "wouter";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";

const TRADE_PRESETS: Record<string, number> = {
  Electrician: 450,
  Plumber: 400,
  Builder: 800,
  HVAC: 500,
  "Solar Installer": 1200,
  "Hair Stylist / Barber": 80,
};

export default function CalculatorPage() {
  const [jobValue, setJobValue] = useState(400);
  const [missedCalls, setMissedCalls] = useState(5);
  const [closeRate, setCloseRate] = useState(60);
  const [activePreset, setActivePreset] = useState<string | null>(null);

  useEffect(() => {
    document.title = "Missed Call Cost Calculator — See What It's Really Costing You | Corvid AI";
    window.scrollTo(0, 0);

    let meta = document.querySelector('meta[name="description"]');
    if (!meta) {
      meta = document.createElement("meta");
      meta.setAttribute("name", "description");
      document.head.appendChild(meta);
    }
    meta.setAttribute(
      "content",
      "Work out exactly how much missed calls are costing your NZ trade business every year. Free calculator — enter your job value and missed calls to see the real number."
    );

    const canonical = document.querySelector('link[rel="canonical"]');
    if (canonical) {
      canonical.setAttribute("href", "https://corvidai.io/calculator");
    } else {
      const link = document.createElement("link");
      link.rel = "canonical";
      link.href = "https://corvidai.io/calculator";
      document.head.appendChild(link);
    }
  }, []);

  const genuineEnquiries = missedCalls * 0.6;
  const noVoicemail = genuineEnquiries * 0.8;
  const jobsLostWeek = noVoicemail * (closeRate / 100);
  const lostYear = jobsLostWeek * jobValue * 52;
  const lostMonth = lostYear / 12;

  const fmt = (n: number) => `$${Math.round(n).toLocaleString()}`;

  const selectPreset = (trade: string) => {
    setActivePreset(trade);
    setJobValue(TRADE_PRESETS[trade]);
  };

  return (
    <div className="min-h-screen bg-[hsl(222,84%,15%)] text-slate-100">
      <Navigation />

      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-10">
            <div className="flex items-center justify-center gap-2 mb-4">
              <span className="w-2 h-2 rounded-full bg-[hsl(197,87%,43%)] animate-pulse" />
              <span className="text-xs font-bold tracking-widest uppercase text-[hsl(197,87%,43%)]">
                Missed Call Cost Calculator
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold mb-3">
              See what it's <span className="gradient-text">really costing you</span>
            </h1>
            <p className="text-slate-400 text-base leading-relaxed max-w-lg mx-auto">
              Move the sliders to match your business. Most tradies are surprised by the number.
            </p>
          </div>

          <div className="gradient-border rounded-2xl">
            <div className="bg-[hsl(222,84%,15%)] rounded-[calc(1rem-2px)] p-8 sm:p-10">

              {/* Trade presets */}
              <div className="mb-8">
                <p className="text-slate-500 text-xs font-medium tracking-wide mb-3">
                  QUICK START — PICK YOUR TRADE
                </p>
                <div className="flex flex-wrap gap-2">
                  {Object.keys(TRADE_PRESETS).map((trade) => (
                    <button
                      key={trade}
                      onClick={() => selectPreset(trade)}
                      className={`text-xs font-medium px-3 py-1.5 rounded-full border transition-all ${
                        activePreset === trade
                          ? "bg-gradient-to-r from-[hsl(197,87%,43%)] to-[hsl(217,91%,60%)] border-transparent text-white"
                          : "border-[hsl(215,27.9%,16.9%)] text-slate-400 hover:border-[hsl(197,87%,43%)]/50 hover:text-slate-200"
                      }`}
                    >
                      {trade}
                    </button>
                  ))}
                </div>
              </div>

              {/* Sliders */}
              <div className="space-y-6 mb-8">
                <div>
                  <div className="flex justify-between mb-2">
                    <label className="text-sm text-slate-400">Average job value</label>
                    <span className="text-sm font-semibold text-white">{fmt(jobValue)}</span>
                  </div>
                  <input
                    type="range"
                    min={50}
                    max={2000}
                    step={25}
                    value={jobValue}
                    onChange={(e) => { setJobValue(Number(e.target.value)); setActivePreset(null); }}
                    className="w-full accent-[hsl(197,87%,43%)]"
                  />
                </div>

                <div>
                  <div className="flex justify-between mb-2">
                    <label className="text-sm text-slate-400">Missed calls per week</label>
                    <span className="text-sm font-semibold text-white">{missedCalls}</span>
                  </div>
                  <input
                    type="range"
                    min={1}
                    max={30}
                    step={1}
                    value={missedCalls}
                    onChange={(e) => setMissedCalls(Number(e.target.value))}
                    className="w-full accent-[hsl(197,87%,43%)]"
                  />
                </div>

                <div>
                  <div className="flex justify-between mb-2">
                    <label className="text-sm text-slate-400">Your close rate if you'd answered</label>
                    <span className="text-sm font-semibold text-white">{closeRate}%</span>
                  </div>
                  <input
                    type="range"
                    min={10}
                    max={100}
                    step={5}
                    value={closeRate}
                    onChange={(e) => setCloseRate(Number(e.target.value))}
                    className="w-full accent-[hsl(197,87%,43%)]"
                  />
                </div>
              </div>

              {/* Result cards */}
              <div className="grid grid-cols-3 gap-3 mb-6">
                <div className="bg-[hsl(215,25%,27%)]/40 border border-[hsl(215,27.9%,16.9%)] rounded-xl p-3">
                  <p className="text-slate-500 text-[11px] font-medium mb-1">JOBS LOST / WK</p>
                  <p className="text-lg font-bold text-white">{jobsLostWeek.toFixed(1)}</p>
                </div>
                <div className="bg-[hsl(215,25%,27%)]/40 border border-[hsl(215,27.9%,16.9%)] rounded-xl p-3">
                  <p className="text-slate-500 text-[11px] font-medium mb-1">LOST / MONTH</p>
                  <p className="text-lg font-bold text-white">{fmt(lostMonth)}</p>
                </div>
                <div className="bg-gradient-to-br from-[hsl(327,60%,20%)] to-[hsl(217,60%,20%)] border border-[hsl(327,50%,40%)]/50 rounded-xl p-3">
                  <p className="text-[hsl(327,50%,80%)] text-[11px] font-medium mb-1">LOST / YEAR</p>
                  <p className="text-lg font-bold gradient-text">{fmt(lostYear)}</p>
                </div>
              </div>

              <p className="text-slate-600 text-xs leading-relaxed mb-6">
                Based on ~60% of missed calls being genuine new enquiries, and ~80% of callers not leaving a voicemail when they don't get through.
              </p>

              <Link
                href="/receptionist#demo"
                className="block w-full text-center bg-gradient-to-r from-[hsl(197,87%,43%)] to-[hsl(217,91%,60%)] text-white font-bold text-sm px-5 py-3.5 rounded-xl hover:-translate-y-0.5 hover:shadow-lg hover:shadow-[hsl(197,87%,43%)]/30 transition-all"
              >
                Stop losing this money — try a live demo
              </Link>
            </div>
          </div>

          <p className="text-center text-slate-500 text-sm mt-8">
            Want the full breakdown?{" "}
            <Link href="/blog/how-much-is-a-missed-call-costing-your-trade-business" className="text-[hsl(197,87%,43%)] hover:underline">
              Read how the numbers work
            </Link>
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
}
