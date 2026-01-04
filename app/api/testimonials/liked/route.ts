import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const space_id = searchParams.get("space_id");

    if (!space_id) {
      return NextResponse.json(
        { error: "Space ID is required" },
        { status: 400 }
      );
    }

    const likedTestimonials = await prisma.favoriteTestimonial.findMany({
      where: {
        space_id,
      },
      include: {
        Testimonials: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    const testimonials = likedTestimonials.map((fav) => ({
      ...fav.Testimonials,
      createdAt: fav.Testimonials.createdAt.toISOString(),
    }));

    return NextResponse.json(testimonials);
  } catch (error) {
    console.error("Error fetching liked testimonials:", error);
    return NextResponse.json(
      { error: "Failed to fetch liked testimonials" },
      { status: 500 }
    );
  }
}
