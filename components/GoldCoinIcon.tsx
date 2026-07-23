"use client";

import React from "react";

interface GoldCoinIconProps {
  className?: string;
  size?: number;
}

export default function GoldCoinIcon({ className = "w-4 h-4", size }: GoldCoinIconProps) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`inline-block shrink-0 ${className}`}
      style={size ? { width: size, height: size } : undefined}
    >
      <defs>
        <linearGradient id="goldOuter" x1="0" y1="0" x2="32" y2="32" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FFE259" />
          <stop offset="50%" stopColor="#FFA751" />
          <stop offset="100%" stopColor="#E67E22" />
        </linearGradient>
        <linearGradient id="goldInner" x1="4" y1="4" x2="28" y2="28" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FFF4B8" />
          <stop offset="40%" stopColor="#FFC837" />
          <stop offset="100%" stopColor="#D4AC0D" />
        </linearGradient>
        <filter id="goldShine" x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow dx="0" dy="1" stdDeviation="1" floodColor="#B7950B" floodOpacity="0.4" />
        </filter>
      </defs>
      {/* Outer Rim */}
      <circle cx="16" cy="16" r="15" fill="url(#goldOuter)" stroke="#F39C12" strokeWidth="1" filter="url(#goldShine)" />
      {/* Inner Ring */}
      <circle cx="16" cy="16" r="12" fill="url(#goldInner)" stroke="#FFF" strokeWidth="0.8" strokeOpacity="0.6" />
      {/* Dollar Mark */}
      <path
        d="M16 7.5V24.5M12.5 11C12.5 9.5 14 8.5 16 8.5C18.5 8.5 19.5 9.7 19.5 11.3C19.5 14 12.5 14 12.5 16.7C12.5 18.5 14 19.5 16 19.5C18.5 19.5 19.5 18.3 19.5 17"
        stroke="#7D6608"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M16 7.5V24.5M12.5 11C12.5 9.5 14 8.5 16 8.5C18.5 8.5 19.5 9.7 19.5 11.3C19.5 14 12.5 14 12.5 16.7C12.5 18.5 14 19.5 16 19.5C18.5 19.5 19.5 18.3 19.5 17"
        stroke="#FFF5C0"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Glossy Highlight */}
      <path d="M7 11C9 8 13 6 17 6.5C14 7.5 9 10 7 11Z" fill="white" opacity="0.65" />
    </svg>
  );
}
