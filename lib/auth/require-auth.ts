import { redirect } from "next/navigation";
import { getServerUser } from "./server-auth";

export async function requireAuth() {
  const user = await getServerUser();

  if (!user) {
    redirect("/");
  }

  return user;
}
