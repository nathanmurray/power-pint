import { useMemo } from 'react';

export type Mode = 'fixedWorkload' | 'fixedInfrastructure';

interface PowerCalculations {
  mw: number;        // Real power (charging/discharging)
  mvar: number;      // Reactive power (voltage control)
  mva: number;       // Apparent power (inverter rating)
  liquidPercent: number;  // For beer visualization
  foamPercent: number;    // For beer visualization
  glassScale: number;     // For glass size animation (PF-based expansion)
  sizeScale: number;      // For overall visualization scaling based on MW
}

interface UsePowerCalculationsProps {
  serverLoad: number;    // MW: 0-10
  powerFactor: number;   // PF: 0.6-1.0
  mode: Mode;
  baseMVA?: number;      // Base inverter capacity (for fixed infrastructure mode)
}

export function usePowerCalculations({
  serverLoad,
  powerFactor,
  mode,
  baseMVA = 10,
}: UsePowerCalculationsProps): PowerCalculations {
  return useMemo(() => {
    if (mode === 'fixedWorkload') {
      // Fixed Workload Mode: MW stays constant, MVA (glass) grows with poor PF
      const mw = serverLoad;
      const mva = mw / powerFactor;
      const mvar = Math.sqrt(mva * mva - mw * mw);

      // In this mode, liquid stays same height but glass grows
      // So liquid percent relative to current glass size
      const liquidPercent = powerFactor * 100; // PF determines what % is liquid
      const foamPercent = (1 - powerFactor) * (mva / baseMVA) * 100;

      // Glass scales based on MVA relative to what it would be at PF=1
      const glassScale = mva / serverLoad; // = 1/PF

      // Size scale based on MW relative to max capacity (0-1 range)
      const sizeScale = serverLoad / baseMVA;

      return {
        mw,
        mvar,
        mva,
        liquidPercent,
        foamPercent,
        glassScale,
        sizeScale,
      };
    } else {
      // Fixed Infrastructure Mode: Glass (MVA) stays constant, usable MW decreases with poor PF
      const mva = baseMVA;
      const mw = mva * powerFactor;
      const mvar = Math.sqrt(mva * mva - mw * mw);

      // In this mode, glass stays same but liquid level drops
      const liquidPercent = powerFactor * 100;
      const foamPercent = (1 - powerFactor) * 100;
      const glassScale = 1; // Glass doesn't change based on PF

      // Size scale based on effective MW relative to max capacity
      const sizeScale = mw / baseMVA;

      return {
        mw,
        mvar,
        mva,
        liquidPercent,
        foamPercent,
        glassScale,
        sizeScale,
      };
    }
  }, [serverLoad, powerFactor, mode, baseMVA]);
}
