"use client";

import { useCreateBookmark } from "@/lib/react-query/bookmarks";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Plus } from "lucide-react";
import { useState } from "react";

export function AddBookmarkForm() {
  const { mutate, isPending } = useCreateBookmark();
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");

  const submit = () => {
    if (!title || !url) return;

    mutate(
      { title, url },
      {
        onSuccess: () => {
          setTitle("");
          setUrl("");
        },
      }
    );
  };

  return (
    <Card>
      <CardContent className="p-4 space-y-3">
        <div className="text-sm font-medium">
          Add new bookmark
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          <Input
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <Input
            placeholder="https://example.com"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
        </div>

        <div className="flex justify-end">
          <Button onClick={submit} disabled={isPending}>
            <Plus className="h-4 w-4 mr-2" />
            Add bookmark
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
