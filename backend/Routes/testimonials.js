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
