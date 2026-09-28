"use client";

import React, { useState, useEffect } from "react";
import { errorMessage } from "@/lib/errors";
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
import { fetchUserAvatarConfig, saveUserAvatarConfig } from "@/lib/cloudflare-avatar";
import { useI18n } from "@/lib/i18n/context";
import { format } from "@/lib/i18n";

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
  const { t } = useI18n();
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

    toast.success(t.characterCustomizer.toastRandomized);
  }

  function handleReset() {
    setConfig(initialConfig);
    toast.message(t.characterCustomizer.toastReset);
  }

  async function handleSave() {
    setSaving(true);
    try {
      const ok = await saveUserAvatarConfig(userId, config);
      if (ok) {
        toast.success(t.characterCustomizer.toastSaved);
        onSaved?.(config);
        onClose();
      } else {
        toast.error(t.characterCustomizer.toastSaveFailed);
      }
    } catch (e: unknown) {
      toast.error(format(t.characterCustomizer.toastSaveError, { error: errorMessage(e) }));
    } finally {
      setSaving(false);
    }
  }

  const tabs: { id: CustomizerTab; label: string; icon: React.ReactNode }[] = [
    { id: "appearance", label: t.characterCustomizer.tabAppearance, icon: <User className="w-4 h-4" /> },
    { id: "hair", label: t.characterCustomizer.tabHair, icon: <Scissors className="w-4 h-4" /> },
    { id: "face", label: t.characterCustomizer.tabFace, icon: <GlassesIcon className="w-4 h-4" /> },
    { id: "outfit", label: t.characterCustomizer.tabOutfit, icon: <Shirt className="w-4 h-4" /> },
    { id: "accessories", label: t.characterCustomizer.tabAccessories, icon: <Crown className="w-4 h-4" /> },
    { id: "background", label: t.characterCustomizer.tabBackground, icon: <ImageIcon className="w-4 h-4" /> },
  ];

  return (
    <AnimatePresence>
      <div className="fixed inset-0 bg-stone-950/85 z-50 flex items-center justify-center p-3 sm:p-5">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          className="bg-stone-900 border border-stone-700 rounded-md max-w-4xl w-full text-white overflow-hidden flex flex-col max-h-[92vh]"
        >
          {/* Header Dialog */}
          <div className="flex items-center justify-between border-b border-stone-800 p-4 sm:p-5 bg-stone-950">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-stone-300 border border-white/15 px-2 py-0.5 rounded-sm">
                {t.characterCustomizer.badge}
              </span>
              <h2 className="text-lg sm:text-xl font-black tracking-tight text-white mt-2">
                {t.characterCustomizer.title}
              </h2>
            </div>

            <button
              onClick={onClose}
              className="p-2 text-stone-400 hover:text-white rounded-sm border border-stone-700 hover:border-stone-500 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Main Grid: Left Preview / Right Controls */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-0 overflow-hidden flex-1">
            {/* LEFT PANEL: AVATAR LIVE PREVIEW */}
            <div className="md:col-span-5 bg-stone-950 p-6 flex flex-col items-center justify-between border-b md:border-b-0 md:border-r border-stone-800 relative">
              <div className="text-center w-full">
                <span className="inline-flex items-center gap-1.5 text-[10px] uppercase font-bold tracking-wider text-stone-300 border border-white/15 px-2 py-0.5 rounded-sm">
                  {t.characterCustomizer.livePreviewBadge}
                </span>
              </div>

              {/* Large 2D Avatar Canvas */}
              <div className="my-4 relative">
                <Avatar2DCanvas config={config} size="xl" animated showBackground />
                <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 whitespace-nowrap bg-stone-950 border border-stone-700 text-stone-200 text-[10px] font-bold tabular-nums px-2 py-0.5 rounded-sm">
                  {format(t.characterCustomizer.levelTrader, { level: userLevel })}
                </span>
              </div>

              {/* Preset Quick Selectors */}
              <div className="w-full space-y-2">
                <span className="text-[10px] uppercase font-bold tracking-wider text-stone-400 block text-center">
                  {t.characterCustomizer.presetsLabel}
                </span>
                <div className="grid grid-cols-3 gap-1.5">
                  {AVATAR_PRESETS.map((p) => (
                    <button
                      key={p.name}
                      onClick={() => setConfig(p.config)}
                      className="bg-stone-900 border border-stone-700 hover:border-stone-500 text-stone-200 text-[10px] font-bold p-2 rounded-sm text-center transition-colors flex flex-col items-center gap-1"
                    >
                      <span className="text-base">{p.icon}</span>
                      <span className="truncate w-full">{t.avatarPresets[p.name] ?? p.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* RIGHT PANEL: TABS & CONTROLS */}
            <div className="md:col-span-7 flex flex-col justify-between overflow-hidden bg-stone-900">
              {/* Category Tabs Header */}
              <div className="flex items-end overflow-x-auto scrollbar-none border-b border-stone-800 bg-stone-950 px-4 pt-3 gap-5">
                {tabs.map((tab) => {
                  const isActive = activeTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`-mb-px flex items-center gap-1.5 border-b-2 pb-2 text-xs font-bold shrink-0 transition-colors ${
                        isActive
                          ? "border-brand-400 text-white"
                          : "border-transparent text-stone-400 hover:text-white"
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
                      <label className="text-xs font-bold uppercase tracking-wider text-stone-400 block mb-2">{t.characterCustomizer.genderLabel}</label>
                      <div className="grid grid-cols-2 gap-3">
                        <button
                          onClick={() => updateConfig("gender", "male")}
                          className={`p-3 rounded-sm border font-bold text-xs flex items-center justify-center gap-2 transition-colors ${
                            config.gender === "male"
                              ? "bg-stone-950 border-brand-400 text-white"
                              : "bg-stone-900 border-stone-700 text-stone-300 hover:border-stone-500"
                          }`}
                        >
                          {t.characterCustomizer.genderMale}
                        </button>
                        <button
                          onClick={() => updateConfig("gender", "female")}
                          className={`p-3 rounded-sm border font-bold text-xs flex items-center justify-center gap-2 transition-colors ${
                            config.gender === "female"
                              ? "bg-stone-950 border-brand-400 text-white"
                              : "bg-stone-900 border-stone-700 text-stone-300 hover:border-stone-500"
                          }`}
                        >
                          {t.characterCustomizer.genderFemale}
                        </button>
                      </div>
                    </div>

                    {/* Skin Tone Palette */}
                    <div>
                      <label className="text-xs font-bold uppercase tracking-wider text-stone-400 block mb-2">{t.characterCustomizer.skinToneLabel}</label>
                      <div className="grid grid-cols-4 sm:grid-cols-8 gap-2">
                        {SKIN_TONES.map((tone) => {
                          const isSelected = config.skinTone === tone.hex;
                          return (
                            <button
                              key={tone.id}
                              onClick={() => updateConfig("skinTone", tone.hex)}
                              className={`w-full aspect-square rounded-sm border-2 flex items-center justify-center transition-colors ${
                                isSelected ? "border-brand-400" : "border-stone-800 hover:border-stone-500"
                              }`}
                              style={{ backgroundColor: tone.hex }}
                              title={t.avatarOptions.skinTones[tone.id] ?? tone.label}
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
                      <label className="text-xs font-bold uppercase tracking-wider text-stone-400 block mb-2">{t.characterCustomizer.hairStyleLabel}</label>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                        {HAIR_STYLES.map((h) => {
                          const isSelected = config.hairStyle === h.id;
                          return (
                            <button
                              key={h.id}
                              onClick={() => updateConfig("hairStyle", h.id)}
                              className={`p-3 rounded-sm border text-left text-xs font-bold transition-colors flex items-center gap-2 ${
                                isSelected
                                  ? "bg-stone-950 border-brand-400 text-white"
                                  : "bg-stone-900 border-stone-700 text-stone-300 hover:border-stone-500"
                              }`}
                            >
                              <span className="text-base">{h.iconEmoji}</span>
                              <span className="truncate">{t.avatarOptions.hairStyles[h.id] ?? h.label}</span>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Hair Color Palette */}
                    <div>
                      <label className="text-xs font-bold uppercase tracking-wider text-stone-400 block mb-2">{t.characterCustomizer.hairColorLabel}</label>
                      <div className="grid grid-cols-4 sm:grid-cols-8 gap-2">
                        {HAIR_COLORS.map((c) => {
                          const isSelected = config.hairColor === c.hex;
                          return (
                            <button
                              key={c.id}
                              onClick={() => updateConfig("hairColor", c.hex)}
                              className={`w-full aspect-square rounded-sm border-2 flex items-center justify-center transition-colors ${
                                isSelected ? "border-brand-400" : "border-stone-800 hover:border-stone-500"
                              }`}
                              style={{ backgroundColor: c.hex }}
                              title={t.avatarOptions.hairColors[c.id] ?? c.label}
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
                      <label className="text-xs font-bold uppercase tracking-wider text-stone-400 block mb-2">{t.characterCustomizer.faceShapeLabel}</label>
                      <div className="grid grid-cols-2 gap-2.5">
                        {FACE_SHAPES.map((f) => (
                          <button
                            key={f.id}
                            onClick={() => updateConfig("faceShape", f.id)}
                            className={`p-3 rounded-sm border text-left text-xs font-bold transition-colors flex items-center gap-2 ${
                              config.faceShape === f.id
                                ? "bg-stone-950 border-brand-400 text-white"
                                : "bg-stone-900 border-stone-700 text-stone-300 hover:border-stone-500"
                            }`}
                          >
                            <span>{f.iconEmoji}</span>
                            <span>{t.avatarOptions.faceShapes[f.id] ?? f.label}</span>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Eyes Expression */}
                    <div>
                      <label className="text-xs font-bold uppercase tracking-wider text-stone-400 block mb-2">{t.characterCustomizer.eyeExpressionLabel}</label>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                        {EYE_EXPRESSIONS.map((e) => (
                          <button
                            key={e.id}
                            onClick={() => updateConfig("eyeExpression", e.id)}
                            className={`p-3 rounded-sm border text-left text-xs font-bold transition-colors flex items-center gap-2 ${
                              config.eyeExpression === e.id
                                ? "bg-stone-950 border-brand-400 text-white"
                                : "bg-stone-900 border-stone-700 text-stone-300 hover:border-stone-500"
                            }`}
                          >
                            <span>{e.iconEmoji}</span>
                            <span className="truncate">{t.avatarOptions.eyeExpressions[e.id] ?? e.label}</span>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Glasses */}
                    <div>
                      <label className="text-xs font-bold uppercase tracking-wider text-stone-400 block mb-2">{t.characterCustomizer.glassesLabel}</label>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                        {GLASSES_OPTIONS.map((g) => {
                          const isLocked = !!g.requiredLevel && userLevel < g.requiredLevel;
                          return (
                            <button
                              key={g.id}
                              disabled={Boolean(isLocked)}
                              onClick={() => updateConfig("glasses", g.id)}
                              className={`p-3 rounded-sm border text-left text-xs font-bold transition-colors flex items-center justify-between gap-1 ${
                                config.glasses === g.id
                                  ? "bg-stone-950 border-brand-400 text-white"
                                  : isLocked
                                  ? "bg-stone-950 border-stone-800 opacity-40 cursor-not-allowed text-stone-500"
                                  : "bg-stone-900 border-stone-700 text-stone-300 hover:border-stone-500"
                              }`}
                            >
                              <div className="flex items-center gap-2 truncate">
                                <span>{g.iconEmoji}</span>
                                <span className="truncate">{t.avatarOptions.glasses[g.id] ?? g.label}</span>
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
                        <label className="text-xs font-bold uppercase tracking-wider text-stone-400 block mb-2">{t.characterCustomizer.beardLabel}</label>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                          {BEARD_OPTIONS.map((b) => (
                            <button
                              key={b.id}
                              onClick={() => updateConfig("beard", b.id)}
                              className={`p-3 rounded-sm border text-left text-xs font-bold transition-colors flex items-center gap-2 ${
                                config.beard === b.id
                                  ? "bg-stone-950 border-brand-400 text-white"
                                  : "bg-stone-900 border-stone-700 text-stone-300 hover:border-stone-500"
                              }`}
                            >
                              <span>{b.iconEmoji}</span>
                              <span className="truncate">{t.avatarOptions.beards[b.id] ?? b.label}</span>
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
                      <label className="text-xs font-bold uppercase tracking-wider text-stone-400 block mb-2">{t.characterCustomizer.outfitStyleLabel}</label>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                        {OUTFIT_STYLES.map((o) => {
                          const isLocked = !!o.requiredLevel && userLevel < o.requiredLevel;
                          return (
                            <button
                              key={o.id}
                              disabled={Boolean(isLocked)}
                              onClick={() => updateConfig("outfitStyle", o.id)}
                              className={`p-3.5 rounded-sm border text-left text-xs font-bold transition-colors flex items-center justify-between gap-2 ${
                                config.outfitStyle === o.id
                                  ? "bg-stone-950 border-brand-400 text-white"
                                  : isLocked
                                  ? "bg-stone-950 border-stone-800 opacity-40 cursor-not-allowed text-stone-500"
                                  : "bg-stone-900 border-stone-700 text-stone-300 hover:border-stone-500"
                              }`}
                            >
                              <div className="flex items-center gap-2">
                                <span className="text-lg">{o.iconEmoji}</span>
                                <span>{t.avatarOptions.outfitStyles[o.id] ?? o.label}</span>
                              </div>
                              {isLocked && <Lock className="w-4 h-4 text-stone-500 shrink-0" />}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Outfit Color Palette */}
                    <div>
                      <label className="text-xs font-bold uppercase tracking-wider text-stone-400 block mb-2">{t.characterCustomizer.outfitColorLabel}</label>
                      <div className="grid grid-cols-4 sm:grid-cols-7 gap-2">
                        {OUTFIT_COLORS.map((c) => {
                          const isSelected = config.outfitColor === c.hex;
                          return (
                            <button
                              key={c.id}
                              onClick={() => updateConfig("outfitColor", c.hex)}
                              className={`w-full aspect-square rounded-sm border-2 flex items-center justify-center transition-colors ${
                                isSelected ? "border-brand-400" : "border-stone-800 hover:border-stone-500"
                              }`}
                              style={{ backgroundColor: c.hex }}
                              title={t.avatarOptions.outfitColors[c.id] ?? c.label}
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
                      <label className="text-xs font-bold uppercase tracking-wider text-stone-400 block mb-2">{t.characterCustomizer.accessoriesLabel}</label>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                        {ACCESSORIES_OPTIONS.map((a) => {
                          const isLocked = !!a.requiredLevel && userLevel < a.requiredLevel;
                          return (
                            <button
                              key={a.id}
                              disabled={Boolean(isLocked)}
                              onClick={() => updateConfig("accessory", a.id)}
                              className={`p-3.5 rounded-sm border text-left text-xs font-bold transition-colors flex items-center justify-between gap-2 ${
                                config.accessory === a.id
                                  ? "bg-stone-950 border-brand-400 text-white"
                                  : isLocked
                                  ? "bg-stone-950 border-stone-800 opacity-40 cursor-not-allowed text-stone-500"
                                  : "bg-stone-900 border-stone-700 text-stone-300 hover:border-stone-500"
                              }`}
                            >
                              <div className="flex items-center gap-2">
                                <span className="text-lg">{a.iconEmoji}</span>
                                <span>{t.avatarOptions.accessories[a.id] ?? a.label}</span>
                              </div>
                              {isLocked && <span className="text-[10px] font-bold tabular-nums text-stone-400">{format(t.characterCustomizer.unlockAtLevel, { level: a.requiredLevel ?? 0 })}</span>}
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
                      <label className="text-xs font-bold uppercase tracking-wider text-stone-400 block mb-2">{t.characterCustomizer.backgroundLabel}</label>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                        {BACKGROUND_OPTIONS.map((bg) => {
                          const isLocked = !!bg.requiredLevel && userLevel < bg.requiredLevel;
                          return (
                            <button
                              key={bg.id}
                              disabled={Boolean(isLocked)}
                              onClick={() => updateConfig("background", bg.id)}
                              className={`p-3.5 rounded-sm border text-left text-xs font-bold transition-colors flex items-center justify-between gap-2 ${
                                config.background === bg.id
                                  ? "bg-stone-950 border-brand-400 text-white"
                                  : isLocked
                                  ? "bg-stone-950 border-stone-800 opacity-40 cursor-not-allowed text-stone-500"
                                  : "bg-stone-900 border-stone-700 text-stone-300 hover:border-stone-500"
                              }`}
                            >
                              <div className="flex items-center gap-2">
                                <span className="text-lg">{bg.iconEmoji}</span>
                                <span>{t.avatarOptions.backgrounds[bg.id] ?? bg.label}</span>
                              </div>
                              {isLocked && <span className="text-[10px] font-bold tabular-nums text-stone-400">{format(t.characterCustomizer.unlockAtLevel, { level: bg.requiredLevel ?? 0 })}</span>}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* ACTION CONTROL BUTTONS FOOTER */}
              <div className="p-4 border-t border-stone-800 bg-stone-950 flex items-center justify-between gap-3 flex-wrap">
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleRandomize}
                    className="border border-stone-600 hover:border-stone-300 text-stone-200 text-xs font-bold px-3.5 py-2.5 rounded-sm transition-colors flex items-center gap-1.5 cursor-pointer"
                  >
                    <Dices className="w-4 h-4 text-stone-400" /> {t.characterCustomizer.randomizeButton}
                  </button>
                  <button
                    onClick={handleReset}
                    className="border border-stone-600 hover:border-stone-300 text-stone-200 text-xs font-bold px-3.5 py-2.5 rounded-sm transition-colors flex items-center gap-1.5 cursor-pointer"
                  >
                    <RefreshCw className="w-3.5 h-3.5" /> {t.characterCustomizer.resetButton}
                  </button>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={onClose}
                    className="border border-stone-600 hover:border-stone-300 text-stone-200 text-xs font-bold px-4 py-2.5 rounded-sm transition-colors cursor-pointer"
                  >
                    {t.characterCustomizer.cancelButton}
                  </button>
                  <button
                    onClick={handleSave}
                    disabled={saving}
                    className="rounded-sm bg-white px-4 py-2.5 text-xs font-bold text-stone-950 transition-colors hover:bg-brand-300 flex items-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Save className="w-4 h-4" /> {saving ? t.characterCustomizer.savingButton : t.characterCustomizer.saveButton}
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
