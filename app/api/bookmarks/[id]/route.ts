import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAuthenticatedUser } from "@/lib/auth/get-user";
import { bookmarkIdSchema } from "@/lib/validators/bookmark-id";
import z from "zod";

type RouteParams = {
  params: {
    id: string;
  };
};

export async function DELETE(_req: Request, { params }: RouteParams) {
  const user = await getAuthenticatedUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const parsed = bookmarkIdSchema.safeParse(params);

  if (!parsed.success) {
    return NextResponse.json(
      {
        error: "Invalid bookmark id",
        details: z.treeifyError(parsed.error),
      },
      { status: 400 },
    );
  }

  const { id } = parsed.data;

  const bookmark = await prisma.bookmark.findFirst({
    where: {
      id,
      userId: user.id,
    },
  });

  if (!bookmark) {
    return NextResponse.json({ error: "Bookmark not found" }, { status: 404 });
  }

  await prisma.bookmark.delete({
    where: { id },
  });

  return NextResponse.json({ success: true }, { status: 200 });
}
