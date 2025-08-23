import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { userRoute } from "./Routes/user.js";
import { spaceRoute } from "./Routes/space.js";
import { testimonialRoute } from "./Routes/testimonials.js";

const app = express();
dotenv.config();
app.use(express.json());
app.use(cors());

//app.use("/api/v1/user", userRoute);
app.use("/api/v1/space", spaceRoute);
app.use("/api/v1/testimonial", testimonialRoute);
app.listen(3000);
