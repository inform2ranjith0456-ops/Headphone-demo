import React, { useState, useEffect, useRef } from 'react';
import { Shield, ShieldOff, Ear, Volume2, Sparkles, Wind, Train, Coffee } from 'lucide-react';
import { soundEngine } from '../utils/audioFx';

const ENVIRONMENTS = [
  { id: 'flight', name: 'Boeing 787 Cabin', noiseLevel: '84 dB', icon: Wind, desc: 'Low-frequency continuous jet turbine rumble' },
  { id: 'transit', name: 'Tokyo Shinkansen', noiseLevel: '79 dB', icon: Train, desc: 'High-speed wheel-rail friction & wind turbulence' },
  { id: 'cafe', name: 'Shibuya Cafe', noiseLevel: '72 dB', icon: Coffee, desc: 'Mid-frequency human chatter & espresso machines' },
];

export default function AncSimulator() {
  const [activeEnv, setActiveEnv] = useState('flight');
  const [ancMode, setAncMode] = useState('anc'); // 'anc', 'ambient', 'off'
  const canvasRef = useRef(null);

  const handleModeChange = (mode) => {
    setAncMode(mode);
    soundEngine.setAncMode(mode);
  };

  // Real-time Audio Waveform Simulation Canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let frameId;
    let t = 0;

    const render = () => {
      t += 0.04;
      const w = canvas.width;
      const h = canvas.height;
      ctx.clearRect(0, 0, w, h);

      // Background grid lines
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.04)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(0, h / 2);
      ctx.lineTo(w, h / 2);
      ctx.stroke();

      // Ambient Noise Wave (Cyan / Red depending on mode)
      let noiseAmp = 35;
      if (activeEnv === 'transit') noiseAmp = 42;
      if (activeEnv === 'cafe') noiseAmp = 28;

      let canceledAmp = noiseAmp;
      if (ancMode === 'anc') {
        canceledAmp = noiseAmp * 0.05; // 95% attenuation!
      } else if (ancMode === 'ambient') {
        canceledAmp = noiseAmp * 0.65;
      }

      // Draw original ambient frequency (faint dashed)
      ctx.beginPath();
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
      ctx.setLineDash([4, 4]);
      for (let x = 0; x < w; x++) {
        const y = h / 2 + Math.sin(x * 0.03 + t) * noiseAmp * 0.6 + Math.cos(x * 0.08 - t * 1.5) * noiseAmp * 0.4;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();
      ctx.setLineDash([]);

      // Draw Anti-Phase Wave (QN3 Processor signal in Sony Blue)
      if (ancMode === 'anc') {
        ctx.beginPath();
        ctx.strokeStyle = 'rgba(0, 80, 255, 0.5)';
        ctx.lineWidth = 1.5;
        for (let x = 0; x < w; x++) {
          // Inverted phase
          const y = h / 2 - (Math.sin(x * 0.03 + t) * noiseAmp * 0.58 + Math.cos(x * 0.08 - t * 1.5) * noiseAmp * 0.38);
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
      }

      // Draw Resulting Acoustic Wave heard by user (Electric Cyan)
      ctx.beginPath();
      ctx.strokeStyle = ancMode === 'anc' ? '#00D6FF' : ancMode === 'ambient' ? '#FFB800' : '#FF4D4D';
      ctx.lineWidth = ancMode === 'anc' ? 2 : 2.5;
      ctx.shadowColor = ancMode === 'anc' ? 'rgba(0, 214, 255, 0.6)' : 'rgba(255, 77, 77, 0.4)';
      ctx.shadowBlur = 10;

      for (let x = 0; x < w; x++) {
        const jitter = ancMode === 'anc' ? (Math.random() - 0.5) * 1.5 : 0;
        const y = h / 2 + Math.sin(x * 0.035 + t) * canceledAmp + jitter;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();
      ctx.shadowBlur = 0;

      frameId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(frameId);
  }, [activeEnv, ancMode]);

  return (
    <section id="anc-simulator" className="relative py-28 px-6 md:px-12 bg-[#050505] overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-[#0050FF]/10 blur-[140px] pointer-events-none rounded-full" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full glass-panel-subtle border border-[#00D6FF]/30 text-xs font-semibold text-[#00D6FF] tracking-wider uppercase">
            <Shield className="w-3.5 h-3.5" />
            <span>Interactive Noise Cancellation Lab</span>
          </div>

          <h2 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white leading-tight">
            Hear the sound of <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00D6FF] via-white to-[#0050FF]">
              absolute silence.
            </span>
          </h2>

          <p className="text-base text-white/60 leading-relaxed font-light">
            Toggle between environments and experience how the proprietary QN3 processor synthesizes real-time anti-noise waveforms to eliminate chaotic ambient acoustics.
          </p>
        </div>

        {/* Interactive Lab Console */}
        <div className="glass-panel rounded-3xl p-6 md:p-10 border border-white/10 shadow-2xl relative">
          {/* Environment Switcher */}
          <div className="flex flex-col sm:flex-row items-center justify-between pb-8 border-b border-white/[0.08] gap-4">
            <span className="text-xs uppercase tracking-widest text-white/40 font-mono">
              Select Ambient Environment
            </span>

            <div className="flex items-center space-x-2 bg-black/50 p-1 rounded-full border border-white/10">
              {ENVIRONMENTS.map((env) => {
                const Icon = env.icon;
                const isActive = activeEnv === env.id;
                return (
                  <button
                    key={env.id}
                    onClick={() => {
                      soundEngine.playHapticTick();
                      setActiveEnv(env.id);
                    }}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-full text-xs font-medium transition-all ${
                      isActive
                        ? 'bg-[#0050FF] text-white shadow-glow-blue'
                        : 'text-white/60 hover:text-white'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    <span>{env.name}</span>
                    <span className="text-[10px] opacity-60">({env.noiseLevel})</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Real-time Oscilloscope Visualization */}
          <div className="py-8 relative">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <span className="text-xs font-mono text-white/50 tracking-wider">
                  REAL-TIME ACOUSTIC OSCILLOSCOPE
                </span>
                <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-mono bg-[#0050FF]/20 text-[#00D6FF] border border-[#00D6FF]/30">
                  LIVE FFT 700kHz
                </span>
              </div>

              <div className="flex items-center space-x-4 text-xs font-mono">
                <div className="flex items-center space-x-1.5 text-white/40">
                  <span className="w-2.5 h-[1px] bg-white/40 border-dashed" />
                  <span>Ambient Noise</span>
                </div>
                {ancMode === 'anc' && (
                  <div className="flex items-center space-x-1.5 text-[#0050FF]">
                    <span className="w-2.5 h-[2px] bg-[#0050FF]" />
                    <span>QN3 Anti-Phase</span>
                  </div>
                )}
                <div className="flex items-center space-x-1.5 text-[#00D6FF]">
                  <span className="w-2.5 h-[2px] bg-[#00D6FF]" />
                  <span>Ear Canal Waveform</span>
                </div>
              </div>
            </div>

            {/* Canvas */}
            <div className="h-44 sm:h-52 w-full bg-[#030304] rounded-2xl border border-white/[0.06] overflow-hidden relative shadow-inner">
              <canvas
                ref={canvasRef}
                width={1000}
                height={220}
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-3 left-4 text-[10px] font-mono text-white/40">
                ATTENUATION: {ancMode === 'anc' ? '-41.8 dB (99.2% Isolated)' : ancMode === 'ambient' ? '-12.0 dB' : '0.0 dB'}
              </div>
            </div>
          </div>

          {/* Mode Selector Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
            <button
              onClick={() => handleModeChange('anc')}
              className={`p-4 rounded-2xl border transition-all text-left flex items-start space-x-3.5 ${
                ancMode === 'anc'
                  ? 'border-[#00D6FF] bg-[#00D6FF]/10 shadow-glow-cyan'
                  : 'border-white/[0.08] hover:border-white/20 bg-white/[0.02]'
              }`}
            >
              <div className={`p-2 rounded-xl ${ancMode === 'anc' ? 'bg-[#00D6FF] text-black' : 'bg-white/10 text-white'}`}>
                <Shield className="w-5 h-5" />
              </div>
              <div>
                <div className="text-sm font-semibold text-white">Active Noise Cancelling</div>
                <div className="text-xs text-white/50 mt-1">Dual QN3 processors eradicate low & mid-frequency drone</div>
              </div>
            </button>

            <button
              onClick={() => handleModeChange('ambient')}
              className={`p-4 rounded-2xl border transition-all text-left flex items-start space-x-3.5 ${
                ancMode === 'ambient'
                  ? 'border-[#FFB800] bg-[#FFB800]/10 shadow-[0_0_25px_rgba(255,184,0,0.25)]'
                  : 'border-white/[0.08] hover:border-white/20 bg-white/[0.02]'
              }`}
            >
              <div className={`p-2 rounded-xl ${ancMode === 'ambient' ? 'bg-[#FFB800] text-black' : 'bg-white/10 text-white'}`}>
                <Ear className="w-5 h-5" />
              </div>
              <div>
                <div className="text-sm font-semibold text-white">Ambient Sound Control</div>
                <div className="text-xs text-white/50 mt-1">Passes human voices and announcements naturally</div>
              </div>
            </button>

            <button
              onClick={() => handleModeChange('off')}
              className={`p-4 rounded-2xl border transition-all text-left flex items-start space-x-3.5 ${
                ancMode === 'off'
                  ? 'border-[#FF4D4D] bg-[#FF4D4D]/10 shadow-[0_0_25px_rgba(255,77,77,0.25)]'
                  : 'border-white/[0.08] hover:border-white/20 bg-white/[0.02]'
              }`}
            >
              <div className={`p-2 rounded-xl ${ancMode === 'off' ? 'bg-[#FF4D4D] text-white' : 'bg-white/10 text-white'}`}>
                <ShieldOff className="w-5 h-5" />
              </div>
              <div>
                <div className="text-sm font-semibold text-white">Passive Isolation Only</div>
                <div className="text-xs text-white/50 mt-1">Physical ear cup acoustic seal without DSP cancellation</div>
              </div>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

