// Server Load (MW) constraints
export const MW_MIN = 0;
export const MW_MAX = 10;
export const MW_DEFAULT = 5;
export const MW_STEP = 0.1;

// Power Factor constraints
export const PF_MIN = 0;
export const PF_MAX = 1.0;
export const PF_DEFAULT = 0.85;
export const PF_STEP = 0.01;

// Base infrastructure capacity
export const BASE_MVA = 10;

// Cost per MVA (arbitrary units)
export const BASE_COST_PER_MVA = 1000;

// Animation durations (ms)
export const ANIMATION_DURATION = 300;
export const WAVE_DURATION = 3000;

// SVG dimensions
export const GLASS_WIDTH = 200;
export const GLASS_HEIGHT = 300;
export const GLASS_PADDING = 20;

// Power factor thresholds for color coding
export const PF_GOOD = 0.95;
export const PF_FAIR = 0.85;
export const PF_POOR = 0.75;

// Get status color based on power factor
export const getPFStatus = (pf: number): 'good' | 'fair' | 'poor' | 'critical' => {
  if (pf >= PF_GOOD) return 'good';
  if (pf >= PF_FAIR) return 'fair';
  if (pf >= PF_POOR) return 'poor';
  return 'critical';
};

export const PF_STATUS_COLORS = {
  good: '#10B981',    // Green
  fair: '#F59E0B',    // Yellow/Amber
  poor: '#F97316',    // Orange
  critical: '#EF4444', // Red
};
