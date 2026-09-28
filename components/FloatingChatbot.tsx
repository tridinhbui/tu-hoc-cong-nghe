"use client";

import { useState } from "react";
import { createClient } from "@/lib/cloudflare";
import { useI18n } from "@/lib/i18n/context";
import { format } from "@/lib/i18n";
import { getCurrentUser } from "@/lib/current-user";
import { btnPrimary, btnSecondary } from "@/components/ui/system";

type Status = "idle" | "sending" | "sent" | "error";

// Basic anti-spam: contact_messages accepts inserts from anon+authenticated
// with no other gate, so a plain bot can flood it. Neither check stops a
// determined attacker, but both are cheap and block the overwhelming
// majority of generic form-spam bots.
const LAST_SUBMIT_KEY = "thtcdn_contact_last_submit";
const SUBMIT_COOLDOWN_MS = 30_000;

export default function FloatingContact() {
  const { t } = useI18n();
  const cloudflare = createClient();
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
      // Honeypot tripped - pretend success so the bot doesn't learn to
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
      setCooldownError(
        format(t.chatbot.cooldownError, { seconds: Math.ceil((SUBMIT_COOLDOWN_MS - msSinceLast) / 1000) })
      );
      return;
    }

    setStatus("sending");

    const user = await getCurrentUser();

    const { error } = await cloudflare.from("contact_messages").insert({
      user_id: user?.id ?? null,
      name: name.trim() || user?.fullName || t.chatbot.anonName,
      email: email.trim() || user?.email || null,
      subject: t.chatbot.feedbackSubject,
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
        aria-label={t.chatbot.fabAriaLabel}
        title={t.chatbot.fabTitle}
        className={`fixed bottom-5 right-4 sm:bottom-6 sm:right-6 z-50 w-12 h-12 sm:w-14 sm:h-14 rounded-md border flex items-center justify-center transition-colors cursor-pointer select-none ${
          open
            ? "border-stone-700 bg-stone-700"
            : "border-stone-950 bg-stone-950 hover:border-brand-700 hover:bg-brand-700"
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
          className="fixed inset-0 bg-stone-950/60 z-40 sm:hidden"
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
        <div className="bg-white dark:bg-stone-900 border border-line-strong flex flex-col overflow-hidden rounded-t-md sm:rounded-md">

          {/* Header */}
          <div className="bg-stone-950 px-5 py-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-sm border border-white/15 flex items-center justify-center flex-shrink-0">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <div className="flex-1">
              <p className="text-white font-bold text-base">{t.chatbot.headerTitle}</p>
              <p className="text-stone-400 text-sm mt-0.5">{t.chatbot.headerSubtitle}</p>
            </div>
          </div>

          {/* Body */}
          <div className="px-5 py-5">
            {status === "sent" ? (
              <div className="text-center py-6 space-y-3">
                <div className="w-12 h-12 rounded-sm border border-brand-600 text-accent flex items-center justify-center mx-auto text-xl dark:border-brand-400">
                  ✓
                </div>
                <p className="font-bold text-ink-max text-lg">{t.chatbot.sentTitle}</p>
                <p className="text-ink-muted text-base leading-relaxed">
                  {t.chatbot.sentBody}
                </p>
                <button
                  onClick={() => setStatus("idle")}
                  className={`${btnSecondary} mt-2 cursor-pointer`}
                >
                  {t.chatbot.sentAnother}
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Honeypot - hidden from real users, only bots fill it */}
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
                  <label className="text-sm font-semibold text-ink-body">{t.chatbot.nameLabel}</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder={t.chatbot.namePlaceholder}
                    className="w-full px-4 py-3 rounded-sm border border-line-strong bg-white dark:bg-stone-900 text-base text-ink placeholder:text-ink-faint focus:outline-none focus:border-brand-600 transition-colors"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-sm font-semibold text-ink-body">{t.chatbot.emailLabel}</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={t.chatbot.emailPlaceholder}
                    className="w-full px-4 py-3 rounded-sm border border-line-strong bg-white dark:bg-stone-900 text-base text-ink placeholder:text-ink-faint focus:outline-none focus:border-brand-600 transition-colors"
                  />
                </div>

                {status === "error" && (
                  <p className="text-sm text-danger font-semibold">
                    {t.chatbot.errorSend}
                  </p>
                )}

                {cooldownError && (
                  <p className="text-sm text-danger font-semibold">{cooldownError}</p>
                )}

                <div className="space-y-1.5">
                  <label className="text-sm font-semibold text-ink-body">
                    {t.chatbot.messageLabel} <span className="text-ink-muted font-normal">{t.chatbot.messageLabelRequired}</span>
                  </label>
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    required
                    rows={4}
                    placeholder={t.chatbot.messagePlaceholder}
                    className="w-full px-4 py-3 rounded-sm border border-line-strong bg-white dark:bg-stone-900 text-base text-ink placeholder:text-ink-faint focus:outline-none focus:border-brand-600 transition-colors resize-none"
                  />
                </div>

                <div className="pt-1 space-y-2.5">
                  <button
                    type="submit"
                    disabled={!message.trim() || status === "sending"}
                    className={`${btnPrimary} w-full !py-3 cursor-pointer`}
                  >
                    {status === "sending" ? t.chatbot.submitSending : t.chatbot.submitIdle}
                  </button>

                  <p className="text-xs text-ink-muted text-center leading-relaxed">
                    {t.chatbot.contactViaEmail}{" "}
                    <a
                      href="mailto:tribd.tec@gmail.com"
                      className="text-accent-strong underline underline-offset-2"
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
