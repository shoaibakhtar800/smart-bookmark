import { requireGuest } from "@/lib/auth/require-guest";
import { LoginCard } from "@/components/auth/login-card";

export default async function HomePage() {
  await requireGuest();

  return (
    <main className="min-h-screen flex items-center justify-center">
      <LoginCard />
    </main>
  );
}
