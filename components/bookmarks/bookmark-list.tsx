"use client";

import { useBookmarks } from "@/lib/react-query/bookmarks";
import { BookmarkCard } from "./bookmark-card";
import { EmptyState } from "./empty-state";
import { BookmarkSkeleton } from "./bookmark-skeleton";

export function BookmarkList() {
  const { data, isLoading, isError } = useBookmarks();

  if (isLoading) {
    return <BookmarkSkeleton />;
  }

  if (isError) {
    return (
      <div className="text-sm text-destructive">
        Failed to load bookmarks
      </div>
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
