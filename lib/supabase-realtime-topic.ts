let realtimeSubscriptionSeq = 0;

/** Supabase's client hands back the *existing* channel when a topic is already
 *  registered (RealtimeClient.channel), and calling `.on("postgres_changes")` on
 *  a channel that already ran `subscribe()` throws. Any remount that beats the
 *  async removeChannel() - React strict mode, a route the reader navigates back
 *  to, two components watching the same scope - hits exactly that, and an
 *  uncaught throw inside the effect takes the whole page down with it.
 *
 *  Suffixing the topic keeps every subscription on a channel of its own. Only
 *  safe for postgres_changes; presence/broadcast need every client to share one
 *  topic, so those must keep a stable name. */
export function uniqueRealtimeTopic(base: string): string {
  realtimeSubscriptionSeq += 1;
  return `${base}:${realtimeSubscriptionSeq}`;
}
