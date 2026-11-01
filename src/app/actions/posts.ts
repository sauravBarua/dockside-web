"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { ApiError, apiFetch, errorMessage } from "@/lib/api";
import { authFetch } from "@/lib/server-api";
import { getToken } from "@/lib/session";
import type { PostFormState } from "@/lib/types";

export async function savePostAction(
  _prev: PostFormState,
  formData: FormData,
): Promise<PostFormState> {
  const token = await getToken();

  if (!token) {
    redirect("/login");
  }

  const id = String(formData.get("id") ?? "");
  const values = {
    title: String(formData.get("title") ?? ""),
    content: String(formData.get("content") ?? ""),
    tags: String(formData.get("tags") ?? ""),
    published: formData.get("published") === "on",
  };

  const body = JSON.stringify({
    title: values.title,
    content: values.content,
    published: values.published,
    tags: values.tags
      .split(",")
      .map((tag) => tag.trim())
      .filter(Boolean),
  });

  try {
    await apiFetch(id ? `/posts/${encodeURIComponent(id)}` : "/posts", {
      method: id ? "PATCH" : "POST",
      headers: { Authorization: `Bearer ${token}` },
      body,
    });
  } catch (error) {
    if (error instanceof ApiError && error.status === 401) {
      redirect("/login");
    }
    return { error: errorMessage(error), values };
  }

  revalidatePath("/dashboard");
  redirect("/dashboard");
}

export async function togglePublishAction(formData: FormData): Promise<void> {
  const id = String(formData.get("id") ?? "");
  const published = formData.get("published") === "true";

  await authFetch(`/posts/${encodeURIComponent(id)}`, {
    method: "PATCH",
    body: JSON.stringify({ published }),
  });

  revalidatePath("/dashboard");
}

export async function deletePostAction(formData: FormData): Promise<void> {
  const id = String(formData.get("id") ?? "");

  await authFetch(`/posts/${encodeURIComponent(id)}`, { method: "DELETE" });

  revalidatePath("/dashboard");
}