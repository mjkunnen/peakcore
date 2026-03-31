"use client";

export default function AnatomyDiagram() {
  return (
    <div className="w-full max-w-[300px] mx-auto bg-[#FAFBFC] rounded-2xl p-6 border border-[#E5E7EB]">
      <svg viewBox="0 0 260 320" className="w-full h-auto">
        <defs>
          <linearGradient id="bladderFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#93C5FD" stopOpacity="0.3"/>
            <stop offset="100%" stopColor="#3B82F6" stopOpacity="0.15"/>
          </linearGradient>
          <linearGradient id="prostateFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#86EFAC" stopOpacity="0.4"/>
            <stop offset="100%" stopColor="#22C55E" stopOpacity="0.15"/>
          </linearGradient>
          <linearGradient id="pfFill" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#FF6B2C" stopOpacity="0.2"/>
            <stop offset="50%" stopColor="#FF6B2C" stopOpacity="0.9"/>
            <stop offset="100%" stopColor="#FF6B2C" stopOpacity="0.2"/>
          </linearGradient>
          <filter id="softGlow">
            <feGaussianBlur stdDeviation="3" result="blur"/>
            <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
          </filter>
        </defs>

        {/* Pelvis bone outline */}
        <path d="M 40 40 C 35 25, 80 10, 130 12 C 180 14, 225 30, 228 50 L 235 110 C 238 150, 228 195, 210 225 C 195 248, 170 260, 145 262 C 120 264, 90 255, 68 235 C 48 215, 35 180, 32 140 Z"
          fill="none" stroke="#D1D5DB" strokeWidth="2.5" strokeDasharray="6,4" opacity="0.6"/>

        {/* Sacrum/spine */}
        <path d="M 215 20 L 222 50 C 226 75, 230 100, 232 125 L 230 155" fill="none" stroke="#CBD5E1" strokeWidth="5" strokeLinecap="round"/>
        <circle cx="215" cy="20" r="4" fill="#CBD5E1"/>
        <circle cx="222" cy="50" r="3" fill="#CBD5E1"/>
        <circle cx="228" cy="80" r="3" fill="#CBD5E1"/>
        <circle cx="231" cy="110" r="3" fill="#CBD5E1"/>
        <circle cx="231" cy="140" r="3" fill="#CBD5E1"/>

        {/* Rectum */}
        <path d="M 185 65 C 195 85, 200 115, 198 150 C 196 180, 192 210, 185 235" fill="none" stroke="#E2E8F0" strokeWidth="14" strokeLinecap="round"/>
        <path d="M 185 65 C 195 85, 200 115, 198 150 C 196 180, 192 210, 185 235" fill="none" stroke="#F8FAFC" strokeWidth="9" strokeLinecap="round"/>

        {/* Bladder */}
        <path d="M 85 50 C 75 30, 105 15, 135 17 C 165 19, 185 35, 178 55 C 172 75, 155 88, 135 92 C 110 96, 80 78, 85 50 Z"
          fill="url(#bladderFill)" stroke="#93C5FD" strokeWidth="2"/>
        {/* Bladder detail lines */}
        <path d="M 100 45 C 110 38, 140 35, 160 42" fill="none" stroke="#93C5FD" strokeWidth="0.8" opacity="0.5"/>
        <path d="M 95 60 C 115 52, 150 50, 170 58" fill="none" stroke="#93C5FD" strokeWidth="0.8" opacity="0.4"/>

        {/* Urethra */}
        <path d="M 130 92 L 125 135 L 118 175 L 110 215" fill="none" stroke="#94A3B8" strokeWidth="3" strokeLinecap="round" opacity="0.4"/>

        {/* Prostate */}
        <path d="M 108 115 C 102 102, 120 94, 138 94 C 156 94, 172 102, 168 115 C 164 130, 150 137, 138 137 C 122 137, 105 130, 108 115 Z"
          fill="url(#prostateFill)" stroke="#86EFAC" strokeWidth="2"/>

        {/* ==== PELVIC FLOOR MUSCLES — THE HERO ==== */}
        {/* Outer glow */}
        <path d="M 35 210 Q 130 260 225 210" fill="none" stroke="#FF6B2C" strokeWidth="32" strokeLinecap="round" opacity="0.06" className="animate-pf-contract"/>
        {/* Mid band */}
        <path d="M 42 212 Q 130 255 218 212" fill="none" stroke="url(#pfFill)" strokeWidth="18" strokeLinecap="round" className="animate-pf-contract" filter="url(#softGlow)"/>
        {/* Core */}
        <path d="M 48 214 Q 130 250 212 214" fill="none" stroke="#FF6B2C" strokeWidth="6" strokeLinecap="round" opacity="0.95" className="animate-pf-contract"/>
        {/* Fiber details */}
        <path d="M 55 208 Q 130 240 205 208" fill="none" stroke="#FF6B2C" strokeWidth="1.5" opacity="0.4" className="animate-pf-contract"/>
        <path d="M 50 218 Q 130 256 210 218" fill="none" stroke="#FF6B2C" strokeWidth="1.5" opacity="0.35" className="animate-pf-contract"/>

        {/* Contraction arrows */}
        <g className="animate-pf-arrows">
          <path d="M 80 240 L 80 222 M 74 228 L 80 222 L 86 228" fill="none" stroke="#FF6B2C" strokeWidth="1.8" strokeLinecap="round"/>
          <path d="M 180 240 L 180 222 M 174 228 L 180 222 L 186 228" fill="none" stroke="#FF6B2C" strokeWidth="1.8" strokeLinecap="round"/>
        </g>

        {/* ---- LABELS ---- */}
        {/* Bladder */}
        <line x1="90" y1="30" x2="25" y2="22" stroke="#94A3B8" strokeWidth="0.8"/>
        <circle cx="90" cy="30" r="2" fill="#93C5FD"/>
        <text x="2" y="19" fontSize="11" fill="#64748B" fontWeight="600" fontFamily="Inter,system-ui,sans-serif">Bladder</text>

        {/* Prostate */}
        <line x1="168" y1="115" x2="235" y2="100" stroke="#94A3B8" strokeWidth="0.8"/>
        <circle cx="168" cy="115" r="2" fill="#86EFAC"/>
        <text x="237" y="103" fontSize="10" fill="#64748B" fontWeight="600" fontFamily="Inter,system-ui,sans-serif">Prostate</text>

        {/* Rectum */}
        <line x1="200" y1="150" x2="240" y2="145" stroke="#94A3B8" strokeWidth="0.8"/>
        <circle cx="200" cy="150" r="2" fill="#CBD5E1"/>
        <text x="242" y="148" fontSize="10" fill="#64748B" fontWeight="500" fontFamily="Inter,system-ui,sans-serif">Rectum</text>

        {/* Pelvic floor */}
        <text x="130" y="280" textAnchor="middle" fontSize="13" fill="#FF6B2C" fontWeight="700" fontFamily="Inter,system-ui,sans-serif">Pelvic Floor Muscles</text>
        <text x="130" y="296" textAnchor="middle" fontSize="9" fill="#94A3B8" fontFamily="Inter,system-ui,sans-serif">↑ Contracts &amp; relaxes ↑</text>
      </svg>
    </div>
  );
}
