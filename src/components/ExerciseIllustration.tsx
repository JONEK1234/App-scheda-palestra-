import React from 'react';

interface IllustrationProps {
  illustrationKey: string;
  className?: string;
  accentColor?: string;
}

export const ExerciseIllustration: React.FC<IllustrationProps> = ({
  illustrationKey,
  className = 'w-full h-44',
  accentColor = '#ef4444'
}) => {
  // Common theme colors
  const strokeColor = '#71717a';
  const machineColor = '#27272a';
  const highlightColor = accentColor;
  const bodyColor = '#f4f4f5';

  return (
    <div className={`relative flex items-center justify-center bg-gradient-to-b from-zinc-900 to-zinc-950 rounded-xl overflow-hidden border border-zinc-800/80 p-3 select-none ${className}`}>
      {/* Background grid accent */}
      <div 
        className="absolute inset-0 opacity-[0.07] pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, #ffffff 1px, transparent 0)',
          backgroundSize: '16px 16px'
        }}
      />

      {/* Muscle Focus Badge */}
      <div className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded-md bg-black/60 border border-zinc-700/50 backdrop-blur-sm text-[10px] font-semibold text-zinc-300 flex items-center gap-1.5 z-10">
        <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: highlightColor }} />
        <span>Focus Muscolare</span>
      </div>

      <svg
        viewBox="0 0 320 200"
        className="w-full h-full max-h-48 drop-shadow-md"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id={`grad-${illustrationKey}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={highlightColor} stopOpacity="0.9" />
            <stop offset="100%" stopColor="#991b1b" stopOpacity="0.8" />
          </linearGradient>
          <filter id="neonPulse" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Floor line */}
        <line x1="20" y1="180" x2="300" y2="180" stroke="#3f3f46" strokeWidth="2" strokeDasharray="4 4" />

        {/* 1. Treadmill */}
        {illustrationKey === 'treadmill' && (
          <g transform="translate(10, 10)">
            {/* Machine base */}
            <path d="M 40 160 L 260 145 L 265 162 L 35 165 Z" fill={machineColor} stroke={strokeColor} strokeWidth="2" />
            <line x1="50" y1="158" x2="250" y2="147" stroke={highlightColor} strokeWidth="3" strokeDasharray="8 6" />
            {/* Handrails & Console */}
            <path d="M 220 148 L 240 70 L 210 65" stroke={strokeColor} strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
            <rect x="200" y="52" width="40" height="20" rx="3" fill="#18181b" stroke={strokeColor} strokeWidth="1.5" />
            {/* Runner Silhouette */}
            <circle cx="150" cy="55" r="14" fill={bodyColor} />
            <path d="M 150 70 L 145 105 L 125 135 L 105 155" stroke={bodyColor} strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M 145 105 L 165 125 L 195 148" stroke={highlightColor} strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M 148 76 L 125 90 L 115 105" stroke={bodyColor} strokeWidth="5" strokeLinecap="round" />
            <path d="M 148 76 L 175 88 L 190 85" stroke={bodyColor} strokeWidth="5" strokeLinecap="round" />
          </g>
        )}

        {/* 2. Chest Press */}
        {illustrationKey === 'chest_press' && (
          <g transform="translate(20, 10)">
            {/* Machine seat and backrest */}
            <path d="M 90 60 L 90 140 L 140 140" stroke={machineColor} strokeWidth="10" strokeLinecap="round" />
            <rect x="75" y="70" width="12" height="65" rx="3" fill="#3f3f46" />
            <rect x="75" y="135" width="60" height="12" rx="3" fill="#3f3f46" />
            {/* Seated person */}
            <circle cx="105" cy="55" r="13" fill={bodyColor} />
            <path d="M 100 70 L 100 135 L 145 135 L 155 168" stroke={bodyColor} strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" />
            {/* Chest Highlight */}
            <ellipse cx="112" cy="85" rx="10" ry="12" fill={highlightColor} filter="url(#neonPulse)" />
            {/* Arms pushing handles */}
            <path d="M 105 76 L 135 78 L 180 78" stroke={bodyColor} strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
            <rect x="180" y="65" width="8" height="26" rx="2" fill={strokeColor} />
            {/* Spinta vectors */}
            <path d="M 135 62 L 175 62" stroke={highlightColor} strokeWidth="3" strokeDasharray="3 3" />
            <polygon points="180,62 170,58 170,66" fill={highlightColor} />
          </g>
        )}

        {/* 3. Pec Fly */}
        {illustrationKey === 'pec_fly' && (
          <g transform="translate(20, 10)">
            {/* Backrest & Frame */}
            <line x1="140" y1="40" x2="140" y2="165" stroke={machineColor} strokeWidth="12" strokeLinecap="round" />
            {/* Person viewed from front / angled */}
            <circle cx="140" cy="52" r="14" fill={bodyColor} />
            <line x1="140" y1="68" x2="140" y2="140" stroke={bodyColor} strokeWidth="10" strokeLinecap="round" />
            {/* Chest squeeze focus */}
            <path d="M 130 80 Q 140 85 150 80 Q 155 95 140 98 Q 125 95 130 80 Z" fill={highlightColor} filter="url(#neonPulse)" />
            {/* Fly Lever Arms & Trajectory */}
            <path d="M 75 75 Q 110 82 135 85" stroke={strokeColor} strokeWidth="5" strokeLinecap="round" />
            <path d="M 205 75 Q 170 82 145 85" stroke={strokeColor} strokeWidth="5" strokeLinecap="round" />
            {/* Curved squeeze arrows */}
            <path d="M 70 65 Q 105 50 130 65" stroke={highlightColor} strokeWidth="3" strokeLinecap="round" strokeDasharray="4 4" />
            <polygon points="135,68 123,61 127,70" fill={highlightColor} />
            <path d="M 210 65 Q 175 50 150 65" stroke={highlightColor} strokeWidth="3" strokeLinecap="round" strokeDasharray="4 4" />
            <polygon points="145,68 153,70 157,61" fill={highlightColor} />
          </g>
        )}

        {/* 4. Shoulder Press */}
        {illustrationKey === 'shoulder_press' && (
          <g transform="translate(20, 10)">
            <path d="M 120 70 L 120 145 L 160 145" stroke={machineColor} strokeWidth="10" strokeLinecap="round" />
            <circle cx="130" cy="55" r="13" fill={bodyColor} />
            <line x1="128" y1="70" x2="128" y2="140" stroke={bodyColor} strokeWidth="8" strokeLinecap="round" />
            {/* Shoulders highlighted */}
            <ellipse cx="118" cy="74" rx="7" ry="6" fill={highlightColor} filter="url(#neonPulse)" />
            <ellipse cx="138" cy="74" rx="7" ry="6" fill={highlightColor} filter="url(#neonPulse)" />
            {/* Upward arm push */}
            <path d="M 120 75 L 110 50 L 125 25" stroke={bodyColor} strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M 136 75 L 146 50 L 135 25" stroke={bodyColor} strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
            {/* Overhead handles & arrows */}
            <line x1="110" y1="25" x2="148" y2="25" stroke={strokeColor} strokeWidth="5" strokeLinecap="round" />
            <line x1="130" y1="45" x2="130" y2="18" stroke={highlightColor} strokeWidth="3" strokeDasharray="3 3" />
            <polygon points="130,12 125,20 135,20" fill={highlightColor} />
          </g>
        )}

        {/* 5. Alzate Laterali + Frontali */}
        {illustrationKey === 'lateral_front_raises' && (
          <g transform="translate(10, 10)">
            {/* Central Standing Athlete */}
            <circle cx="150" cy="40" r="13" fill={bodyColor} />
            <line x1="150" y1="54" x2="150" y2="120" stroke={bodyColor} strokeWidth="8" strokeLinecap="round" />
            <line x1="150" y1="120" x2="135" y2="170" stroke={bodyColor} strokeWidth="7" strokeLinecap="round" />
            <line x1="150" y1="120" x2="165" y2="170" stroke={bodyColor} strokeWidth="7" strokeLinecap="round" />
            {/* Deltoids Highlight */}
            <circle cx="138" cy="58" r="7" fill={highlightColor} filter="url(#neonPulse)" />
            <circle cx="162" cy="58" r="7" fill={highlightColor} filter="url(#neonPulse)" />
            {/* Lateral Raise Arm (Left) */}
            <path d="M 140 60 L 80 60" stroke={bodyColor} strokeWidth="6" strokeLinecap="round" />
            <circle cx="75" cy="60" r="6" fill="#52525b" />
            <path d="M 120 100 Q 80 95 75 70" stroke={highlightColor} strokeWidth="2.5" strokeDasharray="3 3" />
            <polygon points="75,65 72,73 80,72" fill={highlightColor} />
            {/* Front Raise Arm (Right) */}
            <path d="M 160 60 L 210 55" stroke={bodyColor} strokeWidth="6" strokeLinecap="round" />
            <circle cx="215" cy="55" r="6" fill="#52525b" />
            <path d="M 170 95 Q 210 90 215 65" stroke={highlightColor} strokeWidth="2.5" strokeDasharray="3 3" />
            <polygon points="215,60 210,68 218,68" fill={highlightColor} />
          </g>
        )}

        {/* 6. French Press */}
        {illustrationKey === 'french_press' && (
          <g transform="translate(15, 10)">
            {/* Flat Bench */}
            <rect x="70" y="125" width="160" height="14" rx="3" fill="#3f3f46" />
            <line x1="90" y1="139" x2="90" y2="175" stroke={machineColor} strokeWidth="8" />
            <line x1="210" y1="139" x2="210" y2="175" stroke={machineColor} strokeWidth="8" />
            {/* Person lying flat */}
            <circle cx="95" cy="115" r="12" fill={bodyColor} />
            <line x1="110" y1="120" x2="190" y2="120" stroke={bodyColor} strokeWidth="8" strokeLinecap="round" />
            {/* Triceps focus */}
            <ellipse cx="125" cy="85" rx="6" ry="10" fill={highlightColor} filter="url(#neonPulse)" transform="rotate(-25 125 85)" />
            {/* Arms holding EZ bar overhead towards forehead */}
            <path d="M 115 120 L 130 80 L 98 85" stroke={bodyColor} strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
            {/* Barbell weights */}
            <circle cx="92" cy="86" r="10" fill="#27272a" stroke={strokeColor} strokeWidth="2" />
            <path d="M 100 80 Q 120 50 145 60" stroke={highlightColor} strokeWidth="3" strokeDasharray="3 3" />
            <polygon points="150,62 143,55 140,64" fill={highlightColor} />
          </g>
        )}

        {/* 7. Pushdown Bar */}
        {illustrationKey === 'pushdown_bar' && (
          <g transform="translate(20, 10)">
            {/* High Cable pulley */}
            <circle cx="160" cy="20" r="10" fill={machineColor} stroke={strokeColor} strokeWidth="2" />
            <line x1="160" y1="20" x2="160" y2="80" stroke={strokeColor} strokeWidth="2.5" />
            {/* Person standing */}
            <circle cx="110" cy="50" r="13" fill={bodyColor} />
            <path d="M 110 65 L 115 120 L 110 170" stroke={bodyColor} strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" />
            {/* Triceps Highlight */}
            <ellipse cx="120" cy="82" rx="6" ry="12" fill={highlightColor} filter="url(#neonPulse)" />
            {/* Forearm pushing down straight bar */}
            <path d="M 115 72 L 128 88 L 158 115" stroke={bodyColor} strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
            <rect x="152" y="112" width="14" height="6" rx="2" fill="#52525b" />
            {/* Push down vector */}
            <line x1="168" y1="85" x2="168" y2="125" stroke={highlightColor} strokeWidth="3" strokeDasharray="3 3" />
            <polygon points="168,130 163,120 173,120" fill={highlightColor} />
          </g>
        )}

        {/* 8. Pushdown Single */}
        {illustrationKey === 'pushdown_single' && (
          <g transform="translate(20, 10)">
            <circle cx="170" cy="22" r="9" fill={machineColor} stroke={strokeColor} strokeWidth="2" />
            <line x1="170" y1="22" x2="170" y2="85" stroke={strokeColor} strokeWidth="2" />
            <circle cx="115" cy="50" r="13" fill={bodyColor} />
            <path d="M 115 65 L 120 120 L 115 170" stroke={bodyColor} strokeWidth="8" strokeLinecap="round" />
            {/* Lateral Tricep head glowing */}
            <ellipse cx="125" cy="80" rx="7" ry="11" fill={highlightColor} filter="url(#neonPulse)" />
            {/* Single arm motion */}
            <path d="M 120 70 L 132 88 L 168 120" stroke={bodyColor} strokeWidth="6" strokeLinecap="round" />
            <circle cx="169" cy="122" r="5" fill="#f43f5e" />
            <line x1="178" y1="90" x2="178" y2="130" stroke={highlightColor} strokeWidth="3" strokeDasharray="3 3" />
            <polygon points="178,136 173,126 183,126" fill={highlightColor} />
          </g>
        )}

        {/* 9. Kneeling Cable Crunch */}
        {illustrationKey === 'cable_crunch' && (
          <g transform="translate(15, 10)">
            {/* High Pulley */}
            <circle cx="190" cy="20" r="9" fill={machineColor} stroke={strokeColor} strokeWidth="2" />
            <line x1="190" y1="20" x2="160" y2="75" stroke={strokeColor} strokeWidth="2.5" />
            {/* Kneeling person curling spine */}
            <circle cx="125" cy="90" r="12" fill={bodyColor} />
            {/* Curled back */}
            <path d="M 125 100 Q 105 115 110 145 L 85 168 L 115 168" stroke={bodyColor} strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" />
            {/* Abdominals compressed in red */}
            <path d="M 120 115 Q 128 135 125 145" stroke={highlightColor} strokeWidth="7" strokeLinecap="round" filter="url(#neonPulse)" />
            {/* Arms holding ropes at temples */}
            <path d="M 128 100 L 148 85 L 160 80" stroke={bodyColor} strokeWidth="5" strokeLinecap="round" />
            {/* Crunch arrow */}
            <path d="M 140 70 Q 115 80 110 100" stroke={highlightColor} strokeWidth="3" strokeDasharray="3 3" />
            <polygon points="108,105 108,95 115,100" fill={highlightColor} />
          </g>
        )}

        {/* 10. Bike (Cyclette) */}
        {illustrationKey === 'bike' && (
          <g transform="translate(15, 10)">
            {/* Bike frame and wheels */}
            <circle cx="90" cy="150" r="22" stroke={machineColor} strokeWidth="6" />
            <circle cx="210" cy="150" r="22" stroke={machineColor} strokeWidth="6" />
            <path d="M 90 150 L 140 150 L 180 110 L 140 110 Z" stroke={strokeColor} strokeWidth="4" />
            <line x1="140" y1="110" x2="135" y2="85" stroke={strokeColor} strokeWidth="5" />
            <rect x="120" y="80" width="30" height="7" rx="3" fill="#18181b" />
            <line x1="180" y1="110" x2="195" y2="75" stroke={strokeColor} strokeWidth="5" />
            <path d="M 185 70 L 205 70" stroke={strokeColor} strokeWidth="4" strokeLinecap="round" />
            {/* Cyclist */}
            <circle cx="145" cy="52" r="12" fill={bodyColor} />
            <path d="M 143 65 L 138 90 L 160 120 L 140 150" stroke={highlightColor} strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M 140 70 L 175 80 L 195 73" stroke={bodyColor} strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
            {/* Pedal rotation circle */}
            <circle cx="140" cy="150" r="14" stroke={highlightColor} strokeWidth="2" strokeDasharray="4 3" />
          </g>
        )}

        {/* 11. Lat Machine */}
        {illustrationKey === 'lat_machine' && (
          <g transform="translate(20, 10)">
            {/* Machine Bar and top frame */}
            <rect x="135" y="10" width="10" height="150" fill={machineColor} />
            <line x1="60" y1="30" x2="220" y2="30" stroke={strokeColor} strokeWidth="5" strokeLinecap="round" />
            <line x1="140" y1="15" x2="140" y2="55" stroke={strokeColor} strokeWidth="3" />
            {/* Wide Lat Bar */}
            <path d="M 65 65 L 140 55 L 215 65" stroke="#3f3f46" strokeWidth="5" strokeLinecap="round" />
            {/* Seated lifter with V-Taper highlight */}
            <circle cx="140" cy="72" r="13" fill={bodyColor} />
            {/* Wide Lats in red glow */}
            <polygon points="120,95 160,95 148,135 132,135" fill={highlightColor} filter="url(#neonPulse)" />
            {/* Pull down arms */}
            <path d="M 72 65 L 115 85 L 125 98" stroke={bodyColor} strokeWidth="6" strokeLinecap="round" />
            <path d="M 208 65 L 165 85 L 155 98" stroke={bodyColor} strokeWidth="6" strokeLinecap="round" />
            {/* Downward arrows */}
            <line x1="85" y1="45" x2="85" y2="75" stroke={highlightColor} strokeWidth="3" strokeDasharray="3 3" />
            <polygon points="85,80 80,70 90,70" fill={highlightColor} />
            <line x1="195" y1="45" x2="195" y2="75" stroke={highlightColor} strokeWidth="3" strokeDasharray="3 3" />
            <polygon points="195,80 190,70 200,70" fill={highlightColor} />
          </g>
        )}

        {/* 12. Pulley Basso (Seated Cable Row) */}
        {illustrationKey === 'seated_cable_row' && (
          <g transform="translate(15, 10)">
            {/* Low pulley wheel */}
            <circle cx="230" cy="130" r="10" fill={machineColor} stroke={strokeColor} strokeWidth="2" />
            <line x1="230" y1="130" x2="160" y2="105" stroke={strokeColor} strokeWidth="2.5" />
            {/* Bench & Footplate */}
            <rect x="70" y="140" width="130" height="12" rx="2" fill="#27272a" />
            <line x1="200" y1="130" x2="200" y2="155" stroke={strokeColor} strokeWidth="5" strokeLinecap="round" />
            {/* Seated person */}
            <circle cx="105" cy="65" r="13" fill={bodyColor} />
            <path d="M 105 80 L 115 138 L 165 138 L 195 135" stroke={bodyColor} strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" />
            {/* Mid Back & Rhomboids highlight */}
            <polygon points="105,82 120,85 115,115 105,110" fill={highlightColor} filter="url(#neonPulse)" />
            {/* Arms pulling triangle */}
            <path d="M 115 88 L 138 98 L 160 105" stroke={bodyColor} strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
            <line x1="180" y1="102" x2="140" y2="98" stroke={highlightColor} strokeWidth="3" strokeDasharray="3 3" />
            <polygon points="135,97 145,93 145,103" fill={highlightColor} />
          </g>
        )}

        {/* 13. Dumbbell Row */}
        {illustrationKey === 'dumbbell_row' && (
          <g transform="translate(15, 10)">
            {/* Flat bench */}
            <rect x="70" y="120" width="130" height="12" rx="2" fill="#3f3f46" />
            <line x1="85" y1="132" x2="85" y2="170" stroke={machineColor} strokeWidth="6" />
            <line x1="185" y1="132" x2="185" y2="170" stroke={machineColor} strokeWidth="6" />
            {/* Kneeling on bench with torso horizontal */}
            <circle cx="80" cy="75" r="12" fill={bodyColor} />
            <line x1="80" y1="88" x2="80" y2="120" stroke={bodyColor} strokeWidth="6" strokeLinecap="round" />
            <line x1="85" y1="88" x2="160" y2="88" stroke={bodyColor} strokeWidth="8" strokeLinecap="round" />
            <path d="M 160 88 L 165 120 L 135 120" stroke={bodyColor} strokeWidth="7" strokeLinecap="round" />
            {/* Lat Highlight */}
            <ellipse cx="130" cy="88" rx="14" ry="7" fill={highlightColor} filter="url(#neonPulse)" />
            {/* Rowing arm pulling dumbbell up to hip */}
            <path d="M 125 90 L 140 60 L 140 92" stroke={bodyColor} strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
            <rect x="130" y="90" width="20" height="10" rx="3" fill="#18181b" stroke={strokeColor} strokeWidth="2" />
            <line x1="140" y1="110" x2="140" y2="70" stroke={highlightColor} strokeWidth="3" strokeDasharray="3 3" />
            <polygon points="140,65 135,75 145,75" fill={highlightColor} />
          </g>
        )}

        {/* 14. Dumbbell Curl */}
        {illustrationKey === 'dumbbell_curl' && (
          <g transform="translate(20, 10)">
            <circle cx="140" cy="45" r="13" fill={bodyColor} />
            <line x1="140" y1="60" x2="140" y2="130" stroke={bodyColor} strokeWidth="8" strokeLinecap="round" />
            <line x1="140" y1="130" x2="125" y2="175" stroke={bodyColor} strokeWidth="7" strokeLinecap="round" />
            <line x1="140" y1="130" x2="155" y2="175" stroke={bodyColor} strokeWidth="7" strokeLinecap="round" />
            {/* Left arm down */}
            <path d="M 130 65 L 115 95 L 115 125" stroke={bodyColor} strokeWidth="6" strokeLinecap="round" />
            <rect x="105" y="125" width="20" height="8" rx="2" fill="#3f3f46" />
            {/* Right arm curled up with Biceps peak highlighted */}
            <path d="M 150 65 L 158 95 L 148 70" stroke={bodyColor} strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
            <circle cx="160" cy="80" r="10" fill={highlightColor} filter="url(#neonPulse)" />
            <rect x="140" y="62" width="16" height="8" rx="2" fill="#3f3f46" />
            {/* Curl rotation arc */}
            <path d="M 175 120 Q 185 95 165 75" stroke={highlightColor} strokeWidth="2.5" strokeDasharray="3 3" />
            <polygon points="160,73 170,72 168,81" fill={highlightColor} />
          </g>
        )}

        {/* 15. Cable Curl */}
        {illustrationKey === 'cable_curl' && (
          <g transform="translate(20, 10)">
            <circle cx="210" cy="165" r="10" fill={machineColor} stroke={strokeColor} strokeWidth="2" />
            <line x1="210" y1="165" x2="160" y2="105" stroke={strokeColor} strokeWidth="2.5" />
            <circle cx="120" cy="45" r="13" fill={bodyColor} />
            <path d="M 120 60 L 125 125 L 115 175" stroke={bodyColor} strokeWidth="8" strokeLinecap="round" />
            <circle cx="140" cy="85" r="9" fill={highlightColor} filter="url(#neonPulse)" />
            <path d="M 125 68 L 135 95 L 158 105" stroke={bodyColor} strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
            <rect x="156" y="100" width="14" height="10" rx="2" fill="#3f3f46" />
            <line x1="175" y1="130" x2="155" y2="100" stroke={highlightColor} strokeWidth="2.5" strokeDasharray="3 3" />
          </g>
        )}

        {/* 16. Crunch Superset (Classic + Reverse) */}
        {illustrationKey === 'crunch_superset' && (
          <g transform="translate(15, 10)">
            <rect x="50" y="160" width="220" height="8" rx="2" fill="#3f3f46" />
            {/* Athlete performing abdominal curl */}
            <circle cx="85" cy="130" r="12" fill={bodyColor} />
            <path d="M 85 140 Q 110 148 135 158" stroke={bodyColor} strokeWidth="7" strokeLinecap="round" />
            {/* Pelvis rolled up / Reverse crunch legs */}
            <path d="M 135 158 L 155 145 L 175 110 L 150 95" stroke={bodyColor} strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" />
            {/* Six pack core glowing */}
            <ellipse cx="120" cy="148" rx="12" ry="7" fill={highlightColor} filter="url(#neonPulse)" />
            {/* Dual motion arrows */}
            <path d="M 75 155 Q 85 130 95 125" stroke={highlightColor} strokeWidth="2.5" strokeDasharray="3 3" />
            <polygon points="98,125 90,123 93,132" fill={highlightColor} />
            <path d="M 145 140 Q 140 120 145 105" stroke={highlightColor} strokeWidth="2.5" strokeDasharray="3 3" />
            <polygon points="146,100 141,108 151,107" fill={highlightColor} />
          </g>
        )}

        {/* 17. Plank */}
        {illustrationKey === 'plank' && (
          <g transform="translate(15, 10)">
            {/* Straight body line */}
            <circle cx="80" cy="115" r="12" fill={bodyColor} />
            <path d="M 80 125 L 130 135 L 210 145 L 235 165" stroke={bodyColor} strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" />
            {/* Forearms on ground */}
            <path d="M 90 127 L 90 155 L 115 155" stroke={strokeColor} strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
            {/* Core & glutes shield highlight */}
            <path d="M 120 132 L 170 140" stroke={highlightColor} strokeWidth="10" strokeLinecap="round" filter="url(#neonPulse)" />
            {/* Isometric stability rays */}
            <line x1="145" y1="115" x2="145" y2="128" stroke={highlightColor} strokeWidth="2" />
            <line x1="130" y1="118" x2="135" y2="129" stroke={highlightColor} strokeWidth="2" />
            <line x1="160" y1="118" x2="155" y2="129" stroke={highlightColor} strokeWidth="2" />
          </g>
        )}

        {/* 18. Elliptical */}
        {illustrationKey === 'elliptical' && (
          <g transform="translate(15, 10)">
            <ellipse cx="140" cy="155" rx="55" ry="12" stroke={machineColor} strokeWidth="5" />
            <path d="M 95 155 L 185 155" stroke={strokeColor} strokeWidth="3" />
            {/* Moving handles */}
            <line x1="180" y1="145" x2="160" y2="60" stroke={strokeColor} strokeWidth="5" strokeLinecap="round" />
            <line x1="110" y1="145" x2="130" y2="60" stroke={strokeColor} strokeWidth="5" strokeLinecap="round" />
            {/* Person */}
            <circle cx="145" cy="45" r="12" fill={bodyColor} />
            <path d="M 145 60 L 145 110 L 125 150" stroke={bodyColor} strokeWidth="7" strokeLinecap="round" />
            <path d="M 145 110 L 165 150" stroke={highlightColor} strokeWidth="7" strokeLinecap="round" />
            <path d="M 145 70 L 132 65" stroke={bodyColor} strokeWidth="5" strokeLinecap="round" />
            <path d="M 145 70 L 158 65" stroke={bodyColor} strokeWidth="5" strokeLinecap="round" />
          </g>
        )}

        {/* 19. Rowing Machine (Vogatore) */}
        {illustrationKey === 'rower' && (
          <g transform="translate(15, 10)">
            {/* Flywheel front */}
            <circle cx="230" cy="125" r="25" stroke={machineColor} strokeWidth="8" fill="#18181b" />
            {/* Monorail track */}
            <line x1="60" y1="145" x2="230" y2="145" stroke={strokeColor} strokeWidth="5" />
            {/* Sliding seat */}
            <rect x="110" y="137" width="22" height="8" rx="2" fill="#52525b" />
            {/* Rower in leg drive position */}
            <circle cx="105" cy="85" r="12" fill={bodyColor} />
            <path d="M 105 98 L 120 137 L 155 125 L 185 145" stroke={highlightColor} strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" />
            {/* Arms pulling handle */}
            <path d="M 112 105 L 140 110 L 180 115" stroke={bodyColor} strokeWidth="6" strokeLinecap="round" />
            <line x1="180" y1="115" x2="225" y2="125" stroke={strokeColor} strokeWidth="2.5" />
            {/* Drive vector */}
            <line x1="150" y1="160" x2="100" y2="160" stroke={highlightColor} strokeWidth="3" strokeDasharray="3 3" />
            <polygon points="95,160 105,155 105,165" fill={highlightColor} />
          </g>
        )}

        {/* 20. Leg Press */}
        {illustrationKey === 'leg_press' && (
          <g transform="translate(15, 10)">
            {/* 45 degree angle rail */}
            <line x1="90" y1="155" x2="220" y2="45" stroke={machineColor} strokeWidth="8" strokeLinecap="round" />
            {/* Sled with footplate */}
            <rect x="175" y="60" width="35" height="10" rx="2" fill="#3f3f46" transform="rotate(-40 175 60)" />
            {/* Backrest */}
            <rect x="65" y="115" width="45" height="12" rx="3" fill="#27272a" transform="rotate(45 65 115)" />
            {/* Lifter seated */}
            <circle cx="75" cy="105" r="13" fill={bodyColor} />
            <path d="M 85 120 L 115 145 L 135 110 L 185 80" stroke={bodyColor} strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" />
            {/* Quadriceps & Glute Highlight */}
            <ellipse cx="125" cy="125" rx="8" ry="14" fill={highlightColor} filter="url(#neonPulse)" transform="rotate(-25 125 125)" />
            <ellipse cx="100" cy="138" rx="8" ry="7" fill={highlightColor} filter="url(#neonPulse)" />
            {/* Push vector up the rail */}
            <line x1="150" y1="110" x2="185" y2="80" stroke={highlightColor} strokeWidth="3" strokeDasharray="3 3" />
            <polygon points="190,76 179,80 185,88" fill={highlightColor} />
          </g>
        )}

        {/* 21. Leg Extension */}
        {illustrationKey === 'leg_extension' && (
          <g transform="translate(15, 10)">
            {/* Chair seat and backrest */}
            <rect x="90" y="80" width="10" height="60" rx="2" fill="#3f3f46" />
            <rect x="90" y="135" width="55" height="10" rx="2" fill="#3f3f46" />
            {/* Lifter */}
            <circle cx="108" cy="65" r="13" fill={bodyColor} />
            <path d="M 105 80 L 105 135 L 145 135 L 195 115" stroke={bodyColor} strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" />
            {/* Shin pad */}
            <circle cx="195" cy="115" r="7" fill="#3f3f46" stroke={strokeColor} strokeWidth="2" />
            {/* Quad teardrop highlight */}
            <ellipse cx="130" cy="132" rx="14" ry="7" fill={highlightColor} filter="url(#neonPulse)" />
            {/* Extension arc */}
            <path d="M 155 160 Q 185 155 195 125" stroke={highlightColor} strokeWidth="3" strokeDasharray="3 3" />
            <polygon points="196,120 189,127 198,129" fill={highlightColor} />
          </g>
        )}

        {/* 22. Leg Curl */}
        {illustrationKey === 'leg_curl' && (
          <g transform="translate(15, 10)">
            {/* Bench */}
            <rect x="70" y="130" width="140" height="12" rx="3" fill="#3f3f46" />
            {/* Person lying prone */}
            <circle cx="85" cy="118" r="12" fill={bodyColor} />
            <path d="M 95 125 L 160 128 L 190 100" stroke={bodyColor} strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" />
            {/* Roller pad on Achilles tendon */}
            <circle cx="190" cy="100" r="7" fill="#3f3f46" stroke={strokeColor} strokeWidth="2" />
            {/* Hamstrings Highlight */}
            <ellipse cx="155" cy="125" rx="14" ry="6" fill={highlightColor} filter="url(#neonPulse)" />
            {/* Flexion arc */}
            <path d="M 195 130 Q 200 110 185 95" stroke={highlightColor} strokeWidth="3" strokeDasharray="3 3" />
            <polygon points="180,92 188,90 189,100" fill={highlightColor} />
          </g>
        )}

        {/* 23. Lunges (Affondi con Manubri) */}
        {illustrationKey === 'lunges' && (
          <g transform="translate(15, 10)">
            <circle cx="140" cy="45" r="13" fill={bodyColor} />
            <line x1="140" y1="60" x2="140" y2="105" stroke={bodyColor} strokeWidth="8" strokeLinecap="round" />
            {/* Front Leg at 90 degrees */}
            <path d="M 140 105 L 180 125 L 180 170" stroke={bodyColor} strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" />
            {/* Rear Leg with knee hovering floor */}
            <path d="M 140 105 L 110 135 L 110 168 L 90 168" stroke={bodyColor} strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" />
            {/* Dumbbell in hands */}
            <line x1="140" y1="70" x2="140" y2="115" stroke={bodyColor} strokeWidth="5" />
            <rect x="133" y="115" width="14" height="16" rx="3" fill="#27272a" stroke={strokeColor} strokeWidth="2" />
            {/* Glute & Quad Highlight */}
            <ellipse cx="160" cy="120" rx="10" ry="7" fill={highlightColor} filter="url(#neonPulse)" />
            <ellipse cx="135" cy="108" rx="8" ry="7" fill={highlightColor} filter="url(#neonPulse)" />
          </g>
        )}

        {/* 24. Sumo Squat */}
        {illustrationKey === 'sumo_squat' && (
          <g transform="translate(15, 10)">
            <circle cx="150" cy="45" r="13" fill={bodyColor} />
            <line x1="150" y1="60" x2="150" y2="105" stroke={bodyColor} strokeWidth="8" strokeLinecap="round" />
            {/* Wide Stance Legs */}
            <path d="M 150 105 L 105 130 L 95 170" stroke={bodyColor} strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M 150 105 L 195 130 L 205 170" stroke={bodyColor} strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" />
            {/* Adductors and Glutes Glow */}
            <ellipse cx="130" cy="122" rx="10" ry="7" fill={highlightColor} filter="url(#neonPulse)" />
            <ellipse cx="170" cy="122" rx="10" ry="7" fill={highlightColor} filter="url(#neonPulse)" />
            {/* Central Goblet Dumbbell */}
            <line x1="150" y1="70" x2="150" y2="120" stroke={bodyColor} strokeWidth="5" />
            <rect x="142" y="120" width="16" height="22" rx="3" fill="#27272a" stroke={strokeColor} strokeWidth="2" />
          </g>
        )}

        {/* 25. Calf Machine */}
        {illustrationKey === 'calf_machine' && (
          <g transform="translate(15, 10)">
            {/* Step block */}
            <rect x="110" y="165" width="80" height="15" fill={machineColor} stroke={strokeColor} strokeWidth="2" />
            {/* Shoulder pads overhead */}
            <rect x="120" y="55" width="60" height="14" rx="3" fill="#3f3f46" />
            {/* Standing athlete on balls of feet */}
            <circle cx="150" cy="40" r="13" fill={bodyColor} />
            <line x1="150" y1="55" x2="150" y2="115" stroke={bodyColor} strokeWidth="8" strokeLinecap="round" />
            <line x1="150" y1="115" x2="150" y2="160" stroke={bodyColor} strokeWidth="8" strokeLinecap="round" />
            {/* Calves (gastrocnemius diamond) highlighted */}
            <polygon points="142,125 158,125 155,145 145,145" fill={highlightColor} filter="url(#neonPulse)" />
            {/* Plantar flexion up vector */}
            <line x1="170" y1="165" x2="170" y2="140" stroke={highlightColor} strokeWidth="3" strokeDasharray="3 3" />
            <polygon points="170,135 165,145 175,145" fill={highlightColor} />
          </g>
        )}
      </svg>
    </div>
  );
};
