import React from 'react';
import { SPECS_COMPARISON } from '../utils/constants';
import { Sliders, Sparkles, Check, Minus } from 'lucide-react';

export default function SpecsComparison({ onOpenPreorder }) {
  return (
    <section id="specs-matrix" className="relative py-28 px-6 md:px-12 bg-[#050505] border-t border-white/[0.04]">
      <div className="max-w-6xl mx-auto">
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full glass-panel-subtle border border-[#0050FF]/40 text-xs font-semibold text-[#00D6FF] tracking-wider uppercase">
            <Sliders className="w-3.5 h-3.5 text-[#0050FF]" />
            <span>Architectural Comparison</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
            Compare flagship models.
          </h2>

          <p className="text-base text-white/60 font-light leading-relaxed">
            See how the new generation of Sony acoustic engineering elevates performance across every core acoustic dimension.
          </p>
        </div>

        {/* Matrix Table */}
        <div className="glass-panel rounded-3xl border border-white/10 overflow-hidden shadow-2xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/[0.08] bg-white/[0.02]">
                  <th className="py-6 px-6 text-xs uppercase font-mono tracking-widest text-white/40 w-1/4">
                    Specification
                  </th>
                  <th className="py-6 px-6 w-1/3 bg-[#0050FF]/[0.08] border-x border-[#0050FF]/20">
                    <div className="flex items-center space-x-2">
                      <span className="text-sm sm:text-base font-bold text-white tracking-tight">
                        Sony WH-1000XM6
                      </span>
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-[#00D6FF]/20 text-[#00D6FF] border border-[#00D6FF]/30">
                        NEW
                      </span>
                    </div>
                    <div className="text-xs text-white/50 mt-1">$449.99</div>
                  </th>
                  <th className="py-6 px-6 w-1/4">
                    <div className="text-sm sm:text-base font-semibold text-white/70">
                      Sony WH-1000XM5
                    </div>
                    <div className="text-xs text-white/40 mt-1">$399.99</div>
                  </th>
                  <th className="py-6 px-6 w-1/4">
                    <div className="text-sm sm:text-base font-semibold text-white/70">
                      AirPods Max
                    </div>
                    <div className="text-xs text-white/40 mt-1">$549.00</div>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.06] text-xs sm:text-sm">
                {SPECS_COMPARISON.map((row, idx) => (
                  <tr key={idx} className="hover:bg-white/[0.02] transition-colors">
                    <td className="py-4 px-6 font-medium text-white/80">
                      <div>{row.feature}</div>
                      <div className="text-[11px] text-white/40 font-mono mt-0.5">{row.category}</div>
                    </td>
                    <td className="py-4 px-6 font-semibold text-white bg-[#0050FF]/[0.05] border-x border-[#0050FF]/20">
                      <div className="flex items-center space-x-2">
                        <span className="text-[#00D6FF] font-bold">●</span>
                        <span>{row.xm6}</span>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-white/60">
                      {row.xm5}
                    </td>
                    <td className="py-4 px-6 text-white/60">
                      {row.airpodsMax}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Footer CTA within table */}
          <div className="p-6 bg-white/[0.02] border-t border-white/[0.08] flex flex-col sm:flex-row items-center justify-between gap-4">
            <span className="text-xs text-white/50">
              Includes 1-year Sony North America Limited Warranty + 30-day risk-free home trial.
            </span>
            <button
              onClick={onOpenPreorder}
              className="px-6 py-2.5 rounded-full bg-gradient-to-r from-[#0050FF] to-[#00D6FF] text-white text-xs font-semibold tracking-tight shadow-glow-blue hover:opacity-90 transition-opacity"
            >
              Pre-order WH-1000XM6 • $449
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

