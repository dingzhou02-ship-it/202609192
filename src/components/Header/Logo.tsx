import React from 'react';

interface LogoProps {
  onClick?: () => void;
  className?: string;
}

export const Logo: React.FC<LogoProps> = ({ onClick, className = '' }) => {
  return (
    <div
      id="platform-logo"
      onClick={onClick}
      className={`flex items-center gap-3.5 cursor-pointer group select-none ${className}`}
      title="南师GeoAI智教云 - GeoAI Education Cloud"
    >
      {/* Visual Vector Icon Mark matching the reference image */}
      <div className="relative w-12 h-12 flex-shrink-0">
        <svg
          viewBox="0 0 100 100"
          className="w-full h-full drop-shadow-sm transition-transform duration-300 group-hover:scale-105"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Globe Blue Gradient */}
            <radialGradient id="globeGrad" cx="38%" cy="32%" r="65%">
              <stop offset="0%" stopColor="#40A9FF" />
              <stop offset="45%" stopColor="#1677FF" />
              <stop offset="100%" stopColor="#0B4B94" />
            </radialGradient>

            {/* Swoosh Gradient */}
            <linearGradient id="swooshGrad" x1="10%" y1="10%" x2="90%" y2="90%">
              <stop offset="0%" stopColor="#36CFC9" />
              <stop offset="40%" stopColor="#1890FF" />
              <stop offset="100%" stopColor="#096DD9" />
            </linearGradient>

            {/* Glow Filter */}
            <filter id="subtleGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="2" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Background Outer Orbital Track */}
          <ellipse
            cx="48"
            cy="52"
            rx="42"
            ry="24"
            transform="rotate(-26 48 52)"
            stroke="#91CAFF"
            strokeWidth="1.5"
            strokeDasharray="3 3"
            opacity="0.8"
          />

          {/* Central Earth Globe */}
          <circle cx="48" cy="50" r="28" fill="url(#globeGrad)" />

          {/* Latitude & Longitude Coordinate Lines */}
          <ellipse cx="48" cy="50" rx="28" ry="12" stroke="#FFFFFF" strokeWidth="1" opacity="0.35" fill="none" />
          <ellipse cx="48" cy="50" rx="28" ry="22" stroke="#FFFFFF" strokeWidth="0.8" opacity="0.25" fill="none" />
          <ellipse cx="48" cy="50" rx="14" ry="28" stroke="#FFFFFF" strokeWidth="1" opacity="0.35" fill="none" />
          <line x1="20" y1="50" x2="76" y2="50" stroke="#FFFFFF" strokeWidth="1" opacity="0.4" />
          <line x1="48" y1="22" x2="48" y2="78" stroke="#FFFFFF" strokeWidth="1" opacity="0.4" />

          {/* Stylized Continents (Green Landmasses) */}
          <path
            d="M40 32C44 32 46 36 50 37C53 38 58 35 60 38C61 41 57 44 54 46C51 48 46 45 42 47C39 49 35 46 36 41C36 36 38 33 40 32Z"
            fill="#52C41A"
            opacity="0.88"
          />
          <path
            d="M44 53C47 52 52 54 54 57C55 60 52 64 49 66C46 68 42 66 40 62C39 58 41 54 44 53Z"
            fill="#52C41A"
            opacity="0.88"
          />
          <path
            d="M62 48C65 47 68 49 67 52C66 55 63 56 61 54C60 52 60 49 62 48Z"
            fill="#73D13D"
            opacity="0.88"
          />

          {/* The Dynamic Swooshing 'G' Ribbon wrapping around the globe */}
          <path
            d="M24 64C16 52 18 34 30 22C42 10 62 10 74 20C80 25 84 34 82 42C80 50 72 58 64 61C56 64 48 64 44 60"
            stroke="url(#swooshGrad)"
            strokeWidth="5.5"
            strokeLinecap="round"
            fill="none"
          />

          {/* Bottom curve accent of G */}
          <path
            d="M24 62C28 72 38 78 50 78C64 78 76 70 80 58"
            stroke="#096DD9"
            strokeWidth="4"
            strokeLinecap="round"
            fill="none"
            opacity="0.85"
          />

          {/* Orbital Satellite Dots */}
          <circle cx="82" cy="36" r="3.2" fill="#13C2C2" filter="url(#subtleGlow)" />
          <circle cx="82" cy="36" r="1.6" fill="#FFFFFF" />

          <circle cx="28" cy="24" r="2.6" fill="#40A9FF" />
          <circle cx="28" cy="24" r="1.2" fill="#FFFFFF" />

          <circle cx="34" cy="74" r="2.2" fill="#00C48C" />
          <circle cx="34" cy="74" r="1" fill="#FFFFFF" />
        </svg>
      </div>

      {/* Brand Text */}
      <div className="flex flex-col justify-center">
        {/* Main Chinese Title */}
        <div className="flex items-center text-[22px] lg:text-[23px] leading-tight font-extrabold tracking-tight">
          <span className="text-[#0D2543] font-black font-sans">南师</span>
          <span className="text-[#1677FF] font-black italic tracking-normal ml-0.5 mr-0.5 font-sans">GeoAI</span>
          <span className="text-[#0D2543] font-black font-sans">智教云</span>
        </div>

        {/* English Subtitle with flanking decorative dashes */}
        <div className="flex items-center gap-1.5 text-[10.5px] lg:text-[11px] font-medium tracking-[0.16em] text-[#5A738E] uppercase mt-0.5">
          <span className="h-[1px] w-3.5 bg-blue-300 inline-block opacity-70"></span>
          <span>GeoAI Education Cloud</span>
          <span className="h-[1px] w-3.5 bg-blue-300 inline-block opacity-70"></span>
        </div>
      </div>
    </div>
  );
};
