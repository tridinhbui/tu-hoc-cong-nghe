import { createClient } from "@thtcdn/supabase-client";

export interface AuthError {
  message: string;
  code?: string;
}

export async function signUp(
  email: string,
  password: string,
  fullName: string
): Promise<{ success: boolean; error?: AuthError }> {
  try {
    const supabase = createClient();
    const { error } = await supabase.auth.signUp({
      email: email.toLowerCase().trim(),
      password,
      options: {
        data: { full_name: fullName.trim() },
      },
    });

    if (error) {
      return {
        success: false,
        error: { message: error.message, code: error.code },
      };
    }

    return { success: true };
  } catch (err) {
    return {
      success: false,
      error: { message: err instanceof Error ? err.message : "Unknown error" },
    };
  }
}

export async function signIn(
  email: string,
  password: string
): Promise<{ success: boolean; error?: AuthError }> {
  try {
    const supabase = createClient();
    const { error } = await supabase.auth.signInWithPassword({
      email: email.toLowerCase().trim(),
      password,
    });

    if (error) {
      return {
        success: false,
        error: { message: error.message, code: error.code },
      };
    }

    return { success: true };
  } catch (err) {
    return {
      success: false,
      error: { message: err instanceof Error ? err.message : "Unknown error" },
    };
  }
}

export async function signOut(): Promise<{ success: boolean; error?: AuthError }> {
  try {
    const supabase = createClient();
    const { error } = await supabase.auth.signOut();

    if (error) {
      return {
        success: false,
        error: { message: error.message, code: error.code },
      };
    }

    return { success: true };
  } catch (err) {
    return {
      success: false,
      error: { message: err instanceof Error ? err.message : "Unknown error" },
    };
  }
}

export async function getSession() {
  try {
    const supabase = createClient();
    const { data: { session }, error } = await supabase.auth.getSession();

    if (error) throw error;
    return session;
  } catch (err) {
    console.error("Failed to get session:", err);
    return null;
  }
}

export async function resetPassword(email: string): Promise<{ success: boolean; error?: AuthError }> {
  try {
    const supabase = createClient();
    const { error } = await supabase.auth.resetPasswordForEmail(
      email.toLowerCase().trim()
    );

    if (error) {
      return {
        success: false,
        error: { message: error.message, code: error.code },
      };
    }

    return { success: true };
  } catch (err) {
    return {
      success: false,
      error: { message: err instanceof Error ? err.message : "Unknown error" },
    };
  }
}
