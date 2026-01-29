import { motion } from 'framer-motion';
import { springTransition } from '../../config/animations';

interface LiquidFillProps {
  fillPercent: number; // 0-100
}

export function LiquidFill({ fillPercent }: LiquidFillProps) {
  // Glass inner dimensions
  const baseWidth = 130;
  const topWidth = 150;
  const glassHeight = 210;
  const glassTop = 15;

  // Calculate liquid height based on fill percent
  const maxLiquidHeight = glassHeight - 20; // Leave room at top
  const liquidHeight = (fillPercent / 100) * maxLiquidHeight;
  const liquidTop = glassTop + (maxLiquidHeight - liquidHeight);

  // Calculate width at liquid top (trapezoid interpolation)
  const widthRatio = (liquidTop - glassTop) / glassHeight;
  const liquidTopWidth = topWidth - (topWidth - baseWidth) * (1 - widthRatio);
  const liquidBottomWidth = baseWidth;

  // Wave amplitude
  const waveAmp = 3;

  return (
    <g clipPath="url(#glassClip)">
      <defs>
        {/* Beer gradient */}
        <linearGradient id="beerGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#F59E0B" />
          <stop offset="50%" stopColor="#D97706" />
          <stop offset="100%" stopColor="#B45309" />
        </linearGradient>

        {/* Beer shine */}
        <linearGradient id="beerShine" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="rgba(255,255,255,0)" />
          <stop offset="30%" stopColor="rgba(255,255,255,0.15)" />
          <stop offset="50%" stopColor="rgba(255,255,255,0.05)" />
          <stop offset="100%" stopColor="rgba(255,255,255,0)" />
        </linearGradient>
      </defs>

      {/* Main liquid body */}
      <motion.g
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Liquid fill */}
        <motion.path
          animate={{
            d: `
              M ${(200 - liquidTopWidth) / 2 + 5} ${liquidTop}
              Q ${100} ${liquidTop - waveAmp} ${(200 + liquidTopWidth) / 2 - 5} ${liquidTop}
              L ${(200 + liquidBottomWidth) / 2 - 5} ${glassTop + glassHeight - 5}
              Q ${100} ${glassTop + glassHeight} ${(200 - liquidBottomWidth) / 2 + 5} ${glassTop + glassHeight - 5}
              Z
            `,
          }}
          transition={springTransition}
          fill="url(#beerGradient)"
        />

        {/* Animated wave on top */}
        <motion.path
          animate={{
            d: [
              `M ${(200 - liquidTopWidth) / 2 + 5} ${liquidTop}
               Q ${75} ${liquidTop - waveAmp} ${100} ${liquidTop}
               Q ${125} ${liquidTop + waveAmp} ${(200 + liquidTopWidth) / 2 - 5} ${liquidTop}
               L ${(200 + liquidTopWidth) / 2 - 5} ${liquidTop + 10}
               L ${(200 - liquidTopWidth) / 2 + 5} ${liquidTop + 10}
               Z`,
              `M ${(200 - liquidTopWidth) / 2 + 5} ${liquidTop}
               Q ${75} ${liquidTop + waveAmp} ${100} ${liquidTop}
               Q ${125} ${liquidTop - waveAmp} ${(200 + liquidTopWidth) / 2 - 5} ${liquidTop}
               L ${(200 + liquidTopWidth) / 2 - 5} ${liquidTop + 10}
               L ${(200 - liquidTopWidth) / 2 + 5} ${liquidTop + 10}
               Z`,
              `M ${(200 - liquidTopWidth) / 2 + 5} ${liquidTop}
               Q ${75} ${liquidTop - waveAmp} ${100} ${liquidTop}
               Q ${125} ${liquidTop + waveAmp} ${(200 + liquidTopWidth) / 2 - 5} ${liquidTop}
               L ${(200 + liquidTopWidth) / 2 - 5} ${liquidTop + 10}
               L ${(200 - liquidTopWidth) / 2 + 5} ${liquidTop + 10}
               Z`,
            ],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          fill="url(#beerGradient)"
          opacity="0.9"
        />

        {/* Beer shine overlay */}
        <motion.rect
          x={(200 - liquidTopWidth) / 2 + 10}
          animate={{ y: liquidTop }}
          width={liquidTopWidth - 20}
          height={liquidHeight}
          fill="url(#beerShine)"
          transition={springTransition}
        />

        {/* Bubbles */}
        <Bubbles liquidTop={liquidTop} liquidHeight={liquidHeight} />
      </motion.g>
    </g>
  );
}

function Bubbles({ liquidTop, liquidHeight }: { liquidTop: number; liquidHeight: number }) {
  const bubbles = [
    { cx: 70, delay: 0, size: 3 },
    { cx: 90, delay: 1, size: 2 },
    { cx: 110, delay: 0.5, size: 4 },
    { cx: 130, delay: 1.5, size: 2 },
    { cx: 85, delay: 2, size: 3 },
    { cx: 115, delay: 2.5, size: 2 },
  ];

  return (
    <g>
      {bubbles.map((bubble, i) => (
        <motion.circle
          key={i}
          cx={bubble.cx}
          r={bubble.size}
          fill="rgba(255, 255, 255, 0.4)"
          initial={{
            cy: liquidTop + liquidHeight - 20,
            opacity: 0
          }}
          animate={{
            cy: [liquidTop + liquidHeight - 20, liquidTop + 10],
            opacity: [0, 0.6, 0],
          }}
          transition={{
            duration: 3 + Math.random(),
            repeat: Infinity,
            delay: bubble.delay,
            ease: 'easeOut',
          }}
        />
      ))}
    </g>
  );
}
