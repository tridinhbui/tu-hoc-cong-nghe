"use client";

import { useEffect, useState } from "react";
import { isValidAvatar } from "@/lib/avatar-utils";

/** Ảnh đại diện, tự rơi về chữ cái đầu khi ảnh KHÔNG TẢI ĐƯỢC.
 *
 *  VÌ SAO CẦN. 19 tệp trong repo cùng viết một mẫu:
 *  `isValidAvatar(url) ? <img src={url}> : <span>{chữ cái đầu}</span>`. Mẫu đó
 *  chỉ kiểm HÌNH DẠNG của chuỗi - chú thích của chính `isValidAvatar` nói nó ra
 *  đời vì cột này từng chứa chuỗi "null", chuỗi rỗng và rác tương tự.
 *
 *  Nhưng một URL đúng hình dạng vẫn có thể chết: nhà cung cấp đăng nhập đổi
 *  đường dẫn ảnh, object bị xoá khỏi storage, mạng chặn, hoặc máy chủ trả 4xx.
 *  Khi đó cả 19 chỗ vẽ ra một biểu tượng ảnh vỡ và đứng đó mãi - không chỗ nào
 *  có `onError`. Chữ cái đầu đã có sẵn ngay bên cạnh, chỉ là không ai gọi tới.
 *
 *  `<img>` chứ không next/image, cùng lý do đã ghi ở CommunityFeedClient: trình
 *  tối ưu ảnh đang trả 402, và một ảnh 28px không đáng đi vòng qua nó.
 *
 *  `key={url}` để lại từ đầu: đổi người trong cùng một ô - danh sách xếp hạng
 *  đổi kỳ, phòng chat đổi người nói - mà không dựng lại trạng thái thì một ảnh
 *  hỏng trước đó sẽ ghim chữ cái đầu lên người mới dù ảnh của họ tải được. */
export default function Avatar({
  name,
  url,
  size,
  className = "",
}: {
  name: string | null | undefined;
  url: string | null | undefined;
  /** Cạnh của ô vuông, tính bằng px. Dùng style chứ không class Tailwind vì
   *  kích thước đến từ chỗ gọi và Tailwind chỉ sinh class nó thấy trong nguồn. */
  size: number;
  className?: string;
}) {
  const [failed, setFailed] = useState(false);

  // Đổi url thì quên lần hỏng trước. Không có dòng này thì một ô tái sử dụng
  // giữ nguyên `failed` sang người kế tiếp.
  useEffect(() => setFailed(false), [url]);

  const initial = (name?.trim()?.[0] ?? "?").toUpperCase();
  const box = { width: size, height: size };

  if (!isValidAvatar(url) || failed) {
    return (
      <span
        style={box}
        aria-hidden="true"
        className={`flex shrink-0 items-center justify-center rounded-full bg-stone-900 font-black text-white dark:bg-stone-100 dark:text-stone-900 ${className}`}
      >
        <span style={{ fontSize: Math.max(10, Math.round(size * 0.4)) }}>{initial}</span>
      </span>
    );
  }

  return (
    <img
      src={url}
      alt=""
      width={size}
      height={size}
      loading="lazy"
      decoding="async"
      onError={() => setFailed(true)}
      style={box}
      className={`shrink-0 rounded-full object-cover ${className}`}
    />
  );
}
