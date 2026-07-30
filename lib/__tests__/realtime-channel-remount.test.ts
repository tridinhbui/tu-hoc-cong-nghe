import { describe, it, expect, vi, beforeEach } from "vitest";

/** Fake that mirrors the two supabase-js behaviours that combined to take down
 *  every page mounting NotificationBell (AppNavbar):
 *    - RealtimeClient.channel(topic) returns the *existing* channel for a topic
 *    - RealtimeChannel.on("postgres_changes") throws once the channel is joined
 *  A remount that beats the async removeChannel() therefore threw inside the
 *  effect, and the uncaught error swapped the page for "This page couldn't load". */
const channels = new Map<string, FakeChannel>();

class FakeChannel {
  joined = false;
  constructor(readonly topic: string) {}
  on(type: string) {
    if (this.joined && type === "postgres_changes") {
      throw new Error(`cannot add \`${type}\` callbacks for ${this.topic} after \`subscribe()\`.`);
    }
    return this;
  }
  subscribe() {
    this.joined = true;
    return this;
  }
}

const fakeSupabase = {
  channel(topic: string) {
    const existing = channels.get(topic);
    if (existing) return existing;
    const channel = new FakeChannel(topic);
    channels.set(topic, channel);
    return channel;
  },
  // Deliberately does NOT drop the channel: the crash happens precisely when
  // the remount lands before the real removeChannel() round-trip finishes.
  removeChannel: vi.fn(),
};

vi.mock("@/lib/supabase", () => ({ createClient: () => fakeSupabase }));

const subscriberModules = [
  ["lib/supabase-community.ts", () => import("@/lib/supabase-community")],
  ["lib/supabase-social.ts", () => import("@/lib/supabase-social")],
  ["lib/supabase-chat.ts", () => import("@/lib/supabase-chat")],
  ["lib/supabase-bugs.ts", () => import("@/lib/supabase-bugs")],
  ["lib/supabase-study-rooms.ts", () => import("@/lib/supabase-study-rooms")],
] as const;

describe("realtime subscriptions survive a remount", () => {
  beforeEach(() => {
    channels.clear();
  });

  it("gives the notification bell a fresh channel on every mount", async () => {
    const { subscribeToCommunityNotifications } = await import("@/lib/supabase-community");
    const userId = "a637f453-2c46-4265-b8f6-00e47f3532d5";

    const unsubscribe = subscribeToCommunityNotifications(userId, () => {});
    unsubscribe();
    expect(() => subscribeToCommunityNotifications(userId, () => {})()).not.toThrow();
    expect(channels.size).toBe(2);
  });

  for (const [name, load] of subscriberModules) {
    it(`resubscribes without throwing in ${name}`, async () => {
      const mod = (await load()) as Record<string, unknown>;
      const subscribers = Object.entries(mod).filter(
        ([key, value]) => key.startsWith("subscribeTo") && typeof value === "function"
      );
      expect(subscribers.length).toBeGreaterThan(0);

      for (const [, subscribe] of subscribers) {
        const call = subscribe as (scope: never, onChange: () => void) => () => void;
        // Every subscriber takes (scope, callback); the scope is only ever
        // interpolated into the topic and a postgres filter here.
        call(1 as never, () => {})();
        expect(() => call(1 as never, () => {})()).not.toThrow();
      }
    });
  }
});
