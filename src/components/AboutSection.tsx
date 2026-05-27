import { motion } from 'motion/react';
import { Clock } from 'lucide-react';

export default function AboutSection() {
  return (
    <section className="py-24 px-6 md:px-12 lg:px-24 max-w-7xl mx-auto select-none">
      {/* Abstract Geometric Visual Element */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="mb-16 flex justify-center"
      >
        <svg width="200" height="200" viewBox="0 0 200 200" className="text-black">
          <motion.line
            x1="0" y1="100" x2="200" y2="100"
            stroke="currentColor" strokeWidth="1"
            initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }}
            viewport={{ once: true }} transition={{ duration: 1.2, delay: 0.2 }}
          />
          <motion.line
            x1="100" y1="0" x2="100" y2="200"
            stroke="currentColor" strokeWidth="1"
            initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }}
            viewport={{ once: true }} transition={{ duration: 1.2, delay: 0.4 }}
          />
          <motion.circle
            cx="100" cy="100" r="60"
            stroke="currentColor" strokeWidth="1" fill="none"
            initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }}
            viewport={{ once: true }} transition={{ duration: 1.5, delay: 0.6 }}
          />
          <motion.circle
            cx="100" cy="100" r="90"
            stroke="currentColor" strokeWidth="0.5" fill="none"
            initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }}
            viewport={{ once: true }} transition={{ duration: 1.5, delay: 0.8 }}
          />
          <motion.rect
            x="40" y="40" width="120" height="120"
            stroke="currentColor" strokeWidth="0.5" fill="none"
            initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }}
            viewport={{ once: true }} transition={{ duration: 1.2, delay: 1 }}
          />
        </svg>
      </motion.div>

      {/* Biography Content */}
      <div className="bg-black text-white p-6 md:p-12 lg:p-16 relative overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start relative z-10">

          {/* Biography header */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-4 flex flex-col gap-6"
          >
            <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-white/55">
              EXECUTIVE DOSSIER // ROMEL LIGLIGON
            </span>
            <h2 className="text-4xl md:text-5xl font-display uppercase font-bold text-white leading-none tracking-tight">
              About Romel
            </h2>
            <p className="font-mono text-xs text-white/70 leading-relaxed normal-case">
              Aspiring AI Implementation Specialist with a strong background in Computer Literacy and Prompt Design. Expert at leveraging Generative AI tools to streamline workflows and solve complex technical challenges. A dedicated student available for full-time work, offering a unique blend of academic insight and a proactive, growth-oriented mindset.
            </p>

            <div className="border border-white/10 p-4 font-mono text-[11px] flex flex-col gap-2">
              <span className="text-white/40 block pb-1 border-b border-white/10 uppercase tracking-widest text-[9px]">INTERESTS</span>
              <div className="flex gap-4">
                <span>MUSIC HANDS-ON</span>
                <span>COMPETITIVE GAMING</span>
              </div>
            </div>
          </motion.div>

          {/* Structured curriculum */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-12 font-mono text-xs uppercase tracking-wider text-white/85 leading-relaxed"
          >
            {/* 01 // Education */}
            <div className="flex flex-col gap-4 border-b border-white/10 pb-6 md:border-b-0 md:pb-0">
              <span className="text-white border-b border-white/20 pb-2 flex justify-between">
                <span>01 // EDUCATION</span>
                <span className="text-white/50 text-[10px]">2022 — 2026</span>
              </span>
              <div className="flex flex-col gap-2 pt-2">
                <span className="text-white font-bold text-sm tracking-normal">BACHELOR OF INFORMATION TECHNOLOGY</span>
                <p className="text-[11px] text-white/70 normal-case leading-relaxed">
                  King's College of the Philippines (KCP)<br />
                  Pico La Trinidad, Benguet
                </p>
              </div>
            </div>

            {/* 02 // Personal Skills */}
            <div className="flex flex-col gap-4">
              <span className="text-white border-b border-white/20 pb-2">02 // PERSONAL SKILLS</span>
              <div className="grid grid-cols-2 gap-x-4 gap-y-2 pt-2 text-[10px] text-white/75">
                {['GEN AI PROFICIENCY', 'PROMPT DESIGN', 'IT INTELLECT', 'DIGITAL MARKETING', 'HARDWARE LITERACY', 'PROBLEM-SOLVING'].map((skill) => (
                  <div key={skill} className="flex items-center gap-1.5 border border-white/10 px-2 py-1.5 bg-white/[0.02]">
                    <span className="w-1 h-1 rounded-full bg-white/40"></span>
                    <span>{skill}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* 03 // Training */}
            <div className="flex flex-col gap-4 border-t border-white/10 pt-6">
              <span className="text-white border-b border-white/20 pb-2">03 // TRAINING & SPECIALIZATION</span>
              <div className="flex flex-col gap-4 pt-2">
                <div className="flex justify-between items-start gap-2">
                  <div>
                    <span className="text-white font-bold block text-[11px] tracking-normal">TRAC LEADERSHIP TRAINING</span>
                    <span className="text-[10px] text-white/50 block">ORGANIZER: TRAC</span>
                  </div>
                  <span className="text-white/60 text-[10px] shrink-0">YR: 2024</span>
                </div>
                <div className="flex justify-between items-start gap-2 border-t border-white/5 pt-3">
                  <div>
                    <span className="text-white font-bold block text-[11px] tracking-normal">CYBER SECURITY AWARENESS</span>
                    <span className="text-[10px] text-white/50 block">ORGANIZER: DICT-CAR</span>
                  </div>
                  <span className="text-white/60 text-[10px] shrink-0">YR: 2024</span>
                </div>
              </div>
            </div>

            {/* 04 // References */}
            <div className="flex flex-col gap-4 border-t border-white/10 pt-6">
              <span className="text-white border-b border-white/20 pb-2">04 // ACADEMIC REFERENCE MATRIX</span>
              <div className="flex flex-col gap-4 pt-2 text-[10px] tracking-normal">
                <div className="flex flex-col gap-1 leading-normal border-b border-white/5 pb-2">
                  <span className="text-white font-bold text-[11px]">LIBBY TEOFILO</span>
                  <span className="text-white/60 italic font-mono text-[9px] uppercase tracking-wider block">KCP IT INSTRUCTOR</span>
                  <span className="text-white/70 block font-mono text-[9px]">TEL: 09506567677 // libbyteofilo@gmail.com</span>
                </div>
                <div className="flex flex-col gap-1 leading-normal">
                  <span className="text-white font-bold text-[11px]">GINARD GUAKI</span>
                  <span className="text-white/60 italic font-mono text-[9px] uppercase tracking-wider block">KCP IT DEAN</span>
                  <span className="text-white/70 block font-mono text-[9px]">TEL: 09177909928 // ginard.guaki@kcp.edu.ph</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        <div className="mt-16 border-t border-white/10 pt-10 flex flex-col sm:flex-row justify-between gap-6 text-[10px] font-mono uppercase tracking-widest text-white/50">
          <div className="flex items-center gap-2">
            <Clock className="w-3.5 h-3.5" />
            <span>STABILITY CERTIFIED ©2026 // EST. 1:1 RATIO</span>
          </div>
          <span>[ R.L. SOLUTIONS ARCHITECT ]</span>
        </div>
      </div>
    </section>
  );
}
