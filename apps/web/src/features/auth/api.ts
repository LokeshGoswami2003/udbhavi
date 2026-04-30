import type {
  AuthSessionResponse,
  AuthTokensResponse,
  StoredAuthSession,
} from "@/features/auth/types";

const DEFAULT_API_BASE_URL = "http://127.0.0.1:8000";

type AuthPayload = {
  email: string;
  password: string;
};

export async function login(payload: AuthPayload): Promise<AuthTokensResponse> {
  return requestJson<AuthTokensResponse>("/auth/login", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export async function signup(payload: AuthPayload): Promise<AuthTokensResponse> {
  return requestJson<AuthTokensResponse>("/auth/signup", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export async function refresh(refreshToken: string): Promise<AuthTokensResponse> {
  return requestJson<AuthTokensResponse>("/auth/refresh", {
    method: "POST",
    body: JSON.stringify({ refresh_token: refreshToken }),
  });
}

export async function logout(refreshToken: string): Promise<void> {
  await requestJson("/auth/logout", {
    method: "POST",
    body: JSON.stringify({ refresh_token: refreshToken }),
  });
}

export async function getCurrentSession(
  accessToken: string,
): Promise<AuthSessionResponse> {
  return requestJson<AuthSessionResponse>("/auth/me", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
}

export function toStoredAuthSession(
  response: AuthTokensResponse,
): StoredAuthSession {
  return {
    accessToken: response.access_token,
    refreshToken: response.refresh_token,
    user: response.user,
  };
}

async function requestJson<T>(
  path: string,
  options: RequestInit,
): Promise<T> {
  const response = await fetch(`${getApiBaseUrl()}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(options.headers ?? {}),
    },
  });

  if (!response.ok) {
    const fallbackMessage = "Something went wrong. Please try again.";
    const errorPayload = (await response.json().catch(() => null)) as
      | { error?: { message?: string } }
      | null;

    throw new Error(errorPayload?.error?.message ?? fallbackMessage);
  }

  if (response.status === 204) {
    return undefined as T;
  }

  return (await response.json()) as T;
}

function getApiBaseUrl(): string {
  return process.env.NEXT_PUBLIC_API_BASE_URL ?? DEFAULT_API_BASE_URL;
}
