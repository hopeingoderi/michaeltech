import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import authRoutes from "./routes/auth.routes.js";
import courseRoutes from "./routes/course.routes.js";
import studentRoutes from "./routes/student.routes.js";
import adminRoutes from "./routes/admin.routes.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 4000;

// TEMP safe CORS for now
app.use(cors({ origin: true, credentials: true }));

app.use(express.json());

app.get("/api/health", (_req, res) => {
  res.json({
    ok: true,
    project: "MichaelTech Academy",
    adminEmail: process.env.ADMIN_EMAIL || "info@michaeltech.ch",
  });
});

app.use("/api/auth", authRoutes);
app.use("/api/courses", courseRoutes);
app.use("/api/students", studentRoutes);
app.use("/api/admin", adminRoutes);

app.use((err, _req, res, _next) => {
  console.error(err);
  res
    .status(err.status || 500)
    .json({ message: err.message || "Internal server error" });
});

app.listen(port, () => {
  console.log(`🚀 API running on port ${port}`);
});
