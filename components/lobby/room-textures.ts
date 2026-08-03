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

/** Biển tên nổi trên đầu nhân vật. Không cache theo tên: mỗi người một tấm,
 *  và số người trong sảnh đủ nhỏ để không đáng lo. */
export function nameplateTexture(name: string): THREE.Texture {
  const canvas = document.createElement("canvas");
  canvas.width = 512;
  canvas.height = 128;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Không lấy được canvas 2D context để dựng biển tên");

  const label = name.length > 22 ? `${name.slice(0, 21)}…` : name;
  ctx.font = "600 52px ui-sans-serif, system-ui, -apple-system, sans-serif";
  const w = Math.min(492, ctx.measureText(label).width + 48);
  const x = (512 - w) / 2;

  ctx.fillStyle = "rgba(28,25,23,0.82)";
  ctx.beginPath();
  ctx.roundRect(x, 26, w, 76, 38);
  ctx.fill();

  ctx.fillStyle = "#fdf6e3";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.font = "600 52px ui-sans-serif, system-ui, -apple-system, sans-serif";
  ctx.fillText(label, 256, 66);

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = 4;
  return texture;
}

/** Giải phóng toàn bộ texture đã dựng. Gọi khi rời phòng - CanvasTexture giữ
 *  bộ nhớ GPU cho tới khi dispose, và người dùng có thể vào ra nhiều lần. */
export function disposeRoomTextures() {
  for (const texture of cache.values()) texture.dispose();
  cache.clear();
}
