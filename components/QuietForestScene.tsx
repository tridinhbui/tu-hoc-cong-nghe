"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { useReducedMotion } from "framer-motion";
import { Maximize2, Minimize2, Volume2, VolumeX } from "lucide-react";
import DinhHoaFlame from "@/components/DinhHoaFlame";
import Joystick from "@/components/world-controls/joystick";
import { createWalkState } from "@/components/world-controls/easy-walk";
import { startRain, type RainHandle } from "@/lib/rain-audio";
import { signsOf, type QuietSign } from "@/lib/quiet-forest-space";
import { useI18n } from "@/lib/i18n/context";

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

/** Ba tấm biển, viết ra thành chữ.
 *
 *  Người bật giảm chuyển động không nhận cảnh 3D nào cả - đó là chủ ý sẵn có
 *  và không đổi, vì đây là nhóm mà chuyển động gây khó chịu thật. Nhưng từ lúc
 *  ba lời nhắn được khắc lên biển TRONG cảnh, quyết định ấy lặng lẽ đổi nghĩa:
 *  nó thôi là "bớt chuyển động" và thành "bớt nội dung". Người cần một trang
 *  đứng yên nhất lại là người bị giấu mất phần chữ dịu nhất trên trang.
 *
 *  Cũng là thứ làm cho `sceneAria` nói thật. Nhãn ấy hứa rằng nội dung ba tấm
 *  biển "cũng có ở các mục bên dưới" - trước khối này thì đó là một lời hứa
 *  suông với đúng nhóm người dùng đang phải tin vào nó. */
function SignsAsText({ signs }: { signs: QuietSign[] }) {
  return (
    <ul className="mx-auto mt-6 grid max-w-lg gap-3 text-left sm:grid-cols-3">
      {signs.map((sign) => (
        <li
          key={sign.id}
          className="rounded-2xl border-l-2 bg-stone-50 px-4 py-3 dark:bg-stone-900/60"
          style={{ borderLeftColor: sign.accent }}
        >
          <p
            className="text-[11px] font-black uppercase tracking-[0.16em]"
            style={{ color: sign.accent }}
          >
            {sign.title}
          </p>
          {sign.lines.map((line) => (
            <p
              key={line}
              className="mt-1.5 text-xs leading-relaxed text-stone-600 dark:text-stone-300"
            >
              {line}
            </p>
          ))}
        </li>
      ))}
    </ul>
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
  const { t } = useI18n();
  const reduced = useReducedMotion();
  const [visible, setVisible] = useState(false);
  const [rainOn, setRainOn] = useState(false);
  const rain = useRef<RainHandle | null>(null);
  const host = useRef<HTMLDivElement>(null);
  /** Tấm biển đang đứng cạnh, hoặc null. */
  const [sign, setSign] = useState<QuietSign | null>(null);
  const [expanded, setExpanded] = useState(false);
  /** Ý định di chuyển. Sở hữu ở đây chứ không trong cảnh: cần điều khiển ảo là
   *  một phần tử HTML nằm đè lên khung, ngoài Canvas. */
  const walkRef = useRef(createWalkState());

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
    // Khung cao hơn hẳn bản trước (280/340px). Ở cỡ đó khu rừng là một dải
    // ngang, và một người đi trong đó chiếm chừng bốn chục điểm ảnh - không đủ
    // để nhận ra là hình người, chứ đừng nói là nhận ra mình đang điều khiển
    // nó. Đơn vị là `svh` chứ không phải `vh`: trên trình duyệt di động `vh`
    // tính cả thanh địa chỉ đang thu lại, nên 70vh tràn xuống dưới màn hình
    // đúng bằng ngần ấy.
    //
    // Nút mở rộng đưa khung lên gần trọn màn. Không đặt mặc định ở mức đó vì
    // trang này còn phần chữ bên dưới, và một khung chiếm hết màn hình lúc vừa
    // mở sẽ giấu mất chúng.
    <div
      ref={host}
      className={
        reduced
          ? "relative"
          : // Bo góc và cắt phần thừa: khung này nằm trong một thẻ trắng bo
            // tròn của trang, và một khu rừng đêm là một mảng gần đen. Ở cỡ
            // 280px cũ thì nó đọc ra như một cái ảnh nhỏ; nới lên hơn nửa màn
            // hình thì cùng cái mảng ấy thành một hình chữ nhật cạnh sắc dán
            // vào giữa thẻ. Bo góc biến nó thành một Ô CỬA nhìn ra đêm, và đó
            // là thứ nó vốn phải là.
            //
            // Nền tối đặt ở đây chứ không để trong suốt: Canvas trong suốt thì
            // ở chế độ sáng, khoảng trời giữa các tán cây là màu trắng của thẻ
            // - trời trắng lúc nửa đêm.
            `relative overflow-hidden rounded-[22px] bg-[#080d0f] ${
              expanded ? "h-[88svh]" : "h-[58svh] min-h-[380px] sm:h-[64svh]"
            }`
      }
    >
      {/* Giảm chuyển động: ngọn lửa tĩnh giữ nguyên chiều cao cũ. Kéo nó lên
          58svh là dành hơn nửa màn hình cho một hình ảnh không đổi gì cả. */}
      <div
        className={reduced ? "h-[280px] w-full sm:h-[340px]" : "h-full w-full"}
        role={reduced ? undefined : "img"}
        aria-label={reduced ? undefined : t.quietForest.sceneAria}
      >
        {reduced ? (
          <FlameFallback intensity={intensity} />
        ) : visible ? (
          <SceneInner
            intensity={intensity}
            reducedMotion={false}
            setDownCount={setDownCount}
            walkRef={walkRef}
            onSignNear={setSign}
          />
        ) : (
          <FlameFallback intensity={intensity} />
        )}
      </div>

      {reduced && <SignsAsText signs={signsOf(t)} />}

      {!reduced && (
        <>
          <div className="absolute right-2 top-2 flex flex-col items-end gap-1.5">
            <button
              type="button"
              onClick={toggleRain}
              aria-pressed={rainOn}
              className="inline-flex items-center gap-1.5 rounded-full border border-stone-300/70 bg-white/70 px-3 py-1.5 text-[11px] font-bold text-stone-600 backdrop-blur transition-colors hover:bg-white dark:border-stone-700/70 dark:bg-stone-900/70 dark:text-stone-300 dark:hover:bg-stone-900"
            >
              {rainOn ? <Volume2 className="h-3.5 w-3.5" /> : <VolumeX className="h-3.5 w-3.5" />}
              {rainOn ? t.miscUi.quietForestScene.turnOffRain : t.miscUi.quietForestScene.turnOnRain}
            </button>
            <button
              type="button"
              onClick={() => setExpanded((v) => !v)}
              aria-pressed={expanded}
              className="inline-flex items-center gap-1.5 rounded-full border border-stone-300/70 bg-white/70 px-3 py-1.5 text-[11px] font-bold text-stone-600 backdrop-blur transition-colors hover:bg-white dark:border-stone-700/70 dark:bg-stone-900/70 dark:text-stone-300 dark:hover:bg-stone-900"
            >
              {expanded ? <Minimize2 className="h-3.5 w-3.5" /> : <Maximize2 className="h-3.5 w-3.5" />}
              {expanded ? t.quietForest.collapse : t.quietForest.expand}
            </button>
          </div>

          {/* Chữ trên tấm biển. Hiện ở đây chứ không khắc lên gỗ trong cảnh -
              lý do ở chú thích của Signpost. Canh giữa và lùi khỏi đáy để
              không đè lên cần điều khiển. */}
          {sign && (
            <div className="pointer-events-none absolute inset-x-0 bottom-24 flex justify-center px-4 sm:bottom-16">
              <div
                className="w-full max-w-sm rounded-2xl border bg-stone-950/85 p-4 text-left shadow-2xl backdrop-blur"
                style={{ borderColor: sign.accent }}
              >
                <p
                  className="text-[11px] font-black uppercase tracking-[0.18em]"
                  style={{ color: sign.accent }}
                >
                  {sign.title}
                </p>
                {sign.lines.map((line) => (
                  <p key={line} className="mt-1.5 text-sm leading-relaxed text-stone-200">
                    {line}
                  </p>
                ))}
              </div>
            </div>
          )}

          {/* Cần điều khiển. Hiện trên mọi máy, không chỉ máy cảm ứng: người
              chưa từng điều khiển nhân vật 3D nào sẽ không đoán ra là có W A S D,
              và một cần điều khiển nhìn thấy được là lời mời duy nhất nói rằng
              đi lại được. */}
          {/* bottom-7: cần điều khiển có nhãn chữ nằm DƯỚI vòng tròn, và ở
              bottom-3 nhãn đó bị mép khung cắt đúng một nửa. */}
          <div className="absolute bottom-7 right-3">
            <Joystick
              onVector={(x, y) => {
                const walk = walkRef.current;
                walk.input.x = x;
                walk.input.y = y;
                // Cầm cần là giành lại quyền lái: đích chạm-để-đi phải nhường.
                if (Math.hypot(x, y) > 0.08) walk.target = null;
              }}
            />
          </div>

          {!sign && (
            // Canh trái và chừa chỗ bên phải cho cần điều khiển. Căn giữa cả
            // bề ngang thì trên màn 375px dòng này chạy thẳng xuống dưới vòng
            // điều khiển và đè lên nhãn "kéo để đi" của nó - hai câu chữ nhỏ
            // chồng lên nhau, cả hai đều không đọc được.
            <p className="pointer-events-none absolute bottom-3 left-4 right-28 max-w-[16rem] text-left text-[10px] font-semibold leading-relaxed text-stone-400 dark:text-stone-500">
              {t.quietForest.signsHint}
            </p>
          )}
        </>
      )}
    </div>
  );
}
