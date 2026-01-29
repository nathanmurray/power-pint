import { motion } from 'framer-motion';
import { glassSpring } from '../../config/animations';

interface GlassOutlineProps {
  scale: number;
}

export function GlassOutline({ scale }: GlassOutlineProps) {
  // Glass dimensions - pint glass shape
  const baseWidth = 140;
  const topWidth = 160;
  const height = 220;
  const handleWidth = 30;
  const handleHeight = 100;

  return (
    <motion.g
      animate={{ scale }}
      transition={glassSpring}
      style={{ originX: '50%', originY: '100%' }}
    >
      {/* Glass body - trapezoid shape with rounded bottom */}
      <defs>
        <linearGradient id="glassGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="rgba(255,255,255,0.15)" />
          <stop offset="20%" stopColor="rgba(255,255,255,0.05)" />
          <stop offset="50%" stopColor="rgba(255,255,255,0.02)" />
          <stop offset="80%" stopColor="rgba(255,255,255,0.05)" />
          <stop offset="100%" stopColor="rgba(255,255,255,0.15)" />
        </linearGradient>
        <linearGradient id="glassShine" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="rgba(255,255,255,0)" />
          <stop offset="10%" stopColor="rgba(255,255,255,0.4)" />
          <stop offset="20%" stopColor="rgba(255,255,255,0)" />
        </linearGradient>
        {/* Clip path for contents */}
        <clipPath id="glassClip">
          <path
            d={`
              M ${(200 - topWidth) / 2 + 5} 15
              L ${(200 - baseWidth) / 2 + 5} ${height - 15}
              Q ${(200 - baseWidth) / 2 + 5} ${height} ${(200 - baseWidth) / 2 + 20} ${height}
              L ${(200 + baseWidth) / 2 - 20} ${height}
              Q ${(200 + baseWidth) / 2 - 5} ${height} ${(200 + baseWidth) / 2 - 5} ${height - 15}
              L ${(200 + topWidth) / 2 - 5} 15
              Z
            `}
          />
        </clipPath>
      </defs>

      {/* Glass body outline */}
      <path
        d={`
          M ${(200 - topWidth) / 2} 10
          L ${(200 - baseWidth) / 2} ${height - 15}
          Q ${(200 - baseWidth) / 2} ${height + 5} ${(200 - baseWidth) / 2 + 25} ${height + 5}
          L ${(200 + baseWidth) / 2 - 25} ${height + 5}
          Q ${(200 + baseWidth) / 2} ${height + 5} ${(200 + baseWidth) / 2} ${height - 15}
          L ${(200 + topWidth) / 2} 10
        `}
        fill="url(#glassGradient)"
        stroke="#9CA3AF"
        strokeWidth="3"
        strokeLinecap="round"
      />

      {/* Handle */}
      <path
        d={`
          M ${(200 + topWidth) / 2 - 5} 50
          Q ${(200 + topWidth) / 2 + handleWidth} 50
            ${(200 + topWidth) / 2 + handleWidth} ${50 + handleHeight / 2}
          Q ${(200 + topWidth) / 2 + handleWidth} ${50 + handleHeight}
            ${(200 + topWidth) / 2 - 5} ${50 + handleHeight}
        `}
        fill="none"
        stroke="#9CA3AF"
        strokeWidth="8"
        strokeLinecap="round"
      />

      {/* Glass shine effect */}
      <path
        d={`
          M ${(200 - topWidth) / 2 + 15} 20
          L ${(200 - baseWidth) / 2 + 15} ${height - 20}
        `}
        stroke="url(#glassShine)"
        strokeWidth="8"
        strokeLinecap="round"
        opacity="0.6"
      />

      {/* Rim highlight */}
      <ellipse
        cx="100"
        cy="10"
        rx={(topWidth / 2) - 2}
        ry="4"
        fill="none"
        stroke="rgba(255,255,255,0.3)"
        strokeWidth="2"
      />
    </motion.g>
  );
}
