import React, { useState } from 'react';
import { X, Check, ShieldCheck, Truck, Sparkles, CreditCard, ArrowRight } from 'lucide-react';
import { COLORWAYS } from '../utils/constants';
import { soundEngine } from '../utils/audioFx';

export default function PreorderModal({ isOpen, onClose, initialColor = 'matte-black' }) {
  const [selectedColor, setSelectedColor] = useState(initialColor);
  const [engraving, setEngraving] = useState('');
  const [hasTradeIn, setHasTradeIn] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);

  if (!isOpen) return null;

  const colorObj = COLORWAYS.find((c) => c.id === selectedColor) || COLORWAYS[0];
  const basePrice = 449.99;
  const tradeInDiscount = hasTradeIn ? 150.00 : 0;
  const finalPrice = basePrice - tradeInDiscount;
  const monthlyPrice = (finalPrice / 12).toFixed(2);

  const handleCompleteOrder = (e) => {
    e.preventDefault();
    soundEngine.playChime();
    setOrderComplete(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto animate-fade-in">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-xl transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-2xl bg-[#08090D] border border-white/10 rounded-3xl p-6 sm:p-8 shadow-[0_20px_70px_rgba(0,0,0,0.8)] z-10 my-auto text-left">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-full text-white/50 hover:text-white hover:bg-white/10 transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {!orderComplete ? (
          <div>
            {/* Header */}
            <div className="flex items-center space-x-2 text-xs font-mono text-[#00D6FF] uppercase tracking-wider mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Official Sony Reservation</span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Pre-order Sony WH-1000XM6
            </h3>
            <p className="text-xs sm:text-sm text-white/60 mt-1">
              Deliveries begin worldwide next month. Free priority courier shipping & 30-day home trial.
            </p>

            {/* Form */}
            <form onSubmit={handleCompleteOrder} className="mt-6 space-y-6">
              {/* Step 1: Color Selection */}
              <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-white/70 block mb-3">
                  1. Select Finish: <span className="text-white font-bold">{colorObj.name}</span>
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {COLORWAYS.map((c) => (
                    <button
                      type="button"
                      key={c.id}
                      onClick={() => {
                        soundEngine.playHapticTick();
                        setSelectedColor(c.id);
                      }}
                      className={`p-3 rounded-2xl border flex flex-col items-center space-y-2 transition-all ${
                        selectedColor === c.id
                          ? 'border-[#00D6FF] bg-white/[0.04] shadow-glow-cyan'
                          : 'border-white/[0.08] hover:border-white/20 bg-black/30'
                      }`}
                    >
                      <span
                        className="w-6 h-6 rounded-full border border-white/20"
                        style={{ backgroundColor: c.hex }}
                      />
                      <span className="text-xs font-medium text-white/80">{c.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Step 2: Custom Laser Engraving (Optional) */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-semibold uppercase tracking-wider text-white/70">
                    2. Complimentary Laser Engraving (Optional)
                  </label>
                  <span className="text-[10px] text-white/40 font-mono">Max 16 chars</span>
                </div>
                <input
                  type="text"
                  maxLength={16}
                  placeholder="e.g. STUDIO MASTER 01"
                  value={engraving}
                  onChange={(e) => setEngraving(e.target.value.toUpperCase())}
                  className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-white placeholder-white/20 text-xs font-mono uppercase focus:outline-none focus:border-[#00D6FF] transition-colors"
                />
              </div>

              {/* Step 3: Trade-in Option */}
              <div
                onClick={() => setHasTradeIn(!hasTradeIn)}
                className={`p-4 rounded-2xl border cursor-pointer transition-all flex items-start space-x-3 ${
                  hasTradeIn
                    ? 'border-[#0050FF] bg-[#0050FF]/10'
                    : 'border-white/[0.08] hover:border-white/20 bg-white/[0.02]'
                }`}
              >
                <div className={`w-5 h-5 rounded-md flex items-center justify-center mt-0.5 border ${hasTradeIn ? 'bg-[#0050FF] border-[#0050FF] text-white' : 'border-white/30'}`}>
                  {hasTradeIn && <Check className="w-3.5 h-3.5" />}
                </div>
                <div className="text-xs">
                  <span className="font-semibold text-white block">Trade in existing headphones for $150 credit</span>
                  <span className="text-white/50 block mt-0.5">Eligible for WH-1000XM4, WH-1000XM5, Bose, or Apple headphones.</span>
                </div>
              </div>

              {/* Price Calculation Summary */}
              <div className="pt-4 border-t border-white/[0.08] flex items-center justify-between">
                <div>
                  <div className="text-2xl font-black text-white font-mono">
                    ${finalPrice.toFixed(2)}
                  </div>
                  <div className="text-xs text-[#00D6FF]">
                    Or ${monthlyPrice}/mo for 12 mos at 0% APR
                  </div>
                </div>

                <button
                  type="submit"
                  className="px-8 py-3.5 rounded-full bg-gradient-to-r from-[#0050FF] to-[#00D6FF] text-white font-semibold text-xs tracking-tight shadow-glow-blue hover:opacity-90 transition-opacity flex items-center space-x-2"
                >
                  <span>Reserve Order</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              {/* Badges */}
              <div className="pt-2 flex items-center justify-center space-x-6 text-[11px] text-white/50">
                <span className="flex items-center space-x-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#00D6FF]" />
                  <span>Sony North America Warranty</span>
                </span>
                <span className="flex items-center space-x-1.5">
                  <Truck className="w-3.5 h-3.5 text-[#0050FF]" />
                  <span>Free Express Delivery</span>
                </span>
              </div>
            </form>
          </div>
        ) : (
          /* Success Screen */
          <div className="text-center py-10 space-y-4">
            <div className="w-16 h-16 rounded-full bg-[#00D6FF]/20 border border-[#00D6FF] text-[#00D6FF] flex items-center justify-center mx-auto mb-4 animate-bounce">
              <Check className="w-8 h-8" />
            </div>

            <h3 className="text-2xl font-extrabold text-white tracking-tight">
              Pre-order Confirmed!
            </h3>

            <p className="text-sm text-white/70 max-w-md mx-auto leading-relaxed">
              Thank you for reserving the Sony WH-1000XM6 ({colorObj.name}).
              {engraving && (
                <span className="block text-[#00D6FF] font-mono text-xs mt-1">
                  Laser Engraved: "{engraving}"
                </span>
              )}
            </p>

            <p className="text-xs text-white/50">
              A confirmation email with your priority dispatch tracking code has been dispatched.
            </p>

            <div className="pt-6">
              <button
                onClick={onClose}
                className="px-6 py-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-semibold transition-colors"
              >
                Return to Product Experience
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

