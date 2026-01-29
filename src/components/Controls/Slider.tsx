import * as SliderPrimitive from '@radix-ui/react-slider';

interface SliderProps {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (value: number) => void;
  unit?: string;
  formatValue?: (value: number) => string;
}

export function Slider({
  label,
  value,
  min,
  max,
  step,
  onChange,
  unit = '',
  formatValue = (v) => v.toFixed(2),
}: SliderProps) {
  return (
    <div className="w-full">
      <div className="flex justify-between mb-2">
        <label className="text-sm font-medium text-theme-text">{label}</label>
        <span className="text-sm font-mono text-theme-accent">
          {formatValue(value)}{unit}
        </span>
      </div>
      <SliderPrimitive.Root
        className="relative flex items-center select-none touch-none w-full h-5"
        value={[value]}
        min={min}
        max={max}
        step={step}
        onValueChange={([newValue]) => onChange(newValue)}
      >
        <SliderPrimitive.Track className="slider-track">
          <SliderPrimitive.Range className="slider-range" />
        </SliderPrimitive.Track>
        <SliderPrimitive.Thumb className="slider-thumb" aria-label={label} />
      </SliderPrimitive.Root>
      <div className="flex justify-between mt-1">
        <span className="text-xs text-theme-textMuted">{min}{unit}</span>
        <span className="text-xs text-theme-textMuted">{max}{unit}</span>
      </div>
    </div>
  );
}
