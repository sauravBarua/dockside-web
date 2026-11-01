"use server";

import { redirect } from "next/navigation";
import { apiFetch, errorMessage } from "@/lib/api";
import { clearToken, setToken } from "@/lib/session";
import type { AuthResponse, FormState } from "@/lib/types";

export async function loginAction(_prev: FormState, formData: FormData): Promise<FormState> {
  const body = {
    email: String(formData.get("email") ?? ""),
    password: String(formData.get("password") ?? ""),
  };

  try {
    const data = await apiFetch<AuthResponse>("/auth/login", {
      method: "POST",
      body: JSON.stringify(body),
    });
    await setToken(data.token);
  } catch (error) {
    return { error: errorMessage(error) };
  }

  redirect("/dashboard");
}

export async function registerAction(_prev: FormState, formData: FormData): Promise<FormState> {
  const body = {
    name: String(formData.get("name") ?? ""),
    email: String(formData.get("email") ?? ""),
    password: String(formData.get("password") ?? ""),
  };

  try {
    const data = await apiFetch<AuthResponse>("/auth/register", {
      method: "POST",
      body: JSON.stringify(body),
    });
    await setToken(data.token);
  } catch (error) {
    return { error: errorMessage(error) };
  }

  redirect("/dashboard");
}

export async function logoutAction(): Promise<void> {
  await clearToken();
  redirect("/");
}