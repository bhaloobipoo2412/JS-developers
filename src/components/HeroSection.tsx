import React from 'react';
import { 
  ArrowRight, 
  BookOpen, 
  Sparkles, 
  MapPin, 
  CheckCircle2, 
  Award,
  Users,
  Code2
} from 'lucide-react';
import { InteractiveGlobe } from './InteractiveGlobe';

interface HeroSectionProps {
  onExploreCourses: () => void;
  onOpen3DBrochure: () => void;
  onEnrollNow: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onExploreCourses,
  onOpen3DBrochure,
  onEnrollNow
}) => {
  return (
    <section className="relative pt-12 pb-16 md:pt-20 md:pb-24 overflow-hidden">
      {/* Background Radial Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-gradient-to-b from-[#00F2FE]/15 via-blue-900/10 to-transparent blur-3xl -z-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Hero Content */}
          <div className="lg:col-span-7 space-y-6 text-left">
            {/* Trust Marker Kicker */}
            <div className="inline-flex items-center gap-2 text-xs font-mono text-cyan-300">
              <span className="w-2 h-2 rounded-full bg-[#00F2FE] animate-ping" />
              <span>A PROJECT OF ASCI</span>
              <span className="text-slate-600">·</span>
              <span className="text-slate-400">LAHORE TECH HUB</span>
              <span className="text-slate-600">·</span>
              <span className="text-slate-400">SOFTWARE HOUSE CERTIFICATION</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white font-display tracking-tight leading-[1.12]">
              Master In-Demand Tech Skills & Build Your Career with{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00F2FE] via-cyan-300 to-blue-400 text-glow-cyan">
                JS Developers
              </span>
            </h1>

            {/* Sub-headline */}
            <p className="text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed">
              From Web & App Development to AI & Advanced Tech — Industry-Led Practical Training in Lahore. Turn raw technical interest into high-paying local and international remote software engineering careers.
            </p>

            {/* Hero CTAs */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              {/* Primary Cyan Glow Button */}
              <button
                onClick={onExploreCourses}
                className="px-6 py-3.5 bg-[#00F2FE] hover:bg-[#38bdf8] text-slate-950 font-bold text-sm rounded-xl transition-all flex items-center gap-2 shadow-[0_0_25px_-4px_rgba(0,242,254,0.5)] hover:shadow-[0_0_35px_0_rgba(0,242,254,0.7)] hover:-translate-y-0.5 cursor-pointer"
              >
                <span>Explore Courses</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              {/* Secondary Glassmorphic Button */}
              <button
                onClick={onOpen3DBrochure}
                className="px-6 py-3.5 glass-panel text-slate-200 hover:text-white font-medium text-sm rounded-xl transition-all flex items-center gap-2 hover:border-[#00F2FE]/50 hover:-translate-y-0.5 cursor-pointer"
              >
                <BookOpen className="w-4 h-4 text-[#00F2FE]" />
                <span>View Interactive 3D Brochure</span>
              </button>
            </div>

            {/* Adjacent Quantitative Proof */}
            <div className="pt-6 border-t border-slate-800/80 grid grid-cols-3 gap-4 max-w-lg">
              <div>
                <div className="font-mono text-2xl sm:text-3xl font-extrabold text-white">
                  1,200<span className="text-[#00F2FE]">+</span>
                </div>
                <div className="text-xs text-slate-400 mt-0.5">
                  Trained Graduates
                </div>
              </div>
              <div>
                <div className="font-mono text-2xl sm:text-3xl font-extrabold text-white">
                  94<span className="text-[#00F2FE]">%</span>
                </div>
                <div className="text-xs text-slate-400 mt-0.5">
                  Placement Rate
                </div>
              </div>
              <div>
                <div className="font-mono text-2xl sm:text-3xl font-extrabold text-white">
                  10<span className="text-[#00F2FE]">+</span>
                </div>
                <div className="text-xs text-slate-400 mt-0.5">
                  In-Demand Tracks
                </div>
              </div>
            </div>
          </div>

          {/* Right Hero Visual: 3D Rotating Globe */}
          <div className="lg:col-span-5 relative flex items-center justify-center">
            <div className="relative w-full max-w-[480px]">
              <InteractiveGlobe />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
