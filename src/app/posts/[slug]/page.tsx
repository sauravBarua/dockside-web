import Link from "next/link";
import { notFound } from "next/navigation";
import { ApiError, apiFetch } from "@/lib/api";
import { formatDate } from "@/lib/format";
import type { Post } from "@/lib/types";

export const dynamic = "force-dynamic";

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  const post = await apiFetch<Post>(`/posts/${encodeURIComponent(slug)}`).catch((error) => {
    if (error instanceof ApiError && error.status === 404) {
      notFound();
    }
    throw error;
  });

  return (
    <article>
      <p>
        <Link href="/">← All posts</Link>
      </p>
      <h1>{post.title}</h1>
      <p className="meta">
        {post.author.name} · {formatDate(post.createdAt)}
      </p>
      <nav aria-label="Tags" className="tags">
        {post.tags.map((tag) => (
          <Link key={tag.name} href={`/?tag=${encodeURIComponent(tag.name)}`}>
            {tag.name}
          </Link>
        ))}
      </nav>
      <div className="content">{post.content}</div>
    </article>
  );
}