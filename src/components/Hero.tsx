import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { Image as ImageIcon } from 'lucide-react';

export default function Hero() {
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState(false);
  
  // Custom persisted portrait state
  const [heroImage, setHeroImage] = useState(() => {
    return localStorage.getItem("hero_portrait") || "/romel.jpg";
  });

  useEffect(() => {
    // Authenticate locally inside landing view
    setIsAdmin(localStorage.getItem("admin_token") === "romel-ligligon-authorized-token");
  }, []);

  const handleImageUpdate = () => {
    const url = prompt("PASTE SPECIALIST PORTRAIT COORDINATES [ URL ]:", heroImage);
    if (url !== null && url.trim() !== "") {
      localStorage.setItem("hero_portrait", url.trim());
      setHeroImage(url.trim());
    }
  };

  return (
    <section className="min-h-screen flex flex-col justify-center relative overflow-hidden px-6 md:px-12 lg:px-24 max-w-7xl mx-auto select-none pt-28 lg:pt-0">
      
      {/* Foreground Content */}
      <div className="relative z-10 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
        
        {/* Left Column: Title, Subtitle, CTAs (7/12 layout) */}
        <div className="lg:col-span-7 flex flex-col justify-center">
          {/* Animated Editorial Ruler */}
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: '100%' }}
            transition={{ duration: 1.6, ease: 'circOut' }}
            className="h-px bg-black mb-10"
          />

          <div className="flex flex-col">
            <motion.h1
              initial={{ y: 80, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 1, ease: 'easeOut' }}
              className="text-[9vw] sm:text-[7vw] lg:text-[85px] xl:text-[95px] font-display font-bold leading-[0.95] uppercase tracking-[-3px] lg:-ml-2 text-black"
            >
              Romel Ligligon
            </motion.h1>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1, duration: 0.8 }}
            className="mt-6 flex flex-col sm:flex-row sm:items-start justify-between gap-6 border-b border-black pb-12 mb-12"
          >
            <p className="font-mono text-lg uppercase tracking-[0.2em] font-bold text-black shrink-0">
              Technical Solutions Marketer
            </p>
            <p className="max-w-xs font-mono text-[12px] leading-relaxed text-black/80 sm:text-right">
              Aspiring AI Implementation Specialist leveraging custom prompt designs and solid IT skills to refine digital marketing and technical systems natively.
            </p>
          </motion.div>

          {/* Navigation CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.6, duration: 0.6 }}
            className="flex flex-wrap gap-4"
          >
            <button
              onClick={() => navigate('/projects')}
              className="font-mono text-[11px] uppercase tracking-widest border border-black px-6 py-3 hover:bg-black hover:text-white transition-all duration-300 cursor-pointer"
            >
              View Selected Works →
            </button>
            <button
              onClick={() => navigate('/about')}
              className="font-mono text-[11px] uppercase tracking-widest px-6 py-3 text-black/60 hover:text-black transition-all duration-300 cursor-pointer"
            >
              About the Specialist
            </button>
          </motion.div>
        </div>

        {/* Right Column: Premium Grayscale Asymmetrical Portrait Frame (5/12 layout) */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 1 }}
          className="lg:col-span-5 flex flex-col items-center lg:items-end justify-center w-full"
        >
          <div className="relative group w-full max-w-[340px] aspect-[3/4] border border-black bg-black/[0.02] overflow-hidden select-none">
            
            {/* Grayscale Portrait Image */}
            <img 
              src={heroImage} 
              alt="Romel Ligligon Specialist Portrait" 
              className="w-full h-full object-cover grayscale transition-all duration-700 group-hover:scale-[1.02]"
              onError={(e) => {
                // Graceful error fallback image
                e.currentTarget.src = "/romel.jpg";
              }}
            />

            {/* Administrative Update Overlay */}
            {isAdmin ? (
              <button 
                onClick={handleImageUpdate}
                className="absolute inset-0 bg-black/80 backdrop-blur-sm opacity-0 group-hover:opacity-100 flex flex-col justify-center items-center gap-2 transition-all duration-300 text-white font-mono text-[10px] uppercase tracking-widest cursor-pointer"
              >
                <div className="p-2 border border-white/20 rounded-none bg-white/5">
                  <ImageIcon className="w-5 h-5 text-white" />
                </div>
                <span>Update Portrait [ URL ]</span>
              </button>
            ) : (
              /* Visitor view caption overlay */
              <div className="absolute bottom-3 left-3 bg-white text-black border border-black/10 font-mono text-[8px] uppercase tracking-widest px-2 py-1 select-none pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                Romel Ligligon // Specialist
              </div>
            )}
          </div>

          <div className="w-full max-w-[340px] mt-3 flex justify-between items-center text-[9px] font-mono uppercase tracking-widest text-black/45">
            <span>[ SPECIALIST PROFILE ]</span>
            <span>PLATE 00 // AUTODETECT ACTIVE</span>
          </div>
        </motion.div>
        
      </div>

      {/* Decorative background text */}
      <div className="absolute right-0 bottom-0 pointer-events-none opacity-[0.02] text-[16rem] font-display font-bold select-none leading-none -mb-32 z-0">
        AI.TECH
      </div>
    </section>
  );
}
