import type { ReactNode } from "react";
import { stageSceneFor, type StageSceneId } from "./stage-scene";

// Tám cảnh xưởng, vẽ tay bằng SVG cùng một bộ nét với WorkstationArt và
// TrophyArt (components/dashboard-overview/OverviewBlocks.tsx): khối phẳng tông
// brand, một màu nhấn (cyan cho "chạy được", amber cho "thành quả"), không
// gradient tím, không bóng đổ giả 3D. Mọi màu đi qua lớp Tailwind nên tự đổi
// theo chế độ tối. Không có chữ - cảnh là để nhìn, tên chặng nằm cạnh nó.

const FLOOR = "fill-brand-200/50 dark:fill-white/5";
const DARK = "fill-brand-800 dark:fill-brand-700";
const MID = "fill-brand-600 dark:fill-brand-500";
const SOFT = "fill-brand-300 dark:fill-brand-700";
const SCREEN = "fill-sky-50 dark:fill-brand-950";
const PAPER = "fill-white dark:fill-stone-800";

function Machine() {
  return (
    <>
      <ellipse cx="120" cy="138" rx="96" ry="7" className={FLOOR} />
      {/* laptop */}
      <rect x="52" y="34" width="136" height="88" rx="8" className={DARK} />
      <rect x="59" y="41" width="122" height="74" rx="4" className="fill-brand-950 dark:fill-stone-950" />
      <path d="M40 122 h160 l-10 12 h-140 z" className={MID} />
      {/* dòng lệnh */}
      <path d="M68 56 l7 5 l-7 5" className="stroke-cyan-400" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <rect x="81" y="58" width="44" height="5" rx="2.5" className="fill-brand-300" />
      <rect x="68" y="72" width="70" height="5" rx="2.5" className="fill-brand-500" />
      <rect x="68" y="84" width="52" height="5" rx="2.5" className="fill-brand-500" />
      <path d="M68 98 l7 5 l-7 5" className="stroke-cyan-400" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <rect x="81" y="100" width="9" height="5" rx="1" className="fill-cyan-300 motion-safe:animate-pulse" />
      {/* thư mục bay */}
      <path d="M150 52 h12 l4 4 h14 v20 h-30 z" className="fill-amber-400" />
      <path d="M150 60 h30 v16 h-30 z" className="fill-amber-300" />
    </>
  );
}

function Web() {
  return (
    <>
      <ellipse cx="120" cy="138" rx="96" ry="7" className={FLOOR} />
      <rect x="34" y="18" width="172" height="112" rx="10" className={DARK} />
      <rect x="40" y="34" width="160" height="90" rx="5" className={SCREEN} />
      <circle cx="46" cy="26" r="2.5" className="fill-rose-300" />
      <circle cx="54" cy="26" r="2.5" className="fill-amber-300" />
      <circle cx="62" cy="26" r="2.5" className="fill-cyan-300" />
      <rect x="74" y="23" width="96" height="6" rx="3" className="fill-brand-600 dark:fill-brand-800" />
      {/* trang: thanh menu, hero, ba thẻ */}
      <rect x="48" y="42" width="144" height="8" rx="3" className={SOFT} />
      <rect x="48" y="56" width="84" height="10" rx="3" className={MID} />
      <rect x="48" y="71" width="62" height="5" rx="2.5" className={SOFT} />
      <rect x="48" y="81" width="34" height="9" rx="4.5" className="fill-cyan-400" />
      <rect x="140" y="56" width="52" height="34" rx="5" className="fill-brand-200 dark:fill-brand-800" />
      <rect x="48" y="98" width="44" height="20" rx="4" className={PAPER} />
      <rect x="98" y="98" width="44" height="20" rx="4" className={PAPER} />
      <rect x="148" y="98" width="44" height="20" rx="4" className={PAPER} />
      {/* con trỏ */}
      <path d="M176 76 l0 22 l6 -6 l5 10 l4 -2 l-5 -10 l8 0 z" className="fill-brand-950 stroke-white dark:fill-white dark:stroke-brand-950" strokeWidth="1.5" />
    </>
  );
}

function Code() {
  return (
    <>
      <ellipse cx="120" cy="138" rx="96" ry="7" className={FLOOR} />
      <rect x="28" y="22" width="132" height="106" rx="10" className="fill-brand-950 dark:fill-stone-950" />
      <rect x="28" y="22" width="132" height="14" rx="7" className={DARK} />
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <rect key={`n${i}`} x="36" y={46 + i * 13} width="6" height="5" rx="1.5" className="fill-brand-700" />
      ))}
      <rect x="50" y="46" width="34" height="5" rx="2.5" className="fill-cyan-400" />
      <rect x="88" y="46" width="40" height="5" rx="2.5" className="fill-brand-400" />
      <rect x="58" y="59" width="56" height="5" rx="2.5" className="fill-brand-300" />
      <rect x="58" y="72" width="30" height="5" rx="2.5" className="fill-amber-300" />
      <rect x="92" y="72" width="44" height="5" rx="2.5" className="fill-brand-400" />
      <rect x="58" y="85" width="64" height="5" rx="2.5" className="fill-brand-300" />
      <rect x="50" y="98" width="20" height="5" rx="2.5" className="fill-cyan-400" />
      <rect x="50" y="111" width="46" height="5" rx="2.5" className="fill-brand-400" />
      {/* nhánh git */}
      <path d="M186 30 v92" className="stroke-brand-500" strokeWidth="4" strokeLinecap="round" />
      <path d="M186 58 c0 14 26 10 26 26 v14 c0 10 -26 8 -26 22" className="stroke-cyan-400" strokeWidth="4" fill="none" strokeLinecap="round" />
      <circle cx="186" cy="36" r="7" className={MID} />
      <circle cx="186" cy="58" r="7" className={MID} />
      <circle cx="212" cy="88" r="7" className="fill-cyan-400" />
      <circle cx="186" cy="118" r="8" className="fill-amber-400" />
    </>
  );
}

function Data() {
  return (
    <>
      <ellipse cx="120" cy="138" rx="96" ry="7" className={FLOOR} />
      {/* bảng tính */}
      <rect x="26" y="26" width="112" height="100" rx="8" className={PAPER} />
      <rect x="26" y="26" width="112" height="16" rx="8" className={MID} />
      {[0, 1, 2, 3, 4].map((r) =>
        [0, 1, 2].map((c) => (
          <rect
            key={`${r}-${c}`}
            x={34 + c * 34}
            y={50 + r * 14}
            width={c === 0 ? 26 : 28}
            height="8"
            rx="2"
            className={r === 2 && c === 2 ? "fill-cyan-300" : c === 0 ? SOFT : "fill-brand-100 dark:fill-brand-900"}
          />
        ))
      )}
      {/* biểu đồ cột */}
      <rect x="150" y="34" width="70" height="92" rx="8" className={DARK} />
      <rect x="160" y="92" width="10" height="24" rx="2" className="fill-brand-400" />
      <rect x="175" y="76" width="10" height="40" rx="2" className="fill-brand-300" />
      <rect x="190" y="60" width="10" height="56" rx="2" className="fill-cyan-400" />
      <rect x="205" y="46" width="8" height="70" rx="2" className="fill-amber-400" />
      <path d="M160 70 l18 -10 l14 6 l20 -20" className="stroke-white/80" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </>
  );
}

function Ai() {
  return (
    <>
      <ellipse cx="120" cy="138" rx="96" ry="7" className={FLOOR} />
      {/* khung chat */}
      <rect x="22" y="18" width="128" height="112" rx="12" className={PAPER} />
      <rect x="32" y="30" width="78" height="22" rx="10" className="fill-brand-100 dark:fill-brand-900" />
      <rect x="40" y="38" width="54" height="5" rx="2.5" className={SOFT} />
      <rect x="58" y="60" width="82" height="34" rx="10" className={MID} />
      <rect x="66" y="69" width="62" height="5" rx="2.5" className="fill-white/90" />
      <rect x="66" y="80" width="44" height="5" rx="2.5" className="fill-white/70" />
      <rect x="32" y="102" width="108" height="18" rx="9" className="fill-brand-50 dark:fill-brand-950" />
      <circle cx="130" cy="111" r="6" className="fill-cyan-400" />
      {/* mạng nút */}
      <path d="M176 44 L206 66 L184 96 L214 112 M176 44 L184 96 M206 66 L214 112" className="stroke-brand-400 dark:stroke-brand-600" strokeWidth="2.5" fill="none" />
      <circle cx="176" cy="44" r="9" className={MID} />
      <circle cx="206" cy="66" r="7" className="fill-cyan-400" />
      <circle cx="184" cy="96" r="8" className={DARK} />
      <circle cx="214" cy="112" r="6" className="fill-brand-400" />
      <path d="M208 26 l3 7 l7 3 l-7 3 l-3 7 l-3 -7 l-7 -3 l7 -3 z" className="fill-amber-400" />
    </>
  );
}

function Cloud() {
  return (
    <>
      <ellipse cx="120" cy="138" rx="96" ry="7" className={FLOOR} />
      {/* đám mây */}
      <path d="M78 64 a22 22 0 0 1 40 -16 a26 26 0 0 1 48 10 a18 18 0 0 1 -2 36 h-84 a16 16 0 0 1 -2 -30 z" className="fill-brand-100 dark:fill-brand-900" />
      <path d="M120 92 v-30 m-10 10 l10 -10 l10 10" className="stroke-brand-600 dark:stroke-brand-300" strokeWidth="4" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      {/* tủ máy chủ */}
      {[0, 1, 2].map((i) => (
        <g key={i}>
          <rect x={46 + i * 54} y="100" width="44" height="12" rx="3" className={DARK} />
          <rect x={46 + i * 54} y="115" width="44" height="12" rx="3" className={MID} />
          <circle cx={54 + i * 54} cy="106" r="2" className="fill-cyan-300" />
          <circle cx={54 + i * 54} cy="121" r="2" className={i === 1 ? "fill-amber-300" : "fill-cyan-300"} />
          <rect x={62 + i * 54} y="104" width="22" height="4" rx="2" className="fill-brand-500 dark:fill-brand-400" />
        </g>
      ))}
      <path d="M68 100 v-6 h104 v6" className="stroke-brand-300 dark:stroke-brand-700" strokeWidth="2" fill="none" />
    </>
  );
}

function Shield() {
  return (
    <>
      <ellipse cx="120" cy="138" rx="96" ry="7" className={FLOOR} />
      <rect x="30" y="40" width="96" height="76" rx="8" className={PAPER} />
      <rect x="40" y="52" width="50" height="6" rx="3" className={SOFT} />
      <rect x="40" y="66" width="76" height="9" rx="4.5" className="fill-brand-100 dark:fill-brand-900" />
      <rect x="40" y="82" width="76" height="9" rx="4.5" className="fill-brand-100 dark:fill-brand-900" />
      {[0, 1, 2, 3, 4].map((i) => (
        <circle key={i} cx={48 + i * 9} cy="86.5" r="2" className="fill-brand-500" />
      ))}
      <rect x="40" y="99" width="34" height="9" rx="4.5" className={MID} />
      {/* khiên */}
      <path d="M170 22 l42 14 v30 c0 28 -20 44 -42 52 c-22 -8 -42 -24 -42 -52 v-30 z" className={DARK} />
      <path d="M170 34 l30 10 v22 c0 20 -14 32 -30 38 c-16 -6 -30 -18 -30 -38 v-22 z" className={MID} />
      <path d="M156 70 l10 10 l20 -22" className="stroke-cyan-300" strokeWidth="6" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </>
  );
}

function Workshop() {
  return (
    <>
      <ellipse cx="120" cy="138" rx="96" ry="7" className={FLOOR} />
      {/* bàn */}
      <rect x="30" y="98" width="180" height="8" rx="3" className={DARK} />
      <rect x="42" y="106" width="6" height="30" rx="2" className="fill-brand-900 dark:fill-brand-800" />
      <rect x="192" y="106" width="6" height="30" rx="2" className="fill-brand-900 dark:fill-brand-800" />
      {/* màn hình */}
      <rect x="60" y="40" width="88" height="56" rx="7" className={MID} />
      <rect x="66" y="46" width="76" height="44" rx="4" className={SCREEN} />
      <rect x="74" y="54" width="30" height="5" rx="2.5" className="fill-brand-500" />
      <rect x="74" y="64" width="50" height="5" rx="2.5" className={SOFT} />
      <rect x="74" y="74" width="38" height="5" rx="2.5" className="fill-cyan-400" />
      <rect x="99" y="94" width="10" height="4" className={DARK} />
      {/* cặp hồ sơ */}
      <rect x="160" y="70" width="40" height="28" rx="5" className="fill-amber-400" />
      <path d="M172 70 v-6 h16 v6" className="stroke-amber-600" strokeWidth="3" fill="none" />
      <rect x="160" y="80" width="40" height="3" className="fill-amber-500" />
      {/* cây */}
      <path d="M36 98 h20 l-3 -14 h-14 z" className={PAPER} />
      <path d="M46 84 c-2 -12 -10 -16 -14 -14 c3 5 6 10 14 14 z" className="fill-emerald-500" />
      <path d="M46 84 c2 -13 10 -19 16 -17 c-3 6 -8 13 -16 17 z" className="fill-emerald-400" />
    </>
  );
}

const SCENES: Record<StageSceneId, () => ReactNode> = {
  machine: Machine,
  web: Web,
  code: Code,
  data: Data,
  ai: Ai,
  cloud: Cloud,
  shield: Shield,
  workshop: Workshop,
};

/** Cảnh xưởng của một chặng, tra theo `tag`. `muted`: chặng chưa mở - xám và
 *  nhạt, để màu chỉ dành cho thứ đang làm và đã làm. `scene` chọn thẳng một
 *  cảnh khi thứ cần vẽ không phải một chặng (vd. lối học theo nhu cầu). */
export default function StageScene({ tag, scene, className = "", muted = false }: { tag?: string | null; scene?: StageSceneId; className?: string; muted?: boolean }) {
  const Scene = SCENES[scene ?? stageSceneFor(tag)];
  return (
    <svg viewBox="0 0 240 150" className={`${className} ${muted ? "opacity-45 grayscale" : ""}`} aria-hidden>
      <Scene />
    </svg>
  );
}
