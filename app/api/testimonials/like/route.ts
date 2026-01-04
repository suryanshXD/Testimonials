import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { testimonial_id, space_id } = body;

    if (!testimonial_id || !space_id) {
      return NextResponse.json(
        { error: "Testimonial ID and Space ID are required" },
        { status: 400 }
      );
    }

    // Check if already liked
    const existingLike = await prisma.favoriteTestimonial.findFirst({
      where: {
        testimonial_id,
        space_id,
      },
    });

    if (existingLike) {
      return NextResponse.json(
        { error: "Testimonial already liked" },
        { status: 400 }
      );
    }

    // Create new like
    const favorite = await prisma.favoriteTestimonial.create({
      data: {
        testimonial_id,
        space_id,
      },
      include: {
        Testimonials: true,
      },
    });

    return NextResponse.json({
      message: "Testimonial liked successfully",
      favorite,
    });
  } catch (error) {
    console.error("Error liking testimonial:", error);
    return NextResponse.json(
      { error: "Failed to like testimonial" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const body = await request.json();
    const { testimonial_id, space_id } = body;

    if (!testimonial_id || !space_id) {
      return NextResponse.json(
        { error: "Testimonial ID and Space ID are required" },
        { status: 400 }
      );
    }

    // Delete the like
    await prisma.favoriteTestimonial.deleteMany({
      where: {
        testimonial_id,
        space_id,
      },
    });

    return NextResponse.json({
      message: "Testimonial unliked successfully",
    });
  } catch (error) {
    console.error("Error unliking testimonial:", error);
    return NextResponse.json(
      { error: "Failed to unlike testimonial" },
      { status: 500 }
    );
  }
}
