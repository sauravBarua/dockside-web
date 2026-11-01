import { redirect } from "next/navigation";
import { ApiError, apiFetch } from "./api";
import { getToken } from "./session";

export async function authFetch<T = void>(
  path: string,
  init: RequestInit = {},
): Promise<T> {
  const token = await getToken();

  if (!token) {
    redirect("/login");
  }

  const headers = new Headers(init.headers);
  headers.set("Authorization", `Bearer ${token}`);

  try {
    return await apiFetch<T>(path, { ...init, headers });
  } catch (error) {
    if (error instanceof ApiError && error.status === 401) {
      redirect("/login");
    }
    throw error;
  }
}
