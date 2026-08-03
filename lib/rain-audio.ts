/**
 * Tiếng mưa cho khung cửa sổ ở /loi-nhan, sinh bằng Web Audio chứ không phát
 * từ một file.
 *
 * Ba lý do không dùng file. Không phải tải thêm vài trăm KB cho một trang mà
 * phần lớn người dùng sẽ tắt tiếng. Không có vòng lặp để tai bắt được điểm
 * lặp - nhiễu sinh ra liên tục thì không lặp bao giờ. Và không phụ thuộc vào
 * một tài nguyên bên ngoài nào.
 *
 * Tiếng mưa thật là nhiễu băng rộng đã bị lọc: nghe qua một lớp kính thì phần
 * cao bị hút đi nhiều hơn phần thấp, nên chỉ cần nhiễu trắng qua một bộ lọc
 * thông thấp là đã ra được cái nền đó. Phần còn lại là nhịp: một dao động rất
 * chậm ở âm lượng để cơn mưa lúc nặng lúc nhẹ, thay vì đứng yên như tiếng ồn
 * của quạt.
 *
 * KHÔNG tự phát. Trình duyệt chặn autoplay, nhưng lý do chính không phải kỹ
 * thuật: đây là trang để hạ nhịp, và một trang tự bật tiếng khi vừa mở là
 * điều ngược lại.
 */

/** Độ dài đệm nhiễu, giây. Đủ dài để tai không nghe ra điểm nối khi lặp. */
const NOISE_SECONDS = 4;

/** Âm lượng đích khi bật. Đây là tiếng nền, không phải nội dung của trang. */
export const RAIN_GAIN = 0.09;

/** Thời gian lên và xuống âm lượng, giây. Bật hay tắt đều phải mượt: một
 *  tiếng mưa xuất hiện đột ngột thì giật mình chứ không dịu. */
export const RAIN_FADE_SECONDS = 1.6;

/** Tần số cắt của bộ lọc thông thấp, Hz. Quanh mức này thì nhiễu nghe như mưa
 *  sau lớp kính; cao hơn thành tiếng xì, thấp hơn thành tiếng ù. */
const LOWPASS_HZ = 1150;

export interface RainHandle {
  /** Dừng hẳn và giải phóng tài nguyên. An toàn khi gọi nhiều lần. */
  stop: () => void;
}

type AudioContextCtor = typeof AudioContext;

function resolveAudioContext(): AudioContextCtor | null {
  if (typeof window === "undefined") return null;
  const w = window as unknown as {
    AudioContext?: AudioContextCtor;
    webkitAudioContext?: AudioContextCtor;
  };
  return w.AudioContext ?? w.webkitAudioContext ?? null;
}

/** Điền một đệm nhiễu trắng. Tách riêng để test được mà không cần Web Audio. */
export function fillWhiteNoise(channel: Float32Array, random: () => number = Math.random): void {
  for (let i = 0; i < channel.length; i++) {
    channel[i] = random() * 2 - 1;
  }
}

/**
 * Bắt đầu phát tiếng mưa. Phải được gọi từ trong một cử chỉ của người dùng,
 * nếu không trình duyệt sẽ giữ AudioContext ở trạng thái treo.
 *
 * Trả về null khi trình duyệt không có Web Audio - lúc đó phần hình vẫn chạy
 * bình thường và chỉ mất tiếng.
 */
export function startRain(): RainHandle | null {
  const Ctor = resolveAudioContext();
  if (!Ctor) return null;

  const ctx = new Ctor();
  const buffer = ctx.createBuffer(1, Math.floor(ctx.sampleRate * NOISE_SECONDS), ctx.sampleRate);
  fillWhiteNoise(buffer.getChannelData(0));

  const source = ctx.createBufferSource();
  source.buffer = buffer;
  source.loop = true;

  const lowpass = ctx.createBiquadFilter();
  lowpass.type = "lowpass";
  lowpass.frequency.value = LOWPASS_HZ;
  lowpass.Q.value = 0.7;

  // Cắt bớt phần rất trầm, nếu không nền nghe thành tiếng ù của điều hoà.
  const highpass = ctx.createBiquadFilter();
  highpass.type = "highpass";
  highpass.frequency.value = 180;

  const gain = ctx.createGain();
  gain.gain.setValueAtTime(0, ctx.currentTime);
  gain.gain.linearRampToValueAtTime(RAIN_GAIN, ctx.currentTime + RAIN_FADE_SECONDS);

  // Nhịp của cơn mưa: một dao động rất chậm quanh âm lượng nền. Không có nó
  // thì tiếng đứng yên và tai nhận ra ngay là tiếng máy chứ không phải mưa.
  const swellOsc = ctx.createOscillator();
  swellOsc.frequency.value = 1 / 11;
  const swellDepth = ctx.createGain();
  swellDepth.gain.value = RAIN_GAIN * 0.28;
  swellOsc.connect(swellDepth).connect(gain.gain);

  source.connect(highpass).connect(lowpass).connect(gain).connect(ctx.destination);
  source.start();
  swellOsc.start();

  let stopped = false;
  return {
    stop() {
      if (stopped) return;
      stopped = true;
      const end = ctx.currentTime + RAIN_FADE_SECONDS;
      gain.gain.cancelScheduledValues(ctx.currentTime);
      gain.gain.setValueAtTime(gain.gain.value, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0, end);
      // Chờ hết đoạn nhỏ dần rồi mới đóng, nếu không tiếng bị cắt cụt.
      window.setTimeout(() => {
        try {
          source.stop();
          swellOsc.stop();
          void ctx.close();
        } catch {
          // Context có thể đã đóng do trang bị huỷ - không có gì để khôi phục.
        }
      }, RAIN_FADE_SECONDS * 1000 + 120);
    },
  };
}
