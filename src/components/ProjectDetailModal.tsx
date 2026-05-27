import { useEffect } from "react";
import { Project } from "../types";
import { X, Calendar, User, Eye, ArrowLeft, ArrowRight, Trash2, Heart } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface ProjectDetailModalProps {
  project: Project | null;
  onClose: () => void;
  onNextProject: () => void;
  onPrevProject: () => void;
  onDeleteProject: (id: number) => void;
  isDeleting: boolean;
  isAdmin: boolean;
}

export default function ProjectDetailModal({
  project,
  onClose,
  onNextProject,
  onPrevProject,
  onDeleteProject,
  isDeleting,
  isAdmin
}: ProjectDetailModalProps) {
  useEffect(() => {
    // Disable main body scroll when modal is active
    if (project) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [project]);

  if (!project) return null;

  return (
    <AnimatePresence>
      <div 
        className="fixed inset-0 bg-white/95 backdrop-blur-md z-[100] overflow-y-auto"
        id={`project-modal-${project.id}`}
      >
        <div className="min-h-screen flex flex-col justify-between p-6 md:p-16 lg:p-24">
          
          {/* Top Control Bar */}
          <div className="flex items-center justify-between border-b border-black/10 pb-6 mb-12">
            <div className="flex gap-4">
              <button
                onClick={onPrevProject}
                className="flex items-center gap-1 font-mono text-[10px] uppercase tracking-wider hover:opacity-60 duration-150 cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Prev Work</span>
              </button>
              <button
                onClick={onNextProject}
                className="flex items-center gap-1 font-mono text-[10px] uppercase tracking-wider hover:opacity-60 duration-150 cursor-pointer"
              >
                <span>Next Work</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="flex items-center gap-6">
              {isAdmin && (
                <button
                  onClick={() => {
                    if (confirm(`Are you sure you want to delete this project ("${project.title}")?`)) {
                      onDeleteProject(project.id);
                    }
                  }}
                  disabled={isDeleting}
                  className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-wider text-black/60 hover:bg-black/5 px-2 py-1 duration-150 disabled:opacity-50 cursor-pointer border border-transparent hover:border-black/20"
                  title="Delete this project from live system (Supabase / Local JSON)"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>{isDeleting ? "Deleting..." : "Delete Work"}</span>
                </button>
              )}

              <button
                onClick={onClose}
                className="flex items-center gap-1.5 font-mono text-xs uppercase tracking-widest border border-black px-4 py-2 hover:bg-black hover:text-white transition-all cursor-pointer"
                id="btn-close-project-modal"
              >
                <X className="w-3.5 h-3.5" />
                <span>Close</span>
              </button>
            </div>
          </div>

          {/* Core Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start mb-16">
            
            {/* Left Metadata Panel (5/12 columns) */}
            <div className="lg:col-span-5 flex flex-col gap-8">
              <div>
                <span className="font-mono text-xs uppercase text-black/45 tracking-widest block mb-1">
                  Selected Work / Series 0{project.id}
                </span>
                <h2 className="text-5xl md:text-6xl font-display font-medium tracking-tight text-black uppercase mb-4 leading-none">
                  {project.title}
                </h2>
                
                <div className="flex flex-wrap gap-2 mt-4">
                  {project.tags.map((tag) => (
                    <span 
                      key={tag} 
                      className="font-mono text-[9px] border border-black px-2.5 py-0.5 uppercase tracking-wider"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Structural Divider */}
              <div className="h-px bg-black" />

              {/* Statistical Metadata Table */}
              <div className="grid grid-cols-2 gap-y-4 gap-x-6 text-xs font-mono uppercase tracking-wider">
                <div className="border-b border-black/5 pb-2">
                  <span className="text-[10px] text-black/45 block mb-0.5">Year of production</span>
                  <div className="flex items-center gap-1.5 text-black font-semibold">
                    <Calendar className="w-3.5 h-3.5 opacity-60" />
                    <span>{project.year || "2025"}</span>
                  </div>
                </div>

                <div className="border-b border-black/5 pb-2">
                  <span className="text-[10px] text-black/45 block mb-0.5">Primary client</span>
                  <div className="flex items-center gap-1.5 text-black font-semibold">
                    <User className="w-3.5 h-3.5 opacity-60" />
                    <span>{project.client || "Independent Study"}</span>
                  </div>
                </div>

                <div className="col-span-2 border-b border-black/5 pb-2">
                  <span className="text-[10px] text-black/45 block mb-0.5">Credits / Collaborators</span>
                  <p className="text-black/80 normal-case text-[11px] leading-relaxed font-mono">
                    {project.credits || "Design & Code: Romel Ligligon"}
                  </p>
                </div>
              </div>

              {/* Description Blocks */}
              <div className="mt-2 text-sm text-black/85 leading-relaxed font-mono flex flex-col gap-4">
                <p className="border-l-2 border-black pl-4 py-1.5 italic text-black font-mono">
                  {project.description}
                </p>
                <p className="text-[13px] text-black/75">
                  {project.longDescription}
                </p>
              </div>

              {/* View Demo or Outbound Links */}
              <div className="mt-4">
                <a
                  href={project.link || "#"}
                  target="_blank"
                  referrerPolicy="no-referrer"
                  className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest bg-black text-white hover:bg-black/90 p-3 px-6 transition-all duration-300"
                >
                  <Eye className="w-4 h-4" />
                  <span>Interactive Launch</span>
                </a>
              </div>
            </div>

            {/* Right Large Image Container (7/12 columns) */}
            <div className="lg:col-span-7 flex flex-col gap-6">
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="relative overflow-hidden bg-black/5 group border border-black/10"
              >
                <img
                  src={project.coverImage}
                  alt={project.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-auto object-cover max-h-[500px] grayscale hover:grayscale-0 transition-all duration-700"
                />
              </motion.div>
              
              {/* Artistic caption / specifications overlay in margin */}
              <div className="flex justify-between items-center text-[9px] font-mono uppercase tracking-widest text-black/40">
                <span>[ PLATE NO. 0{project.id} // RESOLUTION ADAPTIVE ]</span>
                <span>AUTHENTIC B&W SELECTION</span>
              </div>
            </div>

          </div>

          {/* Sticky Bottom Navigation Info */}
          <div className="border-t border-black/10 pt-6 mt-auto flex flex-col sm:flex-row justify-between items-center gap-4 text-[10px] font-mono uppercase text-black/50 tracking-widest">
            <span>Romel Ligligon Portfolio ©2026</span>
            <div className="flex items-center gap-1 bg-black text-white px-3 py-1 text-[9px]">
              <Heart className="w-3 h-3 text-white fill-white animate-pulse" />
              <span>Rest API Sync active</span>
            </div>
            <span>[ ESC ] Close work</span>
          </div>

        </div>
      </div>
    </AnimatePresence>
  );
}
