import { motion } from 'framer-motion';
import { springTransition } from '../../config/animations';

interface FoamLayerProps {
  foamPercent: number; // 0-100 (relative to glass)
  liquidTop: number;   // Y position where liquid ends
}

export function FoamLayer({ foamPercent, liquidTop }: FoamLayerProps) {
  // Foam always fills from liquid top to glass top
  const glassTopPosition = 15; // Match glass top
  const foamTop = glassTopPosition;
  const foamHeight = Math.max(0, liquidTop - foamTop);

  // Glass width at foam position
  const topWidth = 150;
  const baseWidth = 130;
  const glassHeight = 210;
  const glassTop = 15;
  const widthRatio = Math.max(0, (foamTop - glassTop) / glassHeight);
  const foamWidth = topWidth - (topWidth - baseWidth) * (1 - widthRatio);

  if (foamPercent < 1) return null;

  return (
    <g clipPath="url(#glassClip)">
      <defs>
        {/* Foam gradient */}
        <linearGradient id="foamGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#FFFBEB" />
          <stop offset="30%" stopColor="#FEF3C7" />
          <stop offset="100%" stopColor="#FDE68A" />
        </linearGradient>

        {/* Foam bubble pattern */}
        <pattern id="foamBubbles" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
          <circle cx="5" cy="5" r="4" fill="rgba(255,255,255,0.6)" />
          <circle cx="15" cy="12" r="3" fill="rgba(255,255,255,0.4)" />
          <circle cx="8" cy="16" r="2" fill="rgba(255,255,255,0.5)" />
        </pattern>
      </defs>

      {/* Main foam body */}
      <motion.g
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        {/* Foam base */}
        <motion.path
          animate={{
            d: `
              M ${(200 - foamWidth) / 2 + 5} ${foamTop + foamHeight}
              L ${(200 - foamWidth) / 2 + 5} ${foamTop + 10}
              Q ${(200 - foamWidth) / 2 + 5} ${foamTop} ${(200 - foamWidth) / 2 + 20} ${foamTop}
              L ${(200 + foamWidth) / 2 - 20} ${foamTop}
              Q ${(200 + foamWidth) / 2 - 5} ${foamTop} ${(200 + foamWidth) / 2 - 5} ${foamTop + 10}
              L ${(200 + foamWidth) / 2 - 5} ${foamTop + foamHeight}
              Z
            `,
          }}
          transition={springTransition}
          fill="url(#foamGradient)"
        />

        {/* Foam bubble texture */}
        <motion.path
          animate={{
            d: `
              M ${(200 - foamWidth) / 2 + 5} ${foamTop + foamHeight}
              L ${(200 - foamWidth) / 2 + 5} ${foamTop + 10}
              Q ${(200 - foamWidth) / 2 + 5} ${foamTop} ${(200 - foamWidth) / 2 + 20} ${foamTop}
              L ${(200 + foamWidth) / 2 - 20} ${foamTop}
              Q ${(200 + foamWidth) / 2 - 5} ${foamTop} ${(200 + foamWidth) / 2 - 5} ${foamTop + 10}
              L ${(200 + foamWidth) / 2 - 5} ${foamTop + foamHeight}
              Z
            `,
          }}
          transition={springTransition}
          fill="url(#foamBubbles)"
          opacity="0.7"
        />

        {/* Foam bubbles on top - animated */}
        <FoamBubbles foamTop={foamTop} />

        {/* Foam drip effect */}
        <FoamDrips foamTop={foamTop} foamHeight={foamHeight} />
      </motion.g>
    </g>
  );
}

function FoamBubbles({ foamTop }: { foamTop: number }) {
  const bubbles = [
    { x: -30, size: 8, delay: 0 },
    { x: -15, size: 6, delay: 0.3 },
    { x: 0, size: 10, delay: 0.1 },
    { x: 15, size: 7, delay: 0.5 },
    { x: 30, size: 5, delay: 0.2 },
    { x: -22, size: 5, delay: 0.4 },
    { x: 22, size: 6, delay: 0.6 },
  ];

  return (
    <g>
      {bubbles.map((bubble, i) => (
        <motion.ellipse
          key={i}
          cx={100 + bubble.x}
          rx={bubble.size}
          ry={bubble.size * 0.6}
          fill="#FFFBEB"
          stroke="#FEF3C7"
          strokeWidth="1"
          initial={{ cy: foamTop + 5, opacity: 0 }}
          animate={{
            cy: foamTop - bubble.size * 0.3,
            opacity: [0, 1, 1],
            scale: [0.8, 1, 0.95],
          }}
          transition={{
            duration: 0.5,
            delay: bubble.delay,
          }}
        />
      ))}
    </g>
  );
}

function FoamDrips({ foamTop, foamHeight }: { foamTop: number; foamHeight: number }) {
  const drips = [
    { x: -25, length: 15, delay: 0 },
    { x: 10, length: 20, delay: 0.5 },
    { x: 35, length: 12, delay: 1 },
  ];

  return (
    <g>
      {drips.map((drip, i) => (
        <motion.path
          key={i}
          d={`
            M ${100 + drip.x} ${foamTop + foamHeight}
            Q ${100 + drip.x} ${foamTop + foamHeight + drip.length}
              ${100 + drip.x} ${foamTop + foamHeight + drip.length}
          `}
          stroke="#FEF3C7"
          strokeWidth="4"
          strokeLinecap="round"
          fill="none"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{
            pathLength: [0, 1, 0],
            opacity: [0, 0.8, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: drip.delay + 1,
            ease: 'easeInOut',
          }}
        />
      ))}
    </g>
  );
}
