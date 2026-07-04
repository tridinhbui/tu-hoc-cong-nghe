# Supabase Google OAuth Setup

## Credentials (Add in Supabase Dashboard)
- **Client ID**: From Google Cloud Console OAuth 2.0 credentials
- **Client Secret**: From Google Cloud Console OAuth 2.0 credentials  
- **Supabase Project URL**: `https://ggzhnvuneccbxxvzdtkb.supabase.co`

⚠️ **Security**: Never commit credentials to repository. Store in Supabase dashboard only.

## Step-by-Step Configuration

### 1. Vào Supabase Dashboard
- URL: https://app.supabase.com
- Login với tài khoản của bạn
- Chọn project `tuhoctaichinh`

### 2. Enable Google OAuth Provider
**Path**: Authentication → Providers

1. Kéo xuống tìm **Google**
2. Bấm nút toggle để **Enable**
3. Bạn sẽ thấy form với:
   - Client ID
   - Client Secret

### 3. Nhập Credentials

From Google Cloud Console OAuth 2.0 credentials page:

#### Client ID
Paste your Google OAuth 2.0 Client ID

#### Client Secret  
Paste your Google OAuth 2.0 Client Secret

Bấm **Save** sau khi nhập

### 4. Cấu hình Redirect URLs

**Path**: Authentication → URL Configuration

Thêm các redirect URL sau:

#### Development (localhost)
```
http://localhost:3000/auth/callback
http://localhost:3000
```

#### Production (khi deploy)
```
https://your-domain.com/auth/callback
https://your-domain.com
```

### 5. Verify Google Cloud Console

Đảm bảo redirect URI đã được thêm vào Google Cloud:

**Path**: Google Cloud Console → OAuth 2.0 IDs → Web client

**Authorized redirect URIs** phải chứa:
```
https://ggzhnvuneccbxxvzdtkb.supabase.co/auth/v1/callback
```

## Test Login

1. Mở app locally: http://localhost:3000
2. Bấm **"Đăng nhập với Google"**
3. Nên được redirect tới Google login
4. Sau khi authorize, sẽ redirect tới dashboard

## Troubleshooting

### "Invalid Client ID" error
- Verify Client ID chính xác (không có space)
- Check Google Cloud Console Authorized Redirect URIs

### Redirect URI mismatch
- Ensure `https://ggzhnvuneccbxxvzdtkb.supabase.co/auth/v1/callback` là trong Google Cloud
- Ensure `http://localhost:3000/auth/callback` hoặc domain là trong Supabase URL Config

### OAuth session expires
- User session timeout là 1 hour
- Supabase sẽ auto refresh session

## Environment Variables

Không cần thêm Google credentials vào `.env.local` — Supabase handle tất cả từ dashboard.

Current `.env.local`:
```
NEXT_PUBLIC_SUPABASE_URL=https://ggzhnvuneccbxxvzdtkb.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sb_publishable_sgPW_QCrt2aAHLdSsC2gdQ_bJ9XprKT
```

## Auth Flow Diagram

```
User clicks "Đăng nhập với Google"
    ↓
signInWithOAuth({ provider: 'google' })
    ↓
Redirect to: https://accounts.google.com/o/oauth2/auth?...
    ↓
User authorizes app in Google
    ↓
Google redirects to: https://ggzhnvuneccbxxvzdtkb.supabase.co/auth/v1/callback?code=...
    ↓
Supabase exchanges code for session
    ↓
Next.js route /auth/callback processes callback
    ↓
Supabase sets session cookies
    ↓
Redirect to /dashboard
    ↓
Dashboard loads with authenticated user
```

## Success Indicators

✓ Google provider toggle is **Enabled** in Supabase  
✓ Client ID and Secret are **saved**  
✓ Redirect URLs are **configured**  
✓ Can **"Đăng nhập với Google"** from login page  
✓ Auto-redirect to dashboard after auth  
✓ User name/email shows in dashboard header  
