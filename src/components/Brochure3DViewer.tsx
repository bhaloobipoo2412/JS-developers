import React, { useState, useRef } from 'react';
import { 
  Rotate3d, 
  FlipHorizontal, 
  Maximize2, 
  BookOpen, 
  CheckCircle2, 
  Phone, 
  Mail, 
  Globe, 
  MapPin, 
  Download, 
  ArrowRight,
  Sparkles,
  Layers
} from 'lucide-react';
import { COURSES_DATA } from '../data/coursesData';
import { ROADMAP_STEPS } from '../data/roadmapData';

interface Brochure3DViewerProps {
  onOpenDownloadModal: () => void;
  onSelectCourse: (courseId: string) => void;
}

export const Brochure3DViewer: React.FC<Brochure3DViewerProps> = ({
  onOpenDownloadModal,
  onSelectCourse
}) => {
  const [foldState, setFoldState] = useState<'flat' | 'trifold' | 'folded'>('trifold');
  const [activeSide, setActiveSide] = useState<'inside' | 'outside'>('inside');
  const [focusedPanel, setFocusedPanel] = useState<'all' | 'left' | 'center' | 'right'>('all');
  const [rotX, setRotX] = useState<number>(10);
  const [rotY, setRotY] = useState<number>(-14);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const dragStartRef = useRef<{ x: number; y: number; startRotX: number; startRotY: number }>({
    x: 0,
    y: 0,
    startRotX: 10,
    startRotY: -14,
  });

  // Mouse drag handlers for 3D orientation
  const handleMouseDown = (e: React.MouseEvent) => {
    // Only drag when clicking background or container, not interactive buttons
    if ((e.target as HTMLElement).closest('button') || (e.target as HTMLElement).closest('a')) {
      return;
    }
    setIsDragging(true);
    dragStartRef.current = {
      x: e.clientX,
      y: e.clientY,
      startRotX: rotX,
      startRotY: rotY
    };
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    const deltaX = e.clientX - dragStartRef.current.x;
    const deltaY = e.clientY - dragStartRef.current.y;

    // Dampen rotation
    const newRotY = dragStartRef.current.startRotY + deltaX * 0.35;
    const newRotX = Math.max(-30, Math.min(35, dragStartRef.current.startRotX - deltaY * 0.3));

    setRotX(newRotX);
    setRotY(newRotY);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Reset to default angle
  const handleResetCamera = () => {
    setRotX(10);
    setRotY(-14);
    setFocusedPanel('all');
  };

  // Calculate fold angles based on state
  const getPanelAngles = () => {
    if (focusedPanel !== 'all') {
      return { left: 0, right: 0 };
    }
    switch (foldState) {
      case 'flat':
        return { left: 0, right: 0 };
      case 'trifold':
        return { left: 24, right: -28 };
      case 'folded':
        return { left: 85, right: -88 };
      default:
        return { left: 20, right: -24 };
    }
  };

  const angles = getPanelAngles();

  return (
    <div className="w-full">
      {/* 3D Hub Controls Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-[#00F2FE]/10 border border-[#00F2FE]/30 flex items-center justify-center text-[#00F2FE]">
            <BookOpen className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-semibold text-white flex items-center gap-2">
              Interactive 3D Tri-Fold Brochure
              <span className="text-[11px] font-mono text-[#00F2FE] border border-[#00F2FE]/30 px-2 py-0.5 rounded-full">
                WebGL Spatial View
              </span>
            </h3>
            <p className="text-xs text-slate-400">
              Drag in space to inspect panels, click to fold/flip, or tap any course
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Fold Selector */}
          <div className="flex items-center p-1 bg-slate-900/90 rounded-lg border border-slate-800 text-xs font-medium">
            <button
              onClick={() => { setFoldState('flat'); setFocusedPanel('all'); }}
              className={`px-3 py-1.5 rounded-md transition-all ${
                foldState === 'flat' && focusedPanel === 'all'
                  ? 'bg-[#00F2FE] text-slate-950 font-semibold shadow-sm'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              Spread Flat
            </button>
            <button
              onClick={() => { setFoldState('trifold'); setFocusedPanel('all'); }}
              className={`px-3 py-1.5 rounded-md transition-all ${
                foldState === 'trifold' && focusedPanel === 'all'
                  ? 'bg-[#00F2FE] text-slate-950 font-semibold shadow-sm'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              3D Tri-Fold
            </button>
            <button
              onClick={() => { setFoldState('folded'); setFocusedPanel('all'); }}
              className={`px-3 py-1.5 rounded-md transition-all ${
                foldState === 'folded' && focusedPanel === 'all'
                  ? 'bg-[#00F2FE] text-slate-950 font-semibold shadow-sm'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              Folded Pocket
            </button>
          </div>

          {/* Flip Side Toggle */}
          <button
            onClick={() => setActiveSide(prev => prev === 'inside' ? 'outside' : 'inside')}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-200 bg-slate-900 border border-slate-700/80 rounded-lg hover:border-[#00F2FE]/50 hover:text-white transition-all shadow-sm"
          >
            <FlipHorizontal className="w-3.5 h-3.5 text-[#00F2FE]" />
            Flip: {activeSide === 'inside' ? 'Inside (Courses)' : 'Outside (Cover)'}
          </button>

          {/* Reset Camera */}
          <button
            onClick={handleResetCamera}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-400 hover:text-slate-200 bg-slate-900/60 border border-slate-800 rounded-lg transition-all"
            title="Reset 3D Angle"
          >
            <Rotate3d className="w-3.5 h-3.5" />
            Reset Angle
          </button>

          {/* Download Official PDF */}
          <button
            onClick={onOpenDownloadModal}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-950 bg-[#00F2FE] hover:bg-[#38bdf8] rounded-lg transition-all shadow-md shadow-[#00F2FE]/20"
          >
            <Download className="w-3.5 h-3.5" />
            Download PDF
          </button>
        </div>
      </div>

      {/* 3D Spatial Canvas Stage */}
      <div 
        className="relative w-full h-[620px] sm:h-[680px] lg:h-[720px] bg-gradient-to-b from-[#090E1A] via-[#0B132B]/80 to-[#070B14] rounded-2xl border border-[#00F2FE]/20 overflow-hidden flex items-center justify-center select-none"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        style={{
          perspective: '1400px',
          cursor: isDragging ? 'grabbing' : 'grab'
        }}
      >
        {/* Subtle Tech Circuit Grid Underlay */}
        <div className="absolute inset-0 bg-circuit-grid opacity-25 pointer-events-none" />

        {/* Dynamic Studio Ambient Glows */}
        <div className="absolute top-1/4 -left-20 w-80 h-80 bg-[#00F2FE]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

        {/* Helper Badge: Drag & Focus */}
        <div className="absolute top-4 left-4 z-20 flex items-center gap-2 text-[11px] font-mono text-slate-400 bg-slate-950/80 px-3 py-1 rounded-full border border-slate-800 backdrop-blur-md">
          <span className="w-1.5 h-1.5 rounded-full bg-[#00F2FE] animate-pulse" />
          Perspective: {rotX.toFixed(0)}° X · {rotY.toFixed(0)}° Y · Drag mouse to orbit
        </div>

        {/* Panel Direct Quick-Selectors */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex items-center gap-1.5 bg-slate-950/90 p-1.5 rounded-xl border border-slate-800 shadow-2xl backdrop-blur-md">
          <span className="text-[11px] text-slate-400 px-2 font-mono">Zoom to:</span>
          <button
            onClick={() => { setFocusedPanel('left'); setRotX(0); setRotY(0); }}
            className={`px-2.5 py-1 text-xs rounded-lg transition-all ${
              focusedPanel === 'left' ? 'bg-[#00F2FE] text-slate-950 font-semibold' : 'text-slate-300 hover:text-white'
            }`}
          >
            Left (Courses)
          </button>
          <button
            onClick={() => { setFocusedPanel('center'); setRotX(0); setRotY(0); }}
            className={`px-2.5 py-1 text-xs rounded-lg transition-all ${
              focusedPanel === 'center' ? 'bg-[#00F2FE] text-slate-950 font-semibold' : 'text-slate-300 hover:text-white'
            }`}
          >
            Center (About)
          </button>
          <button
            onClick={() => { setFocusedPanel('right'); setRotX(0); setRotY(0); }}
            className={`px-2.5 py-1 text-xs rounded-lg transition-all ${
              focusedPanel === 'right' ? 'bg-[#00F2FE] text-slate-950 font-semibold' : 'text-slate-300 hover:text-white'
            }`}
          >
            Right (Journey & Contact)
          </button>
          <button
            onClick={handleResetCamera}
            className={`px-2.5 py-1 text-xs rounded-lg transition-all ${
              focusedPanel === 'all' ? 'bg-slate-800 text-white' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Show All 3
          </button>
        </div>

        {/* 3D BROCHURE ROOT OBJECT */}
        <div
          className="relative transition-transform duration-500 ease-out flex items-center justify-center transform-gpu"
          style={{
            transformStyle: 'preserve-3d',
            transform: `rotateX(${rotX}deg) rotateY(${rotY}deg) ${
              focusedPanel === 'left' ? 'scale(1.2) translateX(30%)' :
              focusedPanel === 'center' ? 'scale(1.2)' :
              focusedPanel === 'right' ? 'scale(1.2) translateX(-30%)' : 'scale(0.96)'
            }`
          }}
        >
          {/* Tri-Fold Container Spread: 3 Panels */}
          <div 
            className="flex items-stretch shadow-[0_30px_70px_rgba(0,0,0,0.8)] rounded-xl overflow-visible border border-slate-700/50"
            style={{ transformStyle: 'preserve-3d' }}
          >
            {/* ======================================================== */}
            {/* PANEL 1: LEFT PANEL (FULL COURSE DIRECTORY)             */}
            {/* ======================================================== */}
            <div
              className="w-[280px] sm:w-[320px] md:w-[340px] h-[540px] sm:h-[580px] bg-[#0A1224] rounded-l-xl p-5 border-r border-[#00F2FE]/20 flex flex-col justify-between overflow-y-auto relative transition-transform duration-500 shadow-xl"
              style={{
                transformOrigin: 'right center',
                transform: `rotateY(${angles.left}deg)`,
                transformStyle: 'preserve-3d'
              }}
            >
              {/* Subtle Fold Shadow Overlay */}
              <div 
                className="absolute inset-y-0 right-0 w-8 pointer-events-none bg-gradient-to-l from-black/40 to-transparent" 
                style={{ opacity: foldState === 'trifold' ? 0.6 : 0 }}
              />

              {activeSide === 'inside' ? (
                /* INSIDE LEFT: SHORT COURSES & DIRECTORY */
                <div className="space-y-4">
                  {/* Header Badge */}
                  <div className="border-b border-[#00F2FE]/20 pb-3">
                    <div className="text-[10px] font-mono tracking-widest uppercase text-[#00F2FE]">
                      Full Course Directory
                    </div>
                    <h4 className="text-lg font-bold text-white font-display tracking-tight flex items-center gap-1.5">
                      OUR SHORT COURSES
                    </h4>
                  </div>

                  {/* Section 1: Web & App Development */}
                  <div className="bg-[#0e1933]/90 rounded-xl p-3.5 border border-[#00F2FE]/25">
                    <div className="flex items-center gap-2 mb-2 text-[#00F2FE] font-bold text-xs">
                      <span className="w-5 h-5 rounded-md bg-[#00F2FE]/20 flex items-center justify-center text-[11px] font-mono text-[#00F2FE]">
                        1
                      </span>
                      <span>Web & App Development</span>
                    </div>
                    <ul className="text-xs text-slate-300 space-y-1.5">
                      <li 
                        onClick={() => onSelectCourse('html-css-js-frontend')}
                        className="flex items-center justify-between hover:text-[#00F2FE] cursor-pointer transition-colors group"
                      >
                        <span className="flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#00F2FE]" />
                          HTML5 & CSS3
                        </span>
                        <span className="text-[10px] font-mono text-slate-500 group-hover:text-[#00F2FE]">View</span>
                      </li>
                      <li 
                        onClick={() => onSelectCourse('html-css-js-frontend')}
                        className="flex items-center justify-between hover:text-[#00F2FE] cursor-pointer transition-colors group"
                      >
                        <span className="flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#00F2FE]" />
                          JavaScript & jQuery
                        </span>
                        <span className="text-[10px] font-mono text-slate-500 group-hover:text-[#00F2FE]">View</span>
                      </li>
                      <li 
                        onClick={() => onSelectCourse('html-css-js-frontend')}
                        className="flex items-center justify-between hover:text-[#00F2FE] cursor-pointer transition-colors group"
                      >
                        <span className="flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#00F2FE]" />
                          Bootstrap & Tailwind
                        </span>
                        <span className="text-[10px] font-mono text-slate-500 group-hover:text-[#00F2FE]">View</span>
                      </li>
                      <li 
                        onClick={() => onSelectCourse('mern-fullstack')}
                        className="flex items-center justify-between text-cyan-300 font-semibold hover:text-white cursor-pointer transition-colors group pt-1 border-t border-slate-700/50"
                      >
                        <span className="flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
                          Full Stack & MERN Stack
                        </span>
                        <span className="text-[10px] font-mono text-[#00F2FE]">Specialist</span>
                      </li>
                    </ul>
                  </div>

                  {/* Section 2: Creative & Advanced Tech */}
                  <div className="bg-[#0e1933]/90 rounded-xl p-3.5 border border-purple-500/25">
                    <div className="flex items-center gap-2 mb-2 text-purple-400 font-bold text-xs">
                      <span className="w-5 h-5 rounded-md bg-purple-500/20 flex items-center justify-center text-[11px] font-mono text-purple-300">
                        2
                      </span>
                      <span>Creative & Advanced Tech</span>
                    </div>
                    <ul className="text-xs text-slate-300 space-y-1.5">
                      <li 
                        onClick={() => onSelectCourse('ai-machine-learning')}
                        className="flex items-center justify-between hover:text-purple-300 cursor-pointer transition-colors"
                      >
                        <span className="flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-purple-400" />
                          Artificial Intelligence & ML
                        </span>
                        <span className="text-[10px] font-mono text-slate-500">3 Mos</span>
                      </li>
                      <li 
                        onClick={() => onSelectCourse('autocad-engineering')}
                        className="flex items-center justify-between hover:text-purple-300 cursor-pointer transition-colors"
                      >
                        <span className="flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-purple-400" />
                          AutoCAD 2D/3D Design
                        </span>
                        <span className="text-[10px] font-mono text-slate-500">10 Wks</span>
                      </li>
                      <li 
                        onClick={() => onSelectCourse('video-editing-motion')}
                        className="flex items-center justify-between hover:text-purple-300 cursor-pointer transition-colors"
                      >
                        <span className="flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-purple-400" />
                          Premiere Pro & After Effects
                        </span>
                        <span className="text-[10px] font-mono text-slate-500">8 Wks</span>
                      </li>
                      <li 
                        onClick={() => onSelectCourse('youtube-automation')}
                        className="flex items-center justify-between hover:text-purple-300 cursor-pointer transition-colors"
                      >
                        <span className="flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-purple-400" />
                          YouTube Automation Strategy
                        </span>
                        <span className="text-[10px] font-mono text-slate-500">6 Wks</span>
                      </li>
                      <li 
                        onClick={() => onSelectCourse('freelancing-remote-work')}
                        className="flex items-center justify-between hover:text-purple-300 cursor-pointer transition-colors"
                      >
                        <span className="flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-purple-400" />
                          Freelancing Mastery (Upwork/Fiverr)
                        </span>
                        <span className="text-[10px] font-mono text-slate-500">4 Wks</span>
                      </li>
                    </ul>
                  </div>

                  {/* Accreditations Bottom Box */}
                  <div className="pt-2 border-t border-slate-800">
                    <div className="text-[10px] uppercase font-mono text-slate-400 mb-1.5">
                      Accreditations & Tech Stacks
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded bg-orange-500/20 text-orange-400 text-[10px] font-bold">HTML5</span>
                      <span className="px-2 py-0.5 rounded bg-blue-500/20 text-blue-400 text-[10px] font-bold">CSS3</span>
                      <span className="px-2 py-0.5 rounded bg-yellow-500/20 text-yellow-300 text-[10px] font-bold">JS</span>
                      <span className="px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 text-[10px] font-bold">REACT</span>
                      <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 text-[10px] font-bold">NODE</span>
                    </div>
                  </div>
                </div>
              ) : (
                /* OUTSIDE FLAP: FRONT COVER TEASER */
                <div className="h-full flex flex-col justify-between py-6">
                  <div>
                    <div className="text-[10px] font-mono tracking-widest text-[#00F2FE] mb-2 uppercase">
                      Software House Training
                    </div>
                    <h4 className="text-2xl font-extrabold text-white font-display mb-3">
                      PRACTICAL TECH ACADEMY
                    </h4>
                    <p className="text-xs text-slate-300 leading-relaxed mb-4">
                      Industry-led curriculum built by active software engineers to bridge the gap between academic theory and high-paying global employment.
                    </p>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 text-xs text-slate-300 space-y-2">
                    <div className="flex items-center gap-2 text-white font-medium">
                      <CheckCircle2 className="w-4 h-4 text-[#00F2FE]" />
                      Real Client Projects
                    </div>
                    <div className="flex items-center gap-2 text-white font-medium">
                      <CheckCircle2 className="w-4 h-4 text-[#00F2FE]" />
                      1-on-1 Code Mentorship
                    </div>
                    <div className="flex items-center gap-2 text-white font-medium">
                      <CheckCircle2 className="w-4 h-4 text-[#00F2FE]" />
                      Lahore Physical & Remote Lab
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* ======================================================== */}
            {/* PANEL 2: CENTER PANEL (ABOUT JS DEVELOPERS)              */}
            {/* ======================================================== */}
            <div
              className="w-[280px] sm:w-[320px] md:w-[340px] h-[540px] sm:h-[580px] bg-[#070D1E] p-5 flex flex-col justify-between overflow-y-auto relative z-10 transition-transform duration-500 shadow-2xl"
              style={{ transformStyle: 'preserve-3d' }}
            >
              {activeSide === 'inside' ? (
                <div className="space-y-4">
                  {/* Header */}
                  <div className="border-b border-[#00F2FE]/20 pb-3">
                    <div className="text-[10px] font-mono tracking-widest uppercase text-[#00F2FE]">
                      Institution Overview
                    </div>
                    <h4 className="text-xl font-extrabold text-white font-display tracking-tight">
                      ABOUT JS DEVELOPERS
                    </h4>
                  </div>

                  {/* Mission Statement reflecting exact brochure text */}
                  <div className="text-xs text-slate-300 space-y-3 leading-relaxed">
                    <p>
                      <strong className="text-white">JS Developers</strong> is an entrepreneurial mission of innovation and outstanding competence, dedicated to converting students, beginners, and aspiring creators into industry-ready engineers.
                    </p>
                    <p>
                      We harness our passion for technology with domestic and international market values—turning raw talent into high-demand software engineering, AI automation, and digital production professionals.
                    </p>
                  </div>

                  {/* High-tech Holographic Globe graphic */}
                  <div className="relative py-3 flex flex-col items-center justify-center">
                    <div className="w-28 h-28 rounded-full border border-[#00F2FE]/40 flex items-center justify-center relative bg-radial-gradient">
                      <div className="w-20 h-20 rounded-full border border-[#00F2FE]/60 animate-ping opacity-25" />
                      <div className="w-14 h-14 rounded-full bg-[#00F2FE]/20 flex items-center justify-center text-[#00F2FE]">
                        <Globe className="w-8 h-8" />
                      </div>
                    </div>
                    <div className="mt-2 text-center">
                      <span className="text-[11px] font-mono text-[#00F2FE] uppercase tracking-wider">
                        Lahore Tech Hub · Global Reach
                      </span>
                    </div>
                  </div>

                  {/* Lead Developers Signature Box */}
                  <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 text-xs">
                    <div className="text-[10px] font-mono text-slate-400 uppercase mb-1">
                      Lead Software Engineers & Founders
                    </div>
                    <div className="text-white font-bold flex items-center justify-between">
                      <span>Muhammad Saboor ul iman</span>
                      <span className="text-[10px] font-normal text-slate-400">Full Stack & AI</span>
                    </div>
                    <div className="text-white font-bold flex items-center justify-between mt-1">
                      <span>Muhammad Jahanzaib Akhtar</span>
                      <span className="text-[10px] font-normal text-slate-400">Systems & CAD</span>
                    </div>
                  </div>
                </div>
              ) : (
                /* OUTSIDE CENTER: OFFICIAL ACCREDITATION */
                <div className="h-full flex flex-col justify-between py-4">
                  <div className="border-b border-slate-800 pb-3">
                    <div className="text-[10px] font-mono text-[#00F2FE] uppercase">
                      Institutional Accreditation
                    </div>
                    <h4 className="text-lg font-bold text-white font-display">
                      A Project of ASCI
                    </h4>
                  </div>
                  <div className="text-xs text-slate-300 space-y-3 leading-relaxed">
                    <p>
                      Official software house collaboration authorized under ASCI educational frameworks.
                    </p>
                    <p>
                      Students earn verified industry certifications recognized by software houses and tech employers across Pakistan and international remote recruiters.
                    </p>
                  </div>
                  <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 text-center">
                    <span className="text-[11px] font-mono text-[#00F2FE]">
                      Verification Code: JS-ASCI-LHR-2026
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* ======================================================== */}
            {/* PANEL 3: RIGHT PANEL (PROJECT JOURNEY & CONTACT INFO)    */}
            {/* ======================================================== */}
            <div
              className="w-[280px] sm:w-[320px] md:w-[340px] h-[540px] sm:h-[580px] bg-[#0A1224] rounded-r-xl p-5 border-l border-[#00F2FE]/20 flex flex-col justify-between overflow-y-auto relative transition-transform duration-500 shadow-xl"
              style={{
                transformOrigin: 'left center',
                transform: `rotateY(${angles.right}deg)`,
                transformStyle: 'preserve-3d'
              }}
            >
              {/* Subtle Crease Shadow */}
              <div 
                className="absolute inset-y-0 left-0 w-8 pointer-events-none bg-gradient-to-r from-black/40 to-transparent" 
                style={{ opacity: foldState === 'trifold' ? 0.6 : 0 }}
              />

              {activeSide === 'inside' ? (
                <div className="space-y-4">
                  {/* Header & Logo */}
                  <div className="border-b border-[#00F2FE]/20 pb-2.5">
                    <div className="flex items-center justify-between">
                      <span className="text-base font-extrabold text-white font-display">
                        JS <span className="text-[#00F2FE]">DEVELOPERS</span>
                      </span>
                      <span className="text-[10px] font-mono text-[#00F2FE] bg-[#00F2FE]/10 px-2 py-0.5 rounded">
                        ASCI Project
                      </span>
                    </div>
                    <div className="text-[10px] text-slate-400 font-mono">
                      “WHERE SKILLS BECOME CAREERS”
                    </div>
                  </div>

                  {/* Project Journey 6-Step Visual Workflow */}
                  <div>
                    <div className="text-[10px] font-mono uppercase tracking-wider text-[#00F2FE] mb-1.5 flex items-center justify-between">
                      <span>Project Journey</span>
                      <span className="text-[9px] text-slate-400">01 → 06</span>
                    </div>
                    <div className="grid grid-cols-3 gap-1.5 text-center mb-2">
                      <div className="bg-[#0e1933] p-1.5 rounded border border-slate-800 text-[10px]">
                        <span className="font-mono text-[#00F2FE] block font-bold">01</span>
                        <span className="text-slate-300 text-[9px] truncate block">Counseling</span>
                      </div>
                      <div className="bg-[#0e1933] p-1.5 rounded border border-slate-800 text-[10px]">
                        <span className="font-mono text-[#00F2FE] block font-bold">02</span>
                        <span className="text-slate-300 text-[9px] truncate block">Training</span>
                      </div>
                      <div className="bg-[#0e1933] p-1.5 rounded border border-slate-800 text-[10px]">
                        <span className="font-mono text-[#00F2FE] block font-bold">03</span>
                        <span className="text-slate-300 text-[9px] truncate block">Projects</span>
                      </div>
                      <div className="bg-[#0e1933] p-1.5 rounded border border-slate-800 text-[10px]">
                        <span className="font-mono text-[#00F2FE] block font-bold">04</span>
                        <span className="text-slate-300 text-[9px] truncate block">Reviews</span>
                      </div>
                      <div className="bg-[#0e1933] p-1.5 rounded border border-slate-800 text-[10px]">
                        <span className="font-mono text-[#00F2FE] block font-bold">05</span>
                        <span className="text-slate-300 text-[9px] truncate block">Certificate</span>
                      </div>
                      <div className="bg-[#0e1933] p-1.5 rounded border border-slate-800 text-[10px]">
                        <span className="font-mono text-[#00F2FE] block font-bold">06</span>
                        <span className="text-slate-300 text-[9px] truncate block">Placement</span>
                      </div>
                    </div>
                  </div>

                  {/* Contact Info from Brochure & Flyer */}
                  <div className="bg-[#070E20] rounded-xl p-3 border border-[#00F2FE]/25 space-y-2 text-xs">
                    <div className="flex items-center gap-2.5">
                      <div className="w-6 h-6 rounded bg-[#00F2FE]/20 flex items-center justify-center text-[#00F2FE] shrink-0">
                        <Phone className="w-3.5 h-3.5" />
                      </div>
                      <div className="truncate">
                        <div className="text-[10px] text-slate-400 font-mono">Mobile / WhatsApp:</div>
                        <a href="tel:+923294589432" className="text-white hover:text-[#00F2FE] font-mono font-medium block">
                          +92 329 4589432
                        </a>
                      </div>
                    </div>

                    <div className="flex items-center gap-2.5">
                      <div className="w-6 h-6 rounded bg-[#00F2FE]/20 flex items-center justify-center text-[#00F2FE] shrink-0">
                        <Mail className="w-3.5 h-3.5" />
                      </div>
                      <div className="truncate">
                        <div className="text-[10px] text-slate-400 font-mono">Official Email:</div>
                        <a href="mailto:jsdevelopersofficial@gmail.com" className="text-white hover:text-[#00F2FE] text-[11px] truncate block">
                          jsdevelopersofficial@gmail.com
                        </a>
                      </div>
                    </div>

                    <div className="flex items-center gap-2.5">
                      <div className="w-6 h-6 rounded bg-[#00F2FE]/20 flex items-center justify-center text-[#00F2FE] shrink-0">
                        <Globe className="w-3.5 h-3.5" />
                      </div>
                      <div className="truncate">
                        <div className="text-[10px] text-slate-400 font-mono">Web Portal:</div>
                        <span className="text-white font-mono text-[11px] block">
                          www.jsdevelopers.com
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2.5">
                      <div className="w-6 h-6 rounded bg-[#00F2FE]/20 flex items-center justify-center text-[#00F2FE] shrink-0">
                        <MapPin className="w-3.5 h-3.5" />
                      </div>
                      <div className="truncate">
                        <div className="text-[10px] text-slate-400 font-mono">Tech Campus:</div>
                        <span className="text-slate-200 text-[11px] block">
                          Lahore, Pakistan
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Fast Action CTA inside panel */}
                  <button
                    onClick={onOpenDownloadModal}
                    className="w-full py-2 bg-gradient-to-r from-[#00F2FE] to-cyan-400 hover:from-cyan-300 hover:to-cyan-500 text-slate-950 font-bold text-xs rounded-lg transition-all flex items-center justify-center gap-2 shadow-lg shadow-[#00F2FE]/20"
                  >
                    <span>Receive Syllabus PDF</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              ) : (
                /* OUTSIDE FLAP: BACK COVER */
                <div className="h-full flex flex-col justify-between py-6">
                  <div>
                    <div className="text-[10px] font-mono text-[#00F2FE] uppercase mb-2">
                      Admissions Open
                    </div>
                    <h4 className="text-xl font-bold text-white font-display mb-3">
                      ENROLL FOR UPCOMING COHORT
                    </h4>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      Limited seats per batch to preserve instructor-to-student attention and software house mentorship quality.
                    </p>
                  </div>
                  <div className="p-3 bg-slate-900/90 rounded-xl border border-slate-800 text-center">
                    <div className="text-xs text-slate-300 mb-2">Have questions about admissions?</div>
                    <a
                      href="https://wa.me/923294589432"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-500 text-slate-950 font-semibold text-xs rounded-lg"
                    >
                      Chat on WhatsApp: +92 329 4589432
                    </a>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
