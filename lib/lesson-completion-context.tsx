"use client";

import { createContext, useContext } from "react";

// Lets a component rendered inside LessonPageLayout's `children` (e.g.
// MidpointInteractive, the "Dừng & Kiểm tra" check embedded mid-article)
// tell the layout it exists and has been answered - the layout only
// requires this before marking the lesson complete when a midpoint
// question is actually present. Two separate quiz components
// (mid-article MidpointInteractive + the sidebar "Kiểm tra nhanh" in
// LessonPageLayout itself) were previously independent; completion only
// checked the sidebar one, which was misleading once the lesson also
// visibly required "hoàn thành quiz" including the mid-article check.
export interface LessonCompletionApi {
  registerMidpoint: () => void;
  markMidpointDone: () => void;
}

export const LessonCompletionContext = createContext<LessonCompletionApi | null>(null);

export function useLessonCompletion(): LessonCompletionApi | null {
  return useContext(LessonCompletionContext);
}
