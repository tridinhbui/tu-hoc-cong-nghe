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
      /* Đổi màu chủ đề Ở TẦNG TOKEN.
         Danh sách !important bên dưới nhắm vào TÊN LỚP Tailwind gắn cứng
         (.text-emerald-600...). Sau khi 106 chỗ \`text-accent\` được gộp thành \`text-accent\`, chúng không còn
         khớp danh sách ấy nữa và lặng lẽ mất khả năng đổi màu - không lỗi,
         không cảnh báo, chỉ là chủ đề vàng thôi tác dụng ở 106 chỗ.
         Đổi chính biến token thì mọi lớp dùng \`accent\` đều theo, kể cả những
         lớp được thêm sau này, và không cần một dòng !important nào. */
      .theme-gold { --accent: #b45309; --accent-strong: #b45309; }
      .theme-emerald { --accent: #059669; --accent-strong: #059669; }

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
