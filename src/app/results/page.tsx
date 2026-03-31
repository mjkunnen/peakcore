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
  const [pricingSeenAt, setPricingSeenAt] = useState<number | null>(null);
  const pricingSectionRef = useRef<HTMLDivElement>(null);
  const pricingRef = useRef<HTMLDivElement>(null);

  // Time on page counter
  useEffect(() => {
    const timer = setInterval(() => setTimeOnPage(t => t + 1), 1000);
    return () => clearInterval(timer);
  }, []);

  // Intersection Observer: detect when pricing section enters viewport
  useEffect(() => {
    if (scrolledEnough || !pricingRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setScrolledEnough(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(pricingRef.current);
    return () => observer.disconnect();
  }, [scrolledEnough]);

  // When pricing section is seen, record the time
  useEffect(() => {
    if (scrolledEnough && pricingSeenAt === null) {
      setPricingSeenAt(timeOnPage);
    }
  }, [scrolledEnough, pricingSeenAt, timeOnPage]);

  // Show offer 5 seconds after pricing was seen
  useEffect(() => {
    if (pricingSeenAt !== null && timeOnPage >= pricingSeenAt + 5 && !offerTriggered && !showOffer && !discountActive) {
      setShowOffer(true);
      setOfferTriggered(true);
    }
  }, [pricingSeenAt, timeOnPage, offerTriggered, showOffer, discountActive]);

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

        {/* Hero Status */}
        <section className="flex flex-col items-center text-center mb-10 pt-8 px-5">
          <div className="w-14 h-14 bg-[#22C55E]/10 rounded-full flex items-center justify-center mb-4">
            <span className="material-symbols-outlined text-[#22C55E] text-4xl" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
          </div>
          <h2 className="text-[26px] leading-tight font-extrabold tracking-tight text-[#1c1b1b] mb-2">
            Your 8-Week Protocol is Ready
          </h2>
          <p className="text-[14px] text-zinc-500 font-medium">
            We analyzed your pelvic floor profile across 4 dimensions: strength, endurance, control, and recovery speed. Here&apos;s what we found.
          </p>
        </section>

        {/* Comparison Section */}
        <section className="mb-12 px-5">
          <div className="flex items-start justify-between gap-2 relative">
            {/* NOW CARD */}
            <div className="flex-1 bg-[#f6f3f2] rounded-xl p-4 flex flex-col items-center">
              <span className="text-[12px] font-bold text-zinc-500 tracking-wider uppercase mb-4 self-start">Now</span>
              <div className="flex flex-col items-center mb-6">
                <svg viewBox="0 0 120 70" className="w-[100px] h-[60px]">
                  <path d="M 10 65 A 50 50 0 0 1 110 65" fill="none" stroke="#E4E4E7" strokeWidth="8" strokeLinecap="round"/>
                  <path d="M 10 65 A 50 50 0 0 1 45 35" fill="none" stroke="#EF4444" strokeWidth="8" strokeLinecap="round"/>
                  <circle cx="38" cy="38" r="4" fill="#1A1A1A"/>
                </svg>
                <span className="text-lg font-black text-[#1c1b1b] -mt-1">33%</span>
              </div>
              <div className="w-full space-y-3">
                <div className="flex items-center justify-between text-[11px] font-bold">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-[#EF4444]"></span>
                    <span className="text-zinc-600">Pelvic Floor Strength</span>
                  </div>
                  <span className="text-[#EF4444]">Underdeveloped</span>
                </div>
                <div className="flex items-center justify-between text-[11px] font-bold">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-[#EF4444]"></span>
                    <span className="text-zinc-600">Estimated Endurance</span>
                  </div>
                  <span className="text-[#EF4444]">2-4 minutes</span>
                </div>
                <div className="flex items-center justify-between text-[11px] font-bold">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-[#FF6B2C]"></span>
                    <span className="text-zinc-600">Control Level</span>
                  </div>
                  <span className="text-[#FF6B2C]">Reactive, not trained</span>
                </div>
                <div className="flex items-center justify-between text-[11px] font-bold">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-[#FF6B2C]"></span>
                    <span className="text-zinc-600">Daily Impact Score</span>
                  </div>
                  <span className="text-[#FF6B2C]">6.2/10</span>
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
              <div className="flex flex-col items-center mb-6">
                <svg viewBox="0 0 120 70" className="w-[100px] h-[60px]">
                  <path d="M 10 65 A 50 50 0 0 1 110 65" fill="none" stroke="#E4E4E7" strokeWidth="8" strokeLinecap="round"/>
                  <path d="M 10 65 A 50 50 0 0 1 95 22" fill="none" stroke="#22C55E" strokeWidth="8" strokeLinecap="round"/>
                  <circle cx="90" cy="25" r="4" fill="#1A1A1A"/>
                </svg>
                <span className="text-lg font-black text-[#1c1b1b] -mt-1">76%</span>
              </div>
              <div className="w-full space-y-3">
                <div className="flex items-center justify-between text-[11px] font-bold">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-[#22C55E]"></span>
                    <span className="text-zinc-600">Pelvic Floor Strength</span>
                  </div>
                  <span className="text-[#22C55E]">Functional</span>
                </div>
                <div className="flex items-center justify-between text-[11px] font-bold">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-[#22C55E]"></span>
                    <span className="text-zinc-600">Estimated Endurance</span>
                  </div>
                  <span className="text-[#22C55E]">8-15 minutes</span>
                </div>
                <div className="flex items-center justify-between text-[11px] font-bold">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-[#22C55E]"></span>
                    <span className="text-zinc-600">Control Level</span>
                  </div>
                  <span className="text-[#22C55E]">Trained, voluntary control</span>
                </div>
                <div className="flex items-center justify-between text-[11px] font-bold">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-[#22C55E]"></span>
                    <span className="text-zinc-600">Daily Impact Score</span>
                  </div>
                  <span className="text-[#22C55E]">2.1/10</span>
                </div>
              </div>
            </div>
          </div>
          <p className="text-[13px] text-[#6B7280] mt-4 leading-relaxed">
            Your protocol targets pelvic floor deconditioning with progressive resistance training. Based on your profile, you are in the top 40% of men likely to see measurable improvement within the first 3 weeks.
          </p>
          <p className="mt-4 text-[11px] text-zinc-400 italic text-center leading-relaxed px-4">
            Calculated from your 12 answers and clinical benchmarks for your age group
          </p>
        </section>

        {/* SECTION: Benefit Chips */}
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

        {/* SECTION: What You're Training */}
        <section className="px-5 py-8">
          <div className="flex flex-col items-center">
            <div className="flex justify-center mb-6">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/1116_Muscles_of_the_Pelvic_Floor.png/800px-1116_Muscles_of_the_Pelvic_Floor.png"
                alt="Male pelvic floor anatomy showing muscles that control bladder function and sexual stamina"
                className="w-full max-w-[280px] mx-auto rounded-xl"
              />
            </div>
            <h3 className="text-[18px] font-bold text-[#1A1A1A] mb-2 text-center">What you&apos;re training</h3>
            <p className="text-[14px] text-[#71717A] text-center leading-relaxed max-w-[320px]">
              The pelvic floor is a group of muscles that supports bladder control, sexual function, and core stability. Our protocol strengthens these through progressive daily training.
            </p>
          </div>
        </section>

        {/* SECTION: 3-step visual timeline */}
        <section className="px-8 py-10">
          <div className="relative flex flex-col gap-10">
            <div className="absolute left-[13.5px] top-4 bottom-4 w-[1px] bg-[#ff6b2c]"></div>
            <div className="relative flex items-start gap-6">
              <div className="z-10 w-7 h-7 flex-shrink-0 flex items-center justify-center bg-[#ff6b2c] text-white text-[14px] font-bold rounded-full">1</div>
              <div className="flex flex-col gap-0.5">
                <h3 className="text-[16px] font-bold text-[#1c1b1b]">Week 1-2: Learn &amp; Activate</h3>
                <p className="text-[14px] text-[#9CA3AF]">Master correct pelvic floor engagement. Most men have never properly isolated this muscle — you&apos;ll feel the difference immediately.</p>
              </div>
            </div>
            <div className="relative flex items-start gap-6">
              <div className="z-10 w-7 h-7 flex-shrink-0 flex items-center justify-center bg-[#ff6b2c] text-white text-[14px] font-bold rounded-full">2</div>
              <div className="flex flex-col gap-0.5">
                <h3 className="text-[16px] font-bold text-[#1c1b1b]">Week 3-5: Build Strength</h3>
                <p className="text-[14px] text-[#9CA3AF]">Progressive daily training increases hold time, contraction force, and voluntary control. This is where real change happens.</p>
              </div>
            </div>
            <div className="relative flex items-start gap-6">
              <div className="z-10 w-7 h-7 flex-shrink-0 flex items-center justify-center bg-[#22C55E] text-white text-[14px] font-bold rounded-full">
                <span className="material-symbols-outlined text-[18px]">check</span>
              </div>
              <div className="flex flex-col gap-0.5">
                <h3 className="text-[16px] font-bold text-[#1c1b1b]">Week 6-8: Lock In Results</h3>
                <p className="text-[14px] text-[#9CA3AF]">Consolidate gains into automatic muscle memory. By week 8, your pelvic floor works for you without thinking about it.</p>
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
                <p className="text-[13px] font-bold leading-none mb-1 text-[#1c1b1b]">Your 8-week protocol</p>
                <p className="text-[11px] text-zinc-500 leading-tight">56 sessions mapped to your starting level</p>
              </div>
            </div>
            {/* Card 2 */}
            <div className="bg-[#f6f3f2] p-4 rounded-xl flex flex-col gap-3 active:scale-95 transition-transform">
              <span className="material-symbols-outlined text-[#ff6b2c] text-2xl">trending_up</span>
              <div>
                <p className="text-[13px] font-bold leading-none mb-1 text-[#1c1b1b]">Progressive overload</p>
                <p className="text-[11px] text-zinc-500 leading-tight">Intensity increases every 5 days automatically</p>
              </div>
            </div>
            {/* Card 3 */}
            <div className="bg-[#f6f3f2] p-4 rounded-xl flex flex-col gap-3 active:scale-95 transition-transform">
              <span className="material-symbols-outlined text-[#ff6b2c] text-2xl">bolt</span>
              <div>
                <p className="text-[13px] font-bold leading-none mb-1 text-[#1c1b1b]">Quick-win exercises first</p>
                <p className="text-[11px] text-zinc-500 leading-tight">Designed so you feel change within week 1</p>
              </div>
            </div>
            {/* Card 4 */}
            <div className="bg-[#f6f3f2] p-4 rounded-xl flex flex-col gap-3 active:scale-95 transition-transform">
              <span className="material-symbols-outlined text-[#ff6b2c] text-2xl">mail</span>
              <div>
                <p className="text-[13px] font-bold leading-none mb-1 text-[#1c1b1b]">Daily email coaching</p>
                <p className="text-[11px] text-zinc-500 leading-tight">Exercise of the day + technique tips + progress check</p>
              </div>
            </div>
            {/* Card 5 */}
            <div className="bg-[#f6f3f2] p-4 rounded-xl flex flex-col gap-3 active:scale-95 transition-transform">
              <span className="material-symbols-outlined text-[#ff6b2c] text-2xl">sync</span>
              <div>
                <p className="text-[13px] font-bold leading-none mb-1 text-[#1c1b1b]">Adaptive difficulty</p>
                <p className="text-[11px] text-zinc-500 leading-tight">Adjusts based on your reported improvements</p>
              </div>
            </div>
            {/* Card 6 */}
            <div className="bg-[#f6f3f2] p-4 rounded-xl flex flex-col gap-3 active:scale-95 transition-transform">
              <span className="material-symbols-outlined text-[#ff6b2c] text-2xl">lock</span>
              <div>
                <p className="text-[13px] font-bold leading-none mb-1 text-[#1c1b1b]">100% private</p>
                <p className="text-[11px] text-zinc-500 leading-tight">Train discreetly, anywhere — no app download needed</p>
              </div>
            </div>
          </div>
        </section>

        {/* Dynamic Content Callout */}
        <section className="bg-[#1c1b1b] text-[#fcf9f8] rounded-2xl p-6 mb-8 relative overflow-hidden mx-5">
          <div className="relative z-10">
            <h4 className="text-2xl font-black tracking-tighter mb-2">Trusted by 3,847 men since launch</h4>
            <p className="text-sm opacity-80 leading-relaxed mb-6">Average reported improvement after 8 weeks: 2.4x longer endurance, 73% better control, and a confidence increase from 4.1 to 7.3 out of 10.</p>
            <button className="w-full bg-[#ff6b2c] text-white py-4 rounded-xl font-bold uppercase tracking-widest text-sm active:scale-95 transition-transform">
              Get My Plan Now
            </button>
          </div>
          {/* Decorative kinetic element */}
          <div className="absolute -right-8 -bottom-8 w-32 h-32 bg-[#a83900]/20 blur-3xl rounded-full"></div>
        </section>

        {/* SECTION: Doctor Endorsement */}
        <section className="px-5 py-8 bg-[#F9FAFB]">
          <div className="flex flex-col items-center text-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=80&h=80&fit=crop&crop=face" alt="Board-certified urologist" className="rounded-full w-[80px] h-[80px] object-cover mx-auto mb-4" />
            <blockquote className="text-[15px] text-[#1A1A1A] leading-relaxed mb-3 px-4 italic">
              &ldquo;I prescribe pelvic floor exercises to patients daily — it&apos;s first-line treatment for both urinary and sexual function. The challenge is compliance. A structured program with daily guidance solves the biggest problem: most men quit after 3 days because they don&apos;t know if they&apos;re doing it right.&rdquo;
            </blockquote>
            <p className="text-[13px] text-[#71717A] font-semibold mb-4">— Board-Certified Urologist</p>
            <div className="inline-flex items-center gap-1.5 bg-white px-4 py-2 rounded-full border border-[#E4E4E7]">
              <span className="material-symbols-outlined text-[14px] text-[#22C55E]" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
              <span className="text-[12px] text-[#71717A] font-medium">Developed in consultation with men&apos;s health specialists</span>
            </div>
          </div>
        </section>

        {/* SECTION: Progress Chart */}
        <section className="px-5 py-8">
          <div className="mb-8">
            <h3 className="text-[16px] font-bold text-[#1A1A1A] mb-2">Your projected improvement</h3>
            <p className="text-[12px] text-[#71717A] mb-4">Based on men with your profile who followed the protocol</p>
            <svg viewBox="0 0 320 120" className="w-full h-[100px]">
              <defs>
                <linearGradient id="chartGrad" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#D1D5DB"/>
                  <stop offset="100%" stopColor="#FF6B2C"/>
                </linearGradient>
                <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#FF6B2C" stopOpacity="0.15"/>
                  <stop offset="100%" stopColor="#FF6B2C" stopOpacity="0"/>
                </linearGradient>
              </defs>
              {/* Grid lines */}
              <line x1="40" y1="10" x2="40" y2="100" stroke="#F3F4F6" strokeWidth="1"/>
              <line x1="40" y1="100" x2="310" y2="100" stroke="#E4E4E7" strokeWidth="1"/>
              {/* Week labels */}
              <text x="57" y="115" fontSize="9" fill="#9CA3AF">W1</text>
              <text x="95" y="115" fontSize="9" fill="#9CA3AF">W2</text>
              <text x="133" y="115" fontSize="9" fill="#9CA3AF">W3</text>
              <text x="171" y="115" fontSize="9" fill="#9CA3AF">W4</text>
              <text x="209" y="115" fontSize="9" fill="#9CA3AF">W5</text>
              <text x="247" y="115" fontSize="9" fill="#9CA3AF">W6</text>
              <text x="285" y="115" fontSize="9" fill="#9CA3AF">W8</text>
              {/* Area fill */}
              <path d="M 50 90 L 88 75 L 126 68 L 164 55 L 202 42 L 240 30 L 278 20 L 300 15 L 300 100 L 50 100 Z" fill="url(#areaGrad)"/>
              {/* Progress line */}
              <path d="M 50 90 L 88 75 L 126 68 L 164 55 L 202 42 L 240 30 L 278 20 L 300 15" stroke="url(#chartGrad)" strokeWidth="3" fill="none" strokeLinecap="round"/>
              {/* Dots */}
              <circle cx="50" cy="90" r="3" fill="#D1D5DB"/>
              <circle cx="300" cy="15" r="4" fill="#FF6B2C"/>
              {/* Y axis label */}
              <text x="5" y="15" fontSize="8" fill="#9CA3AF">Strong</text>
              <text x="5" y="95" fontSize="8" fill="#9CA3AF">Weak</text>
              {/* Annotation lines */}
              <line x1="88" y1="15" x2="88" y2="100" stroke="#FF6B2C" strokeWidth="1" strokeDasharray="3,3" opacity="0.4"/>
              <line x1="164" y1="15" x2="164" y2="100" stroke="#FF6B2C" strokeWidth="1" strokeDasharray="3,3" opacity="0.4"/>
              <line x1="300" y1="15" x2="300" y2="100" stroke="#22C55E" strokeWidth="1" strokeDasharray="3,3" opacity="0.4"/>
              {/* Annotation labels */}
              <text x="50" y="8" fontSize="7" fill="#9CA3AF">Starting point</text>
              <text x="70" y="8" fontSize="7" fill="#FF6B2C">First changes</text>
              <text x="140" y="8" fontSize="7" fill="#FF6B2C">Measurable improvement</text>
              <text x="275" y="8" fontSize="7" fill="#22C55E">Complete</text>
            </svg>
          </div>
        </section>

        {/* ===== BOTTOM SECTION: PRICING ===== */}
        <div ref={(el) => { (pricingSectionRef as React.MutableRefObject<HTMLDivElement | null>).current = el; (pricingRef as React.MutableRefObject<HTMLDivElement | null>).current = el; }}>
          {!discountActive ? (
            <>
              {/* Pre-discount pricing - stacked vertical cards */}
              <section className="text-center px-4 pt-6">
                <h1 className="text-[20px] font-bold text-[#1c1b1b]">Choose your plan</h1>
              </section>

              <div className="flex flex-col gap-3 px-4 mt-6">
                {/* Card 1: 2 Week Starter */}
                <div onClick={() => setSelectedPlan("2week")} className={`option-tap cursor-pointer flex flex-col p-5 bg-white border-2 rounded-xl shadow-sm active:scale-[0.98] transition-all ${selectedPlan === "2week" ? "option-selected border-[#FF6B2C]" : "border-[#E4E4E7]"}`}>
                  <div className="flex justify-between items-start">
                    <div className="flex flex-col">
                      <span className="text-[14px] font-bold tracking-tight text-[#1c1b1b]">2-WEEK STARTER</span>
                    </div>
                    <div className="flex flex-col items-end">
                      <span className="text-[20px] font-bold text-[#1c1b1b]">$14.99</span>
                    </div>
                  </div>
                  <div className="flex justify-end mt-1">
                    <span className="text-[12px] text-[#71717A]">$1.07/day</span>
                  </div>
                </div>

                {/* Card 2: 8 Weeks HIGHLIGHTED */}
                <div onClick={() => setSelectedPlan("8week")} className={`option-tap cursor-pointer relative flex flex-col p-5 border-2 rounded-xl active:scale-[0.98] transition-all ${selectedPlan === "8week" ? "option-selected border-[#FF6B2C] bg-[#FFF4EE]" : "bg-white border-[#E4E4E7]"}`}>
                  <div className="absolute -top-3 right-4 bg-[#FF6B2C] text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                    MOST POPULAR
                  </div>
                  <div className="flex justify-between items-start pt-1">
                    <div className="flex flex-col">
                      <span className="text-[14px] font-bold tracking-tight text-[#1c1b1b]">8-WEEK PROGRAM</span>
                    </div>
                    <div className="flex flex-col items-end">
                      <span className="text-[28px] font-bold text-[#1c1b1b] leading-none">$49.99</span>
                    </div>
                  </div>
                  <div className="flex justify-end mt-2">
                    <span className="text-[12px] text-[#71717A]">$0.89/day</span>
                  </div>
                </div>

                {/* Card 3: 12 Weeks */}
                <div onClick={() => setSelectedPlan("12week")} className={`option-tap cursor-pointer flex flex-col p-5 bg-white border-2 rounded-xl shadow-sm active:scale-[0.98] transition-all ${selectedPlan === "12week" ? "option-selected border-[#FF6B2C]" : "border-[#E4E4E7]"}`}>
                  <div className="flex justify-between items-start">
                    <div className="flex flex-col">
                      <div className="flex items-center gap-2">
                        <span className="text-[14px] font-bold tracking-tight text-[#1c1b1b]">12-WEEK COMPLETE</span>
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
                &quot;Men who train for 8+ weeks report lasting improvements vs shorter programs&quot;
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
                  <p className="text-[12px] text-[#71717A] mt-2 text-center">📧 We&apos;ll email you 3 days before renewal — no surprises</p>
                </div>
              </div>

              <p className="text-[10px] text-[#9CA3AF] text-center leading-relaxed px-10 mt-6">
                Renews at $19.99/mo after intro period. Cancel anytime with one click.
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
                {/* Card 1: 2 Week Starter */}
                <div onClick={() => setSelectedPlan("d2week")} className={`option-tap cursor-pointer flex flex-col p-5 bg-white border-2 rounded-xl shadow-sm active:scale-[0.98] transition-all ${selectedPlan === "d2week" ? "option-selected border-[#FF6B2C]" : "border-[#E4E4E7]"}`}>
                  <div className="flex justify-between items-start">
                    <div className="flex flex-col">
                      <span className="text-[14px] font-bold tracking-tight text-[#1c1b1b]">2-WEEK STARTER</span>
                    </div>
                    <div className="flex flex-col items-end">
                      <div className="flex items-center gap-2">
                        <span className="text-[14px] line-through text-[#9CA3AF]">$14.99</span>
                        <span className="text-[20px] font-bold text-[#1c1b1b]">$6.99</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-end mt-1">
                    <span className="text-[12px] text-[#71717A]">$0.50/day</span>
                  </div>
                </div>

                {/* Card 2: 8 Weeks HIGHLIGHTED */}
                <div onClick={() => setSelectedPlan("d8week")} className={`option-tap cursor-pointer relative flex flex-col p-5 border-2 rounded-xl active:scale-[0.98] transition-all ${selectedPlan === "d8week" ? "option-selected border-[#FF6B2C]" : "bg-[#FFF4EE] border-[#FF6B2C]"}`}>
                  <div className="absolute -top-3 right-4 bg-[#FF6B2C] text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                    RECOMMENDED
                  </div>
                  <div className="flex justify-between items-start pt-1">
                    <div className="flex flex-col gap-2">
                      <span className="text-[14px] font-bold tracking-tight text-[#1c1b1b]">8-WEEK PROGRAM</span>
                      <div className="w-fit bg-[#FF6B2C] text-white text-[10px] font-bold px-2 py-0.5 rounded">LAUNCH PRICE</div>
                    </div>
                    <div className="flex flex-col items-end">
                      <div className="flex items-center gap-2">
                        <span className="text-[16px] line-through text-[#9CA3AF]">$49.99</span>
                        <span className="text-[28px] font-bold text-[#1c1b1b] leading-none">$12.99</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-end mt-2">
                    <span className="text-[12px] text-[#71717A]">$0.23/day</span>
                  </div>
                </div>

                {/* Card 3: 12 Weeks */}
                <div onClick={() => setSelectedPlan("d12week")} className={`option-tap cursor-pointer flex flex-col p-5 bg-white border-2 rounded-xl shadow-sm active:scale-[0.98] transition-all ${selectedPlan === "d12week" ? "option-selected border-[#FF6B2C]" : "border-[#E4E4E7]"}`}>
                  <div className="flex justify-between items-start">
                    <div className="flex flex-col gap-2">
                      <div className="flex items-center gap-2">
                        <span className="text-[14px] font-bold tracking-tight text-[#1c1b1b]">12-WEEK COMPLETE</span>
                        <div className="bg-[#22C55E]/10 text-[#22C55E] text-[10px] font-bold px-2 py-0.5 rounded border border-[#22C55E]/20">BEST VALUE</div>
                      </div>
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
                &quot;Men who train for 8+ weeks report lasting improvements vs shorter programs&quot;
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
                  <p className="text-[12px] text-[#71717A] mt-2 text-center">📧 We&apos;ll email you 3 days before renewal — no surprises</p>
                </div>
              </div>

              {/* Footnote / Fine Print */}
              <p className="text-[10px] text-[#9CA3AF] text-center leading-relaxed px-10 mt-6">
                Renews at $19.99/mo after intro period. Cancel anytime with one click.
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
                <span className="text-[14px] font-bold text-[#1c1b1b]">2-WEEK</span>
                <div className="flex items-center gap-2">
                  <span className="text-[13px] line-through text-[#9CA3AF]">$14.99</span>
                  <span className="text-[18px] font-bold text-[#1c1b1b]">$6.99</span>
                </div>
              </div>
              <div className="flex justify-between items-center p-4 border-2 border-[#FF6B2C] rounded-xl bg-[#FFF4EE] relative">
                <div className="absolute -top-2.5 right-3 bg-[#FF6B2C] text-white text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">RECOMMENDED</div>
                <span className="text-[14px] font-bold text-[#1c1b1b]">8-WEEK</span>
                <div className="flex items-center gap-2">
                  <span className="text-[13px] line-through text-[#9CA3AF]">$49.99</span>
                  <span className="text-[18px] font-bold text-[#1c1b1b]">$12.99</span>
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
            <p className="text-[11px] text-[#9CA3AF] text-center mb-2">Discreet billing — shows as &apos;PKC Digital&apos; on your statement</p>
            <p className="text-[12px] text-[#71717A] text-center mb-5">📧 We&apos;ll email you 3 days before renewal — no surprises</p>

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
