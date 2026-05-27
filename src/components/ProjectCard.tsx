import { Project } from '../types';
import { motion } from 'motion/react';

interface ProjectCardProps {
  key?: any;
  project: Project;
  index: number;
  totalCount: number;
  onClick: () => void;
}

export default function ProjectCard({ project, index, totalCount, onClick }: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 35 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.6, delay: Math.min(index * 0.1, 0.4) }}
      onClick={onClick}
      className="group cursor-crosshair border-b border-black/10 hover:border-black/50 pb-8 flex flex-col justify-between h-full transition-all duration-300"
    >
      <div>
        {/* Index header */}
        <div className="flex justify-between items-start mb-4">
          <span className="font-mono text-[10px] text-black/50 group-hover:text-black duration-300">
            0{index + 1} / 0{totalCount}
          </span>
          <div className="flex gap-1.5 flex-wrap justify-end">
            {project.tags.map((tg) => (
              <span
                key={tg}
                className="text-[9px] font-mono border border-black/15 px-2 py-0.5 uppercase tracking-wider bg-black/[0.01] group-hover:border-black duration-200"
              >
                {tg}
              </span>
            ))}
          </div>
        </div>

        {/* Image preview — stays grayscale */}
        <div className="aspect-[16/10] overflow-hidden bg-black/5 mb-5 border border-black/10 relative">
          <img
            src={project.coverImage}
            alt={project.title}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover grayscale group-hover:scale-[1.03] transition-all duration-700"
          />
          <div className="absolute top-3 right-3 bg-white text-black font-mono text-[8px] uppercase tracking-widest px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none border border-black/10">
            Inspect →
          </div>
        </div>

        {/* Meta info */}
        <h3 className="text-2xl md:text-3xl font-display font-medium italic tracking-tight text-black mb-2 group-hover:not-italic transition-all duration-300">
          {project.title}
        </h3>
        <p className="font-mono text-[11px] leading-relaxed text-black/70 mb-5 max-w-sm">
          {project.description}
        </p>
      </div>

      <div className="flex justify-between items-center text-[10px] font-mono uppercase tracking-wider">
        <span className="text-black/45">{project.client || 'Independent'}</span>
        <span className="text-black/45">{project.year || '2025'}</span>
      </div>
    </motion.div>
  );
}
