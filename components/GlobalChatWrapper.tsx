"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase";
import type { User } from "@supabase/supabase-js";
import ChatWithAdminWidget from "./ChatWithAdminWidget";
import FloatingStudyGroupChat from "./FloatingStudyGroupChat";
import ReferralPromptModal from "./ReferralPromptModal";
import ConnectMenu from "./ConnectMenu";
import { usePathname } from "next/navigation";

export default function GlobalChatWrapper() {
  const [user, setUser] = useState<User | null>(null);
  const [activeChatWidget, setActiveChatWidget] = useState<"admin" | "group" | "invite" | null>(null);
  const [groupUnread, setGroupUnread] = useState(0);
  const supabase = createClient();
  const pathname = usePathname();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [supabase]);

  // Hide chat widgets on auth pages
  if (!user || pathname === "/login" || pathname === "/auth/reset-password") {
    return null;
  }

  return (
    <>
      {/* Ba nút tròn riêng lẻ đã gộp thành một nút ba gạch. `hideTrigger` bật
          cho cả ba: lối vào của chúng giờ là các dòng trong ConnectMenu, và
          panel vẫn là panel cũ - chỉ đổi chỗ bấm để mở.

          Trợ lý AI (FloatingChatbot) KHÔNG vào đây theo đúng yêu cầu: cái tên
          "chatbot" để dành cho nó, còn luồng nhắn cho đội ngũ đổi tên thành
          "Góp ý" và nằm trong menu. */}
      <ChatWithAdminWidget
        isOpen={activeChatWidget === "admin"}
        onOpenChange={(open) => setActiveChatWidget(open ? "admin" : null)}
        hideTrigger
      />
      <FloatingStudyGroupChat
        isOpen={activeChatWidget === "group"}
        onOpenChange={(open) => setActiveChatWidget(open ? "group" : null)}
        hideTrigger
        onUnreadChange={setGroupUnread}
      />
      <ReferralPromptModal
        isOpen={activeChatWidget === "invite"}
        onOpenChange={(open) => setActiveChatWidget(open ? "invite" : null)}
        hideTrigger
      />
      {/* Nút gộp ẩn đi khi một panel đang mở, để nó không đè lên panel. */}
      {activeChatWidget === null && (
        <ConnectMenu
          userId={user.id}
          groupUnread={groupUnread}
          onOpenGroup={() => setActiveChatWidget("group")}
          onOpenFeedback={() => setActiveChatWidget("admin")}
          onOpenInvite={() => setActiveChatWidget("invite")}
        />
      )}
    </>
  );
}
