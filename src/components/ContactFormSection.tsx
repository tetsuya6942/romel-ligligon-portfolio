import React, { useState } from "react";
import { Send, CheckCircle2, AlertCircle, ArrowUpRight, Award, Mail, Sparkles } from "lucide-react";

export default function ContactFormSection() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) {
      setStatus({ type: "error", text: "Please supply all narrative fields." });
      return;
    }

    setLoading(true);
    setStatus(null);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message })
      });

      const data = await response.json();
      setLoading(false);

      if (response.ok) {
        setStatus({
          type: "success",
          text: data.warning 
            ? `Transmission registered! (Local Fallback: ${data.warning})`
            : "Brief successfully submitted directly to PostgreSQL database client!"
        });
        setName("");
        setEmail("");
        setMessage("");
      } else {
        setStatus({ type: "error", text: data.error || "Failed to deliver submission." });
      }
    } catch (err: any) {
      setLoading(false);
      setStatus({ type: "error", text: "Fatal error delivering submission brief to Express API endpoint." });
    }
  };

  return (
    <section id="contact-section" className="py-24 border-t border-black bg-white select-none">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
        
        {/* Left column (5/12) */}
        <div className="lg:col-span-5 flex flex-col justify-between gap-12">
          <div>
            <span className="font-mono text-[10px] uppercase tracking-widest text-black/55 mb-2 block">
              COLLABORATION BRIEF
            </span>
            <h2 className="text-5xl md:text-6xl font-display font-medium tracking-tight uppercase leading-none text-black">
              Inquire
            </h2>
            <p className="mt-6 font-mono text-sm leading-relaxed text-black/75">
              Seeking collaborative inquiries in AI integration, digital marketing, or technical systems support. Send a direct transmission to initiate a briefing.
            </p>
          </div>

          {/* Contact coordinates & metadata */}
          <div className="flex flex-col gap-6 font-mono text-xs uppercase tracking-wider text-black">
            <div>
              <span className="text-[9px] text-black/50 block mb-1">EMAIL CHANNELS</span>
              <a 
                href="mailto:tetsuyaromel@gmail.com" 
                className="flex items-center gap-1.5 font-semibold underline underline-offset-4 hover:bg-black hover:text-white transition-all p-1 w-fit"
              >
                <span>tetsuyaromel@gmail.com</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>

            <div className="grid grid-cols-2 gap-4 border-t border-black/10 pt-6">
              <div>
                <span className="text-[9px] text-black/50 block mb-1">STUDIO LOCATION</span>
                <span className="font-semibold block">Benguet, Philippines</span>
              </div>
              <div>
                <span className="text-[9px] text-black/50 block mb-1">SOCIAL LINKS</span>
                <div className="font-semibold flex flex-col gap-1 text-[11px] normal-case">
                  <a href="https://instagram.com/romel.ski" target="_blank" rel="noreferrer" className="hover:underline">@romel.ski // Instagram</a>
                  <span className="text-black/60">Romel Ligligon // Facebook</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 bg-black/5 p-3 text-[9px] text-black/70 normal-case leading-relaxed">
              <Award className="w-4 h-4 text-black shrink-0" />
              <span>Available for generative AI prompting solutions, digital campaigns, website deployment, and IT systems staging.</span>
            </div>
          </div>
        </div>

        {/* Right column (7/12) */}
        <div className="lg:col-span-7 bg-black/[0.01] border border-black/10 p-6 md:p-12">
          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <h3 className="font-display font-medium text-lg uppercase tracking-wide text-black border-b border-black/15 pb-4">
              Transmission Details
            </h3>

            {status && (
              <div 
                className={`p-4 border font-mono text-xs uppercase tracking-wider flex items-start gap-2.5 ${
                  status.type === "success" 
                    ? "bg-black text-white border-black" 
                    : "bg-white text-black border-black"
                }`}
              >
                {status.type === "success" ? (
                  <CheckCircle2 className="w-5 h-5 text-white shrink-0" />
                ) : (
                  <AlertCircle className="w-5 h-5 text-black shrink-0" />
                )}
                <div className="flex-1">
                  <div className="font-bold mb-1">{status.type === "success" ? "Transmission Secured" : "Submission Failed"}</div>
                  <p className="text-[10px] normal-case leading-relaxed opacity-90">{status.text}</p>
                </div>
              </div>
            )}

            {/* Form Fields using strict editorial grid style */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block font-mono text-[9px] uppercase tracking-widest text-black/60 mb-1.5">
                  Sender Identity [ Name ] *
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Richard Neutra"
                  className="w-full bg-white border border-black/20 p-3 font-mono text-xs focus:border-black focus:outline-none transition-all"
                  required
                />
              </div>

              <div>
                <label className="block font-mono text-[9px] uppercase tracking-widest text-black/60 mb-1.5">
                  Sender Coordinate [ Email ] *
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="e.g. neutra@architecture.com"
                  className="w-full bg-white border border-black/20 p-3 font-mono text-xs focus:border-black focus:outline-none transition-all"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block font-mono text-[9px] uppercase tracking-widest text-black/60 mb-1.5">
                Creative Narrative Brief [ Message ] *
              </label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Narrate your creative, typographic or development parameters..."
                rows={4}
                className="w-full bg-white border border-black/20 p-3 font-mono text-xs focus:border-black focus:outline-none transition-all"
                required
              />
            </div>

            <div>
              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 font-mono text-[11px] uppercase tracking-widest bg-black text-white p-3.5 hover:bg-black/90 active:scale-98 transition-all duration-300 cursor-pointer disabled:opacity-50"
              >
                <Send className="w-4 h-4" />
                <span>{loading ? "TRANSMITTING BRIEF..." : "TRANSMIT BRIEF"}</span>
              </button>
            </div>
          </form>
        </div>

      </div>
    </section>
  );
}
