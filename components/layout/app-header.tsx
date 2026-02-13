"use client";

import { Button } from "@/components/ui/button";
import { Bookmark, LogOut } from "lucide-react";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

export function AppHeader() {
  const router = useRouter();
  const supabase = createSupabaseBrowserClient();

  const logout = async () => {
    await supabase.auth.signOut();
    router.push("/");
  };

  return (
    <header className="border-b bg-background">
      <div className="mx-auto max-w-5xl flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-2 font-semibold">
          <Bookmark className="h-5 w-5" />
          Smart Bookmark
        </div>

        <Button variant="ghost" size="sm" onClick={logout}>
          <LogOut className="h-4 w-4 mr-2" />
          Logout
        </Button>
      </div>
    </header>
  );
}
