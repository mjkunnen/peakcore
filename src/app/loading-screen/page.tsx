"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function LoadingScreen() {
  const [progress, setProgress] = useState(0);
  const router = useRouter();

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 1;
      });
    }, 80); // 80ms * 100 = 8 seconds

    const timeout = setTimeout(() => {
      router.push("/results");
    }, 8000);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [router]);

  // Calculate stroke-dashoffset: circumference = 2 * pi * 40 = ~251.32
  // offset = circumference * (1 - progress/100)
  const circumference = 251.32;
  const dashoffset = circumference * (1 - progress / 100);

  return (
    <div className="bg-white text-[#2d2e36] min-h-screen flex flex-col items-center justify-center p-6 overflow-hidden">
      <div className="flex flex-col items-center justify-center w-full max-w-[480px] space-y-12">
        {/* Large Circular Progress Ring (Donut Chart) */}
        <div className="relative flex items-center justify-center">
          <svg className="w-64 h-64 md:w-72 md:h-72" viewBox="0 0 100 100">
            {/* Background track (Light Grey) */}
            <circle
              className="text-[#e5e2e1] stroke-current"
              cx="50"
              cy="50"
              fill="transparent"
              r="40"
              strokeWidth="8"
            ></circle>
            {/* Progress stroke (PeakCore Orange #FF6B2C) */}
            <circle
              className="text-[#FF6B2C] stroke-current progress-ring__circle"
              cx="50"
              cy="50"
              fill="transparent"
              r="40"
              strokeDasharray={circumference}
              strokeDashoffset={dashoffset}
              strokeLinecap="round"
              strokeWidth="8"
            ></circle>
          </svg>
          {/* Percentage Text Inside */}
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-5xl md:text-6xl font-black tracking-tighter text-[#FF6B2C]">
              {progress}%
            </span>
          </div>
        </div>
        {/* Status Messaging */}
        <div className="text-center space-y-2">
          <p className="text-lg md:text-xl font-semibold text-[#1A1A1A] tracking-tight">
            Building your 8-week plan...
          </p>
          <p className="text-sm md:text-base text-[#5c5b5b] font-medium max-w-[240px] mx-auto leading-relaxed">
            Tailoring exercises to your unique peak performance goals.
          </p>
        </div>
      </div>
      {/* Background Subtle Detail (Clean Aesthetic) */}
      <div className="fixed bottom-12 text-center w-full px-6">
        <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#adacb6] opacity-40">
          PEAKCORE BIOMETRIC ENGINE v2.0
        </span>
      </div>
    </div>
  );
}
