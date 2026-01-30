import { Slider } from './Slider';
import {
  MW_MIN,
  MW_MAX,
  MW_STEP,
  PF_MIN,
  PF_MIN_FIXED_WORKLOAD,
  PF_MAX,
  PF_STEP,
  getPFStatus,
  PF_STATUS_COLORS,
} from '../../config/constants';
import type { Mode } from '../../hooks/usePowerCalculations';

interface ControlPanelProps {
  serverLoad: number;
  powerFactor: number;
  mode: Mode;
  onServerLoadChange: (value: number) => void;
  onPowerFactorChange: (value: number) => void;
}

export function ControlPanel({
  serverLoad,
  powerFactor,
  mode,
  onServerLoadChange,
  onPowerFactorChange,
}: ControlPanelProps) {
  const pfStatus = getPFStatus(powerFactor);
  const pfColor = PF_STATUS_COLORS[pfStatus];

  return (
    <div className="bg-theme-surface rounded-xl p-6 space-y-6">
      <h2 className="text-lg font-semibold text-theme-text">Controls</h2>

      {/* Power Output slider - disabled in fixed infrastructure mode */}
      <div className={mode === 'fixedInfrastructure' ? 'opacity-50' : ''}>
        <Slider
          label="Power Output"
          value={serverLoad}
          min={MW_MIN}
          max={MW_MAX}
          step={MW_STEP}
          onChange={onServerLoadChange}
          unit=" MW"
          formatValue={(v) => v.toFixed(1)}
        />
        {mode === 'fixedInfrastructure' && (
          <p className="text-xs text-theme-textMuted mt-1">
            In Fixed Infrastructure mode, MW is determined by Power Factor
          </p>
        )}
      </div>

      {/* Power Factor slider */}
      <div>
        <Slider
          label="Power Factor"
          value={powerFactor}
          min={mode === 'fixedInfrastructure' ? PF_MIN : PF_MIN_FIXED_WORKLOAD}
          max={PF_MAX}
          step={PF_STEP}
          onChange={onPowerFactorChange}
          formatValue={(v) => v.toFixed(2)}
        />

        {/* PF Status indicator */}
        <div className="mt-3 flex items-center gap-2">
          <div
            className="w-3 h-3 rounded-full"
            style={{ backgroundColor: pfColor }}
          />
          <span className="text-sm text-theme-textMuted capitalize">
            {pfStatus === 'good' && 'Maximum energy transfer capacity'}
            {pfStatus === 'fair' && 'Normal grid code operation'}
            {pfStatus === 'poor' && 'Heavy voltage support mode'}
            {pfStatus === 'critical' && 'Prioritising grid stability'}
          </span>
        </div>
      </div>

      {/* Explanation based on mode */}
      <div className="text-sm text-theme-textMuted bg-theme-surfaceLight rounded-lg p-4">
        {mode === 'fixedWorkload' ? (
          <>
            <strong className="text-theme-text">Fixed Workload Mode:</strong>
            <p className="mt-1">
              Your BESS needs to deliver {serverLoad.toFixed(1)} MW of real power.
              As power factor decreases (for voltage support), more inverter capacity is needed.
            </p>
          </>
        ) : (
          <>
            <strong className="text-theme-text">Fixed Infrastructure Mode:</strong>
            <p className="mt-1">
              Your BESS inverter is rated at 10 MVA.
              As power factor decreases (for voltage support), less capacity remains for charging/discharging.
            </p>
          </>
        )}
      </div>
    </div>
  );
}
