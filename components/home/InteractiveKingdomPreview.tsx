"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useI18n } from "@/lib/i18n/context";
import { format } from "@/lib/i18n";
import type { Dictionary } from "@/lib/i18n/dictionaries/vi";
import {
  Crown,
  Sparkles,
  Flame,
  Trophy,
  Zap,
  Lock,
  ChevronRight,
  RotateCcw,
  CheckCircle2,
  XCircle,
  Gamepad2,
  MapPin,
  Swords,
  Shield,
  Coins,
} from "lucide-react";

type PreviewTab = "map" | "minigame" | "boss";

interface KingdomBuilding {
  id: string;
  name: string;
  subtitle: string;
  image: string;
  minLevel: number;
  progress: string;
  xpReward: number;
  badge: string;
  description: string;
  tags: string[];
}

const kingdomBuildings = (t: Dictionary): KingdomBuilding[] => [
  {
    id: "goldman",
    name: "Goldman Sachs Tower",
    subtitle: t.kingdomPreview.goldmanSubtitle,
    image: "/rpg/goldman_sachs.png",
    minLevel: 5,
    progress: "72%",
    xpReward: 350,
    badge: "🏛️ INVESTMENT BANK",
    description: t.kingdomPreview.goldmanDescription,
    tags: [t.kingdomPreview.goldmanTag1, t.kingdomPreview.goldmanTag2, t.kingdomPreview.goldmanTag3],
  },
  {
    id: "fed",
    name: "Fed Reserve Bank",
    subtitle: t.kingdomPreview.fedSubtitle,
    image: "/rpg/fed_reserve.jpg",
    minLevel: 3,
    progress: "48%",
    xpReward: 250,
    badge: "🏦 CENTRAL BANK",
    description: t.kingdomPreview.fedDescription,
    tags: [t.kingdomPreview.fedTag1, t.kingdomPreview.fedTag2, t.kingdomPreview.fedTag3],
  },
  {
    id: "singapore",
    name: "Singapore Maritime Dock",
    subtitle: t.kingdomPreview.singaporeSubtitle,
    image: "/rpg/singapore_dock.jpg",
    minLevel: 2,
    progress: "65%",
    xpReward: 180,
    badge: "🚢 GLOBAL TRADE",
    description: t.kingdomPreview.singaporeDescription,
    tags: [
      t.kingdomPreview.singaporeTag1,
      t.kingdomPreview.singaporeTag2,
      t.kingdomPreview.singaporeTag3,
    ],
  },
  {
    id: "pvp",
    name: t.kingdomPreview.pvpName,
    subtitle: t.kingdomPreview.pvpSubtitle,
    image: "/images/dau-truong-kien-thuc.jpg",
    minLevel: 1,
    progress: "90%",
    xpReward: 400,
    badge: "⚔️ SOLO PVP DUEL",
    description: t.kingdomPreview.pvpDescription,
    tags: [t.kingdomPreview.pvpTag1, t.kingdomPreview.pvpTag2, t.kingdomPreview.pvpTag3],
  },
];

// Interactive Mini Game Sampler Data (Flash Quiz). `correct` is structure, not
// copy, so it stays here and is never overridable by a translation.
const samplerQuestions = (t: Dictionary) => [
  {
    question: t.kingdomPreview.q1,
    options: [
      { text: t.kingdomPreview.q1a, correct: true },
      { text: t.kingdomPreview.q1b, correct: false },
      { text: t.kingdomPreview.q1c, correct: false },
    ],
    explanation: t.kingdomPreview.q1explanation,
  },
  {
    question: t.kingdomPreview.q2,
    options: [
      { text: t.kingdomPreview.q2a, correct: true },
      { text: t.kingdomPreview.q2b, correct: false },
      { text: t.kingdomPreview.q2c, correct: false },
    ],
    explanation: t.kingdomPreview.q2explanation,
  },
];

export default function InteractiveKingdomPreview() {
  const { t } = useI18n();
  const buildings = useMemo(() => kingdomBuildings(t), [t]);
  const questions = useMemo(() => samplerQuestions(t), [t]);
  const [activeTab, setActiveTab] = useState<PreviewTab>("map");
  const [selectedBuildingId, setSelectedBuildingId] = useState<string>(buildings[0].id);
  const [userXp, setUserXp] = useState(240);
  const [samplerIndex, setSamplerIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [answered, setAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const selectedBuilding =
    buildings.find((b) => b.id === selectedBuildingId) ?? buildings[0];
  const currentQuestion = questions[samplerIndex];

  function handleSelectOption(idx: number) {
    if (answered) return;
    setSelectedOption(idx);
    setAnswered(true);
    const correct = currentQuestion.options[idx].correct;
    setIsCorrect(correct);
    if (correct) {
      setUserXp((prev) => prev + 50);
    }
  }

  function handleNextQuestion() {
    setAnswered(false);
    setSelectedOption(null);
    setSamplerIndex((prev) => (prev + 1) % questions.length);
  }

  return (
    <div className="overflow-hidden rounded-3xl border-2 border-amber-500/40 bg-stone-950 shadow-[0_24px_60px_-20px_rgba(245,158,11,0.3)] text-white relative">
      {/* Top Browser Bar & Mode Switcher */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-stone-800 bg-stone-900/90 px-4 py-3 backdrop-blur-md">
        <div className="flex items-center gap-3 min-w-0">
          <div className="flex shrink-0 gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-rose-500/80" />
            <span className="h-2.5 w-2.5 rounded-full bg-amber-500/80" />
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-500/80" />
          </div>
          <div className="hidden sm:block min-w-0 flex-1 truncate rounded-full border border-stone-700 bg-stone-950 px-4 py-1 text-center text-[11px] font-semibold text-stone-400">
            tuhoctaichinh.org/game-kingdom
          </div>
        </div>

        {/* Interactive Mode Tabs Switcher */}
        <div className="flex items-center gap-1 rounded-2xl border border-amber-500/30 bg-stone-950/80 p-1 text-xs font-black">
          <button
            onClick={() => setActiveTab("map")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl transition-all cursor-pointer ${
              activeTab === "map"
                ? "bg-gradient-to-r from-amber-500 to-orange-500 text-stone-950 shadow-md scale-102"
                : "text-stone-400 hover:text-stone-200"
            }`}
          >
            <Crown className="w-3.5 h-3.5" />
            <span>{t.kingdomPreview.tabMap}</span>
          </button>

          <button
            onClick={() => setActiveTab("minigame")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl transition-all cursor-pointer ${
              activeTab === "minigame"
                ? "bg-gradient-to-r from-emerald-500 to-teal-500 text-stone-950 shadow-md scale-102"
                : "text-stone-400 hover:text-stone-200"
            }`}
          >
            <Gamepad2 className="w-3.5 h-3.5" />
            <span>{t.kingdomPreview.tabMinigame}</span>
          </button>

          <button
            onClick={() => setActiveTab("boss")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl transition-all cursor-pointer ${
              activeTab === "boss"
                ? "bg-gradient-to-r from-red-500 to-rose-600 text-white shadow-md scale-102"
                : "text-stone-400 hover:text-stone-200"
            }`}
          >
            <Swords className="w-3.5 h-3.5" />
            <span>{t.kingdomPreview.tabBoss}</span>
          </button>
        </div>
      </div>

      {/* Main Interactive Stage Body */}
      <div className="relative min-h-[380px] lg:min-h-[420px] p-3 sm:p-4 lg:p-5 flex flex-col justify-between overflow-hidden">
        {/* Ambient Wall Street & Particle Background */}
        <div className="absolute inset-0 pointer-events-none">
          <Image
            src="/wallstreet-nyse-header.jpg"
            alt={t.kingdomPreview.bgAlt}
            fill
            sizes="100vw"
            className="object-cover opacity-35 brightness-75 contrast-125"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-stone-950/90 via-stone-950/70 to-amber-950/80" />
          <div className="absolute inset-0 bg-[radial-gradient(#f59e0b_1.2px,transparent_1.2px)] [background-size:26px_26px] opacity-25 animate-pulse" />
        </div>

        {/* Top Header Bar inside Stage */}
        <div className="relative z-10 flex flex-wrap items-center justify-between gap-3 mb-3">
          <div>
            <div className="inline-flex items-center gap-1.5 rounded-full border border-amber-400/50 bg-amber-950/80 px-3 py-0.5 text-[10px] font-black uppercase tracking-[0.14em] text-amber-300 shadow-md backdrop-blur-md">
              <Crown className="h-3 w-3 text-amber-400" />
              <span>{t.kingdomPreview.eyebrow}</span>
            </div>
            <h3 className="mt-1 text-lg sm:text-xl font-black text-white drop-shadow-md">
              {activeTab === "map" && t.kingdomPreview.headingMap}
              {activeTab === "minigame" && t.kingdomPreview.headingMinigame}
              {activeTab === "boss" && t.kingdomPreview.headingBoss}
            </h3>
          </div>

          {/* Live Dynamic XP Counter Pill */}
          <motion.div
            key={userXp}
            initial={{ scale: 1.15 }}
            animate={{ scale: 1 }}
            className="rounded-xl border border-emerald-400/50 bg-emerald-950/80 px-3 py-1.5 text-right backdrop-blur-md shadow-[0_0_20px_rgba(16,185,129,0.25)] shrink-0"
          >
            <p className="text-[9px] font-black uppercase tracking-widest text-emerald-300">{t.kingdomPreview.xpLabel}</p>
            <p className="text-lg sm:text-xl font-black tabular-nums text-white flex items-center gap-1 justify-end">
              <Zap className="w-4 h-4 text-amber-400 fill-amber-400 animate-bounce" />
              {format(t.kingdomPreview.xpValue, { xp: userXp })}
            </p>
          </motion.div>
        </div>

        {/* TAB 1: INTERACTIVE KINGDOM MAP VIEW */}
        {activeTab === "map" && (
          <div className="relative z-10 grid gap-4 lg:grid-cols-12 items-stretch flex-1">
            {/* Left: Building Cards Grid with Click Selection */}
            <div className="lg:col-span-8 grid gap-2.5 sm:grid-cols-2">
              {buildings.map((b) => {
                const isSelected = selectedBuilding.id === b.id;
                return (
                  <motion.div
                    key={b.id}
                    whileHover={{ scale: 1.01, translateY: -2 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setSelectedBuildingId(b.id)}
                    className={`relative cursor-pointer overflow-hidden rounded-xl border-2 transition-all duration-300 backdrop-blur-md p-2 sm:p-2.5 ${
                      isSelected
                        ? "border-amber-400 bg-amber-950/80 shadow-[0_0_20px_rgba(245,158,11,0.35)] ring-1 ring-amber-400/50"
                        : "border-stone-800 bg-stone-900/80 hover:border-amber-400/50 hover:bg-stone-900/95"
                    }`}
                  >
                    <div className="relative h-24 sm:h-28 w-full overflow-hidden rounded-lg mb-2">
                      <Image
                        src={b.image}
                        alt={b.name}
                        fill
                        className={`object-cover transition-transform duration-500 ${
                          isSelected ? "scale-105" : "scale-100 group-hover:scale-105"
                        }`}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/30 to-transparent" />
                      <span className="absolute top-1.5 left-1.5 text-[8px] font-black uppercase text-white bg-amber-600/90 px-1.5 py-0.5 rounded backdrop-blur-md border border-amber-400/40">
                        {b.badge}
                      </span>
                      <div className="absolute bottom-1.5 left-2 right-2">
                        <p className="text-xs font-black text-white drop-shadow-md truncate">{b.name}</p>
                        <p className="text-[9px] font-semibold text-amber-300 truncate">{b.subtitle}</p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-[9px] font-black uppercase tracking-wider text-stone-300">
                      <span>{format(t.kingdomPreview.unlockAtLevel, { level: b.minLevel })}</span>
                      <span className="text-emerald-400">{format(t.kingdomPreview.xpRewardValue, { xp: b.xpReward })}</span>
                    </div>

                    <div className="mt-1 h-1 w-full rounded-full bg-stone-800 overflow-hidden">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-amber-400 to-emerald-400 transition-all duration-500"
                        style={{ width: b.progress }}
                      />
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Right: Active Building Interactive Details Card */}
            <div className="lg:col-span-4 h-full">
              <motion.div
                key={selectedBuilding.id}
                initial={{ opacity: 0, x: 15 }}
                animate={{ opacity: 1, x: 0 }}
                className="h-full flex flex-col justify-between rounded-2xl border-2 border-amber-400/60 bg-stone-900/90 p-3.5 sm:p-4 backdrop-blur-xl shadow-xl relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 p-6 pointer-events-none opacity-10 text-6xl">
                  🏛️
                </div>

                <div>
                  <div className="flex items-center gap-2 text-xs font-black text-amber-400 uppercase tracking-widest mb-1">
                    <MapPin className="w-4 h-4 text-amber-400 animate-bounce" />
                    <span>{t.kingdomPreview.buildingDetail}</span>
                  </div>
                  <h4 className="text-lg font-black text-white">{selectedBuilding.name}</h4>
                  <p className="text-xs text-amber-200/90 mt-0.5 font-semibold">{selectedBuilding.subtitle}</p>

                  <p className="text-xs text-stone-300 leading-relaxed mt-3 bg-stone-950/60 p-3 rounded-xl border border-stone-800">
                    {selectedBuilding.description}
                  </p>

                  <div className="mt-4 space-y-1.5">
                    <p className="text-[10px] font-black uppercase tracking-widest text-stone-400">{t.kingdomPreview.skillsUnlocked}</p>
                    <div className="flex flex-wrap gap-1.5">
                      {selectedBuilding.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-[10px] font-extrabold text-emerald-300 bg-emerald-950/80 border border-emerald-500/40 px-2.5 py-1 rounded-full"
                        >
                          ✓ {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-stone-800">
                  <Link
                    href="/login?mode=signup"
                    className="w-full inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-amber-400 via-amber-500 to-orange-500 px-5 py-3 text-sm font-black text-stone-950 shadow-lg hover:brightness-110 active:scale-98 transition-all cursor-pointer"
                  >
                    <Zap className="w-4 h-4 text-stone-950 fill-stone-950" />
                    <span>{t.kingdomPreview.unlockBuilding}</span>
                  </Link>
                </div>
              </motion.div>
            </div>
          </div>
        )}

        {/* TAB 2: LIVE MINI GAME SAMPLER */}
        {activeTab === "minigame" && (
          <div className="relative z-10 max-w-2xl mx-auto w-full my-auto py-4">
            <motion.div
              key={samplerIndex}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-3xl border-2 border-emerald-500/50 bg-stone-900/90 p-6 backdrop-blur-xl shadow-2xl text-white"
            >
              <div className="flex items-center justify-between mb-3 text-xs font-black uppercase text-emerald-400 tracking-wider">
                <span className="flex items-center gap-1.5">
                  <Gamepad2 className="w-4 h-4" /> {format(t.kingdomPreview.samplerQuestion, { index: samplerIndex + 1 })}
                </span>
                <span className="text-amber-400">{t.kingdomPreview.samplerXp}</span>
              </div>

              <h4 className="text-base sm:text-lg font-black text-white mb-5 leading-snug">
                {currentQuestion.question}
              </h4>

              <div className="space-y-2.5">
                {currentQuestion.options.map((opt, idx) => {
                  const isSelected = selectedOption === idx;
                  let btnStyle = "border-stone-700 bg-stone-950/70 hover:border-emerald-400/60 hover:bg-stone-800";

                  if (answered) {
                    if (opt.correct) {
                      btnStyle = "border-emerald-400 bg-emerald-950/90 text-emerald-200 shadow-[0_0_20px_rgba(16,185,129,0.3)]";
                    } else if (isSelected) {
                      btnStyle = "border-rose-500 bg-rose-950/90 text-rose-200";
                    }
                  }

                  return (
                    <button
                      key={opt.text}
                      disabled={answered}
                      onClick={() => handleSelectOption(idx)}
                      className={`w-full text-left p-3.5 rounded-2xl border-2 text-xs sm:text-sm font-bold transition-all duration-200 flex items-center justify-between cursor-pointer ${btnStyle}`}
                    >
                      <span>{opt.text}</span>
                      {answered && opt.correct && <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />}
                      {answered && isSelected && !opt.correct && <XCircle className="w-5 h-5 text-rose-400 shrink-0" />}
                    </button>
                  );
                })}
              </div>

              {answered && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-5 space-y-3">
                  <div
                    className={`p-3.5 rounded-2xl border text-xs leading-relaxed font-semibold ${
                      isCorrect
                        ? "bg-emerald-950/80 border-emerald-400/50 text-emerald-200"
                        : "bg-rose-950/80 border-rose-500/50 text-rose-200"
                    }`}
                  >
                    {isCorrect ? t.kingdomPreview.samplerCorrect : t.kingdomPreview.samplerWrong}
                    <p className="mt-1 text-stone-300">{currentQuestion.explanation}</p>
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      onClick={handleNextQuestion}
                      className="flex-1 py-3 px-4 rounded-xl bg-stone-800 hover:bg-stone-700 font-bold text-xs text-white transition-colors cursor-pointer flex items-center justify-center gap-1.5"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>{t.kingdomPreview.tryAnother}</span>
                    </button>
                    <Link
                      href="/login?mode=signup"
                      className="flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 font-black text-xs text-stone-950 transition-all cursor-pointer text-center"
                    >
                      {t.kingdomPreview.doAllQuizzes}
                    </Link>
                  </div>
                </motion.div>
              )}
            </motion.div>
          </div>
        )}

        {/* TAB 3: NYSE WORLD BOSS RAID PREVIEW */}
        {activeTab === "boss" && (
          <div className="relative z-10 grid gap-6 lg:grid-cols-12 items-center flex-1 my-auto">
            <div className="lg:col-span-5 flex flex-col items-center text-center">
              <div className="relative w-48 h-48 sm:w-56 sm:h-56 mb-2">
                <div className="absolute inset-0 rounded-full bg-rose-600/30 blur-3xl animate-pulse" />
                <Image
                  src="/boss-wallstreet-bull.png"
                  alt={t.kingdomPreview.bossAlt}
                  fill
                  className="object-contain drop-shadow-[0_10px_30px_rgba(225,29,72,0.5)] animate-bounce"
                />
              </div>
              <span className="text-[10px] font-black uppercase text-rose-400 bg-rose-950/80 px-3 py-1 rounded-full border border-rose-500/50">
                {t.kingdomPreview.bossRaidLabel}
              </span>
              <h4 className="text-xl font-black text-white mt-2">{t.kingdomPreview.bossName}</h4>
              <p className="text-xs text-stone-300 max-w-xs mt-1">
                {t.kingdomPreview.bossBody}
              </p>
            </div>

            <div className="lg:col-span-7 space-y-3">
              <div className="p-4 rounded-2xl bg-stone-900/90 border border-stone-800 backdrop-blur-md">
                <div className="flex justify-between text-xs font-black uppercase text-rose-400 mb-1.5">
                  <span>{t.kingdomPreview.bossHpLabel}</span>
                  <span>{t.kingdomPreview.bossHpValue}</span>
                </div>
                <div className="h-3 rounded-full bg-stone-950 overflow-hidden border border-stone-800">
                  <div className="h-full rounded-full bg-gradient-to-r from-rose-600 to-amber-500 w-[74%]" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="p-3.5 rounded-2xl bg-stone-900/90 border border-stone-800 text-center">
                  <p className="text-[10px] font-black uppercase text-stone-400">{t.kingdomPreview.damageToday}</p>
                  <p className="text-lg font-black text-amber-400 mt-0.5">{t.kingdomPreview.damageValue}</p>
                </div>
                <div className="p-3.5 rounded-2xl bg-stone-900/90 border border-stone-800 text-center">
                  <p className="text-[10px] font-black uppercase text-stone-400">{t.kingdomPreview.bossReward}</p>
                  <p className="text-lg font-black text-emerald-400 mt-0.5">{t.kingdomPreview.bossRewardValue}</p>
                </div>
              </div>

              <Link
                href="/login?mode=signup"
                className="w-full inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-rose-500 via-red-600 to-amber-500 px-6 py-3.5 text-sm font-black text-white shadow-xl hover:brightness-110 active:scale-98 transition-all cursor-pointer"
              >
                <Swords className="w-4 h-4" />
                <span>{t.kingdomPreview.joinBoss}</span>
              </Link>
            </div>
          </div>
        )}

        {/* Footer Navigation Bar */}
        <div className="relative z-10 flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-stone-800/80 text-xs font-semibold text-stone-400">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span>{t.kingdomPreview.ongoing}</span>
          </div>

          <Link
            href="/login?mode=signup"
            className="inline-flex items-center gap-1 text-amber-300 font-extrabold hover:text-amber-200 transition-colors"
          >
            <span>{t.kingdomPreview.playFull}</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
