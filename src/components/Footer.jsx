import React from 'react';
import { ArrowUp, Globe } from 'lucide-react';
import { soundEngine } from '../utils/audioFx';

export default function Footer() {
  const scrollToTop = () => {
    soundEngine.playHapticTick();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-[#030304] border-t border-white/[0.06] text-white/50 text-xs py-16 px-6 md:px-12">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Footnote Disclaimers */}
        <div className="space-y-2 text-[11px] leading-relaxed text-white/40 border-b border-white/[0.06] pb-8">
          <p>
            1. As of November 2026. Measured using JEITA-compliant guidelines in the wireless noise cancelling headphone market.
          </p>
          <p>
            2. When using LDAC at maximum transfer rate of 990 kbps. Requires compatible playback source supporting high-resolution wireless streaming.
          </p>
          <p>
            3. Battery life may vary depending on usage environment, volume level, and features enabled (e.g. DSEE Extreme and Speak-to-Chat).
          </p>
          <p>
            4. Sony, WH-1000XM6, LDAC, and DSEE Extreme are registered trademarks of Sony Corporation. All other trademarks are the property of their respective owners.
          </p>
        </div>

        {/* Links & Brand Columns */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          <div>
            <h5 className="text-white text-xs font-semibold uppercase tracking-wider mb-3">Explore XM6</h5>
            <ul className="space-y-2">
              <li><a href="#scrollytelling" className="hover:text-white transition-colors">Overview</a></li>
              <li><a href="#architecture" className="hover:text-white transition-colors">Engineering & Drivers</a></li>
              <li><a href="#anc-simulator" className="hover:text-white transition-colors">QN3 Processor</a></li>
              <li><a href="#sound-heritage" className="hover:text-white transition-colors">LDAC Lossless Audio</a></li>
            </ul>
          </div>

          <div>
            <h5 className="text-white text-xs font-semibold uppercase tracking-wider mb-3">Support</h5>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-white transition-colors">Sony Headphones Connect App</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Firmware Updates</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Warranty & Service</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Recycling & Trade-in</a></li>
            </ul>
          </div>

          <div>
            <h5 className="text-white text-xs font-semibold uppercase tracking-wider mb-3">Sustainability</h5>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-white transition-colors">Road to Zero 2050</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Plastic-Free Packaging</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Recycled Resin Polymers</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Circular Design</a></li>
            </ul>
          </div>

          <div>
            <h5 className="text-white text-xs font-semibold uppercase tracking-wider mb-3">About Sony</h5>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-white transition-colors">Company Info</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Sony Music Studios</a></li>
              <li><a href="#" className="hover:text-white transition-colors">News & Press</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Design Gallery</a></li>
            </ul>
          </div>

          <div className="col-span-2 md:col-span-1 flex flex-col justify-between">
            <div>
              <div className="font-extrabold text-lg text-white font-sans uppercase tracking-widest mb-1">
                SONY
              </div>
              <p className="text-[11px] text-white/40">
                Pioneering acoustic emotion through technology.
              </p>
            </div>

            <button
              onClick={scrollToTop}
              className="mt-6 inline-flex items-center space-x-2 text-xs text-white/70 hover:text-white transition-colors p-2 rounded-xl bg-white/[0.04] border border-white/10 hover:border-white/20 w-fit"
            >
              <ArrowUp className="w-3.5 h-3.5 text-[#00D6FF]" />
              <span>Back to Top</span>
            </button>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="pt-8 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px]">
          <div className="flex items-center space-x-2">
            <Globe className="w-3.5 h-3.5 text-white/40" />
            <span>United States / English</span>
          </div>

          <div className="flex items-center space-x-6 text-white/40">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Use</a>
            <a href="#" className="hover:text-white transition-colors">Cookie Preferences</a>
          </div>

          <div>
            © 2026 Sony Electronics Inc. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}

