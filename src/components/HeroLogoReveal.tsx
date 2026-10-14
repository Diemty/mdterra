import { useState, useEffect, useRef } from 'react';
import { motion, MotionValue } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';
import { LOGO_EMBLEM_PATH, LOGO_TEXT_PATH } from './logoPaths';

interface HeroLogoRevealProps {
  heroOpacity?: MotionValue<number>;
  heroScale?: MotionValue<number>;
}

// Technical drafting line with animated stroke
function DraftingLine({
  x1, y1, x2, y2,
  delay = 0,
  duration = 0.9,
  color = 'rgba(14, 86, 188, 0.28)',
  strokeWidth = 0.5,
  dashed = false,
}: {
  x1: number; y1: number; x2: number; y2: number;
  delay?: number; duration?: number; color?: string;
  strokeWidth?: number; dashed?: boolean;
}) {
  return (
    <motion.line
      x1={x1} y1={y1} x2={x2} y2={y2}
      stroke={color}
      strokeWidth={strokeWidth}
      strokeDasharray={dashed ? '2 2' : undefined}
      initial={{ pathLength: 0, opacity: 0 }}
      animate={{ pathLength: 1, opacity: 1 }}
      transition={{
        pathLength: { delay, duration, ease: [0.22, 1, 0.36, 1] },
        opacity: { delay, duration: 0.3 },
      }}
    />
  );
}

// Precision architectural crosshair marker
function DraftingCrosshair({
  cx, cy,
  delay = 0,
  size = 3.5,
}: {
  cx: number; cy: number; delay?: number; size?: number;
}) {
  const color = 'rgba(14, 86, 188, 0.45)';
  return (
    <motion.g
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
    >
      <line x1={cx - size} y1={cy} x2={cx + size} y2={cy} stroke={color} strokeWidth={0.4} />
      <line x1={cx} y1={cy - size} x2={cx} y2={cy + size} stroke={color} strokeWidth={0.4} />
      <circle cx={cx} cy={cy} r={size * 0.4} fill="none" stroke={color} strokeWidth={0.35} />
    </motion.g>
  );
}

// Dimension line with end ticks and measurement tag
function DimensionMarker({
  x1, y1, x2, y2,
  text,
  delay = 0,
  vertical = false,
}: {
  x1: number; y1: number; x2: number; y2: number;
  text: string; delay?: number; vertical?: boolean;
}) {
  const color = 'rgba(14, 86, 188, 0.35)';
  const midX = (x1 + x2) / 2;
  const midY = (y1 + y2) / 2;

  return (
    <motion.g
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay, duration: 0.5 }}
    >
      <motion.line
        x1={x1} y1={y1} x2={x2} y2={y2}
        stroke={color}
        strokeWidth={0.35}
        strokeDasharray="1.5 1.5"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ delay, duration: 0.7, ease: 'easeInOut' }}
      />
      {vertical ? (
        <>
          <line x1={x1 - 1.5} y1={y1} x2={x1 + 1.5} y2={y1} stroke={color} strokeWidth={0.4} />
          <line x1={x2 - 1.5} y1={y2} x2={x2 + 1.5} y2={y2} stroke={color} strokeWidth={0.4} />
          <text
            x={midX - 3}
            y={midY + 1}
            fill="rgba(14, 86, 188, 0.55)"
            fontSize={2.5}
            fontFamily="'JetBrains Mono', monospace"
            textAnchor="end"
          >
            {text}
          </text>
        </>
      ) : (
        <>
          <line x1={x1} y1={y1 - 1.5} x2={x1} y2={y1 + 1.5} stroke={color} strokeWidth={0.4} />
          <line x1={x2} y1={y2 - 1.5} x2={x2} y2={y2 + 1.5} stroke={color} strokeWidth={0.4} />
          <text
            x={midX}
            y={midY - 2}
            fill="rgba(14, 86, 188, 0.55)"
            fontSize={2.5}
            fontFamily="'JetBrains Mono', monospace"
            textAnchor="middle"
          >
            {text}
          </text>
        </>
      )}
    </motion.g>
  );
}

// Technical mono annotation text
function TechnicalTag({
  x, y, text,
  delay = 0,
  anchor = 'start',
  size = 2.4,
}: {
  x: number; y: number; text: string; delay?: number;
  anchor?: 'start' | 'middle' | 'end'; size?: number;
}) {
  return (
    <motion.text
      x={x} y={y}
      fill="rgba(14, 86, 188, 0.45)"
      fontSize={size}
      fontFamily="'JetBrains Mono', monospace"
      letterSpacing="0.08em"
      textAnchor={anchor}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay, duration: 0.4 }}
    >
      {text}
    </motion.text>
  );
}

export default function HeroLogoReveal({ heroOpacity, heroScale }: HeroLogoRevealProps) {
  const { language } = useLanguage();
  const [animIteration, setAnimIteration] = useState(0);
  const [phase, setPhase] = useState<'drafting' | 'settled'>('drafting');
  const containerRef = useRef<HTMLDivElement>(null);

  // Mouse tilt effect for interactive tactile architectural table
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 16;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 16;
    setMouseOffset({ x, y });
  };

  const handleMouseLeave = () => {
    setMouseOffset({ x: 0, y: 0 });
  };

  // Replay handler
  const handleReplay = () => {
    setPhase('drafting');
    setAnimIteration((prev) => prev + 1);
  };

  // 4-second sequence timing
  useEffect(() => {
    setPhase('drafting');
    const timer = setTimeout(() => {
      setPhase('settled');
    }, 3200);

    return () => clearTimeout(timer);
  }, [animIteration]);

  return (
    <motion.section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-bg-primary pt-20 pb-16 px-4 select-none"
      style={{
        opacity: heroOpacity,
        scale: heroScale,
      }}
      id="hero-section"
    >
      {/* ── AMBIENT ARCHITECTURAL GRID BACKGROUND ── */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.035] bg-[radial-gradient(#0E56BC_1px,transparent_1px)] [background-size:24px_24px]" />

      {/* ── MAIN HERO STAGE ── */}
      <div className="relative w-full max-w-[920px] flex flex-col items-center justify-center z-10">
        <motion.div
          className="relative w-full flex items-center justify-center"
          animate={{
            x: mouseOffset.x * 0.35,
            y: mouseOffset.y * 0.35,
          }}
          transition={{ type: 'spring', damping: 25, stiffness: 120 }}
        >
          {/* THE MASTER SVG (both blueprint lines + vector logo share exact coordinates) */}
          <svg
            viewBox="-25 -15 298 152"
            className="w-full max-w-[800px] h-auto overflow-visible drop-shadow-[0_4px_30px_rgba(14,86,188,0.06)]"
            preserveAspectRatio="xMidYMid meet"
          >
            {/* ──────── 1. DRAFTING FRAME & OUTER LIMITS ──────── */}
            <motion.g
              animate={{ opacity: phase === 'settled' ? 0.35 : 1 }}
              transition={{ duration: 1.0 }}
            >
              <DraftingLine x1={-15} y1={-5} x2={263} y2={-5} delay={0.05} duration={1.1} color="rgba(14, 86, 188, 0.16)" strokeWidth={0.4} />
              <DraftingLine x1={-15} y1={130} x2={263} y2={130} delay={0.1} duration={1.1} color="rgba(14, 86, 188, 0.16)" strokeWidth={0.4} />
              <DraftingLine x1={-5} y1={-12} x2={-5} y2={138} delay={0.15} duration={1.0} color="rgba(14, 86, 188, 0.16)" strokeWidth={0.4} />
              <DraftingLine x1={253} y1={-12} x2={253} y2={138} delay={0.2} duration={1.0} color="rgba(14, 86, 188, 0.16)" strokeWidth={0.4} />

              {/* Corner registration crosshairs */}
              <DraftingCrosshair cx={-5} cy={-5} delay={0.3} size={3} />
              <DraftingCrosshair cx={253} cy={-5} delay={0.35} size={3} />
              <DraftingCrosshair cx={-5} cy={130} delay={0.4} size={3} />
              <DraftingCrosshair cx={253} cy={130} delay={0.45} size={3} />

              {/* Center vertical datum line */}
              <DraftingLine x1={124.2} y1={-12} x2={124.2} y2={140} delay={0.25} duration={1.2} color="rgba(14, 86, 188, 0.22)" strokeWidth={0.4} dashed />

              {/* Peak datum line (Y = 2.9) */}
              <DraftingLine x1={40} y1={2.9} x2={210} y2={2.9} delay={0.35} duration={0.9} color="rgba(14, 86, 188, 0.18)" strokeWidth={0.35} dashed />

              {/* Eaves datum line (Y = 25.5) */}
              <DraftingLine x1={30} y1={25.5} x2={220} y2={25.5} delay={0.4} duration={0.9} color="rgba(14, 86, 188, 0.18)" strokeWidth={0.35} dashed />

              {/* House base line (Y = 60.9) */}
              <DraftingLine x1={20} y1={60.9} x2={230} y2={60.9} delay={0.45} duration={1.0} color="rgba(14, 86, 188, 0.22)" strokeWidth={0.4} />

              {/* Foundation lower line (Y = 71.0) */}
              <DraftingLine x1={30} y1={71.0} x2={220} y2={71.0} delay={0.5} duration={0.9} color="rgba(14, 86, 188, 0.22)" strokeWidth={0.4} dashed />

              {/* Text baseline (Y = 116.8) */}
              <DraftingLine x1={-10} y1={116.8} x2={258} y2={116.8} delay={0.6} duration={1.0} color="rgba(14, 86, 188, 0.18)" strokeWidth={0.35} />

              {/* Wall vertical alignment lines */}
              <DraftingLine x1={102.1} y1={-8} x2={102.1} y2={85} delay={0.4} duration={0.9} color="rgba(14, 86, 188, 0.18)" strokeWidth={0.35} dashed />
              <DraftingLine x1={146.9} y1={-8} x2={146.9} y2={85} delay={0.45} duration={0.9} color="rgba(14, 86, 188, 0.18)" strokeWidth={0.35} dashed />

              {/* Architectural node crosshairs */}
              <DraftingCrosshair cx={124.2} cy={2.9} delay={0.8} size={3} />
              <DraftingCrosshair cx={102.1} cy={25.5} delay={0.95} size={2.5} />
              <DraftingCrosshair cx={146.9} cy={25.4} delay={1.05} size={2.5} />
              <DraftingCrosshair cx={71.9} cy={30.25} delay={1.2} size={2.5} />
              <DraftingCrosshair cx={102.1} cy={60.9} delay={1.3} size={2.5} />
              <DraftingCrosshair cx={146.9} cy={60.9} delay={1.4} size={2.5} />
              <DraftingCrosshair cx={102.0} cy={71.0} delay={1.5} size={2.5} />
              <DraftingCrosshair cx={157.1} cy={71.0} delay={1.6} size={2.5} />
              <DraftingCrosshair cx={176.5} cy={41.75} delay={1.7} size={2.5} />

              {/* Architectural dimensions */}
              <DimensionMarker x1={102.1} y1={-1} x2={146.9} y2={-1} text="44.80" delay={1.3} />
              <DimensionMarker x1={71.9} y1={78} x2={176.5} y2={78} text="104.60" delay={1.6} />
              <DimensionMarker x1={186} y1={2.9} x2={186} y2={71.0} text="68.10" delay={1.7} vertical />

              {/* Technical annotations */}
              <TechnicalTag x={-2} y={3} text="REF: MD-01" delay={1.1} />
              <TechnicalTag x={-2} y={10} text="SCALE 1:50" delay={1.3} />
              <TechnicalTag x={-2} y={17} text="ATHENS · GR" delay={1.5} />

              <TechnicalTag x={250} y={125} text="EL. +0.00" delay={1.7} anchor="end" />
              <TechnicalTag x={250} y={132} text="37.9838° N / 23.7275° E" delay={1.9} anchor="end" size={2.1} />

              {/* North Arrow Symbol */}
              <motion.g
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.3, duration: 0.6 }}
              >
                <circle cx={242} cy={12} r={6.5} fill="none" stroke="rgba(14, 86, 188, 0.35)" strokeWidth={0.4} />
                <line x1={242} y1={6} x2={242} y2={18} stroke="rgba(14, 86, 188, 0.45)" strokeWidth={0.4} />
                <line x1={236} y1={12} x2={248} y2={12} stroke="rgba(14, 86, 188, 0.25)" strokeWidth={0.4} />
                <polygon points="242,6 244,12 242,10.5 240,12" fill="#0E56BC" opacity={0.65} />
                <text x={242} y={4} fill="#0E56BC" fontSize={2.8} fontFamily="'JetBrains Mono', monospace" textAnchor="middle" fontWeight="bold">N</text>
              </motion.g>
            </motion.g>

            {/* ──────── 2. ANIMATED BLUEPRINT OUTLINE (STROKE CONSTRUCTION) ──────── */}
            {/* The Emblem Blueprint Stroke (Draws line-by-line first) */}
            <motion.path
              d={LOGO_EMBLEM_PATH}
              fillRule="evenodd"
              fill="none"
              stroke="#0E56BC"
              strokeWidth={0.8}
              strokeDasharray="3 1.5"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{
                pathLength: 1,
                opacity: [0, 0.8, 0.8, 0],
              }}
              transition={{
                pathLength: { delay: 0.4, duration: 1.6, ease: [0.22, 1, 0.36, 1] },
                opacity: { delay: 0.4, duration: 2.0, times: [0, 0.1, 0.75, 1], ease: 'easeInOut' },
              }}
            />

            {/* The Wordmark Outline Stroke */}
            <motion.path
              d={LOGO_TEXT_PATH}
              fillRule="evenodd"
              fill="none"
              stroke="#0E56BC"
              strokeWidth={0.6}
              strokeDasharray="2 1.5"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{
                pathLength: 1,
                opacity: [0, 0.7, 0.7, 0],
              }}
              transition={{
                pathLength: { delay: 1.2, duration: 1.4, ease: [0.22, 1, 0.36, 1] },
                opacity: { delay: 1.2, duration: 1.8, times: [0, 0.1, 0.75, 1], ease: 'easeInOut' },
              }}
            />

            {/* ──────── 3. THE SOLID VECTOR LOGO FILL (CRYSTALLIZATION) ──────── */}
            {/* Emblem Solid Fill: Fades in cleanly and stays razor-sharp */}
            <motion.path
              d={LOGO_EMBLEM_PATH}
              fillRule="evenodd"
              fill="#0E56BC"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{
                delay: 1.8,
                duration: 0.8,
                ease: [0.22, 1, 0.36, 1],
              }}
            />

            {/* Typography Solid Fill: Fades in as stroke completes, stays permanently solid */}
            <motion.path
              d={LOGO_TEXT_PATH}
              fillRule="evenodd"
              fill="#0E56BC"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{
                delay: 2.2,
                duration: 0.8,
                ease: [0.22, 1, 0.36, 1],
              }}
            />
          </svg>
        </motion.div>

        {/* ──────── 4. ARCHITECTURAL SUBTITLE & TAGLINE ──────── */}
        <motion.div
          className="text-center mt-6 sm:mt-8 flex flex-col items-center gap-3"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.8, duration: 1.0, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="flex items-center gap-3">
            <span className="h-[1px] w-6 sm:w-10 bg-accent/35" />
            <p className="text-label text-accent tracking-[0.32em] font-medium uppercase text-xs sm:text-sm">
              {language === 'el'
                ? 'Αρχιτεκτονικό Γραφείο · Αθήνα, Ελλάδα'
                : 'Architectural Practice · Athens, Greece'}
            </p>
            <span className="h-[1px] w-6 sm:w-10 bg-accent/35" />
          </div>

          <p className="text-body-sm text-text-muted font-light tracking-[0.24em] uppercase text-[11px] sm:text-xs">
            {language === 'el'
              ? 'Αρχιτεκτονική · Σχεδιασμός Χώρου · Κατασκευή'
              : 'Architecture · Spatial Design · Construction'}
          </p>
        </motion.div>
      </div>

      {/* ──────── 5. SCROLL DOWN PROMPT ──────── */}
      <motion.div
        className="absolute bottom-6 sm:bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3.4, duration: 1 }}
      >
        <span className="text-[10px] tracking-[0.25em] text-accent/70 uppercase font-mono">
          {language === 'el' ? 'ΚΥΛΙΣΗ' : 'SCROLL'}
        </span>
        <motion.div
          className="w-[1.5px] h-9 bg-accent/40"
          animate={{ scaleY: [0, 1, 0], originY: 0 }}
          transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
        />
      </motion.div>

      {/* ──────── 6. DISCRETE REPLAY BUTTON (BOTTOM-RIGHT) ──────── */}
      <motion.button
        type="button"
        onClick={handleReplay}
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.65 }}
        whileHover={{ opacity: 1, scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="absolute bottom-6 right-6 z-20 hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full border border-accent/20 bg-white/80 backdrop-blur-sm text-[11px] font-mono text-accent/80 hover:text-accent hover:border-accent/40 transition-colors shadow-sm"
        title={language === 'el' ? 'Επανάληψη σχεδιασμού' : 'Replay blueprint construction'}
      >
        <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
        </svg>
        <span>{language === 'el' ? 'Σχέδιο' : 'Draft'}</span>
      </motion.button>
    </motion.section>
  );
}
