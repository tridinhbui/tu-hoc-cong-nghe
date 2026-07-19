import { MousePointerClick } from "lucide-react";
import type { FeatureEventStat } from "@/lib/admin/feature-events";

const EVENT_NAME_LABELS: Record<string, string> = {
  game_open: "Mở game",
  game_hub_tab_click: "Click tab Games/BXH tổng hợp",
  game_inner_tab_click: "Click tab Chơi/BXH/Lịch sử trong game",
  nav_click: "Click điều hướng",
  career_roadmap_node_click: "Click node bản đồ sự nghiệp",
  career_card_click: "Click thẻ nghề nghiệp",
  career_quiz_recommendation_click: "Click gợi ý từ quiz hướng nghiệp",
  leaderboard_tab_click: "Click tab bảng xếp hạng",
  study_room_random_match: "Ghép nhóm ngẫu nhiên",
  study_room_manual_join: "Tham gia phòng thủ công",
  document_open: "Mở tài liệu",
  document_download: "Tải tài liệu",
  flashcard_review: "Đánh giá thẻ ghi nhớ",
  resume_learning_click: "Click tiếp tục học",
};

function eventLabel(eventName: string): string {
  return EVENT_NAME_LABELS[eventName] ?? eventName;
}

// Shows which tracked features get clicked most, over the last 30 days - see
// lib/feature-events.ts for the client-side tracking helper and
// supabase/migrations/20260719_feature_click_events.sql for the underlying
// table. Purely a "what to build/improve next" signal, not a full analytics
// suite - grouped by (event_name, metadata.label) so e.g. "game_open" shows
// per-game breakdown instead of one lump count.
export default function FeatureEventsPanel({ stats }: { stats: FeatureEventStat[] }) {
  const total = stats.reduce((sum, s) => sum + s.count, 0);
  const top = stats.slice(0, 15);
  const maxCount = Math.max(...top.map((s) => s.count), 1);

  return (
    <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-xl p-5">
      <div className="flex items-center justify-between mb-1">
        <h2 className="text-sm font-extrabold text-stone-900 dark:text-stone-100 uppercase tracking-widest flex items-center gap-2">
          <MousePointerClick className="w-4 h-4 text-stone-400" />
          Tương tác tính năng (30 ngày)
        </h2>
        <span className="text-xs text-stone-500 dark:text-stone-400">{total} lượt click</span>
      </div>
      <p className="text-xs text-stone-500 dark:text-stone-400 mb-4">
        Tính năng nào được click nhiều nhất - dùng để ưu tiên phát triển.
      </p>

      {top.length === 0 ? (
        <p className="text-xs text-stone-400 dark:text-stone-500 py-6 text-center">
          Chưa có dữ liệu click nào được ghi nhận trong 30 ngày qua.
        </p>
      ) : (
        <div className="space-y-2.5">
          {top.map((stat) => (
            <div key={`${stat.eventName}::${stat.label ?? ""}`} className="text-xs">
              <div className="flex items-center justify-between mb-1">
                <span className="font-bold text-stone-700 dark:text-stone-300 truncate">
                  {eventLabel(stat.eventName)}
                  {stat.label && <span className="text-stone-400 dark:text-stone-500"> · {stat.label}</span>}
                </span>
                <span className="font-extrabold text-stone-900 dark:text-stone-100 shrink-0 ml-2">{stat.count}</span>
              </div>
              <div className="h-1.5 rounded-full bg-stone-100 dark:bg-stone-800 overflow-hidden">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-teal-500"
                  style={{ width: `${(stat.count / maxCount) * 100}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
