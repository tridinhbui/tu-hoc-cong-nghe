import type { Dictionary } from "./vi";

// Typed as Dictionary on purpose: adding a key to vi.ts without adding it here
// fails `tsc` instead of silently rendering an empty label. Do not widen this
// to Partial<Dictionary>.
export const en: Dictionary = {
  nav: {
    students: "Learners",
    sectionLearn: "Learn",
    sectionPractice: "Practice",
    sectionCommunity: "Community",
    sectionProgress: "Progress",
    sectionResources: "Resources",
    quiz: "Quiz",
    notes: "Notes",
    skillTree: "Skill tree",
    studyGroup: "Study groups",
    technicalInterview: "Technical Interview",
    career: "Careers",
    stats: "Stats",
    openMenu: "Open menu",
    user: "User",
    signOut: "Sign out",
    signingOut: "Signing out...",
    coinBalanceTitle: "Coin balance - tap to open the Quick Shop",
    dailyGiftReady: "🎁 Today's login gift is ready - open it under Quests & Chests!",
  },

  common: {
    save: "Save",
    cancel: "Cancel",
    close: "Close",
    confirm: "Confirm",
    continue: "Continue",
    back: "Back",
    retry: "Try again",
    loading: "Loading...",
    saving: "Saving...",
    search: "Search",
    seeMore: "See more",
    seeAll: "See all",
    done: "Done",
    lesson: "lesson",
    lessons: "lessons",
    xp: "XP",
    coins: "Coins",
    level: "Level",
  },

  language: {
    label: "Language",
    switchTo: "Switch to {name}",
    current: "Currently {name}",
  },

  content: {
    viOnlyNotice:
      "Lesson content is currently available in Vietnamese only. The interface is in English.",
  },

  errors: {
    generic: "Something went wrong. Please try again.",
    network: "Couldn't reach the server. Check your connection and try again.",
    notFound: "We couldn't find what you were looking for.",
    unauthorized: "Please sign in to continue.",
  },

  leaderboard: {
    compositeScore: "Composite score",
    totalXp: "Total XP",
    lessonsCount: "Lessons",
    avgScore: "Avg. score",
    streakDays: "Streak",
    career: "Career",
    cfaArena: "CFA arena",
    contribution: "Contribution",
    badgesLabel: "Badges",
    gamer: "Gamer",

    scrollLeft: "Scroll left",
    scrollRight: "Scroll right",

    eyebrowCompact: "Leaderboard",
    titleCompact: "Leaderboard",
    eyebrowFull: "Leaderboard honors",
    titleFull: "Top 5 standouts",

    loadingCompact: "Loading leaderboard...",
    loadingFull: "Loading the honor roll...",
    empty: "Not enough ranking data yet.",

    nextRanks: "Next honored ranks",
    rangeCompact: "TOP 6-20",
    rangeFull: "HONOR ROLL #6-#20",

    yourRank: "Your rank",
    byMetricCompact: "{metric} ranking",
    byMetricFull: "By {metric}",

    compositeTitle: "A well-rounded score, weighted toward mastery",
    compositeDescPrefix: "Out of 1000 points:",
    compositeDescXp: "daily learning XP (login streaks don't count),",
    compositeDescExam: "level-up exams,",
    compositeDescAccuracy: "average quiz score,",
    compositeDescStreak: "streak days. Only server-graded exams count.",
    compositeLearningXp: "Learning XP",
    compositeExamPoints: "Level exams",
    compositeAccuracy: "Avg. score",
    compositeStreak: "Streak",


    units: {
      outOf1000: "/1000",
      xp: "XP",
      points: "pts",
      lessons: "lessons",
      percent: "%",
      days: "days",
      interactions: "interactions",
      honors: "badges",
    },
  },
};
