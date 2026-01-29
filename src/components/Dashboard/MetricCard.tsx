import { motion } from 'framer-motion';
import { quickTransition } from '../../config/animations';

interface MetricCardProps {
  label: string;
  value: number;
  unit: string;
  icon?: React.ReactNode;
  color?: string;
  description?: string;
}

export function MetricCard({
  label,
  value,
  unit,
  icon,
  color = 'text-theme-accent',
  description,
}: MetricCardProps) {
  return (
    <div className="bg-theme-surfaceLight rounded-lg p-4 flex flex-col">
      <div className="flex items-center gap-2 mb-2">
        {icon && <span className="text-lg">{icon}</span>}
        <span className="text-sm text-theme-textMuted">{label}</span>
      </div>

      <motion.div
        className={`text-2xl md:text-3xl font-bold ${color}`}
        key={value.toFixed(2)}
        initial={{ scale: 1.1, opacity: 0.7 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={quickTransition}
      >
        {value.toFixed(2)}
        <span className="text-sm font-normal text-theme-textMuted ml-1">
          {unit}
        </span>
      </motion.div>

      {description && (
        <p className="text-xs text-theme-textMuted mt-2">{description}</p>
      )}
    </div>
  );
}
