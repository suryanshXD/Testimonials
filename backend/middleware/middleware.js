import jwt from "jsonwebtoken";

const JWT_PUBLIC_KEY = process.env.JWT_PUBLIC_KEY;

export function authMiddleware(req, res, next) {
  const token = req.headers["authorization"];
  if (!token) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const decoded = jwt.verify(token, JWT_PUBLIC_KEY);
  if (!decoded || !decoded.sub) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  req.userId = decoded.sub;

  next();
}
