/** Nền chung cho mọi không gian 3D đi lại được: vật cản và cách đẩy ra khỏi
 *  chúng.
 *
 *  Trước đây mỗi căn phòng tự chép lại hàm giải va chạm của mình - thư viện một
 *  bản, phòng nhóm một bản. Hai bản ấy đã lệch nhau ngay từ đầu (bản thư viện
 *  mang thêm khái niệm tầng lửng), và mỗi lần sửa một lỗi va chạm là một lần
 *  phải nhớ sửa ở cả hai nơi. Thuật toán về đây; DANH SÁCH đồ đạc thì vẫn ở
 *  từng phòng, vì đó mới là thứ riêng của mỗi phòng. */

export interface BoxObstacle {
  kind: "box";
  x: number;
  z: number;
  halfW: number;
  halfD: number;
}

export interface CircleObstacle {
  kind: "circle";
  x: number;
  z: number;
  radius: number;
}

export type Obstacle = BoxObstacle | CircleObstacle;

/** Bán kính thân người mặc định khi va chạm. */
export const BODY_RADIUS = 0.34;

/** Đẩy nhân vật ra khỏi vật cản đầu tiên mà nó lọt vào.
 *
 *  Hộp: giải theo trục chồng lấn NÔNG hơn - đó là hướng vừa đi vào, nên đẩy
 *  ngược lại cho cảm giác trượt dọc mép bàn thay vì bị bắn ngang qua nó.
 *  Tròn: đẩy thẳng ra theo bán kính.
 *
 *  Chỉ giải MỘT vật cản mỗi lần gọi. Giải hết trong một vòng lặp nghe hợp lý
 *  hơn nhưng sinh kẹt góc: hai vật cản cạnh nhau đẩy qua đẩy lại và nhân vật
 *  đứng im. Cái giá của lựa chọn này là hai món kê quá sát sẽ hất người học từ
 *  món này vào lòng món kia - nên `obstaclesTouch` ở dưới tồn tại, và mỗi
 *  phòng có một test dùng nó. */
export function resolveObstacles(
  obstacles: readonly Obstacle[],
  x: number,
  z: number,
  bodyRadius = BODY_RADIUS
): { x: number; z: number } {
  for (const o of obstacles) {
    if (o.kind === "box") {
      const dx = x - o.x;
      const dz = z - o.z;
      const overlapX = o.halfW + bodyRadius - Math.abs(dx);
      const overlapZ = o.halfD + bodyRadius - Math.abs(dz);
      if (overlapX > 0 && overlapZ > 0) {
        if (overlapZ < overlapX) {
          return { x, z: o.z + Math.sign(dz || 1) * (o.halfD + bodyRadius) };
        }
        return { x: o.x + Math.sign(dx || 1) * (o.halfW + bodyRadius), z };
      }
    } else {
      const dx = x - o.x;
      const dz = z - o.z;
      const dist = Math.hypot(dx, dz);
      const minDist = o.radius + bodyRadius;
      if (dist < minDist) {
        // Đứng đúng tâm thì không có hướng nào để đẩy; chọn một hướng bất kỳ
        // thay vì chia cho 0.
        const nx = dist > 1e-4 ? dx / dist : 1;
        const nz = dist > 1e-4 ? dz / dist : 0;
        return { x: o.x + nx * minDist, z: o.z + nz * minDist };
      }
    }
  }
  return { x, z };
}

/** Điểm này có nằm trong vùng chặn của vật cản nào không. */
export function insideAnyObstacle(
  obstacles: readonly Obstacle[],
  x: number,
  z: number,
  bodyRadius = BODY_RADIUS
): boolean {
  return obstacles.some((o) =>
    o.kind === "box"
      ? Math.abs(x - o.x) < o.halfW + bodyRadius - 1e-6 && Math.abs(z - o.z) < o.halfD + bodyRadius - 1e-6
      : Math.hypot(x - o.x, z - o.z) < o.radius + bodyRadius - 1e-6
  );
}

/** Hai vùng chặn có chạm nhau không.
 *
 *  Chạm nhau là lỗi bố trí, không phải chuyện thẩm mỹ: vì mỗi lần gọi chỉ giải
 *  một vật cản, bị đẩy ra khỏi món này sẽ rơi thẳng vào lòng món kia và người
 *  học kẹt cứng giữa hai món đồ. Rẻ hơn nhiều nếu bắt bằng test lúc kê đồ. */
export function obstaclesTouch(a: Obstacle, b: Obstacle, bodyRadius = BODY_RADIUS): boolean {
  if (a.kind === "box" && b.kind === "box") {
    return (
      Math.abs(a.x - b.x) < a.halfW + b.halfW + 2 * bodyRadius &&
      Math.abs(a.z - b.z) < a.halfD + b.halfD + 2 * bodyRadius
    );
  }
  if (a.kind === "circle" && b.kind === "circle") {
    return Math.hypot(a.x - b.x, a.z - b.z) < a.radius + b.radius + 2 * bodyRadius;
  }
  const box = (a.kind === "box" ? a : b) as BoxObstacle;
  const circle = (a.kind === "circle" ? a : b) as CircleObstacle;
  const dx = Math.max(0, Math.abs(circle.x - box.x) - (box.halfW + bodyRadius));
  const dz = Math.max(0, Math.abs(circle.z - box.z) - (box.halfD + bodyRadius));
  return Math.hypot(dx, dz) < circle.radius + bodyRadius;
}

/** Mọi cặp vật cản đang chạm nhau, mô tả sẵn để in ra trong lỗi test. */
export function touchingPairs(obstacles: readonly Obstacle[], bodyRadius = BODY_RADIUS): string[] {
  const out: string[] = [];
  for (let i = 0; i < obstacles.length; i += 1) {
    for (let j = i + 1; j < obstacles.length; j += 1) {
      if (obstaclesTouch(obstacles[i], obstacles[j], bodyRadius)) {
        const a = obstacles[i];
        const b = obstacles[j];
        out.push(`#${i} (${a.kind} tại ${a.x},${a.z}) ↔ #${j} (${b.kind} tại ${b.x},${b.z})`);
      }
    }
  }
  return out;
}
