import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Menu, X, ArrowUpRight } from 'lucide-react';
import { soundEngine } from '../utils/audioFx';

export default function Navbar({ onOpenPreorder, activeSection = 'overview' }) {
  const [scrolled, setScrolled] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSoundToggle = () => {
    const soundActive = soundEngine.toggleSound();
    setIsMuted(!soundActive);
  };

  const navLinks = [
    { label: 'Overview', href: '#scrollytelling' },
    { label: 'Architecture', href: '#architecture' },
    { label: 'Noise Cancelling', href: '#anc-simulator' },
    { label: 'Acoustics', href: '#sound-heritage' },
    { label: 'Specs', href: '#specs-matrix' },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-[#050505]/80 backdrop-blur-xl border-b border-white/[0.08] shadow-[0_4px_30px_rgba(0,0,0,0.5)] py-3'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-10 flex items-center justify-between">
          {/* Left: Sony Logo & Model */}
          <div className="flex items-center space-x-3 group cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <span className="font-extrabold tracking-widest text-lg md:text-xl text-white font-sans uppercase">
              SONY
            </span>
            <span className="h-3 w-[1px] bg-white/20"></span>
            <span className="text-xs md:text-sm font-medium tracking-tight text-white/70 group-hover:text-white transition-colors">
              WH-1000XM6
            </span>
          </div>

          {/* Center: Apple-style Minimal Links */}
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-xs tracking-tight text-white/60 hover:text-white transition-colors relative py-1"
                onClick={() => soundEngine.playHapticTick()}
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Right: Sound Toggle + CTA */}
          <div className="flex items-center space-x-3 md:space-x-4">
            {/* Audio Experience Toggle */}
            <button
              onClick={handleSoundToggle}
              className={`p-2 rounded-full border transition-all duration-300 ${
                !isMuted
                  ? 'border-[#00D6FF]/50 bg-[#00D6FF]/10 text-[#00D6FF] shadow-glow-cyan'
                  : 'border-white/10 bg-white/[0.03] text-white/50 hover:text-white hover:border-white/20'
              }`}
              title={isMuted ? 'Enable binaural sound experience' : 'Mute sound'}
              aria-label="Toggle sound experience"
            >
              {!isMuted ? (
                <Volume2 className="w-3.5 h-3.5" />
              ) : (
                <VolumeX className="w-3.5 h-3.5" />
              )}
            </button>

            {/* Pre-order CTA */}
            <button
              onClick={() => {
                soundEngine.playChime();
                onOpenPreorder();
              }}
              className="relative inline-flex items-center justify-center p-[1px] overflow-hidden rounded-full font-medium transition-all group"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-[#0050FF] via-[#00D6FF] to-[#0050FF] rounded-full group-hover:opacity-100 opacity-80 blur-[2px] transition-opacity"></span>
              <span className="relative px-4 py-1.5 rounded-full bg-[#050505] text-xs font-semibold tracking-tight text-white flex items-center space-x-1.5 group-hover:bg-[#070b14] transition-colors">
                <span>Experience WH-1000XM6</span>
                <ArrowUpRight className="w-3 h-3 text-[#00D6FF] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </span>
            </button>

            {/* Mobile menu trigger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-1.5 md:hidden text-white/70 hover:text-white"
              aria-label="Open mobile menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-[#050505]/95 backdrop-blur-2xl md:hidden flex flex-col justify-center px-8 py-20 animate-fade-in">
          <nav className="flex flex-col space-y-6">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-2xl font-medium tracking-tight text-white/80 hover:text-white"
              >
                {link.label}
              </a>
            ))}
            <div className="pt-6 border-t border-white/10">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenPreorder();
                }}
                className="w-full py-3.5 rounded-full bg-gradient-to-r from-[#0050FF] to-[#00D6FF] text-white text-sm font-semibold tracking-tight shadow-glow-blue"
              >
                Pre-order WH-1000XM6 • $449
              </button>
            </div>
          </nav>
        </div>
      )}
    </>
  );
}

