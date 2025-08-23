// import { PrismaClient } from "@prisma/client";
// import { withAccelerate } from "@prisma/extension-accelerate";
// import express from "express";
// import jwt from "jsonwebtoken";
// import { auth_middleware } from "../middleware/middleware.js";

// const jwt_secret = process.env.JWT_SECRET;
// const prisma = new PrismaClient().$extends(withAccelerate());

// export const userRoute = express.Router();
// userRoute.post("/signup", async (req, res) => {
//   try {
//     const body = req.body;
//     const user = await prisma.user.create({
//       data: {
//         username: body.username,
//         password: body.password,
//         name: body.name,
//       },
//     });

//     const token = jwt.sign({ id: user.id }, jwt_secret);
//     res.json(token);
//   } catch (error) {
//     console.log(error);
//   }
// });

// userRoute.post("/signin", async (req, res) => {
//   try {
//     const body = req.body;
//     const User = await prisma.user.findFirst({
//       where: {
//         username: body.username,
//         password: body.password,
//       },
//     });

//     const token = jwt.sign({ id: User.id }, jwt_secret);
//     res.json(token);
//   } catch (error) {
//     console.log(error);
//   }
// });
