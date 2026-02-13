"use client";

import { useBookmarksRealtime } from "@/lib/realtime/use-bookmarks-realtime";

export function RealtimeBridge({ userId }: { userId: string }) {
  useBookmarksRealtime(userId);
  return null;
}
