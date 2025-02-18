import { PrismaClient } from "@prisma/client";
import { withAccelerate } from "@prisma/extension-accelerate";
import express from "express";

export const testimonialRoute = express.Router();
const prisma = new PrismaClient().$extends(withAccelerate());

testimonialRoute.post("/create", async (req, res) => {
  try {
    const body = req.body;
    const space = await prisma.space.findUnique({
      where: {
        slug: body.slug,
      },
    });

    if (!space) {
      return res.status(404).json({ message: "Space not found" });
    }

    await prisma.testimonial.createMany({
      data: {
        name: body.name,
        email: body.email,
        description: body.description,
        testimonial_id: space.space_id,
      },
    });

    return res.json({ message: "testimonials created" });
  } catch (error) {
    console.log(error);
  }
});

testimonialRoute.get("/:space_id", async (req, res) => {
  try {
    const id = req.params.space_id;

    const space_testimonials = await prisma.testimonial.findMany({
      where: {
        testimonial_id: id,
      },
      select: {
        id: true,
        name: true,
        email: true,
        description: true,
      },
    });
    return res.json({ space_testimonials });
  } catch (error) {
    console.log(error);
  }
});

testimonialRoute.get("/unique/:id", async (req, res) => {
  const id = req.params.id;
  const testimonial = await prisma.testimonial.findUnique({
    where: {
      id: id,
    },
    select: {
      id: true,
      name: true,
      email: true,
      description: true,
    },
  });
  return res.json({ testimonial });
});
