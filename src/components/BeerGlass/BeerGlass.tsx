import { motion } from 'framer-motion';
import { GlassOutline } from './GlassOutline';
import { LiquidFill } from './LiquidFill';
import { FoamLayer } from './FoamLayer';
import { glassSpring } from '../../config/animations';

interface BeerGlassProps {
  liquidPercent: number;  // 0-100
  foamPercent: number;    // 0-100
  glassScale: number;     // 1.0 = normal, >1 = larger (PF-based expansion)
  sizeScale: number;      // 0-1 range based on MW (overall size scaling)
  mw: number;
  mvar: number;
  mva: number;
}

export function BeerGlass({
  liquidPercent,
  foamPercent,
  glassScale: _glassScale,
  sizeScale: _sizeScale,
  mw,
  mvar,
  mva,
}: BeerGlassProps) {
  // Calculate liquid top position for foam placement
  const glassHeight = 210;
  const glassTop = 15;
  const maxLiquidHeight = glassHeight - 20;
  const liquidHeight = (liquidPercent / 100) * maxLiquidHeight;
  const liquidTop = glassTop + (maxLiquidHeight - liquidHeight);

  return (
    <div className="relative flex flex-col items-center">
      {/* SVG Container with scaling - scales with MVA, reaching 1.1 at 16.7 MVA */}
      <motion.div
        className="relative"
        animate={{ scale: 0.4 + (mva / 16.7) * 0.7 }}
        transition={glassSpring}
        style={{ originX: '50%', originY: '100%' }}
      >
        <svg
          viewBox="0 0 200 250"
          className="w-48 h-64 md:w-64 md:h-80"
          style={{ overflow: 'visible' }}
        >
          {/* Liquid first (behind glass) */}
          <LiquidFill
            fillPercent={liquidPercent}
          />

          {/* Foam on top of liquid */}
          <FoamLayer
            foamPercent={foamPercent}
            liquidTop={liquidTop}
          />

          {/* Glass outline (on top) */}
          <GlassOutline scale={1} />
        </svg>
      </motion.div>

      {/* Labels */}
      <div className="mt-4 flex flex-col items-center gap-2">
        {/* Legend */}
        <div className="flex gap-4 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-gradient-to-b from-amber-500 to-amber-700" />
            <span className="text-theme-textMuted">Liquid = MW</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-gradient-to-b from-amber-50 to-amber-200" />
            <span className="text-theme-textMuted">Foam = MVAR</span>
          </div>
        </div>

        {/* Glass label */}
        <div className="flex items-center gap-2 text-sm">
          <div className="w-4 h-4 rounded border-2 border-gray-400 bg-transparent" />
          <span className="text-theme-textMuted">Glass = MVA</span>
        </div>

        {/* Quick stats */}
        <div className="flex gap-6 mt-2 text-center">
          <div>
            <div className="text-xl font-bold text-amber-500">{mw.toFixed(1)}</div>
            <div className="text-xs text-theme-textMuted">MW</div>
          </div>
          <div>
            <div className="text-xl font-bold text-amber-100">{mvar.toFixed(1)}</div>
            <div className="text-xs text-theme-textMuted">MVAR</div>
          </div>
          <div>
            <div className="text-xl font-bold text-gray-400">{mva.toFixed(1)}</div>
            <div className="text-xs text-theme-textMuted">MVA</div>
          </div>
        </div>
      </div>
    </div>
  );
}
