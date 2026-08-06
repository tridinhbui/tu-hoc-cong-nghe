"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { useReducedMotion } from "framer-motion";
import { Volume2, VolumeX } from "lucide-react";
import DinhHoaFlame from "@/components/DinhHoaFlame";
import { startRain, type RainHandle } from "@/lib/rain-audio";

/** three.js chỉ chạy phía trình duyệt - ssr:false giữ nó ngoài bundle server,
 *  và trong lúc chờ thì ngọn lửa 2D cũ đứng thế chỗ. Đó cũng là lý do
 *  DinhHoaFlame không bị xoá: nó là fallback thật, không phải mã chết. */
const SceneInner = dynamic(() => import("./QuietForestSceneInner"), {
  ssr: false,
  loading: () => <FlameFallback />,
});

function FlameFallback({ intensity = 0.6 }: { intensity?: number }) {
  return (
    <div className="flex h-full items-center justify-center">
      <DinhHoaFlame intensity={intensity} />
    </div>
  );
}

/**
 * Một đốm lửa nhỏ trong mưa nhỏ giữa rừng, thay cho ngọn lửa phẳng ở đầu trang
 * /loi-nhan.
 *
 * Trước đây cảnh này là một khung cửa sổ: người xem ngồi trong nhà nhìn mưa
 * qua kính, và tấm kính đó giữ mưa với lửa ở hai phía không bao giờ gặp nhau.
 * Bỏ kính đi thì mưa rơi cả trước lẫn sau ngọn lửa - khác biệt giữa "nhìn mưa"
 * và "đang ở trong mưa" - đổi lại phải trả lời được vì sao lửa không tắt, và
 * câu trả lời là tán cây ngay trên đầu (SHELTER_RADIUS).
 *
 * Ba quyết định đáng nói:
 *
 *   1. Tiếng mưa mặc định TẮT và chỉ bật bằng một cú bấm. Trình duyệt chặn
 *      autoplay, nhưng lý do chính không phải kỹ thuật: đây là trang để hạ
 *      nhịp, và một trang tự phát tiếng khi vừa mở là điều ngược lại.
 *   2. Cảnh chỉ dựng khi đã cuộn tới. Một Canvas WebGL chạy nền cho khối mà
 *      người dùng chưa nhìn tới là thứ làm nóng máy mà không đổi lại được gì.
 *   3. Người bật giảm chuyển động thì không có cảnh 3D nào cả - họ nhận đúng
 *      ngọn lửa tĩnh như trước. Đây là nhóm mà chuyển động gây khó chịu thật,
 *      nên "vẫn chạy nhưng chậm hơn" không phải một đáp án.
 */
export default function QuietForestScene({
  intensity = 0.6,
  setDownCount = 0,
}: {
  intensity?: number;
  /** Số nỗi lo người đọc đã đặt xuống trong phiên này. Mỗi lần tăng thêm một,
   *  đống lửa bốc lên một chùm tàn - cử chỉ đó là thứ duy nhất trang này mời
   *  người ta làm, nên nó phải được đáp lại bằng một thứ nhìn thấy được, chứ
   *  không chỉ là ngọn lửa sáng thêm vài phần trăm. */
  setDownCount?: number;
}) {
  const reduced = useReducedMotion();
  const [visible, setVisible] = useState(false);
  const [rainOn, setRainOn] = useState(false);
  const rain = useRef<RainHandle | null>(null);
  const host = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = host.current;
    if (!el || typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { rootMargin: "120px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Tiếng phải tắt khi rời trang, kể cả khi người dùng không bấm tắt.
  useEffect(() => {
    return () => {
      rain.current?.stop();
      rain.current = null;
    };
  }, []);

  const toggleRain = () => {
    if (rainOn) {
      rain.current?.stop();
      rain.current = null;
      setRainOn(false);
      return;
    }
    // Gọi trong chính cú bấm: ngoài cử chỉ của người dùng thì AudioContext bị
    // trình duyệt giữ ở trạng thái treo và không có tiếng nào phát ra.
    const handle = startRain();
    if (!handle) return;
    rain.current = handle;
    setRainOn(true);
  };

  return (
    <div ref={host} className="relative">
      <div className="h-[280px] w-full sm:h-[340px]">
        {reduced ? (
          <FlameFallback intensity={intensity} />
        ) : visible ? (
          <SceneInner intensity={intensity} reducedMotion={false} setDownCount={setDownCount} />
        ) : (
          <FlameFallback intensity={intensity} />
        )}
      </div>

      {!reduced && (
        <>
          <button
            type="button"
            onClick={toggleRain}
            aria-pressed={rainOn}
            className="absolute right-2 top-2 inline-flex items-center gap-1.5 rounded-full border border-stone-300/70 bg-white/70 px-3 py-1.5 text-[11px] font-bold text-stone-600 backdrop-blur transition-colors hover:bg-white dark:border-stone-700/70 dark:bg-stone-900/70 dark:text-stone-300 dark:hover:bg-stone-900"
          >
            {rainOn ? <Volume2 className="h-3.5 w-3.5" /> : <VolumeX className="h-3.5 w-3.5" />}
            {rainOn ? "Tắt tiếng mưa" : "Bật tiếng mưa"}
          </button>
          <p className="pointer-events-none absolute bottom-1 left-0 right-0 text-center text-[10px] font-semibold text-stone-400 dark:text-stone-500">
            Kéo để nhìn nghiêng · lướt nhanh ngang để thổi vào lửa
          </p>
        </>
      )}
    </div>
  );
}
