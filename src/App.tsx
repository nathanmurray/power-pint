import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

import { Header } from './components/Layout';
import { BeerGlass } from './components/BeerGlass';
import { ControlPanel } from './components/Controls';
import { FinancialDashboard } from './components/Dashboard';
import { PowerTriangle } from './components/SingleLineDiagram';
import { SineWaveView } from './components/SineWave';
import { HelpModal } from './components/Help';
import { usePowerCalculations, type Mode } from './hooks/usePowerCalculations';
import { MW_DEFAULT, PF_DEFAULT, BASE_MVA } from './config/constants';

import './index.css';

function App() {
  // State
  const [serverLoad, setServerLoad] = useState(MW_DEFAULT);
  const [powerFactor, setPowerFactor] = useState(PF_DEFAULT);
  const [mode, setMode] = useState<Mode>('fixedWorkload');
  const [view, setView] = useState<'beer' | 'diagram' | 'wave'>('beer');
  const [isHelpOpen, setIsHelpOpen] = useState(false);

  // Calculate power values
  const calculations = usePowerCalculations({
    serverLoad,
    powerFactor,
    mode,
    baseMVA: BASE_MVA,
  });

  // In fixed infrastructure mode, server load slider is disabled
  // The MW is calculated from MVA * PF
  const handleServerLoadChange = (value: number) => {
    if (mode === 'fixedWorkload') {
      setServerLoad(value);
    }
  };

  return (
    <div className="min-h-screen bg-theme-bg">
      {/* Header */}
      <Header
        mode={mode}
        view={view}
        onModeChange={setMode}
        onViewChange={setView}
        onHelpClick={() => setIsHelpOpen(true)}
      />

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left Column - Visualization */}
          <div className="flex flex-col items-center justify-center">
            <AnimatePresence mode="wait">
              {view === 'beer' && (
                <motion.div
                  key="beer"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                  className="flex justify-center"
                >
                  <BeerGlass
                    liquidPercent={calculations.liquidPercent}
                    foamPercent={calculations.foamPercent}
                    glassScale={calculations.glassScale}
                    sizeScale={calculations.sizeScale}
                    mw={calculations.mw}
                    mvar={calculations.mvar}
                    mva={calculations.mva}
                  />
                </motion.div>
              )}
              {view === 'diagram' && (
                <motion.div
                  key="diagram"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                  className="w-full"
                >
                  <PowerTriangle
                    mw={calculations.mw}
                    mvar={calculations.mvar}
                    mva={calculations.mva}
                    powerFactor={powerFactor}
                    sizeScale={calculations.sizeScale}
                  />
                </motion.div>
              )}
              {view === 'wave' && (
                <motion.div
                  key="wave"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                  className="w-full"
                >
                  <SineWaveView
                    mw={calculations.mw}
                    mvar={calculations.mvar}
                    mva={calculations.mva}
                    powerFactor={powerFactor}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Right Column - Controls */}
          <div className="space-y-6">
            <ControlPanel
              serverLoad={mode === 'fixedWorkload' ? serverLoad : calculations.mw}
              powerFactor={powerFactor}
              mode={mode}
              onServerLoadChange={handleServerLoadChange}
              onPowerFactorChange={setPowerFactor}
            />
          </div>
        </div>

        {/* Dashboard - Full Width */}
        <div className="mt-8">
          <FinancialDashboard
            mw={calculations.mw}
            mvar={calculations.mvar}
            mva={calculations.mva}
            powerFactor={powerFactor}
          />
        </div>
      </main>

      {/* Help Modal */}
      <HelpModal
        isOpen={isHelpOpen}
        onClose={() => setIsHelpOpen(false)}
      />
    </div>
  );
}

export default App;
