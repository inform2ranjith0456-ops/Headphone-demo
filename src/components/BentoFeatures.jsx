import React from 'react';
import { BatteryCharging, Cpu, Radio, Sparkles, Sliders, Compass, Mic, Award } from 'lucide-react';

export default function BentoFeatures() {
  return (
    <section id="architecture" className="relative py-28 px-6 md:px-12 bg-[#050505]">
      <div className="max-w-7xl mx-auto">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-20">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full glass-panel-subtle border border-[#0050FF]/40 text-xs font-semibold text-[#A5C4FF] tracking-wider uppercase">
            <Award className="w-3.5 h-3.5 text-[#0050FF]" />
            <span>Mastery in Every Detail</span>
          </div>

          <h2 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white leading-tight">
            Designed for focus. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-[#00D6FF] to-white">
              Engineered for endurance.
            </span>
          </h2>

          <p className="text-base text-white/60 font-light leading-relaxed">
            Every curve, component, and algorithm in WH-1000XM6 is obsessively refined to disappear the moment you put them on.
          </p>
        </div>

        {/* Apple-style Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Card 1: Dual Processor V2 + QN3 (Col 7) */}
          <div className="md:col-span-7 glass-panel rounded-3xl p-8 md:p-10 border border-white/10 relative overflow-hidden group hover:border-[#0050FF]/40 transition-all">
            <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-bl from-[#0050FF]/15 to-transparent rounded-full blur-3xl pointer-events-none" />
            <div className="flex items-center space-x-3 mb-6">
              <span className="p-2.5 rounded-2xl bg-[#0050FF]/20 text-[#00D6FF] border border-[#0050FF]/30">
                <Cpu className="w-6 h-6" />
              </span>
              <span className="text-xs uppercase font-mono tracking-widest text-white/40">Neural Computing</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mb-3">
              Dual Processor V2 + HD QN3
            </h3>
            <p className="text-sm sm:text-base text-white/65 leading-relaxed font-light max-w-lg mb-8">
              A custom dual-silicon architecture pairs an ultra-efficient host controller with the dedicated QN3 DSP. Ambient frequency profiles are sampled and counter-balanced with sub-millisecond precision.
            </p>

            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-white/[0.08]">
              <div>
                <div className="text-2xl font-extrabold text-white font-mono">700k</div>
                <div className="text-xs text-white/40 mt-0.5">Calculations / Sec</div>
              </div>
              <div>
                <div className="text-2xl font-extrabold text-[#00D6FF] font-mono">32-bit</div>
                <div className="text-xs text-white/40 mt-0.5">Audio DAC Precision</div>
              </div>
              <div>
                <div className="text-2xl font-extrabold text-white font-mono">-42 dB</div>
                <div className="text-xs text-white/40 mt-0.5">Peak Noise Reduction</div>
              </div>
            </div>
          </div>

          {/* Card 2: 40-Hour Battery & Ultra Fast Charge (Col 5) */}
          <div className="md:col-span-5 glass-panel rounded-3xl p-8 md:p-10 border border-white/10 relative overflow-hidden group hover:border-[#00D6FF]/40 transition-all flex flex-col justify-between">
            <div className="absolute -bottom-10 -right-10 w-60 h-60 bg-[#00D6FF]/10 rounded-full blur-3xl pointer-events-none" />
            <div>
              <div className="flex items-center space-x-3 mb-6">
                <span className="p-2.5 rounded-2xl bg-[#00D6FF]/20 text-[#00D6FF] border border-[#00D6FF]/30">
                  <BatteryCharging className="w-6 h-6" />
                </span>
                <span className="text-xs uppercase font-mono tracking-widest text-white/40">Battery & Power</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mb-3">
                40 Hours of Pure Playback
              </h3>
              <p className="text-sm text-white/65 leading-relaxed font-light">
                Fly from Tokyo to New York and back on a single charge with ANC engaged.
              </p>
            </div>

            <div className="mt-8 p-4 rounded-2xl bg-black/40 border border-white/[0.06] flex items-center justify-between">
              <div>
                <span className="text-[11px] text-white/50 uppercase tracking-wider block">Fast Fuel</span>
                <span className="text-lg font-bold text-white">3 Min Charge</span>
              </div>
              <span className="h-8 w-[1px] bg-white/10"></span>
              <div className="text-right">
                <span className="text-[11px] text-[#00D6FF] uppercase tracking-wider block">Yield</span>
                <span className="text-lg font-bold text-[#00D6FF]">5 Hours Playback</span>
              </div>
            </div>
          </div>

          {/* Card 3: Multipoint Audio (Col 4) */}
          <div className="md:col-span-4 glass-panel rounded-3xl p-8 border border-white/10 relative overflow-hidden group hover:border-white/20 transition-all">
            <div className="flex items-center space-x-3 mb-6">
              <span className="p-2.5 rounded-2xl bg-white/[0.06] text-white">
                <Radio className="w-5 h-5" />
              </span>
              <span className="text-xs uppercase font-mono tracking-widest text-white/40">Connectivity</span>
            </div>
            <h4 className="text-xl font-bold text-white mb-2">Multipoint Bluetooth 5.4</h4>
            <p className="text-xs sm:text-sm text-white/60 leading-relaxed font-light">
              Pair simultaneously with your laptop and smartphone. Receive a phone call while watching a movie and audio switches instantaneously.
            </p>
          </div>

          {/* Card 4: 360 Reality Audio & Spatial Head Tracking (Col 4) */}
          <div className="md:col-span-4 glass-panel rounded-3xl p-8 border border-white/10 relative overflow-hidden group hover:border-white/20 transition-all">
            <div className="flex items-center space-x-3 mb-6">
              <span className="p-2.5 rounded-2xl bg-white/[0.06] text-[#00D6FF]">
                <Compass className="w-5 h-5" />
              </span>
              <span className="text-xs uppercase font-mono tracking-widest text-white/40">Spatial Acoustic</span>
            </div>
            <h4 className="text-xl font-bold text-white mb-2">360 Head-Tracking</h4>
            <p className="text-xs sm:text-sm text-white/60 leading-relaxed font-light">
              Gyroscopic head tracking locks sonic instruments in 3D physical space, placing you in the center of the recording studio.
            </p>
          </div>

          {/* Card 5: Intelligent Speak-to-Chat (Col 4) */}
          <div className="md:col-span-4 glass-panel rounded-3xl p-8 border border-white/10 relative overflow-hidden group hover:border-white/20 transition-all">
            <div className="flex items-center space-x-3 mb-6">
              <span className="p-2.5 rounded-2xl bg-white/[0.06] text-white">
                <Mic className="w-5 h-5" />
              </span>
              <span className="text-xs uppercase font-mono tracking-widest text-white/40">Voice AI</span>
            </div>
            <h4 className="text-xl font-bold text-white mb-2">Speak-to-Chat v2</h4>
            <p className="text-xs sm:text-sm text-white/60 leading-relaxed font-light">
              As soon as you speak to a flight attendant or colleague, music automatically fades and ambient transparency engages instantly.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

