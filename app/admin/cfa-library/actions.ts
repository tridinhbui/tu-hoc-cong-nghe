"use server";

import { requireAdmin } from "@/lib/admin-auth";
import {
  listBooks,
  listReadings,
  listModules,
  updateModule,
  getModuleContent,
  updateModuleContent,
  getModuleQuiz,
  upsertQuizQuestion,
  deleteQuizQuestion,
  type ModuleUpdateFields,
  type QuizQuestionInput,
} from "@/lib/admin/cfa-library";

export async function listBooksAction() {
  await requireAdmin();
  return listBooks();
}

export async function listReadingsAction(bookId: string) {
  await requireAdmin();
  return listReadings(bookId);
}

export async function listModulesAction(readingId: string) {
  await requireAdmin();
  return listModules(readingId);
}

export async function updateModuleAction(id: string, fields: ModuleUpdateFields) {
  await requireAdmin();
  await updateModule(id, fields);
}

export async function getModuleContentAction(moduleId: string) {
  await requireAdmin();
  return getModuleContent(moduleId);
}

export async function updateModuleContentAction(moduleId: string, content: string) {
  await requireAdmin();
  await updateModuleContent(moduleId, content);
}

export async function getModuleQuizAction(moduleId: string) {
  await requireAdmin();
  return getModuleQuiz(moduleId);
}

export async function upsertQuizQuestionAction(moduleId: string, input: QuizQuestionInput) {
  await requireAdmin();
  await upsertQuizQuestion(moduleId, input);
}

export async function deleteQuizQuestionAction(id: string) {
  await requireAdmin();
  await deleteQuizQuestion(id);
}
