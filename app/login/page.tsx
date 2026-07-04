"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { loginOrRegister, getSession } from "@/lib/auth";

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
    setLoading(true);
    loginOrRegister("Demo User", "demo@tuhoctaichinh.vn");
    router.push("/dashboard");
  }

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* ── Hero Section ── */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-16 sm:py-24">
        <div className="max-w-2xl w-full space-y-8">
          {/* Logo & Brand */}
          <div className="space-y-3">
            <div className="text-sm font-bold text-stone-400 uppercase tracking-widest">
              Tự Học Tài Chính
            </div>
            <h1 className="text-5xl sm:text-6xl font-bold text-stone-900 leading-tight">
              Hiểu tiền bạc,<br />quản lý tài sản
            </h1>
            <p className="text-lg sm:text-xl text-stone-600 leading-relaxed max-w-lg">
              200 ngày học từ vỡ lòng đến phân tích doanh nghiệp. Chọn lộ trình phù hợp, học theo tốc độ của bạn.
            </p>
          </div>

          {/* Two Track Preview */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="border-2 border-stone-200 rounded-2xl p-6 hover:border-stone-300 transition-colors">
              <div className="text-xs font-bold text-stone-400 uppercase tracking-widest mb-2">
                Track 1
              </div>
              <h3 className="text-xl font-bold text-stone-900 mb-2">Tài chính cá nhân</h3>
              <p className="text-sm text-stone-600 mb-4">
                Quản lý tiền, tiết kiệm, đầu tư cá nhân, lên kế hoạch tài chính.
              </p>
              <ul className="space-y-2 text-xs text-stone-500">
                <li className="flex gap-2"><span className="flex-shrink-0">+</span> Chặng 1: Tư duy tiền bạc</li>
                <li className="flex gap-2"><span className="flex-shrink-0">+</span> Chặng 2-4: Đầu tư thực tế</li>
                <li className="flex gap-2"><span className="flex-shrink-0">+</span> Không cần kiến thức ngành</li>
              </ul>
            </div>

            <div className="border-2 border-stone-200 rounded-2xl p-6 hover:border-stone-300 transition-colors">
              <div className="text-xs font-bold text-stone-400 uppercase tracking-widest mb-2">
                Track 2
              </div>
              <h3 className="text-xl font-bold text-stone-900 mb-2">Tài chính chuyên ngành</h3>
              <p className="text-sm text-stone-600 mb-4">
                Kế toán, phân tích báo cáo, định giá, tài chính doanh nghiệp.
              </p>
              <ul className="space-y-2 text-xs text-stone-500">
                <li className="flex gap-2"><span className="flex-shrink-0">+</span> Chặng 1-9: Từ cơ bản đến nâng cao</li>
                <li className="flex gap-2"><span className="flex-shrink-0">+</span> 50+ bài học chuyên sâu</li>
                <li className="flex gap-2"><span className="flex-shrink-0">+</span> Theo ngành, theo lĩnh vực</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* ── Form Section ── */}
      <div className="bg-stone-50 border-t border-stone-200 px-6 py-16">
        <div className="max-w-lg mx-auto">
          <div className="bg-white border border-stone-200 rounded-2xl p-8 space-y-6">
            {/* Form Title */}
            <div>
              <h2 className="text-2xl font-bold text-stone-900 mb-2">Bắt đầu ngay</h2>
              <p className="text-sm text-stone-500">Miễn phí, không cần thẻ tín dụng</p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <label className="text-xs font-bold text-stone-600 uppercase tracking-wider block">
                  Tên của bạn
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Nguyễn Văn A"
                  className="w-full px-4 py-3 rounded-xl border border-stone-200 bg-white focus:border-stone-400 focus:ring-1 focus:ring-stone-900/5 focus:outline-none text-stone-900 text-base placeholder:text-stone-300"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-stone-600 uppercase tracking-wider block">
                  Địa chỉ email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="email@vi-du.com"
                  className="w-full px-4 py-3 rounded-xl border border-stone-200 bg-white focus:border-stone-400 focus:ring-1 focus:ring-stone-900/5 focus:outline-none text-stone-900 text-base placeholder:text-stone-300"
                />
              </div>

              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 text-xs font-semibold rounded-xl px-4 py-3">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-stone-900 hover:bg-stone-800 text-white py-4 rounded-xl font-bold text-base transition-colors disabled:opacity-60 mt-2"
              >
                {loading ? "Đang xử lý..." : "Bắt đầu học miễn phí"}
              </button>
            </form>

            {/* Divider */}
            <div className="relative flex items-center">
              <div className="flex-1 border-t border-stone-100" />
              <span className="px-3 text-xs text-stone-400 font-bold uppercase tracking-wider">
                Hoặc thử
              </span>
              <div className="flex-1 border-t border-stone-100" />
            </div>

            {/* Demo Button */}
            <button
              onClick={handleDemoLogin}
              className="w-full border border-stone-200 hover:bg-stone-50 text-stone-900 py-3 rounded-xl font-bold text-base transition-colors"
            >
              Vào Demo
            </button>
          </div>

          {/* Trust indicators */}
          <div className="mt-8 text-center space-y-2">
            <p className="text-sm font-bold text-stone-900">Được tin tưởng bởi</p>
            <div className="flex items-center justify-center gap-6 text-stone-500 text-xs font-semibold">
              <div className="flex items-center gap-1">
                <span>200+ bài</span>
              </div>
              <div className="w-px h-4 bg-stone-200" />
              <div className="flex items-center gap-1">
                <span>0đ chi phí</span>
              </div>
              <div className="w-px h-4 bg-stone-200" />
              <div className="flex items-center gap-1">
                <span>Mãi mãi</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Footer Info ── */}
      <div className="bg-white border-t border-stone-100 px-6 py-8 text-center text-xs text-stone-500">
        <p>Bạn có tài khoản? Đăng nhập bằng email của bạn ở trên</p>
      </div>
    </div>
  );
}
