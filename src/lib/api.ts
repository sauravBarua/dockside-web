const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

if (!baseUrl) {
  throw new Error("NEXT_PUBLIC_API_BASE_URL is not set");
}

export class ApiError extends Error {
  status: number;
  errors?: Record<string, string[]>;

  constructor(
    status: number,
    message: string,
    errors?: Record<string, string[]>,
  ) {
    super(message);
    this.status = status;
    this.errors = errors;
  }
}

export async function apiFetch<T>(
  path: string,
  init: RequestInit = {},
): Promise<T> {
  const headers = new Headers(init.headers);
  if (init.body && !headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }

  const res = await fetch(`${baseUrl}${path}`, {
    cache: "no-store",
    ...init,
    headers,
  });

  if (!res.ok) {
    const body = await res.json().catch(() => null);
    throw new ApiError(
      res.status,
      body?.message ?? res.statusText,
      body?.errors,
    );
  }

  if (res.status === 204) {
    return undefined as T;
  }

  return res.json() as Promise<T>;
}

export function errorMessage(error: unknown): string {
  if (error instanceof ApiError) {
    const firstField = error.errors
      ? Object.entries(error.errors)[0]
      : undefined;
    return firstField ? `${firstField[0]}: ${firstField[1][0]}` : error.message;
  }
  return "Could not reach the server. Please try again.";
}
