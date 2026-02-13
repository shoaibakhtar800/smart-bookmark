import { Bookmark } from "@prisma/client";

export async function fetchBookmarks(): Promise<Bookmark[]> {
  const res = await fetch("/api/bookmarks");

  if (!res.ok) {
    throw new Error("Failed to fetch bookmarks");
  }

  return res.json();
}

export async function createBookmark(input: {
  title: string;
  url: string;
}): Promise<Bookmark> {
  const res = await fetch("/api/bookmarks", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(input),
  });

  if (!res.ok) {
    const data = await res.json();
    throw new Error(data.error ?? "Failed to create bookmark");
  }

  return res.json();
}

export async function deleteBookmark(
  id: string,
): Promise<{ success: boolean }> {
  const res = await fetch(`/api/bookmarks/${id}`, {
    method: "DELETE",
  });

  if (!res.ok) {
    const data = await res.json();
    throw new Error(data.error ?? "Failed to delete bookmark");
  }

  return res.json();
}
