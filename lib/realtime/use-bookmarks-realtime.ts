"use client";

import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import { bookmarksQueryKey } from "@/lib/react-query/bookmarks";

export function useBookmarksRealtime(userId: string) {
  const queryClient = useQueryClient();

  useEffect(() => {
    const supabase = createSupabaseBrowserClient();

    const channel = supabase
      .channel("bookmarks-realtime")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "Bookmark",
          filter: `userId=eq.${userId}`,
        },
        () => {
          queryClient.invalidateQueries({
            queryKey: bookmarksQueryKey,
          });
        },
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [queryClient, userId]);
}
