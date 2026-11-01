import { notFound } from "next/navigation";
import { PostForm } from "@/components/post-form";
import { authFetch } from "@/lib/server-api";
import type { Post } from "@/lib/types";

export const dynamic = "force-dynamic";

export default async function EditPostPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const mine = await authFetch<{ items: Post[] }>("/posts/mine");
  const post = mine.items.find((item) => item.id === id);

  if (!post) {
    notFound();
  }

  return (
    <>
      <h1>Edit post</h1>
      <PostForm post={post} />
    </>
  );
}