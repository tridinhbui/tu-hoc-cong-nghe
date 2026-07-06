"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase";

type Status = "idle" | "sending" | "sent" | "error";

// Basic anti-spam: contact_messages accepts inserts from anon+authenticated
// with no other gate, so a plain bot can flood it. Neither check stops a
// determined attacker, but both are cheap and block the overwhelming
// majority of generic form-spam bots.
const LAST_SUBMIT_KEY = "thtcdn_contact_last_submit";
const SUBMIT_COOLDOWN_MS = 30_000;

export default function FloatingContact() {
  const supabase = createClient();
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  // Honeypot: a real user never sees or fills this field. Bots that
  // blind-fill every input on the page will, and get silently no-op'd.
  const [website, setWebsite] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [cooldownError, setCooldownError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!message.trim()) return;
    setCooldownError("");

    if (website.trim()) {
      // Honeypot tripped — pretend success so the bot doesn't learn to
      // adapt, but don't actually write anything.
      setStatus("sent");
      setName("");
      setEmail("");
      setMessage("");
      setWebsite("");
      return;
    }

    const lastSubmit = Number(window.localStorage.getItem(LAST_SUBMIT_KEY) || 0);
    const msSinceLast = Date.now() - lastSubmit;
    if (lastSubmit && msSinceLast < SUBMIT_COOLDOWN_MS) {
      setCooldownError(`Vui lòng đợi ${Math.ceil((SUBMIT_COOLDOWN_MS - msSinceLast) / 1000)} giây rồi gửi tiếp.`);
      return;
    }

    setStatus("sending");

    const {
      data: { user },
    } = await supabase.auth.getUser();

    const { error } = await supabase.from("contact_messages").insert({
      user_id: user?.id ?? null,
      name: name.trim() || user?.user_metadata?.full_name || "Ẩn danh",
      email: email.trim() || user?.email || null,
      subject: "Góp ý từ ứng dụng",
      message: message.trim(),
    });

    if (error) {
      setStatus("error");
      return;
    }

    window.localStorage.setItem(LAST_SUBMIT_KEY, String(Date.now()));
    setStatus("sent");
    setName("");
    setEmail("");
    setMessage("");
  }

  function handleClose() {
    setOpen(false);
    setTimeout(() => setStatus("idle"), 400);
  }

  return (
    <>
      {/* Floating button */}
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label="Liên hệ admin"
        title="Góp ý & đóng góp"
        className={`fixed bottom-5 right-4 sm:bottom-6 sm:right-6 z-50 w-14 h-14 sm:w-16 sm:h-16 rounded-full shadow-xl flex items-center justify-center transition-all duration-300 cursor-pointer select-none ${
          open
            ? "bg-stone-600 scale-95"
            : "bg-stone-800 hover:bg-stone-700 hover:scale-110"
        }`}
      >
        {open ? (
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M3 3L17 17M17 3L3 17" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
          </svg>
        ) : (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
      </button>

      {/* Backdrop on mobile */}
      {open && (
        <div
          className="fixed inset-0 bg-black/20 z-40 sm:hidden"
          onClick={handleClose}
        />
      )}

      {/* Panel */}
      <div
        className={`fixed z-50 transition-all duration-300 ease-out
          bottom-0 left-0 right-0
          sm:bottom-24 sm:right-6 sm:left-auto sm:w-[400px]
          ${open ? "translate-y-0 opacity-100 pointer-events-auto" : "translate-y-4 opacity-0 pointer-events-none"}
        `}
      >
        <div className="bg-white sm:rounded-2xl shadow-2xl border border-stone-200 flex flex-col overflow-hidden rounded-t-2xl sm:rounded-2xl">

          {/* Header */}
          <div className="bg-stone-800 px-5 py-5 flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <div className="flex-1">
              <p className="text-white font-bold text-base">Góp ý & Đóng góp</p>
              <p className="text-stone-500 text-sm mt-0.5">Giúp chúng mình phát triển sản phẩm tốt hơn</p>
            </div>
          </div>

          {/* Body */}
          <div className="px-5 py-5">
            {status === "sent" ? (
              <div className="text-center py-6 space-y-3">
                <div className="w-14 h-14 rounded-full bg-stone-100 flex items-center justify-center mx-auto text-2xl">
                  ✓
                </div>
                <p className="font-bold text-stone-900 text-lg">Đã nhận được!</p>
                <p className="text-stone-500 text-base leading-relaxed">
                  Cảm ơn bạn đã góp ý. Chúng mình sẽ đọc và phản hồi sớm nhất có thể.
                </p>
                <button
                  onClick={() => setStatus("idle")}
                  className="mt-2 px-5 py-2.5 rounded-xl border border-stone-200 text-stone-600 text-sm font-semibold hover:bg-stone-50 transition-colors cursor-pointer"
                >
                  Gửi thêm góp ý
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Honeypot — hidden from real users, only bots fill it */}
                <input
                  type="text"
                  name="website"
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                  className="hidden"
                />

                <div className="space-y-1.5">
                  <label className="text-sm font-semibold text-stone-700">Tên của bạn</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Nguyễn Văn A"
                    className="w-full px-4 py-3 rounded-xl border border-stone-200 text-base text-stone-900 placeholder:text-stone-500 focus:outline-none focus:border-stone-400 focus:ring-2 focus:ring-stone-100 transition-all"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-sm font-semibold text-stone-700">Email (để admin phản hồi)</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="ban@email.com"
                    className="w-full px-4 py-3 rounded-xl border border-stone-200 text-base text-stone-900 placeholder:text-stone-500 focus:outline-none focus:border-stone-400 focus:ring-2 focus:ring-stone-100 transition-all"
                  />
                </div>

                {status === "error" && (
                  <p className="text-sm text-red-600 font-semibold">
                    Không gửi được, vui lòng thử lại sau.
                  </p>
                )}

                {cooldownError && (
                  <p className="text-sm text-red-600 font-semibold">{cooldownError}</p>
                )}

                <div className="space-y-1.5">
                  <label className="text-sm font-semibold text-stone-700">
                    Góp ý / Đóng góp <span className="text-stone-500 font-normal">(bắt buộc)</span>
                  </label>
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    required
                    rows={4}
                    placeholder="Ví dụ: Bài học X còn thiếu phần giải thích về Y, hoặc mình muốn đóng góp nội dung về Z..."
                    className="w-full px-4 py-3 rounded-xl border border-stone-200 text-base text-stone-900 placeholder:text-stone-500 focus:outline-none focus:border-stone-400 focus:ring-2 focus:ring-stone-100 transition-all resize-none"
                  />
                </div>

                <div className="pt-1 space-y-2.5">
                  <button
                    type="submit"
                    disabled={!message.trim() || status === "sending"}
                    className={`w-full py-3.5 rounded-xl font-bold text-base text-white transition-all cursor-pointer ${
                      message.trim() && status !== "sending"
                        ? "bg-stone-900 hover:bg-stone-700"
                        : "bg-stone-200 text-stone-500 cursor-not-allowed"
                    }`}
                  >
                    {status === "sending" ? "Đang gửi..." : "Gửi góp ý"}
                  </button>

                  <p className="text-xs text-stone-500 text-center leading-relaxed">
                    Hoặc liên hệ qua email:{" "}
                    <a
                      href="mailto:tribd.tec@gmail.com"
                      className="text-stone-600 underline underline-offset-2 hover:text-stone-900"
                    >
                      tribd.tec@gmail.com
                    </a>
                  </p>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
