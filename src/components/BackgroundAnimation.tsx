import { motion } from 'motion/react';

export default function BackgroundAnimation() {
  return (
    <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden select-none opacity-[0.08]">
      {/* Fine Layout Grid */}
      <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
            <path d="M 60 0 L 0 0 0 60" fill="none" stroke="currentColor" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" className="text-black" />
      </svg>

      {/* Quietly Morphing Conic Curve 01 */}
      <motion.div
        animate={{
          x: [0, 40, -20, 0],
          y: [0, -30, 50, 0],
          scale: [1, 1.05, 0.95, 1],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-[10%] left-[20%] w-[450px] h-[450px] border border-black rounded-full"
      />

      {/* Quietly Morphing Conic Curve 02 */}
      <motion.div
        animate={{
          x: [0, -50, 30, 0],
          y: [0, 40, -40, 0],
          scale: [1, 0.95, 1.05, 1],
        }}
        transition={{
          duration: 35,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute bottom-[10%] right-[15%] w-[600px] h-[600px] border border-black rounded-full"
      />

      {/* Slow rotating vector axis alignment matrix */}
      <motion.div
        animate={{
          rotate: [0, 360],
        }}
        transition={{
          duration: 100,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute top-[40%] left-[45%] -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] border border-dashed border-black/40 rounded-full flex items-center justify-center"
      >
        <div className="w-full h-px bg-black" />
        <div className="h-full w-px bg-black absolute top-0 left-1/2 -translate-x-1/2" />
      </motion.div>
    </div>
  );
}
