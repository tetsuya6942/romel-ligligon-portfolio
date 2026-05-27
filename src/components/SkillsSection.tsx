import { motion } from 'motion/react';
import { Code, Cpu, Database, Globe, Lock, Palette, Server, Terminal, Wrench, Zap } from 'lucide-react';

const skills = [
  { name: 'Generative AI', desc: 'Prompt Architecture & Multi-Agent Systems', icon: Zap },
  { name: 'React / TypeScript', desc: 'Modern Component-Driven Interfaces', icon: Code },
  { name: 'Tailwind CSS', desc: 'Utility-First Responsive Styling', icon: Palette },
  { name: 'Node.js / Express', desc: 'RESTful API Backend Services', icon: Server },
  { name: 'Supabase / PostgreSQL', desc: 'Cloud Database & Auth Layer', icon: Database },
  { name: 'Adobe Creative Suite', desc: 'Publication Design & Media Production', icon: Globe },
  { name: 'IT Hardware & Networking', desc: 'System Provisioning & Diagnostics', icon: Cpu },
  { name: 'Digital Marketing', desc: 'Campaign Strategy & Analytics', icon: Terminal },
  { name: 'Cybersecurity', desc: 'Vulnerability Assessment & Compliance', icon: Lock },
  { name: 'Git & Version Control', desc: 'Collaborative Code Management', icon: Wrench },
];

export default function SkillsSection() {
  return (
    <section className="py-24 px-6 md:px-12 lg:px-24 max-w-7xl mx-auto select-none">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.6 }}
        className="mb-16"
      >
        <span className="font-mono text-[10px] uppercase tracking-widest text-black/55 mb-2 block">
          TECHNICAL ARSENAL
        </span>
        <h2 className="text-4xl md:text-5xl font-display uppercase font-medium leading-none text-black">
          Skills & Stack
        </h2>
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: '100%' }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.3 }}
          className="h-px bg-black mt-6"
        />
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
        {skills.map((skill, i) => {
          const Icon = skill.icon;
          return (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.4, delay: Math.min(i * 0.06, 0.5) }}
              className="group border border-black/10 hover:border-black p-5 flex flex-col gap-3 transition-all duration-300 hover:bg-black hover:text-white cursor-default"
            >
              <div className="flex items-center justify-between">
                <Icon className="w-5 h-5 text-black/40 group-hover:text-white/80 transition-colors duration-300" />
                <span className="font-mono text-[9px] text-black/30 group-hover:text-white/50 uppercase">
                  0{i + 1}
                </span>
              </div>
              <h3 className="font-display text-sm font-medium uppercase tracking-wide">
                {skill.name}
              </h3>
              <p className="font-mono text-[9px] leading-relaxed text-black/55 group-hover:text-white/70 transition-colors duration-300">
                {skill.desc}
              </p>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
