"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  X, Sparkles, RefreshCw, Dices, Save, User, Scissors, Glasses as GlassesIcon, 
  Shirt, Crown, Image as ImageIcon, Check, Lock 
} from "lucide-react";
import { toast } from "sonner";
import Avatar2DCanvas from "@/components/Avatar2DCanvas";
import {
  DEFAULT_AVATAR_CONFIG,
  SKIN_TONES,
  HAIR_COLORS,
  OUTFIT_COLORS,
  HAIR_STYLES,
  FACE_SHAPES,
  EYE_EXPRESSIONS,
  GLASSES_OPTIONS,
  BEARD_OPTIONS,
  OUTFIT_STYLES,
  ACCESSORIES_OPTIONS,
  BACKGROUND_OPTIONS,
  AVATAR_PRESETS,
  type AvatarConfig,
} from "@/lib/avatar-customizer-types";
import { fetchUserAvatarConfig, saveUserAvatarConfig } from "@/lib/supabase-avatar";

interface CharacterCustomizerModalProps {
  userId?: string;
  userLevel?: number;
  isOpen: boolean;
  onClose: () => void;
  onSaved?: (newConfig: AvatarConfig) => void;
}

type CustomizerTab = "appearance" | "hair" | "face" | "outfit" | "accessories" | "background";

export default function CharacterCustomizerModal({
  userId,
  userLevel = 1,
  isOpen,
  onClose,
  onSaved,
}: CharacterCustomizerModalProps) {
  const [config, setConfig] = useState<AvatarConfig>(DEFAULT_AVATAR_CONFIG);
  const [initialConfig, setInitialConfig] = useState<AvatarConfig>(DEFAULT_AVATAR_CONFIG);
  const [activeTab, setActiveTab] = useState<CustomizerTab>("appearance");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (isOpen) {
      fetchUserAvatarConfig(userId).then((cfg) => {
        setConfig(cfg);
        setInitialConfig(cfg);
      });
    }
  }, [isOpen, userId]);

  if (!isOpen) return null;

  function updateConfig<K extends keyof AvatarConfig>(key: K, value: AvatarConfig[K]) {
    setConfig((prev) => ({ ...prev, [key]: value }));
  }

  function handleRandomize() {
    const randomGender = Math.random() > 0.5 ? "male" : "female";
    const randomSkin = SKIN_TONES[Math.floor(Math.random() * SKIN_TONES.length)].hex;
    const randomHairStyle = HAIR_STYLES[Math.floor(Math.random() * HAIR_STYLES.length)].id;
    const randomHairColor = HAIR_COLORS[Math.floor(Math.random() * HAIR_COLORS.length)].hex;
    const randomFace = FACE_SHAPES[Math.floor(Math.random() * FACE_SHAPES.length)].id;
    const randomEye = EYE_EXPRESSIONS[Math.floor(Math.random() * EYE_EXPRESSIONS.length)].id;
    const randomGlasses = GLASSES_OPTIONS[Math.floor(Math.random() * GLASSES_OPTIONS.length)].id;
    const randomBeard = randomGender === "male" ? BEARD_OPTIONS[Math.floor(Math.random() * BEARD_OPTIONS.length)].id : "none";
    const randomOutfit = OUTFIT_STYLES[Math.floor(Math.random() * OUTFIT_STYLES.length)].id;
    const randomOutfitColor = OUTFIT_COLORS[Math.floor(Math.random() * OUTFIT_COLORS.length)].hex;
    const randomAcc = ACCESSORIES_OPTIONS[Math.floor(Math.random() * ACCESSORIES_OPTIONS.length)].id;
    const randomBg = BACKGROUND_OPTIONS[Math.floor(Math.random() * BACKGROUND_OPTIONS.length)].id;

    setConfig({
      gender: randomGender,
      skinTone: randomSkin,
      hairStyle: randomHairStyle,
      hairColor: randomHairColor,
      faceShape: randomFace,
      eyeExpression: randomEye,
      glasses: randomGlasses,
      beard: randomBeard,
      outfitStyle: randomOutfit,
      outfitColor: randomOutfitColor,
      accessory: randomAcc,
      background: randomBg,
    });

    toast.success("🎲 Đã tạo ngẫu nhiên diện mạo mới!");
  }

  function handleReset() {
    setConfig(initialConfig);
    toast.message("Đã khôi phục lại diện mạo ban đầu.");
  }

  async function handleSave() {
    setSaving(true);
    try {
      const ok = await saveUserAvatarConfig(userId, config);
      if (ok) {
        toast.success("🎉 Đã lưu cấu hình Nhân vật Avatar thành công!");
        onSaved?.(config);
        onClose();
      } else {
        toast.error("Không thể lưu cấu hình. Đã lưu tạm vào máy.");
      }
    } catch (e: any) {
      toast.error("Lỗi khi lưu avatar: " + e.message);
    } finally {
      setSaving(false);
    }
  }

  const tabs: { id: CustomizerTab; label: string; icon: React.ReactNode }[] = [
    { id: "appearance", label: "Diện Mạo", icon: <User className="w-4 h-4" /> },
    { id: "hair", label: "Kiểu Tóc", icon: <Scissors className="w-4 h-4" /> },
    { id: "face", label: "Gương Mặt", icon: <GlassesIcon className="w-4 h-4" /> },
    { id: "outfit", label: "Trang Phục", icon: <Shirt className="w-4 h-4" /> },
    { id: "accessories", label: "Phụ Kiện", icon: <Crown className="w-4 h-4" /> },
    { id: "background", label: "Bối Cảnh", icon: <ImageIcon className="w-4 h-4" /> },
  ];

  return (
    <AnimatePresence>
      <div className="fixed inset-0 bg-stone-950/85 backdrop-blur-md z-50 flex items-center justify-center p-3 sm:p-5">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          className="bg-stone-900 border-2 border-amber-500/60 rounded-3xl max-w-4xl w-full text-white shadow-2xl overflow-hidden flex flex-col max-h-[92vh]"
        >
          {/* Header Dialog */}
          <div className="flex items-center justify-between border-b border-stone-800 p-4 sm:p-5 bg-stone-950/80">
            <div>
              <span className="text-[10px] font-black uppercase tracking-widest text-amber-400 bg-amber-950/80 border border-amber-800 px-3 py-1 rounded-full">
                🎨 Wall Street Character Studio
              </span>
              <h2 className="text-lg sm:text-xl font-black text-white mt-1">
                Thiết Kế & Tùy Chỉnh Nhân Vật Avatar 2.5D
              </h2>
            </div>

            <button
              onClick={onClose}
              className="p-2 text-stone-400 hover:text-white rounded-full bg-stone-800 hover:bg-stone-700 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Main Grid: Left Preview / Right Controls */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-0 overflow-hidden flex-1">
            {/* LEFT PANEL: AVATAR LIVE PREVIEW */}
            <div className="md:col-span-5 bg-gradient-to-b from-stone-950 via-stone-900 to-stone-950 p-6 flex flex-col items-center justify-between border-b md:border-b-0 md:border-r border-stone-800 relative">
              <div className="text-center w-full">
                <span className="text-[10px] uppercase font-bold text-emerald-400 bg-emerald-950/60 border border-emerald-800 px-3 py-1 rounded-full">
                  ⚡ Live Real-time Preview
                </span>
              </div>

              {/* Large 2D Avatar Canvas */}
              <div className="my-4 relative">
                <Avatar2DCanvas config={config} size="xl" animated showBackground />
                <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-stone-950/90 border border-amber-500/60 text-amber-300 text-[10px] font-black px-3 py-0.5 rounded-full shadow-lg">
                  Level {userLevel} Trader
                </span>
              </div>

              {/* Preset Quick Selectors */}
              <div className="w-full space-y-2">
                <span className="text-[10px] uppercase font-extrabold text-stone-400 block text-center">
                  Mẫu Phối Sẵn (Presets):
                </span>
                <div className="grid grid-cols-3 gap-1.5">
                  {AVATAR_PRESETS.map((p) => (
                    <button
                      key={p.name}
                      onClick={() => setConfig(p.config)}
                      className="bg-stone-800 hover:bg-stone-800 border border-stone-700 hover:border-amber-400 text-stone-200 text-[10px] font-bold p-2 rounded-xl text-center transition-all flex flex-col items-center gap-1"
                    >
                      <span className="text-base">{p.icon}</span>
                      <span className="truncate w-full">{p.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* RIGHT PANEL: TABS & CONTROLS */}
            <div className="md:col-span-7 flex flex-col justify-between overflow-hidden bg-stone-900">
              {/* Category Tabs Header */}
              <div className="flex items-center overflow-x-auto scrollbar-none border-b border-stone-800 bg-stone-950/40 p-2 gap-1">
                {tabs.map((tab) => {
                  const isActive = activeTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold shrink-0 transition-all ${
                        isActive
                          ? "bg-amber-500 text-stone-950 shadow-md font-black"
                          : "text-stone-300 hover:bg-stone-800 hover:text-white"
                      }`}
                    >
                      {tab.icon}
                      <span>{tab.label}</span>
                    </button>
                  );
                })}
              </div>

              {/* Tab Options Content Scroll Area */}
              <div className="p-5 overflow-y-auto flex-1 space-y-6">
                {/* TAB 1: APPEARANCE */}
                {activeTab === "appearance" && (
                  <div className="space-y-6">
                    {/* Gender Selection */}
                    <div>
                      <label className="text-xs font-black uppercase text-amber-400 block mb-2">Giới Tính Nhân Vật</label>
                      <div className="grid grid-cols-2 gap-3">
                        <button
                          onClick={() => updateConfig("gender", "male")}
                          className={`p-3 rounded-2xl border-2 font-bold text-xs flex items-center justify-center gap-2 transition-all ${
                            config.gender === "male"
                              ? "bg-amber-500/20 border-amber-400 text-amber-300 font-black"
                              : "bg-stone-800 border-stone-800 text-stone-400 hover:border-stone-700"
                          }`}
                        >
                          <span className="text-lg">👨</span> Nam (Male)
                        </button>
                        <button
                          onClick={() => updateConfig("gender", "female")}
                          className={`p-3 rounded-2xl border-2 font-bold text-xs flex items-center justify-center gap-2 transition-all ${
                            config.gender === "female"
                              ? "bg-amber-500/20 border-amber-400 text-amber-300 font-black"
                              : "bg-stone-800 border-stone-800 text-stone-400 hover:border-stone-700"
                          }`}
                        >
                          <span className="text-lg">👩</span> Nữ (Female)
                        </button>
                      </div>
                    </div>

                    {/* Skin Tone Palette */}
                    <div>
                      <label className="text-xs font-black uppercase text-amber-400 block mb-2">Tông Màu Da</label>
                      <div className="grid grid-cols-4 sm:grid-cols-8 gap-2">
                        {SKIN_TONES.map((tone) => {
                          const isSelected = config.skinTone === tone.hex;
                          return (
                            <button
                              key={tone.id}
                              onClick={() => updateConfig("skinTone", tone.hex)}
                              className={`w-full aspect-square rounded-2xl border-2 flex items-center justify-center transition-all ${
                                isSelected ? "border-amber-400 scale-110 shadow-lg" : "border-stone-800 hover:scale-105"
                              }`}
                              style={{ backgroundColor: tone.hex }}
                              title={tone.label}
                            >
                              {isSelected && <Check className="w-4 h-4 text-stone-900 font-black" />}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                )}

                {/* TAB 2: HAIR */}
                {activeTab === "hair" && (
                  <div className="space-y-6">
                    {/* Hair Styles */}
                    <div>
                      <label className="text-xs font-black uppercase text-amber-400 block mb-2">Kiểu Tóc</label>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                        {HAIR_STYLES.map((h) => {
                          const isSelected = config.hairStyle === h.id;
                          return (
                            <button
                              key={h.id}
                              onClick={() => updateConfig("hairStyle", h.id)}
                              className={`p-3 rounded-2xl border-2 text-left text-xs font-bold transition-all flex items-center gap-2 ${
                                isSelected
                                  ? "bg-amber-500/20 border-amber-400 text-amber-300 font-black"
                                  : "bg-stone-800 border-stone-800 text-stone-300 hover:border-stone-700"
                              }`}
                            >
                              <span className="text-base">{h.iconEmoji}</span>
                              <span className="truncate">{h.label}</span>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Hair Color Palette */}
                    <div>
                      <label className="text-xs font-black uppercase text-amber-400 block mb-2">Màu Tóc</label>
                      <div className="grid grid-cols-4 sm:grid-cols-8 gap-2">
                        {HAIR_COLORS.map((c) => {
                          const isSelected = config.hairColor === c.hex;
                          return (
                            <button
                              key={c.id}
                              onClick={() => updateConfig("hairColor", c.hex)}
                              className={`w-full aspect-square rounded-2xl border-2 flex items-center justify-center transition-all ${
                                isSelected ? "border-amber-400 scale-110 shadow-lg" : "border-stone-800 hover:scale-105"
                              }`}
                              style={{ backgroundColor: c.hex }}
                              title={c.label}
                            >
                              {isSelected && <Check className="w-4 h-4 text-white font-black" />}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                )}

                {/* TAB 3: FACE & GLASSES */}
                {activeTab === "face" && (
                  <div className="space-y-6">
                    {/* Face Shape */}
                    <div>
                      <label className="text-xs font-black uppercase text-amber-400 block mb-2">Dáng Gương Mặt</label>
                      <div className="grid grid-cols-2 gap-2.5">
                        {FACE_SHAPES.map((f) => (
                          <button
                            key={f.id}
                            onClick={() => updateConfig("faceShape", f.id)}
                            className={`p-3 rounded-2xl border-2 text-left text-xs font-bold transition-all flex items-center gap-2 ${
                              config.faceShape === f.id
                                ? "bg-amber-500/20 border-amber-400 text-amber-300 font-black"
                                : "bg-stone-800 border-stone-800 text-stone-300 hover:border-stone-700"
                            }`}
                          >
                            <span>{f.iconEmoji}</span>
                            <span>{f.label}</span>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Eyes Expression */}
                    <div>
                      <label className="text-xs font-black uppercase text-amber-400 block mb-2">Biểu Cảm Mắt</label>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                        {EYE_EXPRESSIONS.map((e) => (
                          <button
                            key={e.id}
                            onClick={() => updateConfig("eyeExpression", e.id)}
                            className={`p-3 rounded-2xl border-2 text-left text-xs font-bold transition-all flex items-center gap-2 ${
                              config.eyeExpression === e.id
                                ? "bg-amber-500/20 border-amber-400 text-amber-300 font-black"
                                : "bg-stone-800 border-stone-800 text-stone-300 hover:border-stone-700"
                            }`}
                          >
                            <span>{e.iconEmoji}</span>
                            <span className="truncate">{e.label}</span>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Glasses */}
                    <div>
                      <label className="text-xs font-black uppercase text-amber-400 block mb-2">Kính Mắt</label>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                        {GLASSES_OPTIONS.map((g) => {
                          const isLocked = !!g.requiredLevel && userLevel < g.requiredLevel;
                          return (
                            <button
                              key={g.id}
                              disabled={Boolean(isLocked)}
                              onClick={() => updateConfig("glasses", g.id)}
                              className={`p-3 rounded-2xl border-2 text-left text-xs font-bold transition-all flex items-center justify-between gap-1 ${
                                config.glasses === g.id
                                  ? "bg-amber-500/20 border-amber-400 text-amber-300 font-black"
                                  : isLocked
                                  ? "bg-stone-950 border-stone-800 opacity-40 cursor-not-allowed text-stone-500"
                                  : "bg-stone-800 border-stone-800 text-stone-300 hover:border-stone-700"
                              }`}
                            >
                              <div className="flex items-center gap-2 truncate">
                                <span>{g.iconEmoji}</span>
                                <span className="truncate">{g.label}</span>
                              </div>
                              {isLocked && <Lock className="w-3.5 h-3.5 text-stone-500 shrink-0" />}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Beard (Male only) */}
                    {config.gender === "male" && (
                      <div>
                        <label className="text-xs font-black uppercase text-amber-400 block mb-2">Râu & Mustache</label>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                          {BEARD_OPTIONS.map((b) => (
                            <button
                              key={b.id}
                              onClick={() => updateConfig("beard", b.id)}
                              className={`p-3 rounded-2xl border-2 text-left text-xs font-bold transition-all flex items-center gap-2 ${
                                config.beard === b.id
                                  ? "bg-amber-500/20 border-amber-400 text-amber-300 font-black"
                                  : "bg-stone-800 border-stone-800 text-stone-300 hover:border-stone-700"
                              }`}
                            >
                              <span>{b.iconEmoji}</span>
                              <span className="truncate">{b.label}</span>
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* TAB 4: OUTFIT */}
                {activeTab === "outfit" && (
                  <div className="space-y-6">
                    {/* Outfit Style */}
                    <div>
                      <label className="text-xs font-black uppercase text-amber-400 block mb-2">Trang Phục Tài Chính</label>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                        {OUTFIT_STYLES.map((o) => {
                          const isLocked = !!o.requiredLevel && userLevel < o.requiredLevel;
                          return (
                            <button
                              key={o.id}
                              disabled={Boolean(isLocked)}
                              onClick={() => updateConfig("outfitStyle", o.id)}
                              className={`p-3.5 rounded-2xl border-2 text-left text-xs font-bold transition-all flex items-center justify-between gap-2 ${
                                config.outfitStyle === o.id
                                  ? "bg-amber-500/20 border-amber-400 text-amber-300 font-black"
                                  : isLocked
                                  ? "bg-stone-950 border-stone-800 opacity-40 cursor-not-allowed text-stone-500"
                                  : "bg-stone-800 border-stone-800 text-stone-300 hover:border-stone-700"
                              }`}
                            >
                              <div className="flex items-center gap-2">
                                <span className="text-lg">{o.iconEmoji}</span>
                                <span>{o.label}</span>
                              </div>
                              {isLocked && <Lock className="w-4 h-4 text-stone-500 shrink-0" />}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Outfit Color Palette */}
                    <div>
                      <label className="text-xs font-black uppercase text-amber-400 block mb-2">Màu Sắc Trang Phục</label>
                      <div className="grid grid-cols-4 sm:grid-cols-7 gap-2">
                        {OUTFIT_COLORS.map((c) => {
                          const isSelected = config.outfitColor === c.hex;
                          return (
                            <button
                              key={c.id}
                              onClick={() => updateConfig("outfitColor", c.hex)}
                              className={`w-full aspect-square rounded-2xl border-2 flex items-center justify-center transition-all ${
                                isSelected ? "border-amber-400 scale-110 shadow-lg" : "border-stone-800 hover:scale-105"
                              }`}
                              style={{ backgroundColor: c.hex }}
                              title={c.label}
                            >
                              {isSelected && <Check className="w-4 h-4 text-white font-black" />}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                )}

                {/* TAB 5: ACCESSORIES */}
                {activeTab === "accessories" && (
                  <div className="space-y-6">
                    <div>
                      <label className="text-xs font-black uppercase text-amber-400 block mb-2">Phụ Kiện & Biểu Tượng Thành Thự</label>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                        {ACCESSORIES_OPTIONS.map((a) => {
                          const isLocked = !!a.requiredLevel && userLevel < a.requiredLevel;
                          return (
                            <button
                              key={a.id}
                              disabled={Boolean(isLocked)}
                              onClick={() => updateConfig("accessory", a.id)}
                              className={`p-3.5 rounded-2xl border-2 text-left text-xs font-bold transition-all flex items-center justify-between gap-2 ${
                                config.accessory === a.id
                                  ? "bg-amber-500/20 border-amber-400 text-amber-300 font-black"
                                  : isLocked
                                  ? "bg-stone-950 border-stone-800 opacity-40 cursor-not-allowed text-stone-500"
                                  : "bg-stone-800 border-stone-800 text-stone-300 hover:border-stone-700"
                              }`}
                            >
                              <div className="flex items-center gap-2">
                                <span className="text-lg">{a.iconEmoji}</span>
                                <span>{a.label}</span>
                              </div>
                              {isLocked && <span className="text-[10px] font-bold text-amber-500">Mở ở Lv.{a.requiredLevel}</span>}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                )}

                {/* TAB 6: BACKGROUND */}
                {activeTab === "background" && (
                  <div className="space-y-6">
                    <div>
                      <label className="text-xs font-black uppercase text-amber-400 block mb-2">Bối Cảnh Nền Persona</label>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                        {BACKGROUND_OPTIONS.map((bg) => {
                          const isLocked = !!bg.requiredLevel && userLevel < bg.requiredLevel;
                          return (
                            <button
                              key={bg.id}
                              disabled={Boolean(isLocked)}
                              onClick={() => updateConfig("background", bg.id)}
                              className={`p-3.5 rounded-2xl border-2 text-left text-xs font-bold transition-all flex items-center justify-between gap-2 ${
                                config.background === bg.id
                                  ? "bg-amber-500/20 border-amber-400 text-amber-300 font-black"
                                  : isLocked
                                  ? "bg-stone-950 border-stone-800 opacity-40 cursor-not-allowed text-stone-500"
                                  : "bg-stone-800 border-stone-800 text-stone-300 hover:border-stone-700"
                              }`}
                            >
                              <div className="flex items-center gap-2">
                                <span className="text-lg">{bg.iconEmoji}</span>
                                <span>{bg.label}</span>
                              </div>
                              {isLocked && <span className="text-[10px] font-bold text-amber-500">Mở ở Lv.{bg.requiredLevel}</span>}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* ACTION CONTROL BUTTONS FOOTER */}
              <div className="p-4 border-t border-stone-800 bg-stone-950/90 flex items-center justify-between gap-3 flex-wrap">
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleRandomize}
                    className="bg-purple-950/80 hover:bg-purple-900 border border-purple-700 text-purple-200 text-xs font-bold px-3.5 py-2.5 rounded-xl transition-all flex items-center gap-1.5 cursor-pointer"
                  >
                    <Dices className="w-4 h-4 text-purple-400" /> Tua Ngẫu Nhiên
                  </button>
                  <button
                    onClick={handleReset}
                    className="bg-stone-800 hover:bg-stone-700 text-stone-300 text-xs font-bold px-3.5 py-2.5 rounded-xl transition-all flex items-center gap-1.5 cursor-pointer"
                  >
                    <RefreshCw className="w-3.5 h-3.5" /> Khôi Phục
                  </button>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={onClose}
                    className="bg-stone-800 hover:bg-stone-700 text-stone-300 text-xs font-bold px-4 py-2.5 rounded-xl transition-all cursor-pointer"
                  >
                    Hủy Bỏ
                  </button>
                  <button
                    onClick={handleSave}
                    disabled={saving}
                    className="bg-gradient-to-r from-amber-500 to-yellow-500 hover:brightness-110 text-stone-950 font-black text-xs px-5 py-2.5 rounded-xl transition-all shadow-lg flex items-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    <Save className="w-4 h-4" /> {saving ? "Đang Lưu..." : "Lưu Avatar Mới"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
