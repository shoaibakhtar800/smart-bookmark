"use client";

import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";

export default function BookmarksError({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <div className="flex flex-col items-center justify-center py-24 px-4 text-center space-y-4">
      <AlertTriangle className="h-10 w-10 text-destructive" />

      <h2 className="text-xl font-semibold">Failed to load bookmarks</h2>

      <p className="text-sm text-muted-foreground max-w-sm">
        {error.message || "Something went wrong while loading your bookmarks. You can try again."}
      </p>

      <Button onClick={reset}>Retry</Button>
    </div>
  );
}
