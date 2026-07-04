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
  return (
    <div className="bg-white border-2 border-stone-200 rounded-xl p-5 h-fit sticky top-24">
      <div className="mb-4">
        <p className="text-xs font-extrabold text-stone-500 uppercase tracking-widest">
          Roadmap
        </p>
      </div>

      <div className="space-y-2">
        {stages.map((stage, idx) => (
          <div
            key={idx}
            className={`px-3 py-2 rounded-lg text-xs border-l-4 transition-all ${
              stage.available
                ? "bg-emerald-50 border-l-emerald-400 text-emerald-900"
                : "bg-stone-50 border-l-stone-300 text-stone-500"
            }`}
          >
            <div className="font-extrabold">{stage.label}</div>
            <div className="text-xs opacity-75 leading-tight mt-0.5">{stage.name}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
