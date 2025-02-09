import jwt from "jsonwebtoken";
const jwt_secret = process.env.JWT_SECRET;

export const auth_middleware = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res
      .status(401)
      .json({ message: "Access Denied. No token provided." });
  }

  try {
    const verified = jwt.verify(token, jwt_secret);
    req.user = verified.id;
    next();
  } catch (err) {
    res.status(403).json({ message: "Invalid or expired token." });
  }
};
