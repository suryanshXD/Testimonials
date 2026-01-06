import prisma from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json(
      { error: "Testimonial ID is required" },
      { status: 400 }
    );
  }

  try {
    const testimonial = await prisma.testimonial.findFirst({
      where: {
        id: id,
      },
      select: {
        name: true,
        email: true,
        content: true,
        videoUrl: true,
        type: true,
        createdAt: true,
      },
    });

    return NextResponse.json(testimonial);
  } catch (error) {
    console.error("Error fetching testimonial:", error);
    return NextResponse.json(
      { error: "Failed to fetch testimonial" },
      { status: 500 }
    );
  }
}
