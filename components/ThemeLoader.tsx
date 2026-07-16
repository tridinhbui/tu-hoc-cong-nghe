"use client";

import { useEffect } from "react";

export default function ThemeLoader() {
  useEffect(() => {
    const applyTheme = () => {
      if (typeof window === "undefined") return;
      
      let activeTheme = null;
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && key.startsWith("thtcdn_active_theme_")) {
          activeTheme = localStorage.getItem(key);
          break;
        }
      }

      const root = document.documentElement;
      root.classList.remove("theme-gold", "theme-emerald");
      if (activeTheme === "gold") {
        root.classList.add("theme-gold");
      } else if (activeTheme === "emerald") {
        root.classList.add("theme-emerald");
      }
    };

    applyTheme();
    window.addEventListener("thtcdn_theme_updated", applyTheme);
    return () => {
      window.removeEventListener("thtcdn_theme_updated", applyTheme);
    };
  }, []);

  return (
    <style dangerouslySetInnerHTML={{ __html: `
      /* Gold theme overrides */
      .theme-gold .bg-emerald-500 { background-color: #d97706 !important; }
      .theme-gold .bg-emerald-600 { background-color: #b45309 !important; }
      .theme-gold .text-emerald-500 { color: #d97706 !important; }
      .theme-gold .text-emerald-600 { color: #b45309 !important; }
      .theme-gold .border-emerald-500 { border-color: #d97706 !important; }
      .theme-gold .border-emerald-600 { border-color: #b45309 !important; }
      
      /* Emerald theme overrides */
      .theme-emerald .bg-emerald-500 { background-color: #10b981 !important; }
      .theme-emerald .bg-emerald-600 { background-color: #059669 !important; }
      .theme-emerald .text-emerald-500 { color: #10b981 !important; }
      .theme-emerald .text-emerald-600 { color: #059669 !important; }
      .theme-emerald .border-emerald-500 { border-color: #10b981 !important; }
      .theme-emerald .border-emerald-600 { border-color: #059669 !important; }
    `}} />
  );
}
