import "server-only";
import { createAdminClient } from "@/lib/supabase-admin";

// CRUD over the CFA library tables (Book/Reading/Module/LessonContent/
// ModuleQuizHeader/ModuleQuizQuestion). These tables were created outside
// this repo's tracked migrations (external import, PascalCase naming - see
// supabase/migrations/20260722_cfa_module_video_interactive.sql), and until
// now had no admin UI at all - content could only be edited by hand in the
// Supabase dashboard. Every function here uses the service-role client,
// same as every other lib/admin/*.ts file.

export interface AdminBook {
  id: string;
  title: string;
}

export interface AdminReading {
  id: string;
  bookId: string;
  code: string;
  title: string;
  order: number | null;
}

export interface AdminModule {
  id: string;
  readingId: string;
  code: string;
  title: string;
  order: number | null;
  videoUrl: string | null;
  interactiveType: string | null;
}

export interface AdminQuizQuestion {
  id: string;
  headerId: string;
  questionNo: number;
  prompt: string;
  optionA: string;
  optionB: string;
  optionC: string;
  correct: string;
  explanation: string | null;
}

export async function listBooks(): Promise<AdminBook[]> {
  const supabase = createAdminClient();
  const { data, error } = await supabase.from("Book").select("id, title").order("id", { ascending: true });
  if (error) throw new Error(error.message);
  return data ?? [];
}

export async function listReadings(bookId: string): Promise<AdminReading[]> {
  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from("Reading")
    .select("*")
    .eq("bookId", bookId)
    .order("order", { ascending: true });
  if (error) throw new Error(error.message);
  return data ?? [];
}

export async function listModules(readingId: string): Promise<AdminModule[]> {
  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from("Module")
    .select("*")
    .eq("readingId", readingId)
    .order("order", { ascending: true });
  if (error) throw new Error(error.message);
  return data ?? [];
}

export interface ModuleUpdateFields {
  title?: string;
  videoUrl?: string | null;
  interactiveType?: string | null;
}

export async function updateModule(id: string, fields: ModuleUpdateFields): Promise<void> {
  const supabase = createAdminClient();
  const { error } = await supabase.from("Module").update(fields).eq("id", id);
  if (error) throw new Error(error.message);
}

export async function getModuleContent(moduleId: string): Promise<string> {
  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from("LessonContent")
    .select("content")
    .eq("moduleId", moduleId)
    .maybeSingle();
  if (error) throw new Error(error.message);
  return data?.content ?? "";
}

export async function updateModuleContent(moduleId: string, content: string): Promise<void> {
  const supabase = createAdminClient();
  const { error } = await supabase
    .from("LessonContent")
    .upsert({ moduleId, content }, { onConflict: "moduleId" });
  if (error) throw new Error(error.message);
}

export async function getModuleQuiz(moduleId: string): Promise<AdminQuizQuestion[]> {
  const supabase = createAdminClient();
  const { data: header, error: headerError } = await supabase
    .from("ModuleQuizHeader")
    .select("id")
    .eq("moduleId", moduleId)
    .maybeSingle();
  if (headerError) throw new Error(headerError.message);
  if (!header) return [];

  const { data, error } = await supabase
    .from("ModuleQuizQuestion")
    .select("*")
    .eq("headerId", header.id)
    .order("questionNo", { ascending: true });
  if (error) throw new Error(error.message);
  return data ?? [];
}

export interface QuizQuestionInput {
  id?: string;
  questionNo: number;
  prompt: string;
  optionA: string;
  optionB: string;
  optionC: string;
  correct: "A" | "B" | "C";
  explanation: string | null;
}

// Creates the ModuleQuizHeader row on first save if the module didn't have
// one yet (a module with zero quiz questions has no header row at all).
export async function upsertQuizQuestion(moduleId: string, input: QuizQuestionInput): Promise<void> {
  const supabase = createAdminClient();

  let { data: header } = await supabase.from("ModuleQuizHeader").select("id").eq("moduleId", moduleId).maybeSingle();
  if (!header) {
    const { data: created, error: createError } = await supabase
      .from("ModuleQuizHeader")
      .insert({ moduleId })
      .select("id")
      .single();
    if (createError) throw new Error(createError.message);
    header = created;
  }

  const payload = { ...input, headerId: header.id };
  const { error } = await supabase.from("ModuleQuizQuestion").upsert(payload, { onConflict: "id" });
  if (error) throw new Error(error.message);
}

export async function deleteQuizQuestion(id: string): Promise<void> {
  const supabase = createAdminClient();
  const { error } = await supabase.from("ModuleQuizQuestion").delete().eq("id", id);
  if (error) throw new Error(error.message);
}
