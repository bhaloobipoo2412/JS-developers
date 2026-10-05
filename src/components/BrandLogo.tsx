import React from 'react';

interface BrandLogoProps {
  className?: string;
  showTagline?: boolean;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  className = '',
  showTagline = false,
  size = 'md'
}) => {
  const sizeMap = {
    sm: { icon: 34, text: 'text-base', sub: 'text-[9px]' },
    md: { icon: 42, text: 'text-lg', sub: 'text-[10px]' },
    lg: { icon: 56, text: 'text-2xl', sub: 'text-xs' },
    xl: { icon: 72, text: 'text-3xl', sub: 'text-sm' }
  };

  const config = sizeMap[size];

  return (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      {/* SVG Emblem reflecting the brochure and logo JS.jpeg design */}
      <div className="relative shrink-0 flex items-center justify-center">
        <svg
          width={config.icon}
          height={config.icon}
          viewBox="0 0 120 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="drop-shadow-[0_0_12px_rgba(0,242,254,0.5)] transition-transform hover:scale-105 duration-300"
        >
          {/* Subtle Outer Glow Ring */}
          <circle cx="60" cy="60" r="54" stroke="#00F2FE" strokeWidth="1" strokeDasharray="4 6" opacity="0.4" />
          
          {/* Four Diamond Crosshair Nodes */}
          <path d="M60 10 L68 28 L60 36 L52 28 Z" fill="#00F2FE" opacity="0.8" />
          <path d="M60 110 L68 92 L60 84 L52 92 Z" fill="#00F2FE" opacity="0.8" />
          <path d="M10 60 L28 52 L36 60 L28 68 Z" fill="#00F2FE" opacity="0.8" />
          <path d="M110 60 L92 52 L84 60 L92 68 Z" fill="#00F2FE" opacity="0.8" />

          {/* Glowing Inner Circular Tech Hub */}
          <circle cx="60" cy="60" r="32" stroke="#00F2FE" strokeWidth="3" fill="#0B132B" />
          <circle cx="60" cy="60" r="26" stroke="#00F2FE" strokeWidth="1" strokeOpacity="0.6" />
          <circle cx="60" cy="60" r="18" fill="#070C18" />
          
          {/* Center Energy Core */}
          <circle cx="60" cy="60" r="7" fill="#00F2FE" className="animate-pulse" />
          
          {/* Tech Reticle Cross lines */}
          <line x1="60" y1="36" x2="60" y2="46" stroke="#00F2FE" strokeWidth="2" strokeLinecap="round" />
          <line x1="60" y1="74" x2="60" y2="84" stroke="#00F2FE" strokeWidth="2" strokeLinecap="round" />
          <line x1="36" y1="60" x2="46" y2="60" stroke="#00F2FE" strokeWidth="2" strokeLinecap="round" />
          <line x1="74" y1="60" x2="84" y2="60" stroke="#00F2FE" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </div>

      <div className="flex flex-col">
        <div className="flex items-center gap-1.5">
          <span className={`font-display font-extrabold tracking-tight text-white uppercase ${config.text}`}>
            JS <span className="text-[#00F2FE]">DEVELOPERS</span>
          </span>
        </div>
        {showTagline ? (
          <span className={`font-mono text-[#00F2FE] tracking-widest uppercase font-medium ${config.sub}`}>
            &ldquo;WHERE SKILLS BECOME CAREERS&rdquo;
          </span>
        ) : (
          <span className="text-[10px] text-slate-400 font-medium tracking-wide">
            A project of ASCI · Lahore
          </span>
        )}
      </div>
    </div>
  );
};
