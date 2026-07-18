"use client";

import { useState, useRef } from "react";
import { X, Award, Download, Check, Share2 } from "lucide-react";
import { toast } from "sonner";
import { svgToPngBlob, shareOrDownloadImage } from "@/lib/share-image";

interface CertificateModalProps {
  stageLabel: string;
  stageName: string;
  userName: string;
  onClose: () => void;
}

export default function CertificateModal({ stageLabel, stageName, userName, onClose }: CertificateModalProps) {
  const [downloading, setDownloading] = useState(false);
  const [downloaded, setDownloaded] = useState(false);
  const [sharing, setSharing] = useState(false);
  const svgRef = useRef<SVGSVGElement | null>(null);

  // Generate unique certificate ID hash
  const certId = `CERT-${stageLabel.toUpperCase()}-${Math.abs(
    userName.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0)
  ).toString(16).toUpperCase()}-${new Date().getFullYear()}`;

  const todayStr = new Date().toLocaleDateString("vi-VN", {
    day: "numeric",
    month: "numeric",
    year: "numeric",
  });

  const certFilename = `chung_chi_${stageLabel.toLowerCase().replace(/\s+/g, "_")}.png`;

  const handleDownload = async () => {
    if (!svgRef.current || downloading) return;
    setDownloading(true);
    try {
      const blob = await svgToPngBlob(svgRef.current, 1600, 1200);
      const url = URL.createObjectURL(blob);
      const downloadLink = document.createElement("a");
      downloadLink.href = url;
      downloadLink.download = certFilename;
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
      URL.revokeObjectURL(url);
      setDownloaded(true);
      toast.success("Tải xuống chứng chỉ thành công! Hãy chia sẻ lên Facebook/LinkedIn nhé 🏆🚀");
    } catch (error) {
      console.error("Error creating certificate download:", error);
      toast.error("Không thể tải chứng chỉ lúc này.");
    } finally {
      setDownloading(false);
    }
  };

  const handleShare = async () => {
    if (!svgRef.current || sharing) return;
    setSharing(true);
    try {
      const blob = await svgToPngBlob(svgRef.current, 1600, 1200);
      const outcome = await shareOrDownloadImage(
        blob,
        certFilename,
        `Mình vừa hoàn thành chặng ${stageName} (${stageLabel}) trên Tự học Tài chính! 🏆`
      );
      if (outcome === "shared") toast.success("Đã chia sẻ chứng chỉ!");
      else if (outcome === "downloaded") toast.success("Đã tải ảnh chứng chỉ - đăng lên Facebook/LinkedIn và đính kèm ảnh này nhé!");
    } catch (error) {
      console.error("Error sharing certificate:", error);
      toast.error("Không thể chia sẻ chứng chỉ lúc này.");
    } finally {
      setSharing(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-[fadeIn_0.2s_ease-out]">
      <div className="bg-stone-900 border border-stone-850 rounded-3xl w-full max-w-4xl p-6 md:p-8 flex flex-col items-center shadow-2xl relative animate-[scaleIn_0.3s_ease-out] text-white">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-9 h-9 rounded-full bg-stone-800 hover:bg-stone-750 text-stone-400 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header Title */}
        <div className="text-center space-y-1 mb-6">
          <span className="text-[10px] font-extrabold uppercase tracking-widest text-amber-500 flex items-center justify-center gap-1.5">
            <Award className="w-4.5 h-4.5" />
            Học Học Nữa Học Mãi
          </span>
          <h3 className="text-xl md:text-2xl font-black text-stone-100">
            Chứng Chỉ Hoàn Thành Cột Mốc
          </h3>
          <p className="text-xs text-stone-400 max-w-md mx-auto">
            Học viên hoàn thành xuất sắc toàn bộ bài học và bài kiểm tra sát hạch thuộc chặng học tập.
          </p>
        </div>

        {/* Certificate Rendering Box (Premium Styling) */}
        <div className="w-full border border-stone-800 rounded-2xl overflow-hidden shadow-inner bg-stone-950 flex items-center justify-center p-2 md:p-4 max-h-[60vh]">
          <svg
            ref={svgRef}
            id="cert-svg"
            viewBox="0 0 800 600"
            className="w-full h-auto aspect-[4/3] rounded-lg"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Dark Navy Gradient Background */}
            <defs>
              <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#08070b" />
                <stop offset="50%" stopColor="#0f111a" />
                <stop offset="100%" stopColor="#050608" />
              </linearGradient>
              <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#d97706" />
                <stop offset="50%" stopColor="#fbbf24" />
                <stop offset="100%" stopColor="#d97706" />
              </linearGradient>
            </defs>

            <rect width="800" height="600" fill="url(#bgGrad)" />

            {/* Premium Gold Geometric Backdrop Lines */}
            <path d="M 50 50 L 750 50 L 750 550 L 50 550 Z" fill="none" stroke="url(#goldGrad)" strokeWidth="3" opacity="0.8" />
            <path d="M 60 60 L 740 60 L 740 540 L 60 540 Z" fill="none" stroke="#fbbf24" strokeWidth="0.8" opacity="0.3" />

            {/* Corner Ornaments */}
            <path d="M 40 70 L 70 40 M 70 40 L 100 40 M 40 70 L 40 100" fill="none" stroke="url(#goldGrad)" strokeWidth="2.5" />
            <path d="M 760 70 L 730 40 M 730 40 L 700 40 M 760 70 L 760 100" fill="none" stroke="url(#goldGrad)" strokeWidth="2.5" />
            <path d="M 40 530 L 70 560 M 70 560 L 100 560 M 40 530 L 40 500" fill="none" stroke="url(#goldGrad)" strokeWidth="2.5" />
            <path d="M 760 530 L 730 560 M 730 560 L 700 560 M 760 530 L 760 500" fill="none" stroke="url(#goldGrad)" strokeWidth="2.5" />

            {/* Ornate Gold Filigree Rings in Backdrop */}
            <circle cx="400" cy="300" r="190" fill="none" stroke="url(#goldGrad)" strokeWidth="0.5" opacity="0.12" />
            <circle cx="400" cy="300" r="230" fill="none" stroke="url(#goldGrad)" strokeWidth="0.3" opacity="0.08" />

            {/* Header Logos & Typography */}
            <text x="400" y="110" textAnchor="middle" fill="#d97706" fontSize="10" fontWeight="900" letterSpacing="4">
              TỰ HỌC TÀI CHÍNH MỖI NGÀY
            </text>
            <text x="400" y="160" textAnchor="middle" fill="#ffffff" fontSize="24" fontWeight="800" letterSpacing="3">
              CHỨNG NHẬN HOÀN THÀNH
            </text>

            <line x1="300" y1="180" x2="500" y2="180" stroke="url(#goldGrad)" strokeWidth="1.5" />

            {/* Presentation details */}
            <text x="400" y="220" textAnchor="middle" fill="#94a3b8" fontSize="12" fontStyle="italic">
              Học viện Tự học Tài chính trân trọng vinh danh
            </text>

            {/* User Name */}
            <text x="400" y="280" textAnchor="middle" fill="url(#goldGrad)" fontSize="34" fontWeight="900" letterSpacing="1">
              {userName}
            </text>

            {/* Milestone Info */}
            <text x="400" y="335" textAnchor="middle" fill="#94a3b8" fontSize="12" fontStyle="italic">
              Đã vượt qua xuất sắc các bài học vĩ mô và bài thi sát hạch chặng học tập:
            </text>

            {/* Stage Title */}
            <text x="400" y="380" textAnchor="middle" fill="#ffffff" fontSize="20" fontWeight="800" letterSpacing="1">
              {stageName} ({stageLabel})
            </text>

            <line x1="200" y1="420" x2="600" y2="420" stroke="#334155" strokeWidth="0.8" />

            {/* Bottom metadata - Signatures / Date / ID */}
            {/* Left side: Date */}
            <text x="180" y="460" textAnchor="start" fill="#64748b" fontSize="10" fontWeight="700" letterSpacing="1">
              NGÀY CẤP:
            </text>
            <text x="180" y="485" textAnchor="start" fill="#e2e8f0" fontSize="12" fontWeight="800">
              {todayStr}
            </text>

            {/* Center: Gold Stamp Seal Graphic */}
            <g transform="translate(400, 480)">
              <circle cx="0" cy="0" r="32" fill="#fbbf24" opacity="0.08" />
              <circle cx="0" cy="0" r="25" fill="none" stroke="url(#goldGrad)" strokeWidth="2.5" />
              <polygon points="0,-16 5,-5 16,-5 8,3 11,14 0,7 -11,14 -8,3 -16,-5 -5,-5" fill="url(#goldGrad)" />
            </g>

            {/* Right side: Signature */}
            <text x="620" y="460" textAnchor="end" fill="#64748b" fontSize="10" fontWeight="700" letterSpacing="1">
              ĐẠI DIỆN HỘI ĐỒNG:
            </text>
            <text x="620" y="485" textAnchor="end" fill="#fbbf24" fontSize="16" fontWeight="bold" fontStyle="italic" letterSpacing="1">
              Tri Dinh Bui
            </text>

            {/* Bottom Verification Hash */}
            <text x="400" y="555" textAnchor="middle" fill="#475569" fontSize="9" fontWeight="700" letterSpacing="1">
              MÃ XÁC MINH: {certId} · KIỂM CHỨNG TẠI TUHOCTAICHINH.COM
            </text>
          </svg>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 w-full mt-6">
          <button
            onClick={handleDownload}
            disabled={downloading}
            className="flex-1 py-3.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 disabled:from-stone-800 disabled:to-stone-800 text-white rounded-2xl text-xs font-black uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-amber-500/10 focus:outline-none"
          >
            {downloading ? (
              <>
                <span className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                Đang kết xuất...
              </>
            ) : downloaded ? (
              <>
                <Check className="w-4.5 h-4.5" />
                Tải lại Chứng Chỉ
              </>
            ) : (
              <>
                <Download className="w-4.5 h-4.5" />
                Tải Xuống Chứng Chỉ (PNG)
              </>
            )}
          </button>
          <button
            onClick={handleShare}
            disabled={sharing}
            className="flex-1 py-3.5 bg-stone-800 hover:bg-stone-750 disabled:opacity-60 text-white rounded-2xl text-xs font-black uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer focus:outline-none"
          >
            {sharing ? (
              <span className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
            ) : (
              <Share2 className="w-4.5 h-4.5" />
            )}
            Chia sẻ
          </button>
        </div>
      </div>
    </div>
  );
}
