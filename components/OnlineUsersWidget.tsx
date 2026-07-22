"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Users } from "lucide-react";
import { getOnlineUsers, getOnlineCount, type OnlineUser } from "@/lib/presence";
import { isValidAvatar } from "@/lib/avatar-utils";

export default function OnlineUsersWidget() {
  const [users, setUsers] = useState<OnlineUser[]>([]);
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    function load() {
      Promise.all([getOnlineUsers(8), getOnlineCount()])
        .then(([u, c]) => {
          if (cancelled) return;
          setUsers(u);
          setCount(c);
        })
        .catch((err) => console.error("Error loading online users:", err))
        .finally(() => {
          if (!cancelled) setLoading(false);
        });
    }
    load();
    // Refresh periodically so the list stays roughly live without a full
    // page reload - presence itself only changes as often as the 60s
    // heartbeat, so no point polling faster than that.
    const interval = window.setInterval(load, 60_000);
    return () => {
      cancelled = true;
      window.clearInterval(interval);
    };
  }, []);

  if (!loading && count === 0) return null;

  return (
    <div className="bg-white dark:bg-stone-900 border border-stone-250 dark:border-stone-800 rounded-3xl shadow-sm overflow-hidden">
      <div className="px-5 py-4 border-b border-stone-150 dark:border-stone-800 flex items-center gap-2.5">
        <div className="rounded-xl bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0 w-8 h-8">
          <Users className="w-4.5 h-4.5" />
        </div>
        <div>
          <h3 className="font-bold text-stone-900 dark:text-stone-100 text-base flex items-center gap-1.5">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            Đang online
          </h3>
          <p className="text-[10px] text-stone-500 dark:text-stone-400 font-bold">{count} người đang học cùng lúc</p>
        </div>
      </div>

      {users.length > 0 && (
        <div className="p-4 flex flex-wrap gap-2">
          {users.map((u) => (
            <div
              key={u.userId}
              title={u.name}
              className="flex items-center gap-1.5 bg-stone-50 dark:bg-stone-800/60 border border-stone-150 dark:border-stone-800 rounded-full pl-1 pr-2.5 py-1"
            >
              <div className="relative w-5 h-5 rounded-full overflow-hidden bg-stone-200 dark:bg-stone-700 flex-shrink-0">
                {isValidAvatar(u.avatarUrl) ? (
                  <Image src={u.avatarUrl} alt={u.name} fill sizes="20px" className="object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-[9px] font-black text-stone-500 dark:text-stone-400">
                    {u.name.charAt(0).toUpperCase()}
                  </div>
                )}
                <span className="absolute -bottom-0.5 -right-0.5 w-1.5 h-1.5 rounded-full bg-emerald-500 ring-1 ring-white dark:ring-stone-900" />
              </div>
              <span className="text-[10px] font-bold text-stone-700 dark:text-stone-300 truncate max-w-[80px]">{u.name}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
