"use client";

interface Stage {
  label: string;
  name: string;
  available: boolean;
}

interface RoadmapProps {
  stages: Stage[];
  activeTrack: string;
}

export default function Roadmap({ stages, activeTrack }: RoadmapProps) {
  const stageCount = stages.length;
  const middleIdx = Math.floor(stageCount / 2);

  return (
    <div className="bg-white border-2 border-stone-200 rounded-2xl p-8">
      <div className="mb-8">
        <p className="text-xs font-extrabold text-stone-400 uppercase tracking-widest mb-2">
          Lộ trình học tập
        </p>
        <h3 className="text-2xl font-extrabold text-stone-900">Roadmap</h3>
        <p className="text-sm text-stone-600 mt-2">
          Hành trình từ bước đầu đến thành thạo
        </p>
      </div>

      {/* Tree-style Roadmap */}
      <div className="relative">
        {/* SVG for connecting lines */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none"
          style={{ minHeight: "400px" }}
        >
          {/* Center point (Stage 1) */}
          {stageCount > 0 && (
            <>
              {/* Lines from center to stages */}
              {stages.map((_, idx) => {
                if (idx === middleIdx) return null; // Skip center

                // Calculate angle and distance for each stage
                const anglePerStage = 360 / stageCount;
                const angle = anglePerStage * idx - 90;
                const distance = 150;

                const centerX = 50;
                const centerY = 50;

                const radians = (angle * Math.PI) / 180;
                const endX = centerX + distance * Math.cos(radians);
                const endY = centerY + distance * Math.sin(radians);

                return (
                  <line
                    key={`line-${idx}`}
                    x1={`${centerX}%`}
                    y1={`${centerY}%`}
                    x2={`${endX}%`}
                    y2={`${endY}%`}
                    stroke="#d6d3d1"
                    strokeWidth="2"
                  />
                );
              })}
            </>
          )}
        </svg>

        {/* Stage nodes */}
        <div className="relative grid gap-6" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))" }}>
          {stages.map((stage, idx) => {
            const isCenter = idx === middleIdx;
            const isAvailable = stage.available;

            return (
              <div
                key={idx}
                className={`
                  flex flex-col items-center justify-center rounded-xl border-2 p-4 text-center transition-all
                  ${
                    isCenter
                      ? "bg-emerald-50 border-emerald-300 col-span-full"
                      : isAvailable
                        ? "bg-white border-stone-200 hover:border-stone-400 hover:bg-stone-50"
                        : "bg-stone-50 border-stone-100"
                  }
                `}
              >
                {/* Stage badge */}
                <span
                  className={`text-xs font-extrabold uppercase tracking-widest px-2 py-1 rounded mb-2 ${
                    isCenter
                      ? "bg-emerald-200 text-emerald-900"
                      : isAvailable
                        ? "bg-stone-100 text-stone-700"
                        : "bg-stone-100 text-stone-400"
                  }`}
                >
                  {stage.label}
                </span>

                {/* Stage name */}
                <h4
                  className={`font-bold text-sm leading-snug ${
                    isCenter ? "text-emerald-900" : isAvailable ? "text-stone-900" : "text-stone-400"
                  }`}
                >
                  {stage.name}
                </h4>

                {/* Status indicator */}
                <div className="mt-3 text-xs">
                  {isAvailable ? (
                    <span className="text-emerald-600 font-semibold">Đang mở</span>
                  ) : (
                    <span className="text-stone-400">Sắp tới</span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Legend */}
      <div className="mt-8 pt-6 border-t border-stone-200 flex flex-wrap gap-6 text-sm">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-emerald-400" />
          <span className="text-stone-700 font-semibold">Chặng hiện tại</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-stone-200" />
          <span className="text-stone-700 font-semibold">Đang mở</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-stone-100" />
          <span className="text-stone-600 font-semibold">Sắp tới</span>
        </div>
      </div>
    </div>
  );
}
