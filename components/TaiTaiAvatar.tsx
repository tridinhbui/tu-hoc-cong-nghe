"use client";

import React from "react";

interface TaiTaiAvatarProps {
  size?: number;
  className?: string;
}

export default function TaiTaiAvatar({ size = 32, className = "" }: TaiTaiAvatarProps) {
  return (
    <div
      className={`relative select-none flex-shrink-0 flex items-center justify-center ${className}`}
      style={{ width: size, height: size }}
    >
      <svg
        viewBox="0 0 100 100"
        className="w-full h-full drop-shadow-md"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Head gradients */}
          <linearGradient id="robotHeadGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#E2E8F0" />
            <stop offset="100%" stopColor="#CBD5E1" />
          </linearGradient>
          {/* Screen gradients */}
          <linearGradient id="robotScreenGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#1E293B" />
            <stop offset="100%" stopColor="#0F172A" />
          </linearGradient>
          {/* Eye glows */}
          <filter id="eyeGlow" x="-20%" y="-20%" width="140%" height="140%">
            <stop offset="0%" stopColor="#10B981" />
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
          {/* Antenna glows */}
          <filter id="lightGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        <style>{`
          @keyframes robot-float {
            0%, 100% { transform: translateY(0px) rotate(0deg); }
            50% { transform: translateY(-4px) rotate(1deg); }
          }
          @keyframes eye-blink {
            0%, 48%, 52%, 100% { transform: scaleY(1); }
            50% { transform: scaleY(0.1); }
          }
          @keyframes antenna-pulse {
            0%, 100% { fill: #10B981; filter: drop-shadow(0 0 1px #10B981); }
            50% { fill: #34D399; filter: drop-shadow(0 0 5px #34D399); }
          }
          @keyframes cheek-pulse {
            0%, 100% { opacity: 0.4; }
            50% { opacity: 0.8; }
          }
          @keyframes ear-wiggle {
            0%, 100% { transform: rotate(0deg); }
            50% { transform: rotate(-5deg); }
          }
          @keyframes ear-wiggle-r {
            0%, 100% { transform: rotate(0deg); }
            50% { transform: rotate(5deg); }
          }
          
          .robot-container {
            transform-origin: center bottom;
            animation: robot-float 4s ease-in-out infinite;
          }
          .eye-left, .eye-right {
            transform-origin: 35px 50px;
            animation: eye-blink 5s ease-in-out infinite;
          }
          .eye-right {
            transform-origin: 65px 50px;
          }
          .antenna-light {
            animation: antenna-pulse 2s ease-in-out infinite;
          }
          .robot-cheek {
            animation: cheek-pulse 3s ease-in-out infinite;
          }
          .ear-left {
            transform-origin: 15px 52px;
            animation: ear-wiggle 4s ease-in-out infinite;
          }
          .ear-right {
            transform-origin: 85px 52px;
            animation: ear-wiggle-r 4s ease-in-out infinite;
          }
        `}</style>

        <g className="robot-container">
          {/* Antenna */}
          <path d="M50 25 V12" stroke="#94A3B8" strokeWidth="4" strokeLinecap="round" />
          <circle cx="50" cy="10" r="6" className="antenna-light" fill="#10B981" filter="url(#lightGlow)" />

          {/* Ears */}
          <g className="ear-left">
            <rect x="10" y="44" width="6" height="16" rx="2" fill="#94A3B8" />
            <circle cx="13" cy="52" r="3" fill="#64748B" />
          </g>
          <g className="ear-right">
            <rect x="84" y="44" width="6" height="16" rx="2" fill="#94A3B8" />
            <circle cx="87" cy="52" r="3" fill="#64748B" />
          </g>

          {/* Head Body */}
          <rect x="15" y="24" width="70" height="56" rx="22" fill="url(#robotHeadGrad)" stroke="#CBD5E1" strokeWidth="2.5" />
          <rect x="19" y="28" width="62" height="48" rx="18" fill="#FFFFFF" opacity="0.3" />

          {/* Dark Glass Screen */}
          <rect x="23" y="32" width="54" height="40" rx="12" fill="url(#robotScreenGrad)" stroke="#475569" strokeWidth="1.5" />

          {/* Cute Screen Shine */}
          <path d="M27 36 L45 36" stroke="#475569" strokeWidth="1" strokeLinecap="round" opacity="0.5" />

          {/* Glowing Green LED Eyes */}
          <g filter="url(#eyeGlow)">
            {/* Left Eye: Cute Curved Arch (happy look) */}
            <path
              className="eye-left"
              d="M31 46 C32 42, 38 42, 39 46 C40 48, 30 48, 31 46 Z"
              fill="#10B981"
            />
            {/* Right Eye: Cute Curved Arch */}
            <path
              className="eye-right"
              d="M61 46 C62 42, 68 42, 69 46 C70 48, 60 48, 61 46 Z"
              fill="#10B981"
            />
          </g>

          {/* Cute glowing cheeks */}
          <circle cx="29" cy="58" r="3" className="robot-cheek" fill="#38BDF8" opacity="0.6" filter="url(#lightGlow)" />
          <circle cx="71" cy="58" r="3" className="robot-cheek" fill="#38BDF8" opacity="0.6" filter="url(#lightGlow)" />

          {/* Cute Little Smile */}
          <path
            d="M46 56 Q50 60 54 56"
            stroke="#10B981"
            strokeWidth="2.5"
            strokeLinecap="round"
            fill="none"
            filter="url(#eyeGlow)"
          />
        </g>
      </svg>
    </div>
  );
}
