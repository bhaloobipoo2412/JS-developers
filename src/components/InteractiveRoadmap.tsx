import React, { useState, useEffect, useRef } from 'react';
import { 
  Compass, 
  Terminal, 
  Code2, 
  UserCheck, 
  Award, 
  Briefcase, 
  CheckCircle, 
  ChevronRight,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { ROADMAP_STEPS } from '../data/roadmapData';
import { RoadmapStep } from '../types';

const STEP_ICONS = [
  Compass,
  Terminal,
  Code2,
  UserCheck,
  Award,
  Briefcase
];

export const InteractiveRoadmap: React.FC = () => {
  const [selectedStepIndex, setSelectedStepIndex] = useState<number>(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const activeStep: RoadmapStep = ROADMAP_STEPS[selectedStepIndex];
  const ActiveIcon = STEP_ICONS[selectedStepIndex] || Code2;

  // Canvas animated pulse line linking the nodes
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let particleOffset = 0;

    const render = () => {
      const width = canvas.width = canvas.parentElement?.clientWidth || 800;
      const height = canvas.height = 70;

      ctx.clearRect(0, 0, width, height);

      // Base track line
      ctx.beginPath();
      ctx.moveTo(30, height / 2);
      ctx.lineTo(width - 30, height / 2);
      ctx.strokeStyle = 'rgba(0, 242, 254, 0.15)';
      ctx.lineWidth = 3;
      ctx.stroke();

      // Progress line up to active step
      const stepWidth = (width - 60) / (ROADMAP_STEPS.length - 1);
      const activeX = 30 + selectedStepIndex * stepWidth;

      ctx.beginPath();
      ctx.moveTo(30, height / 2);
      ctx.lineTo(activeX, height / 2);
      ctx.strokeStyle = '#00F2FE';
      ctx.lineWidth = 4;
      ctx.shadowColor = '#00F2FE';
      ctx.shadowBlur = 10;
      ctx.stroke();
      ctx.shadowBlur = 0;

      // Animated energy pulse traveling along the line
      particleOffset = (particleOffset + 1.5) % (width - 60);
      const pulseX = 30 + particleOffset;

      const gradient = ctx.createRadialGradient(pulseX, height / 2, 0, pulseX, height / 2, 18);
      gradient.addColorStop(0, '#00F2FE');
      gradient.addColorStop(0.5, 'rgba(0, 242, 254, 0.4)');
      gradient.addColorStop(1, 'rgba(0, 242, 254, 0)');

      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(pulseX, height / 2, 14, 0, Math.PI * 2);
      ctx.fill();

      // Render step nodes
      ROADMAP_STEPS.forEach((_, idx) => {
        const x = 30 + idx * stepWidth;
        const isPastOrCurrent = idx <= selectedStepIndex;
        const isCurrent = idx === selectedStepIndex;

        ctx.beginPath();
        ctx.arc(x, height / 2, isCurrent ? 9 : 6, 0, Math.PI * 2);
        ctx.fillStyle = isCurrent ? '#00F2FE' : isPastOrCurrent ? '#38BDF8' : '#1E293B';
        ctx.fill();

        ctx.strokeStyle = isCurrent ? '#FFFFFF' : '#00F2FE';
        ctx.lineWidth = isCurrent ? 3 : 1.5;
        ctx.stroke();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [selectedStepIndex]);

  return (
    <div className="w-full">
      {/* Node Graph Step Pills / Scrubbers */}
      <div ref={containerRef} className="w-full mb-4">
        {/* Animated Connecting Canvas */}
        <canvas ref={canvasRef} className="w-full h-[60px] block" />

        {/* Interactive Step Buttons */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 -mt-2">
          {ROADMAP_STEPS.map((step, idx) => {
            const isSelected = selectedStepIndex === idx;
            const Icon = STEP_ICONS[idx];

            return (
              <button
                key={step.step}
                onClick={() => setSelectedStepIndex(idx)}
                className={`p-3 rounded-xl text-left transition-all duration-300 relative border ${
                  isSelected
                    ? 'bg-[#0E1A38] border-[#00F2FE] shadow-lg shadow-[#00F2FE]/20 -translate-y-1'
                    : 'bg-[#0B1224]/80 border-slate-800/80 hover:border-slate-700 text-slate-400 hover:text-slate-200'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className={`font-mono text-xs font-bold ${isSelected ? 'text-[#00F2FE]' : 'text-slate-500'}`}>
                    {step.number}
                  </span>
                  <div className={`w-7 h-7 rounded-lg flex items-center justify-center ${
                    isSelected ? 'bg-[#00F2FE]/20 text-[#00F2FE]' : 'bg-slate-800/50 text-slate-400'
                  }`}>
                    <Icon className="w-4 h-4" />
                  </div>
                </div>
                <div className={`text-xs font-semibold tracking-tight truncate ${isSelected ? 'text-white' : 'text-slate-300'}`}>
                  {step.title.split('&')[0]}
                </div>
                <div className="text-[10px] text-slate-500 font-mono mt-0.5">
                  {step.duration}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Selected Step Spotlight Glassmorphic Card */}
      <div className="glass-panel p-6 sm:p-8 rounded-2xl border border-[#00F2FE]/30 shadow-2xl relative overflow-hidden">
        {/* Ambient Corner Glow */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#00F2FE]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-4 max-w-2xl">
            <div className="flex items-center gap-3">
              <span className="px-2.5 py-1 rounded bg-[#00F2FE]/20 text-[#00F2FE] font-mono font-bold text-xs border border-[#00F2FE]/30">
                PHASE {activeStep.number}
              </span>
              <span className="text-xs font-mono text-slate-400">
                Duration: {activeStep.duration}
              </span>
              <span className="text-slate-600">·</span>
              <span className="text-xs text-cyan-300 font-medium">
                {activeStep.focus}
              </span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-bold text-white font-display flex items-center gap-3">
              <ActiveIcon className="w-7 h-7 text-[#00F2FE] shrink-0" />
              <span>{activeStep.title}</span>
            </h3>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              {activeStep.summary}
            </p>

            {/* Deliverables Checklist */}
            <div className="pt-2">
              <div className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-3">
                Key Milestone Deliverables & Exposure:
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {activeStep.deliverables.map((item, dIdx) => (
                  <div key={dIdx} className="flex items-start gap-2.5 text-xs text-slate-200">
                    <CheckCircle className="w-4 h-4 text-[#00F2FE] shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Stepper Controls */}
          <div className="flex lg:flex-col gap-2 shrink-0 pt-4 lg:pt-0 border-t lg:border-t-0 lg:border-l border-slate-800 lg:pl-6">
            <button
              onClick={() => setSelectedStepIndex(prev => Math.min(ROADMAP_STEPS.length - 1, prev + 1))}
              disabled={selectedStepIndex === ROADMAP_STEPS.length - 1}
              className="px-4 py-2.5 bg-[#00F2FE] hover:bg-[#38bdf8] disabled:opacity-40 text-slate-950 font-bold text-xs rounded-xl flex items-center justify-center gap-2 transition-all shadow-md shadow-[#00F2FE]/20"
            >
              <span>Next Milestone</span>
              <ChevronRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => setSelectedStepIndex(prev => Math.max(0, prev - 1))}
              disabled={selectedStepIndex === 0}
              className="px-4 py-2 bg-slate-900 hover:bg-slate-800 disabled:opacity-40 text-slate-300 font-medium text-xs rounded-xl border border-slate-800 transition-all text-center"
            >
              Previous Phase
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
