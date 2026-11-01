export function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-GB", {
    dateStyle: "medium",
    timeZone: "UTC",
  });
}

export function excerpt(content: string, max = 160): string {
  return content.length > max ? `${content.slice(0, max).trimEnd()}…` : content;
}
