import express from "express";
import { Prisma, PrismaClient } from "@prisma/client";
import { withAccelerate } from "@prisma/extension-accelerate";
import { auth_middleware } from "../middleware/middleware.js";

export const spaceRoute = express.Router();
const prisma = new PrismaClient().$extends(withAccelerate());

spaceRoute.post("/create", auth_middleware, async (req, res) => {
  try {
    const userId = req.body;
    const { name, description } = req.body;
    const slug = name.toLowerCase().replace(/\s+/g, "-");
    const createdSpace = await prisma.space.create({
      where: {
        adminId: userId,
      },
      data: {
        name: name,
        slug: slug,
        description: description,
        url: `https://testimonials-hazel-eta.vercel.app/${slug}`,
        adminId: req.user,
      },
    });
    const url = createdSpace.url;
    return res.json({ url });
  } catch (error) {
    console.log(error);
  }
});

spaceRoute.get("/bulk", auth_middleware, async (req, res) => {
  try {
    const userId = req.user;
    const user_space = await prisma.space.findMany({
      where: {
        adminId: userId,
      },
      select: {
        space_id: true,
        name: true,
        description: true,
        url: true,
      },
    });
    return res.json({ user_space });
  } catch (error) {
    console.log(error);
  }
});

spaceRoute.get("/:slug", async (req, res) => {
  try {
    const space = await prisma.space.findFirst({
      where: {
        slug: req.params.slug,
      },
    });
    if (!space) {
      return res.json({
        message: "Space not found",
      });
    }
    return res.json(space);
  } catch (error) {
    console.log(error);
  }
});

spaceRoute.delete("/delete/:space_id", auth_middleware, async (req, res) => {
  const space_id = req.params.space_id;
  try {
    const space = await prisma.space.findUnique({
      where: { space_id: space_id },
    });
    if (!space)
      return res.status(404).json({
        message: "Space not found",
      });
    if (space.adminId !== req.user)
      return res.json({
        message: "Unauthorized to delete this space",
      });
    await prisma.space.delete({ where: { space_id: space_id } });
    res.json({
      message: "Space deleted successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});
