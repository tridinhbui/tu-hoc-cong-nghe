import type { Dictionary } from "./vi";

// Typed as Dictionary on purpose: adding a key to vi.ts without adding it here
// fails `tsc` instead of silently rendering an empty label. Do not widen this
// to Partial<Dictionary>.
export const en: Dictionary = {
  nav: {
    students: "Learners",
    quiz: "Quiz",
    notes: "Notes",
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
};
