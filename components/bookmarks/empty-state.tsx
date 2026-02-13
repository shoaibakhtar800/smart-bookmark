import { Bookmark } from "lucide-react";

export function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <Bookmark className="h-10 w-10 text-muted-foreground mb-4" />
      <div className="font-medium">No bookmarks yet</div>
      <div className="text-sm text-muted-foreground">
        Add your first bookmark to get started
      </div>
    </div>
  );
}
