import * as Toggle from '@radix-ui/react-toggle';
import type { Mode } from '../../hooks/usePowerCalculations';

interface HeaderProps {
  mode: Mode;
  view: 'beer' | 'diagram' | 'wave';
  onModeChange: (mode: Mode) => void;
  onViewChange: (view: 'beer' | 'diagram' | 'wave') => void;
  onHelpClick: () => void;
}

export function Header({
  mode,
  view,
  onModeChange,
  onViewChange,
  onHelpClick,
}: HeaderProps) {
  return (
    <header className="bg-theme-surface border-b border-theme-surfaceLight">
      <div className="max-w-6xl mx-auto px-4 py-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          {/* Logo/Title */}
          <div className="flex items-center gap-3">
            <span className="text-3xl">🍺</span>
            <div>
              <h1 className="text-xl font-bold text-theme-text">
                The Power Pint
              </h1>
              <p className="text-sm text-theme-textMuted">
                BESS Power Factor Visualised
              </p>
            </div>
          </div>

          {/* Controls */}
          <div className="flex flex-wrap items-center gap-4">
            {/* Mode Toggle */}
            <div className="flex items-center gap-2">
              <span className="text-sm text-theme-textMuted">Mode:</span>
              <div className="flex bg-theme-surfaceLight rounded-full p-1">
                <Toggle.Root
                  className={`px-3 py-1.5 text-sm rounded-full transition-colors ${
                    mode === 'fixedWorkload'
                      ? 'bg-theme-accent text-white'
                      : 'text-theme-textMuted hover:text-theme-text'
                  }`}
                  pressed={mode === 'fixedWorkload'}
                  onPressedChange={() => onModeChange('fixedWorkload')}
                >
                  Fixed Workload
                </Toggle.Root>
                <Toggle.Root
                  className={`px-3 py-1.5 text-sm rounded-full transition-colors ${
                    mode === 'fixedInfrastructure'
                      ? 'bg-theme-accent text-white'
                      : 'text-theme-textMuted hover:text-theme-text'
                  }`}
                  pressed={mode === 'fixedInfrastructure'}
                  onPressedChange={() => onModeChange('fixedInfrastructure')}
                >
                  Fixed Infrastructure
                </Toggle.Root>
              </div>
            </div>

            {/* View Toggle */}
            <div className="flex items-center gap-2">
              <span className="text-sm text-theme-textMuted">View:</span>
              <div className="flex bg-theme-surfaceLight rounded-full p-1">
                <Toggle.Root
                  className={`px-3 py-1.5 text-sm rounded-full transition-colors ${
                    view === 'beer'
                      ? 'bg-theme-accent text-white'
                      : 'text-theme-textMuted hover:text-theme-text'
                  }`}
                  pressed={view === 'beer'}
                  onPressedChange={() => onViewChange('beer')}
                >
                  🍺 Beer
                </Toggle.Root>
                <Toggle.Root
                  className={`px-3 py-1.5 text-sm rounded-full transition-colors ${
                    view === 'diagram'
                      ? 'bg-theme-accent text-white'
                      : 'text-theme-textMuted hover:text-theme-text'
                  }`}
                  pressed={view === 'diagram'}
                  onPressedChange={() => onViewChange('diagram')}
                >
                  📐 Diagram
                </Toggle.Root>
                <Toggle.Root
                  className={`px-3 py-1.5 text-sm rounded-full transition-colors ${
                    view === 'wave'
                      ? 'bg-theme-accent text-white'
                      : 'text-theme-textMuted hover:text-theme-text'
                  }`}
                  pressed={view === 'wave'}
                  onPressedChange={() => onViewChange('wave')}
                >
                  ⚡ Wave
                </Toggle.Root>
              </div>
            </div>

            {/* Help Button */}
            <button
              onClick={onHelpClick}
              className="flex items-center gap-2 px-4 py-2 bg-theme-surfaceLight hover:bg-theme-surface rounded-full text-sm text-theme-textMuted hover:text-theme-text transition-colors"
            >
              <span>❓</span>
              Help
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
