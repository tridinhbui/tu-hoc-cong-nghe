import { NextRequest, NextResponse } from "next/server";
import { createServerSupabaseClient } from "@/lib/supabase-server";
import { getServerDictionary } from "@/lib/i18n/server";

// GET active challenge for the week
export async function GET(request: NextRequest) {
  const supabase = await createServerSupabaseClient();
  
  // Lấy ngày đầu tuần hiện tại (Thứ Hai)
  const today = new Date();
  const day = today.getDay();
  const diff = today.getDate() - day + (day === 0 ? -6 : 1);
  const monday = new Date(today.setDate(diff));
  monday.setHours(0, 0, 0, 0);

  const { data: challenge, error } = await supabase
    .from("weekly_challenges")
    .select("*")
    .gte("week_start_date", monday.toISOString().split("T")[0])
    .order("week_start_date", { ascending: true })
    .limit(1)
    .maybeSingle();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  if (!challenge) {
    // Mã cũ gọi đây là "mock data", nhưng nó KHÔNG phải dữ liệu dự phòng:
    // bảng `weekly_challenges` không có migration nào seed và không chỗ nào
    // trong repo ghi vào, nên nhánh này là thứ mọi người dùng thực sự thấy.
    // Vì vậy câu chữ của nó phải đi qua từ điển như mọi câu chữ khác.
    //
    // `correct` ở lại đây, không vào từ điển: nó là chỉ số vào mảng `options`,
    // và một bản dịch xếp sai thứ tự sẽ chấm sai người học.
    const t = await getServerDictionary();
    const c = t.weeklyChallenge;
    const mockChallenge = {
      id: "fpt-mock-challenge-uuid",
      week_start_date: monday.toISOString().split("T")[0],
      title: c.mockTitle,
      description: c.mockDescription,
      difficulty: "gold",
      case_study_url: "https://example.com/fpt-bctc-2025.pdf",
      questions: [
        { prompt: c.q1Prompt, options: c.q1Options, correct: 0 },
        { prompt: c.q2Prompt, options: c.q2Options, correct: 0 },
        { prompt: c.q3Prompt, options: c.q3Options, correct: 1 },
        { prompt: c.q4Prompt, options: c.q4Options, correct: 0 },
        { prompt: c.q5Prompt, options: c.q5Options, correct: 1 },
      ],
      xp_reward: 800,
      coin_reward: 100,
    };
    return NextResponse.json(mockChallenge);
  }

  // Thử thách lấy từ Supabase thì KHÔNG có đường dịch nào. Nội dung nằm trong
  // cơ sở dữ liệu, giống quiz module CFA mà AGENTS.md đã ghi: không script
  // tĩnh nào với tới được, và chỗ duy nhất chặn được là đường ghi. Hiện chưa
  // có đường ghi nào, nên chưa có gì để chặn - ghi lại để lần đầu ai đó thêm
  // một hàng vào bảng ấy thì biết là mình vừa tạo ra nội dung không dịch được.
  return NextResponse.json(challenge);
}

// POST: Submit challenge answers
export async function POST(request: NextRequest) {
  const supabase = await createServerSupabaseClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = (await request.json().catch(() => null)) as {
    challengeId?: string;
    answers?: number[]; // indices of answers matching the questions
  } | null;

  const challengeId = body?.challengeId;
  const userAnswers = body?.answers;

  if (!challengeId || !Array.isArray(userAnswers)) {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }

  // Lấy thông tin challenge
  let challenge;
  if (challengeId === "fpt-mock-challenge-uuid") {
    challenge = {
      id: "fpt-mock-challenge-uuid",
      difficulty: "gold",
      questions: [
        { correct: 0 },
        { correct: 0 },
        { correct: 1 },
        { correct: 0 },
        { correct: 1 },
      ],
      xp_reward: 800,
      coin_reward: 100,
    };
  } else {
    const { data } = await supabase
      .from("weekly_challenges")
      .select("*")
      .eq("id", challengeId)
      .single();
    challenge = data;
  }

  if (!challenge) {
    return NextResponse.json({ error: "Challenge not found" }, { status: 404 });
  }

  // Tính điểm
  let score = 0;
  const questionsList = challenge.questions as { correct: number }[];
  questionsList.forEach((q, index) => {
    if (userAnswers[index] === q.correct) {
      score++;
    }
  });

  // Tính phần thưởng
  let xpEarned = 0;
  let coinsEarned = 0;

  if (score >= 3) { // Phải đạt tối thiểu 3/5 câu để nhận thưởng
    const difficultyMultiplier = challenge.difficulty === "gold" ? 1.0 : challenge.difficulty === "silver" ? 0.5 : 0.25;
    xpEarned = Math.min(50, challenge.xp_reward);
    coinsEarned = challenge.coin_reward;

    // Làm đúng 5/5 ngay lần đầu: Nhân hệ số 1.5 XP
    if (score === 5) {
      xpEarned = Math.min(50, Math.floor(xpEarned * 1.5));
    }
  }

  // Lưu lịch sử
  if (challengeId !== "fpt-mock-challenge-uuid") {
    await supabase
      .from("user_challenge_attempts")
      .upsert({
        user_id: user.id,
        challenge_id: challenge.id,
        score,
        xp_earned: xpEarned,
        coins_earned: coinsEarned,
        completed_at: new Date().toISOString()
      }, { onConflict: "user_id,challenge_id" });

    // Cập nhật XP/Coins của User Profile
    if (coinsEarned > 0) {
      const { data: profile } = await supabase
        .from("user_profiles")
        .select("coins")
        .eq("id", user.id)
        .single();
      const currentCoins = profile?.coins ?? 0;

      await supabase
        .from("user_profiles")
        .update({
          coins: currentCoins + coinsEarned,
          updated_at: new Date().toISOString()
        })
        .eq("id", user.id);
    }

    await supabase.from("game_sessions").insert({
      user_id: user.id,
      game_type: "weekly-case-challenge",
      score,
      total: questionsList.length,
      xp_earned: xpEarned,
    });
  }

  return NextResponse.json({
    success: true,
    score,
    totalQuestions: questionsList.length,
    xpEarned,
    coinsEarned,
    passed: score >= 3,
  });
}
