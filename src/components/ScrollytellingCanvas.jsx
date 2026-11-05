import React, { useRef, useEffect, useState, useCallback } from 'react';
import { ArrowRight, Sparkles, Cpu, Layers, Disc, Volume2, ShieldCheck } from 'lucide-react';
import { STORY_BEATS, TECHNICAL_HOTSPOTS } from '../utils/constants';
import { soundEngine } from '../utils/audioFx';

const TOTAL_FRAMES = 299;

export default function ScrollytellingCanvas({ onOpenPreorder, onSelectHotspot }) {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const imagesRef = useRef([]);
  const loadedCountRef = useRef(0);
  const activeFrameRef = useRef(1);
  const targetFrameRef = useRef(1);
  const scrollProgressRef = useRef(0);
  const reqIdRef = useRef(null);
  const [loadProgress, setLoadProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showHotspots, setShowHotspots] = useState(false);
  const [activeHotspot, setActiveHotspot] = useState(null);

  // Preload images with priority to keyframes for immediate interactivity
  useEffect(() => {
    let isCancelled = false;
    const images = new Array(TOTAL_FRAMES + 1);
    imagesRef.current = images;

    const pad = (num) => String(num).padStart(3, '0');

    const updateProgress = () => {
      loadedCountRef.current++;
      const pct = Math.round((loadedCountRef.current / TOTAL_FRAMES) * 100);
      setLoadProgress(pct);
      if (loadedCountRef.current >= 25) {
        setIsLoaded(true); // Can start displaying as soon as initial frames are loaded
      }
    };

    // First load every 5th frame for instantaneous preview responsiveness
    const priorityIndices = [];
    for (let i = 1; i <= TOTAL_FRAMES; i += 5) priorityIndices.push(i);
    for (let i = 1; i <= TOTAL_FRAMES; i++) {
      if (i % 5 !== 1) priorityIndices.push(i);
    }

    priorityIndices.forEach((frameIdx) => {
      const img = new Image();
      img.src = `/sequence/ezgif-frame-${pad(frameIdx)}.jpg`;
      img.onload = () => {
        if (!isCancelled) {
          images[frameIdx] = img;
          updateProgress();
        }
      };
      img.onerror = () => {
        if (!isCancelled) {
          updateProgress();
        }
      };
    });

    return () => {
      isCancelled = true;
    };
  }, []);

  // Frame calculation based on scroll progress:
  // 0% -> 80%: explodes forward from 1 to 299
  // 80% -> 100%: reassembles in reverse from 299 back to 1
  const getFrameForProgress = useCallback((prog) => {
    const clamped = Math.max(0, Math.min(1, prog));
    let frame;
    if (clamped <= 0.82) {
      const forwardT = clamped / 0.82;
      frame = 1 + Math.round(forwardT * (TOTAL_FRAMES - 1));
    } else {
      const reverseT = (clamped - 0.82) / 0.18;
      // Smooth reassembly reverse curve
      frame = TOTAL_FRAMES - Math.round(reverseT * (TOTAL_FRAMES - 1));
    }
    return Math.max(1, Math.min(TOTAL_FRAMES, frame));
  }, []);

  // Find closest loaded image if current target is still downloading
  const getRenderableImage = useCallback((targetIdx) => {
    const imgs = imagesRef.current;
    if (imgs[targetIdx] && imgs[targetIdx].complete) return imgs[targetIdx];

    // Search outward
    for (let offset = 1; offset < 20; offset++) {
      const down = targetIdx - offset;
      if (down >= 1 && imgs[down] && imgs[down].complete) return imgs[down];
      const up = targetIdx + offset;
      if (up <= TOTAL_FRAMES && imgs[up] && imgs[up].complete) return imgs[up];
    }
    return imgs[1] && imgs[1].complete ? imgs[1] : null;
  }, []);

  // Draw frame to canvas with aspect fit, dynamic framing, and edge blending
  const drawFrame = useCallback((frameIdx) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    const img = getRenderableImage(frameIdx);
    const cw = canvas.width;
    const ch = canvas.height;

    // Background fill matching deep charcoal
    ctx.fillStyle = '#050505';
    ctx.fillRect(0, 0, cw, ch);

    if (img && img.width) {
      const imgRatio = img.width / img.height;
      const canvasRatio = cw / ch;

      let dw, dh, dx, dy;
      if (canvasRatio > imgRatio) {
        // Window is wider than 16:9
        dh = ch;
        dw = ch * imgRatio;
        dx = (cw - dw) / 2;
        dy = 0;
      } else {
        // Window is taller than 16:9 (mobile / portrait)
        dw = cw;
        dh = cw / imgRatio;
        dx = 0;
        dy = (ch - dh) / 2;
      }

      // Dynamic framing according to scroll progress:
      const prog = scrollProgressRef.current;

      // 1. In Hero Stage (0 - 16%): Gently position headphones lower to leave full clear negative space for hero titles
      if (prog <= 0.16) {
        const heroFactor = 1 - (prog / 0.16);
        dy += Math.min(ch * 0.15, 110) * heroFactor;
      }
      // 2. In Engineering Stage (16% - 42%): Shift headphones slightly right so text on left has clear space
      else if (prog > 0.16 && prog <= 0.42) {
        const engT = Math.sin(((prog - 0.16) / 0.26) * Math.PI);
        if (cw > 768) {
          dx += Math.min(cw * 0.10, 95) * engT;
        }
      }
      // 3. In Noise Cancelling Stage (43% - 68%): Shift headphones slightly left so text on right has clear space
      else if (prog > 0.42 && prog <= 0.68) {
        const ancT = Math.sin(((prog - 0.42) / 0.26) * Math.PI);
        if (cw > 768) {
          dx -= Math.min(cw * 0.10, 95) * ancT;
        }
      }
      // 4. In Sound & Upscaling Stage (69% - 84%): Shift headphones slightly right
      else if (prog > 0.68 && prog <= 0.84) {
        const sndT = Math.sin(((prog - 0.68) / 0.16) * Math.PI);
        if (cw > 768) {
          dx += Math.min(cw * 0.08, 80) * sndT;
        }
      }

      ctx.drawImage(img, dx, dy, dw, dh);

      // Seamless Edge Blending Vignette:
      const gradient = ctx.createRadialGradient(
        cw / 2,
        ch / 2,
        Math.min(cw, ch) * 0.32,
        cw / 2,
        ch / 2,
        Math.max(cw, ch) * 0.72
      );
      gradient.addColorStop(0, 'rgba(5, 5, 5, 0)');
      gradient.addColorStop(0.7, 'rgba(5, 5, 5, 0.25)');
      gradient.addColorStop(1, 'rgba(5, 5, 5, 0.95)');

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, cw, ch);
    }
  }, [getRenderableImage]);

  // High-DPI Canvas Resize
  const handleResize = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = Math.round(rect.width * dpr);
    canvas.height = Math.round(rect.height * dpr);
    drawFrame(Math.round(activeFrameRef.current));
  }, [drawFrame]);

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, [handleResize]);

  // Scroll listener tracking relative container progress
  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const container = containerRef.current;
          if (container) {
            const rect = container.getBoundingClientRect();
            const totalScrollable = rect.height - window.innerHeight;
            if (totalScrollable > 0) {
              const currentScroll = -rect.top;
              const progress = Math.max(0, Math.min(1, currentScroll / totalScrollable));
              setScrollProgress(progress);
              scrollProgressRef.current = progress;
              targetFrameRef.current = getFrameForProgress(progress);

              // Toggle Hotspots visibility during exploded view
              setShowHotspots(progress >= 0.38 && progress <= 0.8);
            }
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [getFrameForProgress]);

  // Animation Loop: Inertial smooth interpolation (Lerp)
  useEffect(() => {
    let lastRendered = -1;

    const loop = () => {
      const diff = targetFrameRef.current - activeFrameRef.current;
      if (Math.abs(diff) > 0.05) {
        activeFrameRef.current += diff * 0.12; // Silky smooth damping
        const currentFrameInt = Math.round(activeFrameRef.current);
        if (currentFrameInt !== lastRendered) {
          drawFrame(currentFrameInt);
          lastRendered = currentFrameInt;
        }
      }
      reqIdRef.current = requestAnimationFrame(loop);
    };

    reqIdRef.current = requestAnimationFrame(loop);
    return () => {
      if (reqIdRef.current) cancelAnimationFrame(reqIdRef.current);
    };
  }, [drawFrame]);

  // Helper to determine active storytelling beat
  const getActiveBeat = () => {
    return STORY_BEATS.find(
      (b) => scrollProgress >= b.start && scrollProgress <= b.end
    ) || STORY_BEATS[0];
  };

  const activeBeat = getActiveBeat();

  return (
    <div
      ref={containerRef}
      id="scrollytelling"
      className="relative w-full bg-[#050505] selection:bg-[#0050FF]/40"
      style={{ height: '450vh' }}
    >
      {/* Pinned Viewport Container */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">
        {/* Subtle radial tech glow behind the headphones */}
        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,_rgba(0,80,255,0.08)_0%,_rgba(5,8,21,0.04)_45%,_transparent_70%)]" />

        {/* HTML5 Canvas */}
        <canvas
          ref={canvasRef}
          className="w-full h-full object-contain block z-0"
        />

        {/* Loading Indicator */}
        {!isLoaded && (
          <div className="absolute inset-0 z-30 bg-[#050505] flex flex-col items-center justify-center space-y-4">
            <div className="flex items-center space-x-3">
              <span className="font-extrabold tracking-widest text-xl text-white font-sans uppercase">
                SONY
              </span>
              <span className="h-4 w-[1px] bg-white/20"></span>
              <span className="text-sm font-medium tracking-tight text-white/70">
                WH-1000XM6
              </span>
            </div>
            <div className="w-56 h-[2px] bg-white/10 rounded-full overflow-hidden relative">
              <div
                className="h-full bg-gradient-to-r from-[#0050FF] to-[#00D6FF] transition-all duration-300"
                style={{ width: `${loadProgress}%` }}
              />
            </div>
            <p className="text-xs text-white/40 tracking-widest uppercase">
              Calibrating Acoustic Architecture • {loadProgress}%
            </p>
          </div>
        )}

        {/* Technical HUD Interactive Hotspots Overlay */}
        {showHotspots && (
          <div className="absolute inset-0 z-20 pointer-events-none">
            {TECHNICAL_HOTSPOTS.map((spot) => (
              <div
                key={spot.id}
                className="absolute transform -translate-x-1/2 -translate-y-1/2 pointer-events-auto cursor-pointer group"
                style={{ left: `${spot.x}%`, top: `${spot.y}%` }}
                onClick={() => {
                  soundEngine.playHapticTick();
                  setActiveHotspot(activeHotspot?.id === spot.id ? null : spot);
                  if (onSelectHotspot) onSelectHotspot(spot);
                }}
              >
                {/* Pulsing indicator pin */}
                <div className="relative flex items-center justify-center">
                  <span className="absolute w-8 h-8 rounded-full bg-[#00D6FF]/20 animate-ping" />
                  <span className="absolute w-5 h-5 rounded-full bg-[#0050FF]/40 border border-[#00D6FF]/80 group-hover:scale-125 transition-transform" />
                  <span className="w-2 h-2 rounded-full bg-white shadow-glow-cyan" />
                </div>

                {/* Hotspot label badge */}
                <div className="hidden md:flex items-center space-x-1.5 mt-2 px-2.5 py-1 rounded-full glass-panel text-[11px] font-medium text-white/90 group-hover:border-[#00D6FF]/40 transition-all shadow-hud whitespace-nowrap">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00D6FF]" />
                  <span>{spot.name.split(' ')[0]} {spot.name.split(' ')[1]}</span>
                </div>
              </div>
            ))}

            {/* Active Hotspot Modal Card */}
            {activeHotspot && (
              <div className="absolute bottom-8 left-1/2 -translate-x-1/2 pointer-events-auto max-w-md w-[90%] glass-panel rounded-2xl p-5 border border-[#00D6FF]/30 shadow-2xl animate-fade-in z-30">
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="p-1.5 rounded-lg bg-[#0050FF]/20 text-[#00D6FF]">
                      <Cpu className="w-4 h-4" />
                    </span>
                    <h4 className="text-sm font-semibold text-white tracking-tight">
                      {activeHotspot.name}
                    </h4>
                  </div>
                  <button
                    onClick={() => setActiveHotspot(null)}
                    className="text-white/40 hover:text-white text-xs px-2 py-0.5"
                  >
                    ✕
                  </button>
                </div>
                <p className="text-xs text-white/70 mt-2 leading-relaxed">
                  {activeHotspot.role}
                </p>
                <div className="mt-3 pt-2.5 border-t border-white/[0.08] flex items-center justify-between text-[11px] text-[#00D6FF]">
                  <span>{activeHotspot.detail}</span>
                </div>
              </div>
            )}
          </div>
        )}

        {/* STORYTELLING OVERLAYS (Translucent, low-opacity glassmorphism) */}
        <div className="absolute inset-0 z-10 pointer-events-none flex flex-col justify-between p-6 md:p-12">
          {/* Top spacer */}
          <div className="w-full max-w-7xl mx-auto pt-16 md:pt-14 opacity-0 pointer-events-none select-none">
            {/* Clean empty top anchor */}
          </div>

          {/* MAIN DYNAMIC STORYTELLING BEAT CONTENT */}
          <div className="w-full max-w-7xl mx-auto flex items-center my-auto">
            {/* BEAT 1: HERO / INTRO (0 - 15%) */}
            {activeBeat.id === 'hero' && (
              <div className="w-full text-center flex flex-col items-center justify-start pt-4 sm:pt-6 space-y-4 animate-fade-in relative z-20">
                <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] backdrop-blur-md border border-white/10 text-xs font-medium text-white/80 tracking-wide uppercase shadow-lg">
                  <Sparkles className="w-3.5 h-3.5 text-[#00D6FF]" />
                  <span>The Next Acoustic Benchmark</span>
                </div>

                <h1 className="text-4xl sm:text-6xl md:text-8xl font-black tracking-tighter text-white uppercase drop-shadow-[0_4px_30px_rgba(0,0,0,0.95)]">
                  SONY <span className="text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-[#00D6FF]">WH-1000XM6</span>
                </h1>

                <p className="text-xl sm:text-2xl md:text-3xl font-light tracking-tight text-white drop-shadow-[0_2px_15px_rgba(0,0,0,0.9)]">
                  Silence, perfected.
                </p>

                <p className="max-w-xl text-sm sm:text-base text-white/85 font-normal leading-relaxed drop-shadow-[0_2px_12px_rgba(0,0,0,0.95)]">
                  Flagship wireless noise cancelling, re-engineered from the driver up for a world that never stops.
                </p>

                <div className="pt-4 flex flex-col items-center space-y-2 pointer-events-auto">
                  <a
                    href="#architecture"
                    className="inline-flex items-center space-x-2 text-xs uppercase tracking-widest text-[#00D6FF] hover:text-white transition-colors py-1.5 px-4 rounded-full bg-white/[0.04] backdrop-blur-md border border-white/10 hover:border-white/20"
                  >
                    <span>Scroll to explore disassembly</span>
                    <span className="animate-bounce">↓</span>
                  </a>
                </div>
              </div>
            )}

            {/* BEAT 2: ENGINEERING REVEAL (15 - 42%) - Translucent low-opacity glass card */}
            {activeBeat.id === 'engineering' && (
              <div className="w-full md:max-w-xl text-left animate-fade-in pl-2 md:pl-6 pointer-events-auto">
                <div className="bg-black/30 backdrop-blur-md rounded-3xl p-6 sm:p-8 border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.3)] space-y-4">
                  <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-white/[0.05] border border-[#0050FF]/40 text-xs font-semibold text-[#00D6FF] tracking-wider uppercase">
                    <Layers className="w-3.5 h-3.5 text-[#0050FF]" />
                    <span>Precision Engineering</span>
                  </div>

                  <h2 className="text-2xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white leading-tight drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)]">
                    Precision-engineered <br className="hidden sm:inline" />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-[#A5C4FF]">
                      for pure silence.
                    </span>
                  </h2>

                  <p className="text-sm sm:text-base text-white/90 leading-relaxed font-normal drop-shadow-sm">
                    Custom carbon-composite drivers, sealed acoustic chambers, and optimized internal airflow deliver studio-grade clarity. Every millimeter is tuned for balance, power, and comfort—hour after hour.
                  </p>

                  {/* Micro engineering specs */}
                  <div className="grid grid-cols-2 gap-3 pt-2">
                    <div className="bg-white/[0.04] p-3.5 rounded-2xl border border-white/[0.08]">
                      <div className="text-[11px] text-white/60 uppercase tracking-wider font-mono">Acoustic Airflow</div>
                      <div className="text-base font-bold text-white mt-0.5">-42% Backpressure</div>
                    </div>
                    <div className="bg-white/[0.04] p-3.5 rounded-2xl border border-white/[0.08]">
                      <div className="text-[11px] text-white/60 uppercase tracking-wider font-mono">Diaphragm Rigidness</div>
                      <div className="text-base font-bold text-[#00D6FF] mt-0.5">30mm Carbon-Dome</div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* BEAT 3: NOISE CANCELLING & MICROPHONES (43 - 68%) - Translucent low-opacity glass card */}
            {activeBeat.id === 'noise-cancelling' && (
              <div className="w-full md:max-w-xl ml-auto text-left animate-fade-in pr-2 md:pr-6 pointer-events-auto">
                <div className="bg-black/30 backdrop-blur-md rounded-3xl p-6 sm:p-8 border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.3)] space-y-4">
                  <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-white/[0.05] border border-[#00D6FF]/40 text-xs font-semibold text-[#00D6FF] tracking-wider uppercase">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#00D6FF]" />
                    <span>Dual Processor Architecture</span>
                  </div>

                  <h2 className="text-2xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white leading-tight drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)]">
                    Adaptive noise cancelling, <br className="hidden sm:inline" />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00D6FF] via-white to-white">
                      redefined.
                    </span>
                  </h2>

                  <p className="text-sm sm:text-base text-white/90 leading-relaxed font-normal drop-shadow-sm">
                    A multi-microphone array listens in every direction while the dual QN3 + V2 processors analyze ambient frequencies 700,000 times per second. Your music stays pure—planes, trains, and crowds fade away into blackness.
                  </p>

                  <div className="flex flex-col space-y-2 pt-2 text-xs">
                    <div className="flex items-center space-x-2.5 bg-white/[0.04] p-3 rounded-2xl border border-white/[0.08]">
                      <span className="w-2 h-2 rounded-full bg-[#00D6FF] shrink-0" />
                      <span className="text-white/95 font-medium">12-Microphone Beamforming Sensor Matrix</span>
                    </div>
                    <div className="flex items-center space-x-2.5 bg-white/[0.04] p-3 rounded-2xl border border-white/[0.08]">
                      <span className="w-2 h-2 rounded-full bg-[#0050FF] shrink-0" />
                      <span className="text-white/95 font-medium">Real-Time Atmosphere Pressure Adaptation</span>
                    </div>
                    <div className="flex items-center space-x-2.5 bg-white/[0.04] p-3 rounded-2xl border border-white/[0.08]">
                      <span className="w-2 h-2 rounded-full bg-white shrink-0" />
                      <span className="text-white/95 font-medium">Zero Ear-Pressure Artifacts</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* BEAT 4: SOUND & UPSCALING (69 - 84%) - Translucent low-opacity glass card */}
            {activeBeat.id === 'acoustics' && (
              <div className="w-full md:max-w-xl text-left animate-fade-in pl-2 md:pl-6 pointer-events-auto">
                <div className="bg-black/30 backdrop-blur-md rounded-3xl p-6 sm:p-8 border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.3)] space-y-4">
                  <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-white/[0.05] border border-[#0050FF]/40 text-xs font-semibold text-[#A5C4FF] tracking-wider uppercase">
                    <Disc className="w-3.5 h-3.5 text-[#0050FF]" />
                    <span>Acoustic Mastery</span>
                  </div>

                  <h2 className="text-2xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white leading-tight drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)]">
                    Immersive, <br className="hidden sm:inline" />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-[#00D6FF] to-white">
                      lifelike sound.
                    </span>
                  </h2>

                  <p className="text-sm sm:text-base text-white/90 leading-relaxed font-normal drop-shadow-sm">
                    High-performance drivers unlock micro-detail, depth, and spatial texture in every track. AI-enhanced DSEE Extreme restores lost harmonic brilliance to compressed audio, delivering an intimate studio-level experience.
                  </p>

                  <div className="pt-2 flex flex-wrap gap-2 text-xs font-mono">
                    <span className="px-3 py-1.5 rounded-xl bg-white/[0.04] border border-white/[0.08] text-white font-medium">
                      LDAC 990 kbps Lossless
                    </span>
                    <span className="px-3 py-1.5 rounded-xl bg-white/[0.04] border border-white/[0.08] text-white font-medium">
                      360 Reality Audio
                    </span>
                    <span className="px-3 py-1.5 rounded-xl bg-white/[0.04] border border-white/[0.08] text-white font-medium">
                      Hi-Res Wireless Certified
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* BEAT 5: REASSEMBLY & CTA (85 - 100%) */}
            {activeBeat.id === 'reassembly' && (
              <div className="w-full text-center flex flex-col items-center justify-center space-y-5 animate-fade-in relative z-20 pointer-events-auto">
                <div className="bg-black/30 backdrop-blur-md rounded-3xl p-8 sm:p-10 border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.3)] max-w-2xl flex flex-col items-center space-y-5">
                  <h2 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tighter text-white drop-shadow-[0_4px_30px_rgba(0,0,0,0.95)] leading-tight">
                    Hear everything. <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-[#A5C4FF] to-[#00D6FF]">
                      Feel nothing else.
                    </span>
                  </h2>

                  <p className="text-base sm:text-xl font-light text-white/95 drop-shadow-sm">
                    WH-1000XM6. Designed for focus, crafted for comfort.
                  </p>

                  <p className="text-xs sm:text-sm text-white/65 tracking-wide font-normal max-w-md">
                    Engineered for airports, offices, and everything in between.
                  </p>

                  {/* Primary CTA Buttons */}
                  <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4 w-full">
                    <button
                      onClick={() => {
                        soundEngine.playChime();
                        onOpenPreorder();
                      }}
                      className="relative group px-8 py-3.5 rounded-full font-semibold text-sm text-white overflow-hidden shadow-glow-blue transition-all w-full sm:w-auto cursor-pointer"
                    >
                      <span className="absolute inset-0 bg-gradient-to-r from-[#0050FF] via-[#00D6FF] to-[#0050FF] group-hover:scale-105 transition-transform"></span>
                      <span className="relative flex items-center justify-center space-x-2">
                        <span>Experience WH-1000XM6</span>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </span>
                    </button>

                    <a
                      href="#specs-matrix"
                      className="px-6 py-3.5 rounded-full border border-white/20 hover:border-white/50 text-white/90 hover:text-white text-sm font-medium tracking-tight bg-white/[0.04] transition-all w-full sm:w-auto text-center"
                      onClick={() => soundEngine.playHapticTick()}
                    >
                      See full specs
                    </a>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Bottom subtle guidance */}
          <div className="w-full max-w-7xl mx-auto flex items-center justify-between pb-2 text-[11px] text-white/40 font-mono">
            <span>© SONY CORPORATION</span>
            <span>WH-1000XM6 FLAGSHIP</span>
          </div>
        </div>
      </div>
    </div>
  );
}
