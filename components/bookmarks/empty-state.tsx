"use client";

import { Bookmark, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

export function EmptyState({ onAdd }: { onAdd?: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center py-24 text-center">
      {/* Icon animation */}
      <div className="relative mb-6">
        <Bookmark className="h-14 w-14 text-muted-foreground animate-float" />
        <div className="absolute inset-0 rounded-full bg-muted/40 blur-xl animate-pulse-slow" />
      </div>

      <h3 className="text-xl font-semibold">No bookmarks yet</h3>

      <p className="mt-2 max-w-sm text-sm text-muted-foreground">
        Save important links so you can quickly access them later. Your
        bookmarks will appear here.
      </p>

      {onAdd && (
        <Button onClick={onAdd} className="mt-6" variant="secondary">
          <Plus className="mr-2 h-4 w-4" />
          Add your first bookmark
        </Button>
      )}
    </div>
  );
}
