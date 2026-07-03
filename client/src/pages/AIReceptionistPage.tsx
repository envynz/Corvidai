import { useState, useEffect } from "react";
import { Link } from "wouter";
import { Phone, MessageSquare, Clock, CheckCircle, ChevronDown, Menu, X, ArrowRight, Zap, Shield } from "lucide-react";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import DemoWidget from './DemoWidget';

// ─── Data ─────────────────────────────────────────────────────────────────────

const HOW_IT_WORKS = [
  {
    step: "01",
    icon: <Phone className="w-6 h-6" />,
    title: "Customer calls your number",
    body: "When you're on the tools and can't answer, your carrier silently diverts the missed call to our system — no app, no change to your existing number.",
  },
  {
    step: "02",
    icon: <Zap className="w-6 h-6" />,
    title: "Digital Receptionist answers instantly",
    body: "Your Digital receptionist picks up, greets the caller with your business name, and handles the conversation naturally — collecting their name, number, and what they need.",
  },
  {
    step: "03",
    icon: <MessageSquare className="w-6 h-6" />,
    title: "You get a text summary",
    body: "The moment the call ends, you receive an SMS with the caller's details and job type. No voicemail to dig through — just the info you need to call back.",
  },
  {
    step: "04",
    icon: <CheckCircle className="w-6 h-6" />,
    title: "Customer gets a follow-up SMS",
    body: "Digital receptionist sends your customer a text confirming you'll be in touch, keeping them warm while you finish the job.",
  },
];

const FAQS = [
  {
    q: "Will my customers know they're talking to an AI?",
    a: "That's up to you. We can configure your Digital receptionist to be upfront if asked, or keep it ambiguous. Either way, customers consistently report the experience feels natural and professional.",
  },
  {
    q: "Do I need to change my phone number or setup?",
    a: "No. Your number stays exactly the same. We use your carrier's existing divert-on-no-answer feature to route missed calls to the Digital receptionist. Customers dial your number as usual.",
  },
  {
    q: "What trades does this work for?",
    a: "Any trade where you're often on the tools and miss calls — electricians, plumbers, builders, painters, roofers, landscapers, HVAC technicians, and more.",
  },
  {
    q: "How long does setup take?",
    a: "Most clients are live within 24–48 hours of completing the setup form. We handle all the configuration — you just fill in a few details about your business.",
  },
  {
    q: "Is there a contract?",
    a: "No contract, no lock-in. Pay month to month. If it's not working for you, cancel anytime — no questions asked.",
  },
  {
    q: "What if a customer has a complex question the Digital receptionist can't answer?",
    a: "The Digital receptionist is trained to stay in her lane. If a question is outside scope, she'll let the customer know you'll call them back personally — then notify you immediately.",
  },
];

const FEATURES = [
  "24/7 Digital receptionist",
  "Missed call detection via carrier divert",
  "SMS lead notifications to you",
  "Customer follow-up SMS",
  "Custom business hours & service area",
  "Personalised greetings & responses",
  "Live in 24–48 hours",
  "No contract, cancel anytime",
];

// ─── FAQ Accordion ────────────────────────────────────────────────────────────

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className={`border rounded-xl overflow-hidden transition-all duration-200 ${
      open
        ? "border-[hsl(197,87%,43%)] bg-[hsl(215,25%,27%)]/40"
        : "border-[hsl(215,27.9%,16.9%)] bg-[hsl(215,25%,27%)]/20"
    }`}>
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex justify-between items-center gap-4 p-5 text-left"
      >
        <span className="font-semibold text-slate-100 text-sm md:text-base leading-snug">{q}</span>
        <ChevronDown
          className={`w-5 h-5 flex-shrink-0 text-[hsl(197,87%,43%)] transition-transform duration-250 ${open ? "rotate-180" : ""}`}
        />
      </button>
      {open && (
        <div className="px-5 pb-5 text-sm text-slate-400 leading-relaxed">
          {a}
        </div>
      )}
    </div>
  );
}

// ─── Lead Form ────────────────────────────────────────────────────────────────

function LeadForm() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [form, setForm] = useState({ name: "", business: "", mobile: "", trade: "", message: "" });

  const valid = form.name && form.mobile && form.trade;

  const handleSubmit = async () => {
    if (!valid) return;
    setLoading(true);
    setError(false);
    try {
      const res = await fetch("https://formspree.io/f/xzdwardb", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          "Lead Name": form.name,
          "Business Name": form.business || "Not provided",
          "Mobile": form.mobile,
          "Trade": form.trade,
          "Message": form.message || "No message",
          "Source": "corvidai.io/receptionist — Landing Page Lead",
        }),
      });
      if (res.ok) setSubmitted(true);
      else throw new Error();
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  const inputClass = "w-full px-4 py-3 rounded-lg bg-[hsl(222,84%,15%)] border border-[hsl(215,27.9%,16.9%)] text-slate-100 placeholder-slate-500 text-sm focus:outline-none focus:border-[hsl(197,87%,43%)] focus:ring-1 focus:ring-[hsl(197,87%,43%)] transition-colors";

  if (submitted) {
    return (
      <div className="text-center py-10">
        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[hsl(197,87%,43%)] to-[hsl(217,91%,60%)] flex items-center justify-center mx-auto mb-5 animate-glow">
          <CheckCircle className="w-8 h-8 text-white" />
        </div>
        <h3 className="text-xl font-bold text-slate-100 mb-2">We'll be in touch!</h3>
        <p className="text-slate-400 text-sm leading-relaxed max-w-xs mx-auto">
          Thanks for your interest. We'll call you back shortly to answer any questions and get you set up.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <label className="block text-xs text-slate-500 uppercase tracking-wider mb-1.5">Your name *</label>
          <input className={inputClass} placeholder="James Smith" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
        </div>
        <div>
          <label className="block text-xs text-slate-500 uppercase tracking-wider mb-1.5">Business name</label>
          <input className={inputClass} placeholder="Smith Electrical" value={form.business} onChange={e => setForm({ ...form, business: e.target.value })} />
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <label className="block text-xs text-slate-500 uppercase tracking-wider mb-1.5">Mobile *</label>
          <input className={inputClass} placeholder="021 123 4567" type="tel" value={form.mobile} onChange={e => setForm({ ...form, mobile: e.target.value })} />
        </div>
        <div>
          <label className="block text-xs text-slate-500 uppercase tracking-wider mb-1.5">Trade *</label>
          <input className={inputClass} placeholder="e.g. Electrician" value={form.trade} onChange={e => setForm({ ...form, trade: e.target.value })} />
        </div>
      </div>
      <div>
        <label className="block text-xs text-slate-500 uppercase tracking-wider mb-1.5">Message (optional)</label>
        <textarea
          className={`${inputClass} min-h-[80px] resize-y`}
          placeholder="Any questions or specific requirements..."
          value={form.message}
          onChange={e => setForm({ ...form, message: e.target.value })}
        />
      </div>
      {error && (
        <p className="text-red-400 text-xs text-center">
          Something went wrong — please try again or email{" "}
          <a href="mailto:hello@corvidai.io" className="underline">hello@corvidai.io</a>
        </p>
      )}
      <button
        onClick={handleSubmit}
        disabled={loading || !valid}
        className={`w-full py-3.5 rounded-lg font-semibold text-sm text-white transition-all duration-200 flex items-center justify-center gap-2
          ${valid && !loading
            ? "bg-gradient-to-r from-[hsl(197,87%,43%)] to-[hsl(217,91%,60%)] hover:opacity-90 hover:-translate-y-0.5 shadow-lg shadow-[hsl(197,87%,43%)]/25"
            : "bg-[hsl(215,25%,27%)] opacity-50 cursor-not-allowed"
          }`}
      >
        {loading ? "Sending..." : <><span>Request a Callback</span><ArrowRight className="w-4 h-4" /></>}
      </button>
      <p className="text-xs text-slate-600 text-center">
        No commitment. We'll call you back to answer questions and walk you through it.
      </p>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function AIReceptionistPage() {
  useEffect(() => {
    document.title = "Digital Receptionist — AI-Powered Missed Call Handler for NZ Tradies | Corvid AI";
    // Set canonical URL for this page
    const canonical = document.querySelector('link[rel="canonical"]');
    if (canonical) {
      canonical.setAttribute('href', 'https://corvidai.io/receptionist');
    } else {
      const link = document.createElement('link');
      link.rel = 'canonical';
      link.href = 'https://corvidai.io/receptionist';
      document.head.appendChild(link);
    }
    const hash = window.location.hash;
    if (hash) {
      // Wait for page to fully render before scrolling
      const timer = setTimeout(() => {
        const el = document.querySelector(hash);
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }, 100);
      return () => clearTimeout(timer);
    }
  }, []);

  return (
    <div className="min-h-screen bg-[hsl(222,84%,15%)] text-slate-100">
      <Navigation />

      {/* ── HERO ── */}
      <section id="home" className="relative min-h-screen flex items-center justify-center text-center px-4 pt-24 pb-16 hero-gradient overflow-hidden">
        {/* Background dot grid */}
        <div
          className="absolute inset-0 opacity-20 pointer-events-none"
          style={{ backgroundImage: "radial-gradient(hsl(215,20%,65%) 1px, transparent 1px)", backgroundSize: "32px 32px" }}
        />

        {/* Glow orbs */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full bg-[hsl(197,87%,43%)]/10 blur-3xl pointer-events-none" />
        <div className="absolute bottom-1/4 left-1/4 w-64 h-64 rounded-full bg-[hsl(327,73%,56%)]/8 blur-3xl pointer-events-none" />

        <div className="relative max-w-4xl mx-auto animate-fadeInUp">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[hsl(197,87%,43%)]/30 bg-[hsl(197,87%,43%)]/10 text-[hsl(197,87%,43%)] text-xs font-medium tracking-wider uppercase mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-[hsl(197,87%,43%)] animate-pulse" />
            NZ's SMS-First AI Digital Receptionist
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold leading-tight tracking-tight mb-6">
            Stop Losing Jobs<br />
            <span className="gradient-text">Every Time You Miss a Call</span>
          </h1>

          <p className="text-slate-400 text-lg sm:text-xl leading-relaxed max-w-2xl mx-auto mb-10">
            New Zealand's SMS-first AI Digital Receptionist. When you miss a call, it texts the caller within 60 seconds, collects their details, and sends you a qualified lead summary — automatically, 24/7, while you get on with the job.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-10">
            <a
              href="#get-started"
              className="px-8 py-4 rounded-xl font-semibold text-white bg-gradient-to-r from-[hsl(197,87%,43%)] to-[hsl(217,91%,60%)] hover:opacity-90 hover:-translate-y-0.5 transition-all duration-200 shadow-lg shadow-[hsl(197,87%,43%)]/25 flex items-center gap-2"
            >
              Get Started — $499 Setup <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href="#how-it-works"
              className="px-8 py-4 rounded-xl font-semibold text-slate-300 glass-effect hover:text-white transition-all duration-200"
            >
              See How It Works
            </a>
            <a
              href="#demo"
              className="px-8 py-4 rounded-xl font-semibold text-[hsl(197,87%,43%)] border border-[hsl(197,87%,43%)]/40 hover:bg-[hsl(197,87%,43%)]/10 hover:-translate-y-0.5 transition-all duration-200 flex items-center gap-2"
            >
              Try a Live Demo
            </a>
          </div>

          <p className="text-slate-500 text-sm">No contract · $179/month · Live in 24–48 hours</p>
        </div>
      </section>

      {/* ── STATS STRIP ── */}
      <div className="border-y border-[hsl(215,27.9%,16.9%)] bg-[hsl(215,25%,27%)]/30">
        <div className="max-w-4xl mx-auto px-4 py-6 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {[["24/7", "Always On"], ["< 2 min", "Avg Response"], ["Zero", "Missed Leads"], ["48hr", "Go-Live Time"]].map(([val, label]) => (
            <div key={label}>
              <div className="text-2xl font-bold gradient-text">{val}</div>
              <div className="text-xs text-slate-500 uppercase tracking-wider mt-1">{label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── HOW IT WORKS ── */}
      <section id="how-it-works" className="py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-[hsl(197,87%,43%)] text-xs font-semibold uppercase tracking-widest mb-3">How It Works</p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
              Simple for you.<br />
              <span className="gradient-text">Seamless for your customers.</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {HOW_IT_WORKS.map((step) => (
              <div
                key={step.step}
                className="glass-effect rounded-2xl p-8 relative overflow-hidden group hover:border-[hsl(197,87%,43%)]/40 transition-colors duration-300"
              >
                <div className="absolute top-4 right-6 text-6xl font-bold text-[hsl(197,87%,43%)]/8 select-none group-hover:text-[hsl(197,87%,43%)]/12 transition-colors">
                  {step.step}
                </div>
                <div className="w-11 h-11 rounded-xl bg-[hsl(197,87%,43%)]/15 border border-[hsl(197,87%,43%)]/25 flex items-center justify-center text-[hsl(197,87%,43%)] mb-5">
                  {step.icon}
                </div>
                <h3 className="font-bold text-lg text-slate-100 mb-3">{step.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{step.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── LIVE DEMO ── */}
      <section id="demo" className="py-20 px-4">
        <div className="max-w-xl mx-auto">
          <div className="text-center mb-10">
            <p className="text-[hsl(197,87%,43%)] text-xs font-semibold uppercase tracking-widest mb-3">Try It Now</p>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
              Hear it <span className="gradient-text">for yourself</span>
            </h2>
          </div>
          <DemoWidget />
        </div>
      </section>

      {/* ── PRICING ── */}
      <section id="pricing" className="py-24 px-4">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-[hsl(197,87%,43%)] text-xs font-semibold uppercase tracking-widest mb-3">Pricing</p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
              Straightforward. <span className="gradient-text">No surprises.</span>
            </h2>
          </div>

          <div className="gradient-border">
            <div className="bg-[hsl(222,84%,15%)] rounded-[calc(1rem-2px)] overflow-hidden">
              {/* Pricing header */}
              <div className="bg-gradient-to-br from-[hsl(197,87%,43%)]/15 to-[hsl(217,91%,60%)]/5 p-8 border-b border-[hsl(215,27.9%,16.9%)]">
                <p className="text-[hsl(197,87%,43%)] text-xs font-semibold uppercase tracking-widest mb-4">AI Receptionist</p>
                <div className="flex items-end flex-wrap gap-2">
                  <span className="text-5xl font-bold text-slate-100">$499</span>
                  <span className="text-slate-400 text-sm mb-2">one-time setup</span>
                  <span className="text-slate-600 text-sm mb-2 mx-1">+</span>
                  <span className="text-4xl font-bold text-slate-100">$179</span>
                  <span className="text-slate-400 text-sm mb-2">/month</span>
                </div>
                <p className="text-slate-500 text-xs mt-3">No contract. Cancel anytime.</p>
              </div>

              {/* Features */}
              <div className="p-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                  {FEATURES.map((f) => (
                    <div key={f} className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-[hsl(197,87%,43%)]/15 border border-[hsl(197,87%,43%)]/25 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <CheckCircle className="w-3 h-3 text-[hsl(197,87%,43%)]" />
                      </div>
                      <span className="text-slate-300 text-sm leading-snug">{f}</span>
                    </div>
                  ))}
                </div>
                <a
                  href="#get-started"
                  className="block w-full py-4 rounded-xl text-center font-semibold text-white bg-gradient-to-r from-[hsl(197,87%,43%)] to-[hsl(217,91%,60%)] hover:opacity-90 hover:-translate-y-0.5 transition-all duration-200 shadow-lg shadow-[hsl(197,87%,43%)]/25"
                >
                  Get Started Today
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="py-24 px-4 bg-[hsl(215,25%,27%)]/20 border-y border-[hsl(215,27.9%,16.9%)]">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-[hsl(197,87%,43%)] text-xs font-semibold uppercase tracking-widest mb-3">FAQ</p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
              Common <span className="gradient-text">questions</span>
            </h2>
          </div>
          <div className="flex flex-col gap-3">
            {FAQS.map((item) => (
              <FAQItem key={item.q} {...item} />
            ))}
          </div>
        </div>
      </section>

      {/* ── LEAD FORM ── */}
      <section id="get-started" className="py-24 px-4">
        <div className="max-w-lg mx-auto">
          <div className="text-center mb-10">
            <p className="text-[hsl(197,87%,43%)] text-xs font-semibold uppercase tracking-widest mb-3">Get Started</p>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
              Ready to stop <span className="gradient-text">missing calls?</span>
            </h2>
            <p className="text-slate-400 text-sm leading-relaxed">
              Leave your details and we'll call you back to answer any questions — usually within the same day.
            </p>
          </div>

          <div className="glass-effect rounded-2xl p-8">
            <LeadForm />
          </div>

          <p className="text-center mt-5 text-sm text-slate-500">
            Already a client?{" "}
            <a href="https://intake.corvidai.io" className="text-[hsl(197,87%,43%)] hover:underline">
              Complete your setup form →
            </a>
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
}