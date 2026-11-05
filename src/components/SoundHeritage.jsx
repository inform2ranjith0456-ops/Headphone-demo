import React, { useState } from 'react';
import { Disc, Sparkles, Sliders, CheckCircle2 } from 'lucide-react';
import { soundEngine } from '../utils/audioFx';

export default function SoundHeritage() {
  const [eqMode, setEqMode] = useState('studio'); // 'studio', 'bass', 'vocal'

  return (
    <section id="sound-heritage" className="relative py-28 px-6 md:px-12 bg-[#050505]">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Storytelling & Heritage (Col 6) */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full glass-panel-subtle border border-[#0050FF]/40 text-xs font-semibold text-[#00D6FF] tracking-wider uppercase">
              <Disc className="w-3.5 h-3.5 text-[#0050FF]" />
              <span>Sony Audiophile Lineage</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
              Master sound. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-[#00D6FF] to-white">
                Untouched by compression.
              </span>
            </h2>

            <p className="text-base text-white/65 leading-relaxed font-light">
              Crafted in collaboration with Sony Music Studios master engineers in Tokyo and London. WH-1000XM6 reproduces every breath, micro-harmonic, and transient exactly as the artist intended in the mastering suite.
            </p>

            <div className="space-y-4 pt-2">
              <div className="flex items-start space-x-3.5">
                <CheckCircle2 className="w-5 h-5 text-[#00D6FF] shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-semibold text-white">LDAC 990 kbps Lossless Codec</h4>
                  <p className="text-xs text-white/55 mt-0.5 leading-relaxed">
                    Transfers approximately three times more data than standard Bluetooth audio for bit-for-bit high-resolution fidelity.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3.5">
                <CheckCircle2 className="w-5 h-5 text-[#0050FF] shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-semibold text-white">DSEE Extreme AI Harmonic Synthesis</h4>
                  <p className="text-xs text-white/55 mt-0.5 leading-relaxed">
                    Edge-AI dynamically recognizes instrumentation, musical genres, and acoustic elements to restore high-range frequencies lost in compression.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3.5">
                <CheckCircle2 className="w-5 h-5 text-white/80 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-semibold text-white">Pure OFC Copper Voice Coil</h4>
                  <p className="text-xs text-white/55 mt-0.5 leading-relaxed">
                    Oxygen-free copper wiring maximizes magnetic flux density and transient responsiveness across bass frequencies down to 4Hz.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive EQ & Studio Frequency Response (Col 6) */}
          <div className="lg:col-span-6 glass-panel rounded-3xl p-8 border border-white/10 shadow-2xl relative overflow-hidden">
            <div className="flex items-center justify-between pb-6 border-b border-white/[0.08]">
              <div>
                <span className="text-xs uppercase font-mono tracking-widest text-white/40 block">Acoustic Curve</span>
                <span className="text-base font-bold text-white">Tokyo Studio Master Response</span>
              </div>

              {/* EQ Preset Selector */}
              <div className="flex items-center space-x-1.5 bg-black/50 p-1 rounded-full border border-white/10">
                {['studio', 'bass', 'vocal'].map((mode) => (
                  <button
                    key={mode}
                    onClick={() => {
                      soundEngine.playHapticTick();
                      setEqMode(mode);
                    }}
                    className={`px-3 py-1 rounded-full text-xs font-mono uppercase tracking-wider transition-all ${
                      eqMode === mode
                        ? 'bg-[#0050FF] text-white shadow-glow-blue'
                        : 'text-white/40 hover:text-white'
                    }`}
                  >
                    {mode}
                  </button>
                ))}
              </div>
            </div>

            {/* Interactive SVG Frequency Response Graph */}
            <div className="py-8 relative">
              <svg viewBox="0 0 500 220" className="w-full h-auto overflow-visible">
                {/* Horizontal grid lines */}
                <line x1="40" y1="30" x2="480" y2="30" stroke="rgba(255,255,255,0.05)" strokeDasharray="3 3" />
                <line x1="40" y1="90" x2="480" y2="90" stroke="rgba(255,255,255,0.05)" strokeDasharray="3 3" />
                <line x1="40" y1="150" x2="480" y2="150" stroke="rgba(255,255,255,0.05)" strokeDasharray="3 3" />
                <line x1="40" y1="190" x2="480" y2="190" stroke="rgba(255,255,255,0.1)" />

                {/* dB Labels */}
                <text x="25" y="34" fill="rgba(255,255,255,0.3)" fontSize="9" fontFamily="monospace">+10dB</text>
                <text x="25" y="94" fill="rgba(255,255,255,0.3)" fontSize="9" fontFamily="monospace"> 0dB</text>
                <text x="25" y="154" fill="rgba(255,255,255,0.3)" fontSize="9" fontFamily="monospace">-10dB</text>

                {/* Frequency Hz Labels */}
                <text x="50" y="208" fill="rgba(255,255,255,0.3)" fontSize="9" fontFamily="monospace">20Hz</text>
                <text x="180" y="208" fill="rgba(255,255,255,0.3)" fontSize="9" fontFamily="monospace">1kHz</text>
                <text x="320" y="208" fill="rgba(255,255,255,0.3)" fontSize="9" fontFamily="monospace">8kHz</text>
                <text x="440" y="208" fill="rgba(255,255,255,0.3)" fontSize="9" fontFamily="monospace">40kHz</text>

                {/* Harman target / standard headphone (faint reference) */}
                <path
                  d="M 50 110 C 120 95, 200 90, 270 90 C 350 90, 390 60, 460 120"
                  fill="none"
                  stroke="rgba(255,255,255,0.18)"
                  strokeWidth="1.5"
                  strokeDasharray="4 4"
                />

                {/* WH-1000XM6 Dynamic EQ curve */}
                <path
                  d={
                    eqMode === 'studio'
                      ? "M 50 82 C 110 82, 170 88, 250 89 C 320 90, 380 75, 460 84"
                      : eqMode === 'bass'
                      ? "M 50 48 C 110 52, 170 78, 250 89 C 320 90, 380 75, 460 84"
                      : "M 50 102 C 110 98, 170 82, 250 68 C 320 62, 380 70, 460 86"
                  }
                  fill="none"
                  stroke="#00D6FF"
                  strokeWidth="3"
                  className="transition-all duration-700 ease-out"
                />

                {/* Gradient area under curve */}
                <path
                  d={
                    eqMode === 'studio'
                      ? "M 50 82 C 110 82, 170 88, 250 89 C 320 90, 380 75, 460 84 L 460 190 L 50 190 Z"
                      : eqMode === 'bass'
                      ? "M 50 48 C 110 52, 170 78, 250 89 C 320 90, 380 75, 460 84 L 460 190 L 50 190 Z"
                      : "M 50 102 C 110 98, 170 82, 250 68 C 320 62, 380 70, 460 86 L 460 190 L 50 190 Z"
                  }
                  fill="url(#curveGradient)"
                  className="transition-all duration-700 ease-out"
                />

                <defs>
                  <linearGradient id="curveGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#00D6FF" stopOpacity="0.25" />
                    <stop offset="100%" stopColor="#0050FF" stopOpacity="0.0" />
                  </linearGradient>
                </defs>
              </svg>
            </div>

            <div className="pt-4 border-t border-white/[0.08] flex items-center justify-between text-xs">
              <span className="text-white/60">
                {eqMode === 'studio' && 'Studio Reference: Perfectly flat mid-range with linear sub-bass extension.'}
                {eqMode === 'bass' && 'Warm Punch: +6dB sub-bass boost tuned for electronic & orchestral scores.'}
                {eqMode === 'vocal' && 'Intimate Acoustic: +4dB presence boost for vocals and string quartets.'}
              </span>
              <span className="font-mono text-[#00D6FF] shrink-0 ml-4 font-bold">
                0.003% THD
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

