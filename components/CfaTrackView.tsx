"use client";

import type { LessonMeta } from "@/lib/lesson-types";
import type { CfaSubject } from "@/lib/cfa-track";

interface Props {
  subjects: { subject: CfaSubject; lessons: LessonMeta[] }[];
}

export default function CfaTrackView({ subjects }: Props) {
  return null;
}
