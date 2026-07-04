"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { loginOrRegister, getSession } from "@/lib/auth";
import { BookOpen, Users, CheckCircle2 } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (getSession()) router.replace("/dashboard");
  }, [router]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (!name.trim() || !email.trim()) {
      setError("Vui lòng điền đầy đủ tên và email.");
      return;
    }
    if (!email.includes("@")) {
      setError("Địa chỉ email không đúng định dạng.");
      return;
    }

    setLoading(true);
    loginOrRegister(name, email);
    router.push("/dashboard");
  }

  function handleDemoLogin() {
    setName("Demo User");
    setEmail("demo@tuhoctaichinh.vn");
    setLoading(true);
    loginOrRegister("Demo User", "demo@tuhoctaichinh.vn");
    router.push("/dashboard");
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#EEEDFF]/60 via-[#FAFAFC] to-[#ECFEFF]/60 flex flex-col items-center justify-center p-6 font-sans">
      <div className="w-full max-w-md space-y-8">
        
        {/* Brand header logo */}
        <div className="text-center">
          <div className="inline-flex items-center gap-3 bg-white rounded-2xl px-5 py-3 shadow-[0_4px_12px_rgba(0,0,0,0.015)] border border-stone-200/50 mb-6">
            <div className="w-8 h-8 bg-[#5F5DF0] rounded-xl flex items-center justify-center text-white text-sm font-extrabold shadow-sm shadow-[#5F5DF0]/25">
              TH
            </div>
            <div className="text-left">
              <div className="font-extrabold text-stone-900 text-xs leading-none tracking-tight">
                Tự Học Tài Chính
              </div>
              <div className="text-[9px] text-[#5F5DF0] font-bold uppercase tracking-wider mt-0.5">
                Mỗi Ngày
              </div>
            </div>
          </div>
          <h1 className="text-3xl font-extrabold text-stone-950 tracking-tight mb-2">
            Nâng tầm tri thức tài chính
          </h1>
          <p className="text-stone-500 text-sm font-medium">
            Chỉ 5-10 phút mỗi ngày. Tự tin quản lý và tích lũy tài sản.
          </p>
        </div>

        {/* Authentication Card Form */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="bg-white rounded-[24px] border border-stone-200/50 shadow-md shadow-stone-200/10 p-8 space-y-6"
        >
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-stone-600 uppercase tracking-wider block">
                Tên của bạn
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Nguyễn Văn A"
                className="w-full px-4 py-3 rounded-xl border border-stone-200 bg-white focus:border-[#5F5DF0] focus:ring-1 focus:ring-[#5F5DF0]/30 focus:outline-none text-stone-800 text-sm placeholder:text-stone-300 transition-premium font-medium"
              />
            </div>
            
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-stone-600 uppercase tracking-wider block">
                Địa chỉ email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="email@vi-du.com"
                className="w-full px-4 py-3 rounded-xl border border-stone-200 bg-white focus:border-[#5F5DF0] focus:ring-1 focus:ring-[#5F5DF0]/30 focus:outline-none text-stone-800 text-sm placeholder:text-stone-300 transition-premium font-medium"
              />
            </div>

            {error && (
              <div className="bg-[#FEF2F2] border border-red-200 text-[#EF4444] text-xs font-semibold rounded-xl px-4 py-3 leading-relaxed">
                ⚠️ {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#5F5DF0] hover:bg-[#4E4CD9] text-white py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-premium disabled:opacity-60 mt-4 cursor-pointer shadow-sm active:scale-[0.98]"
            >
              {loading ? "Đang xử lý..." : "Bắt đầu học miễn phí →"}
            </button>
          </form>

          {/* Quick Demo Switcher */}
          <div className="space-y-4 pt-2 border-t border-stone-100">
            <div className="relative flex items-center justify-center">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-stone-100" />
              </div>
              <span className="relative bg-white px-3 text-[10px] font-bold text-stone-400 uppercase tracking-widest">
                Hoặc trải nghiệm nhanh
              </span>
            </div>
            
            <button
              onClick={handleDemoLogin}
              className="w-full border border-stone-200 hover:border-stone-300 text-stone-600 py-3 rounded-xl text-xs font-bold transition-premium hover:bg-stone-50/50 flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>🎯 Vào bằng tài khoản Demo</span>
            </button>
          </div>
        </motion.div>

        {/* Feature/Stats highlights */}
        <div className="grid grid-cols-3 gap-3">
          {[
            { label: "Bài học", num: "44+", icon: BookOpen, color: "text-[#5F5DF0]", bg: "bg-[#EEEDFF]" },
            { label: "Học viên", num: "5.000+", icon: Users, color: "text-[#3FD1E3]", bg: "bg-[#ECFEFF]" },
            { label: "Mãi mãi", num: "Miễn phí", icon: CheckCircle2, color: "text-[#3CD070]", bg: "bg-[#ECFDF5]" },
          ].map((s) => {
            const Icon = s.icon;
            return (
              <div
                key={s.label}
                className="bg-white rounded-2xl p-4 border border-stone-200/50 flex flex-col items-center text-center shadow-sm shadow-stone-200/5"
              >
                <div className={`w-8 h-8 rounded-lg ${s.bg} flex items-center justify-center mb-2`}>
                  <Icon className={`w-4 h-4 ${s.color} stroke-[2.5]`} />
                </div>
                <div className="font-extrabold text-stone-900 text-xs tracking-tight">
                  {s.num}
                </div>
                <div className="text-[9px] text-stone-400 font-bold uppercase tracking-wider mt-0.5">
                  {s.label}
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
}
