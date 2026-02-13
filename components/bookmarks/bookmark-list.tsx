"use client";

import { useBookmarks } from "@/lib/react-query/bookmarks";
import { BookmarkCard } from "./bookmark-card";
import { EmptyState } from "./empty-state";

export function BookmarkList() {
  const { data, isLoading } = useBookmarks();

  if (isLoading) {
    return (
      <div className="text-sm text-muted-foreground">Loading bookmarks…</div>
    );
  }

  if (!data || data.length === 0) {
    return <EmptyState />;
  }

  return (
    <div className="space-y-3">
      {data.map((bookmark) => (
        <BookmarkCard key={bookmark.id} bookmark={bookmark} />
      ))}
    </div>
  );
}
