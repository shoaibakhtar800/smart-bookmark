import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAuthenticatedUser } from "@/lib/auth/get-user";
import { createBookmarkSchema } from "@/lib/validators/bookmark";
import z from "zod";

export async function GET() {
  const user = await getAuthenticatedUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const bookmarks = await prisma.bookmark.findMany({
    where: {
      userId: user.id,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return NextResponse.json(bookmarks);
}

export async function POST(req: Request) {
  const user = await getAuthenticatedUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();

  const parsed = createBookmarkSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      {
        error: "Invalid input",
        details: z.treeifyError(parsed.error),
      },
      { status: 400 },
    );
  }

  const { title, url } = parsed.data;

  const bookmark = await prisma.bookmark.create({
    data: {
      title,
      url,
      userId: user.id,
    },
  });

  return NextResponse.json(bookmark, { status: 201 });
}
