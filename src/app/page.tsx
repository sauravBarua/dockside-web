import Link from "next/link";
import { apiFetch } from "@/lib/api";
import { excerpt, formatDate } from "@/lib/format";
import type { PostList, TagCount } from "@/lib/types";

export const dynamic = "force-dynamic";

// Small on purpose, so pagination is visible with the 3 seeded posts.
const PAGE_SIZE = 2;

type SearchParams = Promise<{ page?: string | string[]; tag?: string | string[] }>;

function first(value: string | string[] | undefined): string | undefined {
  return Array.isArray(value) ? value[0] : value;
}

function listHref(page: number, tag?: string): string {
  const params = new URLSearchParams();
  if (tag) params.set("tag", tag);
  if (page > 1) params.set("page", String(page));
  const query = params.toString();
  return query ? `/?${query}` : "/";
}

export default async function HomePage({ searchParams }: { searchParams: SearchParams }) {
  const query = await searchParams;
  const tag = first(query.tag)?.trim() || undefined;
  const page = Math.max(1, Math.floor(Number(first(query.page))) || 1);

  const params = new URLSearchParams({ page: String(page), limit: String(PAGE_SIZE) });
  if (tag) params.set("tag", tag);

  const [data, tags] = await Promise.all([
    apiFetch<PostList>(`/posts?${params.toString()}`),
    apiFetch<TagCount[]>("/tags"),
  ]);

  const totalPages = Math.max(1, Math.ceil(data.total / data.limit));

  return (
    <>
      <h1>{tag ? `Posts tagged "${tag}"` : "Latest posts"}</h1>

      <nav aria-label="Tags" className="tags">
        <Link href="/" className={tag ? undefined : "active"}>
          all
        </Link>
        {tags
          .filter((item) => item.postCount > 0)
          .map((item) => (
            <Link
              key={item.name}
              href={listHref(1, item.name)}
              className={item.name === tag ? "active" : undefined}
            >
              {item.name} ({item.postCount})
            </Link>
          ))}
      </nav>

      {data.items.length === 0 ? (
        <p>No posts found.</p>
      ) : (
        <ul className="posts">
          {data.items.map((post) => (
            <li key={post.id}>
              <h2>
                <Link href={`/posts/${post.slug}`}>{post.title}</Link>
              </h2>
              <p className="meta">
                {post.author.name} · {formatDate(post.createdAt)}
              </p>
              <p>{excerpt(post.content)}</p>
            </li>
          ))}
        </ul>
      )}

      {totalPages > 1 && (
        <nav aria-label="Pagination" className="pager">
          {page > 1 ? <Link href={listHref(page - 1, tag)}>← Previous</Link> : <span />}
          <span>
            Page {page} of {totalPages}
          </span>
          {page < totalPages ? <Link href={listHref(page + 1, tag)}>Next →</Link> : <span />}
        </nav>
      )}
    </>
  );
}