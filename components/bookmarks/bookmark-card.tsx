"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink, Trash, Loader2 } from "lucide-react";
import { useDeleteBookmark } from "@/lib/react-query/bookmarks";
import { Bookmark } from "@prisma/client";
import { toast } from "sonner";

export function BookmarkCard({ bookmark }: { bookmark: Bookmark }) {
  const { mutate, isPending } = useDeleteBookmark();

  const onDelete = () => {
    const toastId = toast.loading("Deleting bookmark…");

    mutate(bookmark.id, {
      onSuccess: () => {
        toast.success("Bookmark deleted", { id: toastId });
      },
      onError: (error: Error) => {
        toast.error(error.message ?? "Failed to delete bookmark", {
          id: toastId,
        });
      },
    });
  };

  return (
    <Card className="w-full">
      <div className="flex items-center justify-between gap-4 px-4">
        <div className="flex-1 min-w-0">
          <div className="font-medium truncate">{bookmark.title}</div>

          <a
            href={bookmark.url}
            target="_blank"
            className="text-sm text-muted-foreground flex items-center gap-1 truncate hover:underline"
          >
            {bookmark.url}
            <ExternalLink className="h-3 w-3 flex-shrink-0" />
          </a>
        </div>

        <Button
          variant="ghost"
          size="icon"
          disabled={isPending}
          onClick={onDelete}
          className="flex-shrink-0"
        >
          {isPending ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Trash className="h-4 w-4 text-destructive" />
          )}
        </Button>
      </div>
    </Card>
  );
}
