import React, { useState } from 'react';
import { COLORWAYS } from '../utils/constants';
import { Check, Palette } from 'lucide-react';
import { soundEngine } from '../utils/audioFx';

export default function ColorwaySelector({ selectedColor, onSelectColor }) {
  const activeColor = COLORWAYS.find((c) => c.id === selectedColor) || COLORWAYS[0];

  return (
    <section className="relative py-24 px-6 md:px-12 bg-[#050505] border-t border-white/[0.04]">
      <div className="max-w-5xl mx-auto text-center">
        <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full glass-panel-subtle border border-white/10 text-xs font-semibold text-white/70 tracking-wider uppercase mb-6">
          <Palette className="w-3.5 h-3.5 text-[#00D6FF]" />
          <span>Finishes & Materials</span>
        </div>

        <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white mb-4">
          Three iconic expressions.
        </h2>
        <p className="text-base text-white/60 max-w-xl mx-auto font-light mb-12">
          Anodized aluminum yokes, fingerprint-resistant micro-texture coating, and ultra-soft memory foam synthetic leather cushions.
        </p>

        {/* Selected Color Banner & Swatches */}
        <div className="glass-panel max-w-xl mx-auto rounded-3xl p-6 sm:p-8 border border-white/10 shadow-2xl">
          {/* Color Title */}
          <div className="text-xl font-bold text-white tracking-tight mb-1">
            {activeColor.name}
          </div>
          <p className="text-xs text-white/60 max-w-md mx-auto mb-8">
            {activeColor.desc}
          </p>

          {/* Color Swatch Circles */}
          <div className="flex items-center justify-center space-x-6">
            {COLORWAYS.map((c) => {
              const isSelected = selectedColor === c.id;
              return (
                <button
                  key={c.id}
                  onClick={() => {
                    soundEngine.playHapticTick();
                    onSelectColor(c.id);
                  }}
                  className="flex flex-col items-center space-y-2 group cursor-pointer"
                  aria-label={`Select ${c.name}`}
                >
                  <div
                    className={`relative w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${
                      isSelected
                        ? 'ring-2 ring-offset-4 ring-offset-[#050505] scale-110 shadow-glow-blue'
                        : 'opacity-70 hover:opacity-100 hover:scale-105'
                    }`}
                    style={{
                      backgroundColor: c.hex,
                      borderColor: isSelected ? c.accent : 'rgba(255,255,255,0.2)',
                      borderWidth: '1px',
                    }}
                  >
                    {isSelected && (
                      <Check
                        className={`w-4 h-4 ${
                          c.id === 'platinum-silver' ? 'text-black' : 'text-white'
                        }`}
                      />
                    )}
                  </div>
                  <span className={`text-[11px] tracking-tight ${isSelected ? 'text-white font-medium' : 'text-white/40'}`}>
                    {c.name}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

