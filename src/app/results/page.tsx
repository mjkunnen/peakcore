"use client";

import { useState, useEffect, useRef, useCallback } from "react";

export default function ResultsPage() {
  const [discountActive, setDiscountActive] = useState(false);
  const [showSpinWheel, setShowSpinWheel] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);
  const [scrolledEnough, setScrolledEnough] = useState(false);
  const [timeOnPage, setTimeOnPage] = useState(0);
  const [wheelTriggered, setWheelTriggered] = useState(false);
  const [isSpinning, setIsSpinning] = useState(false);
  const [spinRotation, setSpinRotation] = useState(0);
  const [countdown, setCountdown] = useState(15 * 60); // 15 minutes in seconds
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const pricingSectionRef = useRef<HTMLDivElement>(null);

  // Time on page counter
  useEffect(() => {
    const timer = setInterval(() => setTimeOnPage(t => t + 1), 1000);
    return () => clearInterval(timer);
  }, []);

  // Scroll trigger: track when user scrolls past 60%
  useEffect(() => {
    const handleScroll = () => {
      if (scrolledEnough) return;
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight > 0 && scrollTop / docHeight >= 0.85) {
        setScrolledEnough(true);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [scrolledEnough]);

  // Show wheel when BOTH conditions met: scrolled 60% AND 3+ seconds on page
  useEffect(() => {
    if (scrolledEnough && timeOnPage >= 8 && !wheelTriggered && !showSpinWheel && !discountActive) {
      setShowSpinWheel(true);
      setWheelTriggered(true);
    }
  }, [scrolledEnough, timeOnPage, wheelTriggered, showSpinWheel, discountActive]);

  // Countdown timer
  useEffect(() => {
    if (!discountActive) return;
    if (countdown <= 0) return;
    const interval = setInterval(() => {
      setCountdown((prev) => (prev <= 0 ? 0 : prev - 1));
    }, 1000);
    return () => clearInterval(interval);
  }, [discountActive, countdown]);

  const formatTime = useCallback((seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, "0")}`;
  }, []);

  const handleSpin = () => {
    if (isSpinning) return;
    setIsSpinning(true);
    // 8 full rotations + land JUST barely on 75% segment (near the edge between 65% and 75%)
    // 75% segment is at 300-360deg. Land at ~305deg = just barely past the line, maximum tension
    setSpinRotation((prev) => prev + 360 * 8 + 305);
    setTimeout(() => {
      setShowSpinWheel(false);
      setShowCelebration(true);
      setIsSpinning(false);
    }, 6000); // 6 seconds for dramatic spin
  };

  const handleGoToDiscount = () => {
    setDiscountActive(true);
    setShowCelebration(false);
    setSelectedPlan(null);
    setTimeout(() => {
      pricingSectionRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  const handleCloseWheel = () => {
    setShowSpinWheel(false);
  };

  return (
    <div className="bg-white text-[#1c1b1b] antialiased" style={{ fontFamily: "'Inter', sans-serif" }}>
      {/* ===== TOP SECTION (stitch/17_result_top.html body + stitch/18_result_bottom.html top) ===== */}

      {/* TopAppBar */}
      <header className="flex justify-center items-center w-full h-14 px-4 sticky top-0 z-50 bg-[#fcf9f8]/80" style={{ backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)" }}>
        <h1 style={{ fontFamily: "'Inter', sans-serif", fontWeight: 700, fontSize: "16px", letterSpacing: "0.2em", textTransform: "uppercase", color: "#1a1a1a" }}>PEAKCORE</h1>
      </header>

      <main className="max-w-[390px] w-full mx-auto pb-12 overflow-x-hidden">
        {/* SECTION 1: Your goals pills */}
        <section className="px-5 py-6">
          <div className="flex flex-wrap gap-2">
            <span className="flex items-center gap-1.5 px-4 py-2.5 rounded-full bg-[#FFF4EE] text-[#ff6b2c] text-[14px] font-semibold">
              <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
              Better control
            </span>
            <span className="flex items-center gap-1.5 px-4 py-2.5 rounded-full bg-[#FFF4EE] text-[#ff6b2c] text-[14px] font-semibold">
              <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
              Last longer
            </span>
            <span className="flex items-center gap-1.5 px-4 py-2.5 rounded-full bg-[#FFF4EE] text-[#ff6b2c] text-[14px] font-semibold">
              <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
              More confidence
            </span>
            <span className="flex items-center gap-1.5 px-4 py-2.5 rounded-full bg-[#FFF4EE] text-[#ff6b2c] text-[14px] font-semibold">
              <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
              Build a habit
            </span>
          </div>
        </section>

        {/* ===== FROM stitch/18_result_bottom.html ===== */}

        {/* Hero Status */}
        <section className="flex flex-col items-center text-center mb-10 pt-8 px-5">
          <div className="w-14 h-14 bg-[#22C55E]/10 rounded-full flex items-center justify-center mb-4">
            <span className="material-symbols-outlined text-[#22C55E] text-4xl" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
          </div>
          <h2 className="text-[26px] leading-tight font-extrabold tracking-tight text-[#1c1b1b] mb-2">
            Your Personal Plan is Ready
          </h2>
          <p className="text-[14px] text-zinc-500 font-medium">
            Customized from your 18 answers
          </p>
        </section>

        {/* Comparison Section */}
        <section className="mb-12 px-5">
          <div className="flex items-start justify-between gap-2 relative">
            {/* NOW CARD */}
            <div className="flex-1 bg-[#f6f3f2] rounded-xl p-4 flex flex-col items-center">
              <span className="text-[12px] font-bold text-zinc-500 tracking-wider uppercase mb-4 self-start">Now</span>
              <div className="relative w-20 h-20 flex items-center justify-center mb-6">
                <svg className="w-full h-full" style={{ transform: "rotate(-90deg)" }}>
                  <circle className="text-[#e5e2e1]" cx="40" cy="40" fill="transparent" r="34" stroke="currentColor" strokeWidth="6" />
                  <circle cx="40" cy="40" fill="transparent" r="34" stroke="#EF4444" strokeDasharray="213" strokeDashoffset="160" strokeLinecap="round" strokeWidth="6" />
                </svg>
                <span className="absolute text-lg font-black text-[#1c1b1b]">25%</span>
              </div>
              <div className="w-full space-y-3">
                <div className="flex items-center justify-between text-[11px] font-bold">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-[#EF4444]"></span>
                    <span className="text-zinc-600">Control</span>
                  </div>
                  <span className="text-[#EF4444]">Low</span>
                </div>
                <div className="flex items-center justify-between text-[11px] font-bold">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-[#FF6B2C]"></span>
                    <span className="text-zinc-600">Duration</span>
                  </div>
                  <span className="text-[#FF6B2C]">Below avg</span>
                </div>
                <div className="flex items-center justify-between text-[11px] font-bold">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-[#EF4444]"></span>
                    <span className="text-zinc-600">Confidence</span>
                  </div>
                  <span className="text-[#EF4444]">2/10</span>
                </div>
              </div>
            </div>
            {/* ARROW */}
            <div className="absolute left-1/2 top-1/3" style={{ transform: "translate(-50%, 0)" }}>
              <div className="bg-[#ff6b2c] text-white w-10 h-10 rounded-full flex items-center justify-center shadow-lg" style={{ boxShadow: "0 4px 12px rgba(255,107,44,0.2)" }}>
                <span className="material-symbols-outlined font-black">arrow_forward</span>
              </div>
            </div>
            {/* GOAL CARD */}
            <div className="flex-1 bg-white ring-2 ring-[#ff6b2c] rounded-xl p-4 flex flex-col items-center shadow-xl" style={{ boxShadow: "0 4px 24px rgba(255,107,44,0.05)" }}>
              <span className="text-[12px] font-bold text-[#ff6b2c] tracking-wider uppercase mb-4 self-start">Your Goal</span>
              <div className="relative w-20 h-20 flex items-center justify-center mb-6">
                <svg className="w-full h-full" style={{ transform: "rotate(-90deg)" }}>
                  <circle className="text-[#f6f3f2]" cx="40" cy="40" fill="transparent" r="34" stroke="currentColor" strokeWidth="6" />
                  <circle cx="40" cy="40" fill="transparent" r="34" stroke="#22C55E" strokeDasharray="213" strokeDashoffset="21" strokeLinecap="round" strokeWidth="6" />
                </svg>
                <span className="absolute text-lg font-black text-[#1c1b1b]">90%</span>
              </div>
              <div className="w-full space-y-3">
                <div className="flex items-center justify-between text-[11px] font-bold">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-[#22C55E]"></span>
                    <span className="text-zinc-600">Control</span>
                  </div>
                  <span className="text-[#22C55E]">Strong</span>
                </div>
                <div className="flex items-center justify-between text-[11px] font-bold">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-[#22C55E]"></span>
                    <span className="text-zinc-600">Duration</span>
                  </div>
                  <span className="text-[#22C55E]">Above avg</span>
                </div>
                <div className="flex items-center justify-between text-[11px] font-bold">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-[#22C55E]"></span>
                    <span className="text-zinc-600">Confidence</span>
                  </div>
                  <span className="text-[#22C55E]">9/10</span>
                </div>
              </div>
            </div>
          </div>
          <p className="mt-4 text-[11px] text-zinc-400 italic text-center leading-relaxed px-4">
            Based on men with similar profiles who completed the program
          </p>
        </section>

        {/* SECTION: Proven by science */}
        <section className="px-5 py-8 bg-[#fcf9f8]">
          <h2 className="text-[18px] font-bold text-[#1A1A1A] mb-5 flex items-center gap-2">
            <span className="material-symbols-outlined text-[#1A1A1A]">science</span>
            Proven by science
          </h2>
          <div className="flex flex-col gap-4">
            <div className="flex items-start gap-4 p-5 bg-[#F7F7F8] rounded-xl">
              <div className="flex-shrink-0">
                <span className="text-[36px] font-extrabold text-[#ff6b2c] tracking-tight">75%</span>
              </div>
              <div className="flex flex-col gap-1">
                <p className="text-[14px] leading-snug text-[#1c1b1b]">of men see noticeable improvement within the first 2-4 weeks of daily pelvic training</p>
                <span className="text-[11px] italic text-[#9CA3AF]">British Journal of General Practice</span>
              </div>
            </div>
            <div className="flex items-start gap-4 p-5 bg-[#F7F7F8] rounded-xl">
              <div className="flex-shrink-0">
                <span className="text-[36px] font-extrabold text-[#ff6b2c] tracking-tight">5 min</span>
              </div>
              <div className="flex flex-col gap-1">
                <p className="text-[14px] leading-snug text-[#1c1b1b]">per day is all it takes. Short daily sessions outperform longer weekly workouts</p>
                <span className="text-[11px] italic text-[#9CA3AF]">Journal of Urology, 2019</span>
              </div>
            </div>
            <div className="flex items-start gap-4 p-5 bg-[#F7F7F8] rounded-xl">
              <div className="flex-shrink-0">
                <span className="text-[36px] font-extrabold text-[#ff6b2c] tracking-tight">83%</span>
              </div>
              <div className="flex flex-col gap-1">
                <p className="text-[14px] leading-snug text-[#1c1b1b]">of men reported improved confidence and performance after completing a structured program</p>
                <span className="text-[11px] italic text-[#9CA3AF]">International Journal of Impotence Research</span>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION: 3-step visual timeline */}
        <section className="px-8 py-10">
          <div className="relative flex flex-col gap-10">
            <div className="absolute left-[13.5px] top-4 bottom-4 w-[1px] bg-[#ff6b2c]"></div>
            <div className="relative flex items-start gap-6">
              <div className="z-10 w-7 h-7 flex-shrink-0 flex items-center justify-center bg-[#ff6b2c] text-white text-[14px] font-bold rounded-full">1</div>
              <div className="flex flex-col gap-0.5">
                <h3 className="text-[16px] font-bold text-[#1c1b1b]">Build the foundation</h3>
                <p className="text-[14px] text-[#9CA3AF]">Learn correct technique with guided sessions</p>
              </div>
            </div>
            <div className="relative flex items-start gap-6">
              <div className="z-10 w-7 h-7 flex-shrink-0 flex items-center justify-center bg-[#ff6b2c] text-white text-[14px] font-bold rounded-full">2</div>
              <div className="flex flex-col gap-0.5">
                <h3 className="text-[16px] font-bold text-[#1c1b1b]">Get stronger every day</h3>
                <p className="text-[14px] text-[#9CA3AF]">Progressive intensity, real measurable gains</p>
              </div>
            </div>
            <div className="relative flex items-start gap-6">
              <div className="z-10 w-7 h-7 flex-shrink-0 flex items-center justify-center bg-[#22C55E] text-white text-[14px] font-bold rounded-full">
                <span className="material-symbols-outlined text-[18px]">check</span>
              </div>
              <div className="flex flex-col gap-0.5">
                <h3 className="text-[16px] font-bold text-[#1c1b1b]">Reach your goal</h3>
                <p className="text-[14px] text-[#9CA3AF]">See the results. Maintain with easy routine</p>
              </div>
            </div>
          </div>
        </section>

        {/* Feature Grid Section */}
        <section className="mb-10 px-5">
          <div className="flex justify-between items-baseline mb-6">
            <h3 className="text-xl font-extrabold tracking-tight">What you get</h3>
            <span className="text-[10px] font-bold text-[#a83900] tracking-widest uppercase">Premium Access</span>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {/* Card 1 */}
            <div className="bg-[#f6f3f2] p-4 rounded-xl flex flex-col gap-3 active:scale-95 transition-transform">
              <span className="material-symbols-outlined text-[#ff6b2c] text-2xl">assignment</span>
              <div>
                <p className="text-[13px] font-bold leading-none mb-1 text-[#1c1b1b]">Personal protocol</p>
                <p className="text-[11px] text-zinc-500 leading-tight">Built for your goals</p>
              </div>
            </div>
            {/* Card 2 */}
            <div className="bg-[#f6f3f2] p-4 rounded-xl flex flex-col gap-3 active:scale-95 transition-transform">
              <span className="material-symbols-outlined text-[#ff6b2c] text-2xl">trending_up</span>
              <div>
                <p className="text-[13px] font-bold leading-none mb-1 text-[#1c1b1b]">Gets harder daily</p>
                <p className="text-[11px] text-zinc-500 leading-tight">Progressive intensity</p>
              </div>
            </div>
            {/* Card 3 */}
            <div className="bg-[#f6f3f2] p-4 rounded-xl flex flex-col gap-3 active:scale-95 transition-transform">
              <span className="material-symbols-outlined text-[#ff6b2c] text-2xl">bolt</span>
              <div>
                <p className="text-[13px] font-bold leading-none mb-1 text-[#1c1b1b]">Fast results first</p>
                <p className="text-[11px] text-zinc-500 leading-tight">Highest impact moves</p>
              </div>
            </div>
            {/* Card 4 */}
            <div className="bg-[#f6f3f2] p-4 rounded-xl flex flex-col gap-3 active:scale-95 transition-transform">
              <span className="material-symbols-outlined text-[#ff6b2c] text-2xl">mail</span>
              <div>
                <p className="text-[13px] font-bold leading-none mb-1 text-[#1c1b1b]">Daily reminders</p>
                <p className="text-[11px] text-zinc-500 leading-tight">Never miss a session</p>
              </div>
            </div>
            {/* Card 5 */}
            <div className="bg-[#f6f3f2] p-4 rounded-xl flex flex-col gap-3 active:scale-95 transition-transform">
              <span className="material-symbols-outlined text-[#ff6b2c] text-2xl">sync</span>
              <div>
                <p className="text-[13px] font-bold leading-none mb-1 text-[#1c1b1b]">Auto-adjusting</p>
                <p className="text-[11px] text-zinc-500 leading-tight">Adapts to your level</p>
              </div>
            </div>
            {/* Card 6 */}
            <div className="bg-[#f6f3f2] p-4 rounded-xl flex flex-col gap-3 active:scale-95 transition-transform">
              <span className="material-symbols-outlined text-[#ff6b2c] text-2xl">lock</span>
              <div>
                <p className="text-[13px] font-bold leading-none mb-1 text-[#1c1b1b]">100% private</p>
                <p className="text-[11px] text-zinc-500 leading-tight">No app. Just email.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Dynamic Content Callout */}
        <section className="bg-[#1c1b1b] text-[#fcf9f8] rounded-2xl p-6 mb-8 relative overflow-hidden mx-5">
          <div className="relative z-10">
            <h4 className="text-2xl font-black tracking-tighter mb-2">94% SUCCESS RATE</h4>
            <p className="text-sm opacity-80 leading-relaxed mb-6">Users who followed the protocol for 30 days reported a significant increase in physical stamina and mental discipline.</p>
            <button className="w-full bg-[#ff6b2c] text-white py-4 rounded-xl font-bold uppercase tracking-widest text-sm active:scale-95 transition-transform">
              Get My Plan Now
            </button>
          </div>
          {/* Decorative kinetic element */}
          <div className="absolute -right-8 -bottom-8 w-32 h-32 bg-[#a83900]/20 blur-3xl rounded-full"></div>
        </section>

        {/* ===== BOTTOM SECTION: PRICING ===== */}
        <div ref={pricingSectionRef}>
          {!discountActive ? (
            <>
              {/* Pre-discount pricing - stacked vertical cards */}
              <section className="text-center px-4 pt-6">
                <h1 className="text-[20px] font-bold text-[#1c1b1b]">Choose your plan</h1>
              </section>

              <div className="flex flex-col gap-3 px-4 mt-6">
                {/* Card 1: 1 Week */}
                <div onClick={() => setSelectedPlan("1week")} className={`option-tap cursor-pointer flex flex-col p-5 bg-white border-2 rounded-xl shadow-sm active:scale-[0.98] transition-all ${selectedPlan === "1week" ? "option-selected border-[#FF6B2C]" : "border-[#E4E4E7]"}`}>
                  <div className="flex justify-between items-start">
                    <div className="flex flex-col">
                      <span className="text-[14px] font-bold tracking-tight text-[#1c1b1b]">1-WEEK TRIAL</span>
                    </div>
                    <div className="flex flex-col items-end">
                      <span className="text-[20px] font-bold text-[#1c1b1b]">$9.99</span>
                    </div>
                  </div>
                  <div className="flex justify-end mt-1">
                    <span className="text-[12px] text-[#71717A]">$1.43/day</span>
                  </div>
                </div>

                {/* Card 2: 4 Weeks HIGHLIGHTED */}
                <div onClick={() => setSelectedPlan("4week")} className={`option-tap cursor-pointer relative flex flex-col p-5 border-2 rounded-xl active:scale-[0.98] transition-all ${selectedPlan === "4week" ? "option-selected border-[#FF6B2C] bg-[#FFF4EE]" : "bg-white border-[#E4E4E7]"}`}>
                  <div className="absolute -top-3 right-4 bg-[#FF6B2C] text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                    MOST POPULAR
                  </div>
                  <div className="flex justify-between items-start pt-1">
                    <div className="flex flex-col">
                      <span className="text-[14px] font-bold tracking-tight text-[#1c1b1b]">4-WEEK PLAN</span>
                    </div>
                    <div className="flex flex-col items-end">
                      <span className="text-[28px] font-bold text-[#1c1b1b] leading-none">$39.99</span>
                    </div>
                  </div>
                  <div className="flex justify-end mt-2">
                    <span className="text-[12px] text-[#71717A]">$1.33/day</span>
                  </div>
                </div>

                {/* Card 3: 12 Weeks */}
                <div onClick={() => setSelectedPlan("12week")} className={`option-tap cursor-pointer flex flex-col p-5 bg-white border-2 rounded-xl shadow-sm active:scale-[0.98] transition-all ${selectedPlan === "12week" ? "option-selected border-[#FF6B2C]" : "border-[#E4E4E7]"}`}>
                  <div className="flex justify-between items-start">
                    <div className="flex flex-col">
                      <div className="flex items-center gap-2">
                        <span className="text-[14px] font-bold tracking-tight text-[#1c1b1b]">12-WEEK PLAN</span>
                        <div className="bg-[#22C55E]/10 text-[#22C55E] text-[10px] font-bold px-2 py-0.5 rounded border border-[#22C55E]/20">BEST VALUE</div>
                      </div>
                    </div>
                    <div className="flex flex-col items-end">
                      <span className="text-[20px] font-bold text-[#1c1b1b]">$89.99</span>
                    </div>
                  </div>
                  <div className="flex justify-end mt-1">
                    <span className="text-[12px] text-[#71717A]">$0.99/day</span>
                  </div>
                </div>
              </div>

              {/* Social Proof */}
              <p className="text-center text-[12px] italic text-[#71717A] px-8 mt-6">
                &quot;People who train for 12 weeks see 2x the results vs 4 weeks&quot;
              </p>

              {/* CTA Button */}
              <div className="flex flex-col gap-4 px-4 mt-6">
                <button disabled={!selectedPlan} className={`w-full h-[56px] font-bold text-[16px] rounded-xl active:scale-[0.98] transition-all flex items-center justify-center gap-2 ${selectedPlan ? "bg-[#ff6b2c] text-white shadow-[0_0_20px_rgba(255,107,44,0.4)] animate-cta-glow" : "bg-[#E4E4E7] text-[#71717A] cursor-not-allowed"}`}>
                  Get My Plan
                  <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                </button>
                <div className="flex flex-col items-center gap-3">
                  <div className="flex items-center gap-1.5 text-[12px] text-[#71717A] font-medium">
                    <span className="material-symbols-outlined text-[14px] text-[#22C55E]" style={{ fontVariationSettings: "'FILL' 1" }}>verified_user</span>
                    30-day money-back guarantee &middot; Cancel anytime
                  </div>
                  <div className="flex items-center gap-1 text-[11px] text-[#9CA3AF]">
                    <span className="material-symbols-outlined text-[12px]">lock</span>
                    Secured by Stripe
                  </div>
                </div>
              </div>

              <p className="text-[10px] text-[#9CA3AF] text-center leading-relaxed px-10 mt-6">
                Auto-renews at $39.99/mo after intro period unless cancelled. See Subscription Terms.
              </p>
            </>
          ) : (
            <>
              {/* stitch/21_discount.html - Discounted pricing */}

              {/* Top Urgency Banner */}
              <div className="w-full max-w-[390px] bg-[#FFF4EE] py-3 px-4 flex justify-between items-center sticky top-14 z-40">
                <span className="text-[13px] font-bold text-[#FF6B2C]">&#127881; Your 75% discount is active</span>
                <div className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-[14px] text-[#EF4444]">timer</span>
                  <span className="text-[13px] font-bold text-[#EF4444]">{formatTime(countdown)}</span>
                </div>
              </div>

              {/* Section Header */}
              <section className="text-center px-4 pt-6">
                <h1 className="text-[20px] font-bold text-[#1c1b1b]">Choose your plan</h1>
              </section>

              {/* Pricing Cards Stack */}
              <div className="flex flex-col gap-3 px-4 mt-6">
                {/* Card 1: 1 Week Trial */}
                <div onClick={() => setSelectedPlan("d1week")} className={`option-tap cursor-pointer flex flex-col p-5 bg-white border-2 rounded-xl shadow-sm active:scale-[0.98] transition-all ${selectedPlan === "d1week" ? "option-selected border-[#FF6B2C]" : "border-[#E4E4E7]"}`}>
                  <div className="flex justify-between items-start">
                    <div className="flex flex-col">
                      <span className="text-[14px] font-bold tracking-tight text-[#1c1b1b]">1-WEEK TRIAL</span>
                    </div>
                    <div className="flex flex-col items-end">
                      <div className="flex items-center gap-2">
                        <span className="text-[14px] line-through text-[#9CA3AF]">$9.99</span>
                        <span className="text-[20px] font-bold text-[#1c1b1b]">$4.99</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-end mt-1">
                    <span className="text-[12px] text-[#71717A]">$0.71/day</span>
                  </div>
                </div>

                {/* Card 2: 4 Weeks HIGHLIGHTED */}
                <div onClick={() => setSelectedPlan("d4week")} className={`option-tap cursor-pointer relative flex flex-col p-5 border-2 rounded-xl active:scale-[0.98] transition-all ${selectedPlan === "d4week" ? "option-selected border-[#FF6B2C]" : "bg-[#FFF4EE] border-[#FF6B2C]"}`}>
                  <div className="absolute -top-3 right-4 bg-[#FF6B2C] text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                    MOST POPULAR
                  </div>
                  <div className="flex justify-between items-start pt-1">
                    <div className="flex flex-col gap-2">
                      <span className="text-[14px] font-bold tracking-tight text-[#1c1b1b]">4-WEEK PLAN</span>
                      <div className="w-fit bg-[#FF6B2C] text-white text-[10px] font-bold px-2 py-0.5 rounded">75% OFF</div>
                    </div>
                    <div className="flex flex-col items-end">
                      <div className="flex items-center gap-2">
                        <span className="text-[16px] line-through text-[#9CA3AF]">$39.99</span>
                        <span className="text-[28px] font-bold text-[#1c1b1b] leading-none">$9.99</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-end mt-2">
                    <span className="text-[12px] text-[#71717A]">$0.33/day</span>
                  </div>
                </div>

                {/* Card 3: 12 Weeks */}
                <div onClick={() => setSelectedPlan("d12week")} className={`option-tap cursor-pointer flex flex-col p-5 bg-white border-2 rounded-xl shadow-sm active:scale-[0.98] transition-all ${selectedPlan === "d12week" ? "option-selected border-[#FF6B2C]" : "border-[#E4E4E7]"}`}>
                  <div className="flex justify-between items-start">
                    <div className="flex flex-col gap-2">
                      <div className="flex items-center gap-2">
                        <span className="text-[14px] font-bold tracking-tight text-[#1c1b1b]">12-WEEK PLAN</span>
                        <div className="bg-[#22C55E]/10 text-[#22C55E] text-[10px] font-bold px-2 py-0.5 rounded border border-[#22C55E]/20">BEST VALUE</div>
                      </div>
                      <div className="w-fit bg-[#22C55E] text-white text-[10px] font-bold px-2 py-0.5 rounded">79% OFF</div>
                    </div>
                    <div className="flex flex-col items-end">
                      <div className="flex items-center gap-2">
                        <span className="text-[14px] line-through text-[#9CA3AF]">$89.99</span>
                        <span className="text-[20px] font-bold text-[#1c1b1b]">$18.99</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-end mt-1">
                    <span className="text-[12px] text-[#71717A]">$0.21/day</span>
                  </div>
                </div>
              </div>

              {/* Social Proof Metric */}
              <p className="text-center text-[12px] italic text-[#71717A] px-8 mt-6">
                &quot;People who train for 12 weeks see 2x the results vs 4 weeks&quot;
              </p>

              {/* Main Action CTA */}
              <div className="flex flex-col gap-4 px-4 mt-6">
                <button disabled={!selectedPlan} className={`w-full h-[56px] font-bold text-[16px] rounded-xl active:scale-[0.98] transition-all flex items-center justify-center gap-2 ${selectedPlan ? "bg-[#22C55E] text-white shadow-[0_0_20px_rgba(34,197,94,0.4)] animate-cta-glow" : "bg-[#E4E4E7] text-[#71717A] cursor-not-allowed"}`}>
                  Get My Plan Now
                  <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                </button>
                {/* Trust Badges */}
                <div className="flex flex-col items-center gap-3">
                  <div className="flex items-center gap-1.5 text-[12px] text-[#71717A] font-medium">
                    <span className="material-symbols-outlined text-[14px] text-[#22C55E]" style={{ fontVariationSettings: "'FILL' 1" }}>verified_user</span>
                    30-day money-back guarantee &middot; Cancel anytime
                  </div>
                  <div className="flex items-center gap-1 text-[11px] text-[#9CA3AF]">
                    <span className="material-symbols-outlined text-[12px]">lock</span>
                    Secured by Stripe
                  </div>
                </div>
              </div>

              {/* Footnote / Fine Print */}
              <p className="text-[10px] text-[#9CA3AF] text-center leading-relaxed px-10 mt-6">
                Auto-renews at $39.99/mo after intro period unless cancelled. See Subscription Terms.
              </p>

              {/* Final Urgency Reminder */}
              <div className="flex flex-col items-center gap-1 py-4 border-t border-[#f0eded] mx-4 mt-6">
                <span className="text-[13px] font-bold text-[#EF4444]">&#9200; Don&apos;t lose your 75% discount</span>
                <span className="text-[11px] text-[#71717A]">This offer won&apos;t be available if you leave this page</span>
              </div>

            </>
          )}
        </div>
      </main>

      {/* ===== SPIN THE WHEEL OVERLAY (stitch/19_spin.html) ===== */}
      {showSpinWheel && !showCelebration && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
          {/* Backdrop */}
          <div className="absolute inset-0 bg-[#4b240a]/80" style={{ backdropFilter: "blur(4px)" }}></div>
          {/* Modal Content */}
          <div className="relative w-full max-w-[340px] bg-white rounded-xl flex flex-col items-center p-8 overflow-visible" style={{ boxShadow: "0 32px 64px rgba(75,36,10,0.15)" }}>
            {/* Top Text */}
            <div className="text-center mb-8">
              <h2 className="text-xl font-bold text-[#1c1b1b] tracking-tight mb-2">
                &#127873; Wait — you qualify for a discount!
              </h2>
              <p className="text-[14px] text-[#815032]/80 font-medium">
                Spin the wheel to reveal your offer
              </p>
            </div>
            {/* The Prize Wheel Section */}
            <div className="relative mb-10 group">
              {/* Pointer */}
              <div className="absolute -top-3 left-1/2 z-20" style={{ transform: "translateX(-50%)" }}>
                <div className="w-0 h-0" style={{ borderLeft: "12px solid transparent", borderRight: "12px solid transparent", borderTop: "16px solid #4b240a", filter: "drop-shadow(0 2px 2px rgba(0,0,0,0.15))" }}></div>
              </div>
              {/* Wheel Container */}
              <div
                className="w-[220px] h-[220px] rounded-full border-[8px] border-[#ffe3d4] shadow-2xl relative overflow-hidden ring-4 ring-white/50"
                style={{
                  background: "conic-gradient(from 0deg, #ffc9ac 0deg 60deg, #ffe3d4 60deg 120deg, #ff7943 120deg 180deg, #f76526 180deg 240deg, #a33700 240deg 300deg, #006a35 300deg 360deg)",
                  transform: `rotate(${spinRotation}deg)`,
                  transition: isSpinning ? "transform 6s cubic-bezier(0.15, 0.60, 0.08, 1.00)" : "none",
                }}
              >
                {/* Text Labels */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <span className="absolute font-black text-[#815032] text-sm" style={{ top: "15%", left: "65%", transform: "rotate(-30deg)" }}>10%</span>
                  <span className="absolute font-black text-[#815032] text-sm" style={{ top: "50%", left: "80%", transform: "rotate(30deg)" }}>25%</span>
                  <span className="absolute font-black text-white text-sm" style={{ top: "80%", left: "55%", transform: "rotate(90deg)" }}>40%</span>
                  <span className="absolute font-black text-white text-sm" style={{ top: "75%", left: "20%", transform: "rotate(150deg)" }}>50%</span>
                  <span className="absolute font-black text-white text-sm" style={{ top: "35%", left: "10%", transform: "rotate(210deg)" }}>65%</span>
                  <span className="absolute font-black text-white text-sm" style={{ top: "5%", left: "30%", transform: "rotate(270deg)" }}>75%</span>
                </div>
                {/* Inner Hub */}
                <div className="absolute inset-0 m-auto w-12 h-12 rounded-full bg-white shadow-inner flex items-center justify-center border-4 border-[#ffe3d4]">
                  <div className="w-2 h-2 rounded-full bg-[#a33700] animate-pulse"></div>
                </div>
              </div>
              {/* Decorative Glow */}
              <div className="absolute inset-0 bg-[#a33700]/5 blur-3xl rounded-full -z-10 scale-150"></div>
            </div>
            {/* Interaction Section */}
            <div className="w-full space-y-4">
              <button
                onClick={handleSpin}
                className="w-full h-14 text-white font-bold text-[18px] rounded-lg active:scale-95 transition-all duration-200"
                style={{ background: "linear-gradient(to right, #a33700, #ff7943)", boxShadow: "0 8px 24px rgba(163,55,0,0.3)" }}
              >
                SPIN!
              </button>
              <div className="text-center">
                <p className="text-[12px] text-[#815032]/70 font-medium">
                  You have 1 spin remaining
                </p>
              </div>
            </div>
            {/* Close Button */}
            <button onClick={handleCloseWheel} className="absolute -top-12 right-0 text-white opacity-60 hover:opacity-100 flex items-center gap-2 text-sm font-medium">
              <span>No thanks</span>
              <span className="material-symbols-outlined">close</span>
            </button>
            {/* Recent Winners Badge */}
            <div className="absolute -bottom-6 left-1/2 px-4 py-2 rounded-full border border-white/40 shadow-xl flex items-center gap-2 min-w-[180px]" style={{ transform: "translateX(-50%)", backdropFilter: "blur(20px)", background: "rgba(255,255,255,0.8)" }}>
              <div className="w-2 h-2 rounded-full bg-[#006a35]"></div>
              <p className="text-[10px] font-bold text-[#4b240a] uppercase tracking-wider">Someone just won 75%!</p>
            </div>
          </div>
        </div>
      )}

      {/* ===== CELEBRATION OVERLAY (stitch/20_celebration.html) ===== */}
      {showCelebration && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6" style={{ backdropFilter: "blur(4px)" }}>
          {/* Backdrop */}
          <div className="absolute inset-0" style={{ backgroundColor: "rgba(0,0,0,0.85)" }}></div>
          {/* Modal Content */}
          <div className="relative w-[340px] bg-white rounded-[24px] p-10 flex flex-col items-center text-center shadow-2xl z-10">
            {/* 1. Large Emoji */}
            <div className="text-[56px] leading-none mb-6">
              &#127881;
            </div>
            {/* 3. Sub-headline */}
            <div className="text-[14px] font-bold uppercase tracking-[0.3em] text-[#71717A] mb-2">
              YOU WON
            </div>
            {/* 4. Hero Content */}
            <div className="text-[56px] font-black text-[#ff6b2c] leading-none tracking-tighter italic mb-2" style={{ textShadow: "0 0 40px rgba(255, 107, 44, 0.4)" }}>
              75% OFF
            </div>
            {/* 6. Copy Section */}
            <div className="flex flex-col items-center mt-2">
              <p className="text-[15px] font-semibold text-[#1A1A1A] mb-3">
                This is the biggest discount we offer.
              </p>
              <p className="text-[14px] text-[#71717A] max-w-[280px] leading-relaxed mb-5">
                It&apos;s only available right now, and it won&apos;t come back once you leave this page.
              </p>
              <div className="w-12 h-[2px] bg-[#ff6b2c]/20 mb-5"></div>
              <p className="text-[14px] font-semibold text-[#1A1A1A]">
                Your personalized plan is locked in and waiting.
              </p>
            </div>
            {/* 8. CTA Button */}
            <div className="w-full mt-8">
              <button
                onClick={handleGoToDiscount}
                className="w-full h-14 bg-[#ff6b2c] text-white font-bold text-[16px] rounded-xl flex items-center justify-center gap-2 active:scale-[0.98] transition-all"
                style={{ boxShadow: "0 10px 25px -5px rgba(255, 107, 44, 0.4)" }}
              >
                Go to my discount
                <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
              </button>
            </div>
            {/* 10. Urgency Timer */}
            <div className="mt-2 flex items-center justify-center gap-1.5 text-[#EF4444] font-medium text-[13px]">
              <span className="material-symbols-outlined text-[16px]">schedule</span>
              Expires in 14:59
            </div>
          </div>
          {/* Background Kinetic Detail */}
          <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-[60] overflow-hidden opacity-10">
            <div className="absolute w-[40%] h-[40%] bg-[#ff6b2c] blur-[120px] rounded-full" style={{ top: "-10%", left: "-10%" }}></div>
            <div className="absolute w-[40%] h-[40%] bg-[#ff6b2c] blur-[120px] rounded-full" style={{ bottom: "-10%", right: "-10%" }}></div>
          </div>
        </div>
      )}

    </div>
  );
}
