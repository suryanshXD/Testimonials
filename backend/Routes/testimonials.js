import { PrismaClient } from "@prisma/client";
import { withAccelerate } from "@prisma/extension-accelerate";
import express from "express";

export const testimonialRoute = express.Router();
const prisma = new PrismaClient().$extends(withAccelerate());

testimonialRoute.post("/create", async (req, res) => {
  try {
    const body = req.body;
    await prisma.testimonial.create({
      data: {
        name: body.name,
        email: body.email,
        description: body.description,
        testimonial_id: body.testimonial_id,
      },
    });

    return res.json({ message: "testimonials created" });
  } catch (error) {
    console.log(error);
  }
});

testimonialRoute.get("/:space_id", async (req, res) => {
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

    const testimonials = await prisma.testimonial.findMany({
      where: {
        testimonial_id: space.space_id,
      },
      select: {
        name: true,
        email: true,
        description: true,
      },
    });
    return res.json({ testimonials });
  } catch (error) {
    console.log(error);
  }
});
