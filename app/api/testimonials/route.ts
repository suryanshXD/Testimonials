import { NextResponse } from "next/server";
import prisma from "@/lib/db";

// GET /api/testimonials?space_id=xxxx
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const space_id = searchParams.get("space_id");

    if (!space_id) {
      return NextResponse.json({ error: "Missing space_id" }, { status: 400 });
    }

    // Find testimonials for this space_id
    const testimonials = await prisma.testimonial.findMany({
      where: { space_id },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(testimonials, { status: 200 });
  } catch (error) {
    console.error("Error fetching testimonials:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
