import jwt from "jsonwebtoken";

const generateToken = (id) => {
    console.log("Signing with:", process.env.JWT_SECRET);
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
};

export default generateToken;