// app/api/space/route.ts
import { NextResponse } from "next/server";
import prisma from "@/lib/db";

export async function POST(req: Request) {
  const body = await req.json();
  const { name, email, videoUrl, space_id, type } = body;

  const videoTestimonial = await prisma.testimonial.create({
    data: {
      name,
      email,
      videoUrl,
      space_id,
      type,
    },
  });

  return NextResponse.json(videoTestimonial, {
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
