import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
const router = express.Router();
router.post("/register", async (req, res) => {
  const { fullName, email, password, phone, country } = req.body;
  if (!fullName || !email || !password)
    return res
      .status(400)
      .json({ message: "fullName, email, and password are required." });
  const passwordHash = await bcrypt.hash(password, 10);
  return res
    .status(201)
    .json({
      message: "Student registered successfully.",
      student: { id: 1, fullName, email, phone, country, passwordHash },
    });
});
router.post("/login", async (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ message: "Email is required." });
  const token = jwt.sign(
    {
      id: 1,
      email,
      role: email === process.env.ADMIN_EMAIL ? "admin" : "student",
    },
    process.env.JWT_SECRET || "development_secret",
    { expiresIn: "7d" },
  );
  res.json({
    message: "Login successful.",
    token,
    user: {
      id: 1,
      email,
      role: email === process.env.ADMIN_EMAIL ? "admin" : "student",
    },
  });
});
export default router;
