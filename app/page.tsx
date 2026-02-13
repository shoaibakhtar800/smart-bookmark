"use client";

import { Button } from "@/components/ui/button";
import { supabaseBrowser } from "@/lib/supabase-browser";

export default function Home() {
  const login = async () => {
    await supabaseBrowser.auth.signInWithOAuth({
      provider: "google",
    });
  };

  return <Button onClick={login}>Login with Google</Button>;
}
