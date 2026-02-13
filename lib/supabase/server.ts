import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export async function createSupabaseServerClient() {
  const cookieStore = await cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options),
            );
          } catch (error) {
            console.error("[Supabase Server Client] Failed to set cookies:", {
              error: error instanceof Error ? error.message : error,
              cookies: cookiesToSet.map(({ name, value }) => ({
                name,
                value: value?.substring(0, 50) + "...",
              })),
            });

            throw new Error(
              `Failed to set authentication cookies: ${error instanceof Error ? error.message : String(error)}`,
            );
          }
        },
      },
    },
  );
}
