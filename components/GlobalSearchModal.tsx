"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Search, BookOpen, Calculator, MessageCircle, ArrowRight, X, Sparkles, HelpCircle } from "lucide-react";

interface SearchResultItem {
  id: string;
  category: "lesson" | "tool" | "community" | "glossary";
  title: string;
  desc: string;
  url: string;
}

const SAMPLE_LESSONS: SearchResultItem[] = [
  { id: "l-1", category: "lesson", title: "Audit Tài chính Cá nhân & Tích sản", desc: "Đánh giá bức tranh tài sản ròng và dòng tiền cá nhân.", url: "/bai-hoc/audit-tai-chinh-ca-nhan" },
  { id: "l-2", category: "lesson", title: "Đọc Bảng Cân Đối Kế Toán Doanh Nghiệp", desc: "Tài sản = Nợ phải trả + Vốn chủ sở hữu.", url: "/dashboard" },
  { id: "l-3", category: "lesson", title: "Phân tích Định giá Cổ phiếu DCF", desc: "Chiết khấu dòng tiền tự do FCF về hiện tại.", url: "/dashboard" },
  { id: "l-4", category: "lesson", title: "Chi phí vốn WACC & Cấu trúc Nợ", desc: "Tính toán chi phí vốn bình quân gia quyền.", url: "/dashboard" },
];

const SAMPLE_GLOSSARY: SearchResultItem[] = [
  { id: "g-dcf", category: "glossary", title: "DCF (Discounted Cash Flow)", desc: "Phương pháp chiết khấu dòng tiền tự do về hiện tại để định giá doanh nghiệp.", url: "/cong-cu" },
  { id: "g-wacc", category: "glossary", title: "WACC (Weighted Average Cost of Capital)", desc: "Chi phí vốn bình quân gia quyền đại diện cho tỷ lệ sinh lời tối thiểu cần đạt.", url: "/cong-cu" },
  { id: "g-pe", category: "glossary", title: "P/E (Price to Earnings)", desc: "Hệ số giữa giá cổ phiếu và lợi nhuận trên mỗi cổ phiếu.", url: "/tai-lieu" },
  { id: "g-roe", category: "glossary", title: "ROE (Return on Equity)", desc: "Tỷ suất lợi nhuận trên vốn chủ sở hữu đo lường hiệu quả sử dụng vốn.", url: "/tai-lieu" },
];

const SAMPLE_TOOLS: SearchResultItem[] = [
  { id: "t-networth", category: "tool", title: "Máy tính Tài sản ròng", desc: "Theo dõi tổng tài sản trừ đi tổng nợ vay cá nhân.", url: "/cong-cu" },
  { id: "t-budget", category: "tool", title: "Ngân sách 50/30/20", desc: "Phân bổ thu nhập thành Thiết yếu - Mong muốn - Tích sản.", url: "/cong-cu" },
  { id: "t-fire", category: "tool", title: "Kế hoạch Tự do tài chính FIRE", desc: "Tính số tiền cần tích lũy để nghỉ hưu sớm.", url: "/cong-cu" },
  { id: "t-dcf", category: "tool", title: "Máy tính Định giá DCF & WACC", desc: "Mô phỏng chiết khấu dòng tiền & tính chi phí vốn doanh nghiệp.", url: "/cong-cu" },
];

export default function GlobalSearchModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResultItem[]>([]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        if (isOpen) onClose();
        else {
          // Open triggered from parent or global handler
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  useEffect(() => {
    const q = query.trim().toLowerCase();
    if (!q) {
      setResults([]);
      return;
    }

    const filteredTools = SAMPLE_TOOLS.filter((t) => t.title.toLowerCase().includes(q) || t.desc.toLowerCase().includes(q));
    const filteredGlossary = SAMPLE_GLOSSARY.filter((g) => g.title.toLowerCase().includes(q) || g.desc.toLowerCase().includes(q));

    const filteredLessons = SAMPLE_LESSONS.filter(
      (l) => l.title.toLowerCase().includes(q) || l.desc.toLowerCase().includes(q)
    );

    setResults([...filteredLessons, ...filteredTools, ...filteredGlossary]);
  }, [query]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-black/70 backdrop-blur-xs font-sans">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: -10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: -10 }}
          className="relative w-full max-w-2xl rounded-3xl bg-white dark:bg-stone-900 shadow-2xl border border-stone-200 dark:border-stone-800 overflow-hidden"
        >
          {/* Search Input Header */}
          <div className="relative border-b border-stone-100 dark:border-stone-800 p-4">
            <Search className="pointer-events-none absolute left-5 top-1/2 -translate-y-1/2 h-5 w-5 text-stone-400" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Tìm bài học, thuật ngữ, công cụ định giá... (ví dụ: DCF, WACC, P/E)"
              autoFocus
              className="w-full bg-transparent pl-9 pr-10 text-base font-bold text-stone-900 dark:text-stone-100 placeholder:text-stone-400 focus:outline-none"
            />
            <button
              type="button"
              onClick={onClose}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-1.5 rounded-full text-stone-400 hover:bg-stone-100 dark:hover:bg-stone-800 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Results Area */}
          <div className="max-h-[60vh] overflow-y-auto p-4 space-y-3">
            {query.trim() === "" ? (
              <div className="text-center py-8 text-stone-400 space-y-2">
                <Sparkles className="w-8 h-8 text-emerald-500 mx-auto opacity-70" />
                <p className="text-xs font-bold">Nhập từ khóa bất kỳ để tìm kiếm toàn bộ hệ thống</p>
                <div className="flex flex-wrap justify-center gap-2 pt-2 text-[11px]">
                  {["DCF", "WACC", "LBO", "P/E", "ROE", "Nợ vay", "Tích sản"].map((kw) => (
                    <button
                      key={kw}
                      type="button"
                      onClick={() => setQuery(kw)}
                      className="px-2.5 py-1 rounded-full bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 font-bold hover:bg-stone-200 cursor-pointer"
                    >
                      {kw}
                    </button>
                  ))}
                </div>
              </div>
            ) : results.length === 0 ? (
              <p className="text-center py-8 text-xs text-stone-400">
                Không tìm thấy kết quả nào phù hợp với &quot;{query}&quot;.
              </p>
            ) : (
              <div className="space-y-2">
                {results.map((item: SearchResultItem) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => {
                      onClose();
                      router.push(item.url);
                    }}
                    className="w-full text-left p-3 rounded-2xl border border-stone-200 dark:border-stone-800 hover:border-emerald-500 hover:bg-stone-50 dark:hover:bg-stone-800/60 transition-all cursor-pointer flex items-center justify-between group"
                  >
                    <div className="flex items-center gap-3">
                      <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300">
                        {item.category === "lesson" && <BookOpen className="w-4 h-4 text-emerald-500" />}
                        {item.category === "tool" && <Calculator className="w-4 h-4 text-sky-500" />}
                        {item.category === "glossary" && <HelpCircle className="w-4 h-4 text-amber-500" />}
                      </span>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full bg-stone-100 dark:bg-stone-800 text-stone-500 dark:text-stone-400">
                            {item.category === "lesson" ? "Bài học" : item.category === "tool" ? "Công cụ" : "Thuật ngữ"}
                          </span>
                        </div>
                        <h4 className="text-xs sm:text-sm font-black text-stone-900 dark:text-stone-100 mt-0.5">
                          {item.title}
                        </h4>
                        <p className="text-[11px] text-stone-500 dark:text-stone-400 line-clamp-1">{item.desc}</p>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-stone-400 group-hover:text-emerald-500 group-hover:translate-x-1 transition-all shrink-0" />
                  </button>
                ))}
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
