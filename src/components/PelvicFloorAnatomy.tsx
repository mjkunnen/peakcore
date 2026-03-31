"use client";

export default function PelvicFloorAnatomy() {
  return (
    <div className="w-full max-w-[300px] mx-auto">
      <svg viewBox="0 0 320 300" className="w-full h-auto">
        <defs>
          {/* Pelvic floor muscle gradient */}
          <linearGradient id="pfGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#FF6B2C" stopOpacity="0.6"/>
            <stop offset="50%" stopColor="#FF6B2C" stopOpacity="1"/>
            <stop offset="100%" stopColor="#FF6B2C" stopOpacity="0.6"/>
          </linearGradient>
          {/* Glow filter */}
          <filter id="pfGlow">
            <feGaussianBlur stdDeviation="4" result="blur"/>
            <feMerge>
              <feMergeNode in="blur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>

        {/* Background body outline - stylized pelvis cross section */}
        <path
          d="M 70 30 C 70 15, 120 5, 165 8 C 210 11, 255 25, 260 55 L 268 120 C 272 165, 260 210, 235 240 L 195 255 C 170 262, 135 262, 110 252 L 78 238 C 50 215, 42 170, 48 120 Z"
          fill="#FAFAFA" stroke="#E5E7EB" strokeWidth="1.5"
        />

        {/* Spine */}
        <path d="M 245 25 C 250 45, 255 70, 258 95 C 261 120, 260 145, 255 170" fill="none" stroke="#E5E7EB" strokeWidth="4" strokeLinecap="round"/>
        <path d="M 245 25 C 250 45, 255 70, 258 95 C 261 120, 260 145, 255 170" fill="none" stroke="#D1D5DB" strokeWidth="2" strokeLinecap="round"/>

        {/* Bladder - pear shaped */}
        <path d="M 115 55 C 105 38, 130 22, 158 24 C 186 26, 200 40, 195 58 C 190 78, 172 90, 155 92 C 135 94, 110 78, 115 55 Z" fill="#DBEAFE" stroke="#93C5FD" strokeWidth="1.5"/>

        {/* Prostate - walnut shape */}
        <path d="M 130 112 C 125 100, 143 94, 158 94 C 173 94, 190 100, 186 112 C 182 126, 170 132, 158 132 C 143 132, 127 126, 130 112 Z" fill="#D1FAE5" stroke="#86EFAC" strokeWidth="1.5"/>

        {/* Rectum tube */}
        <path d="M 205 75 C 215 90, 220 120, 218 155 C 216 185, 210 215, 200 240" fill="none" stroke="#E5E7EB" strokeWidth="10" strokeLinecap="round"/>
        <path d="M 205 75 C 215 90, 220 120, 218 155 C 216 185, 210 215, 200 240" fill="none" stroke="#F9FAFB" strokeWidth="6" strokeLinecap="round"/>

        {/* === PELVIC FLOOR MUSCLES — ANIMATED === */}
        {/* Glow layer - pulses */}
        <path
          d="M 60 200 Q 160 240 260 200"
          fill="none" stroke="#FF6B2C" strokeWidth="30" strokeLinecap="round" opacity="0.08"
          className="animate-pf-contract"
        />
        {/* Wide band - contracts */}
        <path
          d="M 65 200 Q 160 238 255 200"
          fill="none" stroke="url(#pfGrad)" strokeWidth="14" strokeLinecap="round"
          className="animate-pf-contract"
          filter="url(#pfGlow)"
        />
        {/* Core line - contracts */}
        <path
          d="M 70 202 Q 160 235 250 202"
          fill="none" stroke="#FF6B2C" strokeWidth="5" strokeLinecap="round" opacity="0.9"
          className="animate-pf-contract"
        />
        {/* Fiber texture lines */}
        <path d="M 80 197 Q 160 225 240 197" fill="none" stroke="#FF6B2C" strokeWidth="1.5" opacity="0.4" className="animate-pf-contract"/>
        <path d="M 75 207 Q 160 243 245 207" fill="none" stroke="#FF6B2C" strokeWidth="1.5" opacity="0.3" className="animate-pf-contract"/>

        {/* Contraction indicator arrows (fade in/out) */}
        <g className="animate-pf-arrows">
          <path d="M 100 220 L 100 205 L 93 212 M 100 205 L 107 212" fill="none" stroke="#FF6B2C" strokeWidth="1.5" strokeLinecap="round"/>
          <path d="M 220 220 L 220 205 L 213 212 M 220 205 L 227 212" fill="none" stroke="#FF6B2C" strokeWidth="1.5" strokeLinecap="round"/>
        </g>

        {/* Label lines and text */}
        <line x1="155" y1="24" x2="55" y2="18" stroke="#D1D5DB" strokeWidth="0.8"/>
        <text x="10" y="21" fontSize="11" fill="#6B7280" fontWeight="500">Bladder</text>

        <line x1="186" y1="112" x2="260" y2="100" stroke="#D1D5DB" strokeWidth="0.8"/>
        <text x="265" y="103" fontSize="10" fill="#6B7280" fontWeight="500">Prostate</text>

        <line x1="218" y1="155" x2="275" y2="150" stroke="#D1D5DB" strokeWidth="0.8"/>
        <text x="280" y="153" fontSize="10" fill="#6B7280" fontWeight="500">Rectum</text>

        {/* Pelvic floor label */}
        <line x1="160" y1="245" x2="160" y2="268" stroke="#FF6B2C" strokeWidth="0.8"/>
        <text x="160" y="283" textAnchor="middle" fontSize="12" fill="#FF6B2C" fontWeight="700">Pelvic Floor Muscles</text>
        <text x="160" y="296" textAnchor="middle" fontSize="9" fill="#9CA3AF">Contracting and relaxing</text>
      </svg>
    </div>
  );
}
