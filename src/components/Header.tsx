import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ServerStatus } from "../types";
import { Database, Plus, RefreshCw, Layers } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface HeaderProps {
  onAddProjectClick: () => void;
  status: ServerStatus | null;
  onRefreshStatus: () => void;
  projectsCount: number;
  isAdmin: boolean;
}

export default function Header({
  onAddProjectClick,
  status,
  onRefreshStatus,
  projectsCount,
  isAdmin
}: HeaderProps) {
  const [currentTime, setCurrentTime] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(now.toISOString().replace("T", " ").substring(0, 19) + " UTC");
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  // Close menu on route change
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => { document.body.style.overflow = "unset"; };
  }, [isMenuOpen]);

  const navLinks = [
    { label: "Home", path: "/" },
    { label: "Projects", path: "/projects" },
    { label: "About", path: "/about" },
    { label: "Skills", path: "/skills" },
    { label: "Contact", path: "/contact" },
    { label: isAdmin ? "Admin: Active" : "Admin Mode", path: "/admin" }
  ];

  const handleNavClick = (path: string) => {
    navigate(path);
    setIsMenuOpen(false);
  };

  return (
    <>
      <header className="fixed top-0 left-0 w-full bg-white/95 backdrop-blur-md border-b border-black/10 z-50 px-6 py-4 md:px-12">
        <div className="flex items-center justify-between">
          {/* Brand Identity */}
          <div className="flex items-baseline gap-6">
            <button onClick={() => handleNavClick("/")} className="group select-none text-left cursor-pointer">
              <span className="font-display font-bold text-xl uppercase tracking-wider group-hover:italic transition-all duration-300 block">
                Romel Ligligon
              </span>
              <span className="font-mono text-[9px] block text-black/50 tracking-widest uppercase">
                Technical Solutions Marketer // AI Specialist
              </span>
            </button>

            {/* Projects inventory count */}
            <div className="hidden sm:flex items-center gap-1.5 font-mono text-[10px] uppercase bg-black hover:bg-black/80 text-white px-2.5 py-1 tracking-widest duration-150">
              <Layers className="w-3 h-3" />
              <span>Works: {projectsCount}</span>
            </div>
          </div>

          {/* Desktop: System Diagnostics */}
          <div className="hidden lg:flex items-center gap-x-6 text-[10px] font-mono uppercase tracking-wider text-black/60">
            {isAdmin && (
              <div className="flex items-center gap-1.5 border-r border-black/15 pr-5 text-black font-bold animate-pulse">
                <span className="w-1.5 h-1.5 rounded-full bg-black"></span>
                <span>Admin Mode</span>
              </div>
            )}

            <div className="text-black/50">
              <span>Clock: {currentTime}</span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-3">
            {navLinks.map((link) => (
              <button
                key={link.path}
                onClick={() => handleNavClick(link.path)}
                className={`font-mono text-[10px] uppercase tracking-wider px-2 py-1 transition-all duration-200 cursor-pointer ${
                  location.pathname === link.path
                    ? "bg-black text-white"
                    : "hover:underline hover:text-black/75"
                }`}
              >
                {link.label}
              </button>
            ))}

            {isAdmin && (
              <button
                onClick={onAddProjectClick}
                className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-widest border border-black hover:bg-black hover:text-white px-3 py-1.5 rounded-none duration-300 active:scale-95 cursor-pointer ml-2"
                id="btn-trigger-add-project"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Work</span>
              </button>
            )}
          </div>

          {/* Mobile Hamburger Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden flex flex-col justify-center items-center w-8 h-8 gap-1.5 cursor-pointer z-[60]"
            aria-label="Toggle navigation menu"
          >
            <motion.span
              animate={isMenuOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.3, ease: [0.76, 0, 0.24, 1] }}
              className="block w-6 h-px bg-black origin-center"
            />
            <motion.span
              animate={isMenuOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
              transition={{ duration: 0.2 }}
              className="block w-6 h-px bg-black"
            />
            <motion.span
              animate={isMenuOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.3, ease: [0.76, 0, 0.24, 1] }}
              className="block w-6 h-px bg-black origin-center"
            />
          </button>
        </div>
      </header>

      {/* Mobile Full-Screen Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-white z-[55] flex flex-col justify-center items-center gap-2 md:hidden"
          >
            {navLinks.map((link, i) => (
              <motion.button
                key={link.path}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ delay: i * 0.05, duration: 0.3 }}
                onClick={() => handleNavClick(link.path)}
                className={`font-display text-4xl uppercase tracking-tight cursor-pointer transition-all duration-200 py-2 ${
                  location.pathname === link.path
                    ? "font-bold"
                    : "font-light text-black/60 hover:text-black"
                }`}
              >
                {link.label}
              </motion.button>
            ))}

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="mt-8 flex flex-col items-center gap-4"
            >
              {isAdmin && (
                <button
                  onClick={() => { onAddProjectClick(); setIsMenuOpen(false); }}
                  className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-widest border border-black hover:bg-black hover:text-white px-4 py-2 cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Work</span>
                </button>
              )}

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
