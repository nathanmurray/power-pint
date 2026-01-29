import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface SineWaveViewProps {
  mw: number;
  mvar: number;
  mva: number;
  powerFactor: number;
}

export function SineWaveView({ mw, mva, powerFactor }: SineWaveViewProps) {
  const [time, setTime] = useState(0);

  // Calculate phase angle from power factor
  // PF = cos(θ), so θ = acos(PF)
  const phaseAngle = Math.acos(powerFactor);
  const phaseAngleDegrees = phaseAngle * (180 / Math.PI);

  // Animation loop at ~20fps
  useEffect(() => {
    const interval = setInterval(() => {
      setTime(t => (t + 0.1) % (2 * Math.PI * 10)); // Loop every 10 cycles
    }, 50); // 20fps

    return () => clearInterval(interval);
  }, []);

  // SVG dimensions
  const width = 500;
  const height = 300;
  const padding = 40;
  const graphWidth = width - padding * 2;
  const graphHeight = height - padding * 2;
  const centerY = height / 2;

  // Base amplitude scales with MVA (apparent power = V × I magnitude)
  const maxAmplitude = graphHeight / 3;
  const minAmplitude = maxAmplitude * 0.1;
  const amplitude = minAmplitude + (mva / 10) * (maxAmplitude - minAmplitude);

  // Generate wave paths
  const generateWavePath = (phaseShift: number = 0) => {
    const points: string[] = [];
    const numPoints = 200;

    for (let i = 0; i <= numPoints; i++) {
      const x = padding + (i / numPoints) * graphWidth;
      const angle = (i / numPoints) * 4 * Math.PI + time - phaseShift;
      const y = centerY - Math.sin(angle) * amplitude;

      if (i === 0) {
        points.push(`M ${x} ${y}`);
      } else {
        points.push(`L ${x} ${y}`);
      }
    }

    return points.join(' ');
  };

  // Generate power wave (V × I product)
  const generatePowerPath = () => {
    const points: string[] = [];
    const numPoints = 200;
    // Power amplitude is larger than V/I waves to make it more prominent
    const powerAmplitude = amplitude * 1.2;

    for (let i = 0; i <= numPoints; i++) {
      const x = padding + (i / numPoints) * graphWidth;
      const angle = (i / numPoints) * 4 * Math.PI + time;
      const voltage = Math.sin(angle);
      const current = Math.sin(angle - phaseAngle);
      const power = voltage * current;
      const y = centerY - power * powerAmplitude;

      if (i === 0) {
        points.push(`M ${x} ${y}`);
      } else {
        points.push(`L ${x} ${y}`);
      }
    }

    return points.join(' ');
  };

  // Phase arc for visualization
  const arcRadius = 30;
  const largeArcFlag = phaseAngle > Math.PI ? 1 : 0;

  // Pulsing animation for the arc
  const [arcPulse, setArcPulse] = useState(1);
  useEffect(() => {
    const pulseInterval = setInterval(() => {
      setArcPulse(p => p === 1 ? 1.1 : 1);
    }, 500);
    return () => clearInterval(pulseInterval);
  }, []);

  return (
    <div className="flex flex-col items-center w-full">
      {/* Legend */}
      <div className="flex gap-6 mb-4 text-sm">
        <div className="flex items-center gap-2">
          <div className="w-4 h-1 bg-blue-500 rounded"></div>
          <span className="text-theme-textMuted">Voltage</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-1 bg-amber-500 rounded"></div>
          <span className="text-theme-textMuted">Current</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-5 h-1.5 bg-green-500 rounded"></div>
          <span className="text-theme-textMuted">Power</span>
        </div>
      </div>

      {/* SVG Wave Display */}
      <svg viewBox={`0 0 ${width} ${height}`} className="w-full max-w-lg bg-theme-surfaceLight rounded-lg">
        {/* Grid lines */}
        <g opacity="0.1">
          {/* Horizontal grid lines */}
          {[-1, -0.5, 0, 0.5, 1].map((mult, i) => (
            <line
              key={`h-${i}`}
              x1={padding}
              y1={centerY - mult * amplitude}
              x2={width - padding}
              y2={centerY - mult * amplitude}
              stroke="white"
              strokeWidth="1"
            />
          ))}
          {/* Vertical grid lines */}
          {[0, 0.25, 0.5, 0.75, 1].map((mult, i) => (
            <line
              key={`v-${i}`}
              x1={padding + mult * graphWidth}
              y1={padding}
              x2={padding + mult * graphWidth}
              y2={height - padding}
              stroke="white"
              strokeWidth="1"
            />
          ))}
        </g>

        {/* Zero line (more visible) */}
        <line
          x1={padding}
          y1={centerY}
          x2={width - padding}
          y2={centerY}
          stroke="rgba(255,255,255,0.3)"
          strokeWidth="1"
          strokeDasharray="5,5"
        />

        {/* Power waveform (V × I) - prominent green */}
        <path
          d={generatePowerPath()}
          fill="none"
          stroke="#22C55E"
          strokeWidth="4"
          strokeOpacity="0.8"
        />

        {/* Voltage waveform - blue (reference) */}
        <path
          d={generateWavePath(0)}
          fill="none"
          stroke="#3B82F6"
          strokeWidth="2.5"
        />

        {/* Current waveform - amber (phase shifted) */}
        <path
          d={generateWavePath(phaseAngle)}
          fill="none"
          stroke="#F59E0B"
          strokeWidth="2.5"
        />

        {/* Phase angle arc at origin */}
        {phaseAngle > 0.01 && (
          <g transform={`translate(${padding}, ${centerY})`}>
            <motion.path
              d={`M ${arcRadius} 0 A ${arcRadius} ${arcRadius} 0 ${largeArcFlag} 1 ${arcRadius * Math.cos(-phaseAngle)} ${arcRadius * Math.sin(-phaseAngle)}`}
              fill="none"
              stroke="#EF4444"
              strokeWidth="2"
              animate={{
                strokeWidth: arcPulse === 1 ? 2 : 3,
                opacity: arcPulse === 1 ? 0.8 : 1
              }}
              transition={{ duration: 0.3 }}
            />
            {/* Phase angle label */}
            <text
              x={arcRadius + 15}
              y={-10}
              fill="#EF4444"
              fontSize="12"
              fontWeight="bold"
            >
              θ = {phaseAngleDegrees.toFixed(1)}°
            </text>
          </g>
        )}

        {/* Axis labels */}
        <text x={width / 2} y={height - 10} fill="#9CA3AF" fontSize="12" textAnchor="middle">
          Time →
        </text>
        <text x={15} y={centerY} fill="#9CA3AF" fontSize="12" textAnchor="middle" transform={`rotate(-90, 15, ${centerY})`}>
          Amplitude
        </text>
      </svg>

      {/* Info Panel */}
      <div className="mt-4 w-full max-w-lg grid grid-cols-3 gap-4 text-center">
        <div className="bg-theme-surfaceLight rounded-lg p-3">
          <div className="text-red-400 font-bold text-lg">{phaseAngleDegrees.toFixed(1)}°</div>
          <div className="text-theme-textMuted text-xs">Phase Angle</div>
        </div>
        <div className="bg-theme-surfaceLight rounded-lg p-3">
          <div className="text-blue-400 font-bold text-lg">{powerFactor.toFixed(2)}</div>
          <div className="text-theme-textMuted text-xs">Power Factor</div>
        </div>
        <div className="bg-theme-surfaceLight rounded-lg p-3">
          <div className="text-amber-400 font-bold text-lg">{mw.toFixed(1)} MW</div>
          <div className="text-theme-textMuted text-xs">Real Power</div>
        </div>
      </div>

      {/* Educational Text */}
      <div className="mt-4 p-4 bg-theme-surfaceLight rounded-lg max-w-lg text-sm text-theme-textMuted">
        {powerFactor >= 0.95 ? (
          <p>
            <span className="text-green-400 font-semibold">Maximum charging/discharging capacity.</span> Voltage and current are nearly in phase.
            All inverter capacity is available for energy transfer.
          </p>
        ) : powerFactor >= 0.8 ? (
          <p>
            <span className="text-amber-400 font-semibold">Normal grid code operation.</span> Current lags voltage by {phaseAngleDegrees.toFixed(0)}°.
            Some inverter capacity is providing reactive power for voltage control.
          </p>
        ) : (
          <p>
            <span className="text-red-400 font-semibold">Heavy voltage support mode.</span> Current lags voltage by {phaseAngleDegrees.toFixed(0)}°.
            The inverter is prioritising grid stability over energy transfer. Notice the green power
            waveform dipping into negative territory — energy oscillates with the grid.
          </p>
        )}
        <p className="mt-2 text-xs opacity-70">
          Power Factor = cos(θ) = {mw.toFixed(1)} MW ÷ {mva.toFixed(1)} MVA = {powerFactor.toFixed(2)}
        </p>
      </div>
    </div>
  );
}
