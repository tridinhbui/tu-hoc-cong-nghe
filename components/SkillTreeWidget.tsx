"use client";

import React from "react";
import { SKILL_TREE, SkillNode } from "@/lib/gamification";
import { CheckCircle2, Lock, Play } from "lucide-react";
import Link from "next/link";

interface SkillTreeWidgetProps {
  completedLessonIds: number[];
  /** Slug của bài tương ứng mỗi `SkillNode.requiredLessonId`, để nút "Học ngay"
   *  dẫn tới đúng bài của node. Node nào không tra được slug thì không render
   *  nút - thà thiếu một lối đi còn hơn một lối đi sai. */
  lessonSlugById: Record<number, string>;
}

export default function SkillTreeWidget({ completedLessonIds, lessonSlugById }: SkillTreeWidgetProps) {
  const completedIdsSet = new Set(completedLessonIds);

  const getStatus = (node: SkillNode) => {
    if (completedIdsSet.has(node.requiredLessonId)) {
      return "completed";
    }
    // Một node được học nếu prereq của nó hoàn thành
    const prereqsMet = node.prerequisites.every((prereqId) => {
      const prereq = SKILL_TREE.find((n) => n.id === prereqId);
      return prereq && completedIdsSet.has(prereq.requiredLessonId);
    });
    
    if (node.prerequisites.length === 0 || prereqsMet) {
      return "in_progress";
    }
    return "locked";
  };

  return (
    <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl p-6 shadow-sm mt-6">
      <h3 className="text-lg font-bold text-stone-900 dark:text-stone-100 mb-2">
        🌲 Cây Kỹ Năng Tài Chính (Finance Skill Tree)
      </h3>
      <p className="text-sm text-stone-500 dark:text-stone-400 mb-6">
        Theo dõi lộ trình phát triển năng lực tài chính cốt lõi theo logic tiên quyết khoa học.
      </p>

      <div className="flex flex-col gap-6 max-w-lg mx-auto relative">
        {SKILL_TREE.map((node, index) => {
          const status = getStatus(node);
          
          return (
            <div key={node.id} className="relative flex items-center gap-4 group">
              {/* Cột nối đường dẫn */}
              {index < SKILL_TREE.length - 1 && (
                <div className="absolute left-6 top-12 bottom-[-24px] w-0.5 bg-stone-200 dark:bg-stone-800 z-0" />
              )}

              {/* Icon Trạng thái */}
              <div
                className={`w-12 h-12 rounded-full flex items-center justify-center z-10 transition-all ${
                  status === "completed"
                    ? "bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 border-2 border-emerald-500"
                    : status === "in_progress"
                    ? "bg-amber-100 dark:bg-amber-950 text-amber-600 dark:text-amber-400 border-2 border-amber-500 animate-pulse"
                    : "bg-stone-100 dark:bg-stone-800 text-stone-400 border border-stone-300 dark:border-stone-700"
                }`}
              >
                {status === "completed" ? (
                  <CheckCircle2 className="w-6 h-6" />
                ) : status === "in_progress" ? (
                  <Play className="w-5 h-5 fill-current" />
                ) : (
                  <Lock className="w-5 h-5" />
                )}
              </div>

              {/* Chi tiết Node */}
              <div
                className={`flex-1 border p-4 rounded-xl transition-all ${
                  status === "completed"
                    ? "bg-stone-50 dark:bg-stone-900/40 border-emerald-200 dark:border-emerald-900"
                    : status === "in_progress"
                    ? "bg-amber-50/50 dark:bg-amber-950/20 border-amber-200 dark:border-amber-900"
                    : "bg-stone-50/20 dark:bg-stone-900/10 border-stone-200 dark:border-stone-800 opacity-60"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-stone-400">
                    {node.domain.replace("_", " ")}
                  </span>
                  <span
                    className={`text-xs px-2 py-0.5 rounded font-medium ${
                      status === "completed"
                        ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300"
                        : status === "in_progress"
                        ? "bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300"
                        : "bg-stone-100 text-stone-600 dark:bg-stone-800 dark:text-stone-400"
                    }`}
                  >
                    {status === "completed" ? "Đã học" : status === "in_progress" ? "Đang học" : "Đang khóa"}
                  </span>
                </div>
                <h4 className="font-bold text-stone-900 dark:text-stone-100 mt-1">{node.name}</h4>
                
                {/* Trỏ tới bài của chính node này. Trước đây mọi node đều dẫn
                    về một slug viết cứng - `/bai-hoc/dcf-valuation`, kèm luôn
                    ghi chú "Giả sử link dynamic" - và slug đó còn không tồn tại
                    trong corpus, nên mọi nút ở đây đều là một cú bấm ra trang
                    404. */}
                {status === "in_progress" && lessonSlugById[node.requiredLessonId] ? (
                  <Link
                    href={`/bai-hoc/${lessonSlugById[node.requiredLessonId]}`}
                    className="inline-flex items-center gap-1.5 text-xs text-amber-600 dark:text-amber-400 font-bold mt-2 hover:underline"
                  >
                    Học ngay bài học tương ứng &rarr;
                  </Link>
                ) : status === "locked" && node.prerequisites.length > 0 ? (
                  <div className="text-[11px] text-stone-500 dark:text-stone-400 mt-2">
                    Yêu cầu hoàn thành trước: <span className="font-bold">{node.prerequisites.join(", ")}</span>
                  </div>
                ) : null}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
