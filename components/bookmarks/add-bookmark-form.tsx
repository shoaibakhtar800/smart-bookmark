"use client";

import { useCreateBookmark } from "@/lib/react-query/bookmarks";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Plus, Loader2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export function AddBookmarkForm() {
  const { mutate, isPending } = useCreateBookmark();
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");

  const submit = () => {
    if (!title || !url) {
      toast.error("Title and URL are required");
      return;
    }

    const toastId = toast.loading("Adding bookmark…");

    mutate(
      { title, url },
      {
        onSuccess: () => {
          toast.success("Bookmark added", { id: toastId });
          setTitle("");
          setUrl("");
        },
        onError: (error: Error) => {
          toast.error(error.message ?? "Failed to add bookmark", {
            id: toastId,
          });
        },
      },
    );
  };

  return (
    <Card>
      <CardContent className="p-4 space-y-3">
        <div className="text-sm font-medium">Add new bookmark</div>

        <div className="grid gap-3 sm:grid-cols-2">
          <Input
            placeholder="Title"
            value={title}
            disabled={isPending}
            onChange={(e) => setTitle(e.target.value)}
          />

          <Input
            placeholder="https://example.com"
            value={url}
            disabled={isPending}
            onChange={(e) => setUrl(e.target.value)}
          />
        </div>

        <div className="flex justify-end">
          <Button onClick={submit} disabled={isPending}>
            {isPending ? (
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
            ) : (
              <Plus className="h-4 w-4 mr-2" />
            )}
            Add bookmark
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
