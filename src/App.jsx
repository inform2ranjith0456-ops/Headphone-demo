import React, { useState } from 'react';
import Navbar from './components/Navbar';
import ScrollytellingCanvas from './components/ScrollytellingCanvas';
import AncSimulator from './components/AncSimulator';
import BentoFeatures from './components/BentoFeatures';
import SoundHeritage from './components/SoundHeritage';
import ColorwaySelector from './components/ColorwaySelector';
import SpecsComparison from './components/SpecsComparison';
import PreorderModal from './components/PreorderModal';
import Footer from './components/Footer';

export default function App() {
  const [isPreorderOpen, setIsPreorderOpen] = useState(false);
  const [selectedColor, setSelectedColor] = useState('matte-black');

  return (
    <div className="min-h-screen bg-[#050505] text-white flex flex-col font-sans selection:bg-[#0050FF]/40 selection:text-white">
      {/* Apple-style sticky glassmorphism navbar */}
      <Navbar
        onOpenPreorder={() => setIsPreorderOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1 w-full">
        {/* Core Scrollytelling Section: Sticky Canvas 299-frame sequence */}
        <ScrollytellingCanvas
          onOpenPreorder={() => setIsPreorderOpen(true)}
        />

        {/* Interactive Active Noise Cancelling Simulator */}
        <AncSimulator />

        {/* Bento Grid Hardware & Software Innovations */}
        <BentoFeatures />

        {/* Sound Heritage, LDAC Lossless & Studio Frequency Curve */}
        <SoundHeritage />

        {/* Colorway Finishes Selector */}
        <ColorwaySelector
          selectedColor={selectedColor}
          onSelectColor={setSelectedColor}
        />

        {/* Architectural Specs Comparison Matrix */}
        <SpecsComparison
          onOpenPreorder={() => setIsPreorderOpen(true)}
        />
      </main>

      {/* Pre-order Drawer / Checkout Modal */}
      <PreorderModal
        isOpen={isPreorderOpen}
        onClose={() => setIsPreorderOpen(false)}
        initialColor={selectedColor}
      />

      {/* Minimal Luxury Tech Footer */}
      <Footer />
    </div>
  );
}

