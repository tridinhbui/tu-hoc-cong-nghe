import type { ForestTree } from "./quiet-flame-scene";
import type { Dictionary } from "./i18n/dictionaries/vi";

/** Khoảng rừng đi lại được quanh đống lửa, và ba tấm biển gỗ dựng trong đó.
 *
 *  Trước đây cảnh này không có ai trong đó: người xem kéo để nhìn nghiêng một
 *  bức tranh động, và mọi hướng dẫn - nhịp thở, đặt xuống gánh nặng - nằm ở
 *  các khối HTML BÊN DƯỚI khung. Nghĩa là thứ trang này thật sự mời người ta
 *  làm thì nằm ngoài cái thế giới mà nó dựng lên, còn thế giới thì chỉ để
 *  ngắm.
 *
 *  Có nhân vật đi lại được thì hai thứ đó nhập làm một: hướng dẫn khắc lên
 *  biển, và người đọc phải ĐI TỚI mới đọc được. Quãng đi bộ ngắn ấy là điều
 *  duy nhất trang này xin ở người đọc, và nó cùng nhịp với phần còn lại - chậm,
 *  không tính điểm, không hỏng nếu bỏ dở.
 *
 *  Cấu trúc (toạ độ, góc quay, bán kính) nằm ở đây; chữ hiển thị sống trong
 *  `t.quietForestSigns` - cùng lý do đã tách `components/lobby/stations.ts`,
 *  và cùng lý do scripts/i18n-coverage.mjs không nhìn thấy module dữ liệu.
 */

/** Bán kính đi lại. Nhỏ hơn hẳn vành cây ngoài cùng (~13,8): đi ra tới mép
 *  rừng thì đống lửa chỉ còn là một đốm sáng và cả cảnh mất chỗ dựa. Đây là
 *  một khoảng trống có lửa ở giữa, không phải một bản đồ.
 *
 *  Đặt 8,5 trước, và đi thử thì thấy sai: nguồn sáng của cảnh có `distance`
 *  11-18 và `decay` 1,5, nên từ khoảng 7 trở ra mặt đất tối gần như hoàn toàn
 *  và không còn mốc nào ngoài ba ngọn đèn trên biển. Đứng giữa một khoảng đen
 *  không biết đường về là cảm giác LẠC, và đây là trang có mỗi một việc là hạ
 *  nhịp. 6,5 giữ người đi luôn nhìn thấy đống lửa, và vẫn rộng hơn vòng biển
 *  (xa nhất ~4,4) đủ để đi vòng ra sau chúng. */
export const WALK_RADIUS = 6.5;

/** Không đi xuyên qua vòng đá quanh đống lửa. Rộng hơn vòng đá thật (0,46) để
 *  nhân vật dừng lại TRƯỚC khi trông như đang đứng trong lửa. */
export const FIRE_KEEPOUT = 1.05;

/** Đứng gần hơn khoảng này thì tấm biển đọc được. Rộng tay hơn cửa phòng ở
 *  sảnh thư viện (2,7): ở đây không có gì khác để bấm nhầm, và một người vừa
 *  học cách đi thì không nên phải căn từng bước. */
export const SIGN_REACH = 2.4;

export interface QuietSign {
  id: string;
  x: number;
  z: number;
  /** Góc quay quanh trục đứng, để mặt biển hướng về phía đống lửa. */
  ry: number;
  title: string;
  /** Hai tới ba dòng ngắn. Đây là thứ người đọc dừng lại để đọc, nên nó phải
   *  đọc hết được trong một hơi thở. */
  lines: string[];
  accent: string;
}

interface SignStruct {
  id: string;
  x: number;
  z: number;
  ry: number;
  accent: string;
}

/** Ba biển, đặt lệch nhau quanh đống lửa chứ không thành hàng: đi tới biển này
 *  thì biển kia lọt vào tầm mắt ở một hướng khác, nên không cần một tấm bản đồ
 *  nào nói rằng còn nữa.
 *
 *  Tránh hành lang máy quay (z > 0,4 và |x| < 2,4 - xem `forestTrees`): dựng
 *  một tấm biển ngay trước mặt máy quay thì nó che mất đống lửa ở góc nghỉ. */
const SIGN_STRUCT: SignStruct[] = [
  { id: "breath", x: -3.6, z: -1.5, ry: 0.9, accent: "#7ea6cc" },
  { id: "setdown", x: 3.9, z: 1.2, ry: -1.15, accent: "#fb923c" },
  { id: "stay", x: -1.2, z: 4.2, ry: 2.9, accent: "#86efac" },
];

const SIGN_COPY_KEY: Record<string, keyof Dictionary["quietForestSigns"]> = {
  breath: "breath",
  setdown: "setDown",
  stay: "stay",
};

/** Chỉ id và toạ độ - cho những chỗ cần hình học mà không cần chữ. */
export const SIGN_POSITIONS = SIGN_STRUCT.map((s) => ({ id: s.id, x: s.x, z: s.z }));

const signsCache = new WeakMap<Dictionary, QuietSign[]>();

export function signsOf(t: Dictionary): QuietSign[] {
  const cached = signsCache.get(t);
  if (cached) return cached;
  const copy = t.quietForestSigns;
  const signs = SIGN_STRUCT.map((s): QuietSign => {
    const c = copy[SIGN_COPY_KEY[s.id]];
    return { ...s, title: c.title, lines: c.lines };
  });
  signsCache.set(t, signs);
  return signs;
}

/** Tấm biển gần nhất trong tầm đọc, hoặc null. */
export function nearestSign(signs: QuietSign[], x: number, z: number): QuietSign | null {
  let best: QuietSign | null = null;
  let bestD = SIGN_REACH;
  for (const s of signs) {
    const d = Math.hypot(x - s.x, z - s.z);
    if (d < bestD) {
      bestD = d;
      best = s;
    }
  }
  return best;
}

/** Đẩy một điểm ra khỏi một vật tròn. Trả lại chính nó nếu đã ở ngoài.
 *
 *  Đẩy theo phương xuyên tâm chứ không chặn hẳn bước đi: chặn thì nhân vật
 *  dính cứng vào thân cây và người dùng phải lùi ra rồi vòng lại. Đẩy ra thì
 *  họ trượt vòng quanh gốc cây, đúng thứ xảy ra ngoài đời. */
function pushOut(x: number, z: number, cx: number, cz: number, r: number) {
  const dx = x - cx;
  const dz = z - cz;
  const d = Math.hypot(dx, dz);
  if (d >= r) return { x, z };
  // Đúng tâm thì không có phương nào để đẩy; chọn một phương cố định thay vì
  // chia cho 0.
  if (d < 1e-4) return { x: cx + r, z: cz };
  return { x: cx + (dx / d) * r, z: cz + (dz / d) * r };
}

/** Giải một bước đi: trong vành rừng, ngoài đống lửa, không xuyên thân cây.
 *
 *  Tán cây thì đi dưới được - `SHELTER_RADIUS` là vùng KHÔNG MƯA, không phải
 *  vật cản. Nhầm hai thứ đó sẽ khoá luôn chỗ duy nhất trong cảnh mà đứng đó
 *  không bị ướt, tức là chỗ hợp lý nhất để dừng lại. */
export function resolveQuietWalk(
  x: number,
  z: number,
  trees: ReadonlyArray<ForestTree>
): { x: number; z: number } {
  let p = pushOut(x, z, 0, 0, FIRE_KEEPOUT);

  for (const tree of trees) {
    // Bán kính thân cộng một nửa bề ngang người - dừng lại khi CHẠM vào cây,
    // không phải khi tâm người trùng thân cây.
    p = pushOut(p.x, p.z, tree.x, tree.z, tree.radius + 0.42);
  }

  const d = Math.hypot(p.x, p.z);
  if (d > WALK_RADIUS) {
    p = { x: (p.x / d) * WALK_RADIUS, z: (p.z / d) * WALK_RADIUS };
  }
  return p;
}

/** Cây quá sát một tấm biển thì bỏ đi khi dựng cảnh.
 *
 *  Rừng được sinh ngẫu nhiên (tất định) từ trước khi có biển, nên không có gì
 *  bảo đảm chỗ đặt biển là chỗ trống - và một tấm biển mọc xuyên thân cây
 *  trông như lỗi dựng hình chứ không như một khu rừng. Lọc ở phía cảnh chứ
 *  không sửa `forestTrees`: hàm đó còn phục vụ chỗ khác, và "chỗ nào có cây"
 *  không nên phụ thuộc vào "chỗ nào có biển". */
export function clearsSigns(tree: ForestTree): boolean {
  return SIGN_STRUCT.every((s) => Math.hypot(tree.x - s.x, tree.z - s.z) > 1.5);
}

/** Chỗ nhân vật xuất hiện: hơi lùi về phía máy quay, ngoài vòng lửa, nhìn về
 *  đống lửa. Không đứng sẵn cạnh một tấm biển - đi tới đó là việc của người
 *  đọc, và đó là toàn bộ điểm của việc có nhân vật. */
export const SPAWN = { x: 2.2, z: 4.8, ry: 0.43 };

/** Chỗ xuất hiện phải cách MỌI tấm biển xa hơn tầm đọc, nếu không thì thẻ chữ
 *  bật ra ngay khi cảnh vừa dựng và cả việc đi tới đọc biển mất nghĩa.
 *
 *  Bản đầu đặt ở (0,9 · 3,1) và cách biển "Ở lại" đúng 2,37 - lọt dưới
 *  SIGN_REACH 2,4 chừng bốn centimet, và không cách nào thấy được bằng cách
 *  đọc hai con số ở hai chỗ khác nhau trong file. Test giữ khoảng cách ấy. */
export const SPAWN_SIGN_CLEARANCE = SIGN_REACH + 0.6;

/** Bán kính bảo đảm trống quanh chỗ xuất hiện, để không sinh ra đã dính cây. */
export const SPAWN_CLEAR = 1.2;
