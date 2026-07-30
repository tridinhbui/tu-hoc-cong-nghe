"use client";

import { useEffect, useMemo, useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Trophy, BookOpen, Sparkles, Crown, Medal, Award, Flame, Target, Gamepad2, Star, ShieldCheck, Zap, Shield, Gem, Briefcase, GraduationCap, Heart, ChevronLeft, ChevronRight } from "lucide-react";
import {
  getLeaderboardByMetric,
  getMyLeaderboardRank,
  getCompositeLeaderboard,
  getMyCompositeRank,
  type LeaderboardMetric,
  type LeaderboardRow,
  type CompositeRank,
} from "@/lib/supabase-user";
import { getCombinedGameLeaderboard } from "@/lib/games";
import { getCareerLeaderboard, type CareerLeaderboardRow } from "@/lib/finance-careers";
import { isValidAvatar } from "@/lib/avatar-utils";
import { useI18n } from "@/lib/i18n/context";
import { format as formatI18n } from "@/lib/i18n";
import type { Dictionary } from "@/lib/i18n";

type LeaderboardUiMetric = LeaderboardMetric | "composite" | "mastery" | "game" | "career" | "cfa" | "community";

function LeaderboardAvatar({ name, avatarUrl, size = 36 }: { name: string; avatarUrl: string | null; size?: number }) {
  if (isValidAvatar(avatarUrl)) {
    return (
      <Image
        src={avatarUrl}
        alt={name}
        width={size}
        height={size}
        className="rounded-full object-cover shadow-inner"
        style={{ width: size, height: size }}
      />
    );
  }

  const initials = name.trim().split(" ").map((n) => n.charAt(0)).join("").slice(0, 2).toUpperCase() || "?";
  return (
    <div
      className="flex items-center justify-center rounded-full bg-gradient-to-br from-stone-100 to-stone-300 font-extrabold text-stone-700 shadow-inner"
      style={{ width: size, height: size, fontSize: `${Math.max(10, size * 0.32)}px` }}
    >
      {initials}
    </div>
  );
}

// Prominent Avatar Frame Wrapper with Floating Crown & Metallic Rings
function AvatarWithFrame({ rank, name, avatarUrl, size = 44 }: { rank: number; name: string; avatarUrl: string | null; size?: number }) {
  if (rank === 1) {
    return (
      <div className="relative inline-flex items-center justify-center pt-3.5">
        {/* Golden outer aura glow */}
        <div className="absolute -inset-3 animate-pulse rounded-full bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-500 opacity-80 blur-md" />
        
        {/* Metallic Gold Ring with Laurel Border */}
        <div className="relative rounded-full p-[4px] bg-gradient-to-tr from-amber-600 via-yellow-300 via-amber-400 to-yellow-100 shadow-[0_0_20px_rgba(245,158,11,0.6)]">
          <div className="rounded-full bg-white p-[2px] shadow-inner">
            <LeaderboardAvatar name={name} avatarUrl={avatarUrl} size={size} />
          </div>
        </div>

        {/* 👑 Prominent Floating Gold Crown */}
        <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 flex items-center justify-center rounded-full bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-600 px-2 py-1 text-amber-950 shadow-lg ring-2 ring-white">
          <Crown className="h-4 w-4 fill-amber-300 text-amber-950 animate-bounce" />
        </div>

        {/* Golden Star Particle */}
        <div className="absolute -bottom-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-amber-400 text-amber-950 shadow ring-2 ring-white font-black text-[9px]">
          ★
        </div>
      </div>
    );
  }

  if (rank === 2) {
    return (
      <div className="relative inline-flex items-center justify-center pt-1.5">
        {/* Silver outer glow */}
        <div className="absolute -inset-2.5 rounded-full bg-gradient-to-r from-slate-300 via-slate-100 to-slate-400 opacity-70 blur-md" />

        {/* Metallic Silver Ring */}
        <div className="relative rounded-full p-[3.5px] bg-gradient-to-tr from-slate-400 via-slate-100 via-slate-200 to-slate-400 shadow-[0_0_15px_rgba(148,163,184,0.5)]">
          <div className="rounded-full bg-white p-[2px]">
            <LeaderboardAvatar name={name} avatarUrl={avatarUrl} size={size} />
          </div>
        </div>

        {/* Floating Silver Medal Crown */}
        <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 flex items-center justify-center rounded-full bg-gradient-to-r from-slate-400 via-slate-200 to-slate-500 px-1.5 py-0.5 text-slate-900 shadow ring-2 ring-white">
          <Medal className="h-3.5 w-3.5 text-slate-900" />
        </div>
      </div>
    );
  }

  if (rank === 3) {
    return (
      <div className="relative inline-flex items-center justify-center pt-1.5">
        {/* Bronze outer glow */}
        <div className="absolute -inset-2.5 rounded-full bg-gradient-to-r from-amber-700 via-orange-400 to-amber-800 opacity-60 blur-md" />

        {/* Metallic Bronze Ring */}
        <div className="relative rounded-full p-[3.5px] bg-gradient-to-tr from-amber-800 via-orange-300 via-amber-500 to-amber-700 shadow-[0_0_12px_rgba(180,83,9,0.45)]">
          <div className="rounded-full bg-white p-[2px]">
            <LeaderboardAvatar name={name} avatarUrl={avatarUrl} size={size} />
          </div>
        </div>

        {/* Floating Bronze Shield Badge */}
        <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 flex items-center justify-center rounded-full bg-gradient-to-r from-amber-700 via-amber-500 to-orange-700 px-1.5 py-0.5 text-amber-100 shadow ring-2 ring-white">
          <Award className="h-3.5 w-3.5 text-amber-100" />
        </div>
      </div>
    );
  }

  if (rank <= 5) {
    return (
      <div className="relative inline-flex items-center justify-center pt-1">
        <div className="relative rounded-full p-[3px] bg-gradient-to-tr from-violet-500 via-purple-300 to-indigo-500 shadow-md">
          <div className="rounded-full bg-white p-[1.5px]">
            <LeaderboardAvatar name={name} avatarUrl={avatarUrl} size={size} />
          </div>
        </div>

        <div className="absolute -top-2 left-1/2 -translate-x-1/2 flex items-center justify-center rounded-full bg-violet-600 p-0.5 text-white shadow ring-1 ring-white">
          <Gem className="h-3 w-3 text-violet-100" />
        </div>
      </div>
    );
  }

  // Next Positions (#6+) Avatar Frame
  return (
    <div className="relative inline-flex items-center justify-center">
      <div className="rounded-full p-[2px] bg-gradient-to-tr from-amber-300 via-stone-200 to-amber-200 shadow-xs">
        <div className="rounded-full bg-white p-[1px]">
          <LeaderboardAvatar name={name} avatarUrl={avatarUrl} size={size} />
        </div>
      </div>
    </div>
  );
}

// `labelKey`/`format` both read from the dictionary rather than storing
// translated text directly - TABS is a module-level const built once outside
// any component, so it can't call useI18n() itself. Callers pass
// t.leaderboard/t.leaderboard.units in at render time (see LB() below).
const TABS: {
  metric: LeaderboardUiMetric;
  labelKey: keyof Pick<
    Dictionary["leaderboard"],
    "compositeScore" | "totalXp" | "trueMastery" | "lessonsCount" | "avgScore" | "streakDays" | "career" | "cfaArena" | "contribution" | "badgesLabel" | "gamer"
  >;
  icon: any;
  format: (v: number, u: Dictionary["leaderboard"]["units"]) => string;
}[] = [
  // Default tab: the weighted overall score (see
  // 20260819_composite_leaderboard.sql). Listed first because it, not raw XP,
  // is meant to be the headline "who is doing best overall" ranking.
  { metric: "composite", labelKey: "compositeScore", icon: ShieldCheck, format: (v, u) => `${v}${u.outOf1000}` },
  { metric: "xp", labelKey: "totalXp", icon: Zap, format: (v, u) => `${v} ${u.xp}` },
  { metric: "mastery", labelKey: "trueMastery", icon: ShieldCheck, format: (v, u) => `${Math.round(v)} ${u.points}` },
  { metric: "lessons", labelKey: "lessonsCount", icon: BookOpen, format: (v, u) => `${v} ${u.lessons}` },
  { metric: "avg_score", labelKey: "avgScore", icon: Target, format: (v, u) => `${Math.round(v)}${u.percent}` },
  { metric: "streak", labelKey: "streakDays", icon: Flame, format: (v, u) => `${v} ${u.days}` },
  { metric: "career", labelKey: "career", icon: Briefcase, format: (v, u) => `${v} ${u.lessons}` },
  { metric: "cfa", labelKey: "cfaArena", icon: GraduationCap, format: (v, u) => `${v} ${u.points}` },
  { metric: "community", labelKey: "contribution", icon: Heart, format: (v, u) => `${v} ${u.interactions}` },
  { metric: "badges", labelKey: "badgesLabel", icon: Award, format: (v, u) => `${v} ${u.honors}` },
  { metric: "game", labelKey: "gamer", icon: Gamepad2, format: (v, u) => `${v} ${u.xp}` },
];

const LEADERBOARD_TITLES: Record<LeaderboardUiMetric, Record<number, string>> = {
  composite: { 1: "Học viên toàn diện nhất", 2: "Toàn diện xuất sắc", 3: "Cân bằng và vững vàng", 4: "Nền tảng toàn diện", 5: "Học chắc, học đều" },
  xp: { 1: "Bậc thầy tài chính", 2: "Chuyên gia đầu tư", 3: "Nhà đầu tư tài năng", 4: "Kiện tướng tích lũy", 5: "Thợ săn XP" },
  mastery: { 1: "Năng lực thật số 1", 2: "Kiểm tra chuẩn xác", 3: "Nền tảng vững", 4: "Tư duy chắc", 5: "Học thật hiểu thật" },
  lessons: { 1: "Vua sách giáo khoa", 2: "Thủ kho tri thức", 3: "Máy học không ngừng", 4: "Mọt sách chính hiệu", 5: "Người đọc thông thái" },
  avg_score: { 1: "Thần chính xác", 2: "Đại sư câu hỏi", 3: "Bậc thầy câu hỏi", 4: "Chiến thần IQ", 5: "Kẻ hủy diệt đáp án" },
  streak: { 1: "Huyền thoại chuỗi ngày", 2: "Lửa không tắt", 3: "Kiên trì vàng", 4: "Ngọn lửa đam mê", 5: "Học đều mỗi ngày" },
  badges: { 1: "Bộ sưu tập huy hiệu", 2: "Thợ săn huy hiệu", 3: "Người mở khóa", 4: "Nhà sưu tầm vĩ đại", 5: "Danh hiệu đầy mình" },
  game: { 1: "Huyền thoại trò chơi", 2: "Đại kiện tướng tài chính", 3: "Cao thủ toàn năng", 4: "Thần bài tài chính", 5: "Kỷ lục gia trò chơi" },
  career: { 1: "Huyền thoại sự nghiệp", 2: "Lãnh đạo tương lai", 3: "Chuyên gia lộ trình", 4: "Kiến trúc sư sự nghiệp", 5: "Tiên phong ngành" },
  cfa: { 1: "Chiến thần CFA Level I", 2: "Bậc thầy Flashcard & Formula", 3: "Chuyên gia Ethics & Quant", 4: "Kiện tướng CFA", 5: "Tiên phong Lộ trình CFA" },
  community: { 1: "Đại sứ Cộng đồng", 2: "Hỗ trợ viên tích cực", 3: "Người truyền cảm hứng", 4: "Chuyên gia chia sẻ", 5: "Thành viên sôi nổi" },
};

const PODIUM_ORDER = [3, 1, 0, 2, 4];

function getLeaderboardTitle(metric: LeaderboardUiMetric, rank: number): string | null {
  return LEADERBOARD_TITLES[metric]?.[rank] ?? null;
}

function getLeaderboardHonor(metric: LeaderboardUiMetric, rank: number) {
  const title = getLeaderboardTitle(metric, rank);

  const byMetric: Record<string, Record<number, { badge: string; nickname: string }>> = {
    composite: {
      1: { badge: "Vương miện toàn diện", nickname: "🏆 Học Viên Toàn Diện Số 1" },
      2: { badge: "Huy chương bạc", nickname: "🎯 Cân Bằng Mọi Mặt" },
      3: { badge: "Huy chương đồng", nickname: "🛡️ Nền Tảng Rất Chắc" },
      4: { badge: "Top 4", nickname: "📚 Học Chắc Từng Bước" },
      5: { badge: "Top 5", nickname: "⚖️ Vừa Đều Vừa Sâu" },
    },
    xp: {
      1: { badge: "Vương miện XP", nickname: "Hiền giả Phố Wall" },
      2: { badge: "Huy chương bạc", nickname: "Chiến lược gia vốn" },
      3: { badge: "Huy chương đồng", nickname: "Người leo đỉnh thị trường" },
      4: { badge: "Top 4", nickname: "Người tạo đà" },
      5: { badge: "Top 5", nickname: "Danh mục thăng hạng" },
      6: { badge: "Top 6 Cao Cấp", nickname: "💼 Chuyên Viên Đầu Tư" },
      7: { badge: "Top 7 Đột Phá", nickname: "📊 Bậc Thầy Phân Tích" },
      8: { badge: "Top 8 Tiềm Năng", nickname: "🏛️ Chiến Binh Phố Wall" },
      9: { badge: "Top 9 Thợ Săn", nickname: "💎 Thợ Săn Cổ Phiếu" },
      10: { badge: "Top 10 Danh Giá", nickname: "📈 Chuyên Gia Tài Chính" },
      11: { badge: "Top 11 Sút Tố", nickname: "🚀 Sói Biển Đầu Tư" },
      12: { badge: "Top 12 Bản Lĩnh", nickname: "🏆 Huyền Thoại Tích Lũy" },
      13: { badge: "Top 13 Kiên Cường", nickname: "🎯 Tay Đua Kiến Thức" },
      14: { badge: "Top 14 Bền Vững", nickname: "🛡️ Hiệp Sĩ An Toàn" },
      15: { badge: "Top 15 Thần Tốc", nickname: "⚡ Thần Tốc Học Tập" },
      16: { badge: "Top 16 Tiên Tri", nickname: "🔮 Tiên Tri Thị Trường" },
      17: { badge: "Top 17 Quản Lý", nickname: "💼 Nhà Quản Lý Quỹ" },
      18: { badge: "Top 18 Triển Vọng", nickname: "🎓 Thạc Sĩ Tài Chính" },
      19: { badge: "Top 19 Nỗ Lực", nickname: "🛡️ Bậc Thầy Rủi Rủi" },
      20: { badge: "Top 20 Vinh Danh", nickname: "🌟 Ngôi Sao Triển Vọng" },
    },
    mastery: {
      1: { badge: "Sát hạch vàng", nickname: "Học thật hiểu thật" },
      2: { badge: "Sát hạch bạc", nickname: "Nền tảng rất chắc" },
      3: { badge: "Sát hạch đồng", nickname: "Tư duy kiểm tra tốt" },
      4: { badge: "Top 4", nickname: "Người học có chất lượng" },
      5: { badge: "Top 5", nickname: "Điểm kiểm tra ổn định" },
    },
    lessons: {
      1: { badge: "Vương miện bài học", nickname: "Vua bài học" },
      2: { badge: "Huy chương bạc", nickname: "Người giữ tri thức" },
      3: { badge: "Huy chương đồng", nickname: "Máy học bền bỉ" },
      4: { badge: "Top 4", nickname: "Người chạy trang" },
      5: { badge: "Top 5", nickname: "Độc giả tập trung" },
      6: { badge: "Top 6 Mọt Sách", nickname: "📚 Học Giả Cần Mẫn" },
      7: { badge: "Top 7 Đột Phá", nickname: "📖 Thủ Kho Giáo Trình" },
      8: { badge: "Top 8 Siêu Cấp", nickname: "💡 Bậc Thầy Nhận Thức" },
      9: { badge: "Top 9 Tích Lũy", nickname: "🎓 Học Viên Siêu Cấp" },
      10: { badge: "Top 10 Uy Tín", nickname: "🌟 Tiên Phong Học Tập" },
      11: { badge: "Top 11 Đam Mê", nickname: "✍️ Tay Viết Ghi Chú" },
      12: { badge: "Top 12 Nhẫn Nại", nickname: "🏆 Chiến Binh Đọc Sách" },
      13: { badge: "Top 13 Bền Bỉ", nickname: "🔎 Kẻ Tìm Tòi Tri Thức" },
      14: { badge: "Top 14 Tinh Anh", nickname: "🧠 Bộ Ốc Tài Chính" },
      15: { badge: "Top 15 Tích Cực", nickname: "⚡ Học Viên Năng Lượng" },
      16: { badge: "Top 16 Uy Nghiêm", nickname: "📕 Đội Trưởng Kiến Thức" },
      17: { badge: "Top 17 Vững Vàng", nickname: "💼 Chuyên Viên Nghiên Cứu" },
      18: { badge: "Top 18 Siêu Tốc", nickname: "🚀 Tên Lửa Tri Thức" },
      19: { badge: "Top 19 Chăm Chỉ", nickname: "🌟 Tinh Tú Tích Lũy" },
      20: { badge: "Top 20 Vinh Dự", nickname: "🎖️ Học Viên Tiêu Biểu" },
    },
    avg_score: {
      1: { badge: "Vương miện câu hỏi", nickname: "Nhà tiên tri đáp án" },
      2: { badge: "Huy chương bạc", nickname: "Nhà phân tích chuẩn xác" },
      3: { badge: "Huy chương đồng", nickname: "Người giải sắc bén" },
      4: { badge: "Top 4", nickname: "Người đọc tín hiệu" },
      5: { badge: "Top 5", nickname: "Thợ săn đáp án" },
      6: { badge: "Top 6 Chuẩn Xác", nickname: "🎯 Xạ Thủ Quiz" },
      7: { badge: "Top 7 Sắc Báo", nickname: "🔍 Thấu Thị Đáp Án" },
      8: { badge: "Top 8 Thông Thái", nickname: "🧠 Thần Đồng Logic" },
      9: { badge: "Top 9 Đỉnh Cao", nickname: "💎 Bậc Thầy Trắc Nghiệm" },
      10: { badge: "Top 10 Tuyệt Đối", nickname: "🏆 Kỷ Lục Gia Quiz" },
      11: { badge: "Top 11 Uy Tín", nickname: "⚡ Phản Xạ Thần Tốc" },
      12: { badge: "Top 12 Bản Lĩnh", nickname: "🔮 Tiên Tri Đúng 100%" },
      13: { badge: "Top 13 Vững Vàng", nickname: "🛡️ Khiên Thần Không Sai" },
      14: { badge: "Top 14 Sáng Tạo", nickname: "💡 Bậc Thầy Phân Tích" },
      15: { badge: "Top 15 Tinh Anh", nickname: "🎓 Thầy Quiz Phố Wall" },
      16: { badge: "Top 16 Thần Tốc", nickname: "🚀 Tên Lửa Đáp Án" },
      17: { badge: "Top 17 Kiên Cường", nickname: "⭐ Ngôi Sao Trắc Nghiệm" },
      18: { badge: "Top 18 Nhạy Báo", nickname: "🔍 Cảm Nhận Đáp Án" },
      19: { badge: "Top 19 Sắc Thảo", nickname: "🎯 Bậc Thầy Điểm Tuyệt Đối" },
      20: { badge: "Top 20 Vinh Danh", nickname: "🎖️ Kiện Tướng Trắc Nghiệm" },
    },
    streak: {
      1: { badge: "Vương miện chuỗi ngày", nickname: "Người khổng lồ bền bỉ" },
      2: { badge: "Huy chương bạc", nickname: "Người giữ lửa" },
      3: { badge: "Huy chương đồng", nickname: "Chiến binh mỗi ngày" },
      4: { badge: "Top 4", nickname: "Người xây nếp học" },
      5: { badge: "Top 5", nickname: "Người rèn thói quen" },
      6: { badge: "Top 6 Bền Bỉ", nickname: "🔥 Ngọn Lửa Bất Diệt" },
      7: { badge: "Top 7 Kiên Trì", nickname: "⚡ Chuỗi Ngày Thần Tốc" },
      8: { badge: "Top 8 Kỷ Luật", nickname: "🛡️ Kỷ Luật Thép" },
      9: { badge: "Top 9 Tự Giác", nickname: "🏆 Hiệp Sĩ Mỗi Ngày" },
      10: { badge: "Top 10 Đẳng Cấp", nickname: "🌟 Chiến Thần Học Đều" },
      11: { badge: "Top 11 Nỗ Lực", nickname: "💪 Bền Bỉ Không Ngừng" },
      12: { badge: "Top 12 Dũng Cảm", nickname: "🚀 Tên Lửa Thói Quen" },
      13: { badge: "Top 13 Đam Mê", nickname: "🔥 Trái Tim Nhiệt Huyết" },
      14: { badge: "Top 14 Vững Bước", nickname: "🎯 Bậc Thầy Tự Học" },
      15: { badge: "Top 15 Trung Thành", nickname: "🎓 Học Viên Chăm Chút" },
      16: { badge: "Top 16 Tiên Phong", nickname: "⭐ Ngôi Sao Kiên Trì" },
      17: { badge: "Top 17 Vượt Khó", nickname: "🛡️ Bậc Thầy Thói Quen" },
      18: { badge: "Top 18 Bền Vững", nickname: "🔮 Ngọn Đuốc Tri Thức" },
      19: { badge: "Top 19 Năng Lượng", nickname: "⚡ Năng Lượng Đỉnh Cao" },
      20: { badge: "Top 20 Vinh Danh", nickname: "🎖️ Tinh Anh Mỗi Ngày" },
    },
    badges: {
      1: { badge: "Vương miện huy hiệu", nickname: "Hoàng đế huy hiệu" },
      2: { badge: "Huy chương bạc", nickname: "Bậc thầy mở khóa" },
      3: { badge: "Huy chương đồng", nickname: "Thợ săn thành tựu" },
      4: { badge: "Top 4", nickname: "Nhà sưu tầm danh xưng" },
      5: { badge: "Top 5", nickname: "Người tìm vinh danh" },
      6: { badge: "Top 6 Sưu Tầm", nickname: "💎 Đại Sưu Tập Huy Hiệu" },
      7: { badge: "Top 7 Đột Phá", nickname: "🏆 Thợ Săn Huy Chương" },
      8: { badge: "Top 8 Tinh Anh", nickname: "🌟 Bậc Thầy Thành Tựu" },
      9: { badge: "Top 9 Uy Tín", nickname: "🛡️ Thủ Kho Huy Hiệu" },
      10: { badge: "Top 10 Đẳng Cấp", nickname: "🎓 Chuyên Gia Mở Khóa" },
      11: { badge: "Top 11 Đam Mê", nickname: "⚡ Thần Tốc Sưu Tầm" },
      12: { badge: "Top 12 Bản Lĩnh", nickname: "🚀 Tên Lửa Thành Tựu" },
      13: { badge: "Top 13 Vững Vàng", nickname: "🎯 Sạ Thủ Danh Hiệu" },
      14: { badge: "Top 14 Tích Cực", nickname: "🔥 Ngọn Lửa Vinh Danh" },
      15: { badge: "Top 15 Khám Phá", nickname: "🔮 Kẻ Mở Khóa Bí Ẩn" },
      16: { badge: "Top 16 Uy Nghiêm", nickname: "💼 Nhà Quản Lý Huy Chương" },
      17: { badge: "Top 17 Nỗ Lực", nickname: "⭐ Ngôi Sao Sưu Tầm" },
      18: { badge: "Top 18 Bền Vững", nickname: "🛡️ Hiệp Sĩ Thành Tựu" },
      19: { badge: "Top 19 Tiềm Năng", nickname: "⚡ Tinh Anh Mở Khóa" },
      20: { badge: "Top 20 Vinh Danh", nickname: "🎖️ Danh Hiệu Hoàng Gia" },
    },
    game: {
      1: { badge: "Vương miện trò chơi", nickname: "Huyền thoại vương quốc" },
      2: { badge: "Huy chương bạc", nickname: "Thợ săn Boss" },
      3: { badge: "Huy chương đồng", nickname: "Bậc thầy đấu trường" },
      4: { badge: "Top 4", nickname: "Người phá nhiệm vụ" },
      5: { badge: "Top 5", nickname: "Kỵ sĩ XP" },
      6: { badge: "Top 6 Cao Thủ", nickname: "🎮 Kỷ Lục Gia BCTC" },
      7: { badge: "Top 7 Bản Lĩnh", nickname: "⚡ Thần Tốc Nối Từ" },
      8: { badge: "Top 8 Siêu Cấp", nickname: "🏛️ Trùm Sàn NYSE" },
      9: { badge: "Top 9 Chiến Thần", nickname: "🐂 Sát Thủ Bò Tót" },
      10: { badge: "Top 10 Đẳng Cấp", nickname: "🏆 Chiến Thần PvP 1v1" },
      11: { badge: "Top 11 Đột Phá", nickname: "🎯 Bậc Thầy Bán Khống" },
      12: { badge: "Top 12 Thần Tốc", nickname: "🚀 Tay Đua Nến Nhật" },
      13: { badge: "Top 13 Tinh Anh", nickname: "💼 Sói Bất Động Sản" },
      14: { badge: "Top 14 Phản Xạ", nickname: "⚡ Bậc Thầy Algo" },
      15: { badge: "Top 15 Thợ Săn", nickname: "💎 Thợ Săn Thẻ VN30" },
      16: { badge: "Top 16 Bản Lĩnh", nickname: "🎓 Huyền Thoại Mini Game" },
      17: { badge: "Top 17 Uy Nghiêm", nickname: "🛡️ Hiệp Sĩ Bảng Lô" },
      18: { badge: "Top 18 Sáng Tạo", nickname: "🔮 Tiên Tri Đồ Thị" },
      19: { badge: "Top 19 Tiềm Năng", nickname: "🔥 Ngôi Sao Đấu Trường" },
      20: { badge: "Top 20 Vinh Danh", nickname: "🎖️ Cao Thủ Phố Wall" },
    },
    career: {
      1: { badge: "Vương miện Sự nghiệp", nickname: "🏆 Huyền Thoại Sự Nghiệp Phố Wall" },
      2: { badge: "Huy chương bạc", nickname: "💼 Chuyên Viên Phân Tích Kế Thừa" },
      3: { badge: "Huy chương đồng", nickname: "🏛️ Chuyên Gia Định Giá & M&A" },
      4: { badge: "Top 4 Lộ Trình", nickname: "📊 Bậc Thầy Phân Tích BCTC" },
      5: { badge: "Top 5 Định Hướng", nickname: "🚀 Sói Biển Đầu Tư & Quản Lý" },
      6: { badge: "Top 6 Định Hướng", nickname: "💼 Senior Financial Analyst" },
      7: { badge: "Top 7 Lộ Trình", nickname: "📈 Portfolio Manager" },
      8: { badge: "Top 8 Định Hướng", nickname: "🏛️ Investment Banking Analyst" },
      9: { badge: "Top 9 Bản Lĩnh", nickname: "📊 Chief Accountant Track" },
      10: { badge: "Top 10 Tinh Anh", nickname: "🎓 CFA Track Candidate" },
      11: { badge: "Top 11 Đột Phá", nickname: "🛡️ Risk Management Specialist" },
      12: { badge: "Top 12 Tiềm Năng", nickname: "💎 Private Equity Associate" },
      13: { badge: "Top 13 Tiên Phong", nickname: "🚀 Head of FP&A Track" },
      14: { badge: "Top 14 Định Hướng", nickname: "⚡ Quant Researcher" },
      15: { badge: "Top 15 Tích Cực", nickname: "💼 Corporate Finance Officer" },
      16: { badge: "Top 16 Uy Nghiêm", nickname: "🏆 Chief Financial Officer (CFO)" },
      17: { badge: "Top 17 Vững Vàng", nickname: "⭐ Senior Credit Officer" },
      18: { badge: "Top 18 Nhạy Báo", nickname: "🔍 Valuation Specialist" },
      19: { badge: "Top 19 Sáng Tạo", nickname: "🎯 Wealth Management Leader" },
      20: { badge: "Top 20 Vinh Danh", nickname: "🎖️ Tinh Anh Sự Nghiệp" },
    },
  };

  const dynamicFallback = {
    badge: `Top #${rank}`,
    nickname: `Thành Viên Tích Cực #${rank}`,
  };

  const honor = byMetric[metric]?.[rank] ?? dynamicFallback;

  return {
    title: title ?? honor.badge,
    ...honor,
  };
}

function getPodiumHeight(rank: number) {
  if (rank === 1) return "h-16";
  if (rank === 2) return "h-13";
  if (rank === 3) return "h-11";
  return "h-9";
}

// Custom Styled Metallic Badges
function RankBadgePill({ rank, badgeText }: { rank: number; badgeText: string }) {
  if (rank === 1) {
    return (
      <div className="inline-flex max-w-full items-center gap-1 rounded-full bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-500 px-2 py-0.5 text-[9px] font-black uppercase tracking-wider text-amber-950 shadow-md ring-1 ring-amber-300">
        <Crown className="h-3 w-3 shrink-0 fill-amber-950 text-amber-950" />
        <span className="truncate">{badgeText}</span>
      </div>
    );
  }
  if (rank === 2) {
    return (
      <div className="inline-flex max-w-full items-center gap-1 rounded-full bg-gradient-to-r from-slate-300 via-slate-100 to-slate-400 px-2 py-0.5 text-[9px] font-black uppercase tracking-wider text-slate-900 shadow ring-1 ring-slate-300">
        <Medal className="h-3 w-3 shrink-0 text-slate-800" />
        <span className="truncate">{badgeText}</span>
      </div>
    );
  }
  if (rank === 3) {
    return (
      <div className="inline-flex max-w-full items-center gap-1 rounded-full bg-gradient-to-r from-amber-700 via-amber-600 to-orange-700 px-2 py-0.5 text-[9px] font-black uppercase tracking-wider text-amber-50 shadow ring-1 ring-amber-600">
        <Award className="h-3 w-3 shrink-0 text-amber-50" />
        <span className="truncate">{badgeText}</span>
      </div>
    );
  }
  return (
    <div className="inline-flex max-w-full items-center gap-1 rounded-full bg-gradient-to-r from-stone-100 to-stone-200 dark:from-stone-800 dark:to-stone-800 border border-stone-300 dark:border-stone-700 px-2 py-0.5 text-[9px] font-extrabold uppercase tracking-wider text-stone-700 dark:text-stone-300 shadow-2xs">
      <Star className="h-2.5 w-2.5 shrink-0 text-stone-500" />
      <span className="truncate">{badgeText}</span>
    </div>
  );
}

function getPodiumTone(rank: number) {
  if (rank === 1) {
    return {
      card: "border-amber-300/80 dark:border-amber-500/50 bg-gradient-to-b from-amber-100/90 via-amber-50/50 to-white dark:from-amber-950/60 dark:via-amber-900/40 dark:to-stone-900 shadow-xl shadow-amber-500/10 ring-2 ring-amber-400/30",
      pedestal: "from-amber-500/40 via-amber-400/25 to-amber-300/10 border-amber-400/80",
      chip: "bg-gradient-to-r from-amber-500 to-yellow-500 text-amber-950 font-black shadow-md",
      name: "text-stone-900 dark:text-amber-100",
      value: "text-amber-700 dark:text-amber-300",
      pedestalLabel: "1st",
    };
  }
  if (rank === 2) {
    return {
      card: "border-slate-300 dark:border-slate-700 bg-gradient-to-b from-slate-100/90 via-slate-50/50 to-white dark:from-slate-900/80 dark:via-slate-900/40 dark:to-stone-900 shadow-lg shadow-slate-500/10 ring-1 ring-slate-300/50",
      pedestal: "from-slate-400/35 via-slate-300/20 to-slate-200/10 border-slate-300/80",
      chip: "bg-gradient-to-r from-slate-400 to-slate-600 text-white font-black shadow",
      name: "text-stone-900 dark:text-slate-100",
      value: "text-slate-700 dark:text-slate-300",
      pedestalLabel: "2nd",
    };
  }
  if (rank === 3) {
    return {
      card: "border-amber-700/30 dark:border-amber-700/60 bg-gradient-to-b from-amber-100/60 via-amber-50/40 to-white dark:from-amber-950/40 dark:via-amber-950/20 dark:to-stone-900 shadow-md shadow-orange-500/10 ring-1 ring-amber-600/30",
      pedestal: "from-amber-700/30 via-orange-400/15 to-amber-300/10 border-amber-600/70",
      chip: "bg-gradient-to-r from-amber-700 to-orange-600 text-white font-black shadow",
      name: "text-stone-900 dark:text-amber-200",
      value: "text-orange-700 dark:text-amber-400",
      pedestalLabel: "3rd",
    };
  }
  if (rank === 4) {
    return {
      card: "border-violet-200 dark:border-violet-900 bg-gradient-to-b from-violet-50/70 via-white to-violet-50/30 dark:from-violet-950/40 dark:via-stone-900 dark:to-stone-900 shadow-sm",
      pedestal: "from-violet-400/20 via-violet-300/10 to-transparent border-violet-200/70",
      chip: "bg-violet-600 text-white font-black",
      name: "text-stone-900 dark:text-violet-200",
      value: "text-violet-700 dark:text-violet-400",
      pedestalLabel: "4th",
    };
  }
  return {
    card: "border-emerald-200 dark:border-emerald-900 bg-gradient-to-b from-emerald-50/70 via-white to-emerald-50/30 dark:from-emerald-950/40 dark:via-stone-900 dark:to-stone-900 shadow-sm",
    pedestal: "from-emerald-400/20 via-emerald-300/10 to-transparent border-emerald-200/70",
    chip: "bg-emerald-600 text-white font-black",
    name: "text-stone-900 dark:text-emerald-200",
    value: "text-emerald-700 dark:text-emerald-400",
    pedestalLabel: "5th",
  };
}

export default function Leaderboard({ userId, compact = false }: { userId?: string; compact?: boolean }) {
  const { t } = useI18n();
  const [metric, setMetric] = useState<LeaderboardUiMetric>("composite");
  const [entries, setEntries] = useState<(LeaderboardRow & { careerTitle?: string; careerEmoji?: string })[]>([]);
  const [myRank, setMyRank] = useState<{ rank: number; value: number } | null>(null);
  // Component breakdown for the composite tab, so the score isn't opaque.
  const [myComposite, setMyComposite] = useState<CompositeRank | null>(null);
  const [loading, setLoading] = useState(true);
  const [switching, setSwitching] = useState(false);
  const leadTabsRef = useRef<HTMLDivElement>(null);

  const activeTab = TABS.find((tab) => tab.metric === metric)!;

  useEffect(() => {
    let cancelled = false;
    setSwitching(true);

    (async () => {
      try {
        let top: (LeaderboardRow & { careerTitle?: string; careerEmoji?: string })[] = [];
        let mine: { rank: number; value: number } | null = null;

        if (metric === "composite") {
          const [topRows, mineRank] = await Promise.all([
            getCompositeLeaderboard(20),
            userId ? getMyCompositeRank(userId) : Promise.resolve(null),
          ]);
          top = topRows;
          mine = mineRank;
          if (!cancelled) setMyComposite(mineRank);
        } else if (metric === "mastery") {
          const [topRows, mineRank] = await Promise.all([
            getLeaderboardByMetric("avg_score", 20),
            userId ? getMyLeaderboardRank("avg_score", userId) : Promise.resolve(null),
          ]);
          top = topRows.filter((row) => row.value > 0);
          mine = mineRank;
        } else if (metric === "game") {
          const gameRows = await getCombinedGameLeaderboard(50);
          top = gameRows.slice(0, 20).map((row) => ({
            user_id: row.user_id,
            value: row.totalXp,
            name: row.name,
            avatarUrl: row.avatarUrl,
          }));
          if (userId) {
            const myIndex = gameRows.findIndex((r) => r.user_id === userId);
            if (myIndex !== -1) mine = { rank: myIndex + 1, value: gameRows[myIndex].totalXp };
          }
        } else if (metric === "career") {
          const careerRows = await getCareerLeaderboard(20);
          top = careerRows.map((row) => ({
            user_id: row.user_id,
            value: row.value,
            name: row.name,
            avatarUrl: row.avatarUrl,
            careerTitle: row.careerTitle,
            careerEmoji: row.careerEmoji,
          }));
          if (userId) {
            const myIndex = careerRows.findIndex((r) => r.user_id === userId);
            if (myIndex !== -1) mine = { rank: myIndex + 1, value: careerRows[myIndex].value };
          }
        } else if (metric === "cfa") {
          const { getCfaLeaderboard } = await import("@/lib/cfa-track");
          const cfaRows = await getCfaLeaderboard(20);
          top = cfaRows.map((row) => ({
            user_id: row.user_id,
            value: row.value,
            name: row.name,
            avatarUrl: row.avatarUrl,
          }));
          if (userId) {
            const myIndex = cfaRows.findIndex((r) => r.user_id === userId);
            if (myIndex !== -1) mine = { rank: myIndex + 1, value: cfaRows[myIndex].value };
          }
        } else if (metric === "community") {
          const baseRows = await getLeaderboardByMetric("xp", 20);
          top = baseRows.map((row, idx) => ({
            user_id: row.user_id,
            value: Math.max(2, Math.round(row.value * 0.15) + (35 - idx * 2)),
            name: row.name,
            avatarUrl: row.avatarUrl,
          }));
          if (userId) {
            const myIndex = top.findIndex((r) => r.user_id === userId);
            if (myIndex !== -1) mine = { rank: myIndex + 1, value: top[myIndex].value };
          }
        } else {
          const [topRows, mineRank] = await Promise.all([
            getLeaderboardByMetric(metric as LeaderboardMetric, 20),
            userId ? getMyLeaderboardRank(metric as LeaderboardMetric, userId) : Promise.resolve(null),
          ]);
          top = topRows;
          mine = mineRank;
        }

        if (cancelled) return;
        setEntries(top);
        setMyRank(mine);
      } catch (error) {
        console.error("Error loading leaderboard:", error);
        if (!cancelled) {
          setEntries([]);
          setMyRank(null);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
          setSwitching(false);
        }
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [metric, userId]);

  const podiumEntries = useMemo(() => entries.slice(0, 5), [entries]);
  const remainingEntries = useMemo(() => entries.slice(5), [entries]);

  if (compact) {
    return (
      <div className="rounded-[28px] border border-stone-200/90 dark:border-stone-800 bg-white/95 dark:bg-stone-900 p-4 sm:p-5 shadow-[0_20px_50px_-35px_rgba(15,23,42,0.18)]">
        <div className="flex items-start justify-between gap-3 border-b border-stone-200/80 dark:border-stone-800 pb-4">
          <div>
            <div className="inline-flex items-center gap-1.5 rounded-full border border-amber-300 dark:border-amber-700 bg-amber-50 dark:bg-amber-950/60 px-3 py-1 text-[11px] font-extrabold uppercase tracking-[0.16em] text-amber-700 dark:text-amber-400 shadow-xs">
              <Trophy className="h-3.5 w-3.5 fill-amber-400 text-amber-600 dark:text-amber-400" />
              {t.leaderboard.eyebrowCompact}
            </div>
            <h2 className="mt-2.5 text-2xl font-black tracking-tight text-stone-900 dark:text-stone-100">{t.leaderboard.titleCompact}</h2>
          </div>
          <div className="inline-flex items-center gap-1.5 rounded-2xl border border-emerald-200 dark:border-emerald-900 bg-emerald-50 dark:bg-emerald-950/60 px-3 py-1.5 text-xs font-bold text-emerald-700 dark:text-emerald-400 shadow-xs">
            <Sparkles className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
            {t.leaderboard[activeTab.labelKey]}
          </div>
        </div>

        {/* Tab Selection */}
        <div className="relative mt-4 group/lead-tabs">
          <button
            type="button"
            onClick={() => leadTabsRef.current?.scrollBy({ left: -160, behavior: "smooth" })}
            className="absolute -left-2.5 top-1/2 -translate-y-1/2 z-10 w-7 h-7 rounded-full bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 shadow-md flex items-center justify-center text-stone-600 dark:text-stone-300 hover:bg-stone-50 dark:hover:bg-stone-700 transition-all cursor-pointer hidden sm:flex"
            aria-label={t.leaderboard.scrollLeft}
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => leadTabsRef.current?.scrollBy({ left: 160, behavior: "smooth" })}
            className="absolute -right-2.5 top-1/2 -translate-y-1/2 z-10 w-7 h-7 rounded-full bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 shadow-md flex items-center justify-center text-stone-600 dark:text-stone-300 hover:bg-stone-50 dark:hover:bg-stone-700 transition-all cursor-pointer hidden sm:flex"
            aria-label={t.leaderboard.scrollRight}
          >
            <ChevronRight className="w-4 h-4" />
          </button>
          <div
            ref={leadTabsRef}
            className="flex gap-1 overflow-x-auto rounded-2xl bg-stone-100/90 dark:bg-stone-900/90 p-1 scrollbar-none px-2 sm:px-4"
          >
            {TABS.map((tab) => {
              const Icon = tab.icon;
              const isActive = metric === tab.metric;
              return (
                <button
                  key={tab.metric}
                  onClick={() => {
                    if (tab.metric !== metric) setMetric(tab.metric);
                  }}
                  className={`flex shrink-0 whitespace-nowrap items-center gap-1.5 rounded-xl px-3 py-2 text-xs font-bold transition-all cursor-pointer ${
                    isActive
                      ? "bg-white dark:bg-stone-800 text-stone-900 dark:text-white shadow-md ring-1 ring-stone-200/60 dark:ring-stone-700 font-extrabold"
                      : "text-stone-500 dark:text-stone-400 hover:bg-white/50 dark:hover:bg-stone-800/50 hover:text-stone-800 dark:hover:text-stone-200"
                  }`}
                >
                  <Icon className={`h-3.5 w-3.5 ${isActive ? "text-amber-500" : "text-stone-400"}`} />
                  <span>{t.leaderboard[tab.labelKey]}</span>
                </button>
              );
            })}
          </div>
        </div>

        {metric === "composite" && (
          <div className="mt-3 rounded-2xl border border-violet-200 dark:border-violet-900 bg-gradient-to-r from-violet-50 via-white to-emerald-50 dark:from-violet-950/50 dark:via-stone-900 dark:to-emerald-950/30 px-4 py-3 shadow-xs">
            <div className="flex items-start gap-2.5">
              <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-violet-600 text-white shadow-sm">
                <ShieldCheck className="h-4 w-4" />
              </div>
              <div className="min-w-0">
                <p className="text-xs font-black text-stone-900 dark:text-stone-100">{t.leaderboard.compositeTitle}</p>
                <p className="mt-0.5 text-[11px] font-medium leading-relaxed text-stone-500 dark:text-stone-400">
                  {t.leaderboard.compositeDescPrefix} <strong>35%</strong> {t.leaderboard.compositeDescXp}{" "}
                  <strong>30%</strong> {t.leaderboard.compositeDescExam} <strong>20%</strong> {t.leaderboard.compositeDescAccuracy}{" "}
                  <strong>15%</strong> {t.leaderboard.compositeDescStreak}
                </p>
                {myComposite && (
                  <div className="mt-2 grid grid-cols-2 gap-1.5 sm:grid-cols-4">
                    {[
                      { label: t.leaderboard.compositeLearningXp, value: `${Math.round(myComposite.learningXp)}` },
                      { label: t.leaderboard.compositeExamPoints, value: `${Math.round(myComposite.examPoints)}/1400` },
                      { label: t.leaderboard.compositeAccuracy, value: `${Math.round(myComposite.accuracy)}%` },
                      { label: t.leaderboard.compositeStreak, value: `${Math.round(myComposite.streakDays)}` },
                    ].map((item) => (
                      <div
                        key={item.label}
                        className="rounded-xl border border-stone-200 dark:border-stone-800 bg-white/80 dark:bg-stone-900/80 px-2 py-1.5"
                      >
                        <p className="text-[9px] font-extrabold uppercase tracking-wide text-stone-400 dark:text-stone-500">
                          {item.label}
                        </p>
                        <p className="text-[11px] font-black text-stone-900 dark:text-stone-100">{item.value}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {metric === "mastery" && (
          <div className="mt-3 rounded-2xl border border-emerald-200 dark:border-emerald-900 bg-gradient-to-r from-emerald-50 via-white to-sky-50 dark:from-emerald-950/50 dark:via-stone-900 dark:to-sky-950/30 px-4 py-3 shadow-xs">
            <div className="flex items-start gap-2.5">
              <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-emerald-600 text-white shadow-sm">
                <ShieldCheck className="h-4 w-4" />
              </div>
              <div>
                <p className="text-xs font-black text-stone-900 dark:text-stone-100">{t.leaderboard.masteryTitle}</p>
                <p className="mt-0.5 text-[11px] font-medium leading-relaxed text-stone-500 dark:text-stone-400">
                  {t.leaderboard.masteryDesc}
                </p>
              </div>
            </div>
          </div>
        )}

        {loading ? (
          <div className="mt-8 flex flex-col items-center justify-center py-10">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-amber-400 border-t-transparent" />
            <p className="mt-3 text-xs font-semibold text-stone-500 dark:text-stone-400">{t.leaderboard.loadingCompact}</p>
          </div>
        ) : entries.length === 0 ? (
          <p className="mt-6 py-8 text-center text-sm text-stone-500 dark:text-stone-400">{t.leaderboard.empty}</p>
        ) : (
          <div className={`mt-5 space-y-4 transition-opacity duration-150 ${switching ? "opacity-40" : "opacity-100"}`}>
            {/* Podium Top 5 */}
            <div className="pt-6 pb-2 overflow-x-auto scrollbar-none">
              <div className="mx-auto grid min-w-[340px] grid-cols-5 items-end gap-1.5 px-0.5">
                {PODIUM_ORDER.map((podiumIndex) => {
                  const entry = podiumEntries[podiumIndex];
                  if (!entry) return null;
                  const rank = podiumIndex + 1;
                  const tone = getPodiumTone(rank);
                  const href = entry.user_id === userId ? "/profile" : `/nguoi-hoc/${entry.user_id}`;
                  const isChampion = rank === 1;

                  return (
                    <Link key={entry.user_id} href={href} className="group flex min-w-0 flex-col items-center">
                      <div className={`w-full rounded-2xl border px-1.5 py-3 text-center transition-all duration-200 group-hover:-translate-y-1 ${tone.card} ${isChampion ? "scale-[1.03] z-10" : ""}`}>
                        {/* Avatar with Frame */}
                        <div className="mx-auto mb-2 flex justify-center">
                          <AvatarWithFrame rank={rank} name={entry.name} avatarUrl={entry.avatarUrl} size={isChampion ? 44 : 36} />
                        </div>

                        {/* Rank Badge */}
                        <div className={`mx-auto mb-1.5 inline-flex h-5 min-w-5 items-center justify-center rounded-full px-1.5 text-[10px] font-black ${tone.chip}`}>
                          #{rank}
                        </div>

                        {/* Honor Badge Pill */}
                        <div className="mb-1 flex justify-center">
                          <RankBadgePill rank={rank} badgeText={getLeaderboardHonor(metric, rank).badge} />
                        </div>

                        <p className={`text-xs font-black leading-tight line-clamp-1 break-words ${tone.name}`}>{entry.name}</p>
                        <p className="mt-0.5 text-[8px] font-extrabold uppercase leading-tight text-emerald-600 dark:text-emerald-400 line-clamp-1 break-words">
                          {entry.careerTitle ? `${entry.careerEmoji || "💼"} ${entry.careerTitle}` : getLeaderboardHonor(metric, rank).nickname}
                        </p>
                        <p className={`mt-1 text-[11px] font-black leading-tight ${tone.value}`}>{activeTab.format(entry.value, t.leaderboard.units)}</p>
                      </div>

                      {/* 3D Pedestal Step Base */}
                      <div className={`mt-1 w-full rounded-t-xl border-x border-t bg-gradient-to-t ${tone.pedestal} ${getPodiumHeight(rank)} flex items-center justify-center font-black text-[10px] uppercase text-stone-400/80 shadow-xs`}>
                        {tone.pedestalLabel}
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* Sub-ranks #6+ Framed Cards */}
            <div className="border-t border-stone-200/80 dark:border-stone-800 pt-3">
              <div className="mb-3 flex items-center justify-between">
                <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-stone-500 dark:text-stone-400">{t.leaderboard.nextRanks}</p>
                <span className="text-[10px] font-black text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/60 px-2 py-0.5 rounded-full border border-amber-200 dark:border-amber-800">
                  {t.leaderboard.rangeCompact}
                </span>
              </div>
            </div>

            <div className="space-y-2">
              {entries.slice(5, 10).map((entry, idx) => {
                const actualRank = idx + 6;
                const href = entry.user_id === userId ? "/profile" : `/nguoi-hoc/${entry.user_id}`;
                const isCurrent = entry.user_id === userId;
                const honor = getLeaderboardHonor(metric, actualRank);

                return (
                  <Link
                    key={entry.user_id}
                    href={href}
                    className={`flex items-center justify-between gap-3 rounded-2xl border p-2.5 transition-all shadow-xs group ${
                      isCurrent
                        ? "border-emerald-300 dark:border-emerald-800 bg-gradient-to-r from-emerald-50 via-white to-emerald-50/80 dark:from-emerald-950/50 dark:via-stone-900 dark:to-emerald-950/30 ring-2 ring-emerald-400/50 shadow-md"
                        : "border-stone-200/90 dark:border-stone-800 bg-gradient-to-r from-stone-50/80 via-white to-amber-50/20 dark:from-stone-900 dark:via-stone-900 dark:to-stone-900 hover:border-amber-300 dark:hover:border-amber-700 hover:shadow-md hover:-translate-y-0.5"
                    }`}
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      {/* Metallic Rank Shield Badge */}
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-stone-100 to-stone-200 dark:from-stone-800 dark:to-stone-700 font-black text-xs text-stone-700 dark:text-stone-200 shadow-inner border border-stone-300/80 dark:border-stone-700 group-hover:scale-105 transition-transform">
                        #{actualRank}
                      </div>

                      {/* Framed Avatar */}
                      <AvatarWithFrame rank={actualRank} name={entry.name} avatarUrl={entry.avatarUrl} size={36} />

                      <div className="min-w-0 flex-1">
                        <p className="truncate text-xs font-black text-stone-900 dark:text-stone-100 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">{entry.name}</p>
                        <p className="truncate text-[9px] font-extrabold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                          {entry.careerTitle ? `${entry.careerEmoji || "💼"} ${entry.careerTitle}` : honor.nickname}
                        </p>
                      </div>
                    </div>

                    <div className="text-right shrink-0">
                      {/* Framed Badge Tag */}
                      <div className="inline-flex items-center gap-1 rounded-full bg-gradient-to-r from-amber-500/10 via-amber-400/20 to-amber-500/10 dark:from-amber-950/60 dark:to-amber-900/40 px-2 py-0.5 text-[9px] font-black uppercase text-amber-800 dark:text-amber-300 border border-amber-300/50 dark:border-amber-800 mb-0.5">
                        <Star className="h-2.5 w-2.5 fill-amber-500 text-amber-500" />
                        <span>{honor.badge}</span>
                      </div>
                      <p className="text-xs font-black text-stone-900 dark:text-stone-100">{activeTab.format(entry.value, t.leaderboard.units)}</p>
                    </div>
                  </Link>
                );
              })}
            </div>

            {/* User MyRank Banner */}
            {myRank && (
              <div className="rounded-2xl border border-dashed border-amber-300 dark:border-amber-700/80 bg-gradient-to-r from-amber-50/80 via-yellow-50/40 to-amber-50/80 dark:from-amber-950/50 dark:via-amber-900/30 dark:to-amber-950/50 px-4 py-3 shadow-xs">
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2.5">
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-400 text-amber-950 shadow">
                      <Trophy className="h-4 w-4 fill-amber-950 text-amber-950" />
                    </div>
                    <div>
                      <p className="text-xs font-black text-stone-900 dark:text-stone-100">{t.leaderboard.yourRank}</p>
                      <p className="text-[10px] font-semibold text-stone-500 dark:text-stone-400">
                        {formatI18n(t.leaderboard.byMetricCompact, { metric: t.leaderboard[activeTab.labelKey].toLowerCase() })}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-black text-amber-600 dark:text-amber-400">#{myRank.rank}</p>
                    <p className="text-xs font-extrabold text-stone-700 dark:text-stone-300">{activeTab.format(myRank.value, t.leaderboard.units)}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="rounded-[28px] border border-stone-200 bg-white p-5 sm:p-6 lg:p-7 shadow-[0_20px_50px_-35px_rgba(15,23,42,0.22)]">
      <div className="flex flex-col gap-4 border-b border-stone-200 pb-5 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-amber-300 bg-amber-50 px-3.5 py-1 text-[11px] font-extrabold uppercase tracking-[0.18em] text-amber-700 shadow-xs">
            <Trophy className="h-3.5 w-3.5 fill-amber-400 text-amber-600" />
            {t.leaderboard.eyebrowFull}
          </div>
          <h2 className="mt-2.5 text-3xl font-black tracking-tight text-stone-900 sm:text-4xl">{t.leaderboard.titleFull}</h2>
        </div>
        <div className="inline-flex items-center gap-2 rounded-2xl border border-emerald-200 bg-emerald-50 px-3.5 py-2 text-sm font-bold text-emerald-700 shadow-xs">
          <Sparkles className="h-4 w-4 text-emerald-600" />
          {t.leaderboard[activeTab.labelKey]}
        </div>
      </div>

      {/* Tabs */}
      <div className="mt-5 flex gap-1.5 overflow-x-auto rounded-2xl bg-stone-100 p-1.5 scrollbar-none">
        {TABS.map((tab) => {
          const Icon = tab.icon;
          const isActive = metric === tab.metric;
          return (
            <button
              key={tab.metric}
              onClick={() => {
                if (tab.metric !== metric) setMetric(tab.metric);
              }}
              className={`flex shrink-0 items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-bold transition-all ${
                isActive
                  ? "bg-white text-stone-900 shadow-md ring-1 ring-stone-200/80"
                  : "text-stone-500 hover:bg-white/60 hover:text-stone-800"
              }`}
            >
              <Icon className={`h-4 w-4 ${isActive ? "text-amber-500" : "text-stone-400"}`} />
              <span>{t.leaderboard[tab.labelKey]}</span>
            </button>
          );
        })}
      </div>

      {loading ? (
        <div className="mt-12 flex flex-col items-center justify-center py-12">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-amber-400 border-t-transparent" />
          <p className="mt-4 text-sm font-semibold text-stone-500">{t.leaderboard.loadingFull}</p>
        </div>
      ) : entries.length === 0 ? (
        <p className="mt-8 py-12 text-center text-sm text-stone-500">{t.leaderboard.empty}</p>
      ) : (
        <div className={`transition-opacity duration-150 ${switching ? "opacity-40" : "opacity-100"}`}>
          {/* Top 5 Podium */}
          <div className="mt-8 pt-6 pb-2 overflow-x-auto scrollbar-none">
            <div className="mx-auto grid min-w-[500px] grid-cols-5 items-end justify-center gap-2 px-1">
              {PODIUM_ORDER.map((podiumIndex) => {
                const entry = podiumEntries[podiumIndex];
                if (!entry) return null;
                const rank = podiumIndex + 1;
                const tone = getPodiumTone(rank);
                const href = entry.user_id === userId ? "/profile" : `/nguoi-hoc/${entry.user_id}`;
                const isChampion = rank === 1;

                return (
                  <Link key={entry.user_id} href={href} className="group flex min-w-0 flex-col items-center">
                    <div className={`w-full rounded-[24px] border px-2.5 py-4 text-center transition-all duration-200 group-hover:-translate-y-1.5 ${tone.card} ${isChampion ? "scale-[1.04] z-10" : ""}`}>
                      {/* Avatar with Frame */}
                      <div className="mx-auto mb-3 flex justify-center">
                        <AvatarWithFrame rank={rank} name={entry.name} avatarUrl={entry.avatarUrl} size={isChampion ? 52 : 44} />
                      </div>

                      {/* Rank Chip */}
                      <div className={`mx-auto mb-2 inline-flex h-6 min-w-6 items-center justify-center rounded-full px-2 text-xs font-black ${tone.chip}`}>
                        #{rank}
                      </div>

                      {/* Badge Pill */}
                      <div className="mb-1.5 flex justify-center">
                        <RankBadgePill rank={rank} badgeText={getLeaderboardHonor(metric, rank).badge} />
                      </div>

                      <p className="text-sm font-black leading-tight text-stone-900 line-clamp-1 break-words">{entry.name}</p>
                      <p className="mt-1 text-[9px] font-extrabold uppercase leading-tight text-emerald-600 dark:text-emerald-400 line-clamp-1 break-words">
                        {entry.careerTitle ? `${entry.careerEmoji || "💼"} ${entry.careerTitle}` : getLeaderboardHonor(metric, rank).nickname}
                      </p>
                      <p className={`mt-1.5 text-sm font-black ${tone.value}`}>{activeTab.format(entry.value, t.leaderboard.units)}</p>
                    </div>

                    {/* Pedestal Step */}
                    <div className={`mt-1.5 w-full rounded-t-[20px] border-x border-t bg-gradient-to-t ${tone.pedestal} ${getPodiumHeight(rank)} flex items-center justify-center font-black text-xs uppercase text-stone-400/80 shadow-xs`}>
                      {tone.pedestalLabel}
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Remaining Ranks #6+ Framed Cards */}
          <div className="mt-8 rounded-[26px] border border-stone-200/80 bg-stone-50/70 p-4 sm:p-5">
            <div className="mb-4 flex items-center justify-between border-b border-stone-200/60 pb-3">
              <div className="flex items-center gap-2">
                <BookOpen className="h-4 w-4 text-amber-600" />
                <h3 className="text-xs font-black uppercase tracking-[0.16em] text-stone-600">{t.leaderboard.nextRanks}</h3>
              </div>
              <span className="text-[10px] font-black text-amber-700 bg-amber-100/70 px-2.5 py-0.5 rounded-full border border-amber-300/60">
                {t.leaderboard.rangeFull}
              </span>
            </div>

            <div className="space-y-2.5">
              {remainingEntries.map((entry, idx) => {
                const rank = idx + 6;
                const href = entry.user_id === userId ? "/profile" : `/nguoi-hoc/${entry.user_id}`;
                const isCurrent = entry.user_id === userId;
                const honor = getLeaderboardHonor(metric, rank);

                return (
                  <Link
                    key={entry.user_id}
                    href={href}
                    className={`flex items-center justify-between gap-4 rounded-2xl border p-3 transition-all shadow-xs group ${
                      isCurrent
                        ? "border-emerald-300 bg-gradient-to-r from-emerald-50 via-white to-emerald-50/90 ring-2 ring-emerald-400/60 shadow-md"
                        : "border-stone-200/90 bg-gradient-to-r from-stone-50/90 via-white to-amber-50/30 hover:border-amber-300 hover:shadow-md hover:-translate-y-0.5"
                    }`}
                  >
                    <div className="flex min-w-0 items-center gap-3">
                      {/* Metallic Rank Shield Badge */}
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-stone-100 via-stone-50 to-amber-100/60 font-black text-xs text-stone-700 shadow-inner border border-stone-300/80 group-hover:scale-105 transition-transform">
                        #{rank}
                      </div>

                      {/* Avatar with Custom Frame */}
                      <AvatarWithFrame rank={rank} name={entry.name} avatarUrl={entry.avatarUrl} size={38} />

                      <div className="min-w-0">
                        <p className="truncate font-black text-stone-900 group-hover:text-amber-700 transition-colors">{entry.name}</p>
                        <p className="truncate text-[11px] font-extrabold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                          {entry.careerTitle ? `${entry.careerEmoji || "💼"} ${entry.careerTitle}` : honor.nickname}
                        </p>
                      </div>
                    </div>

                    <div className="text-right shrink-0">
                      <div className="inline-flex items-center gap-1 rounded-full bg-gradient-to-r from-amber-500/10 via-amber-400/20 to-amber-500/10 px-2.5 py-0.5 text-[10px] font-black uppercase text-amber-800 border border-amber-300/50 mb-0.5">
                        <Star className="h-2.5 w-2.5 fill-amber-500 text-amber-500" />
                        <span>{honor.badge}</span>
                      </div>
                      <p className={`font-black ${isCurrent ? "text-emerald-700" : "text-stone-800"}`}>{activeTab.format(entry.value, t.leaderboard.units)}</p>
                    </div>
                  </Link>
                );
              })}
            </div>

            {/* My Rank Footer */}
            {myRank && (
              <div className="mt-4 rounded-2xl border border-dashed border-amber-300 bg-gradient-to-r from-amber-50/80 via-yellow-50/40 to-amber-50/80 px-4 py-3 shadow-xs">
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-amber-400 to-yellow-500 text-amber-950 shadow">
                      <Trophy className="h-5 w-5 fill-amber-950 text-amber-950" />
                    </div>
                    <div>
                      <p className="text-sm font-black text-stone-900">{t.leaderboard.yourRank}</p>
                      <p className="text-xs text-stone-500">
                        {formatI18n(t.leaderboard.byMetricFull, { metric: t.leaderboard[activeTab.labelKey].toLowerCase() })}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-base font-black text-amber-600">#{myRank.rank}</p>
                    <p className="text-xs font-extrabold text-stone-700">{activeTab.format(myRank.value, t.leaderboard.units)}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
