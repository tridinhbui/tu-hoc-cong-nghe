"use client";

import React from "react";
import { motion } from "framer-motion";
import { DEFAULT_AVATAR_CONFIG, type AvatarConfig } from "@/lib/avatar-customizer-types";

interface Avatar2DCanvasProps {
  config?: AvatarConfig;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  className?: string;
  animated?: boolean;
  showBackground?: boolean;
}

export default function Avatar2DCanvas({
  config = DEFAULT_AVATAR_CONFIG,
  size = "md",
  className = "",
  animated = false,
  showBackground = true,
}: Avatar2DCanvasProps) {
  const mergedConfig: AvatarConfig = { ...DEFAULT_AVATAR_CONFIG, ...config };
  const {
    gender,
    skinTone,
    hairStyle,
    hairColor,
    faceShape,
    eyeExpression,
    glasses,
    beard,
    outfitStyle,
    outfitColor,
    accessory,
    background,
  } = mergedConfig;

  // Size Dimensions
  const dimensionMap = {
    xs: "w-11 h-11",
    sm: "w-20 h-20",
    md: "w-36 h-36",
    lg: "w-56 h-56",
    xl: "w-72 h-72",
  };
  const dimensions = dimensionMap[size] || dimensionMap.md;

  // Render Background SVG Fill
  const renderBackgroundFill = () => {
    if (!showBackground) return null;
    switch (background) {
      case "penthouse-office":
        return (
          <g>
            <rect width="200" height="200" fill="url(#penthouseBg)" />
            <path d="M0 140 L200 140 M40 0 L40 200 M160 0 L160 200" stroke="#FFFFFF" strokeWidth="0.8" opacity="0.25" />
            <circle cx="100" cy="50" r="30" fill="#FFFFFF" opacity="0.1" />
          </g>
        );
      case "gold-vault":
        return (
          <g>
            <rect width="200" height="200" fill="url(#goldVaultBg)" />
            <circle cx="40" cy="40" r="18" fill="#F59E0B" opacity="0.3" />
            <circle cx="160" cy="150" r="22" fill="#F59E0B" opacity="0.25" />
            <circle cx="170" cy="40" r="12" fill="#FBBF24" opacity="0.4" />
          </g>
        );
      case "neon-broadway":
        return (
          <g>
            <rect width="200" height="200" fill="url(#neonBg)" />
            <path d="M0 50 L200 50 M0 100 L200 100 M0 150 L200 150" stroke="#00F0FF" strokeWidth="1" opacity="0.2" />
            <path d="M50 0 L50 200 M100 0 L100 200 M150 0 L150 200" stroke="#EC4899" strokeWidth="1" opacity="0.2" />
          </g>
        );
      case "zen-garden":
        return (
          <g>
            <rect width="200" height="200" fill="url(#zenBg)" />
            <circle cx="100" cy="100" r="85" fill="#10B981" opacity="0.15" />
          </g>
        );
      case "minimal-gradient":
        return <rect width="200" height="200" fill="url(#minimalBg)" />;
      case "wallstreet-trading-floor":
      default:
        return (
          <g>
            <rect width="200" height="200" fill="url(#wallstreetBg)" />
            {/* Ticker candlestick chart lines in background */}
            <path d="M10 160 L30 140 L50 150 L80 110 L110 120 L140 80 L170 90 L190 60" stroke="#10B981" strokeWidth="2.5" fill="none" opacity="0.4" />
            <path d="M10 170 L40 165 L70 175 L100 160 L130 168 L170 155 L190 145" stroke="#F59E0B" strokeWidth="1.5" fill="none" strokeDasharray="3 3" opacity="0.3" />
          </g>
        );
    }
  };

  // Render Face Shape Path
  const renderFaceShape = () => {
    switch (faceShape) {
      case "square":
        return <path d="M65 80 C65 60, 135 60, 135 80 L132 125 C130 142, 115 150, 100 150 C85 150, 70 142, 68 125 Z" fill={skinTone} stroke="#000000" strokeWidth="1.5" strokeOpacity="0.15" />;
      case "round":
        return <path d="M64 80 C64 55, 136 55, 136 80 L133 120 C130 145, 115 152, 100 152 C85 152, 70 145, 67 120 Z" fill={skinTone} stroke="#000000" strokeWidth="1.5" strokeOpacity="0.15" />;
      case "heart":
        return <path d="M66 80 C66 58, 134 58, 134 80 L131 120 C125 142, 110 154, 100 154 C90 154, 75 142, 69 120 Z" fill={skinTone} stroke="#000000" strokeWidth="1.5" strokeOpacity="0.15" />;
      case "oval":
      default:
        return <path d="M66 80 C66 58, 134 58, 134 80 L131 122 C127 144, 114 151, 100 151 C86 151, 73 144, 69 122 Z" fill={skinTone} stroke="#000000" strokeWidth="1.5" strokeOpacity="0.15" />;
    }
  };

  // Render Hair Path
  const renderHair = () => {
    switch (hairStyle) {
      case "fade-cut":
        return (
          <g fill={hairColor}>
            <path d="M64 82 C64 54, 136 54, 136 82 C136 70, 125 58, 100 58 C75 58, 64 70, 64 82 Z" />
            <path d="M68 62 C80 50, 120 50, 132 62 C125 54, 110 48, 100 48 C90 48, 75 54, 68 62 Z" opacity="0.9" />
          </g>
        );
      case "wavy-medium":
        return (
          <g fill={hairColor}>
            <path d="M60 85 C55 60, 70 42, 100 42 C130 42, 145 60, 140 85 C145 75, 138 52, 100 50 C62 52, 55 75, 60 85 Z" />
            <path d="M58 85 C52 95, 62 110, 64 120 C66 100, 60 90, 64 80 Z" />
            <path d="M142 85 C148 95, 138 110, 136 120 C134 100, 140 90, 136 80 Z" />
          </g>
        );
      case "bob-cut":
        return (
          <g fill={hairColor}>
            <path d="M62 80 C60 50, 140 50, 138 80 L142 125 C142 135, 135 140, 130 135 C132 115, 135 90, 135 75 C120 56, 80 56, 65 75 C65 90, 68 115, 70 135 C65 140, 58 135, 58 125 Z" />
          </g>
        );
      case "long-curly":
        return (
          <g fill={hairColor}>
            <path d="M60 80 C58 46, 142 46, 140 80 L146 150 C146 160, 136 160, 134 145 L135 75 C120 54, 80 54, 65 75 L66 145 C64 160, 54 160, 54 150 Z" />
            <circle cx="58" cy="110" r="8" opacity="0.4" />
            <circle cx="142" cy="110" r="8" opacity="0.4" />
          </g>
        );
      case "ponytail":
        return (
          <g fill={hairColor}>
            <path d="M63 80 C63 52, 137 52, 137 80 C137 68, 125 55, 100 55 C75 55, 63 68, 63 80 Z" />
            {/* Ponytail back */}
            <path d="M135 70 C155 75, 165 95, 160 120 C152 110, 148 90, 135 80 Z" />
          </g>
        );
      case "buzz-cut":
        return <path d="M66 78 C66 58, 134 58, 134 78 C134 70, 124 62, 100 62 C76 62, 66 70, 66 78 Z" fill={hairColor} opacity="0.75" />;
      case "afro":
        return (
          <g fill={hairColor}>
            <circle cx="100" cy="72" r="46" />
            <circle cx="64" cy="80" r="22" />
            <circle cx="136" cy="80" r="22" />
          </g>
        );
      case "short-classic":
        return (
          <g fill={hairColor}>
            <path d="M64 80 C64 55, 136 55, 136 80 C136 72, 128 60, 100 60 C72 60, 64 72, 64 80 Z" />
            <path d="M64 76 Q80 68 100 74 Q120 68 136 76 Q125 64 100 64 Q75 64 64 76 Z" opacity="0.9" />
          </g>
        );
      case "business-slick":
      default:
        return (
          <g fill={hairColor}>
            <path d="M63 80 C60 52, 140 52, 137 80 C137 65, 125 54, 100 54 C75 54, 63 65, 63 80 Z" />
            {/* Sleek shine lines */}
            <path d="M72 66 Q100 58 128 66" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" opacity="0.3" fill="none" />
            <path d="M80 61 Q100 55 120 61" stroke="#FFFFFF" strokeWidth="1" strokeLinecap="round" opacity="0.25" fill="none" />
          </g>
        );
    }
  };

  // Render Eye Expression
  const renderEyes = () => {
    switch (eyeExpression) {
      case "sharp":
        return (
          <g fill="#1F2937">
            {/* Eyebrows */}
            <path d="M74 94 L92 92" stroke="#1F2937" strokeWidth="2.5" strokeLinecap="round" />
            <path d="M126 92 L108 94" stroke="#1F2937" strokeWidth="2.5" strokeLinecap="round" />
            {/* Eyes */}
            <ellipse cx="83" cy="102" rx="5.5" ry="4" />
            <ellipse cx="117" cy="102" rx="5.5" ry="4" />
            <circle cx="84" cy="101" r="1.5" fill="#FFFFFF" />
            <circle cx="118" cy="101" r="1.5" fill="#FFFFFF" />
          </g>
        );
      case "focused":
        return (
          <g fill="#1F2937">
            <path d="M74 93 L92 95" stroke="#1F2937" strokeWidth="2.5" strokeLinecap="round" />
            <path d="M126 93 L108 95" stroke="#1F2937" strokeWidth="2.5" strokeLinecap="round" />
            <circle cx="83" cy="102" r="4.5" />
            <circle cx="117" cy="102" r="4.5" />
            <circle cx="84.5" cy="100.5" r="1.5" fill="#FFFFFF" />
            <circle cx="118.5" cy="100.5" r="1.5" fill="#FFFFFF" />
          </g>
        );
      case "cheerful":
        return (
          <g stroke="#1F2937" strokeWidth="2.5" strokeLinecap="round" fill="none">
            <path d="M74 93 Q83 89 92 93" />
            <path d="M108 93 Q117 89 126 93" />
            <path d="M77 103 Q83 97 89 103" />
            <path d="M111 103 Q117 97 123 103" />
          </g>
        );
      case "cool":
        return (
          <g fill="#1F2937">
            <path d="M74 92 L92 92" stroke="#1F2937" strokeWidth="2.5" strokeLinecap="round" />
            <path d="M108 92 L126 90" stroke="#1F2937" strokeWidth="2.5" strokeLinecap="round" />
            <ellipse cx="83" cy="101" rx="5" ry="3.5" />
            <ellipse cx="117" cy="101" rx="5" ry="3.5" />
            <circle cx="84" cy="100" r="1.5" fill="#FFFFFF" />
            <circle cx="118" cy="100" r="1.5" fill="#FFFFFF" />
          </g>
        );
      case "confident":
      default:
        return (
          <g fill="#1F2937">
            <path d="M74 92 Q83 90 92 93" stroke="#1F2937" strokeWidth="2.5" strokeLinecap="round" fill="none" />
            <path d="M108 93 Q117 90 126 92" stroke="#1F2937" strokeWidth="2.5" strokeLinecap="round" fill="none" />
            <circle cx="83" cy="102" r="5" />
            <circle cx="117" cy="102" r="5" />
            <circle cx="84.5" cy="100.5" r="1.8" fill="#FFFFFF" />
            <circle cx="118.5" cy="100.5" r="1.8" fill="#FFFFFF" />
          </g>
        );
    }
  };

  // Render Beard Path (for male)
  const renderBeard = () => {
    if (gender !== "male" || beard === "none") return null;
    switch (beard) {
      case "stubble":
        return <path d="M76 128 C80 144, 120 144, 124 128 C120 146, 80 146, 76 128 Z" fill="#1F2937" opacity="0.3" />;
      case "gentleman-mustache":
        return <path d="M86 124 Q100 120 114 124 Q100 129 86 124 Z" fill="#1F2937" />;
      case "full-beard":
        return <path d="M72 118 C70 148, 130 148, 128 118 C124 153, 76 153, 72 118 Z" fill={hairColor} opacity="0.9" />;
      case "goatee":
        return (
          <g fill={hairColor}>
            <path d="M88 123 Q100 120 112 123 Q100 127 88 123 Z" />
            <path d="M92 132 C92 148, 108 148, 108 132 Z" />
          </g>
        );
      default:
        return null;
    }
  };

  // Render Glasses Path
  const renderGlasses = () => {
    if (glasses === "none") return null;
    switch (glasses) {
      case "gold-aviator":
        return (
          <g stroke="#D4AF37" strokeWidth="2" fill="none">
            <path d="M70 100 C70 93, 93 93, 93 100 C93 112, 70 112, 70 100 Z" fill="#D4AF37" fillOpacity="0.2" />
            <path d="M107 100 C107 93, 130 93, 130 100 C130 112, 107 112, 107 100 Z" fill="#D4AF37" fillOpacity="0.2" />
            <line x1="93" y1="98" x2="107" y2="98" strokeWidth="2.5" />
            <line x1="62" y1="97" x2="70" y2="99" strokeWidth="2" />
            <line x1="130" y1="99" x2="138" y2="97" strokeWidth="2" />
          </g>
        );
      case "analyst-round":
        return (
          <g stroke="#374151" strokeWidth="2" fill="none">
            <circle cx="83" cy="101" r="11" fill="#FFFFFF" fillOpacity="0.3" />
            <circle cx="117" cy="101" r="11" fill="#FFFFFF" fillOpacity="0.3" />
            <line x1="94" y1="101" x2="106" y2="101" strokeWidth="2.5" />
          </g>
        );
      case "tech-blue":
        return (
          <g stroke="#3B82F6" strokeWidth="2" fill="#3B82F6" fillOpacity="0.25">
            <rect x="71" y="94" width="24" height="15" rx="3" />
            <rect x="105" y="94" width="24" height="15" rx="3" />
            <line x1="95" y1="100" x2="105" y2="100" stroke="#3B82F6" strokeWidth="2" />
          </g>
        );
      case "cyber-hud":
        return (
          <g fill="#00F0FF" fillOpacity="0.4" stroke="#00F0FF" strokeWidth="1.5">
            <path d="M68 94 L132 94 L128 110 L72 110 Z" />
            <line x1="68" y1="102" x2="132" y2="102" stroke="#FFFFFF" strokeWidth="1" opacity="0.8" />
          </g>
        );
      case "classic-black":
      default:
        return (
          <g stroke="#111827" strokeWidth="2.5" fill="#FFFFFF" fillOpacity="0.2">
            <rect x="71" y="94" width="24" height="15" rx="4" />
            <rect x="105" y="94" width="24" height="15" rx="4" />
            <line x1="95" y1="100" x2="105" y2="100" stroke="#111827" strokeWidth="3" />
            <line x1="64" y1="98" x2="71" y2="99" stroke="#111827" strokeWidth="2" />
            <line x1="129" y1="99" x2="136" y2="98" stroke="#111827" strokeWidth="2" />
          </g>
        );
    }
  };

  // Render Outfit Path
  const renderOutfit = () => {
    switch (outfitStyle) {
      case "executive-vest":
        return (
          <g>
            {/* White Shirt base */}
            <path d="M40 160 L160 160 L150 200 L50 200 Z" fill="#FFFFFF" />
            {/* Tie */}
            <path d="M96 150 L104 150 L107 190 L100 200 L93 190 Z" fill="#991B1B" />
            {/* Vest jacket */}
            <path d="M40 160 L78 150 L100 185 L122 150 L160 160 L155 200 L45 200 Z" fill={outfitColor} />
          </g>
        );
      case "trader-hoodie":
        return (
          <g fill={outfitColor}>
            <path d="M35 155 C55 145, 145 145, 165 155 L160 200 L40 200 Z" />
            {/* Hoodie Collar & Drawstrings */}
            <path d="M75 146 Q100 165 125 146" fill="none" stroke="#000000" strokeWidth="3" opacity="0.3" />
            <line x1="92" y1="160" x2="92" y2="185" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" opacity="0.8" />
            <line x1="108" y1="160" x2="108" y2="185" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" opacity="0.8" />
          </g>
        );
      case "cfo-blazer":
        return (
          <g>
            <path d="M40 160 L160 160 L150 200 L50 200 Z" fill="#F8FAFC" />
            {/* Golden Brooch */}
            <circle cx="70" cy="170" r="4" fill="#F59E0B" />
            {/* Double breasted blazer */}
            <path d="M38 155 L75 145 L100 178 L125 145 L162 155 L155 200 L45 200 Z" fill={outfitColor} />
            <circle cx="92" cy="180" r="2.5" fill="#D4AF37" />
            <circle cx="108" cy="180" r="2.5" fill="#D4AF37" />
          </g>
        );
      case "casual-shirt":
        return (
          <g fill={outfitColor}>
            <path d="M40 155 Q100 145 160 155 L152 200 L48 200 Z" />
            <path d="M85 146 L100 160 L115 146" fill="none" stroke="#FFFFFF" strokeWidth="2" opacity="0.4" />
          </g>
        );
      case "cyber-trader":
        return (
          <g fill={outfitColor}>
            <path d="M38 155 L162 155 L154 200 L46 200 Z" />
            {/* Glowing Core */}
            <circle cx="100" cy="175" r="10" fill="#00F0FF" />
            <path d="M70 165 L130 165 M75 185 L125 185" stroke="#00F0FF" strokeWidth="2" opacity="0.8" />
          </g>
        );
      case "wall-st-suit":
      default:
        return (
          <g>
            {/* Inner White Shirt */}
            <path d="M40 160 L160 160 L150 200 L50 200 Z" fill="#FFFFFF" />
            {/* Red/Gold Wall St Tie */}
            <path d="M96 148 L104 148 L107 195 L100 202 L93 195 Z" fill="#B91C1C" />
            {/* Suit Jacket */}
            <path d="M38 155 L74 146 L95 182 L100 182 L105 182 L126 146 L162 155 L155 200 L45 200 Z" fill={outfitColor} />
            {/* Lapel lines */}
            <path d="M74 146 L95 182" stroke="#000000" strokeWidth="1.5" opacity="0.3" />
            <path d="M126 146 L105 182" stroke="#000000" strokeWidth="1.5" opacity="0.3" />
          </g>
        );
    }
  };

  // Render Accessory Overlay
  const renderAccessory = () => {
    if (accessory === "none") return null;
    switch (accessory) {
      case "cfo-crown":
        return (
          <motion.g animate={animated ? { y: [-2, 2, -2] } : {}} transition={{ repeat: Infinity, duration: 2 }}>
            {/* Crown */}
            <path d="M72 46 L82 26 L100 40 L118 26 L128 46 Z" fill="#F59E0B" stroke="#B45309" strokeWidth="1.5" />
            <circle cx="82" cy="26" r="3" fill="#EF4444" />
            <circle cx="100" cy="38" r="3.5" fill="#3B82F6" />
            <circle cx="118" cy="26" r="3" fill="#10B981" />
          </motion.g>
        );
      case "rolex-watch":
        return (
          <g>
            <circle cx="168" cy="168" r="14" fill="#D4AF37" stroke="#92400E" strokeWidth="1.5" />
            <circle cx="168" cy="168" r="11" fill="#065F46" />
            <line x1="168" y1="168" x2="168" y2="162" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" />
            <line x1="168" y1="168" x2="173" y2="168" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" />
          </g>
        );
      case "valuation-pen":
        return (
          <g transform="rotate(-30 150 140)">
            <rect x="145" y="110" width="8" height="40" rx="2" fill="#F59E0B" stroke="#B45309" strokeWidth="1" />
            <polygon points="145,150 153,150 149,160" fill="#1E293B" />
          </g>
        );
      case "trophy-cup":
        return (
          <g transform="translate(145, 135) scale(0.6)">
            <path d="M10 10 L40 10 L35 40 Q25 55 15 40 Z" fill="#F59E0B" stroke="#B45309" strokeWidth="2" />
            <rect x="21" y="52" width="8" height="15" fill="#D4AF37" />
            <rect x="15" y="66" width="20" height="8" rx="2" fill="#78350F" />
          </g>
        );
      case "coffee-cup":
        return (
          <g transform="translate(148, 142) scale(0.65)">
            <rect x="10" y="10" width="25" height="35" rx="3" fill="#FFFFFF" stroke="#D1D5DB" strokeWidth="1.5" />
            <rect x="8" y="22" width="29" height="12" fill="#047857" />
            <path d="M35 18 C42 18, 42 32, 35 32" stroke="#FFFFFF" strokeWidth="2" fill="none" />
          </g>
        );
      default:
        return null;
    }
  };

  return (
    <div className={`relative shrink-0 flex items-center justify-center rounded-full overflow-hidden ${dimensions} ${className}`}>
      <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-md">
        <defs>
          {/* Gradients */}
          <linearGradient id="wallstreetBg" x1="0" y1="0" x2="200" y2="200" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#0F172A" />
            <stop offset="100%" stopColor="#1E293B" />
          </linearGradient>
          <linearGradient id="penthouseBg" x1="0" y1="0" x2="200" y2="200" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#1E3A8A" />
            <stop offset="100%" stopColor="#3B82F6" />
          </linearGradient>
          <linearGradient id="goldVaultBg" x1="0" y1="0" x2="200" y2="200" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#78350F" />
            <stop offset="100%" stopColor="#D97706" />
          </linearGradient>
          <linearGradient id="neonBg" x1="0" y1="0" x2="200" y2="200" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#312E81" />
            <stop offset="100%" stopColor="#581C87" />
          </linearGradient>
          <linearGradient id="zenBg" x1="0" y1="0" x2="200" y2="200" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#064E3B" />
            <stop offset="100%" stopColor="#047857" />
          </linearGradient>
          <linearGradient id="minimalBg" x1="0" y1="0" x2="200" y2="200" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#334155" />
            <stop offset="100%" stopColor="#0F172A" />
          </linearGradient>
        </defs>

        {/* 1. Background Layer */}
        {renderBackgroundFill()}

        {/* 2. Body Neck Layer */}
        <path d="M86 130 L114 130 L118 160 L82 160 Z" fill={skinTone} />

        {/* 3. Outfit Layer */}
        {renderOutfit()}

        {/* 4. Head & Face Layer */}
        {renderFaceShape()}

        {/* Ears */}
        <ellipse cx="64" cy="102" rx="4" ry="7" fill={skinTone} stroke="#000000" strokeWidth="1" strokeOpacity="0.1" />
        <ellipse cx="136" cy="102" rx="4" ry="7" fill={skinTone} stroke="#000000" strokeWidth="1" strokeOpacity="0.1" />

        {/* Nose & Mouth */}
        <path d="M100 106 L98 116 L103 116" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.2" fill="none" />
        <path d="M92 128 Q100 134 108 128" stroke="#1F2937" strokeWidth="2" strokeLinecap="round" fill="none" />

        {/* 5. Eyes & Expression */}
        {renderEyes()}

        {/* 6. Beard (male) */}
        {renderBeard()}

        {/* 7. Hair Layer */}
        {renderHair()}

        {/* 8. Glasses Layer */}
        {renderGlasses()}

        {/* 9. Accessory Layer */}
        {renderAccessory()}
      </svg>
    </div>
  );
}
