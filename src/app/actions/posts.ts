"use server";

import { revalidatePath } from "next/cache";
import { authFetch } from "@/lib/server-api";

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
