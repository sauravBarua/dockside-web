import { cookies } from "next/headers";

const COOKIE_NAME = "dockside_token";
const MAX_AGE_SECONDS = 60 * 60 * 24 * 7;

// The site is served over https exactly when the API URL is https.
const secure = (process.env.NEXT_PUBLIC_API_BASE_URL ?? "").startsWith(
  "https://",
);

export async function getToken(): Promise<string | undefined> {
  return (await cookies()).get(COOKIE_NAME)?.value;
}

export async function setToken(token: string): Promise<void> {
  (await cookies()).set(COOKIE_NAME, token, {
    httpOnly: true,
    sameSite: "lax",
    secure,
    path: "/",
    maxAge: MAX_AGE_SECONDS,
  });
}

export async function clearToken(): Promise<void> {
  (await cookies()).delete(COOKIE_NAME);
}
