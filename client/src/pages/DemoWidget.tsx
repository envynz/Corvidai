import { useState } from "react";

export default function DemoWidget() {
  const [phone, setPhone] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [error, setError] = useState('');

  const isValidNZMobile = (digits: string) => /^[2][0-9]{7,9}$/.test(digits);

  const handleSubmit = async () => {
    const digits = phone.replace(/\D/g, '');
    setError('');

    if (!isValidNZMobile(digits)) {
      setError('Please enter a valid NZ mobile (e.g. 21 555 1234).');
      return;
    }

    setStatus('loading');

    try {
      const response = await fetch('https://n8n.corvidai.io/webhook/demo-receptionist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone: '+64' + digits }),
      });
      const data = await response.json();

      if (response.ok && data.success) {
        setStatus('success');
      } else {
        throw new Error(data.message || 'Something went wrong.');
      }
    } catch {
      setStatus('error');
      setError('Something went wrong — please try again in a moment.');
    }
  };

  if (status === 'success') {
    return (
      <div className="gradient-border rounded-2xl p-10 text-center">
        <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[hsl(197,87%,43%)] to-[hsl(217,91%,60%)] flex items-center justify-center mx-auto mb-4 text-2xl">
          📱
        </div>
        <h3 className="text-xl font-bold text-white mb-2">Check your phone!</h3>
        <p className="text-white/50 text-sm leading-relaxed">
          Zara is texting <span className="text-[hsl(197,87%,43%)] font-medium">+64 {phone}</span> right now.
          Reply to continue the demo conversation.
        </p>
      </div>
    );
  }

  return (
    <div className="gradient-border rounded-2xl p-10">
      <div className="flex items-center gap-2 mb-4">
        <span className="w-2 h-2 rounded-full bg-[hsl(197,87%,43%)] animate-pulse" />
        <span className="text-xs font-bold tracking-widest uppercase text-[hsl(197,87%,43%)]">Live Demo</span>
      </div>

      <h2 className="text-2xl font-extrabold text-white mb-2">
        See it <span className="gradient-text">in action</span>
      </h2>
      <p className="text-white/50 text-sm leading-relaxed mb-6">
        Enter your NZ mobile and Zara will text you within 60 seconds — exactly as your customers would experience it.
      </p>

      <div className="bg-white/5 border border-white/10 rounded-xl p-4 mb-6 flex items-start gap-3">
        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[hsl(197,87%,43%)] to-[hsl(217,91%,60%)] flex items-center justify-center text-white font-bold text-xs flex-shrink-0">
          Z
        </div>
        <div>
          <p className="text-white/30 text-xs mb-1 font-medium tracking-wide">8233 · Zara</p>
          <p className="text-white/80 text-sm leading-relaxed bg-[hsl(197,87%,43%)]/10 border border-[hsl(197,87%,43%)]/20 rounded-tr-xl rounded-b-xl px-3 py-2">
            Hey! Sorry Mike just missed your call — he's on a job. I'm Zara, his digital receptionist. What's your name and what plumbing work do you need done?
          </p>
        </div>
      </div>

      <div className="flex gap-2 mb-3">
        <div className="flex flex-1 border border-white/10 rounded-xl overflow-hidden bg-white/5 focus-within:border-[hsl(197,87%,43%)] focus-within:bg-[hsl(197,87%,43%)]/5 transition-all">
          <div className="flex items-center px-3 text-white/40 text-sm font-medium border-r border-white/10 bg-white/5 select-none">
            +64
          </div>
          <input
            type="tel"
            inputMode="numeric"
            placeholder="21 XXX XXXX"
            value={phone}
            onChange={e => setPhone(e.target.value.replace(/[^0-9]/g, ''))}
            onKeyDown={e => e.key === 'Enter' && handleSubmit()}
            maxLength={11}
            className="flex-1 bg-transparent px-3 py-3.5 text-white text-sm outline-none placeholder-white/20"
          />
        </div>
        <button
          onClick={handleSubmit}
          disabled={status === 'loading'}
          className="bg-gradient-to-r from-[hsl(197,87%,43%)] to-[hsl(217,91%,60%)] text-white font-bold text-sm px-5 py-3.5 rounded-xl disabled:opacity-50 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-[hsl(197,87%,43%)]/30 transition-all"
        >
          {status === 'loading' ? '...' : 'Try it'}
        </button>
      </div>

      {error && <p className="text-red-400 text-xs text-center mb-2">{error}</p>}

      <p className="text-white/20 text-xs text-center leading-relaxed">
        By entering your number you'll receive a demo SMS from Corvid AI (shortcode 8233). NZ mobile numbers only. One demo per number per 24 hours.
      </p>
    </div>
  );
}
