import { NextResponse } from "next/server";
import prisma from "@/lib/db";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const slug = searchParams.get("slug") as string;

  if (!slug) {
    return NextResponse.json({ error: "Missing slug" }, { status: 400 });
  }

  const space = await prisma.space.findUnique({
    where: { slug },
    select: { space_id: true },
  });
  //console.log("This is your space id below");

  //console.log(space);

  if (!space) {
    return NextResponse.json({ error: "Space not found" }, { status: 404 });
  }

  return NextResponse.json(space);
}
