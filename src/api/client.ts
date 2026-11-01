export type FieldErrors = Record<string, string[] | undefined>;

export class ApiError extends Error {
  readonly status: number;
  readonly fields: FieldErrors;

  constructor(status: number, message: string, fields: FieldErrors = {}) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.fields = fields;
  }
}

interface ErrorBody {
  error: string;
  fields?: FieldErrors;
}

function isErrorBody(data: unknown): data is ErrorBody {
  return typeof data === 'object' && data !== null && 'error' in data && typeof data.error === 'string';
}

interface RequestOptions {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
  body?: unknown;
}

// Always same-origin /api (Vite proxy in dev, Vercel rewrite in prod), so the session cookie goes along by default
export async function apiRequest<T>(path: string, { method = 'GET', body }: RequestOptions = {}): Promise<T> {
  let response: Response;
  try {
    response = await fetch(`/api${path}`, {
      method,
      headers: body === undefined ? undefined : { 'Content-Type': 'application/json' },
      body: body === undefined ? undefined : JSON.stringify(body),
    });
  } catch (error) {
    console.error(`API ${method} ${path} failed:`, error);
    throw new ApiError(0, 'Cannot reach the server. Check your connection and try again.');
  }

  if (response.status === 204) return undefined as T;

  // Not JSON when the API itself is down and the proxy answers instead
  const data: unknown = await response.json().catch(() => null);

  if (!response.ok) {
    if (isErrorBody(data)) throw new ApiError(response.status, data.error, data.fields);
    throw new ApiError(
      response.status,
      response.status >= 502 ? 'The server is unavailable right now. Try again in a moment.' : `Request failed (${response.status})`,
    );
  }

  return data as T;
}
