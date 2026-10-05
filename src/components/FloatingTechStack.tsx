import React, { useState } from 'react';
import { TECH_STACK_ITEMS } from '../data/roadmapData';
import { 
  Code, 
  Palette, 
  Zap, 
  Layers, 
  Layout, 
  Atom, 
  Server, 
  Cpu, 
  Brain, 
  Box, 
  Film, 
  Terminal,
  ExternalLink
} from 'lucide-react';

const ICON_MAP: Record<string, React.ElementType> = {
  Code,
  Palette,
  Zap,
  Layers,
  Layout,
  Atom,
  Server,
  Cpu,
  Brain,
  Box,
  Film,
  Terminal,
};

export const FloatingTechStack: React.FC = () => {
  const [activeTech, setActiveTech] = useState<string | null>(null);

  return (
    <div className="w-full">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4">
        {TECH_STACK_ITEMS.map((item, index) => {
          const Icon = ICON_MAP[item.iconName] || Code;
          const isActive = activeTech === item.name;

          return (
            <div
              key={item.name}
              onMouseEnter={() => setActiveTech(item.name)}
              onMouseLeave={() => setActiveTech(null)}
              className="group relative cursor-pointer"
              style={{
                perspective: '800px',
              }}
            >
              <div 
                className={`relative p-4 rounded-xl transition-all duration-300 transform-gpu bg-gradient-to-b ${item.accent} backdrop-blur-md border ${
                  isActive 
                    ? 'border-[#00F2FE] shadow-[0_10px_25px_-5px_rgba(0,242,254,0.3)] -translate-y-2' 
                    : 'border-slate-800/80 hover:border-slate-700 hover:-translate-y-1'
                }`}
                style={{
                  transformStyle: 'preserve-3d',
                  animationDelay: `${index * 120}ms`
                }}
              >
                {/* Tech Icon and Badge */}
                <div className="flex items-center justify-between mb-3">
                  <div 
                    className="w-10 h-10 rounded-lg flex items-center justify-center transition-transform group-hover:scale-110 shadow-inner"
                    style={{ backgroundColor: `${item.color}15`, border: `1px solid ${item.color}40` }}
                  >
                    <Icon className="w-5 h-5" style={{ color: item.color }} />
                  </div>
                  <span className="text-[10px] font-mono text-slate-400 group-hover:text-slate-200">
                    {item.category}
                  </span>
                </div>

                <div className="text-sm font-bold text-white tracking-tight group-hover:text-[#00F2FE] transition-colors">
                  {item.name}
                </div>

                <p className="text-[11px] text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                  {item.description}
                </p>

                {/* Subtle Glow Corner Marker */}
                <div 
                  className="absolute bottom-1 right-2 text-[9px] font-mono opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{ color: item.color }}
                >
                  ACTIVE TECH
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
