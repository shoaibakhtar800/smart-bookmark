import { redirect } from "next/navigation";
import { getServerUser } from "./server-auth";

export async function requireGuest() {
  const user = await getServerUser();

  if (user) {
    redirect("/bookmarks");
  }
}
