import * as Dialog from '@radix-ui/react-dialog';
import { motion, AnimatePresence } from 'framer-motion';

interface HelpModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function HelpModal({ isOpen, onClose }: HelpModalProps) {
  return (
    <Dialog.Root open={isOpen} onOpenChange={onClose}>
      <AnimatePresence>
        {isOpen && (
          <Dialog.Portal forceMount>
            <Dialog.Overlay asChild>
              <motion.div
                className="fixed inset-0 bg-black/60 z-40"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              />
            </Dialog.Overlay>

            <Dialog.Content asChild>
              <motion.div
                className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] max-w-2xl max-h-[85vh] overflow-y-auto bg-theme-surface rounded-2xl p-6 z-50 shadow-xl"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
              >
                <Dialog.Title className="text-2xl font-bold text-theme-text mb-2">
                  🍺 Understanding The Power Pint
                </Dialog.Title>

                <Dialog.Description className="text-theme-textMuted mb-6">
                  A visual explanation of MW, MVA, MVAR, and Power Factor for BESS
                </Dialog.Description>

                <div className="space-y-6 text-theme-text">
                  {/* The Analogy */}
                  <section>
                    <h3 className="text-lg font-semibold mb-2 text-amber-400">
                      The Beer Glass Analogy
                    </h3>
                    <div className="bg-theme-surfaceLight rounded-lg p-4 space-y-3">
                      <div className="flex gap-3">
                        <span className="text-2xl">🍺</span>
                        <div>
                          <strong>The Glass = MVA (Apparent Power)</strong>
                          <p className="text-sm text-theme-textMuted">
                            Your inverter's total rating - the nameplate MVA capacity of your BESS.
                          </p>
                        </div>
                      </div>

                      <div className="flex gap-3">
                        <span className="text-2xl">🟠</span>
                        <div>
                          <strong>The Liquid = MW (Real Power)</strong>
                          <p className="text-sm text-theme-textMuted">
                            Power available for charging or discharging the battery. This is the energy transfer!
                          </p>
                        </div>
                      </div>

                      <div className="flex gap-3">
                        <span className="text-2xl">🫧</span>
                        <div>
                          <strong>The Foam = MVAR (Reactive Power)</strong>
                          <p className="text-sm text-theme-textMuted">
                            Reactive power capacity reserved for voltage control under UK grid code.
                          </p>
                        </div>
                      </div>
                    </div>
                  </section>

                  {/* Power Factor */}
                  <section>
                    <h3 className="text-lg font-semibold mb-2 text-blue-400">
                      Power Factor Explained
                    </h3>
                    <p className="text-theme-textMuted mb-3">
                      Power Factor (PF) is the ratio of real power (MW) to apparent power (MVA).
                      It determines how much of your inverter capacity is available for energy transfer vs voltage support.
                    </p>
                    <div className="bg-theme-surfaceLight rounded-lg p-4">
                      <code className="text-amber-400">
                        Power Factor = MW ÷ MVA
                      </code>
                      <ul className="mt-3 space-y-2 text-sm">
                        <li className="flex items-center gap-2">
                          <span className="w-3 h-3 rounded-full bg-green-500" />
                          <span><strong>PF = 1.0:</strong> All capacity for charging/discharging (no voltage support)</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <span className="w-3 h-3 rounded-full bg-yellow-500" />
                          <span><strong>PF = 0.85:</strong> Normal grid operation with some reactive power</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <span className="w-3 h-3 rounded-full bg-red-500" />
                          <span><strong>PF = 0.6:</strong> Heavy voltage support mode - 40% capacity for MVAR</span>
                        </li>
                      </ul>
                    </div>
                    <p className="text-theme-textMuted mt-3 text-sm">
                      Under the UK grid code, Battery Energy Storage Systems must provide reactive power
                      capability for voltage control. When grid voltage needs support, your BESS may operate
                      at a power factor less than 1.0 to inject or absorb reactive power.
                    </p>
                  </section>

                  {/* The Two Modes */}
                  <section>
                    <h3 className="text-lg font-semibold mb-2 text-purple-400">
                      Two Ways to Think About It
                    </h3>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="bg-theme-surfaceLight rounded-lg p-4">
                        <h4 className="font-semibold mb-2">Fixed Workload Mode</h4>
                        <p className="text-sm text-theme-textMuted">
                          "I need X MW of charge/discharge capability."
                        </p>
                        <p className="text-sm text-theme-textMuted mt-2">
                          As power factor decreases (for voltage support), more inverter capacity is needed
                          to deliver the same MW. You need a <em>bigger glass</em> for the same liquid.
                        </p>
                      </div>

                      <div className="bg-theme-surfaceLight rounded-lg p-4">
                        <h4 className="font-semibold mb-2">Fixed Infrastructure Mode</h4>
                        <p className="text-sm text-theme-textMuted">
                          "My BESS inverter is rated at 10 MVA."
                        </p>
                        <p className="text-sm text-theme-textMuted mt-2">
                          As power factor decreases (for voltage support), less capacity remains for
                          charging/discharging. The glass stays the same but has <em>less liquid</em>.
                        </p>
                      </div>
                    </div>
                  </section>

                  {/* Real World */}
                  <section>
                    <h3 className="text-lg font-semibold mb-2 text-green-400">
                      Why Does This Matter?
                    </h3>
                    <ul className="space-y-2 text-theme-textMuted">
                      <li>
                        ⚡ <strong>Grid Code:</strong> UK grid code requires BESS to provide reactive power
                        for voltage regulation. National Grid ESO mandates this capability.
                      </li>
                      <li>
                        🔋 <strong>Capacity:</strong> Your inverter's MVA rating limits total power.
                        Lower PF = less MW available for energy trading.
                      </li>
                      <li>
                        📊 <strong>Voltage Control:</strong> Reactive power helps maintain grid voltage
                        within acceptable limits, supporting network stability.
                      </li>
                    </ul>
                  </section>
                </div>

                <Dialog.Close asChild>
                  <button
                    className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-theme-surfaceLight hover:bg-theme-surface text-theme-textMuted hover:text-theme-text transition-colors"
                    aria-label="Close"
                  >
                    ✕
                  </button>
                </Dialog.Close>
              </motion.div>
            </Dialog.Content>
          </Dialog.Portal>
        )}
      </AnimatePresence>
    </Dialog.Root>
  );
}
