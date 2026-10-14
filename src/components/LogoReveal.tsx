import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * LogoReveal – Architectural Blueprint Animation
 *
 * Timeline (~4 seconds total):
 *   0.0s – Blueprint grid lines draw in from edges
 *   0.5s – Geometric shapes (rectangles, triangles) construct themselves
 *   1.5s – Crosshair / measurement lines appear
 *   2.5s – Everything fades out while logo fades in
 *   3.5s – Logo fully settled, blueprint gone
 *   4.0s – onComplete callback
 */

interface LogoRevealProps {
  onComplete?: () => void;
  /** Skip the animation entirely */
  skip?: boolean;
}

// SVG line that draws itself via stroke-dashoffset
function BlueprintLine({
  x1, y1, x2, y2,
  delay = 0,
  duration = 0.8,
  color = 'rgba(14, 86, 188, 0.3)',
  strokeWidth = 0.5,
}: {
  x1: number; y1: number; x2: number; y2: number;
  delay?: number; duration?: number; color?: string; strokeWidth?: number;
}) {
  return (
    <motion.line
      x1={x1} y1={y1} x2={x2} y2={y2}
      stroke={color}
      strokeWidth={strokeWidth}
      initial={{ pathLength: 0, opacity: 0 }}
      animate={{ pathLength: 1, opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{
        pathLength: { delay, duration, ease: 'easeInOut' },
        opacity: { delay, duration: 0.3 },
      }}
    />
  );
}

// Animated rectangle that "constructs" itself
function BlueprintRect({
  x, y, width, height,
  delay = 0,
  duration = 0.6,
  color = 'rgba(14, 86, 188, 0.25)',
}: {
  x: number; y: number; width: number; height: number;
  delay?: number; duration?: number; color?: string;
}) {
  return (
    <motion.rect
      x={x} y={y} width={width} height={height}
      fill="none"
      stroke={color}
      strokeWidth={0.5}
      initial={{ pathLength: 0, opacity: 0 }}
      animate={{ pathLength: 1, opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{
        pathLength: { delay, duration, ease: [0.22, 1, 0.36, 1] },
        opacity: { delay, duration: 0.3 },
      }}
    />
  );
}

// Small crosshair / measurement marker
function Crosshair({
  cx, cy,
  delay = 0,
  size = 3,
}: {
  cx: number; cy: number; delay?: number; size?: number;
}) {
  const color = 'rgba(14, 86, 188, 0.4)';
  return (
    <motion.g
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0 }}
      transition={{ delay, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
    >
      <line x1={cx - size} y1={cy} x2={cx + size} y2={cy} stroke={color} strokeWidth={0.4} />
      <line x1={cx} y1={cy - size} x2={cx} y2={cy + size} stroke={color} strokeWidth={0.4} />
      <circle cx={cx} cy={cy} r={size * 0.4} fill="none" stroke={color} strokeWidth={0.3} />
    </motion.g>
  );
}

// Diagonal dimension line with small ticks
function DimensionLine({
  x1, y1, x2, y2,
  delay = 0,
}: {
  x1: number; y1: number; x2: number; y2: number; delay?: number;
}) {
  const color = 'rgba(14, 86, 188, 0.2)';
  return (
    <motion.g
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ delay, duration: 0.5 }}
    >
      <motion.line
        x1={x1} y1={y1} x2={x2} y2={y2}
        stroke={color}
        strokeWidth={0.3}
        strokeDasharray="2 2"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ delay, duration: 0.7, ease: 'easeInOut' }}
      />
      {/* Tick marks at ends */}
      <line x1={x1 - 1.5} y1={y1 - 1.5} x2={x1 + 1.5} y2={y1 + 1.5} stroke={color} strokeWidth={0.4} />
      <line x1={x2 - 1.5} y1={y2 - 1.5} x2={x2 + 1.5} y2={y2 + 1.5} stroke={color} strokeWidth={0.4} />
    </motion.g>
  );
}

// Small annotation text (architectural style)
function AnnotationText({
  x, y, text,
  delay = 0,
}: {
  x: number; y: number; text: string; delay?: number;
}) {
  return (
    <motion.text
      x={x} y={y}
      fill="rgba(14, 86, 188, 0.3)"
      fontSize={2.5}
      fontFamily="'JetBrains Mono', monospace"
      letterSpacing="0.1em"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ delay, duration: 0.4 }}
    >
      {text}
    </motion.text>
  );
}

export default function LogoReveal({ onComplete, skip = false }: LogoRevealProps) {
  const [phase, setPhase] = useState<'blueprint' | 'reveal' | 'done'>(
    skip ? 'done' : 'blueprint'
  );

  useEffect(() => {
    if (skip) {
      setPhase('done');
      return;
    }

    // Phase 1 → Phase 2: blueprint elements visible, start fading to logo
    const revealTimer = setTimeout(() => setPhase('reveal'), 2500);
    // Phase 2 → Phase 3: animation fully complete
    const doneTimer = setTimeout(() => {
      setPhase('done');
      onComplete?.();
    }, 4000);

    return () => {
      clearTimeout(revealTimer);
      clearTimeout(doneTimer);
    };
  }, [skip, onComplete]);

  if (phase === 'done' && !skip) {
    // After animation, render nothing (hero content takes over)
    return null;
  }

  if (skip) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-bg-primary"
      style={{ pointerEvents: phase === 'done' ? 'none' : 'auto' }}
    >
      {/* Master fade-out of entire overlay */}
      <motion.div
        className="relative w-full h-full flex items-center justify-center"
        animate={{
          opacity: phase === 'reveal' ? 0 : 1,
        }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: phase === 'reveal' ? 0.3 : 0 }}
      >
        {/* Blueprint SVG layer */}
        <div className="absolute inset-0 flex items-center justify-center">
          <svg
            viewBox="0 0 200 100"
            className="w-[90vw] max-w-[900px] h-auto"
            preserveAspectRatio="xMidYMid meet"
          >
            <AnimatePresence>
              {phase === 'blueprint' && (
                <motion.g key="blueprint-elements">
                  {/* ── Grid Lines (horizontal) ── */}
                  <BlueprintLine x1={0} y1={20} x2={200} y2={20} delay={0} duration={1} />
                  <BlueprintLine x1={0} y1={50} x2={200} y2={50} delay={0.1} duration={1} />
                  <BlueprintLine x1={0} y1={80} x2={200} y2={80} delay={0.2} duration={1} />

                  {/* ── Grid Lines (vertical) ── */}
                  <BlueprintLine x1={40} y1={0} x2={40} y2={100} delay={0.15} duration={0.9} />
                  <BlueprintLine x1={100} y1={0} x2={100} y2={100} delay={0.25} duration={0.9} />
                  <BlueprintLine x1={160} y1={0} x2={160} y2={100} delay={0.35} duration={0.9} />

                  {/* ── Geometric Shapes (constructing) ── */}
                  {/* Large central rectangle — the "building footprint" */}
                  <BlueprintRect x={55} y={30} width={90} height={40} delay={0.5} duration={0.8} color="rgba(14, 86, 188, 0.35)" />
                  {/* Inner rooms */}
                  <BlueprintRect x={60} y={35} width={25} height={15} delay={0.7} duration={0.6} />
                  <BlueprintRect x={90} y={35} width={20} height={30} delay={0.8} duration={0.6} />
                  <BlueprintRect x={115} y={40} width={25} height={25} delay={0.9} duration={0.6} />
                  {/* Small detail rectangles */}
                  <BlueprintRect x={62} y={55} width={12} height={10} delay={1.0} duration={0.5} />
                  <BlueprintRect x={78} y={52} width={8} height={13} delay={1.1} duration={0.5} />

                  {/* ── Diagonal / Triangle elements ── */}
                  <BlueprintLine x1={55} y1={30} x2={100} y2={15} delay={1.0} duration={0.6} color="rgba(14, 86, 188, 0.2)" />
                  <BlueprintLine x1={100} y1={15} x2={145} y2={30} delay={1.1} duration={0.6} color="rgba(14, 86, 188, 0.2)" />

                  {/* ── Crosshairs at intersections ── */}
                  <Crosshair cx={55} cy={30} delay={1.3} />
                  <Crosshair cx={145} cy={30} delay={1.4} />
                  <Crosshair cx={100} cy={15} delay={1.5} />
                  <Crosshair cx={55} cy={70} delay={1.5} />
                  <Crosshair cx={145} cy={70} delay={1.6} />

                  {/* ── Dimension lines ── */}
                  <DimensionLine x1={55} y1={75} x2={145} y2={75} delay={1.5} />
                  <DimensionLine x1={50} y1={30} x2={50} y2={70} delay={1.6} />

                  {/* ── Annotation texts ── */}
                  <AnnotationText x={90} y={78} text="90.00" delay={1.7} />
                  <AnnotationText x={44} y={52} text="40.00" delay={1.8} />
                  <AnnotationText x={62} y={33} text="A-01" delay={1.9} />
                  <AnnotationText x={92} y={33} text="A-02" delay={2.0} />
                  <AnnotationText x={117} y={38} text="A-03" delay={2.1} />

                  {/* ── Accent circle (compass marker) ── */}
                  <motion.circle
                    cx={175} cy={15} r={6}
                    fill="none"
                    stroke="rgba(14, 86, 188, 0.3)"
                    strokeWidth={0.4}
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ delay: 1.2, duration: 0.8, ease: 'easeInOut' }}
                  />
                  <motion.line
                    x1={175} y1={9} x2={175} y2={12}
                    stroke="rgba(14, 86, 188, 0.4)"
                    strokeWidth={0.4}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ delay: 1.5, duration: 0.4 }}
                  />
                  <AnnotationText x={173} y={11} text="N" delay={1.6} />
                </motion.g>
              )}
            </AnimatePresence>
          </svg>
        </div>

        {/* Logo image — fades in during blueprint phase */}
        <motion.div
          className="relative z-10 flex items-center justify-center"
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{
            opacity: phase === 'blueprint' ? [0, 0, 0.6, 1] : 1,
            scale: phase === 'blueprint' ? [1.05, 1.02, 1.0] : 1,
          }}
          transition={{
            opacity: { duration: 2, times: [0, 0.5, 0.8, 1], delay: 1.5 },
            scale: { duration: 2, delay: 1.5, ease: [0.22, 1, 0.36, 1] },
          }}
        >
          <img
            src="/logo.png"
            alt="Mdterra"
            className="w-[50vw] max-w-[400px] h-auto logo-blue"
          />
        </motion.div>
      </motion.div>
    </div>
  );
}
