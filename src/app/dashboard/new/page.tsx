import { PostForm } from "@/components/post-form";
import { authFetch } from "@/lib/server-api";

export const dynamic = "force-dynamic";

export default async function NewPostPage() {
  // Redirects to /login when there is no valid session.
  await authFetch("/auth/me");

  return (
    <>
      <h1>New post</h1>
      <PostForm />
    </>
  );
}
