import express from "express";
import { Prisma, PrismaClient } from "@prisma/client";
import { withAccelerate } from "@prisma/extension-accelerate";
import { auth_middleware } from "../middleware/middleware.js";

export const spaceRoute = express.Router();
const prisma = new PrismaClient().$extends(withAccelerate());

spaceRoute.post("/create", auth_middleware, async (req, res) => {
  try {
    const body = req.body;
    const createdSpace = await prisma.space.create({
      data: {
        name: body.name,
        description: body.description,
        url: `http://localhost:5173/${body.name}`,
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
    const user_id = req.user;
    const user_space = await prisma.space.findMany({
      where: {
        adminId: user_id,
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

spaceRoute.get("/:space_id", auth_middleware, async (req, res) => {
  try {
    const space = await prisma.space.findFirst({
      where: {
        space_id: req.params.space_id,
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
