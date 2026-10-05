import React, { useState } from 'react';
import { Menu, X, BookOpen, Sparkles, Phone } from 'lucide-react';
import { BrandLogo } from './BrandLogo';

interface HeaderProps {
  onOpenEnrollModal: () => void;
  onOpenDownloadModal: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenEnrollModal,
  onOpenDownloadModal
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full bg-[#070B14]/90 backdrop-blur-md border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Zone 1: Single Brand Element */}
        <a href="#home" className="flex items-center">
          <BrandLogo size="md" />
        </a>

        {/* Zone 2: 4-6 Clean Text Nav Links */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-300">
          <a href="#home" className="hover:text-[#00F2FE] transition-colors">Home</a>
          <a href="#courses" className="hover:text-[#00F2FE] transition-colors">Courses</a>
          <a href="#brochure" className="hover:text-[#00F2FE] transition-colors">3D Brochure</a>
          <a href="#roadmap" className="hover:text-[#00F2FE] transition-colors">Roadmap</a>
          <a href="#about" className="hover:text-[#00F2FE] transition-colors">About</a>
          <a href="#contact" className="hover:text-[#00F2FE] transition-colors">Contact</a>
        </nav>

        {/* Zone 3: Primary Action CTA */}
        <div className="hidden sm:flex items-center gap-3">
          <button
            onClick={onOpenDownloadModal}
            className="px-3.5 py-2 text-xs font-semibold text-slate-200 hover:text-white glass-panel rounded-xl transition-all"
          >
            Brochure PDF
          </button>
          <button
            onClick={onOpenEnrollModal}
            className="px-4 py-2 bg-[#00F2FE] hover:bg-[#38bdf8] text-slate-950 font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-[0_0_15px_rgba(0,242,254,0.4)] hover:shadow-[0_0_22px_rgba(0,242,254,0.6)] cursor-pointer"
          >
            Enroll Now
          </button>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="flex sm:hidden items-center gap-2">
          <button
            onClick={onOpenEnrollModal}
            className="px-3 py-1.5 bg-[#00F2FE] text-slate-950 font-bold text-xs rounded-lg"
          >
            Enroll
          </button>
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-white"
            aria-label="Toggle mobile menu"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isMobileMenuOpen && (
        <div className="sm:hidden border-b border-slate-800 bg-[#070B14] px-4 pt-3 pb-5 space-y-3 animate-fade-in">
          <nav className="flex flex-col space-y-2.5 text-sm font-medium text-slate-300">
            <a 
              href="#home" 
              onClick={() => setIsMobileMenuOpen(false)}
              className="py-1.5 px-3 rounded-lg hover:bg-slate-900 hover:text-[#00F2FE] transition-colors"
            >
              Home
            </a>
            <a 
              href="#courses" 
              onClick={() => setIsMobileMenuOpen(false)}
              className="py-1.5 px-3 rounded-lg hover:bg-slate-900 hover:text-[#00F2FE] transition-colors"
            >
              Courses Directory
            </a>
            <a 
              href="#brochure" 
              onClick={() => setIsMobileMenuOpen(false)}
              className="py-1.5 px-3 rounded-lg hover:bg-slate-900 hover:text-[#00F2FE] transition-colors"
            >
              3D Tri-Fold Brochure
            </a>
            <a 
              href="#roadmap" 
              onClick={() => setIsMobileMenuOpen(false)}
              className="py-1.5 px-3 rounded-lg hover:bg-slate-900 hover:text-[#00F2FE] transition-colors"
            >
              Learning Roadmap
            </a>
            <a 
              href="#about" 
              onClick={() => setIsMobileMenuOpen(false)}
              className="py-1.5 px-3 rounded-lg hover:bg-slate-900 hover:text-[#00F2FE] transition-colors"
            >
              About & Leadership
            </a>
            <a 
              href="#contact" 
              onClick={() => setIsMobileMenuOpen(false)}
              className="py-1.5 px-3 rounded-lg hover:bg-slate-900 hover:text-[#00F2FE] transition-colors"
            >
              Contact & Map
            </a>
          </nav>

          <div className="pt-2 border-t border-slate-800 flex flex-col gap-2">
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                onOpenDownloadModal();
              }}
              className="w-full py-2.5 glass-panel text-slate-200 text-xs font-semibold rounded-xl text-center"
            >
              Download Official Syllabus PDF
            </button>
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                onOpenEnrollModal();
              }}
              className="w-full py-2.5 bg-[#00F2FE] text-slate-950 text-xs font-bold uppercase rounded-xl text-center"
            >
              Enroll Now
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
