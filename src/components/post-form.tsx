"use client";

import Link from "next/link";
import { useActionState } from "react";
import { savePostAction } from "@/app/actions/posts";
import type { Post, PostFormState } from "@/lib/types";

const initialState: PostFormState = {};

export function PostForm({ post }: { post?: Post }) {
  const [state, formAction, pending] = useActionState(savePostAction, initialState);
  const values = state.values;

  return (
    <form action={formAction} className="form wide">
      {post && <input type="hidden" name="id" value={post.id} />}
      <label>
        Title
        <input
          name="title"
          type="text"
          required
          maxLength={200}
          defaultValue={values?.title ?? post?.title ?? ""}
        />
      </label>
      <label>
        Content
        <textarea
          name="content"
          required
          rows={12}
          maxLength={20000}
          defaultValue={values?.content ?? post?.content ?? ""}
        />
      </label>
      <label>
        Tags (comma separated, up to 5)
        <input
          name="tags"
          type="text"
          defaultValue={values?.tags ?? post?.tags.map((tag) => tag.name).join(", ") ?? ""}
        />
      </label>
      <label className="check">
        <input
          name="published"
          type="checkbox"
          defaultChecked={values?.published ?? post?.published ?? false}
        />
        Published
      </label>
      {state.error && (
        <p className="error" role="alert">
          {state.error}
        </p>
      )}
      <div className="actions">
        <button type="submit" disabled={pending}>
          {pending ? "Saving…" : post ? "Save changes" : "Create post"}
        </button>
        <Link href="/dashboard">Cancel</Link>
      </div>
    </form>
  );
}