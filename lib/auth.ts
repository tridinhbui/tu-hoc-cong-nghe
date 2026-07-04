export interface User {
  id: string;
  name: string;
  email: string;
  createdAt: string;
}

const SESSION_KEY = "thtcdn_session";

export function loginOrRegister(name: string, email: string): User {
  const user: User = {
    id: email.toLowerCase().replace(/[^a-z0-9]/g, "_"),
    name: name.trim(),
    email: email.toLowerCase().trim(),
    createdAt: new Date().toISOString(),
  };
  if (typeof window !== "undefined") {
    localStorage.setItem(SESSION_KEY, JSON.stringify(user));
  }
  return user;
}

export function getSession(): User | null {
  if (typeof window === "undefined") return null;
  const s = localStorage.getItem(SESSION_KEY);
  if (!s) return null;
  try { return JSON.parse(s); } catch { return null; }
}

export function logout(): void {
  if (typeof window !== "undefined") {
    localStorage.removeItem(SESSION_KEY);
  }
}
