// app/api/deleteSpace/route.ts
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";

export async function DELETE(request: NextRequest) {
  try {
    // Get spaceId from query parameters
    const { searchParams } = new URL(request.url);
    const spaceId = searchParams.get("spaceId");
    const userId = searchParams.get("userId");

    console.log("Deleting space:", spaceId);

    if (!spaceId) {
      return NextResponse.json(
        { error: "Space ID is required" },
        { status: 400 }
      );
    }

    // Rest of your code remains the same...

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const space = await prisma.space.findUnique({
      where: { space_id: spaceId },
      select: { adminId: true },
    });

    if (!space) {
      return NextResponse.json({ error: "Space not found" }, { status: 404 });
    }

    if (space.adminId !== userId) {
      return NextResponse.json(
        { error: "Unauthorized to delete this space" },
        { status: 403 }
      );
    }

    await prisma.space.delete({
      where: { space_id: spaceId },
    });

    return NextResponse.json({
      success: true,
      message: "Space deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting space:", error);
    return NextResponse.json(
      { error: "Failed to delete space" },
      { status: 500 }
    );
  }
}
