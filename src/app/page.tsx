import { apiFetch } from "@/lib/api";
import type { PostList } from "@/lib/types";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const data = await apiFetch<PostList>("/posts?limit=10");

  return (
    <main>
      <h1>Dockside</h1>
      <p>{data.total} published posts</p>
      <ul>
        {data.items.map((post) => (
          <li key={post.id}>
            {post.title} by {post.author.name}
          </li>
        ))}
      </ul>
    </main>
  );
}