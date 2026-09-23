import { getDb } from "@/lib/d1/server";
import { requestPasswordReset } from "@/lib/auth/service";
import { readJson, authErrorResponse } from "@/lib/auth/http";
import { sendEmail } from "@/lib/send-email";

export async function POST(req: Request) {
  try {
    const { email } = await readJson(req, ["email"] as const);
    const r = await requestPasswordReset(getDb(), email);

    if (r) {
      const base = process.env.NEXT_PUBLIC_SITE_URL || "https://tuhoccongnghe.vn";
      const link = `${base}/auth/reset-password?token=${encodeURIComponent(r.token)}`;
      await sendEmail(
        email,
        "Đặt lại mật khẩu Tự Học Công Nghệ",
        `<p>Bấm vào liên kết dưới đây để đặt mật khẩu mới. Liên kết có hiệu lực trong một giờ.</p>
         <p><a href="${link}">${link}</a></p>
         <p>Nếu bạn không yêu cầu việc này, bỏ qua email là xong - mật khẩu hiện tại không đổi.</p>`
      );
    }

    // LUÔN trả về như nhau, kể cả khi email không có tài khoản. Phân biệt hai
    // trường hợp là biến trang này thành công cụ dò xem một email có đăng ký
    // hay chưa - và không cần đăng nhập vẫn dò được.
    return Response.json({ ok: true });
  } catch (err) {
    return authErrorResponse(err);
  }
}
