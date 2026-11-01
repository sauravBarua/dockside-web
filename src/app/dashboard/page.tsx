import Link from "next/link";
import { deletePostAction, togglePublishAction } from "@/app/actions/posts";
import { ConfirmButton } from "@/components/confirm-button";
import { formatDate } from "@/lib/format";
import { authFetch } from "@/lib/server-api";
import type { Post, User } from "@/lib/types";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const [user, mine] = await Promise.all([
    authFetch<User>("/auth/me"),
    authFetch<{ items: Post[] }>("/posts/mine"),
  ]);

  return (
    <>
      <h1>My posts</h1>
      <p className="meta">Signed in as {user.name}</p>

      {mine.items.length === 0 ? (
        <p>You have no posts yet.</p>
      ) : (
        <ul className="posts">
          {mine.items.map((post) => (
            <li key={post.id}>
              <h2>{post.published ? <Link href={`/posts/${post.slug}`}>{post.title}</Link> : post.title}</h2>
              <p className="meta">
                <span className={`badge ${post.published ? "published" : "draft"}`}>
                  {post.published ? "Published" : "Draft"}
                </span>{" "}
                · Updated {formatDate(post.updatedAt)}
              </p>
              <div className="actions">
                <form action={togglePublishAction}>
                  <input type="hidden" name="id" value={post.id} />
                  <input type="hidden" name="published" value={String(!post.published)} />
                  <button type="submit">{post.published ? "Unpublish" : "Publish"}</button>
                </form>
                <form action={deletePostAction}>
                  <input type="hidden" name="id" value={post.id} />
                  <ConfirmButton message="Delete this post? This cannot be undone.">Delete</ConfirmButton>
                </form>
              </div>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}