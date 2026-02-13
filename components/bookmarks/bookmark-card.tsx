"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink, Trash } from "lucide-react";
import { useDeleteBookmark } from "@/lib/react-query/bookmarks";
import { Bookmark } from "@prisma/client";

export function BookmarkCard({ bookmark }: { bookmark: Bookmark }) {
  const { mutate, isPending } = useDeleteBookmark();

  return (
    <Card className="p-4 flex items-center justify-between">
      <div className="min-w-0">
        <div className="font-medium truncate">{bookmark.title}</div>

        <a
          href={bookmark.url}
          target="_blank"
          className="text-sm text-muted-foreground flex items-center gap-1 truncate hover:underline"
        >
          {bookmark.url}
          <ExternalLink className="h-3 w-3" />
        </a>
      </div>

      <Button
        variant="ghost"
        size="icon"
        disabled={isPending}
        onClick={() => mutate(bookmark.id)}
      >
        <Trash className="h-4 w-4 text-destructive" />
      </Button>
    </Card>
  );
}
