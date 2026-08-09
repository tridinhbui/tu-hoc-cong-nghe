import * as THREE from "three";

/** Mọi vân bề mặt trong đại sảnh được vẽ bằng canvas 2D lúc chạy thay vì tải
 *  ảnh. Ba lý do: không thêm asset nào vào bundle, không phụ thuộc mạng khi
 *  vào phòng, và không vướng CSP. Đổi lại phải tự lo cache - mỗi texture chỉ
 *  dựng một lần rồi dùng lại, vì tạo lại trong render loop sẽ rò GPU memory. */

const cache = new Map<string, THREE.Texture>();

function draw(key: string, w: number, h: number, paint: (c: CanvasRenderingContext2D) => void) {
  const cached = cache.get(key);
  if (cached) return cached;

  const canvas = document.createElement("canvas");
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Không lấy được canvas 2D context để dựng vân bề mặt");
  paint(ctx);

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.anisotropy = 4;
  texture.colorSpace = THREE.SRGBColorSpace;
  cache.set(key, texture);
  return texture;
}

/** Sàn đá hoa cương lát ô, kiểu sảnh đọc cổ điển. */
export function marbleFloorTexture(): THREE.Texture {
  const t = draw("marble", 512, 512, (ctx) => {
    const tile = 256;
    for (let y = 0; y < 2; y += 1) {
      for (let x = 0; x < 2; x += 1) {
        ctx.fillStyle = (x + y) % 2 === 0 ? "#d9cfc0" : "#c4b8a6";
        ctx.fillRect(x * tile, y * tile, tile, tile);
      }
    }
    // Vân đá: những nét mảnh, nhạt, hướng ngẫu nhiên.
    ctx.strokeStyle = "rgba(120,105,88,0.22)";
    ctx.lineWidth = 1.2;
    for (let i = 0; i < 90; i += 1) {
      const x = Math.random() * 512;
      const y = Math.random() * 512;
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.bezierCurveTo(x + 40, y + 18, x + 70, y - 22, x + 120, y + 8);
      ctx.stroke();
    }
    // Mạch vữa giữa các ô.
    ctx.strokeStyle = "rgba(90,78,64,0.5)";
    ctx.lineWidth = 3;
    ctx.strokeRect(0, 0, 256, 256);
    ctx.strokeRect(256, 0, 256, 256);
    ctx.strokeRect(0, 256, 256, 256);
    ctx.strokeRect(256, 256, 256, 256);
  });
  t.repeat.set(10, 18);
  return t;
}

/** Gỗ sồi sẫm cho bàn đọc và ốp tường. */
export function oakTexture(repeatX = 4, repeatY = 1): THREE.Texture {
  const key = `oak:${repeatX}:${repeatY}`;
  const cached = cache.get(key);
  if (cached) return cached;

  const base = draw("oak-base", 256, 256, (ctx) => {
    ctx.fillStyle = "#6b4a2f";
    ctx.fillRect(0, 0, 256, 256);
    for (let i = 0; i < 160; i += 1) {
      const y = Math.random() * 256;
      ctx.strokeStyle = `rgba(${40 + Math.random() * 40}, ${25 + Math.random() * 25}, 15, 0.35)`;
      ctx.lineWidth = 0.6 + Math.random() * 1.8;
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.bezierCurveTo(80, y + (Math.random() - 0.5) * 10, 170, y + (Math.random() - 0.5) * 10, 256, y);
      ctx.stroke();
    }
  });

  const clone = base.clone();
  clone.needsUpdate = true;
  clone.wrapS = THREE.RepeatWrapping;
  clone.wrapT = THREE.RepeatWrapping;
  clone.colorSpace = THREE.SRGBColorSpace;
  clone.repeat.set(repeatX, repeatY);
  cache.set(key, clone);
  return clone;
}

/** Gáy sách xếp kín một khoang kệ. */
export function bookshelfTexture(): THREE.Texture {
  const t = draw("books", 256, 256, (ctx) => {
    ctx.fillStyle = "#2a1c11";
    ctx.fillRect(0, 0, 256, 256);
    const shelves = 4;
    const shelfH = 256 / shelves;
    const spines = ["#7f1d1d", "#14532d", "#1e3a5f", "#78350f", "#3b0764", "#134e4a", "#7c2d12"];
    for (let s = 0; s < shelves; s += 1) {
      let x = 2;
      while (x < 252) {
        const w = 5 + Math.random() * 9;
        const h = shelfH - 10 - Math.random() * 8;
        ctx.fillStyle = spines[Math.floor(Math.random() * spines.length)];
        ctx.fillRect(x, s * shelfH + (shelfH - h) - 4, w, h);
        // vạch nhũ trên gáy
        if (Math.random() > 0.55) {
          ctx.fillStyle = "rgba(214,180,105,0.75)";
          ctx.fillRect(x + 1, s * shelfH + (shelfH - h) + 6, w - 2, 1.5);
        }
        x += w + 1.5;
      }
      // ván kệ
      ctx.fillStyle = "#4a3220";
      ctx.fillRect(0, (s + 1) * shelfH - 4, 256, 4);
    }
  });
  t.repeat.set(1, 1);
  return t;
}

/** Trần chạm ô (coffered ceiling) với ô sơn hình mây - đặc trưng dễ nhận nhất
 *  của phòng đọc Rose. */
export function cofferedCeilingTexture(): THREE.Texture {
  const t = draw("ceiling", 512, 512, (ctx) => {
    ctx.fillStyle = "#8a6a45";
    ctx.fillRect(0, 0, 512, 512);
    const cells = 2;
    const size = 512 / cells;
    for (let y = 0; y < cells; y += 1) {
      for (let x = 0; x < cells; x += 1) {
        const px = x * size;
        const py = y * size;
        // khung chạm
        ctx.fillStyle = "#6d5335";
        ctx.fillRect(px + 6, py + 6, size - 12, size - 12);
        ctx.fillStyle = "#a5825a";
        ctx.fillRect(px + 14, py + 14, size - 28, size - 28);
        // ô sơn trời mây
        const g = ctx.createLinearGradient(px, py + 24, px, py + size - 24);
        g.addColorStop(0, "#9db8d4");
        g.addColorStop(1, "#e6d7bf");
        ctx.fillStyle = g;
        ctx.fillRect(px + 26, py + 26, size - 52, size - 52);
        ctx.fillStyle = "rgba(255,255,255,0.72)";
        for (let i = 0; i < 5; i += 1) {
          const cx = px + 50 + Math.random() * (size - 100);
          const cy = py + 50 + Math.random() * (size - 100);
          const r = 10 + Math.random() * 22;
          ctx.beginPath();
          ctx.ellipse(cx, cy, r, r * 0.55, 0, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    }
  });
  t.repeat.set(4, 7);
  return t;
}

export interface NameplateStatus {
  streak: number;
  level: number;
  doneToday: boolean;
}

/** Biển tên nổi trên đầu nhân vật, kèm dòng trạng thái học. Không cache theo
 *  tên: mỗi người một tấm, và số người trong sảnh đủ nhỏ để không đáng lo.
 *
 *  Trạng thái nằm NGAY TRÊN ĐẦU chứ không giấu trong menu nào: cả điểm của
 *  việc hiển thị nó là người đi ngang qua đọc được mà không phải bấm gì. */
export function nameplateTexture(name: string, status?: NameplateStatus): THREE.Texture {
  const W = 512;
  const H = status ? 190 : 128;
  const canvas = document.createElement("canvas");
  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Không lấy được canvas 2D context để dựng biển tên");

  const label = name.length > 22 ? `${name.slice(0, 21)}…` : name;
  ctx.font = "600 52px ui-sans-serif, system-ui, -apple-system, sans-serif";
  const nameW = ctx.measureText(label).width;

  // Dòng trạng thái: chuỗi ngày là thứ đáng nhìn nhất nên đứng đầu, dấu tick
  // hôm nay đứng cuối vì nó là trạng thái nhị phân, đọc lướt vẫn thấy.
  const bits: string[] = [];
  if (status) {
    if (status.streak > 0) bits.push(`🔥 ${status.streak}`);
    bits.push(`Lv.${status.level}`);
    bits.push(status.doneToday ? "✓ hôm nay" : "· chưa học");
  }
  const statusText = bits.join("   ");
  ctx.font = "500 34px ui-sans-serif, system-ui, -apple-system, sans-serif";
  const statusW = status ? ctx.measureText(statusText).width : 0;

  const w = Math.min(W - 20, Math.max(nameW, statusW) + 48);
  const x = (W - w) / 2;

  ctx.fillStyle = "rgba(28,25,23,0.82)";
  ctx.beginPath();
  ctx.roundRect(x, 14, w, H - 28, 34);
  ctx.fill();

  ctx.fillStyle = "#fdf6e3";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.font = "600 52px ui-sans-serif, system-ui, -apple-system, sans-serif";
  ctx.fillText(label, W / 2, status ? 62 : H / 2);

  if (status) {
    ctx.font = "500 34px ui-sans-serif, system-ui, -apple-system, sans-serif";
    ctx.fillStyle = status.doneToday ? "#86efac" : "#d6d3d1";
    ctx.fillText(statusText, W / 2, 132);
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = 4;
  return texture;
}

/** Mặt đồng hồ Pomodoro treo trên bàn: thời gian còn lại + số người đang ngồi.
 *  Vẽ lại mỗi giây nên giữ canvas nhỏ và không cache. */
export function pomodoroTexture(
  msLeft: number,
  seatedCount: number,
  labels: { done: string; studying: string }
): THREE.Texture {
  const W = 320;
  const H = 160;
  const canvas = document.createElement("canvas");
  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Không lấy được canvas 2D context để dựng đồng hồ");

  const done = msLeft <= 0;
  const total = Math.max(0, msLeft);
  const mm = String(Math.floor(total / 60000)).padStart(2, "0");
  const ss = String(Math.floor((total % 60000) / 1000)).padStart(2, "0");

  ctx.fillStyle = "rgba(20,18,15,0.9)";
  ctx.beginPath();
  ctx.roundRect(0, 0, W, H, 26);
  ctx.fill();
  ctx.strokeStyle = done ? "#86efac" : "#e5b567";
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.roundRect(3, 3, W - 6, H - 6, 24);
  ctx.stroke();

  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  if (done) {
    ctx.fillStyle = "#86efac";
    ctx.font = "700 46px ui-sans-serif, system-ui, sans-serif";
    ctx.fillText(labels.done, W / 2, 62);
  } else {
    ctx.fillStyle = "#f5efe0";
    ctx.font = "700 64px ui-monospace, SFMono-Regular, monospace";
    ctx.fillText(`${mm}:${ss}`, W / 2, 60);
  }

  ctx.fillStyle = "#a8a29e";
  ctx.font = "500 26px ui-sans-serif, system-ui, sans-serif";
  ctx.fillText(
    labels.studying,
    W / 2,
    118
  );

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = 4;
  return texture;
}

/** Bong bóng thoại: nền trắng bo tròn, đuôi nhọn chỉ xuống đầu nhân vật, chữ
 *  tự xuống dòng. Trả về cả tỷ lệ khung để phía gọi đặt plane cho khỏi méo. */
export function speechBubbleTexture(text: string): { texture: THREE.Texture; aspect: number } {
  const W = 512;
  const PAD = 26;
  const FONT = "500 34px ui-sans-serif, system-ui, -apple-system, sans-serif";

  // Đo trước để biết cần bao nhiêu dòng, rồi mới dựng canvas đúng chiều cao -
  // canvas cố định sẽ hoặc cắt chữ dài, hoặc chừa khoảng trống với chữ ngắn.
  const measure = document.createElement("canvas").getContext("2d");
  if (!measure) throw new Error("Không lấy được canvas 2D context để dựng bong bóng thoại");
  measure.font = FONT;

  const maxTextW = W - PAD * 2;
  const lines: string[] = [];
  let line = "";
  for (const word of text.split(/\s+/)) {
    const candidate = line ? `${line} ${word}` : word;
    if (measure.measureText(candidate).width > maxTextW && line) {
      lines.push(line);
      line = word;
    } else {
      line = candidate;
    }
  }
  if (line) lines.push(line);

  const lineH = 44;
  const tail = 22;
  const H = PAD * 2 + lines.length * lineH + tail;

  const canvas = document.createElement("canvas");
  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Không lấy được canvas 2D context để dựng bong bóng thoại");

  const bodyH = H - tail;
  ctx.fillStyle = "rgba(253,246,227,0.96)";
  ctx.beginPath();
  ctx.roundRect(4, 0, W - 8, bodyH, 28);
  ctx.fill();
  // đuôi bong bóng
  ctx.beginPath();
  ctx.moveTo(W / 2 - 18, bodyH - 2);
  ctx.lineTo(W / 2, H);
  ctx.lineTo(W / 2 + 18, bodyH - 2);
  ctx.closePath();
  ctx.fill();

  ctx.fillStyle = "#1c1917";
  ctx.font = FONT;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  lines.forEach((l, i) => {
    ctx.fillText(l, W / 2, PAD + lineH / 2 + i * lineH);
  });

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = 4;
  return { texture, aspect: W / H };
}

/** Bảng gỗ chữ trắng dùng cho bảng tin và bảng xếp hạng treo tường. */
export function boardTexture(
  title: string,
  rows: string[],
  // `emptyText` BẮT BUỘC, không có giá trị mặc định. Chữ vẽ lên canvas không đi
  // qua từ điển được vì module này không phải React - nên nó phải nhận chữ từ
  // caller. Để mặc định tiếng Việt là giữ nguyên lỗi ở một chỗ khó thấy hơn;
  // bắt buộc thì tsc ép cả ba caller truyền vào.
  opts: { width?: number; height?: number; accent?: string; emptyText: string }
): THREE.Texture {
  const W = opts.width ?? 768;
  const H = opts.height ?? 512;
  const canvas = document.createElement("canvas");
  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Không lấy được canvas 2D context để dựng bảng");

  ctx.fillStyle = "#2c1f14";
  ctx.fillRect(0, 0, W, H);
  ctx.strokeStyle = opts.accent ?? "#c9a227";
  ctx.lineWidth = 8;
  ctx.strokeRect(14, 14, W - 28, H - 28);

  ctx.fillStyle = opts.accent ?? "#c9a227";
  ctx.font = "700 40px ui-serif, Georgia, serif";
  ctx.textAlign = "center";
  ctx.textBaseline = "top";
  ctx.fillText(title, W / 2, 44);

  ctx.strokeStyle = "rgba(201,162,39,0.45)";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(60, 104);
  ctx.lineTo(W - 60, 104);
  ctx.stroke();

  ctx.fillStyle = "#f5efe0";
  ctx.font = "400 27px ui-sans-serif, system-ui, sans-serif";
  ctx.textAlign = "left";
  const maxRows = Math.floor((H - 150) / 44);
  const shown = rows.slice(0, maxRows);
  if (shown.length === 0) {
    ctx.fillStyle = "rgba(245,239,224,0.5)";
    ctx.textAlign = "center";
    ctx.fillText(opts.emptyText, W / 2, H / 2 - 12);
  } else {
    shown.forEach((row, i) => {
      const y = 132 + i * 44;
      let line = row;
      // Cắt theo bề rộng thật chứ không theo số ký tự: tên tiếng Việt có dấu
      // và tên tiếng Anh rộng khác nhau nhiều.
      while (ctx.measureText(line).width > W - 120 && line.length > 4) {
        line = `${line.slice(0, -2)}…`;
      }
      ctx.fillText(line, 60, y);
    });
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = 4;
  return texture;
}

/** Quả địa cầu đồng: nền biển sẫm, mảng lục địa vàng đồng, lưới kinh vĩ tuyến.
 *  Không cần đúng bản đồ - chỉ cần đọc ra "quả địa cầu" từ khoảng cách vài mét. */
export function globeTexture(): THREE.Texture {
  const t = draw("globe", 1024, 512, (ctx) => {
    ctx.fillStyle = "#123243";
    ctx.fillRect(0, 0, 1024, 512);

    // Lục địa vẽ bằng các vệt ellipse chồng nhau - hình dạng gợi ý, không phải
    // bản đồ thật, nhưng đủ để mắt nhận ra đất liền trên nền biển.
    ctx.fillStyle = "#b08d4f";
    const blobs: Array<[number, number, number, number]> = [
      [190, 150, 70, 55], [165, 235, 45, 70],   // châu Mỹ
      [470, 140, 55, 42], [500, 240, 70, 80],   // Âu - Phi
      [700, 160, 120, 70], [790, 300, 55, 35],  // Á - Úc
      [520, 60, 300, 28],                        // vành bắc
    ];
    for (const [x, y, rx, ry] of blobs) {
      ctx.beginPath();
      ctx.ellipse(x, y, rx, ry, 0, 0, Math.PI * 2);
      ctx.fill();
    }

    // Lưới kinh vĩ tuyến
    ctx.strokeStyle = "rgba(226,213,180,0.28)";
    ctx.lineWidth = 1.5;
    for (let i = 1; i < 8; i += 1) {
      ctx.beginPath();
      ctx.moveTo((1024 / 8) * i, 0);
      ctx.lineTo((1024 / 8) * i, 512);
      ctx.stroke();
    }
    for (let i = 1; i < 5; i += 1) {
      ctx.beginPath();
      ctx.moveTo(0, (512 / 5) * i);
      ctx.lineTo(1024, (512 / 5) * i);
      ctx.stroke();
    }
    // Xích đạo đậm hơn
    ctx.strokeStyle = "rgba(226,213,180,0.6)";
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(0, 256);
    ctx.lineTo(1024, 256);
    ctx.stroke();
  });
  t.repeat.set(1, 1);
  return t;
}

/** Mặt đồng hồ lớn treo tường đầu bắc. Kim đứng yên ở một giờ cố định: đồng hồ
 *  chạy thật sẽ kéo mắt khỏi đồng hồ Pomodoro trên bàn, mà cái đó mới là thứ
 *  cần được nhìn. */
export function wallClockTexture(): THREE.Texture {
  const t = draw("wallclock", 512, 512, (ctx) => {
    ctx.fillStyle = "#f3ead6";
    ctx.beginPath();
    ctx.arc(256, 256, 240, 0, Math.PI * 2);
    ctx.fill();

    ctx.strokeStyle = "#3d2c1a";
    ctx.lineWidth = 14;
    ctx.beginPath();
    ctx.arc(256, 256, 236, 0, Math.PI * 2);
    ctx.stroke();

    // Vạch giờ - số La Mã thì đẹp nhưng ở khoảng cách này chỉ còn là vệt mờ.
    ctx.strokeStyle = "#3d2c1a";
    for (let i = 0; i < 12; i += 1) {
      const a = (i / 12) * Math.PI * 2;
      const long = i % 3 === 0;
      ctx.lineWidth = long ? 10 : 5;
      ctx.beginPath();
      ctx.moveTo(256 + Math.cos(a) * (long ? 186 : 198), 256 + Math.sin(a) * (long ? 186 : 198));
      ctx.lineTo(256 + Math.cos(a) * 216, 256 + Math.sin(a) * 216);
      ctx.stroke();
    }

    // 10:10 - tư thế kim kinh điển của mọi ảnh quảng cáo đồng hồ, vì nó cân.
    const hand = (angle: number, len: number, width: number) => {
      ctx.strokeStyle = "#2a1c11";
      ctx.lineWidth = width;
      ctx.lineCap = "round";
      ctx.beginPath();
      ctx.moveTo(256, 256);
      ctx.lineTo(256 + Math.cos(angle) * len, 256 + Math.sin(angle) * len);
      ctx.stroke();
    };
    hand(-Math.PI / 2 - Math.PI / 3, 110, 16); // giờ ~10
    hand(-Math.PI / 2 + Math.PI / 3, 160, 11); // phút ~10

    ctx.fillStyle = "#3d2c1a";
    ctx.beginPath();
    ctx.arc(256, 256, 14, 0, Math.PI * 2);
    ctx.fill();
  });
  t.repeat.set(1, 1);
  return t;
}

/** Thảm dệt trải dưới các hàng bàn - mảng màu ấm phá bớt mặt đá mênh mông. */
export function rugTexture(): THREE.Texture {
  const t = draw("rug", 512, 256, (ctx) => {
    ctx.fillStyle = "#6d2230";
    ctx.fillRect(0, 0, 512, 256);
    ctx.strokeStyle = "#c9a227";
    ctx.lineWidth = 6;
    ctx.strokeRect(18, 18, 512 - 36, 256 - 36);
    ctx.lineWidth = 2;
    ctx.strokeRect(34, 34, 512 - 68, 256 - 68);
    // Hoa văn trám lặp lại
    ctx.strokeStyle = "rgba(201,162,39,0.55)";
    ctx.lineWidth = 2.5;
    for (let x = 70; x < 460; x += 52) {
      ctx.beginPath();
      ctx.moveTo(x, 128 - 26);
      ctx.lineTo(x + 26, 128);
      ctx.lineTo(x, 128 + 26);
      ctx.lineTo(x - 26, 128);
      ctx.closePath();
      ctx.stroke();
    }
  });
  t.repeat.set(1, 1);
  return t;
}

/** Cờ đỏ sao vàng.
 *
 *  Tỷ lệ 3:2, đường kính ngôi sao bằng 3/5 chiều cao lá cờ. Sao vẽ bằng mười
 *  đỉnh xen kẽ ngoài-trong, bán kính trong bằng bán kính ngoài chia cho tỷ lệ
 *  vàng bình phương (2,618) - đó là ngôi sao năm cánh đều; các tỷ lệ khác cho
 *  ra ngôi sao mập hoặc gầy hơn cờ thật một cách dễ nhận ra. */
export function vietnamFlagTexture(): THREE.Texture {
  const t = draw("vn-flag", 480, 320, (ctx) => {
    ctx.fillStyle = "#da251d";
    ctx.fillRect(0, 0, 480, 320);

    const cx = 240;
    const cy = 160;
    const outer = (320 * 3) / 10;
    const inner = outer / 2.618;
    ctx.fillStyle = "#ffff00";
    ctx.beginPath();
    for (let i = 0; i < 10; i += 1) {
      const r = i % 2 === 0 ? outer : inner;
      // Bắt đầu từ đỉnh trên cùng: -90 độ.
      const a = -Math.PI / 2 + (i * Math.PI) / 5;
      const px = cx + Math.cos(a) * r;
      const py = cy + Math.sin(a) * r;
      if (i === 0) ctx.moveTo(px, py);
      else ctx.lineTo(px, py);
    }
    ctx.closePath();
    ctx.fill();
  });
  // Lá cờ là một mảnh vải, không lặp - lặp lại sẽ ra hai ngôi sao.
  t.wrapS = THREE.ClampToEdgeWrapping;
  t.wrapT = THREE.ClampToEdgeWrapping;
  t.repeat.set(1, 1);
  return t;
}

/** Mặt đường nhựa với vạch kẻ liền hai mép và vạch đứt giữa. */
export function asphaltTexture(): THREE.Texture {
  const t = draw("asphalt", 256, 512, (ctx) => {
    ctx.fillStyle = "#3a3a3c";
    ctx.fillRect(0, 0, 256, 512);
    // Hạt nhựa đường: chấm nhiễu nhạt cho mặt đường không phẳng lì.
    for (let i = 0; i < 900; i += 1) {
      ctx.fillStyle = `rgba(255,255,255,${0.02 + Math.random() * 0.05})`;
      ctx.fillRect(Math.random() * 256, Math.random() * 512, 2, 2);
    }
    ctx.fillStyle = "#d8d4c4";
    ctx.fillRect(10, 0, 5, 512);
    ctx.fillRect(241, 0, 5, 512);
    // Vạch đứt phân làn chạy dọc.
    ctx.fillStyle = "#e8e2cd";
    for (let y = 0; y < 512; y += 96) ctx.fillRect(125, y, 6, 54);
  });
  t.repeat.set(1, 12);
  return t;
}

/** Mặt tiền nhà phố Sài Gòn: nhà ống nhiều tầng, cửa sổ sáng đèn, ban công.
 *  Một vân dùng chung cho cả dãy - mỗi toà lấy một đoạn offset khác nhau nên
 *  mắt không bắt được chỗ lặp. */
export function cityFacadeTexture(): THREE.Texture {
  const t = draw("facade", 256, 512, (ctx) => {
    ctx.fillStyle = "#cfc6b4";
    ctx.fillRect(0, 0, 256, 512);
    const rows = 8;
    for (let r = 0; r < rows; r += 1) {
      const y = 512 - (r + 1) * (512 / rows);
      // Sàn từng tầng
      ctx.fillStyle = "#b3a894";
      ctx.fillRect(0, y + 512 / rows - 7, 256, 7);
      for (let c = 0; c < 3; c += 1) {
        const lit = Math.random() > 0.42;
        ctx.fillStyle = lit ? "#ffd98a" : "#4e5a63";
        ctx.fillRect(24 + c * 76, y + 14, 48, 40);
        ctx.strokeStyle = "#8d8371";
        ctx.lineWidth = 3;
        ctx.strokeRect(24 + c * 76, y + 14, 48, 40);
      }
    }
    // Tầng trệt: mặt bằng kinh doanh, bảng hiệu chạy ngang.
    ctx.fillStyle = "#2a2622";
    ctx.fillRect(0, 512 - 512 / rows, 256, 512 / rows);
    ctx.fillStyle = "#e0603a";
    ctx.fillRect(0, 512 - 512 / rows, 256, 16);
  });
  t.repeat.set(1, 1);
  return t;
}

/** Vòm trời. Dải màu dọc từ đỉnh xuống chân trời, ba màu do daylight.ts quyết
 *  định theo giờ thật.
 *
 *  Khoá cache gồm cả ba màu: giờ đổi thì đây là một vân khác hẳn, và dùng lại
 *  vân cũ sẽ để bầu trời đứng nguyên màu lúc 6h sáng suốt cả ngày. Số vân sinh
 *  ra có hạn vì phía gọi chỉ lấy mẫu vài phút một lần. */
export function skyTexture(top: string, mid: string, horizon: string): THREE.Texture {
  const t = draw(`sky:${top}:${mid}:${horizon}`, 16, 256, (ctx) => {
    const g = ctx.createLinearGradient(0, 0, 0, 256);
    g.addColorStop(0, top);
    g.addColorStop(0.55, mid);
    g.addColorStop(1, horizon);
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, 16, 256);
  });
  t.wrapS = THREE.ClampToEdgeWrapping;
  t.wrapT = THREE.ClampToEdgeWrapping;
  t.repeat.set(1, 1);
  return t;
}

/** Biển đá khắc công thức phía trên mỗi cửa phòng học.
 *
 *  Công thức được vẽ TO nhất trong ba dòng, hơn cả tên phòng. Người đi ngang
 *  liếc một cái sẽ chỉ đọc kịp một dòng, và `WACC = ...` nói cho họ biết phòng
 *  này dạy gì rõ hơn chữ "Phòng CFA".
 *
 *  Co chữ theo bề rộng thay vì xuống dòng: công thức xuống dòng giữa chừng đọc
 *  ra thành hai phép tính khác nhau. */
export function formulaPlaqueTexture(
  room: string,
  formula: string,
  note: string,
  accent: string
): THREE.Texture {
  const W = 768;
  const H = 288;
  return draw(`plaque:${room}`, W, H, (ctx) => {
    ctx.fillStyle = "#1b1713";
    ctx.beginPath();
    ctx.roundRect(4, 4, W - 8, H - 8, 22);
    ctx.fill();
    ctx.strokeStyle = accent;
    ctx.lineWidth = 4;
    ctx.stroke();

    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    ctx.fillStyle = accent;
    ctx.font = "600 34px ui-sans-serif, system-ui, sans-serif";
    ctx.fillText(room.toUpperCase(), W / 2, 52);

    let size = 60;
    ctx.font = `600 ${size}px ui-monospace, "SF Mono", Menlo, monospace`;
    while (ctx.measureText(formula).width > W - 64 && size > 22) {
      size -= 2;
      ctx.font = `600 ${size}px ui-monospace, "SF Mono", Menlo, monospace`;
    }
    ctx.fillStyle = "#fdf6e3";
    ctx.fillText(formula, W / 2, 144);

    ctx.fillStyle = "rgba(231,222,203,0.68)";
    ctx.font = "400 27px ui-sans-serif, system-ui, sans-serif";
    let line = note;
    while (ctx.measureText(line).width > W - 56 && line.length > 8) {
      line = `${line.slice(0, -4)}…`;
    }
    ctx.fillText(line, W / 2, 228);
  });
}

/** Giải phóng toàn bộ texture đã dựng. Gọi khi rời phòng - CanvasTexture giữ
 *  bộ nhớ GPU cho tới khi dispose, và người dùng có thể vào ra nhiều lần. */
export function disposeRoomTextures() {
  for (const texture of cache.values()) texture.dispose();
  cache.clear();
}
