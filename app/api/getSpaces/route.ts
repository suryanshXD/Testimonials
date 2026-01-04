import { NextResponse } from "next/server";
import prisma from "@/lib/db";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const userID = searchParams.get("userID");

  if (!userID) {
    return NextResponse.json({ error: "Missing userID" }, { status: 400 });
  }

  const spaces = await prisma.space.findMany({
    where: { adminId: userID },
    select: {
      space_id: true,
      name: true,
      description: true,
      url: true,
      slug: true,
    },
  });

  return NextResponse.json(spaces);
}
