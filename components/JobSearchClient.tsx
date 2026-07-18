"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ArrowLeft, 
  ExternalLink, 
  Briefcase, 
  X, 
  Search, 
  Sparkles, 
  Clock, 
  Award, 
  Terminal, 
  Activity, 
  Heart, 
  GraduationCap,
  ChevronRight,
  Lightbulb,
  SearchCode,
  ThumbsUp,
  ThumbsDown
} from "lucide-react";
import { toast } from "sonner";
import { FINANCE_CAREERS, type FinanceCareer } from "@/lib/finance-careers";
import { JOB_SEARCH_SITES } from "@/lib/job-search-links";
import { createClient } from "@/lib/supabase";
import { claimQuestReward } from "@/lib/supabase-quests";
import { recalculateUserStats } from "@/lib/supabase-user";

// Beautiful custom 3D card tilt and glow component
function CareerAvatar({ career, size = 110, className = "" }: { career: FinanceCareer; size?: number; className?: string }) {
  return (
    <div
      className={`relative shrink-0 transition-transform duration-300 [transform-style:preserve-3d] hover:[transform:rotateY(10deg)_rotateX(-6deg)] ${className}`}
      style={{ width: size, height: size, perspective: "600px" }}
    >
      {/* Dynamic box shadow matching the accent color */}
      <div
        className="absolute inset-0 rounded-2xl opacity-40 blur-xl transition-all duration-300 group-hover:opacity-70 z-0"
        style={{
          background: `radial-gradient(circle, ${career.accentFrom}, ${career.accentTo})`,
        }}
      />
      {/* Background glass sphere style */}
      <div
        className="absolute inset-0 rounded-2xl border border-white/20 dark:border-stone-800/80 overflow-hidden shadow-lg z-10"
        style={{
          background: `linear-gradient(135deg, ${career.accentFrom}20, ${career.accentTo}35)`,
        }}
      >
        <div
          className="absolute inset-0 opacity-30 mix-blend-overlay"
          style={{
            background: `radial-gradient(circle at 35% 30%, #ffffff 0%, transparent 60%)`,
          }}
        />
        <img
          src={career.avatar3d}
          alt={career.title}
          className="w-full h-full object-cover select-none relative z-10"
        />
      </div>
    </div>
  );
}

// Sub-component for individual metric progress bars
function MetricBar({ 
  label, 
  value, 
  max = 5, 
  color = "bg-emerald-500", 
  icon: Icon 
}: { 
  label: string; 
  value: number; 
  max?: number; 
  color?: string; 
  icon: any 
}) {
  const percentage = (value / max) * 100;
  return (
    <div className="bg-stone-50 dark:bg-stone-900/40 p-4 rounded-2xl border border-stone-200/60 dark:border-stone-800/50 shadow-sm flex flex-col justify-between">
      <div className="flex items-center gap-1.5 text-stone-400 dark:text-stone-500 mb-2">
        <Icon className="w-4 h-4 shrink-0" />
        <span className="text-[10px] font-extrabold uppercase tracking-wider">{label}</span>
      </div>
      <div>
        <div className="flex items-baseline gap-1 mb-1">
          <span className="text-xl font-black text-stone-800 dark:text-stone-200">{value}</span>
          <span className="text-xs text-stone-400">/{max}</span>
        </div>
        <div className="w-full h-1.5 bg-stone-200 dark:bg-stone-800 rounded-full overflow-hidden">
          <motion.div 
            className={`h-full ${color} rounded-full`} 
            initial={{ width: 0 }}
            animate={{ width: `${percentage}%` }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          />
        </div>
      </div>
    </div>
  );
}

const QUIZ_QUESTIONS = [
  {
    question: "Phong cách xử lý thông tin ưa thích của bạn là gì?",
    options: [
      { text: "Phân tích số liệu, lập mô hình dự báo tương lai", type: "Analytical" },
      { text: "Kiểm tra tính chính xác, rà soát tính tuân thủ quy trình", type: "Compliance" },
      { text: "Giao tiếp, tư vấn, xây dựng và kết nối mối quan hệ khách hàng", type: "Client-facing" },
      { text: "Phân tích thống kê định lượng, tính toán xác suất rủi ro", type: "Quantitative" }
    ]
  },
  {
    question: "Môi trường làm việc lý tưởng trong mơ của bạn là:",
    options: [
      { text: "Các quỹ đầu tư lớn, công ty chứng khoán năng động", type: "Analytical" },
      { text: "Phòng kế toán tập đoàn lớn, hoặc công ty kiểm toán Big4 chuyên nghiệp", type: "Compliance" },
      { text: "Các chi nhánh ngân hàng thương mại, sàn giao dịch nhộn nhịp", type: "Client-facing" },
      { text: "Phòng nguồn vốn, ban quản trị rủi ro ở hội sở ngân hàng lớn", type: "Quantitative" }
    ]
  },
  {
    question: "Bạn đối diện thế nào với áp lực và cân bằng cuộc sống (WLB)?",
    options: [
      { text: "Sẵn sàng OT khuya, chịu áp lực tiến độ để đạt thu nhập vượt trội", type: "Analytical" },
      { text: "Muốn giờ giấc hành chính rõ ràng, công việc ổn định ít đột xuất", type: "Compliance" },
      { text: "Chấp nhận áp lực chạy doanh số (KPI) để nhận hoa hồng không giới hạn", type: "Client-facing" },
      { text: "Muốn công việc thiên về kỹ thuật chuyên sâu, ít áp lực doanh số", type: "Quantitative" }
    ]
  },
  {
    question: "Điểm mạnh nhất mà bạn tự tin muốn phát huy là gì?",
    options: [
      { text: "Lập mô hình Excel, phân tích chi phí - lợi ích chiến lược", type: "Analytical" },
      { text: "Sự cẩn thận, chi tiết tỉ mỉ, tuân thủ nguyên tắc tuyệt đối", type: "Compliance" },
      { text: "Khả năng ăn nói thuyết phục, đồng cảm và mở rộng quan hệ", type: "Client-facing" },
      { text: "Tư duy toán học logic, lập trình mô phỏng định lượng (SQL/Python)", type: "Quantitative" }
    ]
  },
  {
    question: "Nhóm chứng chỉ nghề nghiệp nào thu hút bạn nhất?",
    options: [
      { text: "CFA (Phân tích đầu tư) / CMA (Quản trị tài chính)", type: "Analytical" },
      { text: "ACCA (Kế toán công chứng) / CPA (Kiểm toán viên)", type: "Compliance" },
      { text: "Chứng chỉ hành nghề Môi giới chứng khoán hoặc Tín dụng ngân hàng", type: "Client-facing" },
      { text: "FRM (Quản lý rủi ro) / Chứng chỉ nguồn vốn ACI", type: "Quantitative" }
    ]
  }
];

export default function JobSearchClient() {
  const [selected, setSelected] = useState<FinanceCareer>(FINANCE_CAREERS[0]);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState<"daily" | "insights" | "path" | "skills" | "search">("daily");
  const [mobileDetailOpen, setMobileDetailOpen] = useState(false);

  // Career Fit Quiz State
  const [userId, setUserId] = useState<string | null>(null);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [showQuiz, setShowQuiz] = useState(false);
  const [quizStep, setQuizStep] = useState(0);
  const [quizAnswers, setQuizAnswers] = useState<string[]>([]);
  const [quizResult, setQuizResult] = useState<string | null>(null);

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getUser().then(async ({ data: { user } }) => {
      if (user) {
        setUserId(user.id);
        
        // Check local storage first for quick display
        const localClaim = localStorage.getItem(`career_quiz_completed_${user.id}`);
        if (localClaim) {
          setQuizCompleted(true);
          setQuizResult(localClaim);
        } else {
          // Check from supabase quest completions
          const { data } = await supabase
            .from("user_quest_completions")
            .select("quest_type")
            .eq("user_id", user.id)
            .eq("quest_type", "career_assessment")
            .maybeSingle();
          if (data) {
            setQuizCompleted(true);
            setQuizResult("Đã hoàn thành khảo sát");
          }
        }
      }
    });
  }, []);

  const startQuiz = () => {
    setQuizStep(0);
    setQuizAnswers([]);
    setShowQuiz(true);
  };

  const handleAnswerSelect = (optionType: string) => {
    const nextAnswers = [...quizAnswers, optionType];
    setQuizAnswers(nextAnswers);
    
    if (quizStep < QUIZ_QUESTIONS.length - 1) {
      setQuizStep(quizStep + 1);
    } else {
      // Calculate top personality type
      const counts: Record<string, number> = {
        Analytical: 0,
        Compliance: 0,
        "Client-facing": 0,
        Quantitative: 0
      };
      
      nextAnswers.forEach((ans) => {
        counts[ans] = (counts[ans] || 0) + 1;
      });
      
      let topType = "Analytical";
      let maxScore = 0;
      Object.entries(counts).forEach(([type, score]) => {
        if (score > maxScore) {
          maxScore = score;
          topType = type;
        }
      });
      
      let typeLabel = "";
      let rolesText = "";
      if (topType === "Analytical") {
        typeLabel = "Phân tích & Đầu tư (Analytical)";
        rolesText = "Phân tích Tài chính, Investment Banking, FP&A, Đầu tư (CFA Track).";
      } else if (topType === "Compliance") {
        typeLabel = "Kế toán & Kiểm toán (Compliance)";
        rolesText = "Kế toán viên, Kiểm toán viên, Kế toán trưởng / CFO Track.";
      } else if (topType === "Client-facing") {
        typeLabel = "Quan hệ Khách hàng & Giao dịch (Client-facing)";
        rolesText = "Chuyên viên Tín dụng, Chuyên viên Môi giới Chứng khoán.";
      } else {
        typeLabel = "Nguồn vốn & Định lượng (Quantitative)";
        rolesText = "Quản lý Quỹ, Quản lý Rủi ro, Chuyên viên Nguồn vốn.";
      }
      
      const resultString = `${typeLabel} - Gợi ý: ${rolesText}`;
      setQuizResult(resultString);
      setQuizCompleted(true);
      setShowQuiz(false);
      
      if (userId) {
        localStorage.setItem(`career_quiz_completed_${userId}`, resultString);
        
        // Claim the 50 XP quest reward
        claimQuestReward(userId, "career_assessment", "once", 50)
          .then((success) => {
            if (success) {
              toast.success("Chúc mừng! Bạn đã nhận được +50 XP cho Trắc nghiệm Hướng nghiệp! 🧭");
              void recalculateUserStats(userId).catch(() => {});
            }
          })
          .catch((err) => {
            console.error("Error claiming career quiz XP:", err);
          });
      }
    }
  };

  const filteredCareers = FINANCE_CAREERS.filter((c) =>
    c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.englishTitle.toLowerCase().includes(searchQuery.toLowerCase())
  );

  function handleSelectCareer(career: FinanceCareer) {
    setSelected(career);
    setMobileDetailOpen(true);
  }

  function getStressColor(level: number) {
    if (level <= 3) return "bg-emerald-500";
    if (level <= 4) return "bg-amber-500";
    return "bg-rose-500";
  }

  function getWlbColor(level: number) {
    if (level >= 3.5) return "bg-emerald-500";
    if (level >= 2.5) return "bg-amber-500";
    return "bg-rose-500";
  }

  function getDifficultyColor(level: number) {
    if (level <= 3) return "bg-sky-500";
    if (level <= 4) return "bg-indigo-500";
    return "bg-violet-500";
  }

  return (
    <div className="min-h-screen bg-stone-50 dark:bg-stone-950 text-stone-900 dark:text-stone-100 font-sans transition-colors duration-300">
      
      {/* Top Header Bar */}
      <div className="sticky top-0 z-30 border-b border-stone-200 dark:border-stone-800 bg-white/80 dark:bg-stone-950/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <Link href="/dashboard" className="inline-flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-wider text-stone-500 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100 transition-colors">
              <ArrowLeft className="w-3.5 h-3.5" />
              Quay lại Dashboard
            </Link>
            <h1 className="text-2xl font-black text-stone-900 dark:text-stone-100 mt-1.5 flex items-center gap-2.5">
              <Briefcase className="w-6 h-6 text-emerald-500 dark:text-emerald-400" />
              Bản Đồ Việc Làm Tài Chính
            </h1>
          </div>
          <div className="text-xs text-stone-500 dark:text-stone-400 max-w-sm">
            Khám phá chi tiết công việc (JD), lộ trình thăng tiến sự nghiệp, yêu cầu kỹ năng và kết nối tuyển dụng trực tuyến.
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          
          {/* LEFT COLUMN: Careers List & Filters */}
          <div className="md:col-span-5 lg:col-span-4 space-y-4">
            
            {/* Search Input Box */}
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400 dark:text-stone-600" />
              <input
                type="text"
                placeholder="Tìm kiếm vị trí tài chính..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-11 pr-4 py-3 rounded-2xl bg-white dark:bg-stone-900 border-2 border-stone-200 dark:border-stone-800 text-sm font-semibold placeholder-stone-400 dark:placeholder-stone-600 focus:outline-none focus:border-emerald-500 dark:focus:border-emerald-400 shadow-sm transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-stone-100 dark:bg-stone-800 text-stone-400 hover:text-stone-600 dark:hover:text-stone-200 flex items-center justify-center transition-colors"
                >
                  <X className="w-3 h-3" />
                </button>
              )}
            </div>

            {/* Career Fit Quiz Widget */}
            <div className="p-5 rounded-2xl border-2 border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 shadow-sm relative overflow-hidden">
              <div className="absolute top-0 right-0 w-20 h-20 bg-emerald-500/5 rounded-full blur-xl pointer-events-none" />
              
              {!quizCompleted ? (
                <div>
                  <div className="flex items-center gap-2 text-stone-900 dark:text-stone-550">
                    <Sparkles className="w-4 h-4 text-amber-500 animate-pulse animate-duration-1000" />
                    <h4 className="text-xs font-black uppercase tracking-wider">Trắc nghiệm Hướng nghiệp</h4>
                  </div>
                  <p className="text-xs text-stone-500 dark:text-stone-400 mt-1.5 leading-relaxed">
                    Trả lời 5 câu hỏi để định hướng xem bạn phù hợp nhất với vị trí tài chính nào và nhận ngay <strong className="text-emerald-600 dark:text-emerald-450 font-black">+50 XP</strong>.
                  </p>
                  <button
                    onClick={startQuiz}
                    className="w-full mt-3 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 dark:bg-emerald-500 dark:hover:bg-emerald-400 text-white text-xs font-black shadow-sm transition-all cursor-pointer text-center"
                  >
                    Bắt đầu trắc nghiệm (+50 XP)
                  </button>
                </div>
              ) : (
                <div>
                  <div className="flex items-center gap-2 text-stone-900 dark:text-stone-50">
                    <SearchCode className="w-4 h-4 text-emerald-500" />
                    <h4 className="text-xs font-black uppercase tracking-wider">Định hướng nghề nghiệp của bạn</h4>
                  </div>
                  <div className="mt-2.5 p-3 rounded-xl bg-stone-50 dark:bg-stone-950/30 border border-stone-200/40 dark:border-stone-850 text-xs">
                    <span className="text-[9px] font-black uppercase text-stone-400 dark:text-stone-550 block mb-0.5">Nhóm ngành phù hợp nhất:</span>
                    <span className="font-extrabold text-stone-805 dark:text-stone-200 block leading-tight">{quizResult?.split(" - ")[0]}</span>
                    <span className="text-[10px] text-stone-500 dark:text-stone-450 block mt-1.5 leading-snug">
                      Gợi ý: {quizResult?.split(" - Gợi ý: ")[1] || "Kế toán, kiểm toán, tài chính."}
                    </span>
                  </div>
                  <button
                    onClick={startQuiz}
                    className="w-full mt-3 py-1.5 rounded-xl border border-stone-200 dark:border-stone-800 text-stone-600 dark:text-stone-400 text-[10px] font-bold hover:bg-stone-50 dark:hover:bg-stone-950 transition-all cursor-pointer text-center"
                  >
                    Làm lại trắc nghiệm
                  </button>
                </div>
              )}
            </div>

            {/* Careers Scroll List */}
            <div className="space-y-2.5 max-h-[70vh] md:max-h-[50vh] overflow-y-auto pr-1">
              {filteredCareers.length > 0 ? (
                filteredCareers.map((career) => {
                  const isSelected = selected.id === career.id;
                  return (
                    <button
                      key={career.id}
                      onClick={() => handleSelectCareer(career)}
                      className={`w-full group text-left flex items-center gap-4 p-4 rounded-2xl border-2 transition-all relative overflow-hidden select-none ${
                        isSelected
                          ? "bg-white dark:bg-stone-900 border-emerald-500 dark:border-emerald-400 shadow-md translate-x-1"
                          : "bg-white dark:bg-stone-900/60 border-stone-200/80 dark:border-stone-800 hover:border-stone-300 dark:hover:border-stone-700 hover:bg-white dark:hover:bg-stone-900"
                      }`}
                    >
                      {/* Selected Glow Bar */}
                      {isSelected && (
                        <div 
                          className="absolute left-0 top-0 bottom-0 w-1.5 rounded-r"
                          style={{
                            background: `linear-gradient(to bottom, ${career.accentFrom}, ${career.accentTo})`
                          }}
                        />
                      )}
                      
                      {/* Avatar container */}
                      <div className="relative shrink-0 w-14 h-14 rounded-xl overflow-hidden border border-stone-200 dark:border-stone-800 shadow-sm">
                        <img
                          src={career.avatar3d}
                          alt={career.title}
                          className="w-full h-full object-cover relative z-10"
                        />
                      </div>

                      {/* Info text */}
                      <div className="min-w-0 flex-1">
                        <h3 className="text-sm font-black text-stone-950 dark:text-stone-50 leading-tight flex items-center gap-1.5">
                          {career.title}
                        </h3>
                        <p className="text-xs text-stone-400 dark:text-stone-500 font-bold mt-0.5">{career.englishTitle}</p>
                        <div className="flex items-center gap-2 mt-2">
                          <span className="text-[10px] font-extrabold px-2 py-0.5 rounded bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-400 uppercase tracking-wide">
                            {career.salaryHint.split(" • ")[0]}
                          </span>
                        </div>
                      </div>

                      <ChevronRight className={`w-4 h-4 shrink-0 transition-transform duration-300 ${
                        isSelected 
                          ? "text-emerald-500 dark:text-emerald-400 translate-x-0.5" 
                          : "text-stone-300 dark:text-stone-700 group-hover:text-stone-500"
                      }`} />
                    </button>
                  );
                })
              ) : (
                <div className="text-center py-12 bg-white dark:bg-stone-900/60 rounded-3xl border border-dashed border-stone-200 dark:border-stone-800 px-6">
                  <SearchCode className="w-10 h-10 mx-auto text-stone-300 dark:text-stone-700 mb-3" />
                  <p className="text-sm font-bold text-stone-500 dark:text-stone-400">Không tìm thấy vị trí phù hợp</p>
                  <p className="text-xs text-stone-400 dark:text-stone-600 mt-1">Hãy thử tìm kiếm với từ khóa khác.</p>
                </div>
              )}
            </div>
          </div>

          {/* RIGHT COLUMN: Detail View (Desktop) */}
          <div className="hidden md:block md:col-span-7 lg:col-span-8">
            <div className="bg-white dark:bg-stone-900/80 rounded-3xl border-2 border-stone-200 dark:border-stone-800/80 p-8 shadow-xl relative overflow-hidden backdrop-blur-md min-h-[70vh]">
              {/* Background gradient blur */}
              <div 
                className="absolute -top-40 -right-40 w-96 h-96 rounded-full opacity-10 blur-3xl pointer-events-none"
                style={{
                  background: `radial-gradient(circle, ${selected.accentFrom}, ${selected.accentTo})`
                }}
              />
              
              {/* Header Details Panel */}
              <div className="flex flex-col lg:flex-row gap-6 items-start pb-6 border-b border-stone-150 dark:border-stone-800">
                <CareerAvatar career={selected} size={110} />
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2.5">
                    <span 
                      className="text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full text-white"
                      style={{
                        background: `linear-gradient(135deg, ${selected.accentFrom}, ${selected.accentTo})`
                      }}
                    >
                      {selected.entryLevel.split(" - ")[0]}
                    </span>
                    <span className="text-xs text-stone-400 dark:text-stone-500 font-extrabold">• Dải lương: {selected.salaryHint}</span>
                  </div>
                  <h2 className="text-2xl font-black text-stone-900 dark:text-stone-50 mt-2 leading-tight">
                    {selected.title}
                  </h2>
                  <p className="text-sm text-stone-400 dark:text-stone-500 font-bold mt-0.5">{selected.englishTitle}</p>
                  <p className="text-sm text-stone-600 dark:text-stone-300 leading-relaxed mt-4 bg-stone-50/50 dark:bg-stone-950/30 p-3.5 rounded-xl border border-stone-200/40 dark:border-stone-800/30">
                    {selected.summary}
                  </p>
                </div>
              </div>

              {/* Core Metrics Grid */}
              <div className="grid grid-cols-3 gap-4 mt-6">
                <MetricBar 
                  label="Độ khó đầu vào" 
                  value={selected.entryDifficulty} 
                  color={getDifficultyColor(selected.entryDifficulty)} 
                  icon={GraduationCap} 
                />
                <MetricBar 
                  label="Mức độ áp lực" 
                  value={selected.stressLevel} 
                  color={getStressColor(selected.stressLevel)} 
                  icon={Activity} 
                />
                <MetricBar 
                  label="Cân bằng (WLB)" 
                  value={selected.wlb} 
                  color={getWlbColor(selected.wlb)} 
                  icon={Heart} 
                />
              </div>

              {/* Detail Navigation Tabs */}
              <div className="flex border-b border-stone-200 dark:border-stone-800 mt-8 gap-2 overflow-x-auto scrollbar-none">
                {[
                  { id: "daily", label: "Nhiệm vụ & Một ngày", icon: Clock },
                  { id: "insights", label: "Lời khuyên & Ưu/Nhược", icon: Lightbulb },
                  { id: "path", label: "Lộ trình & Chứng chỉ", icon: Award },
                  { id: "skills", label: "Kỹ năng & Công cụ", icon: Terminal },
                  { id: "search", label: "Tìm việc ngay", icon: Search }
                ].map((tab) => {
                  const isActive = activeTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id as any)}
                      className={`flex items-center gap-1.5 px-4 py-3 text-xs font-black uppercase tracking-wider relative transition-colors ${
                        isActive ? "text-emerald-500 dark:text-emerald-400" : "text-stone-400 dark:text-stone-500 hover:text-stone-600"
                      }`}
                    >
                      <tab.icon className="w-4 h-4" />
                      {tab.label}
                      {isActive && (
                        <motion.div 
                          layoutId="activeTabUnderline"
                          className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-500 dark:bg-emerald-400"
                        />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Dynamic Tab Contents */}
              <div className="py-6">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeTab + "_" + selected.id}
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    transition={{ duration: 0.2 }}
                  >
                    {activeTab === "daily" && (
                      <div className="space-y-6">
                        {/* Day in life narrative */}
                        <div className="bg-emerald-50/40 dark:bg-emerald-950/10 p-5 rounded-2xl border border-emerald-500/10 flex gap-4">
                          <Lightbulb className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                          <div className="text-sm leading-relaxed text-stone-700 dark:text-stone-300">
                            <span className="font-extrabold text-stone-900 dark:text-stone-100 block mb-1">Một ngày làm việc điển hình:</span>
                            <span className="italic">"{selected.dayInLife}"</span>
                          </div>
                        </div>

                        {/* Specific Responsibilities */}
                        <div>
                          <h3 className="text-xs font-extrabold uppercase tracking-widest text-stone-400 dark:text-stone-500 mb-3 flex items-center gap-1.5">
                            <Sparkles className="w-4 h-4 text-amber-500" />
                            Nhiệm vụ chính (Job Description)
                          </h3>
                          <ul className="space-y-3">
                            {selected.responsibilities.map((resp, idx) => (
                              <li key={idx} className="flex items-start gap-3 text-sm text-stone-700 dark:text-stone-300">
                                <span className="w-2 h-2 rounded-full mt-2 shrink-0" style={{ background: selected.accentTo }} />
                                <span>{resp}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    )}

                    {activeTab === "insights" && (
                      <div className="space-y-6">
                        {/* Pros & Cons split layout */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                          <div className="bg-emerald-50/20 dark:bg-emerald-950/10 p-5 rounded-2xl border border-emerald-500/10 shadow-sm">
                            <h4 className="text-xs font-black uppercase text-emerald-600 dark:text-emerald-450 tracking-wider mb-2 flex items-center gap-1.5">
                              <ThumbsUp className="w-4 h-4" />
                              Ưu điểm chính
                            </h4>
                            <p className="text-sm text-stone-700 dark:text-stone-300 leading-relaxed">
                              {selected.pros}
                            </p>
                          </div>
                          
                          <div className="bg-rose-50/20 dark:bg-rose-950/10 p-5 rounded-2xl border border-rose-500/10 shadow-sm">
                            <h4 className="text-xs font-black uppercase text-rose-600 dark:text-rose-450 tracking-wider mb-2 flex items-center gap-1.5">
                              <ThumbsDown className="w-4 h-4" />
                              Nhược điểm & Thách thức
                            </h4>
                            <p className="text-sm text-stone-700 dark:text-stone-300 leading-relaxed">
                              {selected.cons}
                            </p>
                          </div>
                        </div>

                        {/* Application Advice box */}
                        <div className="bg-amber-50/30 dark:bg-amber-950/10 p-5 rounded-2xl border border-amber-500/10 flex gap-4 shadow-sm">
                          <Lightbulb className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                          <div className="text-sm leading-relaxed text-stone-700 dark:text-stone-300">
                            <span className="font-extrabold text-stone-900 dark:text-stone-100 block mb-1">Bí quyết ứng tuyển & Lời khuyên sự nghiệp:</span>
                            <span>{selected.applicationTips}</span>
                          </div>
                        </div>
                      </div>
                    )}

                    {activeTab === "path" && (
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* Career progression timeline */}
                        <div>
                          <h3 className="text-xs font-extrabold uppercase tracking-widest text-stone-400 dark:text-stone-500 mb-4">
                            Lộ trình thăng tiến (Career Path)
                          </h3>
                          <div className="relative border-l-2 border-stone-200 dark:border-stone-800 ml-4 pl-6 space-y-6 py-2">
                            {selected.careerPath.map((step, idx) => (
                              <div key={idx} className="relative">
                                <div 
                                  className="absolute -left-[35px] top-0.5 w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-black text-white shadow-sm"
                                  style={{
                                    background: `linear-gradient(135deg, ${selected.accentFrom}, ${selected.accentTo})`
                                  }}
                                >
                                  {idx + 1}
                                </div>
                                <h4 className="text-sm font-black text-stone-900 dark:text-stone-100">{step}</h4>
                                <p className="text-[10px] uppercase font-bold text-stone-400 mt-0.5">
                                  {idx === 0 ? "Khởi đầu" : idx === selected.careerPath.length - 1 ? "Mục tiêu dài hạn" : "Nấc thang phát triển"}
                                </p>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Key Certifications recommended */}
                        <div>
                          <h3 className="text-xs font-extrabold uppercase tracking-widest text-stone-400 dark:text-stone-500 mb-4">
                            Chứng chỉ khuyên học (Certifications)
                          </h3>
                          <div className="space-y-3">
                            {selected.certifications.map((cert, idx) => (
                              <div key={idx} className="flex items-center gap-3 p-3.5 bg-stone-50 dark:bg-stone-950/40 rounded-xl border border-stone-200/50 dark:border-stone-850">
                                <Award className="w-5 h-5 text-amber-500 shrink-0" />
                                <span className="text-xs font-bold text-stone-700 dark:text-stone-300">{cert}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}

                    {activeTab === "skills" && (
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* Skills Required */}
                        <div>
                          <h3 className="text-xs font-extrabold uppercase tracking-widest text-stone-400 dark:text-stone-500 mb-4">
                            Kỹ năng chuyên môn & Mềm
                          </h3>
                          <div className="flex flex-wrap gap-2">
                            {selected.skills.map((skill) => (
                              <span 
                                key={skill}
                                className="text-xs font-bold px-3 py-1.5 rounded-xl bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 border border-stone-200/40 dark:border-stone-800"
                              >
                                {skill}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Software & Systems Tools */}
                        <div>
                          <h3 className="text-xs font-extrabold uppercase tracking-widest text-stone-400 dark:text-stone-500 mb-4">
                            Hệ thống & Công cụ chuyên ngành
                          </h3>
                          <div className="flex flex-wrap gap-2">
                            {selected.requiredTools.map((tool) => (
                              <span 
                                key={tool}
                                className="text-xs font-bold px-3 py-1.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/20 text-emerald-700 dark:text-emerald-400 border border-emerald-100/50 dark:border-emerald-900/30 flex items-center gap-1.5"
                              >
                                <Terminal className="w-3.5 h-3.5" />
                                {tool}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}

                    {activeTab === "search" && (
                      <div className="space-y-6">
                        <div className="bg-stone-50 dark:bg-stone-950/40 p-5 rounded-2xl border border-stone-200/40 dark:border-stone-850">
                          <h4 className="text-xs font-black uppercase text-stone-400 dark:text-stone-500">Từ khóa tìm kiếm gợi ý:</h4>
                          <p className="text-lg font-black text-stone-800 dark:text-stone-200 mt-1">"{selected.searchKeyword}"</p>
                          <p className="text-xs text-stone-400 mt-1">Hệ thống sẽ tự động tìm kiếm trực tiếp trên các nền tảng tuyển dụng lớn theo từ khóa này.</p>
                        </div>

                        <div>
                          <h3 className="text-xs font-extrabold uppercase tracking-widest text-stone-400 dark:text-stone-500 mb-3.5">
                            Tìm việc trên các nền tảng lớn
                          </h3>
                          <div className="grid grid-cols-3 gap-3">
                            {JOB_SEARCH_SITES.map((site) => (
                              <button
                                key={site.id}
                                onClick={() => window.open(site.buildUrl(selected.searchKeyword), "_blank", "noopener,noreferrer")}
                                className="flex items-center justify-center gap-2 px-4 py-3 rounded-2xl bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 text-xs font-black hover:opacity-90 active:scale-95 transition-all shadow-md cursor-pointer"
                              >
                                {site.label}
                                <ExternalLink className="w-3.5 h-3.5" />
                              </button>
                            ))}
                          </div>
                        </div>
                        <p className="text-[10px] text-stone-400 dark:text-stone-500 italic mt-4 text-center">
                          * Lưu ý: Hãy cập nhật đầy đủ các kỹ năng & chứng chỉ trên CV trước khi bắt đầu ứng tuyển.
                        </p>
                      </div>
                    )}
                  </motion.div>
                </AnimatePresence>
              </div>

            </div>
          </div>

        </div>
      </div>

      {/* MOBILE FULL-SCREEN BOTTOM SHEET / MODAL */}
      <AnimatePresence>
        {mobileDetailOpen && (
          <motion.div 
            className="fixed inset-0 z-50 md:hidden bg-black/60 backdrop-blur-sm flex items-end justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setMobileDetailOpen(false)}
          >
            <motion.div
              className="bg-white dark:bg-stone-950 w-full max-h-[92vh] rounded-t-3xl overflow-y-auto p-6 relative border-t-2 border-stone-200 dark:border-stone-850"
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 220 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close indicator/pull handle */}
              <div className="w-12 h-1 bg-stone-300 dark:bg-stone-800 rounded-full mx-auto mb-4" onClick={() => setMobileDetailOpen(false)} />
              
              {/* Close Button */}
              <button
                onClick={() => setMobileDetailOpen(false)}
                className="absolute top-4 right-4 w-8 h-8 rounded-full bg-stone-100 dark:bg-stone-850 text-stone-500 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100 flex items-center justify-center transition-colors"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Mobile Header */}
              <div className="flex gap-4 items-center pb-5 border-b border-stone-100 dark:border-stone-850">
                <CareerAvatar career={selected} size={80} />
                <div className="min-w-0 flex-1">
                  <span 
                    className="text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full text-white inline-block"
                    style={{
                      background: `linear-gradient(135deg, ${selected.accentFrom}, ${selected.accentTo})`
                    }}
                  >
                    {selected.entryLevel.split(" - ")[0]}
                  </span>
                  <h2 className="text-lg font-black text-stone-950 dark:text-stone-50 leading-snug mt-1">
                    {selected.title}
                  </h2>
                  <p className="text-xs text-stone-400 dark:text-stone-500 font-bold">{selected.englishTitle}</p>
                </div>
              </div>

              {/* Mobile summary */}
              <p className="text-xs text-stone-600 dark:text-stone-300 leading-relaxed mt-4 bg-stone-50 dark:bg-stone-900/30 p-3 rounded-xl">
                {selected.summary}
              </p>

              {/* Mobile stats */}
              <div className="grid grid-cols-3 gap-3 mt-4">
                <div className="bg-stone-50 dark:bg-stone-900/40 p-3 rounded-xl border border-stone-200/50 dark:border-stone-850 text-center">
                  <p className="text-[9px] uppercase font-bold text-stone-400">Độ khó</p>
                  <p className="text-sm font-black text-stone-850 dark:text-stone-200 mt-1">{selected.entryDifficulty}/5</p>
                </div>
                <div className="bg-stone-50 dark:bg-stone-900/40 p-3 rounded-xl border border-stone-200/50 dark:border-stone-850 text-center">
                  <p className="text-[9px] uppercase font-bold text-stone-400">Áp lực</p>
                  <p className="text-sm font-black text-stone-850 dark:text-stone-200 mt-1">{selected.stressLevel}/5</p>
                </div>
                <div className="bg-stone-50 dark:bg-stone-900/40 p-3 rounded-xl border border-stone-200/50 dark:border-stone-850 text-center">
                  <p className="text-[9px] uppercase font-bold text-stone-400">Cân bằng</p>
                  <p className="text-sm font-black text-stone-850 dark:text-stone-200 mt-1">{selected.wlb}/5</p>
                </div>
              </div>

              {/* Mobile sections */}
              <div className="space-y-6 mt-6">
                
                {/* 1. Một ngày & Nhiệm vụ */}
                <div className="space-y-3">
                  <h3 className="text-[11px] font-black uppercase tracking-wider text-stone-400 dark:text-stone-500">
                    Một ngày & Nhiệm vụ chính
                  </h3>
                  <div className="bg-emerald-50/40 dark:bg-emerald-950/10 p-4 rounded-xl border border-emerald-500/10 text-xs italic leading-relaxed text-stone-700 dark:text-stone-300">
                    "{selected.dayInLife}"
                  </div>
                  <ul className="space-y-2.5">
                    {selected.responsibilities.map((resp, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-xs text-stone-700 dark:text-stone-300">
                        <span className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0" style={{ background: selected.accentTo }} />
                        <span>{resp}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* 2. Lộ trình */}
                <div className="space-y-3 pt-4 border-t border-stone-100 dark:border-stone-850">
                  <h3 className="text-[11px] font-black uppercase tracking-wider text-stone-400 dark:text-stone-500">
                    Lộ trình & Chứng chỉ
                  </h3>
                  <div className="relative border-l border-stone-200 dark:border-stone-800 ml-3 pl-5 space-y-4 py-1.5">
                    {selected.careerPath.map((step, idx) => (
                      <div key={idx} className="relative">
                        <div 
                          className="absolute -left-[27px] top-0.5 w-4.5 h-4.5 rounded-full flex items-center justify-center text-[9px] font-black text-white"
                          style={{
                            background: `linear-gradient(135deg, ${selected.accentFrom}, ${selected.accentTo})`
                          }}
                        >
                          {idx + 1}
                        </div>
                        <h4 className="text-xs font-black text-stone-900 dark:text-stone-100">{step}</h4>
                      </div>
                    ))}
                  </div>
                  
                  <div className="pt-2 flex flex-wrap gap-2">
                    {selected.certifications.map((cert) => (
                      <span key={cert} className="text-[10px] font-bold px-2.5 py-1 rounded bg-stone-100 dark:bg-stone-850 text-stone-700 dark:text-stone-300">
                        🎓 {cert}
                      </span>
                    ))}
                  </div>
                </div>

                {/* 3. Kỹ năng & công cụ */}
                <div className="space-y-3 pt-4 border-t border-stone-100 dark:border-stone-850">
                  <h3 className="text-[11px] font-black uppercase tracking-wider text-stone-400 dark:text-stone-500">
                    Kỹ năng & Công cụ
                  </h3>
                  <div className="flex flex-wrap gap-1.5">
                    {selected.skills.map((skill) => (
                      <span key={skill} className="text-[10px] font-semibold px-2 py-1 rounded bg-stone-100 dark:bg-stone-850 text-stone-700 dark:text-stone-300">
                        {skill}
                      </span>
                    ))}
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {selected.requiredTools.map((tool) => (
                      <span key={tool} className="text-[10px] font-semibold px-2 py-1 rounded bg-emerald-50 dark:bg-emerald-950/20 text-emerald-700 dark:text-emerald-400 border border-emerald-100/50 dark:border-emerald-900/30">
                        💻 {tool}
                      </span>
                    ))}
                  </div>
                </div>

                {/* 5. Lời khuyên & Ưu/Nhược */}
                <div className="space-y-3 pt-4 border-t border-stone-100 dark:border-stone-850">
                  <h3 className="text-[11px] font-black uppercase tracking-wider text-stone-400 dark:text-stone-500">
                    Lời khuyên & Ưu/Nhược điểm
                  </h3>
                  <div className="grid grid-cols-1 gap-3">
                    <div className="p-4 bg-emerald-50/30 dark:bg-emerald-950/10 rounded-2xl border border-emerald-500/10">
                      <span className="text-[10px] font-black text-emerald-600 dark:text-emerald-450 block mb-1 flex items-center gap-1">
                        <ThumbsUp className="w-3.5 h-3.5" />
                        ƯU ĐIỂM:
                      </span>
                      <span className="text-xs text-stone-700 dark:text-stone-300 leading-relaxed">{selected.pros}</span>
                    </div>
                    <div className="p-4 bg-rose-50/30 dark:bg-rose-950/10 rounded-2xl border border-rose-500/10">
                      <span className="text-[10px] font-black text-rose-600 dark:text-rose-450 block mb-1 flex items-center gap-1">
                        <ThumbsDown className="w-3.5 h-3.5" />
                        NHƯỢC ĐIỂM:
                      </span>
                      <span className="text-xs text-stone-700 dark:text-stone-300 leading-relaxed">{selected.cons}</span>
                    </div>
                  </div>
                  <div className="p-4 bg-amber-50/20 dark:bg-amber-955/10 rounded-2xl border border-amber-500/10 text-xs flex gap-2.5">
                    <Lightbulb className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                    <div className="text-stone-700 dark:text-stone-300 leading-relaxed">
                      <span className="font-extrabold text-stone-900 dark:text-stone-100 block mb-1">Bí quyết ứng tuyển:</span>
                      {selected.applicationTips}
                    </div>
                  </div>
                </div>

                {/* 4. Tìm việc */}
                <div className="space-y-3 pt-4 border-t border-stone-100 dark:border-stone-850 pb-6">
                  <h3 className="text-[11px] font-black uppercase tracking-wider text-stone-400 dark:text-stone-500">
                    Tìm kiếm việc làm gợi ý
                  </h3>
                  <div className="grid grid-cols-3 gap-2">
                    {JOB_SEARCH_SITES.map((site) => (
                      <button
                        key={site.id}
                        onClick={() => window.open(site.buildUrl(selected.searchKeyword), "_blank", "noopener,noreferrer")}
                        className="flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 text-[10px] font-black"
                      >
                        {site.label}
                        <ExternalLink className="w-3 h-3" />
                      </button>
                    ))}
                  </div>
                </div>

              </div>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* QUIZ MODAL */}
      <AnimatePresence>
        {showQuiz && (
          <motion.div 
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div 
              className="bg-white dark:bg-stone-900 rounded-3xl border-2 border-stone-200 dark:border-stone-800 w-full max-w-lg p-6 relative shadow-2xl overflow-hidden"
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 250 }}
            >
              <button
                onClick={() => setShowQuiz(false)}
                className="absolute top-4 right-4 w-8 h-8 rounded-full bg-stone-100 dark:bg-stone-800 text-stone-500 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100 flex items-center justify-center transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
              
              <div className="mb-6">
                <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400">
                  Câu hỏi {quizStep + 1}/{QUIZ_QUESTIONS.length}
                </span>
                <h3 className="text-base font-black text-stone-900 dark:text-stone-50 mt-3 leading-snug">
                  {QUIZ_QUESTIONS[quizStep].question}
                </h3>
              </div>
              
              <div className="space-y-2.5">
                {QUIZ_QUESTIONS[quizStep].options.map((opt, i) => (
                  <button
                    key={i}
                    onClick={() => handleAnswerSelect(opt.type)}
                    className="w-full text-left p-4 rounded-2xl border border-stone-200 dark:border-stone-800 hover:border-emerald-500 dark:hover:border-emerald-400 hover:bg-stone-50 dark:hover:bg-stone-900/60 transition-all font-semibold text-xs text-stone-850 dark:text-stone-250 cursor-pointer flex items-start"
                  >
                    <span className="inline-block w-5 h-5 rounded-full bg-stone-100 dark:bg-stone-800 text-center leading-5 text-[10px] font-bold mr-3 text-stone-500 dark:text-stone-400 shrink-0">
                      {String.fromCharCode(65 + i)}
                    </span>
                    <span className="flex-1">{opt.text}</span>
                  </button>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
