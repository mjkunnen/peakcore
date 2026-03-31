"use client";

import { useState, useEffect, useRef, useCallback } from "react";

export default function ResultsPage() {
  const [discountActive, setDiscountActive] = useState(false);
  const [showOffer, setShowOffer] = useState(false);
  const [scrolledEnough, setScrolledEnough] = useState(false);
  const [timeOnPage, setTimeOnPage] = useState(0);
  const [offerTriggered, setOfferTriggered] = useState(false);
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

  // Show offer when BOTH conditions met: scrolled 85% AND 8+ seconds on page
  useEffect(() => {
    if (scrolledEnough && timeOnPage >= 8 && !offerTriggered && !showOffer && !discountActive) {
      setShowOffer(true);
      setOfferTriggered(true);
    }
  }, [scrolledEnough, timeOnPage, offerTriggered, showOffer, discountActive]);

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

  const handleAcceptOffer = () => {
    setDiscountActive(true);
    setShowOffer(false);
    setSelectedPlan(null);
    setTimeout(() => {
      pricingSectionRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  const handleDeclineOffer = () => {
    setShowOffer(false);
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
              Restored control
            </span>
            <span className="flex items-center gap-1.5 px-4 py-2.5 rounded-full bg-[#FFF4EE] text-[#ff6b2c] text-[14px] font-semibold">
              <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
              Improved stamina
            </span>
            <span className="flex items-center gap-1.5 px-4 py-2.5 rounded-full bg-[#FFF4EE] text-[#ff6b2c] text-[14px] font-semibold">
              <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
              Renewed confidence
            </span>
            <span className="flex items-center gap-1.5 px-4 py-2.5 rounded-full bg-[#FFF4EE] text-[#ff6b2c] text-[14px] font-semibold">
              <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
              Clinician-backed protocol
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
            Built from your personal assessment — no two plans are alike
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
                    <span className="text-zinc-600">Stamina</span>
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
                    <span className="text-zinc-600">Stamina</span>
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
            <h4 className="text-2xl font-black tracking-tighter mb-2">Trusted by 3,800+ men</h4>
            <p className="text-sm opacity-80 leading-relaxed mb-6">Men who completed the 8-week protocol reported significant improvement in stamina, control, and daily confidence.</p>
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
                <span className="text-[13px] font-bold text-[#FF6B2C]">&#127881; Your introductory pricing is active</span>
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
                      <div className="w-fit bg-[#FF6B2C] text-white text-[10px] font-bold px-2 py-0.5 rounded">LAUNCH PRICE</div>
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
                      <div className="w-fit bg-[#22C55E] text-white text-[10px] font-bold px-2 py-0.5 rounded">BEST VALUE</div>
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
                <span className="text-[13px] font-bold text-[#EF4444]">&#9200; Don&apos;t lose your introductory pricing</span>
                <span className="text-[11px] text-[#71717A]">This offer won&apos;t be available if you leave this page</span>
              </div>

            </>
          )}
        </div>
      </main>

      {/* ===== LIMITED-TIME OFFER OVERLAY ===== */}
      {showOffer && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/80" style={{ backdropFilter: "blur(4px)" }}></div>
          {/* Modal Content */}
          <div className="relative w-full max-w-[360px] bg-white rounded-2xl flex flex-col items-center p-8 overflow-visible z-10" style={{ boxShadow: "0 32px 64px rgba(0,0,0,0.2)" }}>
            <span className="text-4xl mb-4">&#9200;</span>
            <h2 className="text-xl font-bold text-[#1c1b1b] tracking-tight mb-2 text-center">
              Introductory Pricing — Limited Time
            </h2>
            <p className="text-[14px] text-[#71717A] text-center mb-2">
              As part of our launch, you qualify for our lowest rate.
            </p>
            <p className="text-[13px] text-[#EF4444] font-semibold text-center mb-6">
              This offer expires when you leave this page.
            </p>

            {/* Pricing options */}
            <div className="w-full space-y-3 mb-6">
              <div className="flex justify-between items-center p-4 border border-[#E4E4E7] rounded-xl">
                <span className="text-[14px] font-bold text-[#1c1b1b]">1-WEEK</span>
                <div className="flex items-center gap-2">
                  <span className="text-[13px] line-through text-[#9CA3AF]">$9.99</span>
                  <span className="text-[18px] font-bold text-[#1c1b1b]">$4.99</span>
                </div>
              </div>
              <div className="flex justify-between items-center p-4 border-2 border-[#FF6B2C] rounded-xl bg-[#FFF4EE] relative">
                <div className="absolute -top-2.5 right-3 bg-[#FF6B2C] text-white text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">RECOMMENDED</div>
                <span className="text-[14px] font-bold text-[#1c1b1b]">4-WEEK</span>
                <div className="flex items-center gap-2">
                  <span className="text-[13px] line-through text-[#9CA3AF]">$39.99</span>
                  <span className="text-[18px] font-bold text-[#1c1b1b]">$9.99</span>
                </div>
              </div>
              <div className="flex justify-between items-center p-4 border border-[#E4E4E7] rounded-xl relative">
                <div className="absolute -top-2.5 right-3 bg-[#22C55E] text-white text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">BEST VALUE</div>
                <span className="text-[14px] font-bold text-[#1c1b1b]">12-WEEK</span>
                <div className="flex items-center gap-2">
                  <span className="text-[13px] line-through text-[#9CA3AF]">$89.99</span>
                  <span className="text-[18px] font-bold text-[#1c1b1b]">$18.99</span>
                </div>
              </div>
            </div>

            {/* Trust text */}
            <p className="text-[12px] text-[#71717A] text-center mb-1">30-day money-back guarantee · Cancel anytime</p>
            <p className="text-[11px] text-[#9CA3AF] text-center mb-5">Discreet billing — shows as &apos;PKC Digital&apos; on your statement</p>

            {/* CTA */}
            <button
              onClick={handleAcceptOffer}
              className="w-full h-14 bg-[#22C55E] text-white font-bold text-[16px] rounded-xl flex items-center justify-center gap-2 active:scale-[0.98] transition-all mb-3"
              style={{ boxShadow: "0 10px 25px -5px rgba(34,197,94,0.4)" }}
            >
              Start My Protocol →
            </button>

            {/* Skip */}
            <button onClick={handleDeclineOffer} className="text-[13px] text-[#9CA3AF] hover:text-[#71717A] transition-colors">
              No thanks, I&apos;ll pay full price
            </button>

            {/* Countdown */}
            <div className="mt-3 flex items-center justify-center gap-1.5 text-[#EF4444] font-medium text-[13px]">
              <span className="material-symbols-outlined text-[16px]">schedule</span>
              {formatTime(countdown)}
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
