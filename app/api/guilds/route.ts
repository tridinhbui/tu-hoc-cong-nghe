import { NextRequest, NextResponse } from "next/server";
import { errorMessage } from "@/lib/errors";
import { createServerSupabaseClient } from "@/lib/supabase-server";
import { getServerDictionary } from "@/lib/i18n/server";
import type { Dictionary } from "@/lib/i18n/dictionaries/vi";

// Fallback Guilds data if DB tables are empty. Never stored or cached - this
// route computes the response fresh on every request (no revalidate, no
// unstable_cache, and the fallback rows themselves never get written to
// `financial_guilds`), so it is safe to read the caller's locale here rather
// than shipping a stable id to the client. `name` is real copy and comes from
// `t.finalOne.guildsRoute.fallbackNames`, keyed by `id`; `tag` is a short
// guild badge/acronym kept identical in both languages.
/* i18n-ignore-start: short guild tag/acronym badges, kept identical in both languages */
const FALLBACK_GUILD_SHAPE = [
  {
    id: "guild-wallstreet",
    tag: "WALL",
    logo_emoji: "🏛️",
    level: 5,
    total_xp: 154000,
    member_count: 24,
  },
  {
    id: "guild-tichsan",
    tag: "FIRE",
    logo_emoji: "📈",
    level: 4,
    total_xp: 98000,
    member_count: 18,
  },
  {
    id: "guild-pe",
    tag: "PES",
    logo_emoji: "💎",
    level: 3,
    total_xp: 62000,
    member_count: 12,
  },
];
/* i18n-ignore-end */

function fallbackGuildsOf(t: Dictionary) {
  const names = t.finalOne.guildsRoute.fallbackNames;
  return FALLBACK_GUILD_SHAPE.map((g) => ({
    ...g,
    name: names[g.id as keyof typeof names],
  }));
}

export async function GET(request: NextRequest) {
  const t = await getServerDictionary();
  const supabase = await createServerSupabaseClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Fetch Guild list
  const { data: guilds } = await supabase
    .from("financial_guilds")
    .select("*, guild_members(count)")
    .order("total_xp", { ascending: false })
    .limit(10);

  /** Chỉ những cột mà endpoint này đọc; `guild_members(count)` là quan hệ
   *  tổng hợp nên Supabase trả về mảng một phần tử. */
  interface GuildRow {
    id: string;
    name: string;
    tag: string;
    logo_emoji: string;
    level: number;
    total_xp: number;
    guild_members?: { count: number }[] | null;
  }

  const formattedGuilds = (guilds as GuildRow[] | null)?.map((g) => ({
    id: g.id,
    name: g.name,
    tag: g.tag,
    logo_emoji: g.logo_emoji,
    level: g.level,
    total_xp: g.total_xp,
    member_count: g.guild_members?.[0]?.count || 1,
  })) || fallbackGuildsOf(t);

  // Check user's current guild if logged in
  let myGuild = null;
  if (user) {
    const { data: member } = await supabase
      .from("guild_members")
      .select("role, financial_guilds(*)")
      .eq("user_id", user.id)
      .maybeSingle();

    if (member?.financial_guilds) {
      myGuild = {
        role: member.role,
        ...member.financial_guilds,
      };
    }
  }

  return NextResponse.json({
    guilds: formattedGuilds,
    myGuild,
  });
}

export async function POST(request: NextRequest) {
  const supabase = await createServerSupabaseClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = (await request.json().catch(() => null)) as {
    action?: "create" | "join";
    name?: string;
    tag?: string;
    logo_emoji?: string;
    guildId?: string;
  } | null;

  if (body?.action === "create") {
    const name = body.name?.trim();
    const tag = body.tag?.trim().toUpperCase();
    const logo_emoji = body.logo_emoji || "🏰";

    if (!name || !tag) {
      return NextResponse.json({ error: "Name and Tag are required" }, { status: 400 });
    }

    try {
      const { data: guild, error } = await supabase
        .from("financial_guilds")
        .insert({
          name,
          tag,
          logo_emoji,
          leader_id: user.id,
          level: 1,
          total_xp: 1000,
        })
        .select()
        .single();

      if (error) throw error;

      // Add leader to guild_members
      await supabase.from("guild_members").insert({
        guild_id: guild.id,
        user_id: user.id,
        role: "leader",
      });

      return NextResponse.json({ success: true, guild });
    } catch (err: unknown) {
      return NextResponse.json({ error: errorMessage(err) }, { status: 400 });
    }
  }

  if (body?.action === "join" && body.guildId) {
    try {
      await supabase.from("guild_members").insert({
        guild_id: body.guildId,
        user_id: user.id,
        role: "member",
      });

      return NextResponse.json({ success: true });
    } catch (err: unknown) {
      return NextResponse.json({ error: errorMessage(err) }, { status: 400 });
    }
  }

  return NextResponse.json({ error: "Invalid action" }, { status: 400 });
}
