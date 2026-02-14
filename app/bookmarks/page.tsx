import { AddBookmarkForm } from "@/components/bookmarks/add-bookmark-form";
import { BookmarkList } from "@/components/bookmarks/bookmark-list";
import { RealtimeBridge } from "@/components/bookmarks/realtime-bridge";
import { AppHeader } from "@/components/layout/app-header";
import { requireAuth } from "@/lib/auth/require-auth";

export default async function BookmarksPage() {
  const user = await requireAuth();

  return (
    <div className="min-h-screen bg-muted/40">
      <AppHeader />

      <main className="mx-auto max-w-5xl px-4 py-6 space-y-6">
        <RealtimeBridge userId={user.id} />

        <AddBookmarkForm />
        <BookmarkList />
      </main>
    </div>
  );
}
