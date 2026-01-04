// app/api/space/route.ts
import { NextResponse } from "next/server";
import prisma from "@/lib/db";

export async function POST(req: Request) {
  const body = await req.json();
  const { name, description, slug, url, adminId } = body;

  const space = await prisma.space.create({
    data: { name, description, slug, url, adminId },
  });

  return NextResponse.json(space, {
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
  });
}

export async function OPTIONS() {
  return NextResponse.json(
    {},
    {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
      },
    }
  );
}
