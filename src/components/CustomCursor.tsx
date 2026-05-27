import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

export default function CustomCursor() {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isClicking, setIsClicking] = useState(false);

  // Position motion values
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Smooth springs for the outer trailing circle (lag effect)
  const springConfig = { stiffness: 220, damping: 24, mass: 0.6 };
  const outerX = useSpring(mouseX, springConfig);
  const outerY = useSpring(mouseY, springConfig);

  useEffect(() => {
    // Detect touch screens / mobile devices to disable custom cursor
    const isTouchDevice = window.matchMedia("(pointer: coarse)").matches;
    if (isTouchDevice) {
      return;
    }

    // Set custom-cursor-active class to hide default OS cursor
    document.body.classList.add("custom-cursor-active");

    const moveCursor = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    // Event delegation to check if mouse is over interactive components
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target) return;

      const isInteractive =
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        target.tagName === "INPUT" ||
        target.tagName === "TEXTAREA" ||
        target.closest("a") ||
        target.closest("button") ||
        target.closest("[role='button']") ||
        target.classList.contains("cursor-pointer") ||
        window.getComputedStyle(target).cursor === "pointer";

      if (isInteractive) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    window.addEventListener("mousemove", moveCursor);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      document.body.classList.remove("custom-cursor-active");
      window.removeEventListener("mousemove", moveCursor);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, [mouseX, mouseY, isVisible]);

  if (!isVisible) return null;

  return (
    <>
      {/* Outer Spring Ring */}
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 rounded-full pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2"
        style={{
          x: outerX,
          y: outerY,
          borderColor: "var(--text-color)",
          borderStyle: "solid",
        }}
        animate={{
          scale: isClicking ? 0.8 : isHovered ? 1.6 : 1,
          backgroundColor: isHovered ? "rgba(128, 128, 128, 0.08)" : "rgba(0, 0, 0, 0)",
          borderWidth: isHovered ? "2px" : "1px",
        }}
        transition={{ duration: 0.15, ease: "easeOut" }}
      />

      {/* Inner Pinpoint Dot (Locked to exact mouse cursor) */}
      <motion.div
        className="fixed top-0 left-0 w-1.5 h-1.5 rounded-full pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2"
        style={{
          x: mouseX,
          y: mouseY,
          backgroundColor: "var(--text-color)",
        }}
        animate={{
          scale: isHovered ? 0 : 1,
        }}
        transition={{ duration: 0.1 }}
      />
    </>
  );
}
