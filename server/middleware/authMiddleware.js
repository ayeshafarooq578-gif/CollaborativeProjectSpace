import jwt from "jsonwebtoken";
import User from "../models/User.js";

const protect = async (req, res, next) => {
  console.log("Authorization Header:", req.headers.authorization);

  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];

    console.log("Token:", token);

    try {
        console.log("Verifying with:", process.env.JWT_SECRET);
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      console.log("Decoded:", decoded);

      req.user = await User.findById(decoded.id).select("-password");

      if (!req.user) {
        return res.status(401).json({
          message: "User not found",
        });
      }

      next();
    } catch (error) {
      console.log(error);
      return res.status(401).json({
        message: "Not authorized",
      });
    }
  } else {
    return res.status(401).json({
      message: "No token",
    });
  }
};

export default protect;