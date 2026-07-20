import * as WebBrowser from 'expo-web-browser';
import { makeRedirectUri } from 'expo-auth-session';
import { createClient } from '@thtcdn/supabase-client';

// Mirrors app/auth/callback/route.ts on web (PKCE code exchange), but
// expo-web-browser/expo-auth-session are RN-only, so this can't live in the
// shared @thtcdn/auth package alongside the email/password flows.
WebBrowser.maybeCompleteAuthSession();

export interface GoogleSignInResult {
  success: boolean;
  error?: string;
}

export async function signInWithGoogle(): Promise<GoogleSignInResult> {
  try {
    const supabase = createClient();
    const redirectTo = makeRedirectUri({ scheme: 'mobile', path: 'auth/callback' });

    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo,
        skipBrowserRedirect: true,
        queryParams: { prompt: 'select_account' },
      },
    });

    if (error || !data?.url) {
      return { success: false, error: error?.message || 'Không thể khởi tạo đăng nhập Google.' };
    }

    const result = await WebBrowser.openAuthSessionAsync(data.url, redirectTo);

    if (result.type !== 'success' || !result.url) {
      if (result.type === 'cancel' || result.type === 'dismiss') {
        return { success: false, error: '' };
      }
      return { success: false, error: 'Đăng nhập Google đã bị hủy.' };
    }

    const parsed = new URL(result.url);
    const code = parsed.searchParams.get('code');
    const oauthError = parsed.searchParams.get('error_description') || parsed.searchParams.get('error');

    if (oauthError) {
      return { success: false, error: oauthError };
    }

    if (!code) {
      return { success: false, error: 'Không nhận được mã xác thực từ Google.' };
    }

    const { error: exchangeError } = await supabase.auth.exchangeCodeForSession(code);
    if (exchangeError) {
      return { success: false, error: exchangeError.message };
    }

    return { success: true };
  } catch (err) {
    return { success: false, error: err instanceof Error ? err.message : 'Có lỗi xảy ra.' };
  }
}
