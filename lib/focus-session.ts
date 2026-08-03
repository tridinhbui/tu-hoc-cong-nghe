"use client";

/** Ghi phiên ngồi học của thế giới 3D.
 *
 *  Mỏng có chủ ý: mọi luật (trần thời gian, sàn tính là một phiên, cập nhật
 *  chuỗi ngày) nằm ở /api/focus-session, còn đây chỉ là hai lần fetch. Đặt luật
 *  ở client thì mỗi thế giới sẽ có một bản, và ba bản sẽ lệch nhau. */

export type FocusWorld = "thu-vien" | "nhom-hoc" | "pho-nghe";

export async function startFocusSession(world: FocusWorld, roomKey?: string): Promise<number | null> {
  try {
    const res = await fetch("/api/focus-session", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "start", world, roomKey }),
    });
    if (!res.ok) return null;
    const data = (await res.json()) as { id?: number };
    return data.id ?? null;
  } catch {
    // Ghi phiên hỏng thì phiên học vẫn diễn ra bình thường; chỉ là không đếm
    // được. Không được để nó chặn người ta ngồi xuống.
    return null;
  }
}

export async function finishFocusSession(id: number): Promise<{ seconds: number; counted: boolean }> {
  try {
    const res = await fetch("/api/focus-session", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "finish", id }),
      // Người học hay đứng dậy rồi đóng luôn tab. keepalive để yêu cầu vẫn đi
      // hết dù trang đang bị huỷ - không có nó thì phiên treo mãi ở trạng thái
      // đang mở và chỉ được đóng khống ở lần ngồi sau.
      keepalive: true,
    });
    if (!res.ok) return { seconds: 0, counted: false };
    return (await res.json()) as { seconds: number; counted: boolean };
  } catch {
    return { seconds: 0, counted: false };
  }
}

export async function getTodayFocusSeconds(): Promise<number> {
  try {
    const res = await fetch("/api/focus-session");
    if (!res.ok) return 0;
    const data = (await res.json()) as { todaySeconds?: number };
    return data.todaySeconds ?? 0;
  } catch {
    return 0;
  }
}
