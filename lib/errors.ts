/**
 * Centralized Error Handling
 * Provides consistent error handling across the application
 */

export class AppError extends Error {
  constructor(
    message: string,
    public code: string,
    public statusCode: number = 500,
    public details?: unknown
  ) {
    super(message);
    this.name = 'AppError';
  }
}

/**
 * Handle Supabase errors consistently
 */
export function handleSupabaseError(error: unknown): AppError {
  if (!error) {
    return new AppError('Unknown error', 'UNKNOWN_ERROR', 500);
  }

  if (typeof error !== 'object' || error === null) {
    return new AppError('Unknown error', 'UNKNOWN_ERROR', 500);
  }

  const supabaseError = error as {
    code?: string;
    message?: string;
    details?: unknown;
  };

  // Handle specific Supabase error codes
  switch (supabaseError.code) {
    case 'PGRST116':
      return new AppError('Resource not found', 'NOT_FOUND', 404);
    case '23505':
      return new AppError('Resource already exists', 'CONFLICT', 409);
    case '23503':
      return new AppError('Related resource not found', 'FOREIGN_KEY_ERROR', 400);
    case '23502':
      return new AppError('Required field missing', 'REQUIRED_FIELD', 400);
    case '42501':
      return new AppError('Permission denied', 'PERMISSION_DENIED', 403);
    case '42P01':
    // PostgREST's own code when a table/view isn't in its schema cache yet
    // (e.g. migration ran but PostgREST hasn't reloaded, or the table is
    // genuinely missing) - surfaces as a distinct code from Postgres's 42P01.
    case 'PGRST205':
      return new AppError('Table does not exist', 'TABLE_NOT_FOUND', 500);
    default:
      console.error('Unhandled Supabase error:', error);
      return new AppError(
        supabaseError.message || 'Database error',
        'DATABASE_ERROR',
        500,
        supabaseError.details
      );
  }
}

/**
 * Handle API route errors
 */
export function handleApiError(error: unknown): Response {
  if (error instanceof AppError) {
    return Response.json(
      {
        error: error.message,
        code: error.code,
        details: error.details,
      },
      { status: error.statusCode }
    );
  }

  if (error instanceof Error) {
    console.error('Unhandled error:', error);
    return Response.json(
      { error: error.message, code: 'INTERNAL_ERROR' },
      { status: 500 }
    );
  }

  console.error('Unknown error:', error);
  return Response.json(
    { error: 'An unexpected error occurred', code: 'UNKNOWN_ERROR' },
    { status: 500 }
  );
}

/**
 * Safe async wrapper for API routes
 */
export async function withErrorHandling<T>(
  fn: () => Promise<T>
): Promise<{ data: T | null; error: AppError | null }> {
  try {
    const data = await fn();
    return { data, error: null };
  } catch (error) {
    if (error instanceof AppError) {
      return { data: null, error };
    }
    
    // Handle Supabase errors
    if (error && typeof error === 'object' && 'code' in error) {
      const appError = handleSupabaseError(error);
      return { data: null, error: appError };
    }
    
    // Handle generic errors
    const appError = new AppError(
      error instanceof Error ? error.message : 'Unknown error',
      'INTERNAL_ERROR',
      500
    );
    return { data: null, error: appError };
  }
}

/**
 * Log error with context
 */
export function logError(context: string, error: unknown, metadata?: Record<string, unknown>) {
  const errorInfo = {
    context,
    timestamp: new Date().toISOString(),
    error: error instanceof Error ? {
      message: error.message,
      name: error.name,
      stack: error.stack,
    } : error,
    metadata,
  };
  
  console.error('[Error]', JSON.stringify(errorInfo, null, 2));
}

/**
 * Thông điệp lỗi để hiển thị cho người dùng, lấy từ một giá trị `unknown`.
 *
 * Mọi khối catch đều nhận `unknown` chứ không nhận `Error`, vì JavaScript cho
 * phép ném bất cứ thứ gì. Khai `catch (e: any)` rồi đọc `e.message` là cách
 * quen thuộc để né việc đó, nhưng nó tắt luôn phần kiểm tra kiểu ở đúng chỗ
 * dữ liệu ít đáng tin nhất - và `e.message` sẽ là `undefined` in ra màn hình
 * khi thứ được ném là một chuỗi hay một object thường.
 */
export function errorMessage(error: unknown, fallback = "Đã có lỗi xảy ra."): string {
  if (error instanceof Error && error.message) return error.message;
  if (typeof error === "string" && error) return error;
  if (typeof error === "object" && error !== null) {
    const message = (error as { message?: unknown }).message;
    if (typeof message === "string" && message) return message;
  }
  return fallback;
}
