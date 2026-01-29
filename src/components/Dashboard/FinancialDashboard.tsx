import { MetricCard } from './MetricCard';

interface FinancialDashboardProps {
  mw: number;
  mvar: number;
  mva: number;
  powerFactor: number;
}

export function FinancialDashboard({
  mw,
  mvar,
  mva,
  powerFactor,
}: FinancialDashboardProps) {
  // Calculate capacity utilisation percentage
  const capacityUtilisation = powerFactor * 100;

  // Calculate available grid services capacity (MVAR as % of MVA)
  const gridServicesPercent = (mvar / mva) * 100;

  return (
    <div className="bg-theme-surface rounded-xl p-6">
      <h2 className="text-lg font-semibold text-theme-text mb-4">
        Power Metrics
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <MetricCard
          label="Real Power"
          value={mw}
          unit="MW"
          color="text-amber-500"
          description="Charge/discharge power (beer in glass)"
        />

        <MetricCard
          label="Reactive Power"
          value={mvar}
          unit="MVAR"
          color="text-amber-100"
          description="Voltage control capacity (foam)"
        />

        <MetricCard
          label="Apparent Power"
          value={mva}
          unit="MVA"
          color="text-gray-400"
          description="Inverter rating (glass size)"
        />

        <MetricCard
          label="Grid Services"
          value={gridServicesPercent}
          unit="%"
          color="text-blue-400"
          description="Capacity reserved for voltage support"
        />
      </div>

      {/* Capacity utilisation summary */}
      <div className="mt-6 p-4 bg-theme-surfaceLight rounded-lg">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <div className="text-sm text-theme-textMuted">
              Capacity Utilisation
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold text-theme-text">
                {capacityUtilisation.toFixed(1)}%
              </span>
              <span className="text-sm text-theme-textMuted">
                of inverter capacity for energy transfer
              </span>
            </div>
          </div>

          {gridServicesPercent > 5 && (
            <div className="text-right">
              <div className="text-sm text-theme-textMuted">
                Voltage Support Mode
              </div>
              <div className="text-xl font-bold text-blue-400">
                {gridServicesPercent.toFixed(1)}% for grid services
              </div>
              <div className="text-xs text-theme-textMuted">
                Reactive power for UK grid code compliance
              </div>
            </div>
          )}
        </div>

        {/* Progress bar */}
        <div className="mt-4">
          <div className="h-3 bg-theme-surface rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-amber-600 to-amber-400 transition-all duration-300"
              style={{ width: `${capacityUtilisation}%` }}
            />
          </div>
          <div className="flex justify-between mt-1 text-xs text-theme-textMuted">
            <span>0% (all reactive)</span>
            <span>100% (all real power)</span>
          </div>
        </div>
      </div>
    </div>
  );
}
