import { motion } from 'framer-motion';
import { springTransition } from '../../config/animations';

interface PowerTriangleProps {
  mw: number;
  mvar: number;
  mva: number;
  powerFactor: number;
  sizeScale: number;  // 0-1 range based on MW (overall size scaling)
}

export function PowerTriangle({ mw, mvar, mva, powerFactor, sizeScale }: PowerTriangleProps) {
  // SVG dimensions
  const width = 400;
  const height = 300;
  const padding = 50;

  // Base scale factor - pixels per unit, scaled by MW
  // At sizeScale = 1.0, use 20 pixels per unit; at sizeScale = 0, use 4 pixels per unit
  const baseScale = 4 + sizeScale * 16;
  const scale = baseScale;

  // Triangle vertices (right triangle)
  // Origin at bottom-left
  const origin = { x: padding, y: height - padding };
  const mwPoint = { x: origin.x + mw * scale, y: origin.y };
  const mvaPoint = { x: mwPoint.x, y: origin.y - mvar * scale };

  // Calculate angle for power factor
  const angle = Math.acos(powerFactor) * (180 / Math.PI);

  return (
    <div className="flex flex-col items-center">
      <svg viewBox={`0 0 ${width} ${height}`} className="w-full max-w-md">
        <defs>
          {/* Gradients */}
          <linearGradient id="mwGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#F59E0B" />
            <stop offset="100%" stopColor="#D97706" />
          </linearGradient>
          <linearGradient id="mvarGradient" x1="0%" y1="100%" x2="0%" y2="0%">
            <stop offset="0%" stopColor="#FEF3C7" />
            <stop offset="100%" stopColor="#FDE68A" />
          </linearGradient>
          <linearGradient id="mvaGradient" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#6B7280" />
            <stop offset="100%" stopColor="#9CA3AF" />
          </linearGradient>

          {/* Arrow marker */}
          <marker
            id="arrowhead"
            markerWidth="10"
            markerHeight="7"
            refX="9"
            refY="3.5"
            orient="auto"
          >
            <polygon points="0 0, 10 3.5, 0 7" fill="currentColor" />
          </marker>
        </defs>

        {/* Grid background */}
        <g opacity="0.1">
          {[...Array(10)].map((_, i) => (
            <g key={i}>
              <line
                x1={padding}
                y1={padding + (i * (height - padding * 2)) / 10}
                x2={width - padding}
                y2={padding + (i * (height - padding * 2)) / 10}
                stroke="white"
                strokeWidth="1"
              />
              <line
                x1={padding + (i * (width - padding * 2)) / 10}
                y1={padding}
                x2={padding + (i * (width - padding * 2)) / 10}
                y2={height - padding}
                stroke="white"
                strokeWidth="1"
              />
            </g>
          ))}
        </g>

        {/* Power triangle */}
        <motion.g
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {/* Triangle fill */}
          <motion.path
            d={`M ${origin.x} ${origin.y} L ${mwPoint.x} ${mwPoint.y} L ${mvaPoint.x} ${mvaPoint.y} Z`}
            fill="rgba(59, 130, 246, 0.1)"
            stroke="rgba(59, 130, 246, 0.3)"
            strokeWidth="1"
            animate={{
              d: `M ${origin.x} ${origin.y} L ${mwPoint.x} ${mwPoint.y} L ${mvaPoint.x} ${mvaPoint.y} Z`,
            }}
            transition={springTransition}
          />

          {/* MW line (horizontal - real power) */}
          <motion.line
            x1={origin.x}
            y1={origin.y}
            animate={{ x2: mwPoint.x, y2: mwPoint.y }}
            stroke="url(#mwGradient)"
            strokeWidth="4"
            strokeLinecap="round"
            transition={springTransition}
          />

          {/* MVAR line (vertical - reactive power) */}
          <motion.line
            x1={mwPoint.x}
            y1={mwPoint.y}
            animate={{ x2: mvaPoint.x, y2: mvaPoint.y }}
            stroke="url(#mvarGradient)"
            strokeWidth="4"
            strokeLinecap="round"
            transition={springTransition}
          />

          {/* MVA line (hypotenuse - apparent power) */}
          <motion.line
            x1={origin.x}
            y1={origin.y}
            animate={{ x2: mvaPoint.x, y2: mvaPoint.y }}
            stroke="url(#mvaGradient)"
            strokeWidth="4"
            strokeLinecap="round"
            transition={springTransition}
          />

          {/* Right angle indicator */}
          <motion.path
            animate={{
              d: `M ${mwPoint.x - 15} ${mwPoint.y} L ${mwPoint.x - 15} ${mwPoint.y - 15} L ${mwPoint.x} ${mwPoint.y - 15}`,
            }}
            fill="none"
            stroke="rgba(255,255,255,0.5)"
            strokeWidth="2"
            transition={springTransition}
          />

          {/* Angle arc */}
          <motion.path
            animate={{
              d: `M ${origin.x + 40} ${origin.y} A 40 40 0 0 0 ${origin.x + 40 * Math.cos(Math.acos(powerFactor))} ${origin.y - 40 * Math.sin(Math.acos(powerFactor))}`,
            }}
            fill="none"
            stroke="#3B82F6"
            strokeWidth="2"
            transition={springTransition}
          />
        </motion.g>

        {/* Labels */}
        <g className="text-sm">
          {/* MW label */}
          <motion.g animate={{ x: (origin.x + mwPoint.x) / 2, y: origin.y + 25 }}>
            <text
              textAnchor="middle"
              fill="#F59E0B"
              className="font-semibold"
            >
              MW = {mw.toFixed(2)}
            </text>
            <text
              y="15"
              textAnchor="middle"
              fill="#9CA3AF"
              fontSize="10"
            >
              Real Power
            </text>
          </motion.g>

          {/* MVAR label */}
          <motion.g animate={{ x: mwPoint.x + 50, y: (mwPoint.y + mvaPoint.y) / 2 }}>
            <text
              textAnchor="start"
              fill="#FEF3C7"
              className="font-semibold"
            >
              MVAR = {mvar.toFixed(2)}
            </text>
            <text
              y="15"
              textAnchor="start"
              fill="#9CA3AF"
              fontSize="10"
            >
              Reactive Power
            </text>
          </motion.g>

          {/* MVA label */}
          <motion.g animate={{ x: (origin.x + mvaPoint.x) / 2 - 50, y: (origin.y + mvaPoint.y) / 2 - 10 }}>
            <text
              textAnchor="end"
              fill="#9CA3AF"
              className="font-semibold"
            >
              MVA = {mva.toFixed(2)}
            </text>
            <text
              y="15"
              textAnchor="end"
              fill="#6B7280"
              fontSize="10"
            >
              Apparent Power
            </text>
          </motion.g>

          {/* Power Factor angle label */}
          <motion.g animate={{ x: origin.x + 60, y: origin.y - 20 }}>
            <text
              fill="#3B82F6"
              fontSize="12"
            >
              θ = {angle.toFixed(1)}°
            </text>
            <text
              y="14"
              fill="#3B82F6"
              fontSize="10"
            >
              PF = cos(θ) = {powerFactor.toFixed(2)}
            </text>
          </motion.g>
        </g>
      </svg>

      {/* Formula */}
      <div className="mt-4 p-4 bg-theme-surfaceLight rounded-lg text-center">
        <div className="text-theme-textMuted text-sm mb-2">Power Triangle Relationship</div>
        <code className="text-theme-text">
          MVA² = MW² + MVAR²
        </code>
        <div className="mt-2 text-sm text-theme-textMuted">
          {mva.toFixed(2)}² = {mw.toFixed(2)}² + {mvar.toFixed(2)}²
        </div>
        <div className="mt-1 text-sm text-theme-textMuted">
          {(mva * mva).toFixed(2)} ≈ {(mw * mw + mvar * mvar).toFixed(2)}
        </div>
      </div>
    </div>
  );
}
