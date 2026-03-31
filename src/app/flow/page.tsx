"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function FlowPage() {
  const [step, setStep] = useState(0);
  const [email, setEmail] = useState("");
  const [selected, setSelected] = useState<string | null>(null);
  const [sliderValue, setSliderValue] = useState(50);
  const router = useRouter();
  const totalSteps = 15;

  // Reset selection when step changes
  useEffect(() => { setSelected(null); }, [step]);

  function next() {
    if (step < totalSteps - 1) {
      setStep(step + 1);
    }
  }

  function handleEmailSubmit() {
    if (email) {
      router.push("/loading-screen");
    }
  }

  const progressWidth = `${((step + 1) / 18) * 100}%`;

  return (
    <>
      {/* ===== STEP 0: GOAL (stitch/01_goal.html) ===== */}
      {step === 0 && (
        <div className="bg-white text-on-surface min-h-dvh max-h-dvh overflow-hidden flex flex-col items-center">
          <header className="fixed top-0 left-0 w-full z-50 flex items-center justify-between px-4 h-14 bg-white border-b-4 border-zinc-100">
            <div className="w-8"></div>
            <h1 className="font-black tracking-tight text-xl text-zinc-900 uppercase">PeakCore</h1>
            <div className="w-8"></div>
          </header>
          <main className="w-full max-w-[390px] mx-auto h-full flex flex-col px-5 pt-14 pb-[120px]">
            <div className="w-full h-1 bg-[#E4E4E7] mt-4 relative rounded-full overflow-hidden">
              <div className="absolute top-0 left-0 h-full bg-[#FF6B2C] rounded-full" style={{ width: progressWidth }}></div>
            </div>
            <p className="text-[12px] text-[#71717A] text-center mt-2 leading-none">Step 1 of 18</p>
            <div className="flex-1 flex flex-col justify-center items-center w-full">
              <h2 className="text-[20px] font-bold text-[#1A1A1A] text-center mb-6 leading-tight">What&apos;s your main goal?</h2>
              <div className="flex flex-col gap-3 w-full">
                <button onClick={() => setSelected("longer")} className={`option-tap w-full max-w-full h-[60px] bg-white border rounded-[12px] flex items-center justify-between px-5 transition-all ${selected === "longer" ? "option-selected border-[#FF6B2C]" : "border-[#E4E4E7] hover:bg-orange-50/30"}`}>
                  <div className="flex items-center gap-4">
                    <span className={`text-[20px] ${selected === "longer" ? "icon-selected" : "icon-bounce"}`}>⏱️</span>
                    <span className="text-[15px] font-medium text-[#1A1A1A]">Last longer in bed</span>
                  </div>
                  <span className="text-[#AAAAAA] text-xl">&rsaquo;</span>
                </button>
                <button onClick={() => setSelected("control")} className={`option-tap w-full max-w-full h-[60px] bg-white border rounded-[12px] flex items-center justify-between px-5 transition-all ${selected === "control" ? "option-selected border-[#FF6B2C]" : "border-[#E4E4E7] hover:bg-orange-50/30"}`}>
                  <div className="flex items-center gap-4">
                    <span className={`text-[20px] ${selected === "control" ? "icon-selected" : "icon-bounce"}`}>🎯</span>
                    <span className="text-[15px] font-medium text-[#1A1A1A]">Better control</span>
                  </div>
                  <span className="text-[#AAAAAA] text-xl">&rsaquo;</span>
                </button>
                <button onClick={() => setSelected("stronger")} className={`option-tap w-full max-w-full h-[60px] bg-white border rounded-[12px] flex items-center justify-between px-5 transition-all ${selected === "stronger" ? "option-selected border-[#FF6B2C]" : "border-[#E4E4E7] hover:bg-orange-50/30"}`}>
                  <div className="flex items-center gap-4">
                    <span className={`text-[20px] ${selected === "stronger" ? "icon-selected" : "icon-bounce"}`}>⚡</span>
                    <span className="text-[15px] font-medium text-[#1A1A1A]">Stronger finish</span>
                  </div>
                  <span className="text-[#AAAAAA] text-xl">&rsaquo;</span>
                </button>
                <button onClick={() => setSelected("health")} className={`option-tap w-full max-w-full h-[60px] bg-white border rounded-[12px] flex items-center justify-between px-5 transition-all ${selected === "health" ? "option-selected border-[#FF6B2C]" : "border-[#E4E4E7] hover:bg-orange-50/30"}`}>
                  <div className="flex items-center gap-4">
                    <span className={`text-[20px] ${selected === "health" ? "icon-selected" : "icon-bounce"}`}>❤️</span>
                    <span className="text-[15px] font-medium text-[#1A1A1A]">Overall health</span>
                  </div>
                  <span className="text-[#AAAAAA] text-xl">&rsaquo;</span>
                </button>
              </div>
            </div>
            <p className="text-[#71717A] italic text-sm text-center mt-8">Small steps lead to peak performance</p>
          </main>
          <div className="fixed bottom-0 left-0 right-0 z-50 px-5 pb-6 pt-3 bg-gradient-to-t from-white via-white/95 to-transparent max-w-[390px] mx-auto">
            <button disabled={!selected} onClick={() => { next(); }} className={`w-full max-w-full h-[56px] rounded-[12px] font-bold text-base transition-all ${selected ? "bg-[#FF6B2C] text-white shadow-[0_0_20px_rgba(255,107,44,0.4)] animate-cta-glow active:scale-[0.97]" : "bg-[#E4E4E7] text-[#71717A] cursor-not-allowed"}`}>Continue</button>
          </div>
        </div>
      )}

      {/* ===== STEP 1: AGE (stitch/02_age.html) ===== */}
      {step === 1 && (
        <div className="bg-white text-[#2d2e36] antialiased min-h-dvh max-h-dvh overflow-hidden flex flex-col items-center">
          <div className="fixed top-0 left-0 w-full h-1 bg-[#dcdce9] z-[60]">
            <div className="h-full bg-[#ff7943]" style={{ width: progressWidth }}></div>
          </div>
          <header className="fixed top-0 left-0 w-full z-50 flex items-center justify-between px-4 h-14 bg-white border-b-4 border-zinc-100">
            <button onClick={() => setStep(Math.max(0, step - 1))} className="flex items-center justify-center w-8 h-8 transition-all duration-200 active:scale-95 hover:bg-zinc-50 rounded-full text-zinc-500">
              <span className="material-symbols-outlined">arrow_back</span>
            </button>
            <span className="text-xl font-black tracking-tighter text-zinc-900">PeakCore</span>
            <div className="w-8"></div>
          </header>
          <main className="w-full max-w-[390px] mx-auto px-5 pt-[60px] pb-[120px] flex-grow flex flex-col justify-center">
            <div className="mb-2 text-center">
              <span className="text-sm font-medium text-[#76767f] uppercase tracking-wider">Step 2 of 18</span>
            </div>
            <h1 className="text-[20px] font-extrabold text-[#2d2e36] text-center mb-6 leading-tight">Your age?</h1>
            <div className="grid grid-cols-2 gap-4 mb-8">
              <button onClick={() => setSelected("18-25")} className={`option-tap group flex flex-col items-center justify-center aspect-square bg-white border-2 rounded-xl transition-all duration-200 active:scale-[0.98] ${selected === "18-25" ? "option-selected border-[#FF6B2C]" : "border-[#adacb6] hover:border-[#a33700]"}`}>
                <span className={`text-xl font-bold transition-colors ${selected === "18-25" ? "text-[#FF6B2C]" : "text-[#2d2e36] group-hover:text-[#a33700]"}`}>18-25</span>
              </button>
              <button onClick={() => setSelected("26-35")} className={`option-tap group flex flex-col items-center justify-center aspect-square bg-white border-2 rounded-xl transition-all duration-200 active:scale-[0.98] ${selected === "26-35" ? "option-selected border-[#FF6B2C]" : "border-[#adacb6] hover:border-[#a33700]"}`}>
                <span className={`text-xl font-bold transition-colors ${selected === "26-35" ? "text-[#FF6B2C]" : "text-[#2d2e36] group-hover:text-[#a33700]"}`}>26-35</span>
              </button>
              <button onClick={() => setSelected("36-50")} className={`option-tap group flex flex-col items-center justify-center aspect-square bg-white border-2 rounded-xl transition-all duration-200 active:scale-[0.98] ${selected === "36-50" ? "option-selected border-[#FF6B2C]" : "border-[#adacb6] hover:border-[#a33700]"}`}>
                <span className={`text-xl font-bold transition-colors ${selected === "36-50" ? "text-[#FF6B2C]" : "text-[#2d2e36] group-hover:text-[#a33700]"}`}>36-50</span>
              </button>
              <button onClick={() => setSelected("50+")} className={`option-tap group flex flex-col items-center justify-center aspect-square bg-white border-2 rounded-xl transition-all duration-200 active:scale-[0.98] ${selected === "50+" ? "option-selected border-[#FF6B2C]" : "border-[#adacb6] hover:border-[#a33700]"}`}>
                <span className={`text-xl font-bold transition-colors ${selected === "50+" ? "text-[#FF6B2C]" : "text-[#2d2e36] group-hover:text-[#a33700]"}`}>50+</span>
              </button>
            </div>
            <div className="flex items-center justify-center gap-3 p-4 bg-[#f1effb] rounded-xl">
              <span className="material-symbols-outlined text-[#a33700]" style={{ fontVariationSettings: "'FILL' 1" }}>bolt</span>
              <p className="text-sm text-[#5a5b63] leading-relaxed">
                Personalizing your training based on your age helps us optimize your pelvic floor recovery speed.
              </p>
            </div>
          </main>
          <div className="fixed bottom-0 left-0 right-0 z-50 px-5 pb-6 pt-3 bg-gradient-to-t from-white via-white/95 to-transparent max-w-[390px] mx-auto">
            <button disabled={!selected} onClick={() => { next(); }} className={`w-full max-w-full h-[56px] rounded-[12px] font-bold text-base transition-all ${selected ? "bg-[#FF6B2C] text-white shadow-[0_0_20px_rgba(255,107,44,0.4)] animate-cta-glow active:scale-[0.97]" : "bg-[#E4E4E7] text-[#71717A] cursor-not-allowed"}`}>Continue</button>
          </div>
        </div>
      )}

      {/* ===== STEP 2: ACTIVITY (stitch/03_activity.html) ===== */}
      {step === 2 && (
        <div className="bg-white text-[#1A1A1A] min-h-dvh max-h-dvh overflow-hidden flex flex-col items-center">
          <div className="fixed top-0 left-0 w-full h-1 bg-[#E4E4E7] z-[60]">
            <div className="h-full bg-[#FF6B2C]" style={{ width: progressWidth }}></div>
          </div>
          <header className="fixed top-0 left-0 w-full z-50 flex items-center justify-between px-4 h-14 bg-white border-b border-zinc-200">
            <button onClick={() => setStep(Math.max(0, step - 1))} className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-zinc-100 transition-colors active:opacity-80 active:scale-95">
              <span className="material-symbols-outlined text-zinc-500">arrow_back</span>
            </button>
            <h1 className="text-xl font-black tracking-tight text-[#1A1A1A]">PEAKCORE</h1>
            <div className="w-10"></div>
          </header>
          <main className="w-full max-w-[390px] mx-auto px-5 pt-[60px] pb-[120px] flex flex-col flex-grow">
            <div className="text-center mb-2">
              <span className="text-[10px] font-bold tracking-widest text-[#71717A] uppercase">STEP 3 OF 18</span>
            </div>
            <h2 className="text-[20px] font-extrabold text-[#1A1A1A] text-center leading-tight mb-6">
              How active are you?
            </h2>
            <div className="flex flex-col gap-4">
              <button onClick={() => setSelected("very")} className={`option-tap group relative w-full flex flex-col items-center justify-center py-8 px-6 border-2 rounded-xl transition-all duration-200 active:scale-[0.98] ${selected === "very" ? "option-selected border-[#FF6B2C]" : "bg-[#F7F7F8] border-[#E4E4E7] hover:border-[#FF6B2C] hover:bg-[#FFF4EE]"}`}>
                <span className={`text-4xl mb-3 ${selected === "very" ? "icon-selected" : "icon-bounce"}`}>🏃</span>
                <span className="text-lg font-bold text-[#1A1A1A]">Very active</span>
              </button>
              <button onClick={() => setSelected("somewhat")} className={`option-tap group relative w-full flex flex-col items-center justify-center py-8 px-6 border-2 rounded-xl transition-all duration-200 active:scale-[0.98] ${selected === "somewhat" ? "option-selected border-[#FF6B2C]" : "bg-[#F7F7F8] border-[#E4E4E7] hover:border-[#FF6B2C] hover:bg-[#FFF4EE]"}`}>
                <span className={`text-4xl mb-3 ${selected === "somewhat" ? "icon-selected" : "icon-bounce"}`}>🚶</span>
                <span className="text-lg font-bold text-[#1A1A1A]">Somewhat active</span>
              </button>
              <button onClick={() => setSelected("not")} className={`option-tap group relative w-full flex flex-col items-center justify-center py-8 px-6 border-2 rounded-xl transition-all duration-200 active:scale-[0.98] ${selected === "not" ? "option-selected border-[#FF6B2C]" : "bg-[#F7F7F8] border-[#E4E4E7] hover:border-[#FF6B2C] hover:bg-[#FFF4EE]"}`}>
                <span className={`text-4xl mb-3 ${selected === "not" ? "icon-selected" : "icon-bounce"}`}>🛋️</span>
                <span className="text-lg font-bold text-[#1A1A1A]">Not very active</span>
              </button>
            </div>
            <div className="mt-10 text-center">
              <p className="text-[#71717A] italic text-sm font-medium tracking-tight">
                Every fitness level can see results ✨
              </p>
            </div>
          </main>
          <div className="fixed bottom-0 left-0 right-0 z-50 px-5 pb-6 pt-3 bg-gradient-to-t from-white via-white/95 to-transparent max-w-[390px] mx-auto">
            <button disabled={!selected} onClick={() => { next(); }} className={`w-full max-w-full h-[56px] rounded-[12px] font-bold text-base transition-all ${selected ? "bg-[#FF6B2C] text-white shadow-[0_0_20px_rgba(255,107,44,0.4)] animate-cta-glow active:scale-[0.97]" : "bg-[#E4E4E7] text-[#71717A] cursor-not-allowed"}`}>Continue</button>
          </div>
        </div>
      )}

      {/* ===== STEP 3: EXPERIENCE (stitch/04_experience.html) ===== */}
      {step === 3 && (
        <div className="flex flex-col min-h-dvh max-h-dvh overflow-hidden max-w-[390px] mx-auto bg-white text-[#1A1A1A]">
          <header className="fixed top-0 left-0 w-full z-50 flex items-center justify-between px-4 h-16 max-w-[390px] mx-auto bg-white border-b-4 border-[#E4E4E7]">
            <button onClick={() => setStep(Math.max(0, step - 1))} className="flex items-center justify-center w-10 h-10 hover:opacity-80 transition-opacity active:scale-95 duration-100">
              <span className="material-symbols-outlined text-[#71717A]">arrow_back</span>
            </button>
            <h1 className="text-xl font-black text-[#1A1A1A] tracking-tighter uppercase">PEAKCORE</h1>
            <div className="w-10"></div>
          </header>
          <main className="flex-1 flex flex-col mt-16 px-5 pb-[120px]">
            <div className="fixed top-16 left-0 w-full max-w-[390px] mx-auto z-40 bg-white">
              <div className="w-full h-[4px] bg-[#E4E4E7]">
                <div className="h-full bg-[#FF6B2C] transition-all duration-500 ease-out" style={{ width: progressWidth }}></div>
              </div>
            </div>
            <div className="flex-1 flex flex-col pt-12">
              <p className="text-[14px] font-semibold text-[#71717A] tracking-tight mb-2">Step 4 of 18</p>
              <h2 className="text-[20px] font-extrabold leading-tight tracking-tight mb-6 text-[#1A1A1A]">
                Tried pelvic exercises before?
              </h2>
              <div className="flex flex-col gap-4">
                <button onClick={() => setSelected("regularly")} className={`option-tap w-full h-14 min-h-[56px] px-4 flex items-center justify-between bg-white border rounded-lg transition-all active:scale-[0.98] duration-100 ${selected === "regularly" ? "option-selected border-[#FF6B2C]" : "border-[#E4E4E7] hover:border-[#FF6B2C] hover:bg-[#FFF4EE]"}`}>
                  <div className="flex items-center gap-4">
                    <span className={`text-xl ${selected === "regularly" ? "icon-selected" : "icon-bounce"}`}>✅</span>
                    <span className="text-[16px] font-semibold text-[#1A1A1A]">Regularly</span>
                  </div>
                  <span className={`material-symbols-outlined ${selected === "regularly" ? "text-[#FF6B2C]" : "text-[#E4E4E7]"}`}>chevron_right</span>
                </button>
                <button onClick={() => setSelected("tried")} className={`option-tap w-full h-14 min-h-[56px] px-4 flex items-center justify-between bg-white border rounded-lg transition-all active:scale-[0.98] duration-100 ${selected === "tried" ? "option-selected border-[#FF6B2C]" : "border-[#E4E4E7] hover:border-[#FF6B2C] hover:bg-[#FFF4EE]"}`}>
                  <div className="flex items-center gap-4">
                    <span className={`text-xl ${selected === "tried" ? "icon-selected" : "icon-bounce"}`}>🔄</span>
                    <span className="text-[16px] font-semibold text-[#1A1A1A]">Tried a few times</span>
                  </div>
                  <span className={`material-symbols-outlined ${selected === "tried" ? "text-[#FF6B2C]" : "text-[#E4E4E7]"}`}>chevron_right</span>
                </button>
                <button onClick={() => setSelected("never")} className={`option-tap w-full h-14 min-h-[56px] px-4 flex items-center justify-between bg-white border rounded-lg transition-all active:scale-[0.98] duration-100 ${selected === "never" ? "option-selected border-[#FF6B2C]" : "border-[#E4E4E7] hover:border-[#FF6B2C] hover:bg-[#FFF4EE]"}`}>
                  <div className="flex items-center gap-4">
                    <span className={`text-xl ${selected === "never" ? "icon-selected" : "icon-bounce"}`}>❌</span>
                    <span className="text-[16px] font-semibold text-[#1A1A1A]">Never</span>
                  </div>
                  <span className={`material-symbols-outlined ${selected === "never" ? "text-[#FF6B2C]" : "text-[#E4E4E7]"}`}>chevron_right</span>
                </button>
              </div>
              <p className="text-center text-[#71717A] italic text-sm mt-8 mb-4 px-6">
                This time, you&apos;ll have a proven system 🎯
              </p>
            </div>
          </main>
          <div className="fixed bottom-0 left-0 right-0 z-50 px-5 pb-6 pt-3 bg-gradient-to-t from-white via-white/95 to-transparent max-w-[390px] mx-auto">
            <button disabled={!selected} onClick={() => { next(); }} className={`w-full max-w-full h-[56px] rounded-[12px] font-bold text-base transition-all ${selected ? "bg-[#FF6B2C] text-white shadow-[0_0_20px_rgba(255,107,44,0.4)] animate-cta-glow active:scale-[0.97]" : "bg-[#E4E4E7] text-[#71717A] cursor-not-allowed"}`}>Continue</button>
          </div>
        </div>
      )}

      {/* ===== STEP 4: NOTICE (stitch/05_notice.html) ===== */}
      {step === 4 && (
        <div className="bg-white text-[#2d2e36] min-h-dvh max-h-dvh overflow-hidden flex flex-col items-center">
          <div className="fixed top-0 left-0 w-full h-1 bg-zinc-100 z-50">
            <div className="h-full bg-[#FF6B2C]" style={{ width: progressWidth }}></div>
          </div>
          <header className="bg-white border-b-4 border-zinc-100 fixed top-0 w-full z-40">
            <div className="flex items-center justify-between w-full px-4 h-16 max-w-[390px] mx-auto">
              <button onClick={() => setStep(Math.max(0, step - 1))} className="text-zinc-400 hover:bg-zinc-50 transition-colors active:scale-95 duration-100 p-2 rounded-full">
                <span className="material-symbols-outlined">arrow_back</span>
              </button>
              <h1 className="text-orange-600 font-black tracking-tighter text-xl">PEAKCORE</h1>
              <div className="w-10"></div>
            </div>
          </header>
          <main className="flex-1 w-full max-w-[390px] mx-auto px-5 pt-[60px] pb-[120px] flex flex-col">
            <div className="mt-6 mb-6 text-center">
              <h2 className="text-[20px] font-black text-[#1A1A1A] leading-tight tracking-tight">
                When did you first notice?
              </h2>
            </div>
            <div className="space-y-4 flex-1">
              <button onClick={() => setSelected("recently")} className={`option-tap w-full h-14 px-5 flex items-center justify-between bg-white border rounded-xl transition-all ${selected === "recently" ? "option-selected border-[#FF6B2C]" : "border-[#E4E4E7] hover:border-[#FF6B2C]"}`}>
                <div className="flex items-center gap-4">
                  <span className={`text-xl ${selected === "recently" ? "icon-selected" : "icon-bounce"}`}>🕐</span>
                  <span className="font-bold text-[#1A1A1A] text-[15px]">Recently</span>
                </div>
                <span className={`material-symbols-outlined ${selected === "recently" ? "text-[#FF6B2C]" : "text-zinc-400"}`}>chevron_right</span>
              </button>
              <button onClick={() => setSelected("1-2y")} className={`option-tap w-full h-14 px-5 flex items-center justify-between bg-white border rounded-xl transition-all ${selected === "1-2y" ? "option-selected border-[#FF6B2C]" : "border-[#E4E4E7] hover:border-[#FF6B2C]"}`}>
                <div className="flex items-center gap-4">
                  <span className={`text-xl ${selected === "1-2y" ? "icon-selected" : "icon-bounce"}`}>📅</span>
                  <span className="font-bold text-[#1A1A1A] text-[15px]">1-2 years ago</span>
                </div>
                <span className={`material-symbols-outlined ${selected === "1-2y" ? "text-[#FF6B2C]" : "text-zinc-400"}`}>chevron_right</span>
              </button>
              <button onClick={() => setSelected("3+")} className={`option-tap w-full h-14 px-5 flex items-center justify-between bg-white border rounded-xl transition-all ${selected === "3+" ? "option-selected border-[#FF6B2C]" : "border-[#E4E4E7] hover:border-[#FF6B2C]"}`}>
                <div className="flex items-center gap-4">
                  <span className={`text-xl ${selected === "3+" ? "icon-selected" : "icon-bounce"}`}>📆</span>
                  <span className="font-bold text-[#1A1A1A] text-[15px]">3+ years</span>
                </div>
                <span className={`material-symbols-outlined ${selected === "3+" ? "text-[#FF6B2C]" : "text-zinc-400"}`}>chevron_right</span>
              </button>
              <button onClick={() => setSelected("always")} className={`option-tap w-full h-14 px-5 flex items-center justify-between bg-white border rounded-xl transition-all ${selected === "always" ? "option-selected border-[#FF6B2C]" : "border-[#E4E4E7] hover:border-[#FF6B2C]"}`}>
                <div className="flex items-center gap-4">
                  <span className={`text-xl ${selected === "always" ? "icon-selected" : "icon-bounce"}`}>🔄</span>
                  <span className="font-bold text-[#1A1A1A] text-[15px]">Always been this way</span>
                </div>
                <span className={`material-symbols-outlined ${selected === "always" ? "text-[#FF6B2C]" : "text-zinc-400"}`}>chevron_right</span>
              </button>
            </div>
            <div className="mt-6 text-center px-4">
              <p className="text-sm font-medium text-[#71717A] leading-relaxed italic">
                &ldquo;Small steps daily lead to peak performance.&rdquo;
              </p>
            </div>
          </main>
          <div className="fixed bottom-0 left-0 right-0 z-50 px-5 pb-6 pt-3 bg-gradient-to-t from-white via-white/95 to-transparent max-w-[390px] mx-auto">
            <button disabled={!selected} onClick={() => { next(); }} className={`w-full max-w-full h-[56px] rounded-[12px] font-bold text-base transition-all ${selected ? "bg-[#FF6B2C] text-white shadow-[0_0_20px_rgba(255,107,44,0.4)] animate-cta-glow active:scale-[0.97]" : "bg-[#E4E4E7] text-[#71717A] cursor-not-allowed"}`}>Continue</button>
          </div>
        </div>
      )}

      {/* ===== STEP 5: FREQUENCY (stitch/06_frequency.html) ===== */}
      {step === 5 && (
        <div className="bg-white text-zinc-900 min-h-dvh max-h-dvh overflow-hidden flex flex-col items-center">
          <div className="fixed top-0 left-0 w-full z-[60] h-1 bg-zinc-100">
            <div className="h-full bg-orange-600" style={{ width: progressWidth }}></div>
          </div>
          <header className="fixed top-0 left-0 w-full z-50 h-16 flex items-center px-4 max-w-[390px] mx-auto bg-white border-b-4 border-zinc-100">
            <button onClick={() => setStep(Math.max(0, step - 1))} aria-label="Go back" className="text-orange-600 active:scale-95 transition-transform duration-150">
              <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 0, 'wght' 600" }}>arrow_back</span>
            </button>
            <div className="flex-1 flex justify-center">
              <span className="text-orange-600 font-black text-xl tracking-tight">PEAKCORE</span>
            </div>
            <div className="w-6"></div>
          </header>
          <main className="flex-1 w-full max-w-[390px] mx-auto px-5 pt-[60px] pb-[100px] flex flex-col items-center justify-center">
            <div className="w-full space-y-8">
              <div className="text-center">
                <span className="text-zinc-500 font-medium text-sm">Step 6 of 18</span>
              </div>
              <h1 className="text-[20px] font-extrabold text-[#1A1A1A] text-center leading-tight">
                How often does this affect you?
              </h1>
              <div className="pt-12 pb-8 px-2">
                <div className="relative w-full">
                  <div className="text-center mb-4">
                    <span className="inline-block bg-[#FF6B2C] text-white text-[14px] font-bold px-4 py-1.5 rounded-full">
                      {sliderValue <= 20 ? "Rarely" : sliderValue <= 40 ? "Sometimes" : sliderValue <= 60 ? "Often" : sliderValue <= 80 ? "Very often" : "Almost always"}
                    </span>
                  </div>
                  <input className="cursor-pointer" max={100} min={0} type="range" value={sliderValue} onChange={(e) => setSliderValue(Number(e.target.value))} />
                  <div className="flex justify-between mt-6">
                    <span className="text-zinc-500 font-medium text-sm uppercase tracking-wide">Rarely</span>
                    <span className="text-zinc-500 font-medium text-sm uppercase tracking-wide">Almost always</span>
                  </div>
                </div>
              </div>
              <p className="text-center text-[#71717A] italic text-sm mt-8 mb-4 px-5">
                Honesty helps us build your perfect plan
              </p>
            </div>
          </main>
          <div className="fixed bottom-0 left-0 right-0 z-50 px-5 pb-6 pt-3 bg-gradient-to-t from-white via-white/95 to-transparent max-w-[390px] mx-auto">
            <button onClick={next} className="w-full max-w-full h-[56px] rounded-[12px] font-bold text-base transition-all bg-[#FF6B2C] text-white shadow-[0_0_20px_rgba(255,107,44,0.4)] animate-cta-glow active:scale-[0.97]">Continue</button>
          </div>
        </div>
      )}

      {/* ===== STEP 6: TRIED (stitch/07_tried.html) ===== */}
      {step === 6 && (
        <div className="flex justify-center items-start min-h-dvh max-h-dvh overflow-hidden">
          <div className="w-full max-w-[390px] min-h-dvh max-h-dvh flex flex-col relative bg-white overflow-hidden">
            <div className="fixed top-0 left-0 w-full h-[4px] bg-[#E4E4E7] z-[60]">
              <div className="h-full bg-[#FF6B2C]" style={{ width: progressWidth }}></div>
            </div>
            <header className="fixed top-[4px] left-0 w-full z-50 flex items-center justify-between px-4 h-14 bg-white border-b border-[#E4E4E7]">
              <div onClick={() => setStep(Math.max(0, step - 1))} className="flex items-center justify-center w-10 h-10 hover:bg-zinc-100 transition-colors active:scale-95 duration-100 rounded-full cursor-pointer">
                <span className="material-symbols-outlined text-[#FF6B2C]">arrow_back</span>
              </div>
              <h1 className="text-lg font-black tracking-tighter text-[#1A1A1A] antialiased">PEAKCORE</h1>
              <div className="w-10"></div>
            </header>
            <main className="flex-1 flex flex-col px-5 pt-[60px] pb-[120px]">
              <div className="mt-8 mb-6 text-center">
                <h2 className="text-[20px] leading-tight font-extrabold text-[#1A1A1A] tracking-tight">
                  Tried anything before?
                </h2>
              </div>
              <div className="space-y-4">
                <button onClick={() => setSelected("didnt_work")} className={`option-tap w-full h-14 px-5 flex items-center justify-between bg-white border rounded-xl transition-all duration-100 ${selected === "didnt_work" ? "option-selected border-[#FF6B2C]" : "border-[#E4E4E7] hover:border-[#FF6B2C] hover:bg-[#FFF4EE]"}`}>
                  <div className="flex items-center gap-4">
                    <span className={`text-xl ${selected === "didnt_work" ? "icon-selected" : "icon-bounce"}`}>❌</span>
                    <span className="text-[#1A1A1A] font-semibold text-[17px]">Yes, didn&apos;t work</span>
                  </div>
                  <span className={`material-symbols-outlined text-[18px] ${selected === "didnt_work" ? "text-[#FF6B2C]" : "text-[#71717A]"}`}>arrow_forward_ios</span>
                </button>
                <button onClick={() => setSelected("helped")} className={`option-tap w-full h-14 px-5 flex items-center justify-between bg-white border rounded-xl transition-all duration-100 ${selected === "helped" ? "option-selected border-[#FF6B2C]" : "border-[#E4E4E7] hover:border-[#FF6B2C] hover:bg-[#FFF4EE]"}`}>
                  <div className="flex items-center gap-4">
                    <span className={`text-xl ${selected === "helped" ? "icon-selected" : "icon-bounce"}`}>🔄</span>
                    <span className="text-[#1A1A1A] font-semibold text-[17px]">Yes, helped a bit</span>
                  </div>
                  <span className={`material-symbols-outlined text-[18px] ${selected === "helped" ? "text-[#FF6B2C]" : "text-[#71717A]"}`}>arrow_forward_ios</span>
                </button>
                <button onClick={() => setSelected("never_tried")} className={`option-tap w-full h-14 px-5 flex items-center justify-between bg-white border rounded-xl transition-all duration-100 ${selected === "never_tried" ? "option-selected border-[#FF6B2C]" : "border-[#E4E4E7] hover:border-[#FF6B2C] hover:bg-[#FFF4EE]"}`}>
                  <div className="flex items-center gap-4">
                    <span className={`text-xl ${selected === "never_tried" ? "icon-selected" : "icon-bounce"}`}>🆕</span>
                    <span className="text-[#1A1A1A] font-semibold text-[17px]">Never tried anything</span>
                  </div>
                  <span className={`material-symbols-outlined text-[18px] ${selected === "never_tried" ? "text-[#FF6B2C]" : "text-[#71717A]"}`}>arrow_forward_ios</span>
                </button>
              </div>
              <div className="mt-6 text-center">
                <p className="text-[14px] text-[#71717A] italic leading-relaxed">
                  Most solutions fail because they&apos;re not personalized
                </p>
              </div>
            </main>
            <div className="fixed bottom-0 left-0 right-0 z-50 px-5 pb-6 pt-3 bg-gradient-to-t from-white via-white/95 to-transparent max-w-[390px] mx-auto">
              <button disabled={!selected} onClick={() => { next(); }} className={`w-full max-w-full h-[56px] rounded-[12px] font-bold text-base transition-all ${selected ? "bg-[#FF6B2C] text-white shadow-[0_0_20px_rgba(255,107,44,0.4)] animate-cta-glow active:scale-[0.97]" : "bg-[#E4E4E7] text-[#71717A] cursor-not-allowed"}`}>Continue</button>
            </div>
          </div>
        </div>
      )}

      {/* ===== STEP 7: TIME (stitch/08_time.html) ===== */}
      {step === 7 && (
        <div className="bg-white text-[#1A1A1A] min-h-dvh max-h-dvh overflow-hidden flex flex-col items-center">
          <div className="fixed top-0 left-0 w-full z-50 flex flex-col bg-white">
            <div className="w-full h-1 bg-gray-100">
              <div className="h-full bg-[#FF6B2C]" style={{ width: progressWidth }}></div>
            </div>
            <div className="flex items-center justify-between px-4 h-14 border-b-4 border-gray-100">
              <button onClick={() => setStep(Math.max(0, step - 1))} className="p-2 text-[#71717A] hover:bg-gray-100 transition-colors active:scale-95 duration-150">
                <span className="material-symbols-outlined">arrow_back</span>
              </button>
              <h1 className="text-xl font-black tracking-tighter text-[#1A1A1A] font-sans antialiased uppercase">PEAKCORE</h1>
              <div className="w-10"></div>
            </div>
          </div>
          <main className="w-full max-w-[390px] mx-auto px-5 pt-[60px] pb-[120px] flex-grow flex flex-col justify-center">
            <div className="mb-8 rounded-2xl overflow-hidden aspect-video bg-gray-50 flex items-center justify-center">
              <img className="w-full h-full object-cover opacity-90" alt="Modern high-end gym interior with clean lighting and premium equipment in soft focus, fitness lifestyle aesthetic" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBK2Nbme08-dBA_9t1THNRkFAKZKsrfLB_ZX0Rdb2_3jICvamphKufR1wq9Ij44XHdyZjGqAdnwArVQ6nSnYLFMuu1weEFdqIp4_NNNLTyAu1t0fNYo-aDvIdXEk7bNXHRaOpaR6BIhIjgdKbVsSaQMOGDrgQbXThGo_dZCHztjeqZfr4gOOCiVcpaRUzgGA34AmUJaMr7vJ1ojFEbQBk9vPXwGLFw0ZCIXJOaGcM6d-xajQhK2FVQ7TD1hGDz-evqfaEW5n_r6q2fe" />
            </div>
            <div className="text-center mb-6">
              <h2 className="text-[20px] font-extrabold tracking-tight text-[#1A1A1A] mb-3">Daily training time?</h2>
              <p className="text-[#71717A] text-base">Select the duration that best fits your lifestyle. Consistency is key.</p>
            </div>
            <div className="grid grid-cols-3 gap-3 w-full">
              <button onClick={() => setSelected("3min")} className={`option-tap group flex flex-col items-center justify-center p-4 border rounded-xl aspect-square transition-all duration-200 active:scale-95 ${selected === "3min" ? "option-selected border-[#FF6B2C]" : "bg-white border-[#E4E4E7] hover:border-[#FF6B2C] hover:bg-[#FFF4EE]"}`}>
                <span className={`text-3xl mb-3 ${selected === "3min" ? "icon-selected" : "icon-bounce"}`}>⚡</span>
                <span className="text-sm font-bold text-[#1A1A1A]">3 min</span>
              </button>
              <button onClick={() => setSelected("5min")} className={`option-tap group flex flex-col items-center justify-center p-4 border rounded-xl aspect-square transition-all duration-200 active:scale-95 ${selected === "5min" ? "option-selected border-[#FF6B2C]" : "bg-white border-[#E4E4E7] hover:border-[#FF6B2C] hover:bg-[#FFF4EE]"}`}>
                <span className={`text-3xl mb-3 ${selected === "5min" ? "icon-selected" : "icon-bounce"}`}>⏱️</span>
                <span className="text-sm font-bold text-[#1A1A1A]">5 min</span>
              </button>
              <button onClick={() => setSelected("10min")} className={`option-tap group flex flex-col items-center justify-center p-4 border rounded-xl aspect-square transition-all duration-200 active:scale-95 ${selected === "10min" ? "option-selected border-[#FF6B2C]" : "bg-white border-[#E4E4E7] hover:border-[#FF6B2C] hover:bg-[#FFF4EE]"}`}>
                <span className={`text-3xl mb-3 ${selected === "10min" ? "icon-selected" : "icon-bounce"}`}>💪</span>
                <span className="text-sm font-bold text-[#1A1A1A]">10+ min</span>
              </button>
            </div>
            <p className="text-center text-xs text-[#71717A] italic mt-6 mb-2">Even 3 minutes a day can transform your life ⚡</p>
            <div className="mt-6 p-5 bg-[#F7F7F8] rounded-2xl flex items-start gap-4">
              <div className="bg-[#FFF4EE] p-2 rounded-lg">
                <span className="material-symbols-outlined text-[#FF6B2C]">info</span>
              </div>
              <div>
                <h4 className="text-sm font-bold text-[#1A1A1A] mb-1">PeakCore Tip</h4>
                <p className="text-xs text-[#71717A] leading-relaxed">Most users see significant results with just 5 minutes a day within the first 3 weeks.</p>
              </div>
            </div>
          </main>
          <div className="fixed bottom-0 left-0 right-0 z-50 px-5 pb-6 pt-3 bg-gradient-to-t from-white via-white/95 to-transparent max-w-[390px] mx-auto">
            <button disabled={!selected} onClick={() => { next(); }} className={`w-full max-w-full h-[56px] rounded-[12px] font-bold text-base transition-all ${selected ? "bg-[#FF6B2C] text-white shadow-[0_0_20px_rgba(255,107,44,0.4)] animate-cta-glow active:scale-[0.97]" : "bg-[#E4E4E7] text-[#71717A] cursor-not-allowed"}`}>Continue</button>
          </div>
        </div>
      )}

      {/* ===== STEP 8: INFO PRO (stitch/09_info_pro.html) ===== */}
      {step === 8 && (
        <div className="bg-white text-[#1A1A1A] min-h-dvh max-h-dvh overflow-hidden flex flex-col items-center">
          <div className="fixed top-0 left-0 w-full h-1 bg-zinc-100 z-[60]">
            <div className="h-full bg-[#FF6B2C] transition-all duration-500" style={{ width: progressWidth }}></div>
          </div>
          <header className="fixed top-0 left-0 w-full z-50 flex items-center px-4 h-14 bg-white border-b-4 border-zinc-100">
            <div className="flex items-center w-full max-w-[390px] mx-auto relative justify-center">
              <button onClick={() => setStep(Math.max(0, step - 1))} className="absolute left-0 text-zinc-500 hover:opacity-80 transition-opacity active:scale-95">
                <span className="material-symbols-outlined">arrow_back</span>
              </button>
              <span className="font-black tracking-tight text-zinc-900 uppercase text-xl">PEAKCORE</span>
            </div>
          </header>
          <main className="flex-1 w-full max-w-[390px] mx-auto px-5 flex flex-col items-center justify-center text-center pt-20 pb-[100px]">
            <div className="mb-8 flex items-center justify-center w-24 h-24 rounded-full bg-[#FF6B2C]/5">
              <span aria-label="trophy" className="text-6xl" role="img">🏆</span>
            </div>
            <div className="space-y-3">
              <h1 className="text-[20px] font-black leading-tight text-[#1A1A1A]">
                Pro athletes train their pelvic floor daily
              </h1>
              <p className="text-lg font-medium text-[#71717A]">
                for peak performance
              </p>
            </div>
            <div className="mt-6 w-full grid grid-cols-2 gap-3">
              <div className="p-4 bg-[#f1effb] rounded-xl border border-[#E4E4E7]/50 flex flex-col items-center">
                <span className="text-[#FF6B2C] font-black text-2xl">Daily</span>
                <span className="text-xs uppercase tracking-widest text-[#71717A] font-bold">Consistency</span>
              </div>
              <div className="p-4 bg-[#f1effb] rounded-xl border border-[#E4E4E7]/50 flex flex-col items-center">
                <span className="text-[#FF6B2C] font-black text-2xl">Elite</span>
                <span className="text-xs uppercase tracking-widest text-[#71717A] font-bold">Standard</span>
              </div>
            </div>
          </main>
          <div className="fixed bottom-0 left-0 right-0 z-50 px-5 pb-6 pt-3 bg-gradient-to-t from-white via-white/95 to-transparent max-w-[390px] mx-auto">
            <button onClick={next} className="w-full max-w-full h-[56px] rounded-[12px] font-bold text-base transition-all bg-[#FF6B2C] text-white shadow-[0_0_20px_rgba(255,107,44,0.4)] animate-cta-glow active:scale-[0.97]">Continue</button>
          </div>
        </div>
      )}

      {/* ===== STEP 9: CONCERN (stitch/10_concern.html) ===== */}
      {step === 9 && (
        <div className="bg-white text-[#1A1A1A] min-h-dvh max-h-dvh overflow-hidden flex flex-col items-center">
          <div className="fixed top-0 left-0 w-full h-1 bg-zinc-100 z-[60]">
            <div className="h-full bg-[#FF6B2C]" style={{ width: progressWidth }}></div>
          </div>
          <header className="fixed top-0 left-0 w-full z-50 flex items-center justify-between px-4 h-16 bg-white border-b-4 border-zinc-100">
            <button onClick={() => setStep(Math.max(0, step - 1))} className="flex items-center justify-center w-10 h-10 text-zinc-400 hover:opacity-80 transition-opacity active:scale-95">
              <span className="material-symbols-outlined">arrow_back</span>
            </button>
            <h1 className="text-xl font-black tracking-tighter text-zinc-900 antialiased">PEAKCORE</h1>
            <div className="w-10"></div>
          </header>
          <main className="flex-1 w-full max-w-[390px] mx-auto px-5 pt-[60px] pb-[120px] flex flex-col">
            <div className="mt-6 mb-6">
              <h2 className="text-[20px] font-extrabold leading-tight text-[#1A1A1A]">
                Biggest concern?
              </h2>
            </div>
            <div className="flex flex-col gap-4">
              <button onClick={() => setSelected("age")} className={`option-tap group w-full h-[72px] px-5 flex items-center justify-between bg-white border-2 rounded-xl active:scale-[0.98] transition-all duration-200 ${selected === "age" ? "option-selected border-[#FF6B2C]" : "border-zinc-100 hover:border-[#FF6B2C]/30 hover:bg-[#FFF4EE]/20"}`}>
                <div className="flex items-center gap-4">
                  <span className={`text-2xl ${selected === "age" ? "icon-selected" : "icon-bounce"}`}>📉</span>
                  <span className="text-[15px] font-semibold text-zinc-800">Getting worse with age</span>
                </div>
                <span className={`material-symbols-outlined transition-colors ${selected === "age" ? "text-[#FF6B2C]" : "text-zinc-300"}`}>chevron_right</span>
              </button>
              <button onClick={() => setSelected("partner")} className={`option-tap group w-full h-[72px] px-5 flex items-center justify-between bg-white border-2 rounded-xl active:scale-[0.98] transition-all duration-200 ${selected === "partner" ? "option-selected border-[#FF6B2C]" : "border-zinc-100 hover:border-[#FF6B2C]/30 hover:bg-[#FFF4EE]/20"}`}>
                <div className="flex items-center gap-4">
                  <span className={`text-2xl ${selected === "partner" ? "icon-selected" : "icon-bounce"}`}>💑</span>
                  <span className="text-[15px] font-semibold text-zinc-800">Partner satisfaction</span>
                </div>
                <span className={`material-symbols-outlined transition-colors ${selected === "partner" ? "text-[#FF6B2C]" : "text-zinc-300"}`}>chevron_right</span>
              </button>
              <button onClick={() => setSelected("missing")} className={`option-tap group w-full h-[72px] px-5 flex items-center justify-between bg-white border-2 rounded-xl active:scale-[0.98] transition-all duration-200 ${selected === "missing" ? "option-selected border-[#FF6B2C]" : "border-zinc-100 hover:border-[#FF6B2C]/30 hover:bg-[#FFF4EE]/20"}`}>
                <div className="flex items-center gap-4">
                  <span className={`text-2xl ${selected === "missing" ? "icon-selected" : "icon-bounce"}`}>🚫</span>
                  <span className="text-[15px] font-semibold text-zinc-800">Missing better experiences</span>
                </div>
                <span className={`material-symbols-outlined transition-colors ${selected === "missing" ? "text-[#FF6B2C]" : "text-zinc-300"}`}>chevron_right</span>
              </button>
              <button onClick={() => setSelected("health")} className={`option-tap group w-full h-[72px] px-5 flex items-center justify-between bg-white border-2 rounded-xl active:scale-[0.98] transition-all duration-200 ${selected === "health" ? "option-selected border-[#FF6B2C]" : "border-zinc-100 hover:border-[#FF6B2C]/30 hover:bg-[#FFF4EE]/20"}`}>
                <div className="flex items-center gap-4">
                  <span className={`text-2xl ${selected === "health" ? "icon-selected" : "icon-bounce"}`}>🏥</span>
                  <span className="text-[15px] font-semibold text-zinc-800">Health decline</span>
                </div>
                <span className={`material-symbols-outlined transition-colors ${selected === "health" ? "text-[#FF6B2C]" : "text-zinc-300"}`}>chevron_right</span>
              </button>
            </div>
            <div className="mt-6 text-center">
              <p className="text-xs italic text-zinc-500 font-normal">
                Knowing your priority helps us focus your plan
              </p>
            </div>
          </main>
          <div className="fixed bottom-0 left-0 right-0 z-50 px-5 pb-6 pt-3 bg-gradient-to-t from-white via-white/95 to-transparent max-w-[390px] mx-auto">
            <button disabled={!selected} onClick={() => { next(); }} className={`w-full max-w-full h-[56px] rounded-[12px] font-bold text-base transition-all ${selected ? "bg-[#FF6B2C] text-white shadow-[0_0_20px_rgba(255,107,44,0.4)] animate-cta-glow active:scale-[0.97]" : "bg-[#E4E4E7] text-[#71717A] cursor-not-allowed"}`}>Continue</button>
          </div>
        </div>
      )}

      {/* ===== STEP 10: SPEED (stitch/11_speed.html) ===== */}
      {step === 10 && (
        <div className="bg-white text-[#1A1A1A] antialiased min-h-dvh max-h-dvh overflow-hidden flex flex-col items-center">
          <header className="fixed top-0 left-0 w-full z-50 flex justify-between items-center h-14 px-4 bg-white border-b-4 border-zinc-100">
            <button onClick={() => setStep(Math.max(0, step - 1))} className="text-orange-600 hover:opacity-80 transition-opacity active:scale-95 flex items-center justify-center">
              <span className="material-symbols-outlined">arrow_back</span>
            </button>
            <h1 className="font-sans font-bold text-zinc-900 text-lg font-black tracking-tighter">PEAKCORE</h1>
            <div className="w-8"></div>
          </header>
          <div className="fixed top-14 left-0 w-full h-1 bg-zinc-100 z-40">
            <div className="h-full bg-[#FF6B2C] transition-all duration-500" style={{ width: progressWidth }}></div>
          </div>
          <main className="flex-1 w-full max-w-[390px] mx-auto px-5 pt-[60px] pb-[120px] flex flex-col justify-center items-center">
            <h2 className="text-[20px] font-extrabold text-[#1A1A1A] text-center mb-6 leading-tight">
              How quickly do you want results?
            </h2>
            <div className="grid grid-cols-3 gap-3 w-full">
              <button onClick={() => setSelected("asap")} className={`option-tap group flex flex-col items-center justify-center aspect-square border-2 rounded-2xl p-4 transition-all duration-200 active:scale-95 ${selected === "asap" ? "option-selected border-[#FF6B2C]" : "bg-white border-[#E4E4E7] hover:border-[#FF6B2C]/50"}`}>
                <div className={`text-3xl md:text-4xl mb-3 ${selected === "asap" ? "icon-selected" : ""}`}>
                  🔥
                </div>
                <span className={`text-xs md:text-sm font-bold text-center leading-tight ${selected === "asap" ? "text-[#FF6B2C]" : "text-[#3F3F46]"}`}>
                  ASAP
                </span>
              </button>
              <button onClick={() => setSelected("month")} className={`option-tap group flex flex-col items-center justify-center aspect-square border-2 rounded-2xl p-4 transition-all duration-200 active:scale-95 ${selected === "month" ? "option-selected border-[#FF6B2C]" : "bg-white border-[#E4E4E7] hover:border-[#FF6B2C]/50"}`}>
                <div className={`text-3xl md:text-4xl mb-3 ${selected === "month" ? "icon-selected" : "icon-bounce"}`}>
                  📅
                </div>
                <span className={`text-xs md:text-sm font-bold text-center leading-tight ${selected === "month" ? "text-[#FF6B2C]" : "text-[#3F3F46]"}`}>
                  Within a month
                </span>
              </button>
              <button onClick={() => setSelected("norush")} className={`option-tap group flex flex-col items-center justify-center aspect-square border-2 rounded-2xl p-4 transition-all duration-200 active:scale-95 ${selected === "norush" ? "option-selected border-[#FF6B2C]" : "bg-white border-[#E4E4E7] hover:border-[#FF6B2C]/50"}`}>
                <div className={`text-3xl md:text-4xl mb-3 ${selected === "norush" ? "icon-selected" : ""}`}>
                  🧘
                </div>
                <span className={`text-xs md:text-sm font-bold text-center leading-tight ${selected === "norush" ? "text-[#FF6B2C]" : "text-[#3F3F46]"}`}>
                  No rush
                </span>
              </button>
            </div>
          </main>
          <div className="fixed bottom-0 left-0 right-0 z-50 px-5 pb-6 pt-3 bg-gradient-to-t from-white via-white/95 to-transparent max-w-[390px] mx-auto">
            <button disabled={!selected} onClick={() => { next(); }} className={`w-full h-[56px] rounded-[12px] font-bold text-base transition-all ${selected ? "bg-[#FF6B2C] text-white shadow-[0_0_20px_rgba(255,107,44,0.4)] animate-cta-glow active:scale-[0.97]" : "bg-[#E4E4E7] text-[#71717A] cursor-not-allowed"}`}>Continue</button>
          </div>
        </div>
      )}

      {/* ===== STEP 11: INFO GOOD (stitch/12_info_good.html) ===== */}
      {step === 11 && (
        <div className="bg-white text-[#1A1A1A] antialiased min-h-dvh max-h-dvh overflow-hidden">
          <div className="flex flex-col min-h-dvh max-h-dvh max-w-[390px] mx-auto relative overflow-hidden">
            <div className="fixed top-0 left-0 right-0 z-50 bg-white max-w-[390px] mx-auto">
              <div className="w-full h-1 bg-zinc-100">
                <div className="h-full bg-[#FF6B2C]" style={{ width: progressWidth }}></div>
              </div>
            </div>
            <header className="flex items-center justify-between px-4 h-16 w-full max-w-[390px] mx-auto border-b-4 border-orange-600">
              <div className="flex items-center" onClick={() => setStep(Math.max(0, step - 1))}>
                <span className="material-symbols-outlined text-zinc-500 hover:bg-zinc-100 transition-colors active:scale-95 duration-150 p-2 rounded-full cursor-pointer">arrow_back</span>
              </div>
              <h1 className="text-xl font-black tracking-tighter text-zinc-900 uppercase">PEAKCORE</h1>
              <div className="w-10"></div>
            </header>
            <main className="flex-grow flex flex-col items-center justify-center px-5 text-center py-12">
              <div className="mb-6 flex items-center justify-center w-20 h-20 rounded-full bg-green-50">
                <span className="material-symbols-outlined text-[#22C55E] text-[48px] fill-icon">check_circle</span>
              </div>
              <h2 className="text-[20px] font-extrabold text-[#1A1A1A] tracking-tight mb-2">Good news!</h2>
              <div className="my-8">
                <span className="text-7xl font-black text-[#FF6B2C] leading-none tracking-tighter">87%</span>
              </div>
              <p className="text-lg text-zinc-500 leading-relaxed max-w-[280px]">
                Your profile matches men who improved in 4 weeks
              </p>
              <div className="mt-6 grid grid-cols-2 gap-4 w-full">
                <div className="bg-[#F7F7F8] p-4 rounded-2xl flex flex-col items-start text-left">
                  <span className="material-symbols-outlined text-[#FF6B2C] mb-2">trending_up</span>
                  <span className="text-sm font-bold text-[#1A1A1A]">Proven Path</span>
                  <span className="text-xs text-zinc-500">Based on profile match</span>
                </div>
                <div className="bg-[#F7F7F8] p-4 rounded-2xl flex flex-col items-start text-left">
                  <span className="material-symbols-outlined text-[#FF6B2C] mb-2">schedule</span>
                  <span className="text-sm font-bold text-[#1A1A1A]">4 Weeks</span>
                  <span className="text-xs text-zinc-500">Est. improvement time</span>
                </div>
              </div>
            </main>
            <div className="p-6 sticky bottom-0 bg-white border-t border-zinc-100">
              <button onClick={next} className="w-full h-[56px] rounded-[12px] font-bold text-base transition-all bg-[#FF6B2C] text-white shadow-[0_0_20px_rgba(255,107,44,0.4)] animate-cta-glow active:scale-[0.97]">Continue</button>
            </div>
          </div>
          <div className="hidden">
            <img alt="a professional athletic man smiling confidently in a clean modern fitness studio setting with warm natural sunlight" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDAbq-IL7YAgc93V-2ti9yYqFlmSebxHjs5LL98h3Ft9boCBY-hWEsOLfMmO9j1T3hMiqDfQ51wOmSUPzSclrWYcgv3JaZQzZPlL7SI0A7sRpOlumIhL0YQ06RlAFH_GOm2rnq-Dvo2mgLbrsBwdDfhUW0vDEKyBQq9e1Lnv28vDJPXonTBiiaRit6y0u7UYZ85pQ2vK-mwUWgdeGh8bvuMNi59cpzXwTVYEbmh-pBMu7SgvN1gNp58VuU0fgEwOAtFFKZj7X6Fhsvd" />
          </div>
        </div>
      )}

      {/* ===== STEP 12: PREFERRED TIME (stitch/13_preferred_time.html) ===== */}
      {step === 12 && (
        <div className="bg-white text-[#1A1A1A] antialiased min-h-dvh max-h-dvh overflow-hidden flex flex-col items-center">
          <div className="fixed top-0 left-0 w-full h-1 bg-zinc-200 z-[60]">
            <div className="h-full bg-[#FF6B2C]" style={{ width: progressWidth }}></div>
          </div>
          <header className="fixed top-1 left-0 w-full z-50 bg-white px-4 h-14 flex items-center justify-between">
            <button onClick={() => setStep(Math.max(0, step - 1))} aria-label="Go back" className="w-10 h-10 flex items-center justify-start text-zinc-900 active:scale-95 transition-transform">
              <span className="material-symbols-outlined text-2xl">arrow_back</span>
            </button>
            <div className="text-xl font-black tracking-tighter text-zinc-900">PEAKCORE</div>
            <div className="w-10"></div>
          </header>
          <main className="flex-1 w-full max-w-[390px] mx-auto flex flex-col px-5 pt-[60px] pb-[120px]">
            <div className="flex-1 flex flex-col justify-center">
              <h1 className="text-[20px] font-extrabold text-[#1A1A1A] leading-tight mb-6 text-center">
                Preferred training time?
              </h1>
              <div className="grid grid-cols-3 gap-3">
                <button onClick={() => setSelected("morning")} className={`option-tap flex flex-col items-center justify-center aspect-square border rounded-xl transition-all active:scale-95 ${selected === "morning" ? "option-selected border-[#FF6B2C]" : "bg-[#F7F7F8] border-[#E4E4E7] hover:border-[#FF6B2C]"}`}>
                  <span className={`text-3xl mb-2 ${selected === "morning" ? "icon-selected" : "icon-bounce"}`}>🌅</span>
                  <span className={`text-sm font-semibold ${selected === "morning" ? "text-[#FF6B2C]" : "text-[#3F3F46]"}`}>Morning</span>
                </button>
                <button onClick={() => setSelected("afternoon")} className={`option-tap flex flex-col items-center justify-center aspect-square border rounded-xl transition-all active:scale-95 ${selected === "afternoon" ? "option-selected border-[#FF6B2C]" : "bg-[#F7F7F8] border-[#E4E4E7] hover:border-[#FF6B2C]"}`}>
                  <span className={`text-3xl mb-2 ${selected === "afternoon" ? "icon-selected" : "icon-bounce"}`}>☀️</span>
                  <span className={`text-sm font-semibold ${selected === "afternoon" ? "text-[#FF6B2C]" : "text-[#3F3F46]"}`}>Afternoon</span>
                </button>
                <button onClick={() => setSelected("evening")} className={`option-tap flex flex-col items-center justify-center aspect-square border rounded-xl transition-all active:scale-95 ${selected === "evening" ? "option-selected border-[#FF6B2C]" : "bg-[#F7F7F8] border-[#E4E4E7] hover:border-[#FF6B2C]"}`}>
                  <span className={`text-3xl mb-2 ${selected === "evening" ? "icon-selected" : "icon-bounce"}`}>🌙</span>
                  <span className={`text-sm font-semibold ${selected === "evening" ? "text-[#FF6B2C]" : "text-[#3F3F46]"}`}>Evening</span>
                </button>
              </div>
            </div>
          </main>
          <div className="fixed bottom-0 left-0 right-0 z-50 px-5 pb-6 pt-3 bg-gradient-to-t from-white via-white/95 to-transparent max-w-[390px] mx-auto">
            <button disabled={!selected} onClick={() => { next(); }} className={`w-full h-[56px] rounded-[12px] font-bold text-base transition-all ${selected ? "bg-[#FF6B2C] text-white shadow-[0_0_20px_rgba(255,107,44,0.4)] animate-cta-glow active:scale-[0.97]" : "bg-[#E4E4E7] text-[#71717A] cursor-not-allowed"}`}>Continue</button>
          </div>
        </div>
      )}

      {/* ===== STEP 13: REMINDERS (stitch/14_reminders.html) ===== */}
      {step === 13 && (
        <div className="bg-white text-[#1A1A1A] antialiased flex justify-center min-h-dvh max-h-dvh overflow-hidden">
          <div className="w-full max-w-[390px] min-h-dvh max-h-dvh flex flex-col relative overflow-hidden">
            <header className="fixed top-0 left-0 right-0 w-full max-w-[390px] mx-auto z-50 flex items-center justify-between px-4 h-14 bg-white border-b-4 border-zinc-100">
              <button onClick={() => setStep(Math.max(0, step - 1))} className="flex items-center justify-center p-2 hover:opacity-80 transition-opacity active:scale-95 text-orange-600">
                <span className="material-symbols-outlined">arrow_back</span>
              </button>
              <h1 className="font-black tracking-tighter text-xl text-orange-600">PEAKCORE</h1>
              <div className="w-10"></div>
            </header>
            <main className="flex-grow flex flex-col pt-14 pb-[100px]">
              <div className="w-full sticky top-14 z-40 bg-white">
                <div className="progress-bar-track">
                  <div className="progress-bar-fill" style={{ width: progressWidth }}></div>
                </div>
              </div>
              <div className="flex-grow flex flex-col items-center justify-center px-6 text-center">
                <h2 className="text-[20px] font-extrabold leading-tight tracking-tight text-[#1A1A1A] mb-6">
                  Want daily reminders?
                </h2>
                <div className="w-full p-8 rounded-xl bg-[#F7F7F8] border border-[#E4E4E7] mb-6 flex flex-col items-center">
                  <div className="w-16 h-16 rounded-2xl bg-[#FFF4EE] flex items-center justify-center mb-4">
                    <span className="material-symbols-outlined text-[#FF6B2C] text-4xl" style={{ fontVariationSettings: "'FILL' 1" }}>notifications_active</span>
                  </div>
                  <p className="text-[#3F3F46] font-medium text-center px-4 leading-relaxed">
                    Stay consistent with quick daily alerts to keep your training on track.
                  </p>
                </div>
              </div>
            </main>
            <div className="fixed bottom-0 left-0 right-0 w-full max-w-[390px] mx-auto px-5 pb-8 pt-4 bg-white bg-opacity-95 backdrop-blur-sm">
              <div className="flex flex-col gap-3">
                <button onClick={() => setSelected("yes")} className={`option-tap w-full h-[56px] rounded-xl font-bold text-lg flex items-center justify-center active:scale-[0.98] transition-all ${selected === "yes" ? "bg-[#FF6B2C] text-white shadow-lg shadow-orange-200 option-selected" : "bg-white text-[#FF6B2C] border-2 border-[#FF6B2C]"}`}>
                  ✅ Yes, keep me on track
                </button>
                <button onClick={() => setSelected("no")} className={`option-tap w-full h-[56px] rounded-xl font-bold text-lg flex items-center justify-center active:scale-[0.98] transition-all ${selected === "no" ? "bg-[#FF6B2C] text-white shadow-lg shadow-orange-200 option-selected" : "bg-white text-[#FF6B2C] border-2 border-[#FF6B2C]"}`}>
                  ⏭️ No thanks
                </button>
              </div>
              <button disabled={!selected} onClick={() => { next(); }} className={`w-full h-[56px] rounded-[12px] font-bold text-base transition-all mt-3 ${selected ? "bg-[#FF6B2C] text-white shadow-[0_0_20px_rgba(255,107,44,0.4)] animate-cta-glow active:scale-[0.97]" : "bg-[#E4E4E7] text-[#71717A] cursor-not-allowed"}`}>Continue</button>
              <p className="mt-4 text-center text-[#71717A] text-sm font-medium">
                Consistency is the #1 predictor of success
              </p>
            </div>
          </div>
        </div>
      )}

      {/* ===== STEP 14: EMAIL (stitch/15_email.html) ===== */}
      {step === 14 && (
        <div className="flex items-center justify-center min-h-dvh max-h-dvh overflow-hidden bg-[#fcf9f8]">
          <main className="w-[390px] h-[844px] bg-[#fcf9f8] relative overflow-hidden flex flex-col">
            <div className="w-full h-1 bg-[#e5e2e1]">
              <div className="h-full bg-[#ff6b2c] w-full rounded-full"></div>
            </div>
            <div className="mt-4 flex justify-center">
              <span className="font-label text-[0.75rem] uppercase tracking-widest text-[#594139] font-medium">
                Step 18 of 18
              </span>
            </div>
            <section className="flex-grow flex flex-col justify-center px-8 pb-12">
              <div className="mb-8 relative flex justify-center">
                <div className="w-24 h-24 bg-[#f6f3f2] rounded-xl flex items-center justify-center rotate-3 border-2 border-[#ff6b2c]/10">
                  <span className="material-symbols-outlined text-[3rem] text-[#ff6b2c]">mail</span>
                </div>
                <div className="absolute -top-2 -right-2 w-10 h-10 bg-[#ff6b2c] rounded-full flex items-center justify-center shadow-lg -rotate-12">
                  <span className="material-symbols-outlined text-white text-[1.2rem]" style={{ fontVariationSettings: "'FILL' 1" }}>check</span>
                </div>
              </div>
              <div className="text-center mb-8">
                <h1 className="text-[1.75rem] font-bold text-[#1c1b1b] leading-tight tracking-tighter mb-2">
                  Get Your Personal Plan
                </h1>
                <p className="text-[1rem] text-[#594139] leading-relaxed px-4">
                  Enter your email for your custom plan
                </p>
              </div>
              <div className="space-y-4">
                <div className="relative">
                  <input
                    className="w-full h-14 px-6 bg-white border border-[#e2bfb3]/30 rounded-xl text-[0.9375rem] text-[#1c1b1b] placeholder:text-[#594139]/50 focus:ring-0 focus:border-[#ff6b2c] transition-all duration-200 kinetic-input"
                    placeholder="your@email.com"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <button onClick={handleEmailSubmit} className={`w-full h-14 bg-[#ff6b2c] text-white font-bold text-[1.125rem] rounded-xl flex items-center justify-center gap-2 active:scale-[0.98] transition-all duration-200 ${email ? "shadow-[0_0_20px_rgba(255,107,44,0.4)] animate-cta-glow" : ""}`}>
                  Get My Plan
                  <span className="material-symbols-outlined text-[1.25rem]">arrow_forward</span>
                </button>
                <button onClick={() => router.push("/loading-screen")} className="w-full text-[13px] text-[#71717A] mt-3 py-2 hover:underline transition-all">
                  Skip for now
                </button>
                <div className="pt-2 text-center">
                  <div className="flex items-center justify-center gap-2 mb-1">
                    <span className="material-symbols-outlined text-[1rem] text-[#594139]" style={{ fontVariationSettings: "'FILL' 1" }}>lock</span>
                    <span className="text-[0.75rem] text-[#594139] font-medium uppercase tracking-wider">Secure Access</span>
                  </div>
                  <p className="text-[0.75rem] text-[#594139] opacity-70 italic leading-snug px-6">
                    We respect your privacy. Unsubscribe anytime.
                  </p>
                </div>
              </div>
              <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-[#ff6b2c]/5 rounded-full blur-3xl pointer-events-none"></div>
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-[#fd9e7a]/5 rounded-full blur-3xl pointer-events-none"></div>
            </section>
            <div className="pb-10 px-8">
              <div className="bg-[#f6f3f2] p-4 rounded-xl flex items-center gap-4">
                <div className="flex flex-col">
                  <span className="text-[0.625rem] text-[#ff6b2c] font-black uppercase tracking-[0.2em]">Live Status</span>
                  <span className="text-[0.8125rem] font-semibold text-[#1c1b1b]">Plan generating for your metrics...</span>
                </div>
                <div className="ml-auto flex items-center">
                  <div className="w-1.5 h-1.5 bg-[#ff6b2c] rounded-full animate-pulse"></div>
                </div>
              </div>
            </div>
          </main>
        </div>
      )}
    </>
  );
}
