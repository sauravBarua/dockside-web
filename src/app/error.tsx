"use client";

export default function ErrorPage({ reset }: { reset: () => void }) {
  return (
    <>
      <h1>Something went wrong</h1>
      <p>The posts could not be loaded. Please try again.</p>
      <button type="button" onClick={reset}>
        Try again
      </button>
    </>
  );
}
