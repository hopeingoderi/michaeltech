import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import db from "../config/db.js";

const router = express.Router();

router.post("/register", async (req, res) => {
  try {
    const {
      fullName,
      email,
      password,
      phone,
      country,
      preferredLanguage
    } = req.body;

    if (!fullName || !email || !password) {
      return res.status(400).json({
        message: "fullName, email, and password are required."
      });
    }

    const existingUser = await db.query(
      "SELECT id FROM students WHERE email = $1",
      [email]
    );

    if (existingUser.rows.length > 0) {
      return res.status(409).json({
        message: "An account with this email already exists."
      });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const result = await db.query(
      `
      INSERT INTO students (
        full_name,
        email,
        password_hash,
        phone,
        country,
        preferred_language
      )
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING id, full_name, email, phone, country, preferred_language
      `,
      [
        fullName,
        email,
        passwordHash,
        phone || null,
        country || null,
        preferredLanguage || "en"
      ]
    );

    const student = result.rows[0];

    const token = jwt.sign(
      {
        id: student.id,
        email: student.email,
        role: "student"
      },
      process.env.JWT_SECRET || "development_secret",
      { expiresIn: "7d" }
    );

    return res.status(201).json({
      message: "Student registered successfully.",
      token,
      student: {
        id: student.id,
        fullName: student.full_name,
        email: student.email,
        phone: student.phone,
        country: student.country,
        preferredLanguage: student.preferred_language
      }
    });
  } catch (error) {
    console.error("Register error:", error);
    return res.status(500).json({
      message: "Internal server error"
    });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required."
      });
    }

    const result = await db.query(
      `
      SELECT id, full_name, email, password_hash, phone, country, preferred_language
      FROM students
      WHERE email = $1
      `,
      [email]
    );

    if (result.rows.length === 0) {
      return res.status(401).json({
        message: "Invalid email or password."
      });
    }

    const student = result.rows[0];

    const passwordMatch = await bcrypt.compare(password, student.password_hash);

    if (!passwordMatch) {
      return res.status(401).json({
        message: "Invalid email or password."
      });
    }

    const token = jwt.sign(
      {
        id: student.id,
        email: student.email,
        role: student.email === process.env.ADMIN_EMAIL ? "admin" : "student"
      },
      process.env.JWT_SECRET || "development_secret",
      { expiresIn: "7d" }
    );

    return res.json({
      message: "Login successful.",
      token,
      user: {
        id: student.id,
        fullName: student.full_name,
        email: student.email,
        phone: student.phone,
        country: student.country,
        preferredLanguage: student.preferred_language,
        role: student.email === process.env.ADMIN_EMAIL ? "admin" : "student"
      }
    });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({
      message: "Internal server error"
    });
  }
});

export default router;
