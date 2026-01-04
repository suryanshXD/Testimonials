import { NextResponse } from "next/server";
import prisma from "@/lib/db";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const space_id = searchParams.get("space_id");

  if (!space_id) {
    return NextResponse.json({ error: "Missing userID" }, { status: 400 });
  }

  const spaces = await prisma.space.findMany({
    where: { space_id },
    select: {
      testimonials: true,
    },
  });

  return NextResponse.json(spaces);
}
