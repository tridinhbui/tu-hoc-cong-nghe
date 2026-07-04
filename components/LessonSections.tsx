import React from "react";
import type { LessonSectionBlock } from "@/lib/lessons";

export default function LessonSections({ sections }: { sections: LessonSectionBlock[] }) {
  return (
    <div className="space-y-10 text-stone-700 leading-relaxed text-lg">
      {sections.map((block, i) => {
        switch (block.type) {
          case "lead":
            return (
              <p key={i} className="text-xl leading-relaxed">
                {block.text}
              </p>
            );

          case "heading":
            return (
              <h3 key={i} className="text-2xl font-bold text-stone-900">
                {block.text}
              </h3>
            );

          case "paragraph":
            return <p key={i}>{block.text}</p>;

          case "list":
            return (
              <ul key={i} className="space-y-3 pl-1">
                {block.items.map((item, j) => (
                  <li key={j} className="flex items-start gap-3 text-stone-600 text-lg">
                    <span className="mt-2.5 w-2 h-2 rounded-full bg-stone-400 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            );

          case "callout":
            return (
              <div key={i} className="border border-stone-200 rounded-2xl p-6 bg-stone-50 space-y-3">
                <p className="text-xs font-bold text-stone-400 uppercase tracking-widest">{block.label}</p>
                <p className="text-stone-700 text-base leading-relaxed">{block.text}</p>
              </div>
            );

          case "comparison":
            return (
              <div key={i} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[block.left, block.right].map((side) => (
                  <div key={side.label} className="border border-stone-200 rounded-2xl p-6 space-y-3">
                    <p className="text-xs font-bold text-stone-400 uppercase tracking-widest">{side.label}</p>
                    <p className="text-base text-stone-600 leading-relaxed">{side.text}</p>
                  </div>
                ))}
              </div>
            );

          case "conceptTable":
            return (
              <div key={i} className="rounded-2xl overflow-hidden border-2 border-stone-900 shadow-lg">
                <div className="bg-stone-900 px-6 py-4">
                  <p className="text-white font-extrabold text-lg tracking-wide">{block.title}</p>
                  <p className="text-stone-400 text-sm mt-0.5">{block.subtitle ?? "Chạm hoặc di chuột vào từng dòng"}</p>
                </div>
                <div className="divide-y divide-stone-100 bg-white">
                  {block.concepts.map(({ vi, en, def }) => (
                    <div
                      key={en}
                      className="group px-6 py-4 flex items-start gap-4 cursor-default transition-all duration-200 hover:bg-stone-50 hover:pl-8"
                    >
                      <div className="flex-1 min-w-0">
                        <div className="flex items-baseline gap-3 flex-wrap">
                          <span className="font-bold text-stone-900 text-base group-hover:text-stone-700 transition-colors">{vi}</span>
                          <span className="text-sm text-stone-400 font-mono bg-stone-100 px-2 py-0.5 rounded group-hover:bg-stone-200 transition-colors">{en}</span>
                        </div>
                        <p className="text-stone-500 text-base mt-1 leading-relaxed group-hover:text-stone-700 transition-colors">{def}</p>
                      </div>
                      <span className="text-stone-200 group-hover:text-stone-400 transition-colors text-lg mt-0.5 flex-shrink-0">→</span>
                    </div>
                  ))}
                </div>
              </div>
            );

          case "closing":
            return (
              <div key={i} className="text-center space-y-2 py-4">
                {block.lines.map((line, j) => (
                  <p
                    key={j}
                    className={j === block.lines.length - 1 ? "text-stone-900 font-bold text-xl" : "text-stone-400 text-base"}
                  >
                    {line}
                  </p>
                ))}
              </div>
            );

          default:
            return null;
        }
      })}
    </div>
  );
}
