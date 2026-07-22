"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { Check, MessageCircle, Search, Send, UserPlus, X, ArrowLeft } from "lucide-react";
import { createClient } from "@/lib/supabase";
import ReferralCard from "@/components/ReferralCard";
import {
  getDirectMessages,
  getMySocialGraph,
  respondToFriendRequest,
  searchAccounts,
  sendDirectMessage,
  sendFriendRequest,
  subscribeToDirectMessages,
  subscribeToSocialGraph,
  type DirectMessage,
  type SearchAccountResult,
  type SocialConnection,
} from "@/lib/supabase-social";
import { isValidAvatar } from "@/lib/avatar-utils";

interface SessionUser {
  id: string;
  email?: string;
  user_metadata?: {
    full_name?: string;
    avatar_url?: string;
  };
}

function Avatar({
  name,
  avatarUrl,
  size = 40,
}: {
  name?: string | null;
  avatarUrl?: string | null;
  size?: number;
}) {
  const initials = (name || "U")
    .split(" ")
    .map((part) => part[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return isValidAvatar(avatarUrl) ? (
    <Image
      src={avatarUrl}
      alt={name || "User"}
      width={size}
      height={size}
      className="rounded-full object-cover border border-stone-200 dark:border-stone-700"
    />
  ) : (
    <div
      className="rounded-full bg-stone-200 dark:bg-stone-700 text-stone-700 dark:text-stone-300 font-extrabold flex items-center justify-center border border-stone-300 dark:border-stone-600"
      style={{ width: size, height: size, fontSize: Math.max(12, Math.floor(size / 2.5)) }}
    >
      {initials}
    </div>
  );
}

export default function FriendsClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const supabase = createClient();
  const [user, setUser] = useState<SessionUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [connections, setConnections] = useState<SocialConnection[]>([]);
  const [loadingConnections, setLoadingConnections] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<SearchAccountResult[]>([]);
  const [searching, setSearching] = useState(false);
  const [busyUserId, setBusyUserId] = useState<string | null>(null);
  const [activeFriendshipId, setActiveFriendshipId] = useState<number | null>(null);
  const [messages, setMessages] = useState<DirectMessage[]>([]);
  const [loadingMessages, setLoadingMessages] = useState(false);
  const [messageInput, setMessageInput] = useState("");
  const [sendingMessage, setSendingMessage] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const acceptedFriends = useMemo(
    () => connections.filter((connection) => connection.status === "accepted"),
    [connections]
  );
  const incomingRequests = useMemo(
    () => connections.filter((connection) => connection.direction === "incoming" && connection.status === "pending"),
    [connections]
  );
  const outgoingRequests = useMemo(
    () => connections.filter((connection) => connection.direction === "outgoing" && connection.status === "pending"),
    [connections]
  );
  const connectionByUserId = useMemo(
    () => new Map(connections.map((connection) => [connection.user_id, connection])),
    [connections]
  );
  const currentFriendshipId =
    activeFriendshipId && acceptedFriends.some((connection) => connection.friendship_id === activeFriendshipId)
      ? activeFriendshipId
      : acceptedFriends[0]?.friendship_id ?? null;
  const activeConnection = acceptedFriends.find((connection) => connection.friendship_id === currentFriendshipId) ?? null;
  const normalizedSearchTerm = searchTerm.trim();

  async function loadConnections() {
    setLoadingConnections(true);
    try {
      const nextConnections = await getMySocialGraph();
      setConnections(nextConnections);
    } catch (error) {
      console.error("Error loading social graph:", error);
      toast.error(error instanceof Error ? error.message : "Không tải được danh sách bạn bè");
    } finally {
      setLoadingConnections(false);
    }
  }

  useEffect(() => {
    const init = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session?.user) {
        router.replace("/login");
        return;
      }

      setUser({
        id: session.user.id,
        email: session.user.email,
        user_metadata: {
          full_name: session.user.user_metadata?.full_name,
          avatar_url: session.user.user_metadata?.avatar_url,
        },
      });

      await loadConnections();
      setLoading(false);
    };

    void init();
  }, [router, supabase.auth]);

  useEffect(() => {
    if (!user?.id) return;
    return subscribeToSocialGraph(user.id, () => {
      void loadConnections();
    });
  }, [user?.id]);

  // MessageUserButton (public profile page) sends people here with
  // ?with=<userId> after starting/accepting a friend request - auto-select
  // that conversation so they land straight in the chat instead of the
  // empty "chọn một người bạn" state, once their friendship is accepted.
  useEffect(() => {
    const withUserId = searchParams.get("with");
    if (!withUserId) return;
    const match = connections.find((c) => c.user_id === withUserId && c.status === "accepted");
    if (match) {
      setMessages([]);
      setActiveFriendshipId(match.friendship_id);
    }
  }, [searchParams, connections]);

  useEffect(() => {
    if (!searchTerm.trim() || searchTerm.trim().length < 2) {
      return;
    }

    const timer = setTimeout(async () => {
      setSearching(true);
      try {
        const results = await searchAccounts(searchTerm);
        setSearchResults(results);
      } catch (error) {
        console.error("Error searching accounts:", error);
        toast.error(error instanceof Error ? error.message : "Không tìm được tài khoản");
      } finally {
        setSearching(false);
      }
    }, 250);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  useEffect(() => {
    if (!currentFriendshipId) {
      return;
    }

    let cancelled = false;

    const loadMessages = async () => {
      setLoadingMessages(true);
      try {
        const nextMessages = await getDirectMessages(currentFriendshipId);
        if (!cancelled) {
          setMessages(nextMessages);
        }
      } catch (error) {
        console.error("Error loading messages:", error);
        if (!cancelled) {
          toast.error(error instanceof Error ? error.message : "Không tải được tin nhắn");
        }
      } finally {
        if (!cancelled) {
          setLoadingMessages(false);
        }
      }
    };

    void loadMessages();

    const unsubscribe = subscribeToDirectMessages(currentFriendshipId, (message) => {
      setMessages((prev) => (prev.some((existing) => existing.id === message.id) ? prev : [...prev, message]));
    });

    return () => {
      cancelled = true;
      unsubscribe();
    };
  }, [currentFriendshipId]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  async function handleSendFriendRequest(targetUserId: string) {
    if (!user?.id) return;
    setBusyUserId(targetUserId);
    try {
      const result = await sendFriendRequest(user.id, targetUserId);
      if (result.status === "accepted") {
        toast.success("Đã trở thành bạn bè");
      } else {
        toast.success("Đã gửi lời mời kết bạn");
      }
      await loadConnections();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Không gửi được lời mời");
    } finally {
      setBusyUserId(null);
    }
  }

  async function handleRespond(friendshipId: number, status: "accepted" | "rejected") {
    setBusyUserId(String(friendshipId));
    try {
      await respondToFriendRequest(friendshipId, status);
      toast.success(status === "accepted" ? "Đã chấp nhận lời mời" : "Đã từ chối lời mời");
      await loadConnections();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Không cập nhật được lời mời");
    } finally {
      setBusyUserId(null);
    }
  }

  async function handleSendMessage() {
    if (!user?.id || !currentFriendshipId || !messageInput.trim() || sendingMessage) return;
    setSendingMessage(true);
    try {
      const message = await sendDirectMessage(currentFriendshipId, user.id, messageInput);
      setMessages((prev) => (prev.some((existing) => existing.id === message.id) ? prev : [...prev, message]));
      setMessageInput("");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Không gửi được tin nhắn");
    } finally {
      setSendingMessage(false);
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-white dark:bg-stone-950 flex items-center justify-center">
        <p className="text-stone-500 dark:text-stone-400">Đang tải...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-stone-950">
      <div className="border-b border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-950">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <Link href="/dashboard" className="inline-flex items-center gap-1.5 text-sm font-bold text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100 hover:bg-stone-100 dark:hover:bg-stone-800 rounded-lg px-3 py-2 -ml-3 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Quay lại
          </Link>
          <h1 className="text-xl font-bold text-stone-900 dark:text-stone-100 mt-2">Bạn bè & chat</h1>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-8 grid gap-6 lg:grid-cols-[360px_1fr]">
        <div className="space-y-6">
          <ReferralCard />

          <div className="bg-white dark:bg-stone-900 border-2 border-stone-200 dark:border-stone-800 rounded-xl p-5">
            <div className="flex items-center gap-2 mb-4">
              <Search className="w-4 h-4 text-stone-400" />
              <h2 className="text-sm font-extrabold text-stone-900 dark:text-stone-100 uppercase tracking-widest">
                Tìm account
              </h2>
            </div>
            <input
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              placeholder="Nhập tên hoặc email..."
              className="w-full px-4 py-3 rounded-xl border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800 text-sm text-stone-900 dark:text-stone-100 focus:outline-none focus:border-stone-500"
            />

            <div className="mt-4 space-y-3">
              {searching ? (
                <p className="text-xs text-stone-400">Đang tìm...</p>
              ) : searchResults.length > 0 ? (
                searchResults.map((account) => {
                  const relation = connectionByUserId.get(account.id);
                  return (
                    <div
                      key={account.id}
                      className="flex items-center gap-3 rounded-xl border border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-800/50 p-3"
                    >
                      <Avatar name={account.full_name || "Người dùng"} avatarUrl={account.avatar_url} />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-bold text-stone-900 dark:text-stone-100 truncate">
                          {account.full_name || "Người dùng"}
                        </p>
                        <p className="text-[11px] text-stone-400 dark:text-stone-500 mt-0.5">
                          Level {account.current_level} · {account.total_xp} XP
                        </p>
                      </div>
                      {relation?.direction === "friend" ? (
                        <button
                          onClick={() => {
                            setMessages([]);
                            setActiveFriendshipId(relation.friendship_id);
                          }}
                          className="px-3 py-2 rounded-lg bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 text-xs font-bold"
                        >
                          Nhắn tin
                        </button>
                      ) : relation?.direction === "incoming" ? (
                        <button
                          onClick={() => void handleRespond(relation.friendship_id, "accepted")}
                          disabled={busyUserId === String(relation.friendship_id)}
                          className="px-3 py-2 rounded-lg bg-emerald-600 text-white text-xs font-bold disabled:opacity-60"
                        >
                          Chấp nhận
                        </button>
                      ) : relation?.direction === "outgoing" ? (
                        <div className="text-[11px] font-bold text-amber-600 dark:text-amber-400 whitespace-nowrap">
                          Đã gửi
                        </div>
                      ) : (
                        <button
                          onClick={() => void handleSendFriendRequest(account.id)}
                          disabled={busyUserId === account.id}
                          className="px-3 py-2 rounded-lg bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 text-xs font-bold disabled:opacity-60 flex items-center gap-1.5"
                        >
                          <UserPlus className="w-3.5 h-3.5" />
                          Kết bạn
                        </button>
                      )}
                    </div>
                  );
                })
              ) : normalizedSearchTerm.length >= 2 ? (
                <p className="text-xs text-stone-400">Không tìm thấy tài khoản phù hợp.</p>
              ) : (
                <p className="text-xs text-stone-400">Nhập ít nhất 2 ký tự để tìm bạn.</p>
              )}
            </div>
          </div>

          <div className="bg-white dark:bg-stone-900 border-2 border-stone-200 dark:border-stone-800 rounded-xl p-5">
            <h2 className="text-sm font-extrabold text-stone-900 dark:text-stone-100 uppercase tracking-widest mb-4">
              Lời mời đến ({incomingRequests.length})
            </h2>
            <div className="space-y-3">
              {incomingRequests.length === 0 ? (
                <p className="text-xs text-stone-400">Chưa có lời mời nào.</p>
              ) : (
                incomingRequests.map((connection) => (
                  <div key={connection.friendship_id} className="rounded-xl border border-stone-200 dark:border-stone-800 p-3">
                    <div className="flex items-center gap-3">
                      <Avatar name={connection.full_name || "Người dùng"} avatarUrl={connection.avatar_url} />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-bold text-stone-900 dark:text-stone-100 truncate">
                          {connection.full_name || "Người dùng"}
                        </p>
                      </div>
                    </div>
                    <div className="mt-3 flex gap-2">
                      <button
                        onClick={() => void handleRespond(connection.friendship_id, "accepted")}
                        disabled={busyUserId === String(connection.friendship_id)}
                        className="flex-1 py-2 rounded-lg bg-emerald-600 text-white text-xs font-bold disabled:opacity-60 flex items-center justify-center gap-1.5"
                      >
                        <Check className="w-3.5 h-3.5" />
                        Chấp nhận
                      </button>
                      <button
                        onClick={() => void handleRespond(connection.friendship_id, "rejected")}
                        disabled={busyUserId === String(connection.friendship_id)}
                        className="flex-1 py-2 rounded-lg bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 text-xs font-bold disabled:opacity-60 flex items-center justify-center gap-1.5"
                      >
                        <X className="w-3.5 h-3.5" />
                        Từ chối
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="bg-white dark:bg-stone-900 border-2 border-stone-200 dark:border-stone-800 rounded-xl p-5">
            <h2 className="text-sm font-extrabold text-stone-900 dark:text-stone-100 uppercase tracking-widest mb-4">
              Bạn bè ({acceptedFriends.length})
            </h2>
            <div className="space-y-2">
              {loadingConnections && acceptedFriends.length === 0 ? (
                <p className="text-xs text-stone-400">Đang tải...</p>
              ) : acceptedFriends.length === 0 ? (
                <p className="text-xs text-stone-400">Chưa có bạn bè nào. Tìm và kết bạn để bắt đầu chat.</p>
              ) : (
                acceptedFriends.map((connection) => (
                  <button
                    key={connection.friendship_id}
                    onClick={() => {
                      setMessages([]);
                      setActiveFriendshipId(connection.friendship_id);
                    }}
                    className={`w-full text-left rounded-xl border px-3 py-3 transition-colors ${
                      currentFriendshipId === connection.friendship_id
                        ? "border-stone-900 dark:border-stone-100 bg-stone-100 dark:bg-stone-800"
                        : "border-stone-200 dark:border-stone-800 hover:bg-stone-50 dark:hover:bg-stone-800/50"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Avatar name={connection.full_name || "Người dùng"} avatarUrl={connection.avatar_url} />
                      <div className="min-w-0">
                        <p className="text-sm font-bold text-stone-900 dark:text-stone-100 truncate">
                          {connection.full_name || "Người dùng"}
                        </p>
                        <p className="text-xs text-stone-500 dark:text-stone-400 truncate">
                          Level {connection.current_level} · {connection.total_xp} XP
                        </p>
                      </div>
                    </div>
                  </button>
                ))
              )}
            </div>
          </div>

          {outgoingRequests.length > 0 && (
            <div className="bg-white dark:bg-stone-900 border-2 border-stone-200 dark:border-stone-800 rounded-xl p-5">
              <h2 className="text-sm font-extrabold text-stone-900 dark:text-stone-100 uppercase tracking-widest mb-4">
                Đang chờ ({outgoingRequests.length})
              </h2>
              <div className="space-y-2">
                {outgoingRequests.map((connection) => (
                  <div key={connection.friendship_id} className="rounded-xl border border-stone-200 dark:border-stone-800 p-3">
                    <p className="text-sm font-bold text-stone-900 dark:text-stone-100 truncate">
                      {connection.full_name || "Người dùng"}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="bg-white dark:bg-stone-900 border-2 border-stone-200 dark:border-stone-800 rounded-xl overflow-hidden min-h-[640px] flex flex-col">
          {!activeConnection ? (
            <div className="flex-1 flex flex-col items-center justify-center text-center px-6">
              <MessageCircle className="w-10 h-10 text-stone-300 dark:text-stone-700 mb-3" />
              <p className="text-sm font-bold text-stone-700 dark:text-stone-300">Chọn một người bạn để bắt đầu chat</p>
              <p className="text-xs text-stone-400 mt-1">Sau khi hai bên trở thành bạn bè, bạn có thể nhắn tin trực tiếp tại đây.</p>
            </div>
          ) : (
            <>
              <div className="px-5 py-4 border-b border-stone-200 dark:border-stone-800 flex items-center gap-3">
                <Avatar name={activeConnection.full_name || "Người dùng"} avatarUrl={activeConnection.avatar_url} size={44} />
                <div className="min-w-0">
                  <p className="text-sm font-bold text-stone-900 dark:text-stone-100 truncate">
                    {activeConnection.full_name || "Người dùng"}
                  </p>
                  <p className="text-xs text-stone-500 dark:text-stone-400 truncate">
                    Level {activeConnection.current_level} · {activeConnection.total_xp} XP
                  </p>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto px-5 py-4 space-y-3 bg-stone-50/70 dark:bg-stone-950/40">
                {loadingMessages ? (
                  <p className="text-xs text-stone-400">Đang tải tin nhắn...</p>
                ) : messages.length === 0 ? (
                  <p className="text-xs text-stone-400">Chưa có tin nhắn nào. Nhắn lời chào trước đi.</p>
                ) : (
                  messages.map((message) => {
                    const isMine = message.sender_id === user?.id;
                    return (
                      <div key={message.id} className={`flex ${isMine ? "justify-end" : "justify-start"}`}>
                        <div
                          className={`max-w-md px-4 py-2.5 rounded-2xl text-sm ${
                            isMine
                              ? "bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 rounded-br-md"
                              : "bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100 border border-stone-200 dark:border-stone-700 rounded-bl-md"
                          }`}
                        >
                          <p className="leading-relaxed whitespace-pre-wrap">{message.content}</p>
                          <p className={`text-[10px] mt-1 ${isMine ? "text-stone-300 dark:text-stone-600" : "text-stone-400 dark:text-stone-500"}`}>
                            {new Date(message.created_at).toLocaleTimeString("vi-VN", {
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </p>
                        </div>
                      </div>
                    );
                  })
                )}
                <div ref={messagesEndRef} />
              </div>

              <div className="p-4 border-t border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900">
                <div className="flex gap-2">
                  <input
                    value={messageInput}
                    onChange={(event) => setMessageInput(event.target.value)}
                    onKeyDown={(event) => {
                      if (event.key === "Enter" && !event.shiftKey) {
                        event.preventDefault();
                        void handleSendMessage();
                      }
                    }}
                    placeholder="Nhập tin nhắn cho bạn bè..."
                    className="flex-1 px-4 py-3 rounded-xl border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800 text-sm text-stone-900 dark:text-stone-100 focus:outline-none focus:border-stone-500"
                  />
                  <button
                    onClick={() => void handleSendMessage()}
                    disabled={!messageInput.trim() || sendingMessage}
                    className="px-4 py-3 rounded-xl bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 disabled:opacity-50"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
